import React from 'react'
import {createClient} from '@/utils/supabase/server'
import HomePage from './components/HomePage'
import { redirect } from 'next/navigation'

async function page() {

  const supabase = createClient()

  // Check if user is logged in
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    return <HomePage />
  }

  // Redirect to login page
  redirect("/login")
}

export default page