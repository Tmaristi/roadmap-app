const mongoose = require('mongoose') // Importacion del Mongoose

// Define el esquema para los sub-items del roadmap item
const subItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    status: {type: String, enum: ['Pending', 'In-progress', 'Completed'], default: 'Pending'},
    date: Date
})

// Define el esquema para el roadmap item
const roadmapitemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    status: {type: String, enum: ['Pending', 'In-progress', 'Completed'], default: 'Pending'},
    date: Date,
    subItems: [subItemSchema] // Array de sub-items que siguen el esquema definido por subItemSchema
})

module.exports = mongoose.model('RoadmapItem', roadmapitemSchema) // Exportamos el modelo de RoadmapItem para que pueda ser utilizado en otras partes de la aplicación