import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Quantumchat from './components/Quantumchat';
import Test from './components/test';

function App() {

  return (
    <dev >
      <BrowserRouter>
        <Routes>
          <Route path='/quantumchat/login' element={<Login/>}/>
          <Route path='/quantumchat/register' element={<Register/>}/>
          <Route path='/quantumchat' element={<Quantumchat/>}/>
          <Route path='/quantumchat/test' element={<Test/>}/>

        </Routes>
      </BrowserRouter>
    </dev>
  )
}

export default App
