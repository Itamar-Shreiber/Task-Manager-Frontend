import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { TaskModel, TaskPayloadModel } from "../../../../Models/Task";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import userWebApi from "../../../../Services/UserWebApi";
import "./EditDoing.css";
import { updatedDoingTaskACtion } from "../../../../Redux/UserAppState";

function EditDoing(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);

    const toUpdate = store
        .getState()
        .userReducer.doingTasks.filter((task) => task.id === id)[0];
    const [obj, setObj] = useState<TaskModel>(toUpdate);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        when: yup
            .date()
            .min(new Date(), "there is not option for previous time")
            .default(new Date())
            .typeError("You must specify a date")
            .required("Date is required")
            .nullable()
            .default(() => new Date()),
    });

    const putTask = async (task: TaskPayloadModel) => {
        await userWebApi
            .editTask(id, task)
            .then((res) => {
                notify.success("Woho task updated successfully");
                store.dispatch(updatedDoingTaskACtion(res.data));
                navigate("/doing");
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
        <div className="EditDoing">
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit(putTask)}>
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

export default EditDoing;
