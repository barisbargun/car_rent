import { IAllValue, IHeader, INavItem } from "@/types/exports";
import { _useQuery } from "./react-query/queries"
import { QUERY_KEYS } from "./react-query/queryKeys"
import { PATH_LIST } from "@/constants/enum"
import { IUser } from "@/types/exports";


/**
 * 
 * MENUBAR_TAB
 * 
 */
export const useGetAllValue = () => {
  return _useQuery<IAllValue>(QUERY_KEYS.GET_ALL_VALUE, PATH_LIST.REDIS);
}


/**
 * 
 * MENUBAR_TAB
 * 
 */
export const useGetMenubarTab = () => {
  return _useQuery<IMenubarTab[]>(QUERY_KEYS.GET_MENUBAR_TABS, PATH_LIST.MENUBAR_TAB);
}

export const useGetMenubarTabById = (id: string) => {
  return _useQuery<IMenubarTab>(QUERY_KEYS.GET_MENUBAR_TAB_BY_ID, `${PATH_LIST.MENUBAR_TAB}/${id}`);
}


/**
 * 
 * MENUBAR_VEHICLE
 * 
 */
export const useGetMenubarVehicle = () => {
  return _useQuery<IMenubarVehicle[]>(QUERY_KEYS.GET_MENUBAR_VEHICLES, PATH_LIST.MENUBAR_VEHICLE);
}

export const useGetMenubarVehicleById = (id: string) => {
  return _useQuery<IMenubarVehicle>(QUERY_KEYS.GET_MENUBAR_VEHICLE_BY_ID, `${PATH_LIST.MENUBAR_VEHICLE}/${id}`);
}


/**
 * 
 * VEHICLE
 * 
 */
export const useGetVehicle = () => {
  return _useQuery<IVehicle[]>(QUERY_KEYS.GET_VEHICLES, PATH_LIST.VEHICLE);
}

export const useGetVehicleById = (id: string) => {
  return _useQuery<IVehicle>(QUERY_KEYS.GET_VEHICLE_BY_ID, `${PATH_LIST.VEHICLE}/${id}`);
}


/**
 * 
 * FOOTER_TAB
 * 
 */
export const useGetFooterTab = () => {
  return _useQuery<IFooterTab[]>(QUERY_KEYS.GET_FOOTER_TABS, PATH_LIST.FOOTER_TAB);
}

export const useGetFooterTabById = (id: string) => {
  return _useQuery<IFooterTab>(QUERY_KEYS.GET_FOOTER_TAB_BY_ID, `${PATH_LIST.FOOTER_TAB}/${id}`);
}


/**
 * 
 * FOOTER_LINK
 * 
 */
export const useGetFooterLink = () => {
  return _useQuery<IFooterLink[]>(QUERY_KEYS.GET_FOOTER_LINKS, PATH_LIST.FOOTER_LINK);
}

export const useGetFooterLinkById = (id: string) => {
  return _useQuery<IFooterLink>(QUERY_KEYS.GET_FOOTER_LINK_BY_ID, `${PATH_LIST.FOOTER_LINK}/${id}`);
}


/**
 * 
 * CAROUSELS
 * 
 */
export const useGetCarousels = () => {
  return _useQuery<ICarousel[]>(QUERY_KEYS.GET_CAROUSELS, PATH_LIST.CAROUSEL);
}

export const useGetCarouselById = (id: string) => {
  return _useQuery<ICarousel>(QUERY_KEYS.GET_CAROUSEL_BY_ID, `${PATH_LIST.CAROUSEL}/${id}`);
}


/**
 * 
 * NAV_ITEM
 * 
 */
export const useGetNavItem = () => {
  return _useQuery<INavItem[]>(QUERY_KEYS.GET_NAV_ITEMS, PATH_LIST.NAV_ITEM);
}

export const useGetNavItemById = (id: string) => {
  return _useQuery<INavItem>(QUERY_KEYS.GET_NAV_ITEM_BY_ID, `${PATH_LIST.NAV_ITEM}/${id}`);
}


/**
 * 
 * REVIEW
 * 
 */
export const useGetReview = () => {
  return _useQuery<IReview[]>(QUERY_KEYS.GET_REVIEWS, PATH_LIST.REVIEW);
}

export const useGetReviewById = (id: string) => {
  return _useQuery<IReview>(QUERY_KEYS.GET_REVIEW_BY_ID, `${PATH_LIST.REVIEW}/${id}`);
}


/**
 * 
 * SERVICE
 * 
 */
export const useGetService = () => {
  return _useQuery<IService[]>(QUERY_KEYS.GET_SERVICES, PATH_LIST.SERVICE);
}

export const useGetServiceById = (id: string) => {
  return _useQuery<IService>(QUERY_KEYS.GET_SERVICE_BY_ID, `${PATH_LIST.SERVICE}/${id}`);
}


/**
 * 
 * HEADER
 * 
 */
export const useGetHeader = () => {
  return _useQuery<IHeader[]>(QUERY_KEYS.GET_HEADERS, PATH_LIST.HEADER);
}

export const useGetHeaderById = (id: string) => {
  return _useQuery<IHeader>(QUERY_KEYS.GET_HEADER_BY_ID, `${PATH_LIST.HEADER}/${id}`);
}


/**
 * 
 * SITE_VALUE
 * 
 */
export const useGetSiteValue = () => {
  return _useQuery<ISiteValue[]>(QUERY_KEYS.GET_SITE_VALUES, PATH_LIST.SITE);
}

export const useGetSiteValueById = (id: string) => {
  return _useQuery<ISiteValue>(QUERY_KEYS.GET_SITE_VALUE_BY_ID, `${PATH_LIST.SITE}/${id}`);
}


/**
 * 
 * USERS
 * 
 */
export const useGetUsers = () => {
  return _useQuery<IUser[]>(QUERY_KEYS.GET_USERS, PATH_LIST.USER);
}

export const useGetUserById = (id: string) => {
  return _useQuery<IUser>(QUERY_KEYS.GET_USER_BY_ID, `${PATH_LIST.USER}/${id}`);
}

export const useGetCurrentUser = () => {
  return _useQuery<IUser>(QUERY_KEYS.GET_CURRENT_USER, PATH_LIST.CURRENT_USER);
}


/**
 * 
 * IMAGES
 * 
 */
export const useGetImages = () => {
  return _useQuery<IImage[]>(QUERY_KEYS.GET_IMAGES, "image");
}

export const useGetImageById = (id: string) => {
  return _useQuery<IImage>(QUERY_KEYS.GET_IMAGE_BY_ID, `image/${id}`);
}


/**
 * 
 * INFO
 * 
 */
export const useGetInfo = () => {
  return _useQuery<IInfo>(QUERY_KEYS.GET_INFO, "info");
}