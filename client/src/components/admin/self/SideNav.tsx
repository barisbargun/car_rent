import { mobileNavItems, navItems } from "@/constants"
import NavItem from "./NavItem"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import ProfileBar from "./ProfileBar"
import { RowsIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "@/components/ModeToggle"
import { Link } from "react-router-dom"
import LogoutButton from "@/components/LogoutButton"
import { useState } from "react"
import { PATH_LIST } from "@/constants/enum"

const SideNav = () => {

  const [openDrawer, setOpenDrawer] = useState(false);

  const GetTitle = () => {
    return <Link className="brandText desktop:mb-20" to={`/${PATH_LIST.ADMIN}`}>Reint</Link>
  }

  const GetNavItems = (type: "DESKTOP" | "MOBILE" = "DESKTOP") => {
    let items;
    if (type == "MOBILE") items = mobileNavItems
    else items = navItems;
    return items.map(v => (
      <NavItem item={v} key={v.title} setOpenDrawer={setOpenDrawer} />
    ))
  }

  const Buttons = () => {
    return (
      <span className="flex gap-2 max-desktop:flex-col ">
        <ModeToggle />
        <LogoutButton />
      </span>
    )
  }


  return (
    <>
      {/** Navigation Desktop */}
      <span className="max-desktop:hidden">
        <section className="absolute right-4 flex gap-2">
          <ProfileBar />
          <Buttons />
        </section>

        <nav className="w-sideNav h-screen 2xl:ml-10 xl:ml-5 ml-2 flex flex-col items-center">
          <GetTitle />
          <div className="flex flex-col items-start gap-3 h-full">
            {GetNavItems()}
          </div>

        </nav>
      </span>

      {/** Navigation Mobile */}

      <nav className="hidden w-full max-desktop:flex justify-between">
        <GetTitle />
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerTrigger>{<RowsIcon />}</DrawerTrigger>
          <DrawerContent >
            <DrawerHeader>
              <div className="flex-center">

                <ProfileBar setOpenDrawer={setOpenDrawer} />
                <span className="absolute top-4 right-4">
                  <Buttons />

                </span>
              </div>

            </DrawerHeader>
            <div className="w-full flex-center pb-2 flex-col gap-1">
              {GetNavItems("MOBILE")}
            </div>


          </DrawerContent>
        </Drawer>

      </nav>
    </>
  )
}

export default SideNav