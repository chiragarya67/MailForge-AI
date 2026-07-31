import express from 'express'
import { Router } from 'express'
import protect from '../middleware/authMiddleware.js'
import {generateEmail, getHistory} from '../controller/aiController.js'
const airouter = express.Router()

airouter.post('/generate-email', protect,  generateEmail)
airouter.get('/history', protect, getHistory)


export default airouter
