import type { ComponentProps } from "react"

import { cn } from "@workspace/ui/lib"

export const PageContainer = ({
    className,
    ...props
}: ComponentProps<"div">) => (
    <div
        className={cn(
            "mx-auto w-full max-w-[1600px] px-4 sm:px-6",
            className,
        )}
        {...props}
    />
)
