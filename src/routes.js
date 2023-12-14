import {
  ADMIN_ROUTE,
  USER_ROUTE,
  MAIN_ROUTE,
  MANAGER_ROUTE,
  BOARD_ROUTE,
  BOARD_ITEM_ROUTE,
  FLEET_ROUTE,
  PRIVACY_POlICY_ROUTE,
  USER_AGREEMENT_ROUTE,
  SUBSCRIPTIONS_ROUTE,
  MAIN_ORDER_ROUTE,
} from "./utils/consts";
import Main from "./pages/main/Main";
import { Suspense, lazy } from "react";
import PageFallBack from "./components/ui/loader/PageFallBack";
import Fleet from "./pages/fleet/Fleet";
import Agreement from "./components/legality/Agreement";
import React from "react";
import MainOrder from './pages/main_order/MainOrder';

const Board = lazy(() => import("./pages/board/Board"));
const User = lazy(() => import("./pages/user/User"));
const Management = lazy(() => import("./pages/management/Management"));
const BoardItemPage = lazy(() => import("./pages/board/BoardItemPage"));
const SubscriptionsPage = lazy(() =>
  import("./pages/subscriptions/SubscriptionsPage")
);


export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: (
      <Suspense fallback={<PageFallBack />}>
        <Management />
      </Suspense>
    ),
  },
  {
    path: MANAGER_ROUTE,
    Component: (
      <Suspense fallback={<PageFallBack />}>
        <Management />
      </Suspense>
    ),
  },
  {
    path: USER_ROUTE,
    Component: (
      <Suspense fallback={<PageFallBack />}>
        <User />
      </Suspense>
    ),
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: <Main />,
  },
  {
    path: BOARD_ROUTE,
    Component: (
      <Suspense fallback={<PageFallBack />}>
        {" "}
        <Board />
      </Suspense>
    ),
  },
  {
    path: BOARD_ITEM_ROUTE,
    Component: (
      <Suspense fallback={<PageFallBack />}>
        <BoardItemPage />
      </Suspense>
    ),
  },
  {
    path: FLEET_ROUTE,
    Component: <Fleet />,
  },
  {
    path: MAIN_ORDER_ROUTE,
    Component: <MainOrder />,
  },
  {
    path: PRIVACY_POlICY_ROUTE,
    Component: <Agreement />,
  },
  {
    path: USER_AGREEMENT_ROUTE,
    Component: <Agreement />,
  },
  {
    path: SUBSCRIPTIONS_ROUTE,
    Component: (
      <Suspense fallback={<PageFallBack />}>
        <SubscriptionsPage />
      </Suspense>
    ),
  },
];
