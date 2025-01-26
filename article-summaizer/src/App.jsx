import React, { useState } from 'react'
import axios from "axios"

function App() {
  const [url, setUrl] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleURL = e => {
    setUrl(e.target.value)
  }

  const handleArticleSummary = async (e) => {
    e.preventDefault()
    setLoading(true)

    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: `${url}`,
        lang: 'en',
        engine: '2'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': '4218e772d8mshd3036d10d2f0012p1a8adbjsnbdbc9d7a30a6',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setLoading(false)
      setResponse(response.data.summary)
    } catch (error) {
      setLoading(false)
      alert("Please try again!")
    }
  }

  // console.log(url)

  return (
    <div
      className='h-screen w-screen bg-slate-400 flex items-center justify-center'
    >
      <div className='flex items-center justify-center flex-col gap-y-5'>
        <div className='flex items-center justify-center gap-x-2' onChange={handleURL}>
          <input type="url" className='h-10 border-black outline-none rounded-lg px-3 w-96'/>
          <button className='h-10 px-2 bg-black text-white rounded-lg' onClick={handleArticleSummary}>
            {
              loading ? "Wait loading!" : "Summarize"
            }
          </button>
        </div>
        <p className=' w-[600px] h-80'>
          {
            loading ? "" : response
          }
        </p>
      </div>
    </div>
  )
}

export default App
