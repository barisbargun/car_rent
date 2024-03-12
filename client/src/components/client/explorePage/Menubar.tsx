import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui'
import { TAB_LIST } from '@/constants/enum'
import { Link, useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  data: IMenubarTab[];
}

const Menubar = ({ data }: Props) => {

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const createPageUrl = (index: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1")
    params.set("category", index.toString());
    return `${location.pathname}?${params.toString()}`;
  }

  const getChildren = (vehicle: IMenubarVehicle[]) => {
    return (
      vehicle.sort((a, b) => a.index - b.index).map(v => (
        <li key={v.id}>
          <NavigationMenuLink asChild>
            <Link className='relative cursor-pointer' to={createPageUrl(v.index)}>
              <img width={251} height={82} src={v.img?.imgUrl} alt='menu img' />
              <div className='absolute bottom-0 left-0 w-full p-2'>
                <div className="text-sm font-medium line-clamp-1">
                  {v?.title}
                </div>
                <p className="text-xs leading-tight line-clamp-2 opacity-80 max-sm:line-clamp-1">
                  {v?.desc}
                </p>
              </div>
            </Link>

          </NavigationMenuLink>
        </li>
      ))

    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className='max-md:flex flex-wrap px-4'>
        {
          data.slice().sort((a, b) => a.index - b.index).map(v => (
            <NavigationMenuItem key={v.id}>
              <NavigationMenuTrigger>{v.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className={"grid p-4 gap-3 text-white " + (v.type == TAB_LIST.GRID_FOUR ? "grid4" : "grid6")}>
                  <li className={"row-span-3 " + (v.type == TAB_LIST.GRID_SIX ? "hidden" : "")}>
                    <NavigationMenuLink asChild>
                      <Link className='relative cursor-pointer' to={createPageUrl(v.children[0].index)}>
                        <img width={188} className='h-full' src={v.children[0]?.img?.imgUrl} />
                        <div className='absolute bottom-0 left-0 w-full p-4'>
                          <div className="mb-2 mt-4 text-lg font-medium line-clamp-3">
                            {v.children[0]?.title}
                          </div>
                          <p className="text-sm leading-tight line-clamp-5 max-sm:line-clamp-2 opacity-80">
                            {v.children[0]?.desc}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {
                    getChildren(
                      v.children.slice(v.type == TAB_LIST.GRID_FOUR ? 1 : 0, v.type == TAB_LIST.GRID_FOUR ? 4 : 6)
                    )
                  }
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))
        }
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link to={createPageUrl(0)}>

              Show all
            </Link>

          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Menubar