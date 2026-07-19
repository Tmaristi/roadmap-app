// Importa las dependencias necesarias
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const router = require('./routes/roadmapItems')

//Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config() 

// Crea la aplicacion Express 
const app = express()
app.use(cors()) // Habilita CORS para permitir solicitudes desde el frontend
app.use(express.json()) // Permite que el cuerpo de las solicitudes se analice como JSON

// Conecta la app con MongoDB
mongoose.connect(process.env.MONGODB_URI).
    then(() => {
        console.log('Conectado a MongoDB')
    }).catch(error => {
    console.error('Error al conectar a MongoDB:', error)
    })

app.use('/api/roadmapitems', router)

// Crea el servidor y escucha en el puerto especificado
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})