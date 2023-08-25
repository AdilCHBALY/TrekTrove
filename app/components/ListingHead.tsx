"use client"

import { SafeUser } from "@/types"
import useCountry from "../hooks/useCountry"
import Heading from "./Heading"
import Image from "next/image"
import HeartButton from "./HeartButton"

interface ListingHeadProps{
    title:string
    src:string
    locationValue:string
    id:string
    currentUser:SafeUser | null | undefined
}


const ListingHead :React.FC<ListingHeadProps>= ({
    title,
    src,
    locationValue,
    id,
    currentUser,
}) => {

    const {getByValue} = useCountry()

    const location = getByValue(locationValue)

  return (
    <>
        <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
        />
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image  
                fill
                src={src}
                alt="Image"
                className="object-cover w-full"
            />
            <div className="absolute top-5 right-5">
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </>
  )
}

export default ListingHead