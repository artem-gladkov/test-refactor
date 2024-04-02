import {userApi} from "../../../entities/user/api";
import {genRandomUserId} from "../../../entities/user/libs";
import {useState} from "react";
import {User} from "../../../entities/user/types";
import {useThrottle} from "../../../shared/libs";

export const useRandomUser = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [cashedUsers] = useState<Map<number, User>>(() => new Map())

    const fetchNewUser = async (id: string | number): Promise<User | undefined> => {
        try {
            const newUser = await userApi.fetchUser(id)

            cashedUsers.set(newUser.id, newUser)

            return newUser
        } catch (e) {
            alert("Во время загрузки пользователя что то пощло не так :(")
        }
    }

    const [getRandomUser] = useThrottle(async (onSuccess: (user: User) => void, isForceUpdate?: boolean): Promise<void> => {
        setIsFetching(true)

        const randomId = genRandomUserId()
        const cashedUser = cashedUsers.get(randomId)
        const user = cashedUser && !isForceUpdate ? cashedUser : await fetchNewUser(randomId)

        if (user) {
            onSuccess(user)
        }

        setIsFetching(false)
    }, 1000)


    return {isFetching, getRandomUser}
}