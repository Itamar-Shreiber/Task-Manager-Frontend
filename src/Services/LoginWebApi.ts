import { Credentials, User } from "../Models/Login";
import axios, { AxiosResponse } from "axios";
import global from "./ConstantService";
class LoginWebApi {
    private loginApi = global.urls.login;

    public register(credentials: Credentials): Promise<AxiosResponse<any>> {
        return axios.post<any>(this.loginApi + "/" + "register", credentials);
    }

    public login(credentials: Credentials): Promise<AxiosResponse<User>> {
        console.log();
        return axios.post<User>(this.loginApi + "/" + "login", credentials);
    }
}

const loginWebApi = new LoginWebApi();
export default loginWebApi;
