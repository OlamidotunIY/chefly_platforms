import type { ComponentProps } from "react"

import cheflyLogo from "@/assets/chefly_dark.png"
import { cn } from "@workspace/ui/lib"

type LogoProps = Omit<ComponentProps<"img">, "alt" | "src"> & {
  alt?: string
}

export function Logo({
  alt = "Chefly",
  className,
  ...props
}: LogoProps) {
  return (
    <img
      alt={alt}
      className={cn("size-20 object-contain", className)}
      src={cheflyLogo}
      {...props}
    />
  )
}
