import React, {useState, useRef} from 'react'
import { motion } from 'framer-motion'

export default function UploadModal({onClose}){
  const [files, setFiles] = useState([])
  const inputRef = useRef()

  function onSelect(e){
    const list = Array.from(e.target.files || e)
    const mapped = list.map(f=>({id: Math.random().toString(36).slice(2), name: f.name || f, status: 'uploading'}))
    setFiles(prev=>[...mapped, ...prev])
    mapped.forEach(simulate)
  }

  function simulate(file){
    setTimeout(()=>{
      setFiles(prev => prev.map(p=> p.id===file.id ? {...p, status: Math.random()>0.12 ? 'success' : 'error'} : p))
    }, 800 + Math.random()*1400)
  }

  function onDrop(e){
    e.preventDefault()
    const dt = e.dataTransfer
    const list = Array.from(dt.files).map(f=>f)
    onSelect({ target: { files: list } })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div initial={{scale:0.98, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Upload files</h3>
          <button onClick={onClose} className="text-sm px-2 py-1 rounded border">Close</button>
        </div>
        <div onDrop={onDrop} onDragOver={e=>e.preventDefault()} className="mt-4 p-8 border-dashed border rounded text-center bg-slate-50 dark:bg-slate-700">
          <p className="text-sm">Drag & drop files here or</p>
          <button onClick={()=>inputRef.current.click()} className="mt-3 px-3 py-2 rounded border">Browse</button>
          <input ref={inputRef} type="file" className="hidden" multiple onChange={onSelect} />
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium">Uploads</h4>
          <ul className="mt-2 space-y-2">
            {files.map(f=>(
              <li key={f.id} className="flex items-center justify-between border rounded p-2">
                <div>{f.name}</div>
                <div className="text-sm">
                  {f.status === 'uploading' && 'Uploading...'}
                  {f.status === 'success' && <span className="text-emerald-600">Success</span>}
                  {f.status === 'error' && <span className="text-red-600">Error</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
