// db/database.js

const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Create table
const createTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS your_table_name (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      column1 TEXT,
      column2 INTEGER
    )
  `;
  db.run(query, (err) => {
    if (err) {
      console.error('Error creating the table:', err.message);
    } else {
      console.log('Table created successfully.');
    }
  });
};

// Insert a row
const insertRow = (data, callback) => {
  const { column1, column2 } = data;
  const query = `INSERT INTO your_table_name (column1, column2) VALUES (?, ?)`;
  db.run(query, [column1, column2], function (err) {
    if (err) {
      console.error('Error inserting a row:', err.message);
    } else {
      console.log('Row inserted successfully with ID:', this.lastID);
      callback(this.lastID);
    }
  });
};

// Get all rows
const getAllRows = (callback) => {
  const query = `SELECT * FROM your_table_name`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching rows:', err.message);
    } else {
      callback(rows);
    }
  });
};

// Delete a row by ID
const deleteRowById = (id, callback) => {
  const query = `DELETE FROM your_table_name WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error deleting a row:', err.message);
    } else {
      console.log(`Row with ID ${id} deleted successfully.`);
      callback();
    }
  });
};

// Get a row by ID
const getRowById = (id, callback) => {
  const query = `SELECT * FROM your_table_name WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Error fetching the row:', err.message);
    } else {
      callback(row);
    }
  });
};

// Drop the table
const dropTable = () => {
  const query = `DROP TABLE IF EXISTS your_table_name`;
  db.run(query, (err) => {
    if (err) {
      console.error('Error dropping the table:', err.message);
    } else {
      console.log('Table dropped successfully.');
    }
  });
};

// Update a row by ID
const updateRowById = (id, data, callback) => {
  const { column1, column2 } = data;
  const query = `UPDATE your_table_name SET column1 = ?, column2 = ? WHERE id = ?`;
  db.run(query, [column1, column2, id], function (err) {
    if (err) {
      console.error('Error updating the row:', err.message);
    } else {
      console.log(`Row with ID ${id} updated successfully.`);
      callback();
    }
  });
};

module.exports = {
  createTable,
  insertRow,
  getAllRows,
  deleteRowById,
  getRowById,
  dropTable,
  updateRowById,
};
