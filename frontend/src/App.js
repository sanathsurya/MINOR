import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import FileUpload from "./components/FileUpload";
import FileDownload from "./components/FileDownload";

function App() {
  return (
    <Router>
      <div>
        <h1>Secure PDS</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/download" element={<FileDownload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
