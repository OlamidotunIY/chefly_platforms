import { PageContainer } from "@/components"
import { getCategoryPath, PATHS } from "@/routing"
import { useCategoryStore } from "@chefly/store"
import { ArrowRight, ChevronRight, House } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export const CategoryPage = () =>
{
    const { categorySlug, subCategorySlug } = useParams()
    const categories = useCategoryStore((state) => state.categories)
    const status = useCategoryStore((state) => state.status)
    const category = categories.find((item) => item.slug === categorySlug)
    const subCategory = category?.subCategories.find(
        (item) => item.slug === subCategorySlug,
    )
    const hasInvalidSubCategory = Boolean(
        subCategorySlug && !subCategory,
    )

    if (status === "idle" || status === "loading")
    {
        return (
            <PageContainer className="py-12">
                <div className="animate-pulse space-y-5">
                    <div className="h-4 w-56 rounded bg-muted" />
                    <div className="h-10 w-full max-w-xl rounded bg-muted" />
                    <div className="h-5 w-full max-w-2xl rounded bg-muted" />
                    <div className="h-40 rounded-xl bg-muted" />
                </div>
            </PageContainer>
        )
    }

    if (!category || hasInvalidSubCategory)
    {
        return (
            <PageContainer className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-semibold text-primary">
                    Category not found
                </p>
                <h1 className="mt-2 text-3xl font-bold">
                    This recipe category does not exist
                </h1>
                <p className="mt-3 max-w-md text-muted-foreground">
                    The category may have moved or the address may be incorrect.
                </p>
                <Link
                    to={PATHS.root}
                    className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline"
                >
                    Browse all recipes
                    <ArrowRight className="size-4" />
                </Link>
            </PageContainer>
        )
    }

    const relatedSubCategories = category.subCategories.filter(
        (item) => item.id !== subCategory?.id,
    )
    const pageTitle = subCategory?.name ?? category.name
    const pageDescription =
        subCategory?.description ||
        category.description ||
        `Discover recipes, ideas, and chefs specializing in ${pageTitle.toLowerCase()}.`

    return (
        <main>
            <PageContainer className="py-8 sm:py-12">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                >
                    <Link
                        to={PATHS.root}
                        aria-label="Home"
                        className="transition-colors hover:text-primary"
                    >
                        <House className="size-4" aria-hidden="true" />
                    </Link>
                    <ChevronRight className="size-4" />
                    {subCategory ? (
                        <>
                            <Link
                                to={getCategoryPath(category.slug)}
                                className="hover:text-primary"
                            >
                                {category.name}
                            </Link>
                            <ChevronRight className="size-4" />
                            <span className="text-foreground">
                                {subCategory.name}
                            </span>
                        </>
                    ) : (
                        <span className="text-foreground">
                            {category.name}
                        </span>
                    )}
                </nav>

                <section className="max-w-3xl">
                    {subCategory && (
                        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                            {category.name}
                        </p>
                    )}
                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                        {pageTitle}
                    </h1>
                    <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                        {pageDescription}
                    </p>
                </section>

                {relatedSubCategories.length > 0 && (
                    <section className="mt-10">
                        <h2 className="text-sm font-semibold">
                            {subCategory
                                ? `Explore more in ${category.name}`
                                : `Browse ${category.name}`}
                        </h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {relatedSubCategories.map((item) => (
                                <Link
                                    key={item.id}
                                    to={getCategoryPath(
                                        category.slug,
                                        item.slug,
                                    )}
                                    className="rounded-full border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mt-12 border-t pt-10">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {pageTitle} recipes
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Recipes published under this topic will appear here.
                        </p>
                    </div>
                </section>
            </PageContainer>
        </main>
    )
}
