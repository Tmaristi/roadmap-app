/* Funciones que manejan la logica del Node en la BD */
const Node = require('../models/Node') 
const eliminarNodosHijos = require('../utilidades/eliminarNodos')


// Para obtener todas los Nodos
const getAllNodes = async (req, res) => {
    // Objeto de filtro dinamico: vacio trae todos los nodos, con parentId trae solo los nodos raiz
    let filtro = {}
    if (req.query.parentId){
        const parentId = req.query.parentId === 'null' ? null : req.query.parentId
        filtro.parentId = parentId
    }

    try {
        const nodes = await Node.find(filtro)
        return res.json(nodes)
    }
    catch (err) {
        res.status(500).json({message: err.message}) // Error 500 porque es error interno de parte del servidor
        return
    }
}

// Para obtener todo los nodos hijos dado un Id de un nodo padre
const getChildrenById = async (req, res) => {
    const parentId = req.params.id
    
    try {
        const childrenNodes = await Node.find({parentId: parentId})
        return res.json(childrenNodes)
    }
    catch (err){
        res.status(500).json({message: err.message})
        return
    }
}

// Para obterner un nodo del Roadmap por su id
const getNodeById = async(req, res) => {
    const idNode = req.params.id

    try{
        const NodeRequested = await Node.findById(idNode)
        // Se hace el chequeo de que si exista en la BD el id
        if (NodeRequested === null) {
            return res.status(404).json({message: 'Nodo no encontrado'})
        } 
        return res.json(NodeRequested)
    }
    catch (err){
        res.status(500).json({message: err.message}) //Error 500 porque puede haber una mezcla de posibles errores, por convencion se pone error interno del servidor
        return
    }
}

// Para crear un nuevo nodo
const createNode = async (req, res) => {
    const { title, description, status, dueDate, parentId } = req.body
    const newNode = new Node(
        { 
        title, 
        description, 
        status, 
        dueDate,
        parentId
        }
    )
    
    try {
        const savedNode = await newNode.save()
        return res.status(201).json(savedNode)
    } 
    catch (err) {
        res.status(400).json({ message: err.message }) //Error 400 porque es error del cliente de que envio mal el formato
        return
    }

}

// Para actualizar un nodo por su id en la BD
const updateNode = async (req, res) => {
    const idNode = req.params.id
    const updatedInfo = req.body

    // Logica para actualizar completion Date si se completo un nodo
    if (updatedInfo.status){

        if (updatedInfo.status === 'Completed'){
            updatedInfo.completionDate = Date.now()
        }
        // Si el status es alguna de las otras dos opciones se quita el completion Date
        else {
            updatedInfo.completionDate = null
        }
    }
    
    try {
        const updatedNode = await Node.findByIdAndUpdate(
            idNode, 
            updatedInfo, 
            {new: true})
        return res.status(200).json(updatedNode)
    } 
    catch (err) {
        res.status(500).json({message: err.message}) //Error 500 porque puede haber una mezcla de posibles errores, por convencion se pone error interno del servidor
        return
    }
}

// Para eliminar un nodo por su id en la BD
const deleteNode = async (req, res) =>{
    const idNode = req.params.id

    try {
        await eliminarNodosHijos(idNode)
        return res.status(200).json({message: 'Nodo Eliminado'})
    }
   catch (err) {
        res.status(500).json({message: err.message}) // Error 500 porque es error interno de parte del servidor
        return
    }
}

module.exports = { 
    getAllNodes,
    getChildrenById,
    getNodeById,
    createNode,
    updateNode,
    deleteNode
}