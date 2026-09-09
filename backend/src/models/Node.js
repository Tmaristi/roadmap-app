const mongoose = require('mongoose') // Importacion del Mongoose

// Define el esquema para el nodo
const nodeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    status: {type: String, enum: ['Pending', 'In-progress', 'Completed'], default: 'Pending'},
    dueDate: Date,
    completionDate: Date,
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Node' , default: null},
}, {
    timestamps: true
})

module.exports = mongoose.model('Node', nodeSchema) // Exportamos el modelo de node para que pueda ser utilizado en otras partes de la aplicación