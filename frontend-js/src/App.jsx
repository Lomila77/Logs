import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/style.css'
import Home from './pages/Home'
import Background from './components/Background'

function App() {

  return (
    <BrowserRouter>
      <div className='flex flex-row gap-0 h-full w-full overflow-hidden'>
        <Background componentChildren={
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        } />
      </div>
    </BrowserRouter>
  )
}

export default App
