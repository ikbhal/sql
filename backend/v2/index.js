const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3007;

app.use(bodyParser.json());
app.use(cors());


// create table
app.post('/create-table', (req, res) => {
  const { name, columns } = req.body;

  let query = `CREATE TABLE IF NOT EXISTS ${name} (`;
  const columnDefinitions = columns.map((col) => {
    let colDef = `${col.name} ${col.type}`;
    if (col.primary_key) colDef += ' PRIMARY KEY';
    if (col.autointeger) colDef += ' AUTOINCREMENT';
    if (col.default) colDef += ` DEFAULT ${col.default}`;
    return colDef;
  });

  query += columnDefinitions.join(', ');
  query += ')';

  database.run(query, (err) => {
    if (err) {
      console.error('Error creating the table:', err.message);
      res.status(500).json({ error: 'Failed to create the table.' });
    } else {
      console.log('Table created successfully.');
      res.json({ message: 'Table created successfully.' });
    }
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
