import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'
import getListingsId from './getListingById'

interface IParams {
    listingId?: string
    userId?:string
    authorId?:string
}

export default async function getReservations(params:IParams){
    try{
        const {
            listingId,userId,authorId
        } =params
    
        const q : any = {}
    
    
        if(listingId) q.listingId = listingId
        if(userId) q.userId = userId
        if(authorId) q.listing = {
            userId : authorId
        }
    
        const reservations = await prisma.reservation.findMany({
            where: q,
            include : {
                listing : true
            },orderBy:{
                createdAt:'desc'
            }
        })
    
    
    
        const safeReservations = reservations.map((reservation) =>({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing:{
                ...reservation.listing,
                created_at : reservation.listing.created_at.toISOString()
            }
        }))
    
        return safeReservations
    }catch(e:any){
        throw new Error(e)
    }
}


