import { RouterProvider } from 'react-router-dom'
import { router } from './Router'

export const AppRouting = () => {
    return <RouterProvider router={router} />
}
