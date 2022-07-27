import React, {useState} from "react";
//import { render } from "react-dom";
import PlantCard from "./PlantCard";

function PlantList({dbUrl, plantList, filterTarget}) {
  const [deleteElem, setDeleteElem] = useState(0); //id of the element in the array to be deleted

  let currList = plantList.filter((plant) => {return plant.name.toLowerCase().includes(filterTarget.toLowerCase())});

  if(deleteElem !== 0){ //if the index for the delete isn't 0, then it will trigger a change
    currList = plantList.filter((plant) => plant.id !== deleteElem); //return back array without element at indicated index
  }

  const handleDelete = (index) => { //changes the index, trigger function for rerender 
    setDeleteElem(index);
  }

  const renderPlants = (arrayPlants) => { //unnecssary function, but i wanted to try doing the logic outside of the return
    let renderArray = []
    for(let a=0; a<arrayPlants.length; a++){
      renderArray.push(<PlantCard url={dbUrl} key={a+1} index={a+1} img={arrayPlants[a].image} name={arrayPlants[a].name} price={arrayPlants[a].price} handleDelete={handleDelete}/>);
    };
    return renderArray;
  }

  return (
    <ul className="cards">{
      renderPlants(currList)
      // plantList.map((plant) => {
      //   return <PlantCard img={plant.image} name={plant.name} price={plant.price} /> {/*remember array.map expects return */ }
      // })
    }</ul>
  );
}

export default PlantList;
