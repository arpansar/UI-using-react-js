import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form.js";
import submit from "./submit.js";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
