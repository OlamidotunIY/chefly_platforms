import { useState } from "react"
import { authClient, type RecipeCategory, type User } from "@chefly/api"
import { useCategoryStore, useUserStore } from "@chefly/store"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    Separator,
    SheetTitle,
    SheetTrigger,
    toast,
} from "@workspace/ui/components"
import {
    ArrowLeft,
    BookOpen,
    ChevronRight,
    CreditCard,
    LayoutDashboard,
    LoaderCircle,
    LogOut,
    Menu,
    Monitor,
    Moon,
    Settings,
    ShoppingCart,
    Sun,
    X,
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Logo, useTheme, type Theme } from "@/components"
import { getCategoryPath, PATHS } from "@/routing"

type MobileMenuView =
    | { name: "root" }
    | { name: "categories" }
    | { name: "subcategories"; category: RecipeCategory }
    | { name: "explore" }
    | { name: "theme" }

interface MenuRowProps
{
    icon?: React.ReactNode
    label: string
    onClick?: () => void
    trailing?: React.ReactNode
}

const MenuRow = ({ icon, label, onClick, trailing }: MenuRowProps) => (
    <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left text-base transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
        onClick={onClick}
    >
        {icon}
        <span className="flex-1">{label}</span>
        {trailing}
    </button>
)

