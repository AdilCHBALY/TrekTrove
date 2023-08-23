"use client"

import Select from 'react-select'
import useCountry from '../hooks/useCountry'


export type CountrySelectValue ={
    flag:string
    label:string
    latlng:number[]
    region:string
    value:string
}


interface CountrySelectProps{
    value?:CountrySelectValue
    onChange : (value:CountrySelectValue)=>void
}


const CountrySelect :React.FC<CountrySelectProps>= ({
    value,onChange
}) => {

    const {getAll} = useCountry()

  return (
    <div>
        <Select 
            placeholder="Anywhere"
            isClearable
            options={getAll()}
            value={value}
            onChange={(value: CountrySelectValue)=>onChange(value as CountrySelectValue)}
            formatOptionLabel = {(option : any)=>(
                <div className='flex flex-row items-center gap-3'>
                    <div>
                        {option.flag}
                    </div>
                    <div>
                        {option.label}, 
                        <span className='text-neutral-500 ml-1'>
                            {option.region}
                        </span>
                    </div>
                </div>
            )}
            classNames = {{
                control : ()=>'p-3 border-2',
                input: ()=>'text-lg',
                option : ()=>'text-lg'
            }}
            theme={(theme : any)=>({
                ...theme,
                borderRadius : 6 ,
                colors : {
                    ...theme.colors,
                    primary : 'black',
                    primary25 : '#2A9BFF'
                }
            })}
        />
    </div>
  )
}

export default CountrySelect