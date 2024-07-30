import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

import Homepage from "./pages/Homepage";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
