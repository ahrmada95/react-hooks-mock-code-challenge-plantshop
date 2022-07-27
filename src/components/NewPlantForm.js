import React from "react";

function NewPlantForm({plantList, setPlantList, url}) {

  const handleAdd = (event) => {
    event.preventDefault();
    const newPlant = {
      id: plantList.length + 1,
      name: event.target['name'].value, 
      image: event.target['image'].value,
      price: parseFloat(event.target['price'].value),  
    }
    
    setPlantList([...plantList, newPlant]); //we change state from parent's prop, so it triggers render

    //post shit
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(newPlant)
    })

    console.log('Way after:', plantList);
    event.target['name'].value = '';
    event.target['image'].value = '';
    event.target['price'].value = '';
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleAdd}>
        <input type="text" name="name" placeholder="Plant name" />
        <input type="text" name="image" placeholder="Image URL" />
        <input type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
