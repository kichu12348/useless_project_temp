import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Navigate,Route} from 'react-router-dom'
import Login from './pages/Login/login'
import Dashboard from './pages/Dashboard/dashboard'
import Home from './pages/Home/home'
import EndlessScroll from './pages/EndlessScroll/endlessScroll'
import PhilosophicalCat from './pages/PhiloCat/philoCat'
import PointlessProgressBars from './pages/progressBar/progressBar'
import SecretClick from './pages/SecretClick/secretClick'
import InvisibleMuseum from './pages/InvisibleMuseum/invisibleMuseum'
import FortuneTellerPotato from './pages/fortuneTellerPotato/fortuneTellerPotato'
import RateMyAir from './pages/RateMyAir/rateMyAir'
import StackingPaperClips from './pages/StackingPaperClips/stackingPaperClips'
import BakingAir from './pages/BakingAir/backingAir'



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/endless-scroll' element={<EndlessScroll/>} />
        <Route path='/philosophical-cat' element={<PhilosophicalCat/>} />
        <Route path='/progress-bars' element={<PointlessProgressBars/>}/>
        <Route path='invisible-history' element={<InvisibleMuseum/>}/>
        <Route path='/fortune-potato' element={<FortuneTellerPotato/>} />
        <Route path='/rate-air' element={<RateMyAir/>}/>
        <Route path='/secret-click' element={<SecretClick/>}/>
        <Route path='/stacking-paper-clips' element={<StackingPaperClips/>} />
        <Route path='/baking-air' element={<BakingAir/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
