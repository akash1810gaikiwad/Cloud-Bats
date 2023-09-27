import { useRoutes } from "react-router-dom";
import Router from "./router/routes";

function App() {
  const routing = useRoutes(Router);
  return <>{routing} </>;
}

export default App;
