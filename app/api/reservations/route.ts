import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'


export async function POST(req:Request) {
    const currentUser = await getCurrentUser()


    if(!currentUser) return NextResponse.error()


    const body = await req.json()


    const {
        totalPrice,
        startDate,
        endDate,
        listingId
    } = body

    if(!listingId || !startDate || !endDate || !totalPrice) return NextResponse.error()

    const listingAndReservation = await prisma.listing.update({
        where :{
            id:listingId,
        },
        data : {
            reservations : {
                create : {
                   userId :currentUser.id,
                   startDate,
                   endDate,
                   totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}