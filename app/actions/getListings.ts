import prisma from '@/app/libs/prismadb'



export default async function getListings() {
    try{
        const listings = await prisma.listing.findMany({
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