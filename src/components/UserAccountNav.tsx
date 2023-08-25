'use client'

import { User } from 'next-auth'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { UserAvatar } from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'


type Props = {
    user: Pick<User, 'name' | 'image' | 'email'>
}

export const UserAccountNav = ({ user }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    className='w-8 h-8'
                    user={{
                        name: user.name || null,
                        image: user.image || null
                    }} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white' align='end'>
                <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-2 leading-none'>
                        {user.name && <p className='font-medium'>{user.name}</p>}
                        {user.email && <p className='text-sm truncate text-zinc-700 w-[200px]'>{user.email}</p>}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link className='cursor-pointer hover:underline' href={'/'}>Feed</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className='cursor-pointer hover:underline' href={'/r/create'}>Create community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className='cursor-pointer hover:underline' href={'/settings'}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault
                    signOut({
                        callbackUrl: `${window.location.origin}/sign-in`
                    })
                }}
                    className='cursor-pointer'>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}