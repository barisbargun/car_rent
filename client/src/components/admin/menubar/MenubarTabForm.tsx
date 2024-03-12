import { menubarTabSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Form, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { removeEmptyKeys } from "@/lib/utils"
import { ToastMessage, HandleAlert } from "@/components"
import { PATH_LIST, TAB_LIST } from "@/constants/enum"

type Props = {
  type: "UPDATE" | "CREATE";
  data?: IMenubarTab;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenubarTabForm = ({ type, data, openDialog }: Props) => {
  const { mutateAsync: mutatePost, isPending: pendingPost } =
    _useMutation<IMutationBody<IMenubarTab>>({ models: "MENUBAR_TAB", methodType: "POST" });

  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationBody<IMenubarTab>>({ models: "MENUBAR_TAB", id: data?.id, methodType: "PATCH" });
  const toastMessage = ToastMessage();

  const form = useForm<z.infer<typeof menubarTabSchema>>({
    resolver: zodResolver(menubarTabSchema),
    defaultValues: {
      title: data?.title || "",
      type: data?.type == 0 ? 0 : data?.type || TAB_LIST.GRID_FOUR
    },
  })
  // || data?.type || data?.type == 0 ? 0 : TAB_LIST.GRID_FOUR
  async function onSubmit(values: z.infer<typeof menubarTabSchema>) {
    try {
      removeEmptyKeys(values);

      if (type == "UPDATE") {
        await mutatePatch({
          path: `${PATH_LIST.MENUBAR_TAB}/${data?.id!}`,
          body: { ...values }
        });
        toastMessage({ defaultText: "update" });
        if (openDialog) openDialog(false);

      } else {
        await mutatePost({
          path: PATH_LIST.MENUBAR_TAB,
          body: { ...values }
        })
        toastMessage({ defaultText: "create" });
        if (openDialog) openDialog(false);
      }

    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }

  }

  return (
    <Form {...form}>

      <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-5 mt-4 w-full">

        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="name" placeholder="Enter title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="type" render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper">
                <SelectItem value={TAB_LIST.GRID_FOUR.toString()}>Grid 4</SelectItem>
                <SelectItem value="1">Grid 6</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />


        <HandleAlert trigger={form.handleSubmit(onSubmit)}>
          <Button disabled={pendingPatch || pendingPost} type="button" variant="default" className="w-full">
            {(pendingPatch || pendingPost) && <Loader />}{type == "UPDATE" ? "Update" : "Create"}
          </Button>
        </HandleAlert>
      </form>
    </Form >

  )
}

export default MenubarTabForm