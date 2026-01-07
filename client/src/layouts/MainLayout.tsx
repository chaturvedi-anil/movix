import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <main className="container min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
