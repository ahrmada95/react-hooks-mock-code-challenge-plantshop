import React, { useState } from "react";

function PlantCard({url, index, img, name, price, handleDelete}) {
  const [stockStatus, setStockStatus] = useState(true);
  const [thisPrice, setThisPrice] = useState(price); //price state to rerender card when user changes price

  //handles the in stock button display
  const handleStatusClick = () => {
    setStockStatus(!stockStatus);
  }

  //handler function that posts change in DB and calls for a rerender by changing thisPrice state
  const handlePriceClick = () => {

    let newPrice = prompt('Change price:');
    if(newPrice!== ''){
      newPrice = parseFloat(newPrice);
      setThisPrice(newPrice);
      //patch shit
      fetch((url+'/'+index), {
        method: 'PATCH',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify({price: newPrice}) //dont forget your brackets
      })
    } else {
      alert('Invalid price!')
    }
  }

  const handleDeleteClick = () => {
    if(window.confirm("Do you want to delete this plant?")) {
      fetch((url+'/'+index), {
        method: 'DELETE'
      })
      console.log(index);
      handleDelete(index);
      alert(`${name} Plant has been deleted. Page will now re-render.`);
    }
    else {
      alert('Deletion cancelled')
    }
    
  }
  return (
    <li className="card">
      <img src={img} alt={name} />
      <h4>{name}</h4>
      <p title='edit me' className="cardprice" onClick={handlePriceClick}>Price: {thisPrice}</p>
      {stockStatus ? (
        <button className="primary" onClick={handleStatusClick}>In Stock</button>
      ) : (
        <button onClick={handleStatusClick}>Out of Stock</button>
      )}
      <button className="deletebtn" onClick={handleDeleteClick}>x</button>
    </li>
  );
}

export default PlantCard;


/* 
SAMPLE PLANT VALUE:
Goblin's Secret Remedy

https://static.wikia.nocookie.net/yugioh/images/f/fb/GoblinsSecretRemedy-TF04-JP-VG.jpg

0.10 
*/