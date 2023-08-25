import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingsId from "@/app/actions/getListingById"
import getReservations from "@/app/actions/getReservations"
import EmptyState from "@/app/components/EmptyState"
import ListingClient from "@/app/components/ListingClient"

interface IParams{
    listingId?:string
}


const page = async ({params}:{params : IParams}) => {


    const listing = await getListingsId(params)
    const currentUser = await getCurrentUser()
    const reservations=await getReservations(params)

    
    if(!listing){
        return(
            <>
                <EmptyState />
            </>
        )
    }

  return (
    <div>
        <ListingClient
            //@ts-ignore
            reservations={reservations}
            listing={listing}
            currentUser = {currentUser}
        />

    </div>
  )
}

export default page