import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(5)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-5 my-12 bg-gradient-to-r from-gray-900 to-gray-800 text-orange-400">
  <h1 className="text-white text-center text-2xl font-bold mb-6">Password Generator</h1>

  <div className="flex shadow-inner rounded-lg overflow-hidden mb-6 bg-gray-700">
    <input
      type="text"
      value={password}
      className="outline-none w-full py-2 px-4 bg-transparent text-white placeholder-gray-400"
      placeholder="Generated password"
      readOnly
      ref={passwordRef}
    />
    <button
      onClick={copyPasswordToClipboard}
      className="outline-none bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 font-medium transition-all"
    >
      Copy
    </button>
  </div>

  <div className="flex flex-col gap-y-4">
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-x-2">
        <label className="text-white font-medium">Length:</label>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer accent-orange-500"
          onChange={(e) => setLength(e.target.value)}
        />
        <span className="text-gray-300">{length}</span>
      </div>
    </div>

    <div className="flex items-center justify-between gap-x-4">
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
          className="w-4 h-4 accent-orange-500"
        />
        <label htmlFor="numberInput" className="text-white font-medium">
          Include Numbers
        </label>
      </div>

      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={() => setCharAllowed((prev) => !prev)}
          className="w-4 h-4 accent-orange-500"
        />
        <label htmlFor="characterInput" className="text-white font-medium">
          Include Characters
        </label>
      </div>
    </div>
  </div>
</div>

    
  )
}

export default App