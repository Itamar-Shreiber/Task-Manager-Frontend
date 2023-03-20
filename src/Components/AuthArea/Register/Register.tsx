import "./Register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterModel } from "../../../Models/Login";
import webApi from "../../../Services/LoginWebApi";
import notify from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
function Register(): JSX.Element {
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
        confirm: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Confirm is required"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });

    const postRegister = async (obj: RegisterModel) => {
        const credentials = { email: obj.email, password: obj.password };
        await webApi
            .register(credentials)
            .then((res) => {
                notify.success("Register successfully");
                navigate("/login");
            })
            .catch((err) => notify.error(err));
    };
    return (
        <div className="Register">
            <form className="col" onSubmit={handleSubmit(postRegister)}>
                {!errors.email ? (
                    <label htmlFor="email">Email</label>
                ) : (
                    <span>{errors.email.message}</span>
                )}
                <input
                    {...register("email")}
                    id="email"
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
                    id="password"
                    type="password"
                    placeholder="password"
                />
                {!errors.confirm ? (
                    <label htmlFor="confirm">Confirm</label>
                ) : (
                    <span>{errors.confirm.message}</span>
                )}
                <input
                    {...register("confirm")}
                    id="confirm"
                    type="password"
                    placeholder="confirm password"
                />
                <button disabled={!isValid}>Register</button>
            </form>
        </div>
    );
}

export default Register;
