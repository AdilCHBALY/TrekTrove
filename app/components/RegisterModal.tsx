"use client"

import axios from 'axios'
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'

import {useState,useCallback} from 'react'

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '../hooks/useRegisterModal'
import Modal from './Modal'
import Heading from './Heading'
import Input from './Input'
import { toast } from 'react-hot-toast'
import Button from './Button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {

    const RegisterModal = useRegisterModal()
    const [isLoading,setIsLoading]=useState(false)

    const {
        register,handleSubmit,formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name:'',
            email:'',
            password:''
        }
    })


    const onSubmit : SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true)
        axios.post("/api/register",data).then(()=>{
            RegisterModal.onClose()
        }).catch((err)=>{
            toast.error("Something went wrong")
        })
        
        setIsLoading(false)
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to TerkTrove'
                subtitle='Create an Account'
            />
            <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Input 
                id='name'
                label='Name'
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
                        Already Have an Account ?
                    </div>
                    <div 
                    onClick={RegisterModal.onClose}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        disabled={isLoading}
        isOpen={RegisterModal.isOpen}
        title='Log in or sign up'
        actionLabel='Continue'
        onClose={RegisterModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={FooterContent}
    />
  )
}

export default RegisterModal