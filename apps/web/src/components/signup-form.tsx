import {
  useEffect,
  useState,
  type ComponentProps,
  type FormEvent,
} from "react"
import { Check, LoaderCircle, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { authClient } from "@chefly/api"
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from "@workspace/ui/components"
import { cn } from "@workspace/ui/lib"

import { PATHS } from "@/routing"
import { SocialAuthButtons } from "./social-auth-buttons"

type SignupFormProps = Omit<ComponentProps<"form">, "onSubmit">
type UsernameStatus = "idle" | "checking" | "available" | "unavailable" | "invalid"

const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/

function validateUsername(username: string) {
  if (username.length < 3) {
    return "Username must be at least 3 characters."
  }

  if (username.length > 30) {
    return "Username must be no more than 30 characters."
  }

  if (!USERNAME_PATTERN.test(username)) {
    return "Use only letters, numbers, and underscores."
  }

  return null
}

export function SignupForm({ className, ...props }: SignupFormProps) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [usernameStatus, setUsernameStatus] =
    useState<UsernameStatus>("idle")
  const [usernameMessage, setUsernameMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const trimmedUsername = username.trim()

    if (!trimmedUsername) {
      setUsernameStatus("idle")
      setUsernameMessage(null)
      return
    }

    const validationError = validateUsername(trimmedUsername)

    if (validationError) {
      setUsernameStatus("invalid")
      setUsernameMessage(validationError)
      return
    }

    setUsernameStatus("checking")
    setUsernameMessage("Checking availability...")

    let isCurrent = true
    const timeout = window.setTimeout(async () => {
      try {
        const result = await authClient.isUsernameAvailable({
          username: trimmedUsername,
        })

        if (!isCurrent) {
          return
        }

        if (result.error) {
          setUsernameStatus("invalid")
          setUsernameMessage(result.error.message ?? "Unable to check username.")
          return
        }

        setUsernameStatus(result.data.available ? "available" : "unavailable")
        setUsernameMessage(
          result.data.available
            ? "Username is available."
            : "Username is already taken.",
        )
      } catch {
        if (isCurrent) {
          setUsernameStatus("invalid")
          setUsernameMessage("Unable to check username availability.")
        }
      }
    }, 400)

    return () => {
      isCurrent = false
      window.clearTimeout(timeout)
    }
  }, [username])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const submittedUsername = String(formData.get("username") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const validationError = validateUsername(submittedUsername)

    if (validationError) {
      setUsernameStatus("invalid")
      setUsernameMessage(validationError)
      return
    }

    setIsSubmitting(true)

    try {
      const availability = await authClient.isUsernameAvailable({
        username: submittedUsername,
      })

      if (availability.error || !availability.data.available) {
        setUsernameStatus("unavailable")
        setUsernameMessage(
          availability.error?.message ?? "Username is already taken.",
        )
        return
      }

      const result = await authClient.signUp.email({
        email,
        name: submittedUsername,
        password,
        username: submittedUsername,
      })

      if (result.error) {
        setError(result.error.message ?? "Unable to create your account.")
        return
      }

      navigate(PATHS.app.root, { replace: true })
    } catch {
      setError("Unable to reach the authentication server.")
    } finally {
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Choose a username and enter your account details
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <div className="relative">
            <Input
              aria-describedby="username-status"
              aria-invalid={
                usernameStatus === "invalid" ||
                usernameStatus === "unavailable"
              }
              autoCapitalize="none"
              autoComplete="username"
              className="bg-background pr-9"
              id="username"
              maxLength={30}
              minLength={3}
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              pattern="[A-Za-z0-9_]+"
              placeholder="chefly_user"
              required
              spellCheck={false}
              type="text"
              value={username}
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              {usernameStatus === "checking" && (
                <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
              )}
              {usernameStatus === "available" && (
                <Check className="size-4 text-emerald-600" />
              )}
              {(usernameStatus === "invalid" ||
                usernameStatus === "unavailable") && (
                <X className="size-4 text-destructive" />
              )}
            </span>
          </div>
          {usernameMessage && (
            <FieldDescription
              className={cn(
                usernameStatus === "available" && "text-emerald-600",
                (usernameStatus === "invalid" ||
                  usernameStatus === "unavailable") &&
                  "text-destructive",
              )}
              id="username-status"
            >
              {usernameMessage}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            autoComplete="email"
            className="bg-background"
            id="email"
            name="email"
            placeholder="m@example.com"
            required
            type="email"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            autoComplete="new-password"
            className="bg-background"
            id="password"
            minLength={8}
            name="password"
            required
            type="password"
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <FieldError>{error}</FieldError>

        <Field>
          <Button
            disabled={
              isSubmitting ||
              usernameStatus === "checking" ||
              usernameStatus === "invalid" ||
              usernameStatus === "unavailable"
            }
            type="submit"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </Field>

        <SocialAuthButtons action="Sign up" />

        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link to={PATHS.auth.login}>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
