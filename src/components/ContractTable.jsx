import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

function Badge({text}){
  const colors = {
    Active: 'bg-emerald-100 text-emerald-800',
    'Renewal Due': 'bg-amber-100 text-amber-800',
    Expired: 'bg-red-100 text-red-800',
    Low: 'bg-emerald-100 text-emerald-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  }
  return <span className={'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ' + (colors[text] || 'bg-slate-100')}>{text}</span>
}

export default function ContractTable(){
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [risk, setRisk] = useState('')
  const [page, setPage] = useState(1)

  useEffect(()=>{
    setLoading(true)
    fetch('/contracts.json')
      .then(res=>{ if(!res.ok) throw new Error('Failed to fetch'); return res.json() })
      .then(data=> { setContracts(data); setLoading(false) })
      .catch(e=> { setError('Failed to load contracts. Make sure /public/contracts.json exists.'); setLoading(false) })
  },[])

  const filtered = contracts.filter(c => {
    const matchesQ = (c.name + ' ' + c.parties).toLowerCase().includes(q.toLowerCase())
    const matchesStatus = status ? c.status === status : true
    const matchesRisk = risk ? c.risk === risk : true
    return matchesQ && matchesStatus && matchesRisk
  })

  const perPage = 10
  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / perPage))
  const pageData = filtered.slice((page-1)*perPage, page*perPage)

  if(loading) return <div className="p-6 bg-white dark:bg-slate-800 rounded shadow text-center">Loading contracts...</div>
  if(error) return <div className="p-6 bg-white dark:bg-slate-800 rounded shadow text-red-600">{error}</div>
  if(contracts.length === 0) return <div className="p-6 bg-white dark:bg-slate-800 rounded shadow text-center">No contracts yet</div>

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <input value={q} onChange={e=>{setQ(e.target.value); setPage(1)}} placeholder="Search by name or parties" className="px-3 py-2 border rounded w-56 bg-white dark:bg-slate-700" />
          <select value={status} onChange={e=>{setStatus(e.target.value); setPage(1)}} className="px-2 py-2 border rounded bg-white dark:bg-slate-700">
            <option value=''>All Statuses</option>
            <option>Active</option>
            <option>Expired</option>
            <option>Renewal Due</option>
          </select>
          <select value={risk} onChange={e=>{setRisk(e.target.value); setPage(1)}} className="px-2 py-2 border rounded bg-white dark:bg-slate-700">
            <option value=''>All Risks</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">Showing {filtered.length} results</div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full text-sm">
          <thead className="text-slate-500 dark:text-slate-300">
            <tr>
              <th className="text-left py-2">Contract Name</th>
              <th className="text-left py-2">Parties</th>
              <th className="text-left py-2">Expiry</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Risk</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(c=>(
              <tr key={c.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="py-3"><Link className="text-indigo-600 dark:text-indigo-300 font-medium" to={'/contracts/' + c.id}>{c.name}</Link></td>
                <td className="py-3">{c.parties}</td>
                <td className="py-3">{c.expiry}</td>
                <td className="py-3"><Badge text={c.status} /></td>
                <td className="py-3"><Badge text={c.risk} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-slate-500 dark:text-slate-400">Page {page} / {pages}</div>
        <div className="space-x-2">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 rounded border bg-white dark:bg-slate-700">Prev</button>
          <button onClick={()=>setPage(p=>Math.min(p+1,pages))} className="px-3 py-1 rounded border bg-white dark:bg-slate-700">Next</button>
        </div>
      </div>
    </div>
  )
}
