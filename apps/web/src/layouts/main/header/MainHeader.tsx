import {
    Button,
    ChefButton,
    HeaderIcons,
} from "@workspace/ui/components"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderUser } from "./HeaderUser"
import { useNavigate } from "react-router-dom"
import { HeaderSearch } from "./HeaderSearch"
import { ShoppingCart } from "lucide-react"
import { MobileNavigation } from "./MobileNavigation"
import { PageContainer } from "@/components"
import { useEffect, useState } from "react"

export const Header = () =>
{
    const navigate = useNavigate()
    const [isSearchActive, setIsSearchActive] = useState(false)

    useEffect(() =>
    {
        if (!isSearchActive)
        {
            return
        }

        const handleEscape = (event: KeyboardEvent) =>
        {
            if (event.key === "Escape")
            {
                setIsSearchActive(false)
            }
        }

        document.addEventListener("keydown", handleEscape)

        return () => document.removeEventListener("keydown", handleEscape)
    }, [isSearchActive])

    return (
        <header className="w-full bg-background">
            {isSearchActive && (
                <button
                    type="button"
                    aria-label="Close search"
                    className="fixed inset-0 z-30 cursor-default bg-foreground/45"
                    onClick={() => setIsSearchActive(false)}
                />
            )}

            <div className="relative z-40 hidden border-b bg-background lg:block">
                <PageContainer className="flex h-18 items-center gap-6">
                    <div className="flex min-w-0 flex-1 items-center gap-5">
                        <HeaderLogo />
                        <Button
                            variant="ghost"
                            className="px-0 text-sm font-light normal-case hover:bg-transparent hover:text-primary"
                        >
                            Find Recipe
                        </Button>
                        <HeaderSearch
                            className="min-w-48 flex-1"
                            inputId="desktop-search"
                            isActive={isSearchActive}
                            onActiveChange={setIsSearchActive}
                        />
                    </div>

                    <div className="flex shrink-0 items-center gap-5">
                        <ChefButton
                            isChef={false}
                            onClick={() => navigate("")}
                            onLearnMore={() => navigate("")}
                        />
                        <HeaderIcons />
                        <HeaderUser />
                    </div>
                </PageContainer>
            </div>

            <div className="relative z-40 bg-background lg:hidden">
                <div className="border-b">
                    <PageContainer className="grid h-16 grid-cols-3 items-center">
                        <div className="justify-self-start">
                            <MobileNavigation />
                        </div>

                        <div className="justify-self-center">
                            <HeaderLogo className="size-16" />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open cart"
                            className="justify-self-end hover:bg-transparent hover:text-primary"
                        >
                            <ShoppingCart className="size-5" />
                        </Button>
                    </PageContainer>
                </div>

                <div className="border-b">
                    <PageContainer className="py-3">
                        <HeaderSearch
                            inputId="mobile-search"
                            isActive={isSearchActive}
                            onActiveChange={setIsSearchActive}
                        />
                    </PageContainer>
                </div>
            </div>
        </header>
    )
}
