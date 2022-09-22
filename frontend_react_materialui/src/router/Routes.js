// REACT
import * as React from "react";

// REACT ROUTER DOM
import { Routes as RouterRoutes, Route } from "react-router-dom";

// CONTAINERS
import Calendar from "../containers/Calendar";
import Main from "../containers/Main";
import Page404 from "../components/Page404";

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Main />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="*" element={<Page404 />} />
    </RouterRoutes>
  );
}
