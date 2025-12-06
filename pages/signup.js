// pages/signup.js
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name || 'Harsh Yadav' }
        }
      })
      if (error) throw error

      // Call n8n webhook (if configured)
      try {
        const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
        if (webhook) {
          await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              name: name || 'Harsh Yadav',
              supabase_user: data?.user?.id || null,
              created_at: new Date().toISOString()
            })
          })
        }
      } catch (werr) {
        console.warn('n8n webhook failed', werr)
      }

      setSuccess('Signup successful! Please check your email if using email confirm. Redirecting to login...')
      setTimeout(()=>router.push('/'), 2000)
    } catch (err) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup} className="card">
        <label>Full name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Harsh Yadav (optional)" />
        <label>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  )
}
