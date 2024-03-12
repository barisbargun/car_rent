import { ToastMessage, PageLoader, OpenDialog, UserCard, ProfileForm, HandleErrorComponent } from "@/components"
import MaxCountComp from "@/components/MaxCountComp";
import { maxCountsBySection } from "@/constants";
import { ROLE_LIST } from "@/constants/enum";
import { _useContext } from "@/context/Context";
import { _useMutation } from "@/lib/actions";
import { useGetUsers } from "@/lib/data"
import { useEffect } from "react";

const User = () => {
  const { data, isPending, isSuccess, isError, error } = useGetUsers();
  const { user } = _useContext();

  const toastMessage = ToastMessage();

  useEffect(() => {
    if (isError) {
      toastMessage({ defaultText: "error", description: error });
    }
  }, [isError])


  return (
    user.role != ROLE_LIST.ADMIN ?
      <HandleErrorComponent type="authorized" />
      :
      isPending ? <PageLoader text="Users loading.." /> : (isSuccess && data) &&
        <>
          <div className="flex flex-wrap gap-4 max-desktop:justify-center">
            {data.filter(v => v.id != user.id).slice().sort(a => a.role > 0 ? 1 : -1).map(v => (
              <UserCard data={v} key={v.id} />
            ))}
          </div>

          {/** Add button */}
          {data?.length < maxCountsBySection.user &&
            <div className="fixed right-10 bottom-6 ">
              <OpenDialog
                dialogProps=
                {{
                  buttonText: "Add user",
                  title: "Add a user",
                  desc: "Add a new user",
                  width: "w-[500px]"
                }}>
                <ProfileForm type={"CREATE"} />
              </OpenDialog>
            </div>
          }
          <MaxCountComp count={data.length} type="user" />

        </>
  )
}

export default User

