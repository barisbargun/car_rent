import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui';
import { useMemo, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop'
type Props = {
  fileUrl: string;
  setFile: React.Dispatch<React.SetStateAction<IFileUploader | undefined>>;
}

const ImageCrop = ({ fileUrl, setFile }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [ratio, setRatio] = useState("16/9");

  const onCropComplete = (_croppedArea: Area, pixels: Area) => {
    console.log(pixels)
    setFile && setFile(v => v && { ...v, ...pixels });
  }

  const getRatio = useMemo(() => {
    const splitted = ratio.split("/");
    return Number(splitted[0]) / Number(splitted[1])
  }, [ratio])

  return (
    <div className='relative w-full h-full'>

      <Select onValueChange={setRatio} defaultValue={ratio}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Select a ratio" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Ratios</SelectLabel>
            <SelectItem value="251/82">Menubar horizontal</SelectItem>
            <SelectItem value="188/270">Menubar vertical</SelectItem>
            <SelectItem value="16/9">16/9</SelectItem>
            <SelectItem value="4/3">4/3</SelectItem>
            <SelectItem value="3/2">3/2</SelectItem>
            <SelectItem value="1/1">1/1</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className='relative  w-full h-full mt-2'>
        <Cropper
          image={fileUrl}
          crop={crop}
          zoom={zoom}
          maxZoom={9}
          aspect={getRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  )
}

export default ImageCrop