import { IUser } from "@/types/user.types";

export function getUserAvatarUrl(user: IUser): string {
    return process.env.BACK_URL + user.avatar[0].url || ''
}