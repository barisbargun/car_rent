import { OpenDialog, SelectImages } from "@/components"
type Props = {
  btnText?: string;
  fieldChange?: any;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SelectImageButton = ({ btnText, fieldChange, setImage }: Props) => {
  return (
    <OpenDialog
      dialogProps=
      {{
        buttonText: btnText || "Upload Image",
        buttonTextVisible: true,
        title: "Upload Image",
        desc: "Choose an image.",
        width: "w-full"
      }}>
      <SelectImages fieldChange={fieldChange} setImage={setImage} />
    </OpenDialog >
  )
}

export default SelectImageButton