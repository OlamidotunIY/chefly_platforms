import { Link, useLocation } from "react-router-dom"

import { Button } from "@workspace/ui/components"

import { PATHS } from "@/routing"

type VerifyEmailLocationState = {
  email?: string
}

export const VerifyEmailPage = () => {
  const location = useLocation()
  const { email } = (location.state ?? {}) as VerifyEmailLocationState

  return (
    <div className="flex flex-col gap-6 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Verify your email</h1>
        <p className="text-sm text-balance text-muted-foreground">
          We sent a verification link
          {email ? (
            <>
              {" "}to <span className="font-medium text-foreground">{email}</span>
            </>
          ) : (
            " to your email address"
          )}
          . Open the link to finish verifying your account.
        </p>
      </div>

      <Button asChild variant="outline">
        <Link to={PATHS.auth.login}>Back to login</Link>
      </Button>
    </div>
  )
}
