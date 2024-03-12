import { convertFileToUrl } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';

import { ImageCrop } from '..';
type props = {
    fieldChange: any,
    mediaUrl: string | undefined
}

const FileUploader = ({ fieldChange, mediaUrl }: props) => {
    const [file, setFile] = useState<IFileUploader>();
    const [fileUrl, setFileUrl] = useState<string | undefined>(mediaUrl);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(v => ({ ...v, file: acceptedFiles[0] }));
            setFileUrl(convertFileToUrl(acceptedFiles[0]));
        },
        [file]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });

    useEffect(() => {
        fieldChange(file);
    }, [file])

    return (
        <div className='flex-center'>
            <div  {...(!fileUrl ? getRootProps() : {})} className='w-full'>
                {!fileUrl && <input {...getInputProps()} />}

                <div className='flex flex-col flex-center cursor-pointer w-full h-[300px]'>{
                    fileUrl ?
                        <ImageCrop fileUrl={fileUrl} setFile={setFile} /> :
                        <div className='border-2 rounded-xl w-full border-dashed h-full flex-center flex-col'>
                            <h3 className="text-sm text-muted-foreground">Click or drag a file</h3>
                            <h3 className="text-xs text-muted-foreground">(SVG, PNG, JPG, AVIF)</h3>
                        </div>
                }
                </div>

            </div>
        </div>
    )
}

export default FileUploader