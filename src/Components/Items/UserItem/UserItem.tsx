import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import "./UserItem.css";

interface UserItemProps {
    user: UserModel;
}

function UserItem(props: UserItemProps): JSX.Element {
    const navigate = useNavigate();

    const deleteItem = (id: number) => {
        navigate("/myUsers/delete/" + id);
    };

    return (
        <div className="UserItem">
            <span className="desc">{props.user.nickname}</span>
            <span className="desc">{props.user.email}</span>
            <span className="desc">{props.user.password}</span>
            <div className="row">
                <button onClick={() => deleteItem(props.user.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default UserItem;
