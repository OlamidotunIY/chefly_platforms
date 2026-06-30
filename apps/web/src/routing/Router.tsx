import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./Paths";
import { RootLayout } from "@/layouts";
import { CategoryPage } from "@/features/categories";
import { LandingPage } from "@/features/auth/pages/LandingPage";

export const router = createBrowserRouter([
    {
        path: PATHS.root,
        element: <RootLayout />,
        children: [
            {
                index: true,
                Component: LandingPage,
            },
            {
                path: PATHS.categories.root,
                Component: CategoryPage,
            },
            {
                path: PATHS.categories.detail,
                Component: CategoryPage,
            }
        ]
    }
])
