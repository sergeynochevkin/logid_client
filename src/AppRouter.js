import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from ".";
import { authRoutes, publicRoutes } from "./routes";
import { MAIN_ROUTE } from "./utils/consts";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route path={path} element={Component} exact key={path} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={Component} exact key={path} />
      ))}
      <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;
