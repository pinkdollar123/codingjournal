
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State Hook - `useState`
  const [newItem, setNewItem] = useState("");
  const [newDate, setNewDate] = useState("");
  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedDate, setupdatedDate] = useState("");
  // syntax for setting up local storage of the items
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('Todos')) ? JSON.parse(localStorage.getItem('Todos')) : []);


// For Journal State Hook - 'useState
  const [newItemJournal, setNewItemJournal] = useState("");
  const [newDateJournal, setNewDateJournal] = useState("");
  const [showEditJournal, setShowEditJournal] = useState(-1);

  const [updatedTextJournal, setUpdatedTextJournal] = useState("");
  const [updatedDateJournal, setupdatedDateJournal] = useState("");

  const [itemsJournal, setItemsJournal] = useState(JSON.parse(localStorage.getItem('Journal')) ? JSON.parse(localStorage.getItem('Journal')) : []);

  // const [toggle, setToggle] = useState(true);

  // const handleClick = () => {setToggle (!toggle)};

  // Helper Functions

  /* First it checks the input field if the item is filled or not
  The creates an object variable then 
  Adds a new item to the list array
  after adding the item object to the array it will set the state to blank again
  */

  function addItem() {
    // Check for empty item
    if (!newItem && !newDate) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem, 
      date: newDate,
    };

    // Add new item to items array
    setItems((oldList) => [...oldList, item]);

    // Reset newItem back to original state after adding
    setNewItem("");
    setNewDate("");
  }

  /* Deletes an item based on the `item.id` key */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText, newDate) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
      date: newDate,
    };

    // Calls the deletion of the id
    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setupdatedDate("");
    setShowEdit(-1);
  }

  useEffect(() => {
    localStorage.setItem("Todos",JSON.stringify(items) )   
},[items]);


function addItemJournal() {
  //  Check for empty item
  if (!newItemJournal && !newDateJournal) {
    alert("Press enter an item.");
    return;
  }

  const itemJournal = {
    id: Math.floor(Math.random() * 1000),
    value: newItemJournal, 
    date: newDateJournal,
  };

  // Add new item to items array
  setItemsJournal((oldJournal) => [...oldJournal, itemJournal]);


  // Reset newItem back to original state after adding
  setNewItemJournal("");
  setNewDateJournal("");
}

/* Deletes an item based on the `item.id` key */
function deleteItemJournal(id) {
  const newArray = itemsJournal.filter((item) => item.id !== id);
  setItemsJournal(newArray);
}

/* Edit an item text after creating it. */
function editItemJournal(id, newTextJournal, newDateJournal) {
  // Get the current item
  const currentItem = itemsJournal.filter((item) => item.id === id);

  // Create a new item with same id
  const newItemJournal = {
    id: currentItem.id,
    value: newTextJournal,
    date: newDateJournal,
  };

  deleteItemJournal(id);

  // Replace item in the item list
  setItemsJournal((oldListJournal) => [...oldListJournal, newItemJournal]);
  setUpdatedTextJournal("");
  setupdatedDateJournal("");
  setShowEditJournal(-1); 
}

