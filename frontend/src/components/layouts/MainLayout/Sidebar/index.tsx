'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Sun } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { MENU } from '@/data'

import classes from './index.module.scss'
import { useThemeStore } from '@/store/theme.store'

const Sidebar = () => {
    const pathName = usePathname();
    const session = useSession();
    const { theme, changeTheme } = useThemeStore()

    const changeInterfaceTheme = () => {
        changeTheme(theme === 'dark' ? 'white' : 'dark')
    }
    
    return (
        <aside className={classes.sidebar}>
            {session?.data &&
                <>
                    <Link href='/'>
                        <Image src='/logo.ico' alt='Logo' width={45} height={45} />
                    </Link>

                    <div className={classes.sidebar_linksBlock}>
                        {MENU.map((menuItem) => (
                            <Link
                                href={menuItem.url}
                                key={menuItem.url}
                                title={menuItem.title}
                            >
                                <menuItem.icon
                                    size={35}
                                    className={clsx({[classes.active]: pathName === menuItem.url})}
                                />
                            </Link>
                        ))}
                    </div>

                    <button onClick={changeInterfaceTheme}><Sun size={35} /></button>
                </>
            }
        </aside>
    )
}

export default Sidebar