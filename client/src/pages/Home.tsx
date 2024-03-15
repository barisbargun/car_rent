import { CustomErrorComponent, Navbar, PageLoader } from "@/components"
import { Footer, Main, Explore, Reviews, Services, Subscribe } from "."
import { Suspense, useCallback } from "react"
import { useGetHeader, useGetSiteValue } from "@/lib/data"
import { PAGE_LIST } from "@/constants/enum"
import { Button } from "@/components/ui"

const Home = () => {
  const { data: siteData, isPending: sitePending, isSuccess: siteSuccess, refetch: siteRefetch } = useGetSiteValue();
  const { data: headerData, isPending: headerPending, isSuccess: headerSuccess, refetch: headerRefetch } = useGetHeader();

  const getHeader = useCallback((index: number) => headerData?.find(v => v.index == index), [headerData])

  return (
    sitePending || headerPending ? <PageLoader text="Page Loading.." /> :
      headerSuccess && siteSuccess ?
        <div className="backgroundPattern text-textColor">
          <Navbar navImg={siteData && siteData[0].navImg} navName={siteData && siteData[0].navName} />
          <main className="w-screen min-h-screen flex flex-col items-center">
            <Suspense>
              <Main />
            </Suspense>
            <Explore header={getHeader(PAGE_LIST.EXPLORE)} />
            <Services header={getHeader(PAGE_LIST.SERVICE)} />
            <Subscribe />
            <Reviews header={getHeader(PAGE_LIST.REVIEW)} />
            <Footer logo={siteData && siteData[0].logoImg} desc={siteData && siteData[0].footerDesc} />
          </main>

        </div> :
        <span className="absolute desktop:bottom-5 desktop:right-5 p-4 rounded-md bg-destructive/100 text-white max-w-full max-desktop:top-2 max-desktop:left-2 max-desktop:mr-2">
          <CustomErrorComponent />
          <Button variant="outline" className="text-black mt-2" onClick={() => { siteRefetch(); headerRefetch(); }}>Refetch</Button>
        </span>
  )
}

export default Home