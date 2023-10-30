import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home/Home';
import Landing from './component/Landing/Landing';
import Form from './component/Form/Form';
import Detail from './component/Detail/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/creategame' element={<Form />}></Route>
        <Route path="/detailgame/:gameId" element={<Detail />}></Route>
      </Routes>
    </div >
  );
}

export default App;