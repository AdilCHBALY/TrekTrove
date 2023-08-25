"use client"

import { useMemo, useState } from "react"
import useRentModal from "../hooks/useRentModal"
import Modal from "./Modal"
import Heading from "./Heading"
import { categories } from "./Categories"
import CategoryInput from "./CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "./CountrySelect"
import dynamic from "next/dynamic"
import Counter from "./Counter"
import ImageUpload from "./ImageUpload"
import Input from "./Input"
import axios from "axios"
import { toast } from "react-hot-toast"
import {useRouter} from 'next/navigation'



// ? This is Steps from which The RentModal will be created
enum STEPS {
    CATEGORY = 0 ,
    LOCATION = 1 ,
    INFO = 2 ,
    IMAGES = 3 ,
    DESCRIPTION = 4 ,
    PRICE = 5 
}

const RentModal = () => {
    const rentModal = useRentModal()
    const router = useRouter()
    // ? Initializing the modal With the First Step AKA : Category Step 

    const [step,setStep]= useState(0)
    const [isLoading,setIsLoading] = useState(false)

    const {register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        },reset} = useForm<FieldValues>({
            defaultValues: {
                category:'',
                locationValue : null,
                guestCount : 1,
                roomCount : 1,
                bathroomCount : 1,
                imageSrc: '',
                price : 50 ,
                title : '',
                description : ''
            },
        })

    const categoryName = watch('category')
    const locationName = watch('locationValue')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(()=>dynamic(()=> import('./Map') , {
        ssr: false,
        
    }),[locationName])

    const setCustomValue = (id:string,value:any)=>{
        setValue(id,value,{
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate : true,
        })
    }


    // ? Initializing the modal With Function that will change from step to Step 

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        if(step !== STEPS.PRICE){
            return onNext()
        }

        setIsLoading(true)

        axios.post('/api/listings',data).then(()=>{
            toast.success("Listing Created Successfully")
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        }).catch((error)=>{
            toast.error("Something went wrong")
        }).finally(()=>{
            setIsLoading(false)
        })
    }


    const onBack = ()=>{
        setStep((value)=>value-1)
    } 

    const onNext = ()=>{
        setStep((value)=>value+1)
    }


    // ? Action Label 

    const actionLabel = useMemo(()=>{
        if(step === STEPS.PRICE){
            return 'Create'
        }

        return 'Next'
    },[step])


    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return  undefined
        }

        return 'Back'
    },[step])


    let bodyContent = (
        <div className="flex flex-col gap-8">
             <Heading 
                title="Which of these best describes your place ? "
                subtitle="Pick a Category"
             />   
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((category) =>(
                    <div key={category.label}>
                        <CategoryInput 
                            onClick={(categoryName)=>setCustomValue('category',categoryName)}
                            selected = {categoryName === category.label}
                            label = {category.label}
                            icon = {category.icon}
                        />
                    </div>
                ))}
             </div>
        </div>
    )
    

    if(step == STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Where's your place located?"
                    subtitle="Your address is only shared with guests after they’ve made a reservation."
                />
                <CountrySelect
                    onChange={(value)=>setCustomValue('locationValue', value)}
                    value={locationName}
                />
                <Map
                    center={locationName?.latlng}
                />
            </div>
        )
    }


    if(step==STEPS.INFO) {
        bodyContent= (
            <div className="flex flex-col gap-4">
                <Heading 
                    title="Share some basics about your place"
                    subtitle="You'll add more details later, like bed types."
                />

                <Counter
                    title="Guests"
                    subtitle="How Many Guests do you allow ?"
                    value={guestCount}
                    onChange={(value)=>setCustomValue('guestCount',value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How Many Rooms do you have ?"
                    value={roomCount}
                    onChange={(value)=>setCustomValue('roomCount',value)}
                />
                <hr />
                <Counter
                    title="BathRooms"
                    subtitle="How Many BathRooms do you have ?"
                    value={bathroomCount}
                    onChange={(value)=>setCustomValue('bathroomCount',value)}
                />
                <hr />
            </div>
        )



    }



    if(step == STEPS.IMAGES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add some photos of your casa particular"
                    subtitle="You'll need 5 photos to get started. You can add more or make changes later."
                />

                <ImageUpload 
                    value={imageSrc}
                    onChange={(value)=>setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if(step == STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Next, let's describe your casa particular"
                    subtitle="Share what makes your place special."
                />

                <Input
                    id='title'
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id='description'
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }


    if(step == STEPS.PRICE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Now, set your price"
                    subtitle="You can change it anytime."
                />

                <Input 
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal 
            title="Add You Home"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryLabel={secondaryActionLabel}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            //@ts-ignore
            body={bodyContent}
            isOpen={rentModal.isOpen}
        />
    )
}

export default RentModal