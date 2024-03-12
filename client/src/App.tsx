import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FooterTab, FooterLink, AdminHome, AdminHomeLayout, AdminLayout, AdminReview, AdminService, Carousel, Home, Image, Login, MenubarTab, MenubarVehicle, Navbar, Profile, User, Header, SiteValue, AdminVehicle } from "@/pages"
import { Toaster } from "@/components/ui/toaster"
import { PATH_LIST } from "@/constants/enum"
import { HandleErrorComponent } from "./components"
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="vehicle" element={<Home />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route path="" element={<AdminHomeLayout />}>
              <Route index element={<AdminHome />} />
              <Route path={PATH_LIST.NAV_ITEM} element={<Navbar />} />
              <Route path={PATH_LIST.CAROUSEL} element={<Carousel />} />
              <Route path={PATH_LIST.MENUBAR_TAB} element={<MenubarTab />} />
              <Route path={PATH_LIST.MENUBAR_VEHICLE} element={<MenubarVehicle />} />
              <Route path={PATH_LIST.VEHICLE} element={<AdminVehicle />} />
              <Route path={PATH_LIST.SERVICE} element={<AdminService />} />
              <Route path={PATH_LIST.REVIEW} element={<AdminReview />} />
              <Route path={PATH_LIST.FOOTER_TAB} element={<FooterTab />} />
              <Route path={PATH_LIST.FOOTER_LINK} element={<FooterLink />} />
              <Route path={PATH_LIST.IMAGE} element={<Image />} />
              <Route path={PATH_LIST.PROFILE} element={<Profile />} />
              <Route path={PATH_LIST.USER} element={<User />} />
              <Route path={PATH_LIST.HEADER} element={<Header />} />
              <Route path={PATH_LIST.SITE} element={<SiteValue />} />
              <Route path="*" element={<HandleErrorComponent type="notFound"/>} />
            </Route>
            <Route path={PATH_LIST.LOGIN} element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App

