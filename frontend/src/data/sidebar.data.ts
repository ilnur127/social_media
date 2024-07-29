import {
  MessageSquare,
  Phone,
  Settings,
  User,
  SearchIcon,
  UserRoundXIcon,
  UserIcon,
  MessageSquareIcon,
  SettingsIcon,
} from 'lucide-react';

export const MENU = [
  {
    title: 'Мои друзья',
    url: '/friends',
    icon: UserIcon,
  },
  {
    title: 'Мои зблокированные пользователи',
    url: '/blockedUsers',
    icon: UserRoundXIcon,
  },
  {
    title: 'Мои чаты',
    url: '/',
    icon: MessageSquareIcon,
  },
  {
    title: 'Мои настройки',
    url: '/settings',
    icon: SettingsIcon,
  },
  {
    title: 'Поиск',
    url: '/searchPeople',
    icon: SearchIcon,
  },
];
