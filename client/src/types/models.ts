type Theme = "dark" | "light" | "system";
type errorComponent = "default" | "authorized" | "notFound";
type maxCountType = "images" | "user" | "navItem" | "carousel" | "menubarVehicle" | "vehicle" | "service" | "footerLink" | "default";

type IMutationBody<T> = Omit<T, "id" | "img" | "index" | "children" | "parent"> & {
  img?: string;
};

type IMutationSiteBody<T> = Omit<T, "id" | "navImg" | "logoImg" | "serviceImg"> & {
  navImg?: string;
  logoImg?: string;
  serviceImg?: string;
};

interface IMutationData<T> {
  path: string;
  body?: T;
}

interface IErrorComponent {
  title: string;
  desc: string;
}

/**
 * 
 * SITE VALUES
 * 
 */
interface ISwapList {
  list: string[];
}

/**
 * 
 * SITE VALUES
 * 
 */
interface ISiteValue {
  id: string;
  navName?: string;
  navImg?: IImage;
  logoImg?: IImage;
  serviceImg?: IImage;
  footerDesc?: string;
}


/**
 * 
 * MENUBAR MODELS
 * 
 */
interface IMenubarTab {
  id: string;
  index: number;
  title: string;
  type: number;
  children: IMenubarVehicle[];
}

interface IMenubarVehicle {
  id: string;
  index: number;
  parent: IMenubarTab & string;
  children: IVehicle[];
  img?: IImage;
  title: string;
  desc: string;
}


/**
 * 
 * VEHICLE MODELS
 * 
 */
interface IVehicle {
  id: string;
  index: number;
  parent: IMenubarVehicle & string;
  img: IImage;
  title: string;
  fuel?: string;
  drivetrain?: string;
  wheel?: string;
}


/**
 * 
 * FOOTER MODELS
 * 
 */
interface IFooterTab {
  id: string;
  index: number;
  title: string;
  children: IFooterLink[];
}

interface IFooterLink {
  id: string;
  index: number;
  parent: IMenubarTab & string;
  title: string;
  link?: string;
}





/**
 * 
 * CAROUSEL MODELS
 * 
 */
interface ICarousel {
  id: string;
  index: number;
  img: IImage;
  title?: string;
  desc?: string;
  vehicle_name: string;
  price?: string;
  engine?: string;
  power?: string;
}


/**
 * 
 * SERVICE MODELS
 * 
 */
interface IService {
  id: string;
  index: number;
  img?: IImage;
  title: string;
  desc: string;
}


/**
 * 
 * REVIEW MODELS
 * 
 */
interface IReview {
  id: string;
  index: number;
  img: IImage;
  fullname: string;
  occupation?: string;
  desc: string;
}



interface ILogin {
  username: string;
  password: string;
}


/**
 * 
 * IMAGE MODELS
 * 
 */
interface IImage {
  id: string;
  imgUrl: string;
  publicid: string;
}

interface IUploadImage {
  imgUrl: string | ArrayBuffer;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

interface IFileUploader extends Omit<IUploadImage, "imgUrl"> {
  file: File
}

interface IInfo {
  users: {
    editor: number;
    user: number;
  };
  carousel: number;
  menubar: {
    tab: number;
    vehicle: number;
  };
  review: number;
  footer: {
    tab: number;
    link: number;
  };
  others: {
    images: number;
    vehicles: number;
  }
}

