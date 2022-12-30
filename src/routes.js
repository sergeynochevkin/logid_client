import { ADMIN_ROUTE, USER_ROUTE,LOGIN_ROUTE, MAIN_ROUTE, MANAGER_ROUTE, RECOVERY_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import Admin from './pages/Admin'
import Manager from './pages/Manager'
import Main from './pages/main/Main'
import Auth from './pages/auth/Auth'
import User from "./pages/User"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin />
    },
    {
        path: MANAGER_ROUTE,
        Component: <Manager />
    },
    {
        path: USER_ROUTE,
        Component: <User />
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: RECOVERY_ROUTE,
        Component: <Auth />
    }
]
