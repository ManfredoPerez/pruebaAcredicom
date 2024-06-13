import express from "express"
import cors from "cors";
import autorRoutes from './routes/autorRoutes.js'
import libroRoutes from './routes/libroRoutes.js'

const app = express()
// const cors = require('cors');

app.use(express.json())
app.use(cors());

app.use('/api', autorRoutes);
app.use('/api', libroRoutes);


app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
})


export default app;