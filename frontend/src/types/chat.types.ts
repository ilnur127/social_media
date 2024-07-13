import { IAssets } from "./assets.types"
import { IUser } from "./user.types"

export interface IMessage {
    id: number,
    text: string,
    media: IAssets[],
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    sender: IUser
}

export interface IChat {
    id: number
    messages: IMessage[]
    participants: IUser[],
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
}