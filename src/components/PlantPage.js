import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const dbUrl = 'http://localhost:6001/plants';

function PlantPage() {
  //PlantList to be passed down to children for data handling
  const [plantList, setPlantList] = useState([]) // set to empty array
  const [target, setTarget ] = useState('');

  //fetch data from server
  useEffect ( () => { 
    const fetchData = async () => { //make a function inside async since effect callbacks are synchronus
      const req = await fetch(dbUrl);
      const res = await req.json();
      setPlantList(res);
    }
    fetchData();
  }, []) //run once at render


  //console.log(plantList); empty on initial load, then loads array

  return (
    <main>
      <NewPlantForm plantList={plantList} setPlantList={setPlantList} url={dbUrl}/>
      <Search onSetTarget={setTarget}/>
      <PlantList dbUrl={dbUrl} plantList={plantList} filterTarget={target}/>
    </main>
  );
}

export default PlantPage;
