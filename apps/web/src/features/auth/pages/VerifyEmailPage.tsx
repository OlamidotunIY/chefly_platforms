import { useState, type FormEvent } from "react"
import { MailCheck } from "lucide-react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"

import { authClient } from "@chefly/api"
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  toast,
} from "@workspace/ui/components"

import { PATHS } from "@/routing"

type VerifyEmailLocationState = {
  email?: string
}

const OTP_LENGTH = 6

export const VerifyEmailPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const locationState = (location.state ?? {}) as VerifyEmailLocationState
  const email = locationState.email
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)

  if (!email) {
    return <Navigate replace to={PATHS.auth.login} />
  }

  const verificationEmail = email

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (otp.length !== OTP_LENGTH) {
      setError("Enter the 6-digit verification code.")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await authClient.emailOtp.verifyEmail({
        email: verificationEmail,
        otp,
      })

      if (result.error) {
        setError(result.error.message ?? "The verification code is invalid.")
        return
      }

      toast.success("Email verified successfully.")
      navigate(PATHS.app.root, { replace: true })
    } catch {
      setError("Unable to reach the authentication server.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResend() {
    setError(null)
    setIsResending(true)

    try {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email: verificationEmail,
        type: "email-verification",
      })

      if (result.error) {
        setError(result.error.message ?? "Unable to resend the code.")
        return
      }

      setOtp("")
      toast.success("A new verification code has been sent.")
    } catch {
      setError("Unable to reach the authentication server.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Verify your email</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Enter the 6-digit code sent to your email address.
            </p>
          </div>
        </div>

        <FieldDescription className="text-center">
          Code sent to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </FieldDescription>

        <Field>
          <FieldLabel className="justify-center" htmlFor="verification-code">
            Verification code
          </FieldLabel>
          <InputOTP
            aria-invalid={Boolean(error)}
            autoComplete="one-time-code"
            containerClassName="justify-center"
            disabled={isSubmitting}
            id="verification-code"
            inputMode="numeric"
            maxLength={OTP_LENGTH}
            onChange={setOtp}
            pattern="[0-9]*"
            value={otp}
          >
            <InputOTPGroup>
              {Array.from({ length: OTP_LENGTH }, (_, index) => (
                <InputOTPSlot className="size-10 text-base" index={index} key={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Field>

        <FieldError className="text-center">{error}</FieldError>

        <Field>
          <Button
            disabled={isSubmitting || otp.length !== OTP_LENGTH}
            size="lg"
            type="submit"
          >
            {isSubmitting ? "Verifying..." : "Verify email"}
          </Button>
        </Field>

        <div className="flex flex-col items-center gap-2 text-sm">
          <p className="text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <Button
              className="h-auto p-0"
              disabled={isResending}
              onClick={handleResend}
              type="button"
              variant="link"
            >
              {isResending ? "Sending..." : "Resend code"}
            </Button>
          </p>
          <Link
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            to={PATHS.auth.login}
          >
            Back to login
          </Link>
        </div>
      </FieldGroup>
    </form>
  )
}
