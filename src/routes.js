import { ADMIN_ROUTE, CARRIER_ROUTE, CUSTOMER_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MANAGER_ROUTE, RECOVERY_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import Admin from './pages/Admin'
import Manager from './pages/Manager'
import Customer from './pages/Customer'
import Carrier from './pages/Carrier'
import Main from './pages/main/Main'
import Auth from './pages/Auth'

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
        path: CUSTOMER_ROUTE,
        Component: <Customer />
    },
    {
        path: CARRIER_ROUTE,
        Component: <Carrier />
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
