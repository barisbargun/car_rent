import { IHeader } from '@/types/exports'

type Props = {
  header?: IHeader;
  defaultTitle:string;
}

const Header = ({ header,defaultTitle }: Props) => {
  return (
    <div className={"w-full " + (header?.desc ? " flex flex-col justify-start" : "flex-center")}>
      <h2 className={'headerText ' + (header?.desc ? "tracking-normal" : "text-center")}>{header?.title || defaultTitle || ""}</h2>
      {header?.desc && <p className='headerDesc'>{header?.desc}</p>}
    </div>
  )
}

export default Header