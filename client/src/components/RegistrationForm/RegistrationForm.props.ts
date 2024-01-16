import { User } from "../UserCard/UserCard.props"

export type registrationFormData = {
    _id: string,
    name: string,
    email: string,
    password: string,
    cpassword: string,
    birthDate: string, 
    gender: string,
    photo: string,
}

export const initialData = {
    _id: "",
    name: "",
    email: "",
    password: "",
    cpassword: "",
    birthDate: "",
    gender: "",
    photo: ""
}

export type resData = {
    success: boolean,
    user: User,
    error: string
}