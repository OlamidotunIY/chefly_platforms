import type { RecipeCategory } from "@chefly/api"
import { ChevronRight } from "lucide-react"
import { PageContainer } from "@/components"
import { getCategoryPath } from "@/routing"
import { Link } from "react-router-dom"

interface SubCategoryProps
{
    category: RecipeCategory
}

export const SubCategory = ({ category }: SubCategoryProps) =>
{
    const groups = Object.entries(
        category.subCategories.reduce<Record<string, typeof category.subCategories>>(
            (groupedSubCategories, subCategory) =>
            {
                const group = subCategory.group || "Explore"
                groupedSubCategories[group] ??= []
                groupedSubCategories[group].push(subCategory)
                return groupedSubCategories
            },
            {},
        ),
    )

    return (
        <div className="absolute top-full right-0 left-0 z-40 border-y bg-popover text-popover-foreground shadow-lg">
            <PageContainer className="flex gap-12 py-7">
                <div className="w-64 shrink-0 border-r pr-8">
                    <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                        Explore
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                        {category.name}
                    </h2>
                    {category.description && (
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {category.description}
                        </p>
                    )}
                </div>

                <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-x-10 gap-y-7">
                    {groups.map(([group, subCategories]) => (
                        <section key={group}>
                            <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                {group}
                            </h3>
                            <ul className="space-y-2">
                                {subCategories.map((subCategory) => (
                                    <li key={subCategory.id}>
                                        <Link
                                            to={getCategoryPath(
                                                category.slug,
                                                subCategory.slug,
                                            )}
                                            className="group flex w-full cursor-pointer items-center justify-between gap-3 text-left text-sm transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                                        >
                                            <span>{subCategory.name}</span>
                                            <ChevronRight className="size-3.5 translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </PageContainer>
        </div>
    )
}
