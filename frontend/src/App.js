import {Route,Routes} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Message from './components/Message';

function App() {
  return (
    <>
    <Routes>
      {/* <Route exact path="/" element={<Home/>}/> */}
      <Route exact path="*" element={<Home/>}/>
      <Route exact path="/messages" element={<Message/>}/>
      </Routes>
    </>
  );
}

export default App;
