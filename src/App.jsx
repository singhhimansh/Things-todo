import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [todolist, settodolist]=useState([])

  useEffect(()=>{
    ( async () => { 
      const data = await fetch('https://jsonplaceholder.typicode.com/users/1/todos').then(res=> res.json());
      // console.info(data)
      settodolist(data);

    })()

    

  }, [])


  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className='w-full flex flex-col items-center'>
        <h1 className='flex my-10 font-semibold text-2xl'>
          TODO APP
        </h1>
        <div className="my-5 flex flex-col">
          {todolist.map((item) => {
            // console.info(item.id)

              return(
              
              <div key={item.id} className='px-5 py-3 flex gap-5'>
              <input type='checkbox' checked={item.completed} /><div>
               {item.title}
               </div>
               <button className=' border-2 border-solid border-red-200 p-1 w-8 h-8'>x</button>
               
              </div>
              )

            } )
          
          }
        </div>

      </div>
    </div>
  );
}

export default App;
