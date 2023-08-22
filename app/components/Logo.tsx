"use client"

import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()

  return (
    <div className="hidden md:block cursor-pointer font-semibold text-3xl text-[#003c71]">
        TrekTrove
    </div>
  )
}

export default Logo