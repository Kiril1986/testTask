import { FC, ReactElement, createContext, useState } from "react";
import { User } from "../components/UserCard/UserCard.props"

export type UserContextState = {
    user: User | undefined
    onChangeUser: (data: User) => void;
}

const defaultState: UserContextState = {
    user: undefined,
    onChangeUser: () => {},
}

export const UserContext = createContext<UserContextState>(defaultState)

export const UserContextProvider: FC<{ children: ReactElement }> = ({ children, }) => {
    const [ user, setUser ] = useState<User>()
     const onChangeUser = (data: User): void => {
         setUser(data)
     }; 
    return (
     <UserContext.Provider value={{ user, onChangeUser}}>
     {children}
     </UserContext.Provider>
    );
 }