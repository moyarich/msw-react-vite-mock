import { RouteObject } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Home from "./pages/Home";

type IRoute = RouteObject & {
  title?: string;
};
interface IRoutes {
  [id: string]: IRoute;
}

export const ROUTES: IRoutes = {
  home: {
    title: "Home",
    element: <Home />,
    path: "/",
  },
  chat: {
    title: "Chat",
    element: <Chat />,
    path: "chat",
  },
};
