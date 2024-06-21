"use client"
import { createClient } from '@/utils/supabase/client'
import React, { FormEvent } from 'react'
import { redirect } from 'next/navigation'
import { getuid } from 'process'

function page() {

  const supabase = createClient()

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/auth/login?email=${email}&password=${password}`, { method: 'POST' })

    const response = await res.json()

    console.log(response)

    if (response.error) {
      alert('Invalid email or password')
    } else {
      console.log(await getUser())
      alert("login successful. Now go to the home page")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className=' bg-transparent ring-1 ring-white text-white font-mono' type="email" name="email" placeholder="Email" onChange={(e) => {
          setEmail(e.target.value)
        }} required={true} />
        <input className=' bg-transparent ring-1 ring-white text-white font-mono' type="password" name="password" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value)
        }} required={true} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default page