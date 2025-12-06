// pages/dashboard.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    let mounted = true
    async function load() {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        setUser(null)
        router.push('/') // redirect to login
      } else {
        if (mounted) setUser(data.user)
      }
      setLoading(false)
    }
    load()
    return ()=> { mounted = false }
  }, [router])

  async function handleLogout(){
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <div className="container"><p>Loading...</p></div>

  // Show "Welcome, Harsh Yadav" explicitly
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="card">
        <h2>Welcome, Harsh Yadav</h2>
        <p>You are logged in{user?.email ? ` as ${user.email}` : ''}.</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  )
}
