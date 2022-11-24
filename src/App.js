
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Home from './componenst/Home';
import Navabar from './componenst/Navabar';
import CreatNew from './componenst/CreatNew';
import Detail from './componenst/Detail';
import EditEmply from './componenst/EditEmply';

function App() {
  return (
    <>
    <Navabar/>
      <Routes>
        <Route  path="/" element={<Home />}/>
        <Route path="/CreatNew" element={<CreatNew />}/>
        <Route path="/Detail/:emplyId" element={<Detail />}/>
        <Route path="/Edit/:iid" element={<EditEmply />}/>
      </Routes>
    </>
  );
}

export default App;
