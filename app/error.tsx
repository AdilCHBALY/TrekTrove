"use client"

import { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorProps{
    error:Error
}


const error:React.FC<ErrorProps> = ({
    error
}) => {

  return (
    <EmptyState 
        title="Opps :("
        subtitle="Something Went Wrong"
    />
  )
}

export default error