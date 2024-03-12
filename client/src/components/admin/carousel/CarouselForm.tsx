import { carouselSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Form } from "@/components/ui"
import { useState } from "react"
import { ToastMessage, HandleAlert, SelectImageButton } from "@/components"
import { PATH_LIST } from "@/constants/enum"
type Props = {
  type: "UPDATE" | "CREATE";
  data?: ICarousel;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CarouselForm = ({ type, data, openDialog }: Props) => {
  const { mutateAsync: mutatePost, isPending: pendingPost } =
    _useMutation<IMutationBody<ICarousel>>({ models: "CAROUSEL", methodType: "POST" });

  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationBody<ICarousel>>({ models: "CAROUSEL", id: data?.id, methodType: "PATCH" });
  const toastMessage = ToastMessage();

  const [image, setImage] = useState<string | undefined>();

  const form = useForm<z.infer<typeof carouselSchema>>({
    resolver: zodResolver(carouselSchema),
    defaultValues: {
      img: data?.img?.id || "",
      title: data?.title || "",
      desc: data?.desc || "",
      vehicle_name: data?.vehicle_name || "",
      price: String(data?.price) || "",
      engine: data?.engine || "",
      power: data?.power || ""
    },
  })
  async function onSubmit(values: z.infer<typeof carouselSchema>) {
    try {
      // removeEmptyKeys(values);

      if (type == "UPDATE") {
        await mutatePatch({
          path: `${PATH_LIST.CAROUSEL}/${data?.id!}`,
          body: { ...values }
        });
        toastMessage({ defaultText: "update" });
      } else {
        await mutatePost({
          path: PATH_LIST.CAROUSEL,
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
    <Form {...form}>

      <form className="flex flex-col gap-5 mt-4 w-full">

        <div className="flex items-center gap-2">

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
              <img src={image || ""} alt="avatar-image" width={100} height={100} />
            }
          </div>
        </div>

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
              <Input type="text" placeholder="Enter description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="vehicle_name" render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter vehicle name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="engine" render={({ field }) => (
          <FormItem>
            <FormLabel>Engine</FormLabel>
            <FormControl>
              <Input type="type" placeholder="Enter engine" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="power" render={({ field }) => (
          <FormItem>
            <FormLabel>Power</FormLabel>
            <FormControl>
              <Input type="type" placeholder="Enter power" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="price" render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter price" {...field} />
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

export default CarouselForm