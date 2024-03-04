import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Signin from './components/Signin';
import NewsDetails from './components/NewsDetails';

function App() {
  return (
    <>
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/' element={<Main/>}/>
      <Route path='/details' element={<NewsDetails/>}/>
    </Routes>

      
    </>
  );
}

export default App;
