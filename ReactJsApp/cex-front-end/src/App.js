// import logo from './logo.svg';
import './App.css';
import './components/appstyles.css'
import {RoutesComponent} from "./components/routes";
import {BrowserRouter} from 'react-router-dom'

function App() {
    return <BrowserRouter>
        <h1>Core eXpansion</h1>
        <RoutesComponent/>
    </BrowserRouter>
}

export default App;
