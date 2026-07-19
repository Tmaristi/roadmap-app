import axios from 'axios'

// Base para la conexion con el backend
const BASEURL = 'http://localhost:3001/api/roadmapitems'

// Funcion desde el frontend para obtener todos los roadmapitems
const getAll = async () => {
    try{
        const request =  await axios.get(BASEURL)
        return request.data
    }
    catch(err) {
        console.error(err)
    }
}

// Funcion desde el frontend para obtener roadmapitem por id
const getById = async (id) => {
    try{
        const request = await axios.get(`${BASEURL}/${id}`)
        return request.data
    }
    catch(err){
        console.error(err)
    }
   
}

// Funcion desde el frontend para crear un nuevo roadmapitem, Recibe el objeto completo en lugar de campos individuales — más escalable si el modelo crece
const create = async (newroadmapItem) => {
    try {
        const request = await axios.post(BASEURL, newroadmapItem)

        return request.data
    }
    catch(err){
        console.error(err)
    }
}

// Funcion desde el frontend para actualizar un roadmapitem por id
const update = async (id, updateroadmapItem) => {
    try{
        const request = await axios.put(`${BASEURL}/${id}`, updateroadmapItem)
        return request.data
    }
    catch(err){
        console.error(err)
    }
}

// Funcion desde el frontend para eliminar un roadmapitem por id
const remove = async (id) => {
    try{
        const request = await axios.delete(`${BASEURL}/${id}`)
        return request.data
    }
    catch(err){
        console.error(err)
    }
}

export default {getAll, getById, create, update, remove}
