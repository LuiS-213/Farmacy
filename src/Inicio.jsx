import './inicioo.css'


function Inicio({ setVista }) {
  return (
    <div className="inicio-container">
      <h1>Bienvenido a FARMACLAROTI</h1>
      <p>"MAS QUE MEDICINAS TE DAMOS CLARIDAD"</p>
      <div className="cards">
        <img src="https://i.pinimg.com/736x/35/29/ea/3529ea82e96ee26b876a7fa761319f40.jpg" alt="" /> 
      </div>
    </div>
  );
}

export default Inicio;