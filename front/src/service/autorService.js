import axios from 'axios';
import { show_alert } from '../functions';

const url = 'http://localhost:3000/api/autores';

export const getAutores = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        show_alert('Error al obtener los datos', 'error');
        console.error(error);
        return [];
    }
};

export const addAutores = async (user) => {
    try {
        const response = await axios.post(url, user);
        show_alert('Autor agregado', 'success');
        return response.data;
    } catch (error) {
        show_alert('Error en la solicitud', 'error');
        console.error(error);
    }
};

export const updateAutores = async (id, user) => {
    try {
        const response = await axios.patch(`${url}/${id}`, user);
        show_alert('Autor modificado', 'success');
        return response.data;
    } catch (error) {
        show_alert('Error en la solicitud', 'error');
        console.error(error);
    }
};

export const deleteAutores = async (id) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        show_alert('Autor eliminado', 'success');
        return response.data;
    } catch (error) {
        show_alert('Error en la solicitud', 'error');
        console.error(error);
    }
};
