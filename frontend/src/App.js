import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TheNavbar from "./components/TheNavbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <TheNavbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
