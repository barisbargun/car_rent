import { Outlet } from 'react-router-dom'
import { DataProvider } from '@/context/Context.tsx'

const AdminLayout = () => {
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 w-screen h-screen bg-adminPattern bg-no-repeat bg-right-top"></div>
        <DataProvider defaultTheme='dark'>
          <Outlet />
        </DataProvider >
    </>
  )
}

export default AdminLayout