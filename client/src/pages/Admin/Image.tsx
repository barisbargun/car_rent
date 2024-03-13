import { PageLoader, ImageCard, ToastMessage } from "@/components"
import MaxCountComp from "@/components/MaxCountComp";
import ImageUploadButton from "@/components/admin/image/ImageUploadButton";
import { maxCountsBySection } from "@/constants";
import { useGetImages } from "@/lib/data"
import { useEffect } from "react";

const Image = () => {
  const { data, isPending, isSuccess, isError, error } = useGetImages();
  const toastMessage = ToastMessage();

  useEffect(() => {
    if (isError) {
      toastMessage({ defaultText: "error", description: error });
    }
  }, [isError])

  return (
    isPending ? <PageLoader text="Images loading.." /> : isSuccess &&
      <>
        <div className="flex flex-wrap gap-4 max-desktop:justify-center">
          {data && data?.slice()?.reverse()?.map((v) => v.imgUrl && (
            <div className="w-[350px] max-md:w-full" key={v.id}>
              <ImageCard image={v} />
            </div>
          ))}
        </div>

        {/** Add button */}
        {data?.length < maxCountsBySection.images &&
          <div className="fixed right-10 bottom-6 z-20">
            <ImageUploadButton />
          </div>
        }
        <MaxCountComp count={data.length} type="images" />
      </>
  )
}

export default Image