'use client'

import React from 'react'

const NodeConfigurationDialog = () => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-4'>
        <h2 className='text-2xl font-bold'>Node Configuration</h2>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            className='border border-gray-300 rounded-md p-2'
          />
        </div>
      </div>
    </div>
  )
}

export default NodeConfigurationDialog
