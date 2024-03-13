import PageLoader from '@/components/PageLoader';
import { useGetImages } from '@/lib/data';
import { useEffect } from 'react'
import ImageCard from './ImageCard';
import ImageUploadButton from './ImageUploadButton';
import { ToastMessage } from "@/components";

type Props = {
  fieldChange: any;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SelectImages = ({ fieldChange, openDialog, setImage }: Props) => {
  const { data, isPending, isSuccess, isError } = useGetImages();
  const toastMessage = ToastMessage();

  useEffect(() => {
    if (isError) {
      toastMessage({ defaultText: "error" });
    }
  }, [isError])

  const selectImage = (id: string, url: string) => {
    fieldChange(id);
    setImage(url);
    openDialog && openDialog(false);
  }
  return (
    isPending ? <PageLoader text="Images loading.." /> : isSuccess &&
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-8">
        <div className='flex-center border-2 border-dashed rounded-xl shadow-xl min-h-20'>
          <ImageUploadButton />
        </div>

        {data?.slice()?.reverse()?.map((v) => v.imgUrl && (
          <div className="w-full cursor-pointer relative" key={v.id} >
            <ImageCard image={v} />
            <div className='absolute w-full h-full top-0 left-0 z-0'
              onClick={() => selectImage(v.id, v.imgUrl)}></div>
          </div>
        ))}
      </div>
  )
}

export default SelectImages