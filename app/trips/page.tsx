import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import EmptyState from "../components/EmptyState"
import TripsClient from "../components/TripsClient"


const page = async () => {
    const currentUser = await getCurrentUser()


    if(!currentUser) return(
        <EmptyState 
            title="Unauthorized"
            subtitle="Please Login"
        />
    )

    const reservations = await getReservations({
        userId:currentUser.id,
    })

    if(reservations.length === 0) return(
        <EmptyState 
            title="No Trips Found"
            subtitle="Looks like you haven't reserved trips"
        />
    )

  return (
    <TripsClient 
        //@ts-ignore
        reservations={reservations}
        currentUser={currentUser}
    />
  )
}

export default page