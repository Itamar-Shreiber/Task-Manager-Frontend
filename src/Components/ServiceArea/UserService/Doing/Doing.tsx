import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskModel } from "../../../../Models/Task";
import store from "../../../../Redux/Store";
import { gotAllDoingTasksAction } from "../../../../Redux/UserAppState";
import notify from "../../../../Services/NotificationService";
import userWebApi from "../../../../Services/UserWebApi";
import UserWebApi from "../../../../Services/UserWebApi";
import DoingItem from "../../../Items/DoingItem/DoingItem";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import "./Doing.css";

function Doing(): JSX.Element {
    const navigate = useNavigate();
        const [total, setTotal] = useState(0);

        useEffect(() => {
            userWebApi.countTasks().then((res) => setTotal(res.data));
            // .catch (err=> notify.error(err));

            return store.subscribe(() => {
                setTotal(store.getState().userReducer.doingTasks.length); // Will let us notify
            });
        }, []);

    const [tasks, setTasks] = useState<TaskModel[]>([]);
        const [userTasks, setUserTasks] = useState<TaskModel[]>(
            store.getState().userReducer.doingTasks
        );

        useEffect(() => {
            return store.subscribe(() =>
                setUserTasks(store.getState().userReducer.doingTasks)
            );
        }, []);
    // useEffect(() => {
    //     return store.subscribe(() =>
    //         setTasks(store.getState().userReducer.doingTasks)
    //     );
    // }, []);
    useEffect(() => {
        const token = store.getState().loginReducer.user.token;
        console.log(token);
        if (!token) {
            navigate("/login");
        } else if (tasks.length === 0) {
            UserWebApi.getAllTasks("DOING")
                .then((res) => {
                    console.log(res.data);
                    setTasks(
                        res.data.filter((obj1) => {
                            return !userTasks.some(
                                (obj2) => obj1.status !== obj2.status
                            );
                        })
                    );
                    store.dispatch(gotAllDoingTasksAction(res.data));
                })
                .catch((err) => notify.error(err));
        }
    }, []);

    return (
        <div className="Doing">
            <h1>Doing</h1>
            <div className="TotalTodos">
                <p> Total : {total} </p>
            </div>
            {tasks?.length > 0 ? (
                <>
                    {tasks.map((t, idx) => (
                        <DoingItem key={"t" + idx} task={t} />
                    ))}
                </>
            ) : (
                <EmptyView msg="No Tasks 4u" />
            )}
        </div>
    );
}

export default Doing;
