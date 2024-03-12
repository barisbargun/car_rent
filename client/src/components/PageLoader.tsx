import Loader from '@/svg/Loader'

const PageLoader = ({ text = "Loading..", color="BLACK" }) => {
  return (
    <div className={"flex-center gap-1 absolute right-0 bottom-0 w-full h-screen pointer-events-none z-[9999] " + (color == "WHITE" ? "bg-white" : "")}>
      <Loader width={40} height={40} />
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{text}</h4>
    </div>
  )
}

export default PageLoader