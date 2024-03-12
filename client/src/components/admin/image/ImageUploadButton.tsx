import { ImageForm, OpenDialog } from "@/components"

const ImageUploadButton = () => {
  return (
    <OpenDialog
      dialogProps=
      {{
        buttonText: "Add New Image",
        title: "Upload Image",
        desc: "Maximum 700kb photos, less is better. You can zoom your picture.",
        width: "w-[600px]"
      }}>
      <ImageForm />
    </OpenDialog>
  )
}

export default ImageUploadButton