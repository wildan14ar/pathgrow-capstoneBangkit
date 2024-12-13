const express = require('express');

const usersRoutes = require('./routes/usersRoutes')
const middlewareLogRequest = require('./middleware/usersMiddleware')

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoutes);


app.listen(3000, () => {
  console.log('Server running on PORT:3000');
})