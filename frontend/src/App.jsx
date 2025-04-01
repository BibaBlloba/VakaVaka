import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import CreateVacancyPage from "./scenes/CreateVacancyPage";
import SearchPage from "./scenes/SearchPage";
import Vacancy from "./scenes/Vacancy";
import Authorization from "./components/Authorization";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "./scenes/Footer";
import MyResume from "./scenes/MyResume";

function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/test-auth" element={<Authorization />} />
          <Route path="/test-login" element={<LoginForm />} />
          <Route path="/test-profile" element={<MyResume />} />
          <Route path="/" element={<SearchPage />} />
          <Route path="/vacancy/:id" element={<Vacancy />} />
          <Route path="/create-vacancy" element={<CreateVacancyPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
