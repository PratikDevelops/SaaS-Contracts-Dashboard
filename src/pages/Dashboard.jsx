import React, {useState} from 'react'
import Sidebar from '../widgets/Sidebar'
import Topbar from '../widgets/Topbar'
import ContractTable from '../components/ContractTable'
import UploadModal from '../components/UploadModal'
import { useUI } from '../context/UIContext'
import { motion } from 'framer-motion'

export default function Dashboard(){
  const [openUpload, setOpenUpload] = useState(false)
  const { sidebarOpen, setSidebarOpen } = useUI()

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      {/* mobile slide-over */}
      {sidebarOpen && <div className="fixed inset-0 z-40 md:hidden">
        <motion.div initial={{x:-300}} animate={{x:0}} className="w-64 bg-white dark:bg-slate-800 h-full p-4 shadow">
          <Sidebar />
          <div className="p-4"><button onClick={()=>setSidebarOpen(false)} className="px-3 py-2 rounded border">Close</button></div>
        </motion.div>
        <div onClick={()=>setSidebarOpen(false)} className="fixed inset-0 bg-black/20"></div>
      </div>}

      <div className="flex-1 flex flex-col">
        <Topbar onUpload={()=>setOpenUpload(true)} />
        <main className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Contracts</h2>
            <ContractTable />
          </div>
        </main>
      </div>
      {openUpload && <UploadModal onClose={()=>setOpenUpload(false)} />}
    </div>
  )
}
