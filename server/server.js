import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 5000

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.warn('MongoDB connection error:', err.message))
} else {
  console.log('MONGO_URI not set — skipping MongoDB connection')
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
