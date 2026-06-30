import { stateType, useAuthStore } from "@chefly/store"
import { Button } from "../button"

export const AuthButtons = () =>
{

    const { changeOpenState, changeState, open } = useAuthStore()

    const handleClick = (state: stateType) =>
    {
        changeOpenState(!open)
        changeState(state)
    }

    return (
        <div className="flex flex-row space-x-3">
            <Button className="h-12 w-24" variant="outline" onClick={() =>
            {
                handleClick("sign-in")
            }}>
                Sign in
            </Button>
            <Button
                className="h-12 w-24"
                onClick={() =>
                {
                    handleClick("sign-up")
                }}

            >
                Join
            </Button>
        </div>
    )
}
