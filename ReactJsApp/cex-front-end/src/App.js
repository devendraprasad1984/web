// import logo from './logo.svg';
import './App.css';
import './components/appstyles.css'
import {RoutesComponent} from "./components/routes";
import {BrowserRouter} from 'react-router-dom'
import Header from "./components/screens/header";

function App() {
    return <BrowserRouter>
        <Header />
        <RoutesComponent/>
    </BrowserRouter>
}

export default App;
