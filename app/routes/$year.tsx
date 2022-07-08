import { Outlet } from "@remix-run/react";
import App from "~/components/App";

export default function Index() {
  return (
    <App>
      <Outlet />
    </App>
  );
}
