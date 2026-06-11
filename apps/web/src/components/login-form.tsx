import { useState, type ComponentProps, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"

import { authClient, resolveVerificationEmail } from "@chefly/api"
import
{
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  toast,
} from "@workspace/ui/components"
import { cn } from "@workspace/ui/lib"

import { PATHS } from "@/routing"
import { SocialAuthButtons } from "./social-auth-buttons"

type LoginFormProps = Omit<ComponentProps<"form">, "onSubmit">

export function LoginForm({ className, ...props }: LoginFormProps)
{
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>)
  {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const identifier = String(formData.get("identifier") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    try
    {
      const result = identifier.includes("@")
        ? await authClient.signIn.email({
          email: identifier,
          password,
        })
        : await authClient.signIn.username({
          username: identifier,
          password,
        })

      if (result.error)
      {
        if (result.error.status === 403)
        {
          let email = identifier

          if (!identifier.includes("@"))
          {
            try
            {
              const emailPromise = resolveVerificationEmail({
                  body: {
                    username: identifier,
                    password,
                  },
                }).then((emailResult) =>
                {
                  if (emailResult.error)
                  {
                    throw new Error("Unable to prepare email verification.")
                  }

                  return emailResult.data.data.email
                })

              toast.promise(emailPromise, {
                loading: "Preparing email verification...",
                success: "Verification details ready.",
                error: "Unable to prepare email verification.",
              })

              email = await emailPromise
            } catch
            {
              setError("Unable to prepare email verification.")
              return
            }
          }

          toast.warning("Your email is not verified. Please check your inbox for a verification email.")
          navigate(PATHS.auth.verifyEmail, {
            state: { email },
          })
          return
        }

        setError(result.error.message ?? "Unable to sign in.")
        return
      }

      navigate(PATHS.app.root, { replace: true })
    } catch
    {
      setError("Unable to reach the authentication server.")
    } finally
    {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your username or email to continue
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="identifier">Username or email</FieldLabel>
          <Input
            autoComplete="username"
            className="bg-background"
            id="identifier"
            name="identifier"
            placeholder="username or m@example.com"
            required
            type="text"
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              className="ml-auto text-sm underline-offset-4 hover:underline"
              to={PATHS.auth.forgotPassword}
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            autoComplete="current-password"
            className="bg-background"
            id="password"
            minLength={8}
            name="password"
            required
            type="password"
          />
        </Field>

        <FieldError>{error}</FieldError>

        <Field>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </Field>

        <SocialAuthButtons action="Login" />

        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to={PATHS.auth.signup}>Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
