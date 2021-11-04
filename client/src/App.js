import "./index.css"
import {MainPage} from "./pages/MainPage";
import {BrowserRouter as Router} from "react-router-dom"
import {Header} from "./components/Header";
import {useRoutes} from "./routes";
const contentStyle = {
    marginLeft: "5px"
};

function App() {
    const routes = useRoutes(false)
    return (
        <div className="App">
            <Router>
                <Header/>
                {routes}
            </Router>
        </div>


    )


}

export default App;
