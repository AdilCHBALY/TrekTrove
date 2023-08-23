"use client"

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps{
    title:string,
    subtitle:string;
    value:number
    onChange: (value:number)=>void
}

const Counter:React.FC<CounterProps> = ({
    title,subtitle,value,onChange
}) => {

    const onAdd = useCallback(() =>{
        onChange(value+1)
    },[onChange, value])

    const onReduce = useCallback(() =>{
        if(value === 1 ) return
        onChange(value-1)
    },[onChange, value])



  return (
    <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
            <div className="font-bold">
                {title}
            </div>
            <div className="font-light text-gray-500">
                {subtitle}
            </div>
        </div>
        <div className="flex flex-row items-center gap-4">
            <div 
               onClick={onReduce} 
            className={`
            w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-400 transition hover:border-black hover:text-black cursor-pointer
                ${value === 1 && 'cursor-not-allowed hover:text-neutral-400 hover:border-neutral-400'}

            `}>
                <AiOutlineMinus />
            </div>
            <div className="font-light text-xl text-neutral-600">
                {value}
            </div>
            <div 
               onClick={onAdd} 
            className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-400 transition hover:border-black hover:text-black cursor-pointer">
                <AiOutlinePlus />
            </div>
        </div>
    </div>
  )
}

export default Counter