import moment from "moment";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TaskModel } from "../../../Models/Task";
import "./DoneItem.css";
interface DoneItemProps {
    task: TaskModel;
}
function DoneItem(props:DoneItemProps): JSX.Element {
    const navigate = useNavigate();

    const deleteItem = (id: number) => {
        navigate("/todos/delete/" + id);
    };

    const editItem = (id: number) => {
        navigate("/todos/editDone/" + id);
    };
    return (
        <div className="DoneItem">
            <h3>{props.task.title} </h3>
            <hr />
            <span className="desc">{props.task.description}</span>
            <span className="group">{props.task.group}</span>
            <span>{moment(props.task.when).format("DD/MM/YY")}</span>
            <div className="row">
                <button onClick={() => deleteItem(props.task.id)}>
                    <FaTrash />
                </button>
                <button onClick={() => editItem(props.task.id)}>
                    <FaEdit />
                </button>
            </div>
        </div>
    );
}

export default DoneItem;