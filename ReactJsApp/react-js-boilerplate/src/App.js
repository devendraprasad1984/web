// import logo from './logo.svg';
import './App.css';
import './style.css'
import RoutesComponent from "./components/routes";
import {HashRouter} from 'react-router-dom'
import Header from "./components/screens/header";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import * as reducers from "./components/redux/reducers";
import thunk from "redux-thunk";
import {useEffect, useState} from "react";
import Login from "./components/screens/Login";
import {config} from "./components/common/config";

const rootReducer = combineReducers({
    user: reducers.userReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
    const [details, setDetails] = useState({login: false, user: undefined})
    useEffect(() => {
        config.loginCheck((flag, item) => {
            setDetails({login: flag, user: item})
            // console.log('from local store', flag, item)
        })
    }, [])
    const appSwitch = () => {
        const loginComponent = <Login header='use your login credentials'/>
        const routeComponent = <RoutesComponent userData={details}/>
        return details.login ? routeComponent : loginComponent
    }
    return <Provider store={store}>
        <HashRouter basename="/">
            <Header/>
            {appSwitch()}
        </HashRouter>
    </Provider>
}

export default App;
