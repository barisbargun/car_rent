import { IconProps } from "@radix-ui/react-icons/dist/types";
import { PAGE_LIST, PATH_LIST, ROLE_LIST } from "@/constants/enum";

export interface IAdminNavItem {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  title: string;
  link?: string;
  children?: { title: string; link: string; }[];
  lastItem?: boolean;
}

export interface IHeader {
  id: string;
  index: PAGE_LIST;
  title?: string;
  desc?: string;
}

export interface IUser {
  id: string;
  username: string;
  password?: string;
  email: string;
  img?: IImage;
  role: ROLE_LIST;
};

export interface INavItem {
  id: string;
  index: number;
  title: string;
  hyperLink?: PAGE_LIST;
}

export interface IStatisticCard {
  title: string;
  desc: string;
  count: number[];
  names: string[];
  link?:PATH_LIST;
}