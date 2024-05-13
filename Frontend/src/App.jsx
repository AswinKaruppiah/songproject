import { useContext } from "react";
import Input from "./components/Input";
import "./App.css";
import { StateContext } from "./components/context/State";
import { Row } from "./components/Row";

function App() {
  const { loading, data } = useContext(StateContext);
  return (
    <div>
      <Input />
      {loading ? null : data && <Row data={data} />}
    </div>
  );
}

export default App;
