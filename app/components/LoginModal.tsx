"use client"

import {signIn} from 'next-auth/react'
import axios from 'axios'
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'

import {useState,useCallback} from 'react'

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import Modal from './Modal'
import Heading from './Heading'
import Input from './Input'
import { toast } from 'react-hot-toast'
import Button from './Button'
import useLoginModal from '../hooks/useLoginModal'
import useRegisterModal from '../hooks/useRegisterModal'
import { useRouter } from 'next/navigation'

const LoginModal = () => {

    const LoginModal = useLoginModal()
    const RegisterModal = useRegisterModal()
    const [isLoading,setIsLoading]=useState(false)
    const router = useRouter()

    const {
        register,handleSubmit,formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues : {
            email:'',
            password:''
        }
    })


    const onSubmit : SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true)
        signIn('credentials',{
            ...data,
            redirect:false
        }).then((cb)=>{
            setIsLoading(false)

            if(cb?.ok){
                toast.success("Logged in")
                router.refresh()
                LoginModal.onClose()
            }

            if(cb?.error){
                toast.error(cb.error)
            }
        })
    }


    const toggle = useCallback(()=>{
        LoginModal.onClose()
        RegisterModal.onOpen()
    },[LoginModal, RegisterModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome back'
                subtitle='Login to your Account'
            />
            <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Input 
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
            />     
        </div>
    )

    const FooterContent =(
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue With Google'
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Button
                outline
                label='Continue With Github'
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex justify-center flex-row items-center gap-2'>
                    <div>
                        Dont have an Account ?
                    </div>
                    <div 
                    onClick={toggle}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                        Sign up
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        disabled={isLoading}
        isOpen={LoginModal.isOpen}
        title='Log in or sign up'
        actionLabel='Continue'
        onClose={LoginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={FooterContent}
    />
  )
}

export default LoginModal