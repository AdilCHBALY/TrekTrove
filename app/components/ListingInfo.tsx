"use client"

import { SafeUser } from "@/types"
import { IconType } from "react-icons"
import useCountry from "../hooks/useCountry"
import Avatar from "./Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

const Map = dynamic(()=> import("./Map"),{
    ssr:false,
})

interface ListingInfoProps{
    user:SafeUser | null
    category : {
        icon : IconType,
        label :string
        description :string
    } | null
    description : string
    roomCount : number
    bathroomCount : number
    guestCount : number
    locationValue : string
}



export const ListingInfo :React.FC<ListingInfoProps>= ({
    user,
    category,
    description,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue
}) => {

    const {getByValue} = useCountry()

    const coords=getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>Hosted By {user?.name}</div>
                <Avatar
                    src={user?.image}
                />
            </div>
            <div className="flex flex-row items-center font-light gap-4 text-neutral-500">
                <div>{roomCount} Rooms</div>
                <div>{guestCount} Guest</div>
                <div>{bathroomCount} BathRoom</div>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory 
                icon = {category.icon}
                label = {category.label}
                description = {category.description}
            />
        )}

        <hr />

        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>

        <hr />
        
        <Map 
            center={coords}
        />

    </div>
  )
}
