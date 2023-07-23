const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Create table
app.post('/create-table', (req, res) => {
  database.createTable();
  res.json({ message: 'Table creation initiated.' });
});

// Insert a row
app.post('/insert-row', (req, res) => {
  const data = req.body;
  database.insertRow(data, (id) => {
    res.json({ message: 'Row inserted successfully.', insertedId: id });
  });
});

// Get all rows
app.get('/get-rows', (req, res) => {
  database.getAllRows((rows) => {
    res.json(rows);
  });
});

// Delete a row by ID
app.delete('/delete-row/:id', (req, res) => {
  const id = req.params.id;
  database.deleteRowById(id, () => {
    res.json({ message: `Row with ID ${id} deleted successfully.` });
  });
});

// Get a row by ID
app.get('/get-row/:id', (req, res) => {
  const id = req.params.id;
  database.getRowById(id, (row) => {
    if (row) {
      res.json(row);
    } else {
      res.json({ message: `Row with ID ${id} not found.` });
    }
  });
});

// Drop the table
app.delete('/drop-table', (req, res) => {
  database.dropTable();
  res.json({ message: 'Table drop initiated.' });
});

// Update a row by ID
app.put('/update-row/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  database.updateRowById(id, data, () => {
    res.json({ message: `Row with ID ${id} updated successfully.` });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
