import { Navbar, PageLoader } from "@/components"
import { Footer, Main, Explore, Reviews, Services, Subscribe } from "."
import { Suspense, useCallback } from "react"
import { useGetHeader, useGetSiteValue } from "@/lib/data"
import { PAGE_LIST } from "@/constants/enum"

const Home = () => {
  const { data: siteData, isPending: sitePending } = useGetSiteValue();
  const { data: headerData, isPending: headerPending } = useGetHeader();

  const getHeader = useCallback((index: number) => headerData?.find(v => v.index == index), [headerData])

  return (
    sitePending || headerPending ? <PageLoader text="Page Loading.." /> :
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

      </div>
  )
}

export default Home