export const MobileNavigation = () =>
{
    const navigate = useNavigate()
    const location = useLocation()
    const session = authClient.useSession()
    const categories = useCategoryStore((state) => state.categories)
    const storedUser = useUserStore((state) => state.user)
    const setHydratedSessionId = useUserStore(
        (state) => state.setHydratedSessionId,
    )
    const setStatus = useUserStore((state) => state.setStatus)
    const setUser = useUserStore((state) => state.setUser)
    const { setTheme, theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [view, setView] = useState<MobileMenuView>({ name: "root" })
    const sessionUser = session.data?.user as User | undefined
    const user = storedUser ?? sessionUser
    const isAuthenticated = Boolean(session.data)
    const initial = user?.name?.trim().charAt(0).toUpperCase() || "?"
    const authState = { from: location }

    const closeAndNavigate = (path: string) =>
    {
        setIsOpen(false)
        navigate(path)
    }

    const handleOpenChange = (open: boolean) =>
    {
        setIsOpen(open)

        if (!open)
        {
            setView({ name: "root" })
        }
    }

    const handleLogout = async () =>
    {
        if (isLoggingOut)
        {
            return
        }

        setIsLoggingOut(true)

        try
        {
            const result = await authClient.signOut()

            if (result.error)
            {
                throw result.error
            }

            setHydratedSessionId(null)
            setUser(null)
            setStatus("ready")
            setIsOpen(false)
            navigate(PATHS.root, { replace: true })
            toast.success("You have been logged out.")
        } catch
        {
            toast.error("Unable to log out. Please try again.")
        } finally
        {
            setIsLoggingOut(false)
        }
    }

    const renderBackHeader = (title: string, onBack: () => void) => (
        <div className="flex h-14 items-center border-b px-3">
            <Button
                variant="ghost"
                size="icon"
                aria-label="Go back"
                className="hover:bg-transparent"
                onClick={onBack}
            >
                <ArrowLeft className="size-5" />
            </Button>
            <h2 className="ml-1 font-semibold">{title}</h2>
        </div>
    )

    const renderRootMenu = () => (
        <>
            {isAuthenticated && user ? (
                <div className="flex items-center gap-4 p-5">
                    <Avatar className="size-14">
                        <AvatarImage
                            src={user.image}
                            alt={user.displayUsername || user.name}
                        />
                        <AvatarFallback className="text-lg font-bold">
                            {initial}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="truncate font-semibold">{user.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 p-5">
                    <Button
                        onClick={() => closeAndNavigate(PATHS.auth.signup)}
                    >
                        Join
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                        {
                            setIsOpen(false)
                            navigate(PATHS.auth.login, { state: authState })
                        }}
                    >
                        Sign In
                    </Button>
                </div>
            )}

            <Separator />

            <nav className="overflow-y-auto">
                <div>
                    <MenuRow
                        label="Browse categories"
                        trailing={<ChevronRight className="size-4" />}
                        onClick={() => setView({ name: "categories" })}
                    />
                    <MenuRow
                        label="Explore"
                        trailing={<ChevronRight className="size-4" />}
                        onClick={() => setView({ name: "explore" })}
                    />
                </div>

                {isAuthenticated && (
                    <>
                        <Separator />
                        <div>
                            <MenuRow icon={<BookOpen />} label="My recipes" />
                            <MenuRow icon={<ShoppingCart />} label="My cart" />
                            <MenuRow
                                icon={<LayoutDashboard />}
                                label="Dashboard"
                            />
                        </div>
                        <Separator />
                        <div>
                            <MenuRow
                                icon={<Settings />}
                                label="Account settings"
                                onClick={() =>
                                    closeAndNavigate(PATHS.app.account)
                                }
                            />
                            <MenuRow
                                icon={<CreditCard />}
                                label="Payment methods"
                            />
                        </div>
                    </>
                )}

                <Separator />
                <MenuRow
                    icon={
                        theme === "dark" ? (
                            <Moon />
                        ) : theme === "light" ? (
                            <Sun />
                        ) : (
                            <Monitor />
                        )
                    }
                    label="Theme"
                    trailing={<ChevronRight className="size-4" />}
                    onClick={() => setView({ name: "theme" })}
                />

                {isAuthenticated && (
                    <>
                        <Separator />
                        <MenuRow
                            icon={
                                isLoggingOut ? (
                                    <LoaderCircle className="animate-spin" />
                                ) : (
                                    <LogOut />
                                )
                            }
                            label={isLoggingOut ? "Logging out..." : "Log out"}
                            onClick={() => void handleLogout()}
                        />
                    </>
                )}
            </nav>
        </>
    )

    const renderCategories = () => (
        <>
            {renderBackHeader("Browse categories", () =>
                setView({ name: "root" }),
            )}
            <nav className="overflow-y-auto">
                {categories.map((category) => (
                    <MenuRow
                        key={category.id}
                        label={category.name}
                        trailing={<ChevronRight className="size-4" />}
                        onClick={() =>
                            setView({ name: "subcategories", category })
                        }
                    />
                ))}
            </nav>
        </>
    )

    const renderSubCategories = (category: RecipeCategory) =>
    {
        const groups = Object.entries(
            category.subCategories.reduce<
                Record<string, RecipeCategory["subCategories"]>
            >((grouped, subCategory) =>
            {
                const group = subCategory.group || "Explore"
                grouped[group] ??= []
                grouped[group].push(subCategory)
                return grouped
            }, {}),
        )

        return (
            <>
                {renderBackHeader(category.name, () =>
                    setView({ name: "categories" }),
                )}
                <div className="overflow-y-auto">
                    <MenuRow
                        label={`View all ${category.name}`}
                        trailing={<ChevronRight className="size-4" />}
                        onClick={() =>
                            closeAndNavigate(
                                getCategoryPath(category.slug),
                            )
                        }
                    />
                    <Separator />
                    {groups.map(([group, subCategories]) => (
                        <section key={group}>
                            <p className="bg-muted/40 px-5 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                {group}
                            </p>
                            {subCategories.map((subCategory) => (
                                <MenuRow
                                    key={subCategory.id}
                                    label={subCategory.name}
                                    trailing={
                                        <ChevronRight className="size-4" />
                                    }
                                    onClick={() =>
                                        closeAndNavigate(
                                            getCategoryPath(
                                                category.slug,
                                                subCategory.slug,
                                            ),
                                        )
                                    }
                                />
                            ))}
                            <Separator />
                        </section>
                    ))}
                </div>
            </>
        )
    }

    const renderExplore = () => (
        <>
            {renderBackHeader("Explore", () => setView({ name: "root" }))}
            <nav className="overflow-y-auto">
                <MenuRow label="Find recipes" />
                <MenuRow label="Popular recipes" />
                <MenuRow label="New recipes" />
                <MenuRow label="Become a chef" />
            </nav>
        </>
    )

    const renderTheme = () => (
        <>
            {renderBackHeader("Theme", () => setView({ name: "root" }))}
            <nav>
                {(
                    [
                        ["light", "Light", <Sun key="light" />],
                        ["dark", "Dark", <Moon key="dark" />],
                        ["system", "System", <Monitor key="system" />],
                    ] as const
                ).map(([value, label, icon]) => (
                    <MenuRow
                        key={value}
                        icon={icon}
                        label={label}
                        trailing={
                            theme === value ? (
                                <span className="size-2 rounded-full bg-primary" />
                            ) : undefined
                        }
                        onClick={() => setTheme(value as Theme)}
                    />
                ))}
            </nav>
        </>
    )

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                    className="hover:bg-transparent"
                >
                    <Menu className="size-6" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                showCloseButton={false}
                className="w-[min(92vw,25rem)]"
            >
                <div className="flex h-17 items-center justify-between border-b px-5">
                    <Logo className="size-18" />
                    <SheetClose asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Close navigation menu"
                            className="hover:bg-transparent"
                        >
                            <X className="size-5" />
                        </Button>
                    </SheetClose>
                </div>

                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                    Browse Chefly navigation, categories, and account options.
                </SheetDescription>

                <div className="flex min-h-0 flex-1 flex-col">
                    {view.name === "root" && renderRootMenu()}
                    {view.name === "categories" && renderCategories()}
                    {view.name === "subcategories" &&
                        renderSubCategories(view.category)}
                    {view.name === "explore" && renderExplore()}
                    {view.name === "theme" && renderTheme()}
                </div>
            </SheetContent>
        </Sheet>
    )
}