useEffect(() => {
  localStorage.setItem("Journal",JSON.stringify(itemsJournal) )   
},[itemsJournal]);


  // Main part of app
  return (

    <div className="container my-5">
      {/* 1. Header  */}
      <div className="row">
        <div className="col-md-6">
        <div className="card bg-info">
          <div className="card-title">
          <h1 className="text-center m-3">Todo List</h1>
          </div>
          <div className="card-body">
           <div className="card-text">
              <span className="card-text row">
              <label for='date' className="text-start ms-2 fs-5">Date:</label> 
              {/* 3. Add new Date Input */}
              <input
                className="mb-3 form-control w-50 ms-3 mt-1"
                type="date"
                value={newDate}
                onChange={(b) => setNewDate(b.target.value)}
                />
              </span>
               
              {/* 2. Add new item (input) */}
              <input
              className="form-control w-100"
              type="text"
              placeholder="Add an item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              />
        
            {/* Add (button) */}
            <button onClick={() => addItem()} className='btn btn-success fs-5 m-3'>Add To-Do</button>
            <div className="card-text">
            <h2>My To-Do's</h2>

        {/* Array mapping for each submit */}
        {/* 3. List of todos (unordered list) */}
        <ul className='list-group'>
        {items.map((item) => {
          return (
            <div>
              <li key={item.id}
              className='list-group-item text-dark border border-rounded rounded-3 m-3 fs-5 text-wrap-normal'>
                "{item.value}" <b>Date:</b> {item.date}
                <button
                  className="delete-button btn btn-danger fs-5 m-3"
                  onClick={() => deleteItem(item.id)}
                  >
                  Delete
                </button>
                <button className="btn bg-warning text-dark fs-5"
                onClick={() => setShowEdit(item.id)}>Edit
                </button>
              </li>
              {/* Shows when Edit button was clikced needs an update for Cancel Button */}
              {showEdit === item.id ? (
                <div className="card-text bg-secondary border-rounded rounded-3">
                  <input
                    className="m-3 border-rounded rounded-3"
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <input
                  className=""
                  type="date"
                  value={updatedDate}
                  onChange={(e) => setupdatedDate(e.target.value)}
                  />
                  <button  className="btn btn-primary m-3" onClick={() => editItem(item.id, updatedText,updatedDate)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
            </div>
           </div>
          </div>
        </div>
        </div>

        {/* My Journal */}
        <div className="col-md-6">
        <div className="card bg-secondary">
          <div className="card-title">
          <h1 className="text-center m-3 text-white">My Journal</h1>
          </div>
          <div className="card-body">
           <div className="card-text">
              <span className="card-text row">
              <label for='date' className="text-start text-white ms-2 fs-5">Date:</label> 
              {/* 3. Add new Date Input */}
              <input
                className="mb-3 form-control w-50 ms-3 mt-1"
                type="date"
                value={newDateJournal}
                onChange={(b) => setNewDateJournal(b.target.value)}
                />
              </span>
               
              {/* 2. Add new item (input) */}
              <textarea
              rows='2'
              cols='30'
              className="form-control w-100"
              type="text"
              placeholder="Enter journal..."
              value={newItemJournal}
              onChange={(e) => setNewItemJournal(e.target.value)}
              />
        
            {/* Add (button) */}
            <button onClick={() => addItemJournal()} className='btn btn-info fs-5 m-3'>Save Journal</button>
            <div className="card-text">
            <h2 className="text-white">Journal Entry</h2>

        {/* Array mapping for each submit */}
        {/* 3. List of todos (unordered list) */}
        <ul className='list-group'>
        {itemsJournal.map((itemJournal) => {
          return (
            <div>
              <li key={itemJournal.id}
              className='list-group-item text-dark border border-rounded rounded-3 m-3 fs-5 text-wrap-normal'>
                "{itemJournal.value}" <b>Date:</b> {itemJournal.date}
                <button
                  className="delete-button btn btn-danger fs-5 m-3"
                  onClick={() => deleteItemJournal(itemJournal.id)}
                  >
                  Delete
                </button>
                <button className="btn bg-warning text-dark fs-5"
                onClick={() => setShowEditJournal(itemJournal.id)}>Edit
                </button>
              </li>
              {/* Shows when Edit button was clikced needs an update for Cancel Button */}
              {showEditJournal === itemJournal.id ? (
                <div className="card-text bg-secondary border-rounded rounded-3">
                  <input
                    className="m-3 border-rounded rounded-3"
                    type="text"
                    value={updatedTextJournal}
                    onChange={(e) => setUpdatedTextJournal(e.target.value)}
                  />
                  <input
                  className=""
                  type="date"
                  value={updatedDateJournal}
                  onChange={(e) => setupdatedDateJournal(e.target.value)}
                  />
                  <button  className="btn btn-primary m-3" onClick={() => editItemJournal(itemJournal.id, updatedTextJournal,updatedDateJournal)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
            </div>
           </div>
          </div>
        </div>
        </div>

        
        
      </div>
    </div>
  );
}
export default App;