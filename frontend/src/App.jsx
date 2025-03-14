import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import CreateVacancyPage from "./scenes/CreateVacancyPage";
import SearchPage from "./scenes/SearchPage";
import Vacancy from "./scenes/Vacancy";
import Authorization from "./components/Authorization";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/test-auth" element={<Authorization />} />
          <Route path="/test-login" element={<LoginForm />} />
          <Route path="/" element={<SearchPage />} />
          <Route path="/vacancy/:id" element={<Vacancy />} />
          <Route path="/create-vacancy" element={<CreateVacancyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
