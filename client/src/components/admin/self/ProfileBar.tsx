import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { _useContext } from "@/context/Context"
import { GearIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { PATH_LIST } from "@/constants/enum"
const ProfileBar = ({ setOpenDrawer }: { setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user } = _useContext();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (setOpenDrawer) {
      setOpenDrawer(false);
      navigate(PATH_LIST.PROFILE);
    }
  }

  return (
    user
    &&
    <div className="flex max-desktop:flex-center max-desktop:flex-col desktop:gap-2">


      <Avatar className="max-desktop:size-28 desktop:pointer-events-none" onClick={handleNavigate}>
        <AvatarImage src={user.img?.imgUrl || "/assets/profile-placeholder.svg"} alt="avatar" />
        <AvatarFallback>RT</AvatarFallback>
      </Avatar>

      <div className="flex flex-col max-desktop:my-4">
        <p className="text-sm text-muted-foreground">Current User</p>
        <h4 className="text-sm font-medium leading-none">@{user.username}</h4>
      </div>

      {/* Desktop */}
      <Button variant="outline" size="icon" className="max-desktop:hidden" onClick={() => navigate("profile")}>
        <GearIcon className="size-5" />
        <span className="sr-only">Profile Settings</span>
      </Button>

    </div>

  )
}

export default ProfileBar