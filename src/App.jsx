import { useState, useCallback, useEffect, useRef } from "react"


function App() {
  
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charactersAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charactersAllowed) str+= "~!@#$%^&*(){}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length, numberAllowed, charactersAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  },
  [length,numberAllowed,charactersAllowed,passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3) // for selection in range
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center"> Password generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text" className="outline-none w-full py-1 px-3"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
             />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 w-14 active:bg-blue-300 active:w-16"
          onClick={copyPasswordToClipboard}>copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
                <input 
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
              onChange={(e) =>{
                setLength(e.target.value)
              }}
                />
              <label > Length : {length} </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberAllowed"
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }} />
              <label htmlFor="numberAllowed">Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"
              defaultChecked={charactersAllowed}
              id="charAllowed"
              onChange={()=>{
                setCharacterAllowed((prev)=>!prev)
              }} />
              <label htmlFor="charAllowed">Character</label>
            </div>
          </div>

      </div>
    </>
  )
}

export default App
