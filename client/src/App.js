import "./index.css"
import {BrowserRouter as Router} from "react-router-dom"
import {Header} from "./components/Header/Header";
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes";
import {useEffect, useState} from "react";
import {parseJwt} from "./tools/ParseJWT";


function App() {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isAuth, setAuth] = useState(false)
    const routes = useRoutes(isAuth)
    useEffect(() => {
        if (token) {
            const jwtPayload =  parseJwt(token)
            if (jwtPayload < Date.now() / 1000) {
                setToken(null)
                localStorage.setItem('token', null)
            } else {
                setAuth(true)
            }
        }

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
