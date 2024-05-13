import { useContext } from "react";
import Input from "./components/Input";
import "./App.css";
import { StateContext } from "./components/context/State";
import { Row } from "./components/Row";
import Nav from "./components/Nav";

function App() {
  const { loading, data } = useContext(StateContext);

  return (
    <>
      {!data ? <Input /> : <Nav />}
      {loading ? null : data && <Row data={data} />}
    </>
  );
}

export default App;
