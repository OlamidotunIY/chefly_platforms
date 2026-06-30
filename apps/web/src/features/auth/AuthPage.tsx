import { useAuthStore } from '@chefly/store'
import { Dialog, DialogContent } from '@workspace/ui/components'
import { LoginPage, SignupPage } from './pages'
import { PageContainer } from '@/components'

export const AuthPage = () =>
{
  const { open, changeOpenState, state } = useAuthStore()

  const renderContent = () =>
  {
    switch (state)
    {
      case "sign-in":
        return <LoginPage />

      case "sign-up":
        return <SignupPage />

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={() =>
    {
      changeOpenState(!open)
    }}>
      <DialogContent className="lg:min-w-4xl" showCloseButton={false}>
        <div className='lg:grid-cols-2 grid'>
          <div className="relative hidden bg-muted lg:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <PageContainer>
            {renderContent()}
          </PageContainer>
        </div>
      </DialogContent>
    </Dialog>
  )
}
