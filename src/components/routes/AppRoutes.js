import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Users from "../managerUser/Users";
const AppRoutes = () => {

    return(
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />

                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/" exact>
                    home
                </Route>

            </Switch>

        </>
    )

}
export default AppRoutes