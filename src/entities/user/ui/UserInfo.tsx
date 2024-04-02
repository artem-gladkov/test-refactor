import {FC} from "react";

interface UserInfoProps {
    name: string;
    phone: string;
}

export const UserInfo: FC<UserInfoProps> = function ({name, phone}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Username</th>
                <th>Phone number</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{name}</td>
                <td>{phone}</td>
            </tr>
            </tbody>
        </table>
    );
};
