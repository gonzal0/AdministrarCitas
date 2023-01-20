
//Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');


let editando;


class Citas{
   constructor(){
       this.citas = [];
   }

   agregarCitas(cita){
       this.citas = [...this.citas, cita];
      // console.log(this.citas);
   }
   eliminarCita(id){
       this.citas = this.citas.filter(cita => cita.id != id);
   }
   editarCita(citaActualizada){
     this.citas = this.citas.map(  cita => cita.id === citaActualizada.id ? citaActualizada : cita)
   }
}

class UI{
   imprimirALerta(mensaje,tipo){
    //crear el div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert','d-block', 'col-12');
    
    //agregar clase en base al tipo de error
    if (tipo ==='error') {
        divMensaje.classList.add('alert-danger');
    }else{
        divMensaje.classList.add('alert-success');
    }

    //agregar mensaje de error
    divMensaje.textContent = mensaje;

    //agregar al Dooom
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    //quitar la alerta despues de 5 segundos
    setTimeout(()=>{
    divMensaje.remove();
    },5000);
   }
   imprimirCitas({citas}){
      
        this.limpiarHtml();
      
        citas.forEach(cita => {
       
        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id;

        //scripting de los elementos de la cita
        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-border');
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `
        <span class="font-weight-border">Propietario: </span> ${propietario}
        `;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `
        <span class="font-weight-border">Telefono: </span> ${telefono}
        `;
         
        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `
        <span class="font-weight-border">Fecha: </span> ${fecha}
        `;

         
        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `
        <span class="font-weight-border">Hora: </span> ${hora}
        `;
         
        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `
        <span class="font-weight-border">Sintomas: </span> ${sintomas}
        `;

        //Boton para eliminar citas
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        btnEliminar.innerHTML = `Eliminar 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
`;
        btnEliminar.onclick = () => eliminarCita(id);

        //añade el boton para editar la cita
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-info');
        btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
      `;
        btnEditar.onclick = () => cargarEdicion(cita);

        //agregar los parrafos a divcitas
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);



        //agregar las citas al html
        contenedorCitas.appendChild(divCita);
    });
   }

   limpiarHtml(){
       while (contenedorCitas.firstChild){
           contenedorCitas.removeChild(contenedorCitas.firstChild);
       }
   }
}

const ui = new UI();
const administrarCitas = new Citas();

//Registrar eventos 
EventListener();
function EventListener(e){
   mascotaInput.addEventListener('input', mostrarCitas);
   propietarioInput.addEventListener('input', mostrarCitas);
   telefonoInput.addEventListener('input', mostrarCitas);
   fechaInput.addEventListener('input', mostrarCitas);
   horaInput.addEventListener('input', mostrarCitas);
   sintomasInput.addEventListener('input', mostrarCitas);

   formulario.addEventListener('submit', nuevaCita);

}
//objeto con imformacion principal de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

} 
//Agrega datos de objetos de citas
function mostrarCitas(e) {
    citaObj[e.target.name] = e.target.value;
   // console.log(citaObj);
}
//valida y agrega una cita a la clase Citas 
function nuevaCita(e) {
   e.preventDefault();

   //extraer la imformacion del objeto citas
   const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

   //validar
   if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){ 
      // console.log("todos los campos son obligatorios");
       ui.imprimirALerta("Todos los campos son obligatorios");
       return;
   }

   if (editando){
       ui.imprimirALerta('Editado correctamente');
       
         //pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});
        
        //regresar el texto del boton a su estado original
         formulario.querySelector('button[type="submit"]').textContent='Crear cita';
         editando = false;
   }else{
        //generar un id unico
        citaObj.id = Date.now(); 

       // crear una nueva cita
       administrarCitas.agregarCitas({...citaObj});


       //mensaje de agregado correctamente
       ui.imprimirALerta('Se agrego correctamente');
        }

   //reiniciar el objeto para la validacion
   reiniciarObjeto();

   //reiniciar el formulario
   formulario.reset();

    //mostrar en el html
    ui.imprimirCitas(administrarCitas);
}

//funcion para reiniciar el objeto
function reiniciarObjeto() {
    citaObj.mascota = '',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha  = '',
    citaObj.hora  = '',
    citaObj.sintomas = ''
}
function eliminarCita(id) {
    //eliminar la cita
    administrarCitas.eliminarCita(id);

    //muestra el mensaje
 ui.imprimirALerta('La cita se elimino correctamente'); 
    
    //refresca la cita
   ui.imprimirCitas(administrarCitas);
}
//cargar los datos y el modo de edicion
function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    
    //lennar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;


    //llenar los objetos
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
     
    editando = true;
    //cambiar texto del boton
    formulario.querySelector('button[type="submit"]').textContent='guardar cambios';
}