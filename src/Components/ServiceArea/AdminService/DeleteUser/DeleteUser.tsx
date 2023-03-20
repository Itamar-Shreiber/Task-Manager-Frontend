import { useNavigate, useParams } from "react-router-dom";
import { deletedUserAction } from "../../../../Redux/AdminAppState";
import store from "../../../../Redux/Store";
import adminWebApi from "../../../../Services/AdminWebApi";
import notify from "../../../../Services/NotificationService";
import "./DeleteUser.css";

function DeleteUser(): JSX.Element {
    const params = useParams();
    // const id = 12345;
    const id = +(params.id || 0);
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/myUsers");
    };

    const yes = async () => {
        await adminWebApi
            .deleteUser(id)
            .then((res) => {
                console.log(id);
                notify.success("Woho deleted successfully");
                store.dispatch(deletedUserAction(id));
                navigate("/myUsers");
            })
            .catch((err) => {
                notify.error(err);
            });
    };
    return (
        <div className="DeleteUser">
            <h3>Attention</h3>
            <div className="wrapper col">
                <div className="row">
                    <p>Are you sure you want to delete user #{id} ?</p>
                </div>
                <div className="row gap">
                    <button className="cancel" onClick={cancel}>
                        Cancel
                    </button>
                    <button className="yes" onClick={yes}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;
