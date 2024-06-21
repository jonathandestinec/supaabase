"use client"
import { createClient } from '@/utils/supabase/client'
import React, { FormEvent, use, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'

function page() {

  const supabase = createClient()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    const storedUser = data.user

    return storedUser

  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/auth/signup/?email=${email}&password=${password}`, { method: 'POST' })

    const response = await res.json()

    // Vheck if user has been authenticated, and send a message saying they should verify their email from the link sent to them

    console.log(response)
    // console.log(await getUser())

    if (response.error) {
      alert("An error has occurred")
    }

    alert("Signed up successfully. Now you can login")

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
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default page