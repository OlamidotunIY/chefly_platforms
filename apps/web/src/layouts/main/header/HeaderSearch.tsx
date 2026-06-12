import { useState, type ComponentProps, type FormEvent } from "react"
import { useCategoryStore } from "@chefly/store"
import { Button, ButtonGroup, Input } from '@workspace/ui/components'
import { Search, TrendingUp } from 'lucide-react'
import { cn } from "@workspace/ui/lib"
import { useNavigate } from "react-router-dom"
import { getCategoryPath } from "@/routing"

interface HeaderSearchProps extends ComponentProps<"div">
{
    inputId?: string
    isActive: boolean
    onActiveChange: (isActive: boolean) => void
}

export const HeaderSearch = ({
    className,
    inputId = "header-search",
    isActive,
    onActiveChange,
    ...props
}: HeaderSearchProps) =>
{
    const navigate = useNavigate()
    const categories = useCategoryStore((state) => state.categories)
    const [query, setQuery] = useState("")
    const allSearches = categories.flatMap((category) =>
        category.subCategories.map((subCategory) => ({
            categorySlug: category.slug,
            id: subCategory.id,
            name: subCategory.name,
            subCategorySlug: subCategory.slug,
        })),
    )
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const suggestions = allSearches
        .filter((searchItem) =>
            normalizedQuery
                ? searchItem.name
                    .toLocaleLowerCase()
                    .includes(normalizedQuery)
                : true,
        )
        .slice(0, 10)

    const openSearchResult = (searchItem: (typeof suggestions)[number]) =>
    {
        setQuery(searchItem.name)
        onActiveChange(false)
        navigate(
            getCategoryPath(
                searchItem.categorySlug,
                searchItem.subCategorySlug,
            ),
        )
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault()

        const firstSuggestion = suggestions[0]

        if (!firstSuggestion)
        {
            return
        }

        openSearchResult(firstSuggestion)
    }

    return (
        <div
            className={cn("relative w-full", isActive && "z-50", className)}
            {...props}
        >
            <form role="search" onSubmit={handleSubmit}>
                <ButtonGroup className="w-full bg-background">
                    <Input
                        id={inputId}
                        value={query}
                        autoComplete="off"
                        placeholder="Type to search..."
                        aria-expanded={isActive}
                        aria-controls={`${inputId}-suggestions`}
                        onChange={(event) => setQuery(event.target.value)}
                        onFocus={() => onActiveChange(true)}
                        onClick={() => onActiveChange(true)}
                    />
                    <Button type="submit" variant="outline" aria-label="Search">
                        <Search className='size-4' />
                    </Button>
                </ButtonGroup>
            </form>

            {isActive && (
                <div
                    id={`${inputId}-suggestions`}
                    className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-50 rounded-md border bg-popover p-5 text-popover-foreground shadow-xl"
                >
                    <div className="mb-4 flex items-center gap-2">
                        <TrendingUp className="size-4 text-primary" />
                        <p className="text-xs font-semibold tracking-wide uppercase">
                            {normalizedQuery
                                ? "Search suggestions"
                                : "Popular right now"}
                        </p>
                    </div>

                    {suggestions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((searchItem) => (
                                <button
                                    key={searchItem.id}
                                    type="button"
                                    className="cursor-pointer rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                                    onClick={() =>
                                        openSearchResult(searchItem)}
                                >
                                    {searchItem.name}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No matching recipes or categories found.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
