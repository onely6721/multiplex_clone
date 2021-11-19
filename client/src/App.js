import "./index.css"
import {MainPage} from "./pages/MainPage";
import {BrowserRouter as Router} from "react-router-dom"
import {Header} from "./components/Header";
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes";
import {useEffect, useState} from "react";
const contentStyle = {
    marginLeft: "5px"
};

function App() {
    const routes = useRoutes(false)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isAuth, setAuth] = useState(false)

    useEffect(() => {
        setAuth(!!token)
    }, [])

    return (
        <AuthContext.Provider value={{token, isAuth, setToken, setAuth}}>
            <div className="App">
                <Router>
                    <Header/>
                    {routes}
                </Router>
            </div>
        </AuthContext.Provider>
    )


}

export default App;
