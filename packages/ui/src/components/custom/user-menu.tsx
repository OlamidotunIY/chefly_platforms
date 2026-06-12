import {
    BookOpen,
    CreditCard,
    LayoutDashboard,
    LoaderCircle,
    LogOut,
    Monitor,
    Moon,
    Settings,
    ShoppingCart,
    Sun,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../dropdown-menu"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../avatar"
import { useUserStore } from "@chefly/store"

type Theme = "dark" | "light" | "system"

interface UserMenuProps
{
    isLoggingOut?: boolean
    onLogout: () => Promise<void>
    theme: Theme
    onThemeChange: (theme: Theme) => void
}

export const UserMenu = ({
    isLoggingOut = false,
    onLogout,
    theme,
    onThemeChange,
}: UserMenuProps) =>
{
    const { user } = useUserStore()
    const initial = user?.name.trim().charAt(0).toUpperCase() || "?"


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar className="w-10 h-10">
                        <AvatarImage
                            src={user?.image as string}
                            alt={`@${user?.displayUsername}`}
                        />
                        <AvatarFallback className="font-bold text-lg">{initial}</AvatarFallback>
                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 border" align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage
                                        src={user?.image as string}
                                        alt={`@${user?.displayUsername}`}
                                    />
                                    <AvatarFallback className="font-bold text-lg">{initial}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col space-y-2">
                                    <h1>{user?.name}</h1>
                                    <p className="text-muted-foreground normal-case">{user?.email}</p>
                                </div>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="normal-case">
                            <BookOpen />
                            My recipes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="normal-case">
                            <ShoppingCart />
                            My Cart
                        </DropdownMenuItem>
                        <DropdownMenuItem className="normal-case">
                            <LayoutDashboard />
                            Dashboard
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="normal-case">
                            <Settings />
                            Account Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="normal-case">
                            <CreditCard />
                            Payments Method
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="normal-case">
                                {theme === "dark" ? (
                                    <Moon />
                                ) : theme === "light" ? (
                                    <Sun />
                                ) : (
                                    <Monitor />
                                )}
                                Theme Switcher
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className="border">
                                    <DropdownMenuRadioGroup
                                        value={theme}
                                        onValueChange={(value) =>
                                            onThemeChange(value as Theme)
                                        }
                                    >
                                        <DropdownMenuRadioItem
                                            className="normal-case"
                                            value="light"
                                        >
                                            <Sun />
                                            Light
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem
                                            className="normal-case"
                                            value="dark"
                                        >
                                            <Moon />
                                            Dark
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem
                                            className="normal-case"
                                            value="system"
                                        >
                                            <Monitor />
                                            System
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="normal-case text-destructive focus:text-destructive"
                            disabled={isLoggingOut}
                            onSelect={() => void onLogout()}
                        >
                            {isLoggingOut ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                <LogOut />
                            )}
                            {isLoggingOut ? "Logging out..." : "Log out"}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
