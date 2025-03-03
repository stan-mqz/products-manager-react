import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>Desde Layout</div>

      <Outlet />
    </>
  );
};
