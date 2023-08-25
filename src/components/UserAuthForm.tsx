'use client'
import React, { useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from "next-auth/react"
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {

    const { toast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loginWithGoogle = async () => {
        setIsLoading(true)
        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'Sign in failed',
                description: 'There was an error logging in with Google',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Button onClick={loginWithGoogle} isLoading={isLoading} size={'sm'} className='w-full'>
                {isLoading ? null : <Icons.google className='w-5 h-5 mr-2' />}
                Google
            </Button>
        </div>
    )
}