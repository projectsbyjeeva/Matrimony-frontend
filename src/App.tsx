import AppRoutes from "./routes/AppRoutes";
import { DemoAuthProvider } from "./context/DemoAuthContext";

function App() {
  return <DemoAuthProvider><AppRoutes /></DemoAuthProvider>;
}

export default App;
