import "./App.css";
import Take from "./components/Take";
import Main from "./components/Main";
import Taker from "./components/Taker";
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Update from "./components/Update";
import Login from "./components/Login";
import SignUp from './components/SignUp';
import Protected from './components/Protected';


function App() {
  return (
    <BrowserRouter>
  <Taker/>
    
    <Routes>
      <Route element={<Protected/>}> 
      <Route path='/take' element={<Take/>} />
      <Route path='/main' element={<Main/>} />
      <Route path='/update/:id' element={<Update/>} />
      <Route path='/logout' element={<h1>logout listing Components</h1>} />
      <Route path='/profile' element={<h1>profile listing Components</h1>} />
   
       </Route>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/' element={<Login/>} />
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
