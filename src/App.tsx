import "./App.css";

import { ROUTES } from "./Routes";

import { useRoutes } from "react-router-dom";

const App = (): JSX.Element => {
  const routes = useRoutes(Object.values(ROUTES));

  return <>{routes}</>;
};

export default App;
