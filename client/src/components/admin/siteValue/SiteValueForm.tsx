import { siteSchema } from "@/lib/validate"
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
  data?: ISiteValue;
};

const SiteValueForm = ({ data }: Props) => {
  const [navImg, setNavImg] = useState<string | undefined>();
  const [logoImg, setLogoImg] = useState<string | undefined>();
  const [serviceImg, setServiceImg] = useState<string | undefined>();

  const { mutateAsync: mutatePatch, isPending: pendingPatch } =
    _useMutation<IMutationSiteBody<ISiteValue>>({ models: "SITE_VALUES", id: data?.id, methodType: "PATCH" });

  const toastMessage = ToastMessage();

  const form = useForm<z.infer<typeof siteSchema>>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      navName: data?.navName || "",
      navImg: data?.navImg?.id || "",
      logoImg: data?.logoImg?.id || "",
      serviceImg: data?.serviceImg?.id || "",
      footerDesc: data?.footerDesc || ""
    },
  })

  async function onSubmit(values: z.infer<typeof siteSchema>) {
    try {
      removeEmptyKeys(values);

      await mutatePatch({
        path: PATH_LIST.SITE,
        body: { ...values }
      });
      toastMessage({ defaultText: "update" });

    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }

  }

  return (
    <Form {...form}>

      <form className="flex flex-col gap-5 w-full">

        <FormField control={form.control} name="navName" render={({ field }) => (
          <FormItem>
            <FormLabel>Nav name</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="name" placeholder="Enter nav name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="footerDesc" render={({ field }) => (
          <FormItem>
            <FormLabel>Footer description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter footer description" {...field} rows={4} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex items-center gap-2 h-24 overflow-hidden">

          <FormField control={form.control} name="navImg" render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Upload logo image</FormLabel>
              <FormControl>
                <SelectImageButton btnText="Upload nav image" fieldChange={field.onChange} setImage={setNavImg} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex-1 flex-center">
            {(data?.navImg?.imgUrl || navImg) &&
              <img src={navImg || data?.navImg?.imgUrl || ""} alt="nav image" width={96} height={96} />
            }
          </div>
        </div>

        <div className="flex items-center gap-2 h-24 overflow-hidden">

          <FormField control={form.control} name="logoImg" render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Upload logo image</FormLabel>
              <FormControl>
                <SelectImageButton btnText="Upload logo image" fieldChange={field.onChange} setImage={setLogoImg} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex-1 flex-center">
            {(data?.logoImg?.imgUrl || logoImg) &&
              <img src={logoImg || data?.logoImg?.imgUrl || ""} alt="nav image" width={96} height={96} />
            }
          </div>
        </div>

        <div className="flex items-center gap-2 h-24 overflow-hidden">

          <FormField control={form.control} name="serviceImg" render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Upload service image</FormLabel>
              <FormControl>
                <SelectImageButton btnText="Upload service image" fieldChange={field.onChange} setImage={setServiceImg} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex-1 flex-center">
            {(data?.serviceImg?.imgUrl || serviceImg) &&
              <img src={serviceImg || data?.serviceImg?.imgUrl || ""} alt="nav image" width={96} height={96} />
            }
          </div>
        </div>

        <HandleAlert trigger={form.handleSubmit(onSubmit)}>
          <Button disabled={pendingPatch} type="button" variant="default" className="w-full">
            {(pendingPatch) && <Loader />}Update
          </Button>
        </HandleAlert>
      </form>
    </Form >

  )
}

export default SiteValueForm