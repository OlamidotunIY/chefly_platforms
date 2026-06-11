import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./Paths";
import { ForgotPasswordPage, LoginPage, RequireAuth, ResetPasswordPage, SignupPage, VerifyEmailPage } from "@/features/auth";
import { AuthLayout } from "@/layouts";

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
                    {
                        path: PATHS.auth.verifyEmail,
                        element: <VerifyEmailPage />,
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
