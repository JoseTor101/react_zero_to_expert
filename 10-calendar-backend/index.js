import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import eventRoutes from './routes/events.js'
import { dbConnection } from './database/config.js';
import cors from 'cors'

dotenv.config();
// Servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth/', authRoutes)
app.use('/api/events/', eventRoutes)

// Escuchar las peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

