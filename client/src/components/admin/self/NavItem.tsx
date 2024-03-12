import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { IAdminNavItem } from "@/types/exports"

type Props = {
  item: IAdminNavItem
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const NavItem = ({ item, setOpenDrawer }: Props) => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    setOpenDrawer(false);
    navigate(link || "")
  }

  const NavButton = (link: string, title: string, Icon?: typeof item.icon, className?: string) => {
    return (

      <Button onClick={() => handleClick(link)} variant="ghost" size="lg"
        className={("px-0 w-32 max-desktop:w-fit") + className}>
        {Icon && <Icon width={15} height={15} className="mr-1" />}{title}
      </Button>
    );
  }

  return (
    item.link ? item.lastItem ? <div className="desktop:flex-1 desktop:flex desktop:items-end desktop:pb-16">{NavButton(item.link, item.title, item.icon)}</div> :
      NavButton(item.link, item.title, item.icon) :
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {NavButton("", item.title, item.icon)}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 desktop:absolute desktop:left-0">
          <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
          <DropdownMenuGroup>

            <DropdownMenuSeparator />
            {
              item.children?.map(v => (
                <DropdownMenuItem key={v.title} onClick={() => handleClick(v.link)}>
            {v.title}
          </DropdownMenuItem>
          ))
            }
        </DropdownMenuGroup>

      </DropdownMenuContent>
      </DropdownMenu >
  )
}

export default NavItem