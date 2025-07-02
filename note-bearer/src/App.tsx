import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import RegisterPage from './views/RegisterPage/RegisterPage';

function App() {

  return (
    <div className="flex flex-col h-screen w-full px-4 md:px-1 transform-3d bg-gradient-to-t from-green-300 to-slate-50">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div> </div>} />
        <Route path="/login" element={<div className="container mx-auto p-4">Login Page</div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div className="container mx-auto p-4">404 Not Found</div>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
