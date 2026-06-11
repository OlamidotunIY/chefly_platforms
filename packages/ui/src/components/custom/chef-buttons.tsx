import React from 'react'
import { Button } from '../button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'

interface ChefButtonprops
{
    isChef: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>
    onLearnMore: React.MouseEventHandler<HTMLButtonElement>
}

export const ChefButton = ({ isChef, onClick, onLearnMore }: ChefButtonprops) =>
{
    return (
        <div className=''>
            {isChef ? <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={"ghost"} className='hover:text-primary hover:bg-transparent'>
                        Become a Chef
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='w-75 flex flex-col space-y-3'>
                    <h1 className='text-lg text-center font-bold'>
                        Turn your culinary passion into opportunity and inspire food lovers around the world.
                    </h1>
                    <Button className='w-full'>
                        Learn More
                    </Button>
                </TooltipContent>
            </Tooltip> : <Button variant={"ghost"} className='hover:text-primary hover:bg-transparent'>
                Switch to Chef Mode
            </Button>}
        </div>
    )
}
