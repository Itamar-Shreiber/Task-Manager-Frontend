import { Route, Routes } from "react-router";
import "./Routing.css";
import App from "../../../App";
import Home from "../../PagesArea/Home/Home";
import TodoList from "../../ServiceArea/UserService/TodoList/TodoList";
import AddTodo from "../../ServiceArea/UserService/AddTodo/AddTodo";
import DeleteTodo from "../../ServiceArea/UserService/DeleteTodo/DeleteTodo";
import EditTodo from "../../ServiceArea/UserService/EditTodo/EditTodo";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import GetAllUsers from "../../ServiceArea/AdminService/GetAllUsers/GetAllUsers";
import DeleteUser from "../../ServiceArea/AdminService/DeleteUser/DeleteUser";
import Doing from "../../ServiceArea/UserService/Doing/Doing";
import Done from "../../ServiceArea/UserService/Done/Done";
import EditDoing from "../../ServiceArea/UserService/EditDoing/EditDoing";
import EditDone from "../../ServiceArea/UserService/EditDone/EditDone";
import About from "../../PagesArea/About/About";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App />} />
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/myUsers" element={<GetAllUsers />} />
                <Route path="/myUsers/delete/:id" element={<DeleteUser />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/doing" element={<Doing />} />
                <Route path="/done" element={<Done />} />
                <Route path="/todos/add" element={<AddTodo />} />
                <Route path="/todos/delete/:id" element={<DeleteTodo />} />
                <Route path="/todos/editTodo/:id" element={<EditTodo />} />
                <Route path="/todos/editDoing/:id" element={<EditDoing />} />
                <Route path="/todos/editDone/:id" element={<EditDone />} />
            </Routes>
        </div>
    );
}

export default Routing;
