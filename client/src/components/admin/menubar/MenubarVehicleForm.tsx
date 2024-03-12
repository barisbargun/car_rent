import { menubarVehicleSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Form, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components/ui"
import { removeEmptyKeys } from "@/lib/utils"
import { ToastMessage, HandleAlert, SelectImageButton } from "@/components"
import { PATH_LIST } from "@/constants/enum"
import { useGetMenubarTab } from "@/lib/data"
import { useEffect, useState } from "react"

type Props = {
  type: "UPDATE" | "CREATE";
  data?: IMenubarVehicle;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenubarVehicleForm = ({ type, data, openDialog }: Props) => {
  const { data: parentData, isSuccess, isError } = useGetMenubarTab();
  const [image, setImage] = useState<string | undefined>();

  const { mutateAsync: mutatePost, isPending: pendingPost } =
    _useMutation<IMutationBody<IMenubarVehicle>>({ models: "MENUBAR_VEHICLE", methodType: "POST" });

  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationBody<IMenubarVehicle>>({ models: "MENUBAR_VEHICLE", id: data?.id, methodType: "PATCH" });

  const toastMessage = ToastMessage();

  useEffect(() => {
    if (isError) toastMessage({ defaultText: "error" });
  }, [isError])

  const form = useForm<z.infer<typeof menubarVehicleSchema>>({
    resolver: zodResolver(menubarVehicleSchema),
    defaultValues: {
      img: "",
      parent: data?.parent || "",
      title: data?.title || "",
      desc: data?.desc || ""
    },
  })

  async function onSubmit(values: z.infer<typeof menubarVehicleSchema>) {
    try {
      removeEmptyKeys(values);

      if (type == "UPDATE") {
        await mutatePatch({
          path: `${PATH_LIST.MENUBAR_VEHICLE}/${data?.id!}`,
          body: { ...values }
        });
        toastMessage({ defaultText: "update" });
        if (openDialog) openDialog(false);

      } else {
        await mutatePost({
          path: PATH_LIST.MENUBAR_VEHICLE,
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

        <div className="flex items-center gap-2 h-24 overflow-hidden">

          <FormField control={form.control} name="img" render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Upload Image</FormLabel>
              <FormControl>
                <SelectImageButton fieldChange={field.onChange} setImage={setImage} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex-1 flex-center">
            {
              image &&
              <img src={image || ""} alt="avatar-image" width={96} height={96} />
            }
          </div>
        </div>

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
                {parentData?.map(v => (
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

        <FormField control={form.control} name="desc" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description" {...field} rows={8} />
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

export default MenubarVehicleForm