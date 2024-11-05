import MainPage from './pages/MainPage';
import './styles.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddNote from './pages/AddNote';
import UpdateNote from './pages/UpdateNote';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/newNote" element={<AddNote/>}/>
            <Route path="/edit/:id" element={<UpdateNote/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
