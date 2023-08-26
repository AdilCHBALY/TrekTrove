
import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import EmptyState from "../components/EmptyState"
import PropertiesClient from "../components/PropertiesClient"



const page = async () => {

  const currentUser = await getCurrentUser()


    if(!currentUser) return(
        <EmptyState 
            title="Unauthorized"
            subtitle="Please Login"
        />
    )

    const listings = await getListings({
      userId:currentUser.id,
  })

  if(listings.length === 0) return(
      <EmptyState 
          title="No Properties Found"
          subtitle="Looks like you have no Properties"
      />
  )

  return (
    <PropertiesClient
        //@ts-ignore
        listings={listings}
        currentUser={currentUser}
    />
  )
}

export default page