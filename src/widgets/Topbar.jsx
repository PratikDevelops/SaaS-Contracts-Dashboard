import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { Sun, Moon } from 'lucide-react'

export default function Topbar({onUpload}){
  const { user, logout } = useAuth()
  const { isDark, setIsDark, setSidebarOpen } = useUI()

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <button onClick={()=>setSidebarOpen(true)} className="md:hidden px-2 py-1 rounded border bg-white dark:bg-slate-800">Menu</button>
        <button onClick={onUpload} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm hidden sm:inline">Upload</button>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={()=>setIsDark(!isDark)} className="p-2 rounded border bg-white dark:bg-slate-800">
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="text-sm">Hello, <strong>{user?.name || 'User'}</strong></div>
        <button onClick={logout} className="text-sm px-3 py-1 rounded border">Logout</button>
      </div>
    </header>
  )
}
