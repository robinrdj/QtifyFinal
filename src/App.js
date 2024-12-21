import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar searchData={[]}/>
    </div>
    </BrowserRouter>

  );
}

export default App;
