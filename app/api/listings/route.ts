import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request){
    const currentUser = await getCurrentUser()

    if(!currentUser) return NextResponse.error()

    const body = await req.json()


    const {
        category,
        locationValue,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description 
    } = body

    const listing = await prisma.listing.create({
        data:{
            category,
            locationValue : locationValue.value,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price : parseInt(price,10),
            title,
            description,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}