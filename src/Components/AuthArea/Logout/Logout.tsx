import { useEffect } from "react";
import "./Logout.css";
import { loggedOut } from "../../../Redux/LoginAppState";
import { useNavigate } from "react-router-dom";
import { removeTasks } from "../../../Redux/UserAppState";
import store from "../../../Redux/Store";
import { removeUsers } from "../../../Redux/AdminAppState";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Im here");
        store.dispatch(loggedOut());
        store.dispatch(removeTasks());
        store.dispatch(removeUsers());
        navigate("/login");
    }, []);
    return <></>;
}

export default Logout;
