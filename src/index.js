const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const exphbs = require("express-handlebars");
const http = require("http");
const https = require("https");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const Consult = require("./routes/models/consults");
const Admin = require("./routes/models/admin");
const Doctors = require("./routes/models/doctores");
const Citas = require("./routes/models/citas");
const Commentas = require("./routes/models/comments");
const ObjectID = require("mongoskin").ObjectID;
const request = require("request");
const axios = require("axios");
const nodemailer = require("nodemailer");
const Pagos = require("./routes/models/pagos");
require("dotenv").config();

const app = express();
require("./database");
app.set("views", path.join(__dirname, "views"));

const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
  helpers: {
    ifeq: function (a, b, options) {
      if (a == b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    ifnoteq: function (a, b, options) {
      if (a != b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    firstL: function (options) {
      return options.charAt(0);
    },
  },
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middleware
app.use(morgan("tiny")); //Morgan
app.use(cors()); // cors
app.use(express.json()); // JSON
app.use(express.urlencoded({ extended: false })); //urlencoded
app.use(bodyParser.json());

const JWT_SECRET =
  'sdjkfh8923yhjdksbfmad3939&"#?"?#(#>Q(()@_#(##hjb2qiuhesdbhjdsfg839ujkdhfjk';

//register
app.post("/registerForm", async (req, res) => {
  const {
    citation,
    username,
    password: plainTextPassword,
    confirmpassword: plainTextPasswordC,
    name,
    lastNameM,
    lastNameP,
    address,
    country,
    state,
    city,
    email,
    age,
    date,
    time,
    motivConsult,
    evaSalud,
    soluProb,
  } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);
  const confirmpassword = await bcrypt.hash(plainTextPasswordC, 10);

  try {
    const response = await Consult.create({
      citation,
      username,
      password,
      confirmpassword,
      name,
      lastNameM,
      lastNameP,
      address,
      country,
      state,
      city,
      email,
      age,
      date,
      time,
      motivConsult,
      evaSalud,
      soluProb,
    });
    console.log("user create good: ", response);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nathacarcool@gmail.com",
        pass: "nathamartina",
      },
    });

    const linkPortal = "https://www.youtube.com/watch?v=Va9UKGs1bwI&t=116s";
    let mailOption = {
      from: "nathacarcool@gmail.com",
      to: `${email}, agamez@um.edu.mx`,
      subject: "Confirmacion registro",
      html:
        "<h2>Bienvenido</h2><h5>Buendia has hecho un registro en Salud mental UM para tener un cita</h5><h5>En este link: " +
        linkPortal +
        " vas a poder subir a tu portal</h5><h5>Entra a este link con tu usuario y contraseña usuario: " +
        username +
        " contraseña: " +
        plainTextPassword +
        "</h5>",
    };

    transporter.sendMail(mailOption, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      } else {
        console.log("Email sent");
        data.json({ status: "202", data: "Success" });
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }
  res.json({ status: "ok" });
});

//portal
//login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Consult.findOne({ username }).lean();
  const admin = await Admin.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error1", error: "Usuario invalido" });
  }

  if (username == "admin") {
    if (await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign(
        {
          id: admin._id,
          username: admin.username,
        },
        JWT_SECRET
      );
      res.json({ status: "ok", data: token });
    }else{
      res.json({ status: "404", error: "Contraseña invalido" });
    }
  } else {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          citation: user.citation,
          username: user.username,
          name: user.name,
          username: user.username,
          lastNameM: user.lastNameM,
          lastNameP: user.lastNameP,
          address: user.address,
          username: user.username,
          country: user.country,
          state: user.state,
          city: user.city,
          email: user.email,
          age: user.age,
          date: user.date,
          time: user.time,
          motivConsult: user.motivConsult,
          evaSalud: user.evaSalud,
          soluProb: user.soluProb,
          cita: user.cita,
          comentarios: user.comentarios,
          pagos: user.pagos,
        },
        JWT_SECRET
      );
      res.json({ status: "ok", data: token });
    }else{
      res.json({ status: "405", error: "Usuario invalido" });
    }
  }
});

