import { MessageSquare, Phone, Settings, User, SearchIcon } from "lucide-react";

export const MENU = [
    {
        title: 'Мои друзья',
        url: '/friends',
        icon: User,
    },
    {
        title: 'Мои звонки',
        url: '/call',
        icon: Phone,
    },
    {
        title: 'Мои чаты',
        url: '/',
        icon: MessageSquare,
    },
    {
        title: 'Мои настройки',
        url: '/settings',
        icon: Settings,
    },
    {
        title: 'Поиск',
        url: '/searchPeople',
        icon: SearchIcon,
    },
]