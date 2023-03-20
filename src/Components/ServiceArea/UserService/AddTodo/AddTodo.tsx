import "./AddTodo.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskPayloadModel } from "../../../../Models/Task";
import { useNavigate } from "react-router-dom";
import notify from "../../../../Services/NotificationService";
import { addedDoingTaskAction, addedTodoTaskAction } from "../../../../Redux/UserAppState";
import { useEffect } from "react";
import store from "../../../../Redux/Store";
import userWebApi from "../../../../Services/UserWebApi";

function AddTodo(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        const token = store.getState().loginReducer.user.token;
        console.log(token);
        if (!token) {
            navigate("/login");
        }
    }, []);

    const schema = yup.object().shape({
        title: yup.string().required("title is required"),
        description: yup.string().required("description is missing"),
        group: yup.string().required("group is required"),
        when: yup
            .date()
            .min(new Date(), "there is not option for previous time")
            .default(new Date())
            .typeError("You must specify a date")
            .required("Date is required")
            .nullable()
            .default(() => new Date()),
        status: yup.string().required("status is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<TaskPayloadModel>({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const postTask = async (task: TaskPayloadModel) => {
        await userWebApi
            .addTask(task)
            .then((res) => {
                notify.success("Woho task added successfully");
                if (res.data.status === "TODO") {
                    store.dispatch(addedTodoTaskAction(res.data));
                }
                if (res.data.status === "DOING") {
                    store.dispatch(addedDoingTaskAction(res.data));
                }
                navigate("/todos");
            })
            .catch((err) => {
                notify.error(err);
            });
        console.log(task);
    };
    return (
        <div className="AddTodo">
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit(postTask)}>
                {errors.title ? (
                    <span>{errors.title?.message}</span>
                ) : (
                    <label htmlFor="title">Title</label>
                )}
                <input
                    {...register("title")}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title..."
                />
                {errors.description ? (
                    <span>{errors.description?.message}</span>
                ) : (
                    <label htmlFor="description">Description</label>
                )}
                <input
                    {...register("description")}
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Description..."
                />
                {errors.group ? (
                    <span>{errors.group?.message}</span>
                ) : (
                    <label htmlFor="group">Group</label>
                )}
                <input
                    {...register("group")}
                    id="group"
                    name="group"
                    type="text"
                    placeholder="Group..."
                />
                {errors.when ? (
                    <span>{errors.when?.message}</span>
                ) : (
                    <label htmlFor="when">When</label>
                )}
                <input
                    {...register("when")}
                    id="when"
                    name="when"
                    type="datetime-local"
                    placeholder="When..."
                />
                {errors.status ? (
                    <span>{errors.status?.message}</span>
                ) : (
                    <label htmlFor="status">Status</label>
                )}
                <select className="select" {...register("status")}>
                    <option value="default" disabled hidden>
                        Please choose status
                    </option>
                    <option value="TODO">Todo</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                </select>
                <button disabled={!isValid}>Add Task</button>
            </form>
        </div>
    );
}

export default AddTodo;
