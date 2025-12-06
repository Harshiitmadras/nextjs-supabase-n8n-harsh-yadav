// pages/index.js - Login (Email/Password + Google OAuth)
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      // successful login -> redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
      if (error) throw error
      // Supabase will redirect to callback URL; when done user lands on dashboard.
    } catch (err) {
      setError(err.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="card">
        <label>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
        {error && <p className="error">{error}</p>}
        <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <div style={{marginTop:12, textAlign:'center'}}>or</div>
        <button type="button" onClick={handleGoogle} className="googleBtn">Continue with Google</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  )
}
