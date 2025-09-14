import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ContractDetail(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(()=>{
    setLoading(true)
    fetch('/contract-details/' + id + '.json').then(r=>{
      if(r.ok) return r.json()
      // fallback: try contracts.json to synthesize
      return fetch('/contracts.json').then(res=>res.json()).then(list=>{
        const c = list.find(x=>x.id===id)
        if(!c) throw new Error('Not found')
        return {
          id: c.id, name: c.name, parties: c.parties, start: '2023-01-01', expiry: c.expiry, status: c.status, risk: c.risk,
          clauses: [{title:'Termination', summary:'90 days notice period.', confidence:0.82}],
          insights: [{risk:'Medium', message:'Auto renewal unless cancelled 60 days prior.'}],
          evidence: [{source:'Section 1.2', snippet:'Sample clause snippet', relevance:0.8}]
        }
      })
    }).then(d=>{ setData(d); setLoading(false); }).catch(e=>{ setErr('Failed to load contract details'); setLoading(false) })
  },[id])

  if(loading) return <div className="p-6">Loading...</div>
  if(err) return <div className="p-6 text-red-600">{err}</div>

  return (
    <div className="min-h-screen flex">
      <div className="w-64 hidden md:block bg-white dark:bg-slate-800 border-r p-6">
        <Link to="/" className="text-indigo-600 dark:text-indigo-300">&larr; Back</Link>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{data.name}</h1>
              <div className="text-sm text-slate-500 dark:text-slate-400">{data.parties}</div>
            </div>
            <div className="text-right text-sm">
              <div>Status: <strong>{data.status}</strong></div>
              <div>Expiry: <strong>{data.expiry}</strong></div>
              <div>Risk: <strong>{data.risk}</strong></div>
            </div>
          </div>

          <section className="mt-6">
            <h2 className="text-lg font-medium">Clauses</h2>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.clauses.map((cl,i)=>(
                <div key={i} className="p-4 border rounded bg-white dark:bg-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{cl.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-300">Confidence {(cl.confidence*100).toFixed(0)}%</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-200">{cl.summary}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-medium">AI Insights</h2>
            <ul className="mt-3 space-y-2">
              {data.insights.map((ins,i)=>(
                <li key={i} className="p-3 border rounded bg-white dark:bg-slate-700 flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium">{ins.message}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-300">Severity: {ins.risk}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="mt-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
            <h3 className="font-medium">Evidence</h3>
            <div className="mt-2 space-y-2">
              {data.evidence.map((e,i)=>(
                <div key={i} className="p-3 border rounded bg-white dark:bg-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-300">{e.source} — Relevance {(e.relevance*100).toFixed(0)}%</div>
                  <div className="mt-1 text-sm">{e.snippet}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
