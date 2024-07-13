export interface IUser {
    id: number
    username: string
    email: string
    confirmed: string
    role: string
    avatar: { url: string; id: number}[],
    position: string
    friends: IUser[]
}