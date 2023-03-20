import { Link } from "react-router-dom";
import Logo from "../../SharedArea/Logo/Logo";
import "./Header.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Clock from "../../SharedArea/Clock/Clock";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Link to="home">
                <h1 className="H1">Todo App</h1>
            </Link>
            <div className="Auth">
                <AuthMenu />
                <Clock />
            </div>
        </div>
    );
}

export default Header;
