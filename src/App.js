import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Protected from './components/Protected';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<Protected />}>
            <Route path='/home' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