//login doctors
app.post("/loginDoc", async (req, res) => {
  const { username, password } = req.body;
  docUsername = username;
  const doctor = await Doctors.findOne({ docUsername }).lean();

  if (!doctor) {
    return res.json({ status: "error1", error: "Usuario invalido" });
  }

  if (await bcrypt.compare(password, doctor.docPass)) {
    // the username, password combination is successful
    const token = jwt.sign(
      {
        id: doctor._id,
        docUsername: doctor.username,
        docPass: doctor.password,
        docPassConfirm: doctor.docPassConfirm,
        docNombre: doctor.docNombre,
        docPaterno: doctor.docPaterno,
        docMaterno: doctor.docMaterno,
        docEmail: doctor.docEmail,
        docPuesto: doctor.docPuesto,
        pasientes: doctor.pasientes,
      },
      JWT_SECRET
    );
    res.json({ status: "ok", data: token });
  }else{
    res.json({ status: "error2", error: "Contraseña invalido" });
  }
});

//Admin
//get all pacientes from database
app.get("/all-data", (req, res) => {
  Consult.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get todo los citas 
app.get("/getAllCitas", (req, res) => {
  Citas.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all doctors from database
app.get("/all-doctors", (req, res) => {
  Doctors.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//agregar doctores
app.post("/doctorsForm", async (req, res) => {
  const {
    docUsername,
    docPass: plainTextPassword,
    docPassConfirm: plainTextPasswordC,
    docNombre,
    docPaterno,
    docMaterno,
    docEmail,
    docPuesto,
    pasientes,
  } = req.body;

  if (!docUsername || typeof docUsername !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "passError",
      error: "Contraseña demasiado pequeña. Debe tener al menos 6 caracteres",
    });
  }

  const docPass = await bcrypt.hash(plainTextPassword, 10);
  const docPassConfirm = await bcrypt.hash(plainTextPasswordC, 10);

  try {
    const response = await Doctores.create({
      docUsername,
      docPass,
      docPassConfirm,
      docNombre,
      docPaterno,
      docMaterno,
      docEmail,
      docPuesto,
      pasientes,
    });
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "errorExiste", error: "Usuario ya existe" });
    }
    throw error;
  }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nathacarcool@gmail.com",
      pass: "nathamartina",
    },
  });

  const SMUMLINK = "https://www.youtube.com/";

  let mailOption = {
    from: "nathacarcool@gmail.com",
    to: `${docEmail}`,
    subject: "Usuario Creado",
    html:
      "<h2>Tu usuario de Salud Mental UM ha sido creado.</h2><h5>Usuario: " + docUsername + "</h5><h5>Contraseña: " + plainTextPassword + "</h5><h5>Ingresa aqui para ver tu citas y pasientes: " + SMUMLINK +"</h5>",
  };

  transporter.sendMail(mailOption, function (err, data) {
    if (err) {
      return res.json({ status: "500", msg: err });
    }
  });
  
  res.json({ status: "202", msg: "Doctor Agregado" });
});

//borrar Doctores
app.post("/addDelteTableId", (req, res, next) => {
  const data = req.body.idDoc;

  Doctors.deleteOne({ _id: data })
    .then((res) => {
      res.json({ status: "202", msg: "Doctor Borrado" });
    })
    .catch((err) => {
      res.json({ status: "500", error: err });
    });
});

