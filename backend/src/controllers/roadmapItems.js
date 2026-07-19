/* Funciones que manejan la logica del RoadamapItem en la BD */
const RoadmapItem = require('../models/RoadmapItem') 

// Para obtener todas las items del Roadmap
const getAllRoadmapItems = async (req, res) => {
    try {
        const roadmapItems = await RoadmapItem.find()
        return res.json(roadmapItems)
    }
    catch (err) {
        res.status(500).json({message: err.message}) // Error 500 porque es error interno de parte del servidor
    }
}

// Para obterner un item del Roadmap por su id
const getRoadmapItem = async(req, res) => {
    const idRoadmapItem = req.params.id

    try{
        const RoadmapItemRequested = await RoadmapItem.findById(idRoadmapItem)
        // Se hace el chequeo de que si exista en la BD el id
        if (RoadmapItemRequested === null) {
            return res.status(404).json({message: 'Item no encontrado'})
        } 
        return res.json(RoadmapItemRequested)
    }
    catch (err){
        res.status(500).json({message: err.message}) //Error 500 porque puede haber una mezcla de posibles errores, por convencion se pone error interno del servidor
    }
}

// Para crear un nuevo item del Roadmap
// los subitems se agregan mediante update, no en la creacion, para mantener la V1 simple.
const createRoadmapItem = async (req, res) => {
    const { title, description, status, date } = req.body
    const newroadmapItem = new RoadmapItem(
        { 
        title, 
        description, 
        status, 
        date 
        }
    )
    
    try {
        const savedRoadmapItem = await newroadmapItem.save()
        return res.status(201).json(savedRoadmapItem)
    } 
    catch (err) {
        res.status(400).json({ message: err.message }) //Error 400 porque es error del cliente de que envio mal el formato
    }

}

// Para actualizar un item por su id en la BD
const updateRoadmapItem = async (req, res) => {
    const idRoadmapItem = req.params.id
    const updatedInfo = req.body
    
    try {
        const updatedRoadmapItem = await RoadmapItem.findByIdAndUpdate(
            idRoadmapItem, 
            updatedInfo, 
            {new: true})
        return res.status(200).json(updatedRoadmapItem)
    } 
    catch (err) {
        res.status(500).json({message: err.message}) //Error 500 porque puede haber una mezcla de posibles errores, por convencion se pone error interno del servidor
    }
}

// Para eliminar un item por su id en la BD
const deleteRoadmapItem = async (req, res) =>{
    const idRoadmapItem = req.params.id

    try {
        const deletedRoadmapItem = await RoadmapItem.findByIdAndDelete(
            idRoadmapItem
        )
        return res.status(200).json({message: 'Item Eliminado'})
    }
   catch (err) {
        res.status(500).json({message: err.message}) // Error 500 porque es error interno de parte del servidor
    }
}

module.exports = { 
    getAllRoadmapItems,
    getRoadmapItem, 
    createRoadmapItem, 
    updateRoadmapItem, 
    deleteRoadmapItem
}