const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
require('dotenv').config();


const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));


fs.readdirSync('./rooted').map((file) => {
    /* console.log(`Loading module: ${file}`); */
    app.use('/api', require(`./rooted/${file}`));
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
