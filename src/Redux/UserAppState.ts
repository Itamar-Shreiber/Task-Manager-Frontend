import { TaskModel } from "../Models/Task";
export class UserAppState {
    // Step 1 - create the app state object
    public todoTasks: TaskModel[] = [];
    public doingTasks: TaskModel[] = [];
    public doneTasks: TaskModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_ALL_TODO_TASKS = "GOT_ALL_TODO_TASKS",
    GOT_ALL_DOING_TASKS = "GOT_ALL_DOING_TASKS",
    GOT_ALL_DONE_TASKS = "GOT_ALL_DONE_TASKS",
    GOT_SINGLE_TASK = "GOT_SINGLE_TASK",
    ADDED_TODO_TASK = "ADDED_TODO_TASK",
    ADDED_DOING_TASK = "ADDED_DOING_TASK",
    UPDATED_TODO_TASK = " UPDATED_TODO_TASK",
    UPDATED_DOING_TASK = " UPDATED_DOING_TASK",
    UPDATED_DONE_TASK = " UPDATED_DONE_TASK",
    DELETED_TASK = "DELETED_TASK",
    REMOVED_TASKS = "REMOVED_TASKS",
}

// Step 3 - define what is action in terms of data
export interface UserAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllTodoTasksAction(todoTasks: TaskModel[]): UserAction {
    return {
        type: ActionType.GOT_ALL_TODO_TASKS,
        payload: todoTasks,
    };
}
export function gotAllDoingTasksAction(doingTasks: TaskModel[]): UserAction {
    return {
        type: ActionType.GOT_ALL_DOING_TASKS,
        payload: doingTasks,
    };
}
export function gotAllDoneTasksAction(doneTasks: TaskModel[]): UserAction {
    return {
        type: ActionType.GOT_ALL_DONE_TASKS,
        payload: doneTasks,
    };
}

export function gotSingleTaskAction(task: TaskModel): UserAction {
    return {
        type: ActionType.GOT_SINGLE_TASK,
        payload: task,
    };
}

export function addedTodoTaskAction(task: TaskModel): UserAction {
    return {
        type: ActionType.ADDED_TODO_TASK,
        payload: task,
    };
}
export function addedDoingTaskAction(task: TaskModel): UserAction {
    return {
        type: ActionType.ADDED_DOING_TASK,
        payload: task,
    };
}

export function updatedTodoTaskACtion(task: TaskModel): UserAction {
    return {
        type: ActionType.UPDATED_TODO_TASK,
        payload: task,
    };
}
export function updatedDoingTaskACtion(task: TaskModel): UserAction {
    return {
        type: ActionType.UPDATED_DOING_TASK,
        payload: task,
    };
}
export function updatedDoneTaskACtion(task: TaskModel): UserAction {
    return {
        type: ActionType.UPDATED_DONE_TASK,
        payload: task,
    };
}

export function deletedTaskAction(id: number): UserAction {
    return {
        type: ActionType.DELETED_TASK,
        payload: id,
    };
}

export function removeTasks(): UserAction {
    return {
        type: ActionType.REMOVED_TASKS,
        payload: {},
    };
}

// Step 5 - Reducer function perform the required action
export function userReducer(
    currentState: UserAppState = new UserAppState(),
    action: UserAction
): UserAppState {
    const newState = { ...currentState }; //Spread Operator // Copy
    switch (action.type) {
        case ActionType.GOT_ALL_TODO_TASKS: {
            newState.todoTasks = action.payload;
            console.log("im here");
            break;
        }
        case ActionType.GOT_ALL_DOING_TASKS: {
            newState.doingTasks = action.payload;
            break;
        }
        case ActionType.GOT_ALL_DONE_TASKS: {
            newState.doneTasks = action.payload;
            break;
        }
        case ActionType.ADDED_TODO_TASK: {
            newState.todoTasks.push(action.payload);
            break;
        }
        case ActionType.ADDED_DOING_TASK: {
            newState.doingTasks.push(action.payload);
            break;
        }
        case ActionType.UPDATED_TODO_TASK: {
            console.log(newState.todoTasks);
            const idx = newState.todoTasks.findIndex(
                (task) => task.id === action.payload.id
            );
            newState.todoTasks[idx] = action.payload;
            console.log(newState.todoTasks);
            break;
        }
        case ActionType.UPDATED_DOING_TASK: {
            console.log(newState.doingTasks);
            const idx = newState.doingTasks.findIndex(
                (task) => task.id === action.payload.id
            );
            newState.doingTasks[idx] = action.payload;
            console.log(newState.doingTasks);
            break;
        }
        case ActionType.UPDATED_DONE_TASK: {
            console.log(newState.doneTasks);
            const idx = newState.doneTasks.findIndex(
                (task) => task.id === action.payload.id
            );
            newState.doneTasks[idx] = action.payload;
            console.log(newState.doneTasks);
            break;
        }

        case ActionType.DELETED_TASK: {
            newState.todoTasks = newState.todoTasks.filter(
                (task) => task.id !== action.payload
            );
            break;
        }
        case ActionType.REMOVED_TASKS: {
            newState.todoTasks = [];
            newState.doingTasks = [];
            newState.doneTasks = [];
            break;
        }
    }
    return newState;
}
