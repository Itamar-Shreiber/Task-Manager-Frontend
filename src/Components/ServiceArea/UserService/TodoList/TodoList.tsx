import { useEffect, useState } from "react";
import "./TodoList.css";
import { TaskModel } from "../../../../Models/Task";
import notify from "../../../../Services/NotificationService";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../../../Items/TodoItem/TodoItem";
import { useNavigate } from "react-router-dom";
import { gotAllTodoTasksAction } from "../../../../Redux/UserAppState";
import store from "../../../../Redux/Store";
import UserWebApi from "../../../../Services/UserWebApi";
import TotalTodos from "../TotalTodos/TotalTodos";
import userWebApi from "../../../../Services/UserWebApi";

function TodoList(): JSX.Element {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        userWebApi.countTasks().then((res) => setTotal(res.data));
        // .catch (err=> notify.error(err));

        return store.subscribe(() => {
            setTotal(store.getState().userReducer.todoTasks.length); // Will let us notify
        });
    }, []);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [userTasks, setUserTasks] = useState<TaskModel[]>(
        store.getState().userReducer.todoTasks
    );
    useEffect(() => {
        return store.subscribe(() =>
            setUserTasks(store.getState().userReducer.todoTasks)
        );
    }, []);
    // useEffect(() => {
    //     return store.subscribe(() =>
    //         setTasks(store.getState().userReducer.todoTasks)
    //     );
    // }, []);
    useEffect(() => {
        const token = store.getState().loginReducer.user.token;
        console.log(token);
        if (!token) {
            navigate("/login");
        } else if (tasks.length === 0) {
            UserWebApi.getAllTasks("TODO")
                .then((res) => {
                    console.log(res.data);
                    setTasks(
                        res.data.filter((obj1) => {
                            return !userTasks.some(
                                (obj2) => obj1.status !== obj2.status
                            );
                        })
                    );
                    store.dispatch(gotAllTodoTasksAction(res.data));
                })
                .catch((err) => notify.error(err));
        }
    }, []);

    return (
        <div className="TodoList col">
            <h1>Todo list</h1>
            <div className="TotalTodos">
                <p> Total : {total} </p>
            </div>
            <button className="addButton" onClick={() => navigate("add")}>
                Add new Task
            </button>
            {tasks?.length > 0 ? (
                <>
                    {tasks.map((t, idx) => (
                        <TodoItem key={"t" + idx} task={t} />
                    ))}
                </>
            ) : (
                <EmptyView msg="No Tasks 4u" />
            )}
        </div>
    );
}

export default TodoList;
