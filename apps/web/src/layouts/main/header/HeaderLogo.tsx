import { Logo } from '@/components'
import { cn } from '@workspace/ui/lib'

interface HeaderLogoProps
{
  className?: string
}

export const HeaderLogo = ({ className }: HeaderLogoProps) => {
  return (
    <div>
        <Logo className={cn('size-22', className)}/>
    </div>
  )
}
