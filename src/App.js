import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

function App() {
    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <ChatRoom />
            </Route>
        </Switch>
    );
}

export default App;
