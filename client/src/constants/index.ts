import { IAdminNavItem } from "@/types/exports"
import { BarChartIcon, LayoutIcon, DropdownMenuIcon, QuestionMarkCircledIcon, AccessibilityIcon, ImageIcon, PersonIcon } from "@radix-ui/react-icons"
import { PATH_LIST } from "@/constants/enum"

export const navItems: IAdminNavItem[] = [
  {
    icon: BarChartIcon,
    title: "Navbar",
    link: PATH_LIST.NAV_ITEM
  },
  {
    icon: LayoutIcon,
    title: "Carousel",
    link: PATH_LIST.CAROUSEL
  },
  {
    icon: DropdownMenuIcon,
    title: "Explore",
    children: [
      { title: "Menubar Tab", link: PATH_LIST.MENUBAR_TAB },
      { title: "Menubar Vehicles", link: PATH_LIST.MENUBAR_VEHICLE },
      { title: "Vehicles", link: PATH_LIST.VEHICLE }
    ]
  },
  {
    icon: AccessibilityIcon,
    title: "Services",
    link: PATH_LIST.SERVICE
  },
  {
    icon: QuestionMarkCircledIcon,
    title: "Reviews",
    link: PATH_LIST.REVIEW
  },
  {
    icon: DropdownMenuIcon,
    title: "Footer",
    children: [
      { title: "Tab Titles", link: PATH_LIST.FOOTER_TAB },
      { title: "Links", link: PATH_LIST.FOOTER_LINK }
    ]
  },
  {
    icon: DropdownMenuIcon,
    title: "Site",
    children: [
      { title: "Headers", link: PATH_LIST.HEADER },
      { title: "Site values", link: PATH_LIST.SITE }
    ]
  },
  {
    icon: ImageIcon,
    title: "Images",
    link: PATH_LIST.IMAGE
  },
  {
    icon: PersonIcon,
    title: "Users",
    link: PATH_LIST.USER,
    lastItem: true
  }
]

export const mobileNavItems: IAdminNavItem[] = [
  {
    icon: BarChartIcon,
    title: "Navbar",
    link: PATH_LIST.NAV_ITEM
  },
  {
    icon: LayoutIcon,
    title: "Carousel",
    link: PATH_LIST.CAROUSEL
  },
  {
    icon: DropdownMenuIcon,
    title: "Explore",
    children: [
      { title: "Menubar Tab", link: PATH_LIST.MENUBAR_TAB },
      { title: "Menubar Vehicles", link: PATH_LIST.MENUBAR_VEHICLE },
      { title: "Vehicles", link: PATH_LIST.VEHICLE }
    ]
  },
  {
    icon: AccessibilityIcon,
    title: "Services",
    link: PATH_LIST.SERVICE
  },
  {
    icon: QuestionMarkCircledIcon,
    title: "Reviews",
    link: PATH_LIST.REVIEW
  },
  {
    icon: DropdownMenuIcon,
    title: "Footer",
    children: [
      { title: "Tab Titles", link: PATH_LIST.FOOTER_TAB },
      { title: "Links", link: PATH_LIST.FOOTER_LINK }
    ]
  },
  {
    icon: DropdownMenuIcon,
    title: "Site",
    children: [
      { title: "Headers", link: PATH_LIST.HEADER },
      { title: "Site values", link: PATH_LIST.SITE },
      { title: "Images", link: PATH_LIST.IMAGE },
      { title: "Users", link: PATH_LIST.USER },
    ]
  },
]

export const serviceDirection: string[] = [
  "Top left",
  "Top right",
  "Middle left",
  "Middle right",
  "Bottom"
]

export const roleListNames = [
  "Admin",
  "Editor",
  "User"
]

export const pageListNames = [
  "No",
  "Main",
  "Explore",
  "Service",
  "Review"
]

export const maxCountsBySection: Record<maxCountType, number> = {
  images: 80,
  user: 5,
  navItem: 6,
  carousel: 12,
  menubarVehicle: 30,
  vehicle: 80,
  service: 5,
  footerLink: 20,
  default: 10
}

export const errorComponentList: Record<errorComponent, IErrorComponent> = {
  default: { title: "Whoops, something went wrong.", desc: "Please either refresh the page or navigate another page." },
  authorized: { title: "Whoops, you don't authorized for this page", desc: "Please navigate another page." },
  notFound: { title: "Whoops, 404 - Page not found", desc: "Please navigate another page." },
} 