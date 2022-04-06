import { useContext } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { centralState } from "../App";
import Login from "./Login";
import UserAddEdit from "./UserAddEdit";
import Users from "./Users";


function Navigation() {
    const cState = useContext(centralState);
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">{cState.store.IsLoggedIn ? 'Logout' : 'Login'}</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/usersList">Users</NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

            <Switch>

                <Route path='/user'>
                    <UserAddEdit />
                </Route>

                <Route path='/usersList'>
                    <Users />
                </Route>

                <Route path='/'>
                    <Login />
                </Route>
            </Switch >
        </BrowserRouter>
    );
}

export default Navigation;