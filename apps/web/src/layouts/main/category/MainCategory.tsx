import { useCallback, useEffect, useRef, useState } from "react"
import { useCategoryStore } from "@chefly/store"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SubCategory } from "./SubCategory"
import { PageContainer } from "@/components"
import { getCategoryPath } from "@/routing"
import { Link } from "react-router-dom"

const SCROLL_AMOUNT = 320

export const MainCategory = () =>
{
    const { categories } = useCategoryStore()
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
    const activeCategory = categories.find(
        (category) => category.id === activeCategoryId,
    )

    const updateScrollControls = useCallback(() =>
    {
        const container = scrollContainerRef.current

        if (!container)
        {
            return
        }

        const maxScrollLeft = container.scrollWidth - container.clientWidth
        setCanScrollLeft(container.scrollLeft > 1)
        setCanScrollRight(container.scrollLeft < maxScrollLeft - 1)
    }, [])

    useEffect(() =>
    {
        const container = scrollContainerRef.current

        if (!container)
        {
            return
        }

        updateScrollControls()

        const resizeObserver = new ResizeObserver(updateScrollControls)
        resizeObserver.observe(container)
        container.addEventListener("scroll", updateScrollControls, {
            passive: true,
        })

        return () =>
        {
            resizeObserver.disconnect()
            container.removeEventListener("scroll", updateScrollControls)
        }
    }, [categories, updateScrollControls])

    const scroll = (direction: "left" | "right") =>
    {
        scrollContainerRef.current?.scrollBy({
            left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
            behavior: "smooth",
        })
    }

    return (
        <div
            ref={menuRef}
            className="relative w-full border-b"
            onMouseLeave={() => setActiveCategoryId(null)}
            onBlur={(event) =>
            {
                if (!menuRef.current?.contains(event.relatedTarget))
                {
                    setActiveCategoryId(null)
                }
            }}
        >
            <PageContainer className="relative">
                <div
                    ref={scrollContainerRef}
                    className="w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                    <div className="flex flex-nowrap items-center gap-6">
                    {categories.map((category) => (
                        <Link
                            to={getCategoryPath(category.slug)}
                            key={category.id}
                            aria-expanded={activeCategoryId === category.id}
                            className="relative shrink-0 cursor-pointer whitespace-nowrap py-3 after:absolute after:right-0 after:-bottom-px after:left-0 after:z-10 after:h-1 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:text-primary focus-visible:after:scale-x-100 aria-expanded:text-primary aria-expanded:after:scale-x-100"
                            onFocus={() => setActiveCategoryId(category.id)}
                            onMouseEnter={() => setActiveCategoryId(category.id)}
                        >
                            {category.name}
                        </Link>
                    ))}
                    </div>
                </div>

                {canScrollLeft && (
                    <div className="absolute inset-y-0 left-0 z-20 flex items-center bg-linear-to-r from-background via-background to-transparent pr-6">
                        <button
                            type="button"
                            aria-label="Scroll categories left"
                            className="ml-1 flex size-8 cursor-pointer items-center justify-center transition-colors hover:bg-transparent focus-visible:outline-2 focus-visible:outline-primary"
                            onClick={() => scroll("left")}
                        >
                            <ChevronLeft className="size-6" />
                        </button>
                    </div>
                )}

                {canScrollRight && (
                    <div className="absolute inset-y-0 right-0 z-20 flex items-center bg-linear-to-l from-background via-background to-transparent pl-6">
                        <button
                            type="button"
                            aria-label="Scroll categories right"
                            className="mr-1 flex size-8 cursor-pointer items-center justify-center transition-colors hover:bg-transparent focus-visible:outline-2 focus-visible:outline-primary"
                            onClick={() => scroll("right")}
                        >
                            <ChevronRight className="size-6" />
                        </button>
                    </div>
                )}
            </PageContainer>

            {activeCategory && (
                <SubCategory category={activeCategory} />
            )}
        </div>
    )
}
