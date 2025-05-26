import React, {useEffect, useState } from 'react'
import './style.css'
import image from '../assets/todo.png'


const getLocalData = () => {
   const lists = localStorage.getItem("myList")
   if(lists){
      return JSON.parse(lists)
   }else{
      return []
   }
}
const TodoList = () => {
   const [inputdata , setInputData] = useState("")
   const [ items , setItems ] = useState(getLocalData())
   const [isEditItem , setisEditItem] = useState("")
   const [toggleButton , setToggleButton] = useState(false)
   const addItem = () =>{
      if(!inputdata){
         alert("add something")
      }else if (inputdata && toggleButton){
         setItems(
            items.map((curElem) =>{
             if (curElem.id === isEditItem ){
               return{...curElem ,name: inputdata }
             }
             return curElem
            })
         )
         setInputData("")
         setisEditItem(null)
         setToggleButton(false)
      }
      else{
         const myNewInputData ={
          id: new Date ().getTime().toString(),
          name: inputdata,
         }
         setItems([...items , myNewInputData  ])
         setInputData("")
      }
   }

   const editItem = (index) =>{
      const itemEdited = items.find((curElem) =>{
         return curElem.id === index 
      })
      setInputData(itemEdited.name)
      setisEditItem(index)
      setToggleButton(true)
   }
  // how to delete items section
  const deleteItem = (index) => {
   const updatedItems = items.filter((curElem) => {
     return curElem.id !== index;
   });
   setItems(updatedItems);
 };

//  remove all
  const removeAll = () =>{
   setItems([])
  }

  useEffect(() =>{
    localStorage.setItem("myList",JSON.stringify(items))
  },[items])



  return (
    <>
    <div className='main-div'>
       <div className='child-div'>
        <figure>
             <img src={image} alt='todologo'/> 
   

            <figcaption>Add Your List Here ✌️</figcaption>
        </figure>
        <div className='addItems'>
            <input type="text" placeholder='✍️ Add Item' 
            className='form-control'
            value = {inputdata}
            onChange = {(event) =>setInputData(event.target.value) }
            />
            {toggleButton ? 
            <i className="far fa-solid fa-edit add-btn" onClick={addItem}></i>
            :<i className="fa fa-solid fa-plus add-btn" onClick={addItem}></i>}
           
        </div>
        <div className='showItems'>
          {items.map((curElem) =>{
             return(
              <div className='eachItem' key={curElem.id}>
              <h3>{curElem.name}</h3>
              <div className='todo-btn'>
              <i className="far fa-solid fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
              <i className="far fa-solid fa-trash-alt add-btn" onClick={() =>
               deleteItem(curElem.id)}></i>
              </div>
           </div>
             )
          })}
          
        </div>
        <div className='showItems'>
            <button className='btn effect04' data-sm-link-text = "Remove All" onClick={removeAll}>
             <span>CHECK LIST</span>
            </button>
        </div>
       </div>
    </div>
    </>
  )
}

export default TodoList
