import { footerLinkSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Form, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { removeEmptyKeys } from "@/lib/utils"
import { ToastMessage, HandleAlert } from "@/components"
import { PATH_LIST } from "@/constants/enum"
import { useGetFooterTab } from "@/lib/data"
import { useEffect } from "react"

type Props = {
  type: "UPDATE" | "CREATE";
  data?: IFooterLink;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const FooterLinkForm = ({ type, data, openDialog }: Props) => {
  const { data: parentData, isSuccess, isError } = useGetFooterTab();

  const { mutateAsync: mutatePost, isPending: pendingPost } =
    _useMutation<IMutationBody<IFooterLink>>({ models: "FOOTER_LINK", methodType: "POST" });

  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationBody<IFooterLink>>({ models: "FOOTER_LINK", id: data?.id, methodType: "PATCH" });
  
  const toastMessage = ToastMessage();

  useEffect(() => {
    if (isError) toastMessage({ defaultText: "error" });
  }, [isError])

  const form = useForm<z.infer<typeof footerLinkSchema>>({
    resolver: zodResolver(footerLinkSchema),
    defaultValues: {
      parent: data?.parent || "",
      title: data?.title || "",
      link: data?.link || ""
    },
  })

  async function onSubmit(values: z.infer<typeof footerLinkSchema>) {
    try {

      removeEmptyKeys(values);
      if (type == "UPDATE") {
        await mutatePatch({
          path: `${PATH_LIST.FOOTER_LINK}/${data?.id!}`,
          body: { ...values }
        });
        toastMessage({ defaultText: "update" });
        if (openDialog) openDialog(false);

      } else {
        await mutatePost({
          path: PATH_LIST.FOOTER_LINK,
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
    isSuccess &&
    <Form {...form}>

      <form className="flex flex-col gap-5 mt-4 w-full">

        <FormField control={form.control} name="parent" render={({ field }) => (
          <FormItem>
            <FormLabel>Tab</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper">
                {parentData?.slice().sort((a,b) => a.index - b.index).map(v => (
                  <SelectItem key={v.id} value={v.id}>{v.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="name" placeholder="Enter title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="link" render={({ field }) => (
          <FormItem>
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="url" placeholder="Enter link" {...field} />
            </FormControl>
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

export default FooterLinkForm