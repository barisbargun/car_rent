import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Button } from "../../ui"
import { z } from "zod";
import { imageUploadSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { _useMutation } from "@/lib/actions";
import { FileUploader, ToastMessage } from "@/components";
import Loader from "@/svg/Loader";
import { PATH_LIST } from "@/constants/enum"
type Props = {
  mediaUrl?: string | undefined;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageForm = ({ mediaUrl, openDialog }: Props) => {
  const { mutateAsync, isPending, isSuccess } =
    _useMutation<IUploadImage>({ models: "IMAGE", methodType: "OTHER" });

  const toastMessage = ToastMessage();

  const form = useForm<z.infer<typeof imageUploadSchema>>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      file: {}
    },
  })

  async function onSubmit(values: z.infer<typeof imageUploadSchema>) {
    try {
      if (!values?.file?.file) throw Error;
      const reader = new FileReader();

      reader.readAsDataURL(values.file.file);
      reader.onloadend = async () => {
        await mutateAsync({ path: PATH_LIST.IMAGE, body: { imgUrl: reader.result!, ...values.file } }).then(() => {
          toastMessage({ defaultText: "uploadedImage" });
          form.reset();
          if (openDialog) openDialog(false);
        }).catch((error:any) => {
          toastMessage({ defaultText: "emptyImage", description: error });
        })

      };
      reader.onerror = () => {
        throw Error;
      };

    } catch (error: any) {
      toastMessage({ defaultText: "emptyImage", description: error });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">

        <FormField control={form.control} name="file" render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Upload Image</FormLabel>
            <FormControl>
              <FileUploader
                fieldChange={field.onChange}
                mediaUrl={mediaUrl}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button className="mt-10" disabled={isPending || isSuccess}
          type="submit" variant="secondary">
          {(isPending) && <Loader />}Upload
        </Button>

      </form>
    </Form >
  )
}

export default ImageForm