import "./EditTodo.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { TaskModel, TaskPayloadModel } from "../../../../Models/Task";
import notify from "../../../../Services/NotificationService";
import { useState } from "react";
import store from "../../../../Redux/Store";
import userWebApi from "../../../../Services/UserWebApi";
import { updatedTodoTaskACtion } from "../../../../Redux/UserAppState";

function EditTodo(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);

    const toUpdate = store
        .getState()
        .userReducer.todoTasks.filter((task) => task.id === id)[0];
    const [obj, setObj] = useState<TaskModel>(toUpdate);

    const navigate = useNavigate();

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

    const putTask = async (task: TaskPayloadModel) => {
        await userWebApi
            .editTask(id, task)
            .then((res) => {
                notify.success("Woho task updated successfully");
                store.dispatch(updatedTodoTaskACtion(res.data))
                navigate("/todos");
            })
            .catch((err) => {
                notify.error(err);
            });
        console.log(task);
    };

    let defaultValuesObj = { ...obj };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
    } = useForm<TaskModel>({
        defaultValues: defaultValuesObj,
        mode: "all",
        resolver: yupResolver(schema),
    });

    const { dirtyFields } = useFormState({ control });

    return (
        <div className="EditTodo">
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit(putTask)}>
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
                <button disabled={!isValid || !isDirty}>Update Task</button>
            </form>
        </div>
    );
}

export default EditTodo;
