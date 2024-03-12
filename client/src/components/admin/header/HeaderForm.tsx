import { headerSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Form, Textarea } from "@/components/ui"
import { removeEmptyKeys } from "@/lib/utils"
import { ToastMessage, HandleAlert, HandleErrorComponent } from "@/components"
import { PATH_LIST } from "@/constants/enum"
import { IHeader } from "@/types/exports"

type Props = {
  data: IHeader;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderForm = ({ data, openDialog }: Props) => {
  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationBody<IHeader>>({ models: "HEADER", id: data?.id, methodType: "PATCH" });

  const toastMessage = ToastMessage();

  const form = useForm<z.infer<typeof headerSchema>>({
    resolver: zodResolver(headerSchema),
    defaultValues: {
      title: data.title,
      desc: data.desc
    },
  })

  async function onSubmit(values: z.infer<typeof headerSchema>) {
    try {

      await mutatePatch({
        path: `${PATH_LIST.HEADER}/${data?.id}`,
        body: { ...values }
      });
      toastMessage({ defaultText: "update" });
      if (openDialog) openDialog(false);

    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }

  }

  return (
    !data ? <HandleErrorComponent /> :
      <Form {...form}>

        <form className="flex flex-col gap-5 mt-4 w-full">


          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="name" placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="desc" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />


          <HandleAlert trigger={form.handleSubmit(onSubmit)}>
            <Button disabled={pendingPatch} type="button" variant="default" className="w-full">
              {(pendingPatch) && <Loader />} UPDATE
            </Button>
          </HandleAlert>
        </form>
      </Form >

  )
}

export default HeaderForm