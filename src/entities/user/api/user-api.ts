import {User} from "../types";

export class UserApi {
    fetchUser = async (id: string | number): Promise<User> => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}users/${id}`);

        return await response.json()
    }
}

export const userApi = new UserApi()