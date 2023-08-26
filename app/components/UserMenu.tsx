"use client"

import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar'
import {useState,useCallback} from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '../hooks/useRegisterModal'
import useLoginModal from '../hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import useRentModal from '../hooks/useRentModal'
import { useRouter } from 'next/navigation'



interface UserMenuProps{
    currentUser?: User | null
}

const UserMenu : React.FC<UserMenuProps>= ({
    currentUser
}) => {

    const [isOpen,setIsOpen] = useState(false)
    const toggleOpen=useCallback(()=>{
        setIsOpen((value)=>!value)
    },[])
    const RegisterModal = useRegisterModal()
    const LoginModal = useLoginModal()
    const RentModal= useRentModal()


    const router = useRouter()

    const onRent = useCallback(()=>{
        if(!currentUser){
            return LoginModal.onOpen()
        }

        //Open Rent Modal 


        RentModal.onOpen()
        
    },[LoginModal, RentModal, currentUser])


  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div 
                onClick={onRent}
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
                Add Your Home
            </div>
            <div className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md border-neutral-200 transition"
                onClick={toggleOpen}
            >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar  src={currentUser?.image} />
                </div>
            </div>
        </div>

        {isOpen && (
            <div  className='absolute rounded-xl shadow-md w-[20vw] md:x-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {
                        currentUser ? (
                            <>
                        <MenuItem 
                            label='Trips'
                            onClick={()=>router.push('/trips')}
                        />
                        <MenuItem 
                            label='Favorites'
                            onClick={()=>router.push('/favorites')}
                        />
                        <MenuItem 
                            label='Reservations'
                            onClick={()=>router.push('/reservations')}
                        />
                        <MenuItem 
                            label='Properties'
                            onClick={()=>router.push('/properties')}
                        />
                        <MenuItem 
                            label='Add Your Home'
                            onClick={RentModal.onOpen}
                        />
                        <MenuItem 
                            label='Logout'
                            onClick={()=>signOut()}
                        />
                    </>
                        ) :
                    
                    (<>
                        <MenuItem 
                            label='Login'
                            onClick={LoginModal.onOpen}
                        />
                        <MenuItem 
                            label='Sign Up'
                            onClick={RegisterModal.onOpen}
                        />
                    </>
                    )
                }
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu