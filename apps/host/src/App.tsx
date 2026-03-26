import { useState } from 'react'
import { ENVIROMENT } from "@/config/constants.ts"
import './App.css'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState<number>(0)

  const handleClick = () => {
    setCount((prev) => prev + 1)
  }

  return (
    <>
  <div className="flex min-h-svh flex-col items-center justify-center">
    <p>Environment: {ENVIROMENT}</p>
    <p>Clicks: {count}</p>
      <Button onClick={handleClick}>Click me</Button>
    </div>
    </>
  )
}

export default App
