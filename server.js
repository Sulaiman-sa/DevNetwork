const express = require('express')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

//Initialize Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API is working'))
// app.use(
//   router.get('/api/users', (req, res) => {
//     res.send('usersssssssssss')
//   })
// )

//Must change this
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

//Things to be changed:
//Above one
//Configs
//
