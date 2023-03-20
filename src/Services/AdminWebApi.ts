import axios, { AxiosResponse } from "axios";
import global from "./ConstantService";
import { UserModel } from "../Models/UserModel";
import store from "../Redux/Store";
class AdminWebApi {
    private adminApi = global.urls.admin;

    public getAllUsers(): Promise<AxiosResponse<UserModel[]>> {
        const token = store.getState().loginReducer.user.token;
        const headers = { authorization: token };
        const url = this.adminApi + "/users";
        return axios.get<UserModel[]>(url, { headers });
        // return tokenAxios.get<UserModel[]>(this.adminApi);
    }

    public deleteUser(id: number): Promise<AxiosResponse<any>> {
        const token = store.getState().loginReducer.user.token;
        const headers = { authorization: token };
        const url = this.adminApi + "/users";
        return axios.delete<any>(url + "/" + id, { headers });
        // return tokenAxios.delete<any>(this.adminApi + "/" + id);
    }
}

const adminWebApi = new AdminWebApi();
export default adminWebApi;
