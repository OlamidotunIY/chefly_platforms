import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./Paths";
import SignupPage from "@/features/auth/pages/SignupPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import RequireAuth from "@/features/auth/RequireAuth";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";

export const router = createBrowserRouter([
    {
        path: PATHS.root,
        children: [
            {
                path: PATHS.auth.root,
                element: <AuthLayout />,
                children: [
                    {
                        path: PATHS.auth.login,
                        element: <LoginPage />,
                    },
                    {
                        path: PATHS.auth.signup,
                        element: <SignupPage />,
                    },
                    {
                        path: PATHS.auth.forgotPassword,
                        element: <ForgotPasswordPage />,
                    },
                    {
                        path: PATHS.auth.resetPassword,
                        element: <ResetPasswordPage />,
                    },
                ],
            },
            {
                path: PATHS.root,
                element: <RequireAuth />,
                children: [
                    {
                        path: PATHS.app.root,
                        element: <div>App</div>,
                    }
                ]
            }
        ]
    }
])