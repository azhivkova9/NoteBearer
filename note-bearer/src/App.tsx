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
import Footer from './components/Footer/Footer';

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
    <Router>
      <div className="flex flex-col h-full brightness-90  min-h-screen bg-gradient-to-b from-green-400 to-slate-50">
        <Header />
        <div className="flex flex-1 px-4 md:px-0 transform-3d overflow-hidden">
          {user && <SideBar />}
          <main className="flex-1 py-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<div> </div>} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<div className="container mx-auto p-4">404 Not Found</div>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
