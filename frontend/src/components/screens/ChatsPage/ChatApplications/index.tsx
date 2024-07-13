'use client'
import { useState } from "react"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"

import { fetcher } from "@/utils/fetcher"
import { IMessage } from "@/types/chat.types"
import { Loader } from "@/components/ui"

import classes from './index.module.scss'
import Applications from "./applications"
import Header from "./header"

const ChatApplications = ({ chatId }: { chatId: number }) => {
    const [activeFilter, setActiveFilter] = useState('');
    const { data, isLoading } = useQuery({
        queryKey: ['applications', chatId],
        queryFn: async () => {
          const { data } = await fetcher<{ data: IMessage[] }>(
            `messages?populate=*&filters[chat][$eq]=${chatId}&filters[media][$null]`,
            { method: 'GET', isAuth: true }
          )
    
          return data;
        },
        select: (data) => {
            const groupData = Object.groupBy(data, (media) => format(media.createdAt, 'dd.MM.yyyy'));
            const convertedData = Object.entries(groupData)
                .map(([date, messages]) => 
                    ({date, mediases: messages?.map(message => message.media).flat()}
                ))
            return convertedData
        },
    })

    return <div className={classes.applicationsBlock}>
        {isLoading && <Loader />}
        <Header activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        {data?.length ? 
            <Applications data={data} activeFilter={activeFilter} />:
            <p>Not applications</p> }
    </div>
}

export default ChatApplications