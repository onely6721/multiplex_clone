import "./index.css"
import {BrowserRouter as Router} from "react-router-dom"
import {Header} from "./components/Header/Header";
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes";
import {useEffect, useState} from "react";
import {parseJwt} from "./utils/ParseJWT";


function App() {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isAuth, setAuth] = useState(false)
    const routes = useRoutes(isAuth)
    useEffect(() => {
        if (token) {
            const jwtPayload =  parseJwt(token)
            if (jwtPayload.exp < Date.now() / 1000) {
                setToken(null)
                localStorage.removeItem('token')
                setAuth(false)
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
