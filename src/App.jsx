import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numAllowed) str += '0123456789';
    if(charAllowed) str += '!@#$%^&*()_.'

    for(let i = 0; i<length; i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassToClipBoard = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto flex flex-col justify-center items-center rounded-lg shadow-lg p-5 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center text-2xl font-semibold mb-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type ="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-gray-200 placeholder:text-orange-500'
            placeholder='Password'
            readOnly
            ref={passRef}
          />
          <button 
          className='outline-none bg-blue-700 active:bg-blue-600 text-white cursor-pointer px-3 py-0.5 shrink-0'
          onClick={copyPassToClipBoard}
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-1'>
          <div className='flex flex-wrap justify-center items-center gap-3'>
            <div className='flex justify-center items-center gap-2'>
              <input 
              type="range"
              id='passlength' 
              min={6}
              max={25}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label htmlFor='passlength'>Length: {length}</label>
            </div>
            <div className='flex gap-5'>
              <div className='flex items-center gap-x-1'>
                <input
                  type="checkbox"
                  defaultChecked={numAllowed}
                  id="numberInput"
                  onChange={() => {setNumAllowed((prev) => !prev)}}
                />
                <label htmlFor="numberInput">Numbers</label>
              </div>

              <div className='flex items-center gap-x-1'>
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="charInput"
                  onChange={() => {setCharAllowed((prev) => !prev)}}
                />
                <label htmlFor="charInput">Characters</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
