import { User } from "../../components/UserCard/UserCard.props"

export type usersData = {
    success: boolean,
    users: User[],
    error: string
}