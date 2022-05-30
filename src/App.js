import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Admin Dashboard
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

//Aos Animation
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  /*Aos Animation*/
  AOS.init({ once: true });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
