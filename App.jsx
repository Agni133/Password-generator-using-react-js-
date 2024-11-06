import React, { useCallback, useEffect, useRef } from 'react';
import  {useState} from 'react'
  import './index.css';
// length character and  number take all these states and give it 
function App(){

  const [length,setLength]= useState(8);      
  const [number,setNumber] =useState(false);
  const [character,setCharacter]=useState(false);
  const [password ,setPassword]= useState("");

   const passwordref = useRef(null);   
      
      const passwordgenerator = useCallback(()=>{
          let pass=""
          let str ="ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnopqerstuvwxyz";
        
          if(number) str+="0123456789"
          if(character) str+="!@#$%^&*()_+{}`~"; 
         
          for(let i= 1;i<=length;i++){
          
            let char = Math.floor(Math.random() *str.length+1);
            
            pass += str.charAt(char)
  
          }
          setPassword(pass);
      },[length,number,character])
      
     useEffect(()=>{

        passwordgenerator();

     },[length,number,character,passwordgenerator])

     const passCopy = useCallback(()=>{
          passwordref.current?.select();
          passwordref.current?.setSelectionRange(0,2)
      window.navigator.clipboard.writeText(password);
         
     },[password])
     
  return(   
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4  my-8 text-orange-500 bg-gray-700'>
          <h1 className='text-white text-center my-3'>Password generator </h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>

       <input type="text"
       
         value={password}     
         className='outline-none w-full py-1 px-3'
         placeholder='password'
           readOnly
           ref={passwordref}
       />
      
      <button onClick={passCopy}
        
        style={{backgroundColor: passwordref ? '#4CAF50' : '#008CBA',}}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

     </div>
      
      <div className='flex text-sm gap-x-2'>
   
      <div className='flex items-center gap-x-1'>

        <input type="range"    
            
            min={6}
           
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{setLength(e.target.value);}}
            />
            <label>Length: {length}</label>
      </div>
         <div className='flex items-center gap-x-1'> 
          <input type="checkbox"
            defaultChecked= {number}
            id="numberinput"
             onChange={()=>{
               setNumber((prev)=> !prev);
             }}
            />
            <label>Numbers</label>
         </div>
         <div className='flex items-center gap-x-1'>
        <input type="checkbox"
           defaultChecked= {number}
           id="numberinput"
            onChange={()=>{
              setNumber((prev)=> !prev);
            }}
        />
        <label>Characters</label>
         </div>
      </div>
    </div>
  
  )
}

export default App;
