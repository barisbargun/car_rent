import { DialogHeader, DialogTrigger, Dialog, DialogContent, DialogDescription, DialogTitle, Button } from "@/components/ui"
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons"
import React, { useState } from "react"
import { ClassNameValue } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  dialogProps: {
    buttonTextVisible?: boolean,
    buttonText: string,
    buttonIconType?: "ADD" | "EDIT"
    title: string;
    desc?: string,
    width?: ClassNameValue
  };
}

const OpenDialog = ({ children, dialogProps }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { openDialog: setDialogOpen });
    }
    return child;
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen} >
      <DialogTrigger asChild>
        <Button variant="outline" size={dialogProps.buttonTextVisible ? "default" : "icon"}>
          {
          !dialogProps.buttonTextVisible && 
          dialogProps.buttonIconType == "EDIT" ? <Pencil1Icon className="size-5 "/> : 
          <PlusIcon className="size-5 "/>}
          <span className={!dialogProps.buttonTextVisible ? "sr-only" : ""}>{dialogProps.buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"max-w-[90vw] max-h-[90%] border-4 overflow-y-auto " + (dialogProps.width || "w-fit")}>
        <DialogHeader>
          <DialogTitle>{dialogProps.title}</DialogTitle>
          {dialogProps.desc && <DialogDescription>{dialogProps.desc}</DialogDescription>}
        </DialogHeader>
        <div className="flex-center space-x-2">
          {childrenWithProps}
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default OpenDialog