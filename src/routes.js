import { ADMIN_ROUTE, USER_ROUTE, MAIN_ROUTE, MANAGER_ROUTE, BOARD_ROUTE, BOARD_ITEM_ROUTE } from "./utils/consts"
// import Management from './pages/Management'
import Main from './pages/main/Main'
// import User from "./pages/User"
// import Board from "./pages/board/Board"
import BoardItemPage from "./pages/board/BoardItemPage"
import asyncComponent from "./components/AsyncComponent"

const Management = asyncComponent(() => import("./pages/Management"));
// const Main = asyncComponent(() => import("./pages/main/Main"));
const User = asyncComponent(() => import("./pages/User"));
const Board = asyncComponent(() => import("./pages/board/Board"));
// const BoardItemPage = asyncComponent(() => import("./pages/board/BoardItemPage"));


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
        path: BOARD_ROUTE,
        Component: <Board />
    }
    ,
    {
        path: BOARD_ITEM_ROUTE,
        Component: <BoardItemPage />
    }
]
