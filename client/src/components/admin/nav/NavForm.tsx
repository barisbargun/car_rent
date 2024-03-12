import { navSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Form, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { removeEmptyKeys } from "@/lib/utils"
import { ToastMessage, HandleAlert, HandleErrorComponent } from "@/components"
import { PATH_LIST } from "@/constants/enum"
import { INavItem } from "@/types/exports"
import { useGetHeader } from "@/lib/data"
import { pageListNames } from "@/constants"

type Props = {
  type: "UPDATE" | "CREATE";
  data?: INavItem;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewForm = ({ type, data, openDialog }: Props) => {
  const { data: headerData, isError } = useGetHeader();

  const { mutateAsync: mutatePost, isPending: pendingPost } =
    _useMutation<IMutationBody<INavItem>>({ models: "NAV_ITEM", methodType: "POST" });

  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationBody<INavItem>>({ models: "NAV_ITEM", id: data?.id, methodType: "PATCH" });

  const toastMessage = ToastMessage();

  const form = useForm<z.infer<typeof navSchema>>({
    resolver: zodResolver(navSchema),
    defaultValues: {
      title: data?.title || "",
      hyperLink: data?.hyperLink || 0
    },
  })

  async function onSubmit(values: z.infer<typeof navSchema>) {
    try {
      removeEmptyKeys(values);

      if (type == "UPDATE") {
        await mutatePatch({
          path: `${PATH_LIST.NAV_ITEM}/${data?.id!}`,
          body: { ...values }
        });
        toastMessage({ defaultText: "update" });

      } else {
        await mutatePost({
          path: PATH_LIST.NAV_ITEM,
          body: { ...values }
        })
        toastMessage({ defaultText: "create" });
      }
      if (openDialog) openDialog(false);

    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }

  }

  return (
    isError ? <HandleErrorComponent /> :
      <Form {...form}>

        <form className="flex flex-col gap-5 mt-4 w-full" onSubmit={e => e.preventDefault()}>

          <FormField control={form.control} name="hyperLink" render={({ field }) => (
            <FormItem>
              <FormLabel>Hyper Link</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper">
                  <SelectItem value="0">No link</SelectItem>
                  {
                    headerData?.slice().sort((a,b)=> a.index - b.index)?.map(v =>
                      <SelectItem key={v.id} value={v.index.toString()}>{pageListNames[v.index]}</SelectItem>
                    )
                  }
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

          <HandleAlert trigger={form.handleSubmit(onSubmit)}>
            <Button disabled={pendingPatch || pendingPost} type="button" variant="default" className="w-full">
              {(pendingPatch || pendingPost) && <Loader />}{type == "UPDATE" ? "Update" : "Create"}
            </Button>
          </HandleAlert>
        </form>
      </Form >

  )
}

export default ReviewForm