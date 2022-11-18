import { firebase } from "./firebase";
import React from 'react';

function App() {

  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [id, setId] = React.useState('')
  const [lista, setLista] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [error, setError] = React.useState('')



  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('usuarios').get()
        //console.log(data.docs)
        const arrayData = data.docs.map((documento) => ({ id: documento.id, ...documento.data() }))
        console.log(arrayData)
        setLista(arrayData)
      } catch (err) {
        console.log(err);
      }
    }

    obtenerDatos()

  }, [])



  const guardarDatos = async (e) => {
    e.preventDefault();


    if (!nombre.trim()) {

      setError('No se encuentran valores para el campo nombre');
    } else if (!apellido.trim()) {
      setError('No se encuentran valores para el campo apellido');
    } else {
      console.log(nombre.trim() + apellido.trim())
      try {
        const db = firebase.firestore()
        const nuevoUsuario = {
          nombre, apellido
        }
        const dato = await db.collection('usuarios').add(nuevoUsuario)
        //agregarndo a la lista
        setLista([
          ...lista,
          { id: dato.id, ...nuevoUsuario }
        ])
      } catch (error) {
        console.log(error);
      }

      //limpiar estados guardados
      setNombre('')
      setApellido('')

    }

  }

  const eliminarDato = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const
        listaFiltrada = lista.filter((elemento) => elemento.id !== id)
      setLista(listaFiltrada)
    } catch (error) {
      console.log(error);
    }

  }


  //activa modo de edicion. 
  const editar = async (element) => {
    setModoEdicion(true)
    setNombre(element.nombre)
    setApellido(element.apellido)
    setId(element.id)

  }


  const editarElemento = async (e) => {
    e.preventDefault()

    if (!nombre.trim()) {
      setError('No se encuentran valores para el campo nombre');
      return
    } else if (!apellido.trim()) {
      setError('No se encuentran valores para el campo apellido');
      return
    }

    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).update({
        nombre, apellido
      })
      const listaEditada = lista.map(
        (elemento) => elemento.id === id ?
          { id: id, nombre: nombre, apellido: apellido } : elemento
      )
      setLista(listaEditada)//listando nuevos valores
      setModoEdicion(false)
      setNombre('')
      setApellido('')
      setId('')
      setError(null)
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">{modoEdicion ? 'Edicion de usuario' : 'Registro de usuarios.'}</h1>
            {
              error ? (<div className="alert alert-danger" role="alert">

                {error}
              </div>   ) : null

            }

            <form onSubmit={modoEdicion ? editarElemento : guardarDatos}>
              <input type="text" placeholder="Nombre" name="nombre" id="nombre" className="form-control my-2" onChange={(e) => setNombre(e.target.value)} value={nombre} />
              <input type="text" placeholder="Apellido" name="apellido" id="apellido" className="form-control my-2" onChange={(e) => setApellido(e.target.value)} value={apellido} />
              <div className="d-grid gap-2">
                {
                  modoEdicion ? <button className="btn btn-success btn-block" type="submit" value="Editar">Editar</button> :
                    <button type="submit" value="Registrar" className="btn btn-dark btn-block">Registrar</button>
                }

              </div>
            </form>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12">

            <h2 className="text-center">Lista de usuarios.</h2>
            <div className="col-12" ><ul className="list-group">
              {
                lista.map((element, index) => (

                  <li className="list-group-item" key={element.id}>{element.nombre} {element.apellido} <button type="button" className="btn btn-warning float-end mx-2" onClick={() => editar(element)}>Editar</button>  <button type="button" className="btn btn-danger float-end mx-2" onClick={() => eliminarDato(element.id)}>Eliminar</button></li>

                ))
              }


            </ul></div>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;
