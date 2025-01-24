import {Route,Routes} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Message from './components/Message';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <>
    <NavigationBar/>
    <Routes>
      {/* <Route exact path="/" element={<Home/>}/> */}
      <Route exact path="*" element={<Home/>}/>
      <Route exact path="/messages" element={<Message/>}/>
      </Routes>
    </>
  );
}

export default App;
