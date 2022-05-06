
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstrumentList from './components/InstrumentList'
import InstrumentDetail from './components/InstrumentDetail';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css'

const App = () => (
  
  <Router>
      <Routes>
        <Route path="/lista" element={<InstrumentList />} />
        <Route path="/lista/:id" element={<InstrumentDetail />} />
      </Routes>
  </Router>

);

export default App;
