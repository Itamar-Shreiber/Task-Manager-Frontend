import "./TotalTodos.css";
import { useEffect, useState } from "react";
import store from "../../../../Redux/Store";
import userWebApi from "../../../../Services/UserWebApi";

function TotalTodos(): JSX.Element {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        userWebApi.countTasks().then((res) => setTotal(res.data));
        // .catch (err=> notify.error(err));

        return store.subscribe(() => {
            setTotal(store.getState().userReducer.todoTasks.length); // Will let us notify
        });
    }, []);

    return (
        <div className="TotalTodos"><p> Total : {total} </p></div>
    );
}

export default TotalTodos;
