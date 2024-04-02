import {Button, ButtonProps} from "../../../shared/ui";
import {FC, MouseEvent, useCallback} from "react";
import {User} from "../../../entities/user/types";
import {useRandomUser} from "../api";

interface ButtonGetRandomUserProps extends ButtonProps {
    onSuccess: (user: User) => void
}

export const ButtonGetRandomUser: FC<ButtonGetRandomUserProps> = ({onSuccess}) => {
    const {isFetching, getRandomUser} = useRandomUser()

    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()

        void getRandomUser(onSuccess)
    }, [onSuccess])

    //Закоментировал disabled={isLoading} для демонстрации работы useThrottle
    return <Button /* disabled={isLoading} */ onClick={onClick}>
        {isFetching ? "Loading..." : <span>Get random user</span>}
    </Button>
}