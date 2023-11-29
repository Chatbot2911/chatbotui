'use client'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/src/sidebar/Sidebar'
import axios from 'axios'
import { headers } from 'next/dist/client/components/headers'

export default function Chat() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  // const [result, setResult] = useState('')
  const [answerArr,setAnswerArr]= useState([])
  const [questionArr,setQuestionArr]= useState([])

  async function sendQuery(event) {
    if (event.key === 'Enter') {
      if (!query) return
      setQuestionArr([...questionArr,query])
      try {
        
        let token = localStorage.getItem("token");
        token = JSON.parse(token)
        const data = {
          query
        };

        await axios.post("http://127.0.0.1:8000/ask/", data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.access}`,
          },
        })
  
       .then(response => {
          const answer= response.data.result.answer;
          setAnswerArr([...answerArr,answer])
        })
      } catch (err) {
        alert("Session Expire, Please Login Again")
        localStorage.clear();
        router.push('/');
      }
    }

  }

  return (
    <main
      className={`flex h-screen w-screen flex-col text-sm text-black dark:text-white p-4`}
    >
      <div className="flex h-full w-full pt-[48px] sm:pt-0">
        <Sidebar />
        <main className="w-10/12 p-4 bg-white rounded-3xl shadow-xl overflow-hidden ml-4 relative ">
          <div className='overflow-auto' style={{maxHeight:'83%'}}>
          {
            questionArr.length>0 ? 
            questionArr.map((qsk,index)=>{
              return(
                 <div key={index} >
                    <div className='my-2 border-3'>
                      <p className='  w-1/2' ><span className=' p-2 rounded-3xl shadow-xl'>{qsk}</span></p>
                      </div>
                    <div className=' my-2 h-full border-3 w-full flex justify-end'>
                      <p className='bg-gray-300 p-2 rounded-3xl shadow-xl w-1/2 px-5 shadow-2xl' >{answerArr[index]|| 'Wait a sec...'}</p></div>
                 </div>
                  )
            }) 
            : <h1 className='w-full absolute top-2/4 m-auto text-center font-extrabold text-4xl'>Welcome</h1>
          }
          </div>
          <div className="my-2 border mx-auto  border-[2px]  w-11/12 justify-center flex items-center rounded-md shadow-md absolute bottom-10 outline-none  bg-gray-200  m-auto">
            <div>
              <button type="submit" className="flex items-center rounded-l-md justify-center w-12 h-12 text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="w-full">
              <input type="search" x-model="input1" className="w-full h-12 px-4 py-1 rounded-r-md text-gray-800 focus:outline-none border bg-gray-200 focus:bg-white focus:border-sky-500"
                placeholder="Ask your Question ?"
                onChange={e => setQuery(e.target.value)} onKeyDown={(e) => { sendQuery(e) }} />
            </div>
          </div>

        </main>
      </div>
    </main>
  )
}
