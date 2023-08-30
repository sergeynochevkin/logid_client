import { ADMIN_ROUTE, USER_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MANAGER_ROUTE, RECOVERY_ROUTE, REGISTRATION_ROUTE, BOARD_ROUTE, BOARD_ITEM_ROUTE } from "./utils/consts"
// import Management from './pages/Management'
import Main from './pages/main/Main'
// import User from "./pages/User"
// import Board from "./pages/board/Board"
// import BoardItemPage from "./pages/board/BoardItemPage"
import { Suspense, lazy } from "react"

// const Main = lazy(() => import('./pages/main/Main'));
const Board = lazy(() => import('./pages/board/Board'));
const User = lazy(() => import('./pages/user/User'));
const Management = lazy(() => import('./pages/management/Management'));
const BoardItemPage = lazy(() => import('./pages/board/BoardItemPage'));

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Suspense fallback={null}><Management /></Suspense>
    },
    {
        path: MANAGER_ROUTE,
        Component: <Suspense fallback={null}><Management /></Suspense>
    },
    {
        path: USER_ROUTE,
        Component: <Suspense fallback={null}><User /></Suspense>
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main />
    },
    {
        path: BOARD_ROUTE,
        Component: <Suspense fallback={null}> <Board /></Suspense>
    }
    ,
    {
        path: BOARD_ITEM_ROUTE,
        Component: <Suspense fallback={null}><BoardItemPage /></Suspense>
    }
]
