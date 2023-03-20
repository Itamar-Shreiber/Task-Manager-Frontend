import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskModel } from "../../../../Models/Task";
import store from "../../../../Redux/Store";
import { gotAllDoneTasksAction } from "../../../../Redux/UserAppState";
import notify from "../../../../Services/NotificationService";
import userWebApi from "../../../../Services/UserWebApi";
import UserWebApi from "../../../../Services/UserWebApi";
import DoneItem from "../../../Items/DoneItem/DoneItem";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import "./Done.css";

function Done(): JSX.Element {
            const [total, setTotal] = useState(0);

            useEffect(() => {
                userWebApi.countTasks().then((res) => setTotal(res.data));
                // .catch (err=> notify.error(err));

                return store.subscribe(() => {
                    setTotal(store.getState().userReducer.doneTasks.length); // Will let us notify
                });
            }, []);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<TaskModel[]>([]);
            const [userTasks, setUserTasks] = useState<TaskModel[]>(
                store.getState().userReducer.doneTasks
            );

            useEffect(() => {
                return store.subscribe(() =>
                    setUserTasks(store.getState().userReducer.doneTasks)
                );
            }, []);
    // useEffect(() => {
    //     return store.subscribe(() =>
    //         setTasks(store.getState().userReducer.doneTasks)
    //     );
    // }, []);
    useEffect(() => {
        const token = store.getState().loginReducer.user.token;
        console.log(token);
        if (!token) {
            navigate("/login");
        } else if (tasks.length === 0) {
            UserWebApi.getAllTasks("DONE")
                .then((res) => {
                    console.log(res.data);
                    setTasks(
                        res.data.filter((obj1) => {
                            return !userTasks.some(
                                (obj2) => obj1.status !== obj2.status
                            );
                        })
                    );
                    store.dispatch(gotAllDoneTasksAction(res.data));
                })
                .catch((err) => notify.error(err));
        }
    }, []);
    return (
        <div className="Done">
            <h1>Done</h1>
            <div className="TotalTodos">
                <p> Total : {total} </p>
            </div>
            {tasks?.length > 0 ? (
                <>
                    {tasks.map((t, idx) => (
                        <DoneItem key={"t" + idx} task={t} />
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

export default Done;
