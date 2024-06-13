// import React from 'react'
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getAutores, deleteAutores, addAutores, updateAutores } from "../service/autorService";
import { show_alert } from "../functions";

const Autores = () => {


    const [autor, setUser] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setName] = useState('');
    const [apellido, setApellido] = useState('');
    const [operacion, setOperacion] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchAutor();
    }, []);

    const fetchAutor = async () => {
        const autor = await getAutores();
        setUser(autor);
    };

    const openModal = (op, id = '', nombre = '', apellido = '') => {
        setId(id);
        setName(nombre);
        setApellido(apellido);
        setOperacion(op);

        if (op === 1) {
            setTitle('Registrar Autor');
        } else if (op === 2) {
            setTitle('Editar Autor');
        }

        window.setTimeout(() => {
            document.getElementById('nombre').focus();
        }, 500);
    };

    const validar = () => {
        if (nombre.trim() === '') {
            show_alert('Escriba el nombre del autor', 'warning');
        } else if (apellido.trim() === '') {
            show_alert('Escriba el salario del autor', 'warning');
        } else {
            const user = { nombre: nombre.trim(), apellido: apellido.trim() };
            if (operacion === 1) {
                addAutores(user).then(() => fetchAutor());
            } else {
                updateAutores(id, user).then(() => fetchAutor());
            }
            document.getElementById('btnCerrar').click();
        }
    };

    const handleDelete = (id, nombre) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: `¿Seguro de eliminar el autor  ${nombre}?`,
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAutores(id).then(() => fetchAutor());
            } else {
                show_alert('El autor no fue eliminado', 'info');
            }
        });
    };

  return (
    <div className="App">
    
            <div className="container-fluid">
                {/* BOTON AÑADIR */}
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle='modal' data-bs-target="#modalUser">
                                <i className="fa-solid fa-circle-plus"></i>Añadir
                            </button>
                        </div>
                    </div>
                </div>
    
                {/* CREAR LA TABLA  */}
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr> <th>#</th> <th>Nombre</th> <th>Apellido</th>  <th></th> </tr>
                                </thead>
                                <tbody className="table-group-divider"> 
                                    {autor.map( ( usuario, i) => (
                                            <tr key={usuario.id}>
                                                <td>{(i+1)}</td> 
                                                <td>{usuario.nombre}</td>
                                                <td>{usuario.apellido}</td>
                                                <td>
                                                    {/* BOTON EDITAR  */}
                                                    <button onClick={() => openModal(2, usuario.id, usuario.nombre, usuario.apellido)} className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalUser">
                                                        <i className="fa-solid fa-edit"></i>
                                                    </button>
                                                    &nbsp;
                                                    <button onClick={() => handleDelete(usuario.id, usuario.nombre)} className="btn btn-danger">
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    
            <div id="modalUser" className="modal fade" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{title}</label>
                            <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close"></button>
                        </div>
                        {/* INPUT PARA EL NOMBRE  */}
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id="nombre" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setName(e.target.value)}></input>
                            </div>
                        </div>
                        {/* PARA EL SALARIO */}
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id="apellido" className="form-control" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}></input>
                            </div>
                        </div>
    
                        {/* BOTON GUARDAR */}
                        <div className="d-grid col-6 mx-auto">
                            <button onClick={() => validar() } className="btn btn-success">
                                <i className="fa-solid fa-floppy-disk"></i> Guardar
                            </button>
                        </div>
    
                        <div className="modal-footer">
                            <button type="button" id='btnCerrar' className="btn btn-secondary" data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Autores