import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/add" Component={Add}></Route>
        <Route path="/edit/:id" Component={Edit}></Route>
      </Routes>
    </div>
  );
}

export default App;
