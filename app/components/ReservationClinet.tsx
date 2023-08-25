"use client"

import { SafeReservation, SafeUser } from "@/types"
import Heading from "./Heading"
import Container from "./Container"
import {useRouter} from 'next/navigation'

import {useState,useCallback} from 'react'
import { toast } from "react-hot-toast"
import axios from "axios"
import ListingCard from "./ListingCard"


interface ReservationClientProps{
    reservations: SafeReservation[]
    currentUser : SafeUser | null
}


const ReservationClient:React.FC<ReservationClientProps>= ({
    reservations,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId,setDeletingId]=useState('')

    const onCancel = useCallback((id:string) =>{
        setDeletingId(id)


        axios.delete(`/api/reservations/${id}`).then(() =>{
            toast.success("Reservation Cancelled")
            router.refresh()
        }).catch(()=>{
            toast.error("Something went wrong")
        }).finally(()=>{
            setDeletingId('')
        })
    },[router])

  return (
    <Container>
        <Heading 
            title="Reservations"
            subtitle="Bookings on your properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation)=>(
                    <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    //@ts-ignore
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId == reservation.id}
                    actionLabel="Cancel Reservation"
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default ReservationClient