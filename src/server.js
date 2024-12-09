import express from 'express'
import * as expressAsyncErrors from 'express-async-errors'
import 'dotenv/config'
import cors from 'cors'
import { UPLOADS_FOLDER } from './configs/upload.js'

import { AppError } from './utils/AppError.js'
import { routes } from './routes/index.js'
import {migrationsRun} from './database/sqlite/migrations/index.js'

const PORT = process.env.PORT || 3333

const app = express()
app.use(express.json())
    .use(cors())

    .use('/files', express.static(UPLOADS_FOLDER))

    .use(routes)

    .use((error, req, res, next) => {
        if(error instanceof AppError) { //verifica se o erro veio do cliente.
            return res.status(error.statusCode).json({
                status: "error",
                message: error.message
            })
        }

        console.error(error) // Faz o erro aparecer no console para debug.

        return res.status(500).json({
            status: "error",
            message: "Ineternal server error"
        })
    })
    
    .listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))