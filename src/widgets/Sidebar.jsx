import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, FileText, BarChart2, Settings } from 'lucide-react'

export default function Sidebar({className=''}){
  const items = [
    {to: '/', label: 'Contracts', icon: Home},
    {to: '/insights', label: 'Insights', icon: FileText},
    {to: '/reports', label: 'Reports', icon: BarChart2},
    {to: '/settings', label: 'Settings', icon: Settings}
  ]
  return (
    <aside className={'w-64 bg-white dark:bg-slate-800 border-r hidden md:block ' + className}>
      <div className="p-6 h-full flex flex-col">
        <div className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Contracts</div>
        <nav className="space-y-2 flex-1">
          {items.map(i=>{
            const Icon = i.icon;
            return <NavLink key={i.to} to={i.to} className={({isActive})=> 'flex items-center gap-3 px-3 py-2 rounded ' + (isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700')}>
              <Icon className="w-4 h-4" />
              <span>{i.label}</span>
            </NavLink>
          })}
        </nav>
      </div>
    </aside>
  )
}
