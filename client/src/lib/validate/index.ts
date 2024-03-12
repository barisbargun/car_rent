import { PAGE_LIST, ROLE_LIST, TAB_LIST } from "@/constants/enum";
import { z } from "zod";

const minMessage = (characters: number = 2) => `You should enter at least ${characters} characters`;
const maxMessage = (characters: number = 150) => `You should enter maximum ${characters} characters`;
const errorEmail = "You should enter a valid email address"

export const navSchema = z.object({
  title:
    z.string().min(3, { message: minMessage(3) }).
      max(150, { message: maxMessage() }),
  hyperLink: z.custom<PAGE_LIST>()
})

export const headerSchema = z.object({
  title:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }).optional().or(z.literal('')),
  desc:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }).optional().or(z.literal(''))
})

export const menubarTabSchema = z.object({
  title:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }),
  type: z.custom<TAB_LIST>()
})

export const menubarVehicleSchema = z.object({
  img: z.string(),
  parent:
    z.string().min(5, { message: "You must select a tab" }).
      max(150, { message: maxMessage() }),
  title:
    z.string().min(2, { message: minMessage() }).
      max(150, { message: maxMessage() }),
  desc:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage(150) }),
})

export const vehicleSchema = z.object({
  img: z.string(),
  parent:
    z.string().min(5, { message: "You must select a tab" }).
      max(150, { message: maxMessage() }),
  title:
    z.string().min(2, { message: minMessage() }).
      max(150, { message: maxMessage() }),
  fuel:
    z.string().min(2, { message: minMessage(2) }).
      max(20, { message: maxMessage(20) }).optional().or(z.literal('')),
  drivetrain:
    z.string().min(2, { message: minMessage(2) }).
      max(20, { message: maxMessage(20) }).optional().or(z.literal('')),
  wheel:
    z.string().min(5, { message: minMessage(5) }).
      max(20, { message: maxMessage(20) }).optional().or(z.literal('')),
})

export const footerTabSchema = z.object({
  title:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }),
})

export const footerLinkSchema = z.object({
  parent:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }),
  title:
    z.string().min(2, { message: minMessage(2) }).
      max(150, { message: maxMessage() }),
  link:
    z.string().min(2, { message: minMessage(2) }).
      max(150, { message: maxMessage() }).optional().or(z.literal(''))
})

export const carouselSchema = z.object({
  img: z.string(),
  title:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }).optional().or(z.literal('')),
  desc:
    z.string().min(5, { message: minMessage(5) }).
      max(300, { message: maxMessage(300) }).optional().or(z.literal('')),
  vehicle_name:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }),
  price:
    z.string().min(3, { message: minMessage(3) }).
      max(150, { message: maxMessage() }).optional().or(z.literal('')),
  engine:
    z.string().min(3, { message: minMessage(3) }).
      max(150, { message: maxMessage() }).optional().or(z.literal('')),
  power:
    z.string().min(2, { message: minMessage() }).
      max(150, { message: maxMessage() }).optional().or(z.literal(''))
})

export const serviceSchema = z.object({
  img: z.string(),
  title:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }),
  desc:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() })
})

export const reviewSchema = z.object({
  img: z.string(),
  fullname:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }),
  occupation:
    z.string().min(5, { message: minMessage(5) }).
      max(150, { message: maxMessage() }).optional().or(z.literal('')),
  desc:
    z.string().min(5, { message: minMessage(5) }).
      max(300, { message: maxMessage(300) })
})

export const siteSchema = z.object({
  navName: z.string().min(2, { message: minMessage() }).max(150, { message: maxMessage() }).optional().or(z.literal('')),
  navImg: z.string(),
  logoImg: z.string(),
  serviceImg: z.string(),
  footerDesc: z.string().min(2, { message: minMessage() }).max(300, { message: maxMessage(300) }),
})

export const profileSchema = z.object({
  img: z.string(),
  username: z.string().min(2, { message: minMessage() }).max(150, { message: maxMessage() }),
  email: z.string().min(2, { message: minMessage() }).max(150, { message: maxMessage() }).email({ message: errorEmail }),
  password: z.string().min(2, { message: minMessage() }).max(150, { message: maxMessage() }).optional().or(z.literal('')),
  role: z.custom<ROLE_LIST>()
})

export const loginSchema = z.object({
  username: z.string().min(2, { message: minMessage() }).max(150, { message: maxMessage() }),
  password: z.string().min(2).max(150, { message: maxMessage() })
})


export const imageUploadSchema = z.object({
  file: z.custom<IFileUploader>()
})