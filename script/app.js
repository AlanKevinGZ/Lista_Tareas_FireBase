let listar=document.querySelector('.coleccion');
let agregarTarea=document.querySelector('#agregarTarea');
let updateId=null;
let newTask='';
let cat='';
let updateBtn=document.querySelector('#updateBtn');


db.collection('tareas').orderBy('titulo').onSnapshot(snapshot => {
       
        let cambios = snapshot.docChanges();
      
        cambios.forEach(cambio => {
            if (cambio.type==='added') {
              obtenerDatos(cambio.doc);
               
            }else if (cambio.type == 'removed') {
                
                console.log('Eliminado');
            } else if (cambio.type == 'modified') {
                
            }
        });
    });

    function obtenerDatos(datos) {
       
        /* lista */
        let li=document.createElement('li');
        li.classList.add('listar');
        li.setAttribute('data-id',datos.id)

        /* span */
        let span=document.createElement('span');
        span.textContent=datos.data().titulo;


        /* iconos */
        let divIconos=document.createElement('div');
        divIconos.classList.add('iconos');

        /* editar */
        let divEdit=document.createElement('div');
        divEdit.classList.add('edit');

        let btnEdit=document.createElement('a');
        btnEdit.href="#modal1";
        btnEdit.className='modal-trigger';

        let iconoEdit=document.createElement('i');
        iconoEdit.className='fas fa-edit';


        /* eliminar */
        let divDelte=document.createElement('div');
        divDelte.classList.add('delete');

        let iconoDelete=document.createElement('i');
        iconoDelete.className='fas fa-trash-alt';


        btnEdit.appendChild(iconoEdit);
       divEdit.appendChild(btnEdit);

       divDelte.appendChild(iconoDelete);

       
      divIconos.appendChild(divDelte);
      divIconos.appendChild(divEdit);

      li.appendChild(span);
      li.appendChild(divIconos);

      listar.appendChild(li)
      
      
      iconoDelete.addEventListener('click',(e)=>{
          let id=e.target.parentElement.parentElement.parentElement.getAttribute('data-id');

          db.collection('tareas').doc(id).delete();
          let res=e.target.parentElement.parentElement.parentElement;
          listar.removeChild (res) 
      })


      iconoEdit.addEventListener('click',(e)=>{
          let txtTarea=document.querySelector('#txtTarea');
         
          updateId=e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
          let contenido=e.target.parentElement.parentElement.parentElement.parentElement.textContent
           txtTarea.value=contenido; 
        cat=e.target.parentElement.parentElement.parentElement.parentElement;
      })

    }

    function demo() {
        let txtTarea=document.querySelector('#txtTarea');
       cat.childNodes[0].textContent=txtTarea.value    
    }

    
    updateBtn.addEventListener('click', (e)=>{
        newTask=document.getElementsByName('updateTare')[0].value;
        db.collection('tareas').doc(updateId).update({
            titulo:newTask
        })
        demo();

    })



    agregarTarea.addEventListener('submit',(e)=>{
        e.preventDefault();
        db.collection('tareas').add({
            titulo:agregarTarea.tarea.value
        });
        agregarTarea.tarea.value='';

    })

