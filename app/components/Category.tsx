"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import qs from 'query-string'

interface CategoryProps{
    label : string,
    icon : IconType
    Selected?: boolean
}

const Category:React.FC<CategoryProps> = ({
    icon : Icon,label,Selected
}) => {

    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(()=>{
        let currentQuery = {}

        if(params){
            currentQuery = qs.parse(params.toString())
        }

        const updateQUery : any = {
            ...currentQuery,
            category:label 
        }

        if(params?.get('category')===label){
            delete updateQUery.category
        }

        const url = qs.stringifyUrl({
            url: '/',
            query : updateQUery
        },{
            skipNull : true
        })

        router.push(url)
    },[label, params, router])

    return (
        <div 
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 text-neutral-500 hover:text-neutral-800 transition cursor-pointer
        ${Selected ? 'border-b-neutral-800':'border-transparent'}
        ${Selected ? 'text-neutral-800':'border-neutral-500'}
        `}>
            <Icon size={25}/>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}

export default Category