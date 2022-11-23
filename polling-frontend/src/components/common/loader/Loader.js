import { Spin } from 'antd'
import React from 'react'

export const Loader = () => {
  return (
    <div className='loader-container'>
      <Spin size='large'/>
    </div>
  )
}

