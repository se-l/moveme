import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppCtx } from './AppCtx.tsx'
import Deals from './components/Deals/Deals.tsx'
import Mappings from './components/Mappings/Mappings.tsx'
import { Box} from '@mui/material'
import { SnackbarProvider } from 'notistack'
import Layout from './components/Layout/Layout.tsx'
import Analytics from './components/Analytics/Analytics.tsx'
import { ReadOnlyVFSBrowser } from './components/VFSReadOnly.tsx'


function App() {

  return (
    <AppCtx.Provider value={AppCtx}>
      <SnackbarProvider>
        <BrowserRouter>
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Layout />

            <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh)', width: '100vw', marginTop: '94px' }}>

              <Routes>
                <Route path="/" element={<Deals setGridRef={(grid: any) => null} />} />
                <Route path="/deals" element={<Deals setGridRef={(grid: any) => null} />} />
                <Route path="/mappings" element={<Mappings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/ftpbrowser" element={<ReadOnlyVFSBrowser instanceId="sdf" />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </SnackbarProvider>
    </AppCtx.Provider>
  )
}

export default App
