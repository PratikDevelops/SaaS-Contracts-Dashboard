import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try{
      await login({username, password})
      nav('/')
    }catch(e){
      setErr(e.message)
    }finally{ setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">SaaS Contracts Dashboard</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm">Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-700" placeholder="you@company.com" />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-700" placeholder="test123" />
          </div>
          {err && <div className="text-sm text-red-600">{err}</div>}
          <button disabled={loading} className="w-full py-2 rounded-md bg-indigo-600 text-white font-medium">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Tip: Use any username and password <strong>test123</strong>.</p>
      </div>
    </div>
  )
}
