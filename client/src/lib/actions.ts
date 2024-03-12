import { _useDeleteMutation, _usePatchMutation, _usePostMutation } from "./react-query/queries"
import { QUERY_KEYS } from "./react-query/queryKeys"

type Props = {
  models: models;
  methodType?: methods;
  id?: string
}
let queryKeys: string[][];
let _methodType: methods;

type methods = "DELETE" | "POST" | "PATCH" | "OTHER";
type models =
  "MENUBAR_TAB" | "MENUBAR_VEHICLE" | "VEHICLE" | "FOOTER_TAB" | "FOOTER_LINK" | "CAROUSEL" |
  "NAV_ITEM" | "REVIEW" | "SERVICE" | "HEADER" | "SITE_VALUES" | "PROFILE" |
  "IMAGE" | "LOGOUT" | "AUTH" | "USER" | "INFO";

export const _useMutation = <T>({ models, methodType, id }: Props) => {
  _methodType = methodType || "OTHER";
  queryKeys = [];

  switch (models) {
    case "MENUBAR_TAB":
      if (id) queryKeys.push([QUERY_KEYS.GET_MENUBAR_TAB_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_MENUBAR_TABS]);
      queryKeys.push([QUERY_KEYS.GET_MENUBAR_VEHICLES]);
      break;

    case "MENUBAR_VEHICLE":
      if (id) queryKeys.push([QUERY_KEYS.GET_MENUBAR_VEHICLE_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_MENUBAR_VEHICLES]);
      queryKeys.push([QUERY_KEYS.GET_MENUBAR_TABS]);
      queryKeys.push([QUERY_KEYS.GET_VEHICLES]);
      break;

    case "VEHICLE":
      if (id) queryKeys.push([QUERY_KEYS.GET_VEHICLE_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_VEHICLES]);
      queryKeys.push([QUERY_KEYS.GET_MENUBAR_VEHICLES]);
      break;

    case "FOOTER_TAB":
      if (id) queryKeys.push([QUERY_KEYS.GET_FOOTER_TAB_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_FOOTER_TABS]);
      queryKeys.push([QUERY_KEYS.GET_FOOTER_LINKS]);
      break;

    case "FOOTER_LINK":
      if (id) queryKeys.push([QUERY_KEYS.GET_FOOTER_LINK_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_FOOTER_LINKS]);
      queryKeys.push([QUERY_KEYS.GET_FOOTER_TABS]);
      break;

    case "CAROUSEL":
      if (id) queryKeys.push([QUERY_KEYS.GET_CAROUSEL_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_CAROUSELS]);
      break;

    case "NAV_ITEM":
      if (id) queryKeys.push([QUERY_KEYS.GET_NAV_ITEM_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_NAV_ITEMS]);
      break;

    case "REVIEW":
      if (id) queryKeys.push([QUERY_KEYS.GET_REVIEW_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_REVIEWS]);
      break;

    case "SERVICE":
      if (id) queryKeys.push([QUERY_KEYS.GET_SERVICE_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_SERVICES]);
      break;

    case "HEADER":
      if (id) queryKeys.push([QUERY_KEYS.GET_HEADER_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_HEADERS]);
      break;

    case "SITE_VALUES":
      if (id) queryKeys.push([QUERY_KEYS.GET_SITE_VALUE_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_SITE_VALUES]);
      break;

    case "PROFILE":
      if (id) queryKeys.push([QUERY_KEYS.GET_USER_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_CURRENT_USER]);
      queryKeys.push([QUERY_KEYS.GET_USERS]);
      break;

    case "USER":
      if (id) queryKeys.push([QUERY_KEYS.GET_USER_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_USERS]);
      break;

    case "IMAGE":
      if (id) queryKeys.push([QUERY_KEYS.GET_IMAGE_BY_ID, id]);
      queryKeys.push([QUERY_KEYS.GET_IMAGES]);
      break;

    case "AUTH":
      queryKeys.push([QUERY_KEYS.GET_CURRENT_USER]);
      break;

    case "INFO":
      queryKeys.push([QUERY_KEYS.GET_INFO]);
      break;

    default:
      break;
  }
  return callMutation<T>();
}

export const callMutation = <T>() => {
  switch (_methodType) {
    case "DELETE":
      return _useDeleteMutation(queryKeys);

    case "PATCH":
      return _usePatchMutation<T>(queryKeys);

    default:
      return _usePostMutation<T>(queryKeys);
  }
}