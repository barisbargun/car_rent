import { reviewSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Form, Textarea } from "@/components/ui"
import { removeEmptyKeys } from "@/lib/utils"
import { ToastMessage, HandleAlert, SelectImageButton } from "@/components"
import { PATH_LIST } from "@/constants/enum"
import { useState } from "react"

type Props = {
  type: "UPDATE" | "CREATE";
  data?: IReview;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewForm = ({ type, data, openDialog }: Props) => {
  const [image, setImage] = useState<string | undefined>();

  const { mutateAsync: mutatePost, isPending: pendingPost } =
    _useMutation<IMutationBody<IReview>>({ models: "REVIEW", methodType: "POST" });

  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationBody<IReview>>({ models: "REVIEW", id: data?.id, methodType: "PATCH" });

  const toastMessage = ToastMessage();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      img: "",
      fullname: data?.fullname || "",
      occupation: data?.occupation || "",
      desc: data?.desc || "",
    },
  })

  async function onSubmit(values: z.infer<typeof reviewSchema>) {
    try {
      removeEmptyKeys(values);

      if (type == "UPDATE") {
        await mutatePatch({
          path: `${PATH_LIST.REVIEW}/${data?.id!}`,
          body: { ...values }
        });
        toastMessage({ defaultText: "update" });
        if (openDialog) openDialog(false);

      } else {
        await mutatePost({
          path: PATH_LIST.REVIEW,
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

        <FormField control={form.control} name="fullname" render={({ field }) => (
          <FormItem>
            <FormLabel>Fullname</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="name" placeholder="Enter fullname" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="occupation" render={({ field }) => (
          <FormItem>
            <FormLabel>Occupation</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="name" placeholder="Enter occupation" {...field} />
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

export default ReviewForm