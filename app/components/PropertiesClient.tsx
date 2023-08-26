"use client"

import { SafeListing, SafeUser } from "@/types"
import Container from "./Container"
import Heading from "./Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "./ListingCard"

interface PropertiesClientProps{
    listings:SafeListing[]
    currentUser : SafeUser | null
}


const PropertiesClient:React.FC<PropertiesClientProps> = ({
    listings,currentUser
}) => {
    const router = useRouter()
    const [deletingId,setDeletingId]=useState("")


    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`).then(()=>{
            toast.success("Property Deleted")
            router.refresh()
        }).catch((e)=>{
            toast.error(e.response.data.error)
        }).finally(()=>{
            setDeletingId('')
        });


    },[router])

  return (
    <Container>
        <Heading
            title="Properties"
            subtitle="List of your properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing)=>(
                <ListingCard 
                    key={listing.id}
                    data={listing}
                    //@ts-ignore
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId == listing.id}
                    actionLabel="Delete Property"
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default PropertiesClient