import React from 'react'
import { useState, useEffect } from 'react';

function Demo() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Select an option");

    const [name,setName]= useState("");
    const [data,setData]= useState("");
    const [submiteddata,setSubmitdata]= useState("");

    const Handlechange= (e)=>{
        setSubmitdata(e.target.value)
        setData("")
    }

    const HandleSubmit= (e)=>{
        setData(submiteddata);
    }

    const options = ["Option 1", "Option 2", "Option 3"];
    return (
        <>
            <div className='grid grid-rows-4 grid-flow-col gap-5 m-10 border-2 border-black'>
                <div className='bg-red-500 text-3xl py-4 row-span-2'>Hello 1</div>
                <div className='bg-red-500 text-3xl py-4 row-span-2'>Hello 2</div>
                <div className='bg-red-500 text-3xl py-4 row-span-4'>Hello 3</div>
                <div className='bg-red-500 text-3xl py-4'>Hello 4</div>
                <div className='bg-red-500 text-3xl py-4'>Hello 5</div>
                <div className='bg-red-500 text-3xl py-4'>Hello 6</div>
                <div className='bg-red-500 text-3xl py-4'>Hello 7</div>
                <div className='bg-red-500 text-3xl py-4'>Hello 8</div>
            </div>

            <div className='flex justify-start items-center border-2 border-black mb-10 h-48'>
                <input type="text" placeholder='Enter here' className='border-2 border-black rounded-lg h-10 mx-10' onChange={Handlechange} />  
                <button className='border-2 border-black bg-gray-600 p-1 rounded-3xl h-10' onClick={HandleSubmit} >Submit Here</button>
                <div className='border-2 border-black h-20 w-56 mx-10 text-center font-semibold text-red-600 bg-blue-100'>
                    {data}
                    </div>
            </div>

            <div className='flex justify-evenly h-96'>
                <select name="" id="" className='border-2 border-blue-800 rounded-lg h-10 bg-blue-100' onChange={(e)=>setName(e.target.value)}>
                <option value="">Select an option</option>
                <option value="abhinav" className='text-blue-600 bg-blue-100'> abhinav</option>
                <option value="raghav" className='text-blue-600 bg-blue-100'> Raghav</option>
                <option value="puneet" className='text-blue-600 bg-blue-100'> puneet</option>
                </select>
                
                <div className='border-2 border-black'>
                    <h1 className='text-center'>Selected name</h1>
                    <div className='border-2 border-black h-20 w-56 mt-5 text-center'>
                    {name}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Demo
