import prisma from '@/app/libs/prismadb'



export interface IListingsParams{
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    startDate?:string
    endDate?:string
    locationValue?:string
    category?:string
}


export default async function getListings(
    params: IListingsParams
) {
    try{

        const {userId,
            roomCount,
            bathroomCount,
            guestCount,
            startDate,
            endDate,
            locationValue,
            category
        } = params



        let q : any = {}


        if(userId) q.userId = userId
        if(category) q.category = category
        if(locationValue) q.locationValue = locationValue
        if(roomCount) q.roomCount = {
            gte : +roomCount,
        }
        if(bathroomCount) q.bathroomCount = {
            gte : +bathroomCount,
        }
        if(guestCount) q.guestCount = {
            gte : +guestCount,
        }
        if(startDate && endDate ) q.NOT = {
            reservations: {
                some:{
                    OR:[
                        {
                            endDate : {
                                gte : startDate
                            },
                            startDate :{
                                lte : startDate
                            }
                        },
                        {
                            startDate : {
                                lte : endDate
                            },
                            endDate :{
                                gte : endDate
                            }
                        }
                    ]
                }
            }
        }




        const listings = await prisma.listing.findMany({
            where :q,
            orderBy :{
                created_at : 'desc',
            }
        })

        const safelistings = listings.map((listing)=>({
            ...listing,
            created_at : listing.created_at.toISOString()
        }))

        return safelistings

    }catch(e : any){
        throw new Error(e)
    }
}