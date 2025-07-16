import {BrowserRouter,Routes, Route } from 'react-router-dom';
import Site2 from './components/Site2';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Site2/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
