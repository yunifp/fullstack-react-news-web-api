import { useEffect, useState } from 'react'
import React from 'react'
import { auth, database } from '../firebase/setup'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Comments = (props) => {

  const [comments, setComments] = useState("")
  const [newsComments, setNewsComments] = useState([])

  const addComments = async () => {
    const newsDoc = doc(database, "News", `${props.url.substr(-10, 10)}`)
    const commentsRef = collection(newsDoc, "Comments")
    if (!auth.currentUser) {
      toast.warning("Login Dulu Boss")
      return; 
  }
    try {
      auth.currentUser && await addDoc(commentsRef, {
        comments: comments,
        name: auth.currentUser.displayName,
        profileImg: auth.currentUser.photoURL
      })
    } catch (err) {
      console.log(err)
    }

  }

  const showComments = async () => {
    const newsDoc = doc(database, "News", `${props.url.substr(-10, 10)}`)
    const commentsRef = collection(newsDoc, "Comments")
    try {
      const data = await getDocs(commentsRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setNewsComments(filteredData)
    } catch (err) {
      console.error(err)
    }

  }

  useEffect(() => {
    showComments()
  }, [newsComments])
  return (
    <div className='grid grid-rows'>
      <div className='p-5'>
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Komentar</label>
        <div className='flex'>
          <input onChange={(e) => setComments(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hujat" required />
          <button onClick={addComments} class="bg-black ml-2 hover:bg-gray-800 text-sm text-white font-bold py-2 px-4 rounded">
            Add 
          </button>
        </div>
      </div>
      <div className='p-5 h-2'>
        {newsComments.map((data) => {
          return <>
            <div className='flex items-center'>
              <img src={data.profileImg} className='rounded-full w-5 h-5' />
              <h4 className='font-semibold  ml-2 text-sm text-slate-500'>{data.name}</h4>
            </div>
              <h6 className='ml-7 mb-2'>{data.comments}</h6>
          </>
        })}
      </div>
      <ToastContainer autoClose={3000}/>
    </div>

  )
}

export default Comments
