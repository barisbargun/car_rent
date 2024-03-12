import { FooterLinkCard, ToastMessage } from '@/components';
import { Button } from '@/components/ui';
import { PATH_LIST } from '@/constants/enum';
import { _useMutation } from '@/lib/actions';
import { StrictModeDroppable } from '@/lib/dnd/StrictModeDroppable';
import Loader from '@/svg/Loader';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';

type Props = {
  data: IFooterTab;
}

const FooterLinkCards = ({ data }: Props) => {
  const { mutateAsync: mutateSwap, isPending: pendingSwap } =
    _useMutation<IMutationBody<ISwapList>>({ models: "FOOTER_LINK", methodType: "PATCH" });

  const [isAnyChange, setIsAnyChange] = useState<boolean>(false);

  const [currentData, setCurrentData] = useState(data.children);
  const toastMessage = ToastMessage();

  useEffect(() => { setCurrentData(data.children.slice().sort((v, v1) => v.index - v1.index)) }, [data.children])
  const handlePatch = async () => {
    try {
      const list = currentData?.map(v => v.id);
      if (list) {
        await mutateSwap({
          path: PATH_LIST.FOOTER_LINK,
          body: { list }
        });
        setIsAnyChange(false);
        return toastMessage({ defaultText: "update" });
      }
      throw Error;
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }
  }
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(currentData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCurrentData(items);
    setIsAnyChange(true);
  };

  return (
    <div className="flex flex-col w-[350px] max-desktop:w-[320px]">
      <div className='flex-center gap-4 py-3 px-1 w-full'>
        <div className='flex-1 line-clamp-3 break-words'>
          <p className="text-sm text-muted-foreground">Footer link title</p>
          <h4 className="text-sm font-medium leading-none" title={data.title}>{data.title}</h4>
        </div>
        <Button disabled={pendingSwap || !isAnyChange} onClick={handlePatch} size="sm">{pendingSwap && <Loader />} Update</Button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>

        <div className='border-2 w-full'>
          <StrictModeDroppable key={data.id} droppableId={data.id}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {
                  currentData.map((m, index) => m?.id && (
                    <Draggable key={m.id} draggableId={m.id} index={index}>
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className='w-full'
                        >
                          <FooterLinkCard data={m} />
                        </li>
                      )}
                    </Draggable>
                  ))
                }

                {provided.placeholder}
              </ul>
            )}
          </StrictModeDroppable>
        </div>

      </DragDropContext>
    </div>
  );

}

export default FooterLinkCards