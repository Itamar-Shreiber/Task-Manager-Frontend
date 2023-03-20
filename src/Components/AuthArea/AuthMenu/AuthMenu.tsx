import "./AuthMenu.css";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import { useEffect, useState } from "react";
import { User } from "../../../Models/Login";
import store from "../../../Redux/Store";
import { Link } from "react-router-dom";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<User>(store.getState().loginReducer.user);

    useEffect(() => {
        return store.subscribe(() =>
            setUser(store.getState().loginReducer.user)
        );
    }, []);
    return (
        <div className="AuthMenu row">
            {user?.token ? (
                <>
                    Connected as {user.email}&nbsp;
                    <Link to="logout">Logout</Link>
                </>
            ) : (
                <>
                    Hello guest &nbsp;
                    <Link to="register">Register </Link>&nbsp;
                    <Link to="login">Login </Link>
                </>
            )}
        </div>
    );
}

export default AuthMenu;
