import { useState } from 'react'
import Menu from './Menus'
import Body from './Body'
import Header from './Encabezado'
import './App.css'


function App() {
  const[menu,setMenu]=useState(false);
  const [vista, setVista]= useState("Inicio")
  return(
    <div className='Main'>
      <Header Open={()=>setMenu(true)}/>
      <Menu 
        abierto={menu} 
        cambiarVista={(v) => { 
            setVista(v); 
            setMenu(false);
        }} 
      />
      <Body vista={vista}/>
    </div>
  )
}

export default App
