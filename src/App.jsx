// React Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { AuthProvider } from './hooks/useAuth.jsx';

// Pages Imports
import LandingPage from './pages/LandingPage.jsx';
import Homepage from './pages/Homepage/Homepage.jsx';
import Latest from './pages/Latest.jsx';
import Login from './pages/Login/Login.jsx';
import Settings from './pages/Settings.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Tracking from './pages/Tracking.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';

// Style Imports
import './styles/App.css';
import './styles/themes.css';
import './styles/fonts.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <LandingPage />
                }
            />

            <Route
                path="/homepage"
                element={
                    <Homepage />
                }
            />

            <Route
                path="/about-us"
                element={
                    <AboutUs />
                }
            />

            <Route
                path="/latest"
                element={
                    <Latest />
                }
            />

            <Route
                path="/settings"
                element={
                    <Settings />
                }
            />

            <Route
                path="/tracking"
                element={
                    <Tracking />
                }
            />

            <Route
                path="/sign-up"
                element={
                    <SignUp />
                }
            />

            <Route
                path="/login"
                element={
                    <Login />
                }
            />
        </Routes>
    </BrowserRouter>
  );
}

export default App
