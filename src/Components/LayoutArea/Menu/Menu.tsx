import "./Menu.css";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";

function Menu(): JSX.Element {
    const [user, setUser] = useState(store.getState().loginReducer.user);

    useEffect(() => {
        return store.subscribe(() =>
            setUser(store.getState().loginReducer.user)
        );
    }, []);
    return (
        <div className="Menu">
            <CustomLink to="/home">Home</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            {user.email === "admin@admin.com" && (
                <>
                    <CustomLink to="/myUsers">My users</CustomLink>
                </>
            )}
            {user.email !== "admin@admin.com" && (
                <>
                    {user.token && <CustomLink to="/todos">Todos</CustomLink>}
                    {user.token && <CustomLink to="/doing">Doing</CustomLink>}
                    {user.token && <CustomLink to="/done">Done</CustomLink>}
                </>
            )}
        </div>
    );
}

export default Menu;
