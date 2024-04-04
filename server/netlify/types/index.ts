/** 
 * 
 * For Redis Storage Values
 * 
*/
interface IRedis {
  menubarTab?: IMenubarTab;
}

interface IMenubarTab {
  title?: string;
  index?: Number;
  type?: Number;
  children?: IMenubarVehicle[];
}

interface IMenubarVehicle {
  index?: Number
  children?: IVehicle[]
  imgUrl?: string;
  title?: string;
  desc?: string;
}

interface IVehicle {
  index?: Number;
  imgUrl?: string;
  title?: string;
  fuel?: string;
  drivetrain?: string;
  wheel?: string;
}



/** 
 * 
 * For CMS panel Dashboard
 * 
*/
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



/** 
 * 
 * For Users
 * 
*/
interface IUser {
  id: string;
  username: string;
  email: string;
  imgUrl?: string | undefined;
  role: number;
};