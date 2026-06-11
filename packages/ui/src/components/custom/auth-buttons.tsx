import { Button } from "../button"

interface AuthButtonsProps
{
    onJoin: () => void
    onSignIn: () => void
}

export const AuthButtons = ({ onJoin, onSignIn }: AuthButtonsProps) =>
{
    return (
        <div className="flex flex-row space-x-3">
            <Button className="h-12 w-24" onClick={onJoin}>
                Join
            </Button>
            <Button
                className="h-12 w-24"
                onClick={onSignIn}
                variant="outline"
            >
                Sign In
            </Button>
        </div>
    )
}
