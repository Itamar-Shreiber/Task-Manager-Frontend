import axios, { AxiosResponse } from "axios";
import { TaskModel, TaskPayloadModel } from "../Models/Task";
import global from "./ConstantService";
// import tokenAxios from "./AxiosToken";
import store from "../Redux/Store";
class UserWebApi {
    private userApi = global.urls.user;

    public getAllTasks(status: string): Promise<AxiosResponse<TaskModel[]>> {
        const token = store.getState().loginReducer.user.token;
        const headers = { "authorization": token }
        const params={status};
        return axios.get<TaskModel[]>(this.userApi ,{params, headers });
        // return tokenAxios.get<TaskModel[]>(this.userApi);
    }

    public getSingleTaskById(id: number): Promise<AxiosResponse<TaskModel>> {
        const token = store.getState().loginReducer.user.token;
        const headers = { "authorization": token };
        return axios.get<TaskModel>(this.userApi + "/" + id, { headers });
        // return tokenAxios.get<TaskModel>(this.userApi + "/" + id);
    }

    public deleteTask(id: number): Promise<AxiosResponse<any>> {
        const token = store.getState().loginReducer.user.token;
        const headers = { "authorization": token }
        return axios.delete<any>(this.userApi + "/" + id, { headers });
        // return tokenAxios.delete<any>(this.userApi + "/" + id);
    }

    public addTask(task: TaskPayloadModel): Promise<AxiosResponse<TaskModel>> {
        const token = store.getState().loginReducer.user.token;
        const headers = { "authorization": token };
        return axios.post<TaskModel>(this.userApi, task, { headers });
        // return tokenAxios.post<TaskModel>(this.userApi, task);
    }

    public editTask(
        id: number,
        task: TaskPayloadModel
    ): Promise<AxiosResponse<TaskModel>> {
        const token = store.getState().loginReducer.user.token;
        const headers = { "authorization": token };
        return axios.put<TaskModel>(this.userApi + "/" + id, task, { headers });
        // return tokenAxios.put<TaskModel>(this.userApi + "/" + id, task);
    }

    public countTasks(): Promise<AxiosResponse<number>> {
        const token = store.getState().loginReducer.user.token;
        const headers = { "authorization": token }
        return axios.get<number>(this.userApi + "/" + "count", { headers });
        // return tokenAxios.get<number>(this.userApi + "/" + "count");
    }
}

const userWebApi = new UserWebApi();
export default userWebApi;
