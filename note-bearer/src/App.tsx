import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {

  return (
    <div className="w-full min-h-screen bg-slate-50 px-4 md:px-1">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="*" element={<div className="container mx-auto p-4">404 Not Found</div>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
