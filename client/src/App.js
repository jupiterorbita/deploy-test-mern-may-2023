import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import DisplayAll from './components/DisplayAll';
import Create from './components/Create';
import ShowOne from './components/ShowOne';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <h1>notes 📝</h1>
      <Link to={"/"}>home</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={"/new"}>Create</Link>

      {/* THEATER STAGE */}
      <Routes>
        {/* MAIN ROUTE - READ ALL */}
        <Route path='/' element={<DisplayAll/>} />

        {/* CREATE */}
        <Route path='/new' element={<Create/>} />

        {/* READ ONE */}
        <Route path='/notes/:id' element={<ShowOne/>} />

        {/* UPDATE */}
        <Route path='/notes/:id/edit' element={<Update/>} />

        


      </Routes>

    </div>
  );
}

export default App;
