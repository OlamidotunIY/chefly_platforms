import React from 'react'
import { Button } from '../button'
import { Bell, Heart, ShoppingCart } from 'lucide-react'

export const HeaderIcons = () =>
{
    return (
        <div className='flex flex-row space-x-5'>
            <Button className='px-0 hover:bg-transparent hover:text-primary' variant={'ghost'}>
                <Bell className='size-5' />
            </Button>
            <Button className='px-0 hover:bg-transparent hover:text-primary' variant={'ghost'}>
                <Heart className='size-5' />
            </Button>
            <Button className='px-0 hover:bg-transparent hover:text-primary' variant={'ghost'}>
                <ShoppingCart className='size-5' />
            </Button>
        </div>
    )
}
