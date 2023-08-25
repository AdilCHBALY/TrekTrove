"use client"

import { SafeUser } from '@/types'
import {Listing,Reservation} from '@prisma/client'
import {useRouter} from 'next/navigation'
import useCountry from '../hooks/useCountry'
import { useCallback, useMemo } from 'react'
import {format } from 'date-fns'
import Image from 'next/image'
import HeartButton from './HeartButton'
import Button from './Button'


interface ListingCardProps{
    data : Listing
    reservation?: Reservation
    currentUser?: SafeUser | null
    onAction?:(id:string)=>void
    disabled?: boolean
    actionLabel?:string
    actionId?:string
}


const ListingCard:React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    currentUser,
    disabled,
    actionId = "",
    actionLabel
}) => {

    const router = useRouter()
    const {getByValue}= useCountry()

    const location = getByValue(data.locationValue)


    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation()
        if(disabled) return


        onAction?.(actionId)
    },[actionId, disabled, onAction])

    const price = useMemo(()=>{
        if(reservation) return reservation.totalPrice

        return data.price
    },[data.price, reservation])

    const reservationDate = useMemo(()=>{

        if(!reservation) return null

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start,'PP')} - ${format(end,'PP')}`

    },[reservation])

  return (
    <div
        onClick={()=>router.push(`/listings/${data.id}`)}
        className='col-span-1 cursor-pointer group'>
            <div className='flex flex-col gap-2 w-full'>
                <div className='w-full aspect-square relative overflow-hidden rounded-xl'>
                    <Image
                        fill
                        alt='listing'
                        src={data.imageSrc}
                        className='h-full object-cover w-full transition group-hover:scale-110'
                    />
                    <div className='absolute top-3 right-3'>
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className='font-semibold text-lg'>
                       {location?.region}, {location?.label}
                </div>
                <div className='font-light text-neutral-500'>
                    {reservationDate || data.category}
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <div className='font-semibold'>
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className='font-light'>
                            night
                        </div>
                    )}
                </div>
                 {onAction && actionLabel && (
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                 )}
            </div>
    </div>
  )
}

export default ListingCard