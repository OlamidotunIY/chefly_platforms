import { PATHS } from "@/routing"
import { useCategoryStore } from "@chefly/store"
import { useEffect } from "react"
import { matchPath, useLocation } from "react-router-dom"

const DEFAULT_TITLE = "Chefly | Discover and Share Delicious Recipes"

const STATIC_TITLES: Record<string, string> = {
    [PATHS.auth.root]: "Welcome | Chefly",
    [PATHS.auth.login]: "Sign In | Chefly",
    [PATHS.auth.signup]: "Create an Account | Chefly",
    [PATHS.auth.forgotPassword]: "Forgot Password | Chefly",
    [PATHS.auth.resetPassword]: "Reset Password | Chefly",
    [PATHS.auth.verifyEmail]: "Verify Your Email | Chefly",
    [PATHS.app.account]: "Account Settings | Chefly",
}

export function useDocumentTitle()
{
    const { pathname } = useLocation()
    const categories = useCategoryStore((state) => state.categories)

    useEffect(() =>
    {
        if (pathname === PATHS.root)
        {
            document.title = DEFAULT_TITLE
            return
        }

        const staticTitle = STATIC_TITLES[pathname]

        if (staticTitle)
        {
            document.title = staticTitle
            return
        }

        const categoryMatch =
            matchPath(PATHS.categories.detail, pathname) ??
            matchPath(PATHS.categories.root, pathname)

        if (categoryMatch)
        {
            const category = categories.find(
                (item) =>
                    item.slug === categoryMatch.params.categorySlug,
            )
            const subCategory = category?.subCategories.find(
                (item) =>
                    item.slug === categoryMatch.params.subCategorySlug,
            )

            if (subCategory && category)
            {
                document.title =
                    `${subCategory.name} Recipes | ${category.name} | Chefly`
                return
            }

            if (category)
            {
                document.title = `${category.name} Recipes | Chefly`
                return
            }

            document.title = "Recipes | Chefly"
            return
        }

        document.title = "Page Not Found | Chefly"
    }, [categories, pathname])
}
