import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './views/RegisterPage/RegisterPage';
import LoginPage from './views/LoginPage/LoginPage';
import { AppContextProvider } from './store/AppContextProvider';
import SideBar from './components/UI/Sidebar/Sidebar';
import Home from './views/Home/Home';
import Account from './views/Account/Account';
import LogoutPage from './views/LogoutPage/LogoutPage';
import Header from './components/Header/Header';
import { useContext } from 'react';
import { AppContext } from './store/app-context';

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

function AppContent() {
  const { user } = useContext(AppContext);

  return (
    <div className="flex flex-row h-screen px-4 md:px-0 transform-3d bg-gradient-to-t from-green-300 to-slate-50">
      <Router>
        {!user && <Header />}
        {user && <SideBar />}
        <Routes>
          <Route path="/" element={<div> </div>} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<div className="container mx-auto p-4">404 Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
