import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../../Models/UserModel";
import { gotAllUsersAction } from "../../../../Redux/AdminAppState";
import store from "../../../../Redux/Store";
import adminWebApi from "../../../../Services/AdminWebApi";
import notify from "../../../../Services/NotificationService";
import UserItem from "../../../Items/UserItem/UserItem";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import "./GetAllUsers.css";

function GetAllUsers(): JSX.Element {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserModel[]>(
        store.getState().adminReducer.users
    );
    useEffect(() => {
        const token = store.getState().loginReducer.user.token;
        console.log(token);
        if (!token) {
            navigate("/login");
        } else if (users.length === 0) {
            adminWebApi
                .getAllUsers()
                .then((res) => {
                    console.log(res.data);
                    setUsers(res.data);
                    store.dispatch(gotAllUsersAction(res.data));
                })
                .catch((err) => notify.error(err));
        }
    }, []);
    return (
        <div className="GetAllUsers">
            <h1>Users list</h1>

            {users?.length > 0 ? (
                <>
                    {users.map((t, idx) => (
                        <UserItem key={"t" + idx} user={t} />
                    ))}
                </>
            ) : (
                <EmptyView msg="No Tasks 4u" />
            )}

            {/* {
                tasks.length > 0
                    ? <>{tasks.map((task, idx) => <p key={"t" + idx}>{task.id},{task.title},{task.description}</p>)}</>
                    : <EmptyView msg="No Tasks for you!" />
            } */}
        </div>
    );
}

export default GetAllUsers;
