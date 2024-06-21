"use client"
import React, { use, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Suspense } from 'react'

function HomePage() {
  const supabase = createClient()

  const [user, setUser] = useState("{}")

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      setUser(JSON.stringify(user))

    }

    getUser()
  }, [])

  console.log(user)

  if (user === "{}") {
    return <h1 className=' font-mono text-3xl text-center'>Loading... 🚀</h1>
  } else {
    return (
      <div>
        <h1 className=' text-3xl font-mono text-lime-400 text-center'>Home Page: Logged in</h1>
        <p className=' font-mono text-2xl text-center mt-20'>Welcome to the home page, <span className=' text-lime-400 underline'>{JSON.parse(user).email}</span></p>
        <p className=' font-mono text-center mt-10'>Here are your info</p>
        <p className=' font-mono text-center'><span className=' text-lime-400'>id:</span> {JSON.parse(user).id}</p>
        <p className=' font-mono text-center'><span className=' text-lime-400'>role:</span> {JSON.parse(user).role}</p>

        <p className=' mt-10 font-mono text-center'>Still have to find a way to redirect te user automatically to the required pages</p>

        <p className=' mt-10 font-mono text-center'>Next up, learn about db query and usage </p>
      </div>
    )
  }
}

export default HomePage