//get citas by id from database
app.post("/getCitaById", (req, res) => {
  const data = req.body.idCita;
  Citas.findById({ _id: data })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//agrega paciente a un doctor
app.post("/addDoctorsForm", async (req, res) => {
  const { docId, pasieId } = req.body;

  const doctor = await Doctors.find({ _id: docId });

  let pacientes = doctor[0].pasientes;
  let pacienExist = pacientes.filter((paciente) => paciente == pasieId);
  if (pacienExist.length > 0) {
    return res.json({
      status: "202",
      msg: "El paciente ya existe",
    });
  }

  const pacieAgregado = await Doctors.findByIdAndUpdate(
    { _id: docId },
    { $push: { pasientes: pasieId } }
  );
  if (pacieAgregado) {
    return res.json({
      status: "202",
      msg: "Paciente agregado",
    });
  }
});

//agregar link horario dia a un paciente
app.post("/addLinkForm", async (req, res) => {
  const { pasieId, paciente, date, time, zoomLink } = req.body;

  const newLink = await Citas.create({
    paciente,
    date,
    time,
    zoomLink,
  });
  try {
    const linkAdded = await newLink.save();
    const idLink = linkAdded._id;
    const pacient = await Consult.findByIdAndUpdate(
      { _id: pasieId },
      { $push: { cita: idLink } }
    );
    if (pacient) {
      return res.json({
        status: "202",
        msg: "Cita fue agregado",
      });
    } else {
      return res.json({
        status: "error",
        msg: "cita no se agrego",
      });
    }
  } catch (error) {
    return res.json(error);
  }
});

//conseguir todos los pacientes de un doctor
app.post("/getAllPacientOdDoc", (req, res, next) => {
  const data = req.body.idAllDocPaciente;
  Consult.find({ _id: { $in: data } }, function (err, docs) {
    res.send(docs);
  });
});

//enviar commentarios por id
app.post("/addCommentP", async (req, res) => {
  const { paciId, comentario } = req.body;
  console.log(comentario);
  const newCita = await Commentas.create({
    comentario,
  });
  try {
    const linkAddedCom = await newCita.save();
    const idLinkCom = linkAddedCom._id;
    const pacient = await Consult.findByIdAndUpdate(
      { _id: paciId },
      { $push: { comentarios: idLinkCom } }
    );
    if (pacient) {
      return res.json({
        status: "202",
        msg: "Commentario Agregado",
      });
    } else {
      return res.json({
        status: "error",
        err: "Commentario no agregado",
      });
    }
  } catch (error) {
    return res.json(error);
  }
});

//conseguir commentarios de un paciente
app.post("/getPatieneComment", (req, res, next) => {
  const data = req.body.idPatientCom;
  console.log(data);

  Commentas.find({ _id: { $in: data } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//hacer pagos
app.post("/hacerPagos", async (req, res) => {
  const {
    pacienteId,
    reference1P,
    amountP,
    fhVigenciaP,
    emailP,
    nomClienteP,
    reference2P,
    tipoTarjetaP,
    iFacturaP,
    nomRFCP,
    RFCP,
    usoCFDIP,
    domicilioP,
  } = req.body;

  if (iFacturaP == true) {
    const data = {
      reference: reference1P,
      amount: amountP,
      omitirNotif: "0",
      promociones: "C",
      stCorreo: "0",
      fhVigencia: fhVigenciaP,
      mailCliente: emailP,
      datosAdicionalesList: [
        {
          id: "1",
          label: "Nombre Cliente",
          value: nomClienteP,
        },
        {
          id: "2",
          label: "Referencia",
          value: reference2P,
        },
        {
          id: "3",
          label: "Tipo Tarjeta",
          value: tipoTarjetaP,
        },
        {
          id: "4",
          label: "isFactura",
          value: iFacturaP,
        },
        {
          id: "5",
          label: "nombreRFC",
          value: nomRFCP,
        },
        {
          id: "6",
          label: "rfc",
          value: RFCP,
        },
        {
          id: "7",
          label: "usoCfdi",
          value: usoCFDIP,
        },
        {
          id: "8",
          label: "domicilio",
          value: domicilioP,
        },
      ],
    };

    axios
      .post("https://am.um.edu.mx/api/core/webpay/generarLigaPago", data)
      .then((result) => {
        const resultData = result.data;
        res.send(resultData);
      })
      .catch((error) => {
        console.error(error);
      });

    var newData = new Pagos({ data: data });
    try {
      newData.save();
      const idPago = newData._id;
      const cita = await Consult.findByIdAndUpdate(
        { _id: pacienteId },
        { $push: { pagos: idPago } }
      );
    } catch (error) {
      return res.json(error);
    }
  } else {
    const data = {
      reference: reference1P,
      amount: amountP,
      omitirNotif: "0",
      promociones: "C",
      stCorreo: "0",
      fhVigencia: fhVigenciaP,
      mailCliente: emailP,
      datosAdicionalesList: [
        {
          id: "1",
          label: "Nombre Cliente",
          value: nomClienteP,
        },
        {
          id: "2",
          label: "Referencia",
          value: reference2P,
        },
        {
          id: "3",
          label: "Tipo Tarjeta",
          value: tipoTarjetaP,
        },
        {
          id: "4",
          label: "isFactura",
          value: iFacturaP,
        },
      ],
    };

    axios
      .post("https://am.um.edu.mx/api/core/webpay/generarLigaPago", data)
      .then((result) => {
        const resultData = result.data;
        res.send(resultData);
      })
      .catch((error) => {
        console.error(error);
      });

    var newData = new Pagos({ data: data });
    try {
      newData.save();
      console.log(pacienteId);
      const idPago = newData._id;
      console.log(idPago);
      const cita = await Consult.findByIdAndUpdate(
        { _id: pacienteId },
        { $push: { pagos: idPago } }
      );
      console.log("yess");
    } catch (error) {
      return res.json(error);
    }
  }
});

//get cita de doctores, de cada paciente
app.post("/getPacieCitaOfDoc", (req, res) => {
  const data = req.body.idAllDocPaciente;
  Consult.find({ _id: { $in: data } }, function (err, docs) {
    var citaArray = [];
    for (var key in docs) {
      var dataTest = docs[key].cita;
      citaArray = citaArray.concat(dataTest);
    }
    Citas.find({ _id: { $in: citaArray } }, function (err, docs) {
      res.send(docs);
    });
  });
});

//email preguntas
app.post("/preguntasEmail", (req, res) => {
  const { nombre, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nathacarcool@gmail.com",
      pass: "nathamartina",
    },
  });

  let mailOption = {
    from: email,
    to: "nathacarcool@gmail.com",
    subject: subject,
    text: message,
    html:
      "<h2>SMUM Pregunta</h2><h5>De: " +
      nombre +
      "</h5><h5>Correo: " +
      email +
      "</h5><h5>Mensage: " +
      message +
      "</h5>",
  };

  transporter.sendMail(mailOption, function (err, data) {
    if (err) {
      return res.json({ status: "500", msg: err });
    } else {
      return res.json({ status: "202", msg: "Pregunta enviado" });
    }
  });
});

//pagos del paciente status
app.post("/getPagoPaciente", (req, res) => {
  const data = req.body.idPagos;
  Pagos.find({ _id: { $in: data } })
    .sort({ _id: -1 })
    .limit(1)
    .exec(function (err, docs) {
      var result = docs.map(function(a) {return a.data.reference;});
      const refContent = result.toString();
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;


      //const url = `https://wso2am.um.edu.mx/pagoenlinea/1.0/pago_santander/PGINTCRI01-SMUM965-/15-04-2021`;
      const url = `https://wso2am.um.edu.mx/pagoenlinea/1.0/pago_santander/${refContent}/${today}`;
      axios.get(url, {
        headers: {
          "apikey": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkE9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJsYWZ1ZW50ZS5kYW5pZWxAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJsYWZ1ZW50ZS5kYW5pZWwiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiMTBQZXJNaW4iLCJuYW1lIjoicHNpY29sb2dpYV9jb2JybyIsImlkIjoxNSwidXVpZCI6ImJmMmJhZDhlLTI4YmEtNDJkMy04MWQzLWI2MzdjZTA1NDZiNCJ9LCJpc3MiOiJodHRwczpcL1wvYW0udW0uZWR1Lm14OjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50Iiwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoicGFnb3NlbmxpbmVhIiwiY29udGV4dCI6IlwvcGFnb2VubGluZWFcLzEuMCIsInB1Ymxpc2hlciI6ImxhZnVlbnRlLmRhbmllbCIsInZlcnNpb24iOiIxLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiVW5saW1pdGVkIn1dLCJpYXQiOjE2MTc5ODkxMDcsImp0aSI6ImMzM2YwMWY2LTFmNmQtNGFjMC1hM2Y2LWE3NTQ0M2IzMzQxNiJ9.Ijo5LMHc8cl3MhLj7waNw1jzi9R9Q66MwMpLsP6dezMeP8FOCwjex97bDG20VLwoTWLx24XrNzYj9niP6ciKCGcdtPKgMokVELHeSwIwktgJr7m7X8f6ahapCieAvYy-050uCzBo_0x6wt3TJ9B43GsBG3iY8DbPmpjaOrZqXDxBvgOO39QWxyyEXx7_KUPAEbzUsNcAUIgB6dHeVnwnqUSZTrXMB4TiAQG6UWknle6y5ZgW6bpvFFecU40M1WFNZtZurq8APDodBpL5qK2CqEuOzyv6fJdoMN3gn4hxbN9pCLpEDwrwF4UQe13SttVgi9QXxpK68RgepDGRVa5geQ==",
        }
      })
      .then((result) => {
        res.send(result.data)
      })
      .catch((error) => {
        console.error(error)
      })
      
    });
});

// Routes
app.use(require("./routes"));
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

app.set("port", process.env.PORT || 4000);

server.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
