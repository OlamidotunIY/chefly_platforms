import { PageContainer } from "@/components"
import { useUserStore } from "@chefly/store"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components"


export const HomePage = () =>
{
    const { user } = useUserStore()
    const initial = user?.name.trim().charAt(0).toUpperCase() || "?"
    return (
        <PageContainer>
            <div className="py-10 flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage
                        src={user?.image as string}
                        alt={`@${user?.displayUsername}`}
                    />
                    <AvatarFallback className="font-bold text-lg">{initial}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl font-bold">Welcome back, <span className="capitalize">{user?.name}</span></h1>
                </div>
                
            </div>
        </PageContainer>
    )
}
