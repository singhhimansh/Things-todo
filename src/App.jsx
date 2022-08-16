
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { SiAddthis } from "react-icons/si";

function App() {
  // hook to fetch from API
  const [todoByID,  settodoByID] = useState({});

  // hook for custom task inserted
  const [inputValue, setInputValue]= useState('');

  // hook for alert message if input is too small
  const [alert, setAlert] = useState(false);


  // API call and fetching data in to a dict
  useEffect(() => {
    (async () => {
      const data = await fetch(
        "https://singhhimansh.github.io/Json-API/api/todo.json"
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
    value=value.trim();
    if (value.length > 2) {
      setAlert(false);
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

    else {
      setAlert(true)
    }

  }

  return (

      <div className=" min-w-screen min-h-screen flex flex-col justify-center items-center bg-teal-100 ">
        <div className="w-[95%] lg:w-1/2 m-10  bg-gray-50/90  shadow-teal-400/60  border-solid border-2 shadow-xl border-gray-300 rounded-md  ">
          <div className="w-full mb-20 flex flex-col items-center ">
            <h1 className="my-10 font-bold text-gray-800/90 text-2xl">Things To Do</h1>
            <hr className="w-11/12 md:w-3/4 border-solid border-t-2 border-gray-300" />
            {/* Return fetched data */}
            <div className="my-5 flex flex-col w-11/12 lg:w-9/12 drop-shadow-lg ">
              {
                Object.keys(todoByID).length>0 ? 
              
                Object.values(todoByID).map((item) => {
                  // console.info(item.id)

                  return (
                    <div key={item.id} className="px-5 py-3 flex items-center gap-5">
                      <input type="checkbox" className={`cursor-pointer flex-none accent-red-400 ${item.completed ? 'opacity-70' : '' } `} id={`todo-item-${item.id}`} checked={item.completed} onChange={(e)=> handleToggleChecked(e,item.id)} />

                      <label title="Mark it complete" className={` pb-1 w-11/12 flex-initial hover:text-red-500 cursor-pointer ${item.completed ? 'line-through text-red-500 opacity-60' : '' } `} htmlFor={`todo-item-${item.id}`} >{item.title}</label>
                      
                      <button type="button" title="Delete task" onClick={()=>handeleDeleteTodo(item.id)} className="w-6 h-7">
                        <MdDeleteForever className=" fill-red-500 "/>
                      </button>
                      
                    </div>
                  );
                }) : <div className="text-center text-sm italic text-gray-500"> Looks like you're absolutely free today. <br /> Why not go for a walk then! </div> 
              }
            </div>
            <hr className="w-11/12 md:w-3/4 border-solid border-t-2 border-gray-300" />
            

            {/* completed tasks counter */}
            <div className="mt-10 text-lg font-semibold ">Tasks completed : {Object.values(todoByID).filter((item)=> item.completed).length}</div>

            <div className={`w-5/6 md:w-4/6 relative flex mt-10  mx-6 gap-1 md:gap-2 ${ alert ? "before:content-['*Minimum_three_characters_allowed'] before:text-red-400 before:text-xs before:absolute before:-bottom-5 before:left-3" : "" }`}>
              
              {/* input manual tasks */}
              <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className=" relative px-4 h-10 w-3/4 md:w-80 mx-1 flex-1 border-2 border-gray-400 focus:outline-green-400  rounded-md " placeholder="Enter new task" name="tasktitle" id="task" />

              {/* add task button */}
              <button type="submit" onClick={()=>handleAddTodo(inputValue)} name="Add a Note" className=" "><SiAddthis title="Add task"  className="w-9 h-9 fill-green-600 hover:fill-green-500 hover:shadow-lg focus:shadow-lg active:fill-green-700  transition duration-150 ease-in-out drop-shadow-xl" /></button>
                
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;



// onkeydown
// onkeypress
// onkeyup