import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./Paths";
import { AuthPage, ForgotPasswordPage, LoginPage, RequireAuth, ResetPasswordPage, SignupPage, VerifyEmailPage } from "@/features/auth";
import { AuthLayout, RootLayout } from "@/layouts";

export const router = createBrowserRouter([
    {
        path: PATHS.root,
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <div>App</div>,
            },
            {
                path: PATHS.auth.root,
                element: <AuthLayout />,
                children: [
                    {
                        index: true,
                        element: <AuthPage />,
                    },
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
                element: <RequireAuth />,
                children: [
                    {
                        path: PATHS.app.account,
                        element: <div>Account</div>,
                    }
                ]
            }
        ]
    }
])
