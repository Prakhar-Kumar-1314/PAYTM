import React from 'react'

export default function InputBox({top, placeholder}) {
  return (
    <div>
        <div className='font-bold'>
            {top}
        </div>
        <div>
            <input type="text" class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeholder}></input>
        </div>
    </div>
  )
}
