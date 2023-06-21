const express = require('express');
const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;


const mysqlConnection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: '<1234ild>',
  database: '<nombre_de_la_base_de_datos>'
});


mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});


const mongoURL = 'mongodb://<usuario_de_root>:<contraseña_de_root>@mongodb/<nombre_de_la_base_de_datos>';


MongoClient.connect(mongoURL, (err, client) => {
  if (err) {
    console.error('Error al conectar a MongoDB:', err);
    return;
  }
  console.log('Conexión exitosa a MongoDB');
  client.close();
});


const app = express();


app.get('/check-mysql-connection', (req, res) => {
  mysqlConnection.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Error al verificar la conexión a MySQL:', err);
      res.status(500).json({ error: 'Error al verificar la conexión a MySQL' });
    } else {
      res.json({ message: 'Conexión exitosa a MySQL' });
    }
  });
});


app.get('/check-mongodb-connection', (req, res) => {
  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Error al verificar la conexión a MongoDB:', err);
      res.status(500).json({ error: 'Error al verificar la conexión a MongoDB' });
    } else {
      res.json({ message: 'Conexión exitosa a MongoDB' });
      client.close();
    }
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
