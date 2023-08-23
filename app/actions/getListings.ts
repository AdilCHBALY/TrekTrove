import prisma from '@/app/libs/prismadb'



export default async function getListings() {
    try{
        const listings = await prisma.listing.findMany({
            orderBy :{
                created_at : 'desc',
            }
        })

        return listings

    }catch(e : any){
        throw new Error(e)
    }
}