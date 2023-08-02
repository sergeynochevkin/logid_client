import { ADMIN_ROUTE, USER_ROUTE,LOGIN_ROUTE, MAIN_ROUTE, MANAGER_ROUTE, RECOVERY_ROUTE, REGISTRATION_ROUTE, BOARD_ROUTE, BOARD_ITEM_ROUTE } from "./utils/consts"
import Management from './pages/Management'
import Main from './pages/main/Main'
import Auth from './pages/auth/AuthOld'
import User from "./pages/User"
import Board from "./pages/board/Board"
import BoardItemPage from "./pages/board/BoardItemPage"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Management />
    },
    {
        path: MANAGER_ROUTE,
        Component: <Management />
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
    ,
    {
        path: BOARD_ROUTE,
        Component: <Board />
    }
    ,
    {
        path: BOARD_ITEM_ROUTE,
        Component: <BoardItemPage />
    }
]
