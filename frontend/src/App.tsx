
import './style/style.css'
import Home from './pages/Home'
import Background from './components/Background'

function App() {

  return (
    <div className='flex flex-row gap-0 h-full w-full overflow-hidden'>
        <Background componentChildren={<Home />} />
    </div>
  )
}

export default App
