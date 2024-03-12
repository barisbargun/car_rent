import { ProfileForm } from "@/components";
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { _useContext } from "@/context/Context"

const Profile = () => {
  const { user } = _useContext();

  return (
    <div className="flex-center max-desktop:flex-col desktop:gap-20 gap-10">

      <Avatar className="desktop:size-80 size-60 relative flex-center">
        <AvatarImage src={user?.img?.imgUrl || "/assets/profile-placeholder.svg"} alt="profile-image" />
        <AvatarFallback>RT</AvatarFallback>
      </Avatar>
      <Card className="desktop:w-[450px]">
        <CardHeader>
          <CardTitle>Edit your profile</CardTitle>
          <CardDescription>If you are an admin, you can't downgrade your role.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm type={"UPDATE"} data={user}/>
        </CardContent>
      </Card>

    </div>
  )
}

export default Profile