import { useEffect, useState } from 'react';
import './App.css';
import mernImage from "./assets/mern.png";
import { OrderStatus } from '@/DocelCore';

function App() {
  const [count, setCount] = useState(0)

//////////////////////////////////////
//        RESPUESTA DEL BACK        //
//////////////////////////////////////

  useEffect(() => {
    fetch("http://localhost:4000/base/test")
    .then(async res => console.log(await res.text()))
    .catch(err => console.log(err));
  }, []);
  
  return <>
      <img style={{
        width: "100vw",
        height: "100vh"
      }} src={mernImage}/>
    </>
}

export default App;