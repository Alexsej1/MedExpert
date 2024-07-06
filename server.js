const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "MedSystem",
});

app.post("/client", (req, res) => {
  const q =
    "INSERT INTO client(`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been added");
  });
});

app.post("/Problems", (req, res) => {
  const q = "INSERT INTO Problems(`name`, `email`, `message`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.message];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Problems has been added");
  });
});

app.get("/client", (req, res) => {
  const q = "SELECT * FROM `client`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/Problems", (req, res) => {
  const q = "SELECT * FROM `Problems`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/Test", (req, res) => {
  const q = "SELECT * FROM `Test`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/DiagnoseMedicine", (req, res) => {
  const q =
    "SELECT DiagnoseMedicine.DiagnoseMedicineID, Medicine.MedicineName, Diagnoses.DiagnoseName  from DiagnoseMedicine INNER JOIN Diagnoses on Diagnoses.DiagnoseID = DiagnoseMedicine.DiagnoseID INNER JOIN Medicine on Medicine.MedicineID = DiagnoseMedicine.MedicineID";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/Medicine", (req, res) => {
  const q = "SELECT * FROM `Medicine`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/Pharmacies", (req, res) => {
  const q = "SELECT * FROM `pharmacies`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/Symptoms", (req, res) => {
  const q = "SELECT * FROM `Symptoms`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/Diagnoses", (req, res) => {
  const q = "SELECT * FROM `Diagnoses`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/DiagnoseSymptom", (req, res) => {
  const q = "SELECT * FROM `DiagnoseSymptom`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(port, () => {
  console.log("listening");
});
