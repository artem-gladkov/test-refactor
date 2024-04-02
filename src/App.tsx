import {useState} from "react";
import {UserInfo} from "./entities/user/ui";
import type {User} from "./entities/user/types"
import {ButtonGetRandomUser} from "./features/showRandomUser";


export const App = () => (
    <>
        <header>Get a random user</header>
        <WidgetRandomUser/>
    </>
);

export const WidgetRandomUser = () => {
    const [currentUser, setCurrentUsers
    ] = useState<User | null>(null);

    return <>
        <ButtonGetRandomUser onSuccess={setCurrentUsers}/>
        {currentUser && <UserInfo name={currentUser.name} phone={currentUser.phone}/>}
    </>
}