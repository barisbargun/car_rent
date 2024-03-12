import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, ButtonProps, } from './ui'


type Props = {
  Button?: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
  trigger: Function;
  AlertTexts?: { title: string; desc: string }
  cancelMsg?: string;
  continueMsg?: string;
  children?: React.ReactNode;
}

const HandleAlert = ({
  trigger,
  AlertTexts,
  cancelMsg = "Cancel",
  continueMsg = "Continue",
  children
}: Props) => {

  return (

    <AlertDialog>
      <AlertDialogTrigger asChild >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className='max-desktop:w-[90%]'>
        <AlertDialogHeader>

          <AlertDialogTitle>{AlertTexts?.title || "Are you absolutely sure?"}</AlertDialogTitle>
          <AlertDialogDescription>{AlertTexts?.desc || "This action will be change the daha and cannot be undone"}</AlertDialogDescription>

        </AlertDialogHeader>
        <AlertDialogFooter>

          <AlertDialogCancel>
            {cancelMsg}
          </AlertDialogCancel>

          <AlertDialogAction onClick={() => trigger()}>
            {continueMsg}
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )

}

export default HandleAlert