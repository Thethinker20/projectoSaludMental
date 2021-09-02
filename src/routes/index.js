const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/succesful", (req, res) => {
  res.render("pages/succesful", { layout: false });
});

router.get("/register", (req, res) => {
  res.render("auth/register", { layout: false });
});

//portal routes

router.get("/login", (req, res) => {
  res.render("auth/login", { layout: false });
});

//routas Admin
router.get("/inicioAdmin", (req, res) => {
  res.render("pages/portalAdmin/inicioAdmin", { layout: false });
});

router.get("/addDoctors", (req, res) => {
  res.render("pages/portalAdmin/addDoctors" , { layout: false });
});

router.get("/agregarCitas", (req, res) => {
  res.render("pages/portalAdmin/agregarCitas" , { layout: false });
});

router.get("/pacientesAdmin", (req, res) => {
  res.render("pages/portalAdmin/pacientesAdmin" , { layout: false });
});

//routas Doctores
router.get("/profileDoctor", (req, res) => {
  res.render("pages/portalDoc/profileDoctor" , { layout: false });
});

router.get("/inicioDoctor", (req, res) => {
  res.render("pages/portalDoc/inicioDoctor" , { layout: false });
});

router.get("/pacientesDoc", (req, res) => {
  res.render("pages/portalDoc/pacientesDoc" , { layout: false });
});

router.get("/citasDoc", (req, res) => {
  res.render("pages/portalDoc/citasDoc" , { layout: false });
});

//routasPacientes
router.get("/inicioPacientes", (req, res) => {
  res.render("pages/portalPaciente/inicioPacientes" , { layout: false });
});

router.get("/pacienteCita", (req, res) => {
  res.render("pages/portalPaciente/pacienteCita" , { layout: false });
});

router.get("/paCreaCita", (req, res) => {
  res.render("pages/portalPaciente/pacienteGeneraCita" , { layout: false });
});

//routa formulario de pagos
router.get("/pacientePago", (req, res) => {
  res.render("auth/formPagos" , { layout: false });
});

//departamentos
router.get("/coae", (req, res) => {
  res.render("pages/departamentos/coae");
});

router.get("/redpum", (req, res) => {
  res.render("pages/departamentos/redpum");
});

router.get("/fapsi", (req, res) => {
  res.render("pages/departamentos/fapsi");
});

router.get("/cedafam", (req, res) => {
  res.render("pages/departamentos/cedafam");
});

router.get("/cip", (req, res) => {
  res.render("pages/departamentos/cip");
});



module.exports = router;