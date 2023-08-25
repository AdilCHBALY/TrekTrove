
import EmptyState from "../components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ReservationClient from "../components/ReservationClinet"


const page =async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser) return(
        <>
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
            />
        </>
    )

        const reservations = await getReservations({
            authorId:currentUser.id,
        })


        if(reservations.length === 0) return(
            <>
                <EmptyState 
                    title="No Reservations Found"
                    subtitle="Looks Like you have no reservation on your Home"
                />
            </>
        )

  return (
    <div>
        <ReservationClient
            //@ts-ignore
            reservations={reservations}
            currentUser={currentUser}
        />
    </div>
  )
}

export default page