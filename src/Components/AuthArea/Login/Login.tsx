import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginModel } from "../../../Models/Login";
import notify from "../../../Services/NotificationService";
import { loggedIn } from "../../../Redux/LoginAppState";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import loginWebApi from "../../../Services/LoginWebApi";

function Login(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email pattern")
            .required("Email is required"),
        password: yup
            .string()
            .min(4, "password length minimum is 4 letters")
            .required("Password is required"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const postLogin = async (obj: LoginModel) => {
        const credentials = { email: obj.email, password: obj.password };
        await loginWebApi
            .login(credentials)
            .then((res) => {
                notify.success("login successfully");
                console.log(res.data);
                // Update global State
                store.dispatch(loggedIn(res.data));
                console.log(res.data);
                if (res.data.email == "admin@admin.com") {
                    navigate("/myUsers");
                    console.log("admin");
                }
                if (res.data.email != "admin@admin.com") {
                    navigate("/todos");
                    console.log(res.data.email);
                    console.log("user");
                }
            })
            .catch((err) => notify.error(err));
    };
    return (
        <div className="Login">
            <form className="col" onSubmit={handleSubmit(postLogin)}>
                {!errors.email ? (
                    <label htmlFor="email">Email</label>
                ) : (
                    <span>{errors.email.message}</span>
                )}
                <input
                    {...register("email")}
                    type="email"
                    placeholder="email"
                />
                {!errors.password ? (
                    <label htmlFor="password">Password</label>
                ) : (
                    <span>{errors.password.message}</span>
                )}
                <input
                    {...register("password")}
                    type="password"
                    placeholder="password"
                />
                <button disabled={!isValid}>Login</button>
            </form>
        </div>
    );
}

export default Login;
