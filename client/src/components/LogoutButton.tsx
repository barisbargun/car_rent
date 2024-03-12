import { _useMutation } from '@/lib/actions'
import { useEffect } from 'react'
import { Button } from './ui';
import { ExitIcon } from '@radix-ui/react-icons';
import Loader from '@/svg/Loader';
import { useNavigate } from 'react-router-dom';
import HandleAlert from './HandleAlert';
import { ToastMessage } from '.';
import { PATH_LIST } from "@/constants/enum"
const LogoutButton = () => {
  const { mutateAsync, isSuccess, isError, isPending } = _useMutation({
    models: "LOGOUT"
  });
  const toastMessage = ToastMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await new Promise(res => setTimeout(res, 2000));
      navigate(0);
    }

    if (isSuccess) {
      toastMessage({ defaultText: "logout" });
    }
    else if (isError) {
      toastMessage({ defaultText: "error" });
    }
    if (isSuccess || isError) logout();


  }, [isSuccess, isError])

  const handleLogout = async () => {
    await mutateAsync({ path: PATH_LIST.LOGOUT, body: {} });
  }

  return (
    <HandleAlert trigger={handleLogout}>
      <Button disabled={isPending || isSuccess} variant="outline" size="icon">
        {isPending ? <Loader width={20} height={20} /> : <ExitIcon className="size-4" />}
        <span className="sr-only">Logout</span>
      </Button>
    </HandleAlert>

  )
}

export default LogoutButton