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