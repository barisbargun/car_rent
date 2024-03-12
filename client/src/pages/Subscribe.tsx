import { Button, Input, Label } from '@/components/ui'
import React from 'react'

const Subscribe = () => {
  return (
    <div className='flex-center flex-col px-6 py-14 w-full gap-6 bg-black z-10'>
      <h2 className='font-bold text-3xl uppercase text-center tracking-wide text-white'>subscribe to<br/>get discounts</h2>
      <div className='flex-center gap-4 flex-wrap'>
        <Label htmlFor='subscribeInput' className='sr-only'>Enter your email</Label>
        <Input id='subscribeInput' type='text' 
        placeholder='Enjoy a monthly discount of at least 10%' className='w-80 max-w-[90%] bg-white text-black rounded-none'/>
        <Button className='rounded-none'>Send</Button>
      </div>
    </div>
  )
}

export default Subscribe