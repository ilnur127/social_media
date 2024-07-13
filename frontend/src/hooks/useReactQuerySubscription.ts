'use client'
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import io, { Socket } from "socket.io-client"

type TWebSocketEvent = {
    operation: 'invalidate' | 'update';
    entity: string;
    id?: string;
    payload?: Record<string, string>
}

type TUpdateData = {
    id: string;
    [key: string]: any;
}

export const useReactQuerySubscription = () => {
    const queryClient = useQueryClient()

    const socket = useRef<Socket>()

    useEffect(() => {
        socket.current = io(process.env.BACK_URL as string)
        
        socket.current.on('connect', () => {
            console.log('connected to socket server')
        })

        socket.current.on('server-message', (data: TWebSocketEvent) => {
            console.log('server-message', data)
            queryClient.invalidateQueries({
                queryKey: [data.entity, data.id].filter(Boolean)
            })
        })
        socket.current.on('update', (data: TWebSocketEvent) => {
            console.log('update', data)
            queryClient.setQueriesData<TUpdateData[] | TUpdateData | undefined>(
                { queryKey: [data.entity, data.id] },
                (oldData) => {
                    const update = (entity: TUpdateData) => 
                        entity.id === data.id ? { ...entity, ...data.payload } : entity

                    return Array.isArray(oldData) ? oldData.map(update) : update(oldData as TUpdateData)
                }
            )
        })

        return () => {
            socket.current?.disconnect();
        }
    }, [queryClient])

    return (input: TWebSocketEvent) => {
        socket.current?.emit('client-message', input)
    }
}