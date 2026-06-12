import type { ComponentProps } from "react"

import darkLogo from "@/assets/chefly_dark.svg"
import lightLogo from "@/assets/chefly_light.svg"
import { cn } from "@workspace/ui/lib"
import { useTheme } from "./theme-provider"

type LogoProps = Omit<ComponentProps<"img">, "alt" | "src"> & {
  alt?: string
}

export function Logo({
  alt = "Chefly",
  className,
  ...props
}: LogoProps) {
  const { resolvedTheme } = useTheme()

  return (
    <img
      alt={alt}
      className={cn("size-20 object-contain", className)}
      src={resolvedTheme === "dark" ? darkLogo : lightLogo}
      {...props}
    />
  )
}
