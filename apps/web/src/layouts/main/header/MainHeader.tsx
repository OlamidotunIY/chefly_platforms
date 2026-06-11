import { ChefButton } from "@workspace/ui/components"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderUser } from "./HeaderUser"
import { useNavigate } from "react-router-dom"

export const Header = () =>
{
    const navigate = useNavigate()
    return (
        <div className="w-screen h-20 bg-body border-b flex items-center justify-between px-5">
            <HeaderLogo />
            <div className="flex items-center space-x-2.5">
                <ChefButton isChef={false} onClick={() =>
                {
                    navigate("")
                }} onLearnMore={() =>
                {
                    navigate("")
                }} />
                <HeaderUser />
            </div>
        </div>
    )
}
