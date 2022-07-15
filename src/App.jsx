import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { info } from "autoprefixer";

function App() {
  const [todoByID,  settodoByID] = useState({});

  const [inputValue, setInputValue]= useState('');

  useEffect(() => {
    (async () => {
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      ).then((res) => res.json());
      // console.info(data)
      let dataDict={};
      data.forEach(element => {

        dataDict[element.id]=element;
        
      });

      // console.info(data, dataDict);

      settodoByID(dataDict);
    })();
  }, []);

  const handleToggleChecked = (e,id)=>{
    // console.info(e.target.checked,id)

    settodoByID((previous)=>({ 
      ...previous,
      [id]:{
        ...previous[id],
        completed:e.target.checked,
      }

    }));

  }

  const handeleDeleteTodo = (id)=>{
    let newTodoByID = {...todoByID}

    delete newTodoByID[id]

    settodoByID(newTodoByID);

  }

  const handleAddTodo =(value)=>{

    const newID = Math.random();
    settodoByID((previous)=>({ 
      ...previous,
      [newID]:{
        
        id:newID,
        title:value,
        completed:false,
      }

    }));

    setInputValue('');


  }

  return (
    // <div className="min-w-screen pt-10 pb-16  min-h-screen bg-gray-400" >
      <div className=" min-w-screen flex flex-col items-center">
        <div className="w-5/6 lg:w-1/2 m-10  bg-gray-50 shadow-lg  shadow-indigo-500/40  border-solid border-2 border-gray-300">
          <div className="w-full flex flex-col items-center">
            <h1 className="my-10 font-semibold text-2xl">Things To Do</h1>
            <hr className="w-11/12 md:w-3/4 border-solid border-t-2 border-gray-300" />
            {/* Return fetched data */}
            <div className="my-5 flex flex-col w-11/12 lg:w-9/12 ">
              {
                Object.keys(todoByID).length>0 ? 
              
                Object.values(todoByID).map((item) => {
                  // console.info(item.id)

                  return (
                    <div key={item.id} className="px-5 py-3 flex items-center gap-5">
                      <input type="checkbox" className="cursor-pointer flex-none" id={`todo-item-${item.id}`} checked={item.completed} onChange={(e)=> handleToggleChecked(e,item.id)} />
                      <label className={` pb-1 w-11/12 flex-initial cursor-pointer ${item.completed ? 'line-through' : '' } `} htmlFor={`todo-item-${item.id}`} >{item.title}</label>
                      <button type="button" onClick={()=>handeleDeleteTodo(item.id)} className="text-xs text-center flex-none text-white bg-red-400  border-2 border-solid border-red-200 rounded-full pb-4 w-5 h-5 hover:bg-red-500">
                        x
                      </button>
                    </div>
                  );
                }) : <div className="text-center text-sm italic text-gray-500"> Looks like you're absolutely free today. <br /> Why not go for a walk then! </div> 
              }
            </div>
            <hr className="w-11/12 md:w-3/4 border-solid border-t-2 border-gray-300" />
            

            {/* completed tasks counter */}
            <div className="mt-10 text-lg font-semibold">Tasks completed : {Object.values(todoByID).filter((item)=> item.completed).length}</div>
            <div className=" flex mt-10 mb-20 mx-6">
              {/* input manual tasks */}
              <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className="px-4 h-10 w-3/4 md:w-80 mx-1 flex-1 border-2 border-solid border-gray-400 rounded-md" placeholder="Enter new task" name="tasktitle" id="task" />
              {/* add task button */}
              <button type="submit" onClick={()=>handleAddTodo(inputValue)} name="Delete the Note" className=" h-10 w-24 mx-1 text-sm text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out drop-shadow-xl"> ADD TASK</button>
            </div>
          </div>
        </div>
      </div>
    //  </div>
  );
}

export default App;



// onkeydown
// onkeypress
// onkeyup