import { IController } from "@/types/export";
import { MenubarTab, MenubarVehicle, FooterTab, FooterLink, Carousel, NavItem, Review, Service, Header, SiteValues, User } from "@/models/index";
import Vehicle from "@/models/explore/Vehicle";

type actions = 'MENUBAR_TAB' | 'MENUBAR_VEHICLE' | 'VEHICLE' |
  'FOOTER_TAB' | 'FOOTER_LINK' |
  'CAROUSEL' | 'NAV_ITEM' |
  'REVIEW' | 'SERVICE' |
  'HEADER' | 'SITE_VALUES' |
  'USER';

export const CONTROLLER_ACTIONS: Record<actions, IController> = {
  MENUBAR_TAB: { path: "menubar-tab", model: MenubarTab, childrenModel: MenubarVehicle },
  MENUBAR_VEHICLE: { path: "menubar-vehicle", model: MenubarVehicle, parentModel: MenubarTab },
  VEHICLE: { path: "vehicle", model: Vehicle, parentModel: MenubarVehicle },
  FOOTER_TAB: { path: "footer-tab", model: FooterTab, childrenModel: FooterLink },
  FOOTER_LINK: { path: "footer-link", model: FooterLink, parentModel: FooterTab },
  CAROUSEL: { path: "carousel", model: Carousel },
  NAV_ITEM: { path: "nav-item", model: NavItem },
  REVIEW: { path: "review", model: Review },
  SERVICE: { path: "service", model: Service },
  HEADER: { path: "header", model: Header },
  SITE_VALUES: { path: "site", model: SiteValues },
  USER: { path: "user", model: User },
}

