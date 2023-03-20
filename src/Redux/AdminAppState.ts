import { UserModel } from "../Models/UserModel";
export class AdminAppState {
    // Step 1 - create the app state object
    public users: UserModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_ALL_USERS = "GOT_ALL_USERS",
    DELETED_USER = "DELETED_USER",
    REMOVED_USERS = "REMOVED_USERS",
}

// Step 3 - define what is action in terms of data
export interface AdminAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllUsersAction(users: UserModel[]): AdminAction {
    return {
        type: ActionType.GOT_ALL_USERS,
        payload: users,
    };
}

export function deletedUserAction(id: number): AdminAction {
    return {
        type: ActionType.DELETED_USER,
        payload: id,
    };
}

export function removeUsers(): AdminAction {
    return {
        type: ActionType.REMOVED_USERS,
        payload: {},
    };
}

// Step 5 - Reducer function perform the required action
export function adminReducer(
    currentState: AdminAppState = new AdminAppState(),
    action: AdminAction
): AdminAppState {
    const newState = { ...currentState }; //Spread Operator // Copy
    switch (action.type) {
        case ActionType.GOT_ALL_USERS: {
            newState.users = action.payload;
            break;
        }

        case ActionType.DELETED_USER: {
            newState.users = newState.users.filter(
                (user) => user.id !== action.payload
            );
            break;
        }
        case ActionType.REMOVED_USERS: {
            newState.users = [];
            break;
        }
    }
    return newState;
}
