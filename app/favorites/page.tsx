import EmptyState from "../components/EmptyState"

import getCurrentUser from "../actions/getCurrentUser"
import getFavorite from "../actions/getFavorite"


const page = async () => {
    const currentUser = await getCurrentUser()
    const FavoriteListing = await getFavorite()


    if(FavoriteListing.length === 0) return(
        <>
            <EmptyState
                title="No Favorite Listing"
                subtitle="Looks like you have no Favorite Listings"
            />
        </>
    )


    if(!currentUser) return(
        <>
            <EmptyState 
                title="Unauthorized"
                subtitle="Login to check for your Favorite Listings"
            />
        </>
    )


  return (
    <div>page</div>
  )
}

export default page