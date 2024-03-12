import { footerTabSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Form } from "@/components/ui"
import { removeEmptyKeys } from "@/lib/utils"
import { ToastMessage, HandleAlert } from "@/components"
import { PATH_LIST } from "@/constants/enum"

type Props = {
  type: "UPDATE" | "CREATE";
  data?: IFooterTab;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const FooterTabForm = ({ type, data, openDialog }: Props) => {
  const { mutateAsync: mutatePost, isPending: pendingPost } =
    _useMutation<IMutationBody<IFooterTab>>({ models: "FOOTER_TAB", methodType: "POST" });

  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationBody<IFooterTab>>({ models: "FOOTER_TAB", id: data?.id, methodType: "PATCH" });
  const toastMessage = ToastMessage();

  const form = useForm<z.infer<typeof footerTabSchema>>({
    resolver: zodResolver(footerTabSchema),
    defaultValues: {
      title: data?.title || "",
    },
  })

  async function onSubmit(values: z.infer<typeof footerTabSchema>) {
    try {
      removeEmptyKeys(values);

      if (type == "UPDATE") {
        await mutatePatch({
          path: `${PATH_LIST.FOOTER_TAB}/${data?.id!}`,
          body: { ...values }
        });
        toastMessage({ defaultText: "update" });
        if (openDialog) openDialog(false);

      } else {
        await mutatePost({
          path: PATH_LIST.FOOTER_TAB,
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

      <form className="flex flex-col gap-5 w-full">

        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="name" placeholder="Enter title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <HandleAlert trigger={form.handleSubmit(onSubmit)}>
          <Button disabled={pendingPatch || pendingPost} type="button" variant="default" className="w-fit">
            {(pendingPatch || pendingPost) && <Loader />}{type == "UPDATE" ? "Update" : "Create"}
          </Button>
        </HandleAlert>
      </form>
    </Form >

  )
}

export default FooterTabForm