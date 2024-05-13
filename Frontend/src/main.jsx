import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ShareState } from "./components/context/State.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ShareState>
    <App />
  </ShareState>
);
