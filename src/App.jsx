import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="flex min-h-screen">
  
      
         <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={() => setSidebarOpen(false)} />
        

   
        <div className="flex-1 ml-3 h-screen overflow-y-auto bg-gray-100 dark:bg-gray-900">
       <Header openSidebarToggle={sidebarOpen} toggleSidebar={() => setSidebarOpen(prev => !prev)} />

          <main className="p-4">
            <AppRoutes />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
