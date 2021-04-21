$(document).ready(function () {
  getDoctInfo();
  $("#pacieIndivi").hide();
});

$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

  /* To Disable Inspect Element */
  $(document).bind("contextmenu",function(e) {
    e.preventDefault();
   });
   
   $(document).keydown(function(e){
       if(e.which === 123){
          return false;
       }
   });

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");
var dataPacienteIn;

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}

function getDoctInfo() {
  var tokenEncrypt = localStorage.getItem("tokenDoc");
  var base64Url = tokenEncrypt.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  var tokenDoctor = JSON.parse(jsonPayload);
  document.getElementById("doctorName").innerText =
    "Dr. " + tokenDoctor.docNombre + " " + tokenDoctor.docPaterno;
  document.getElementById("docNombreNav").innerText =
    "Dr. " + tokenDoctor.docNombre;
  const pacientesId = tokenDoctor.pasientes;
  let data = {
    idAllDocPaciente: pacientesId,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const promise = fetch("/getAllPacientOdDoc", options)
    .then((res) => res.json())
    .then((data) => {
      table = $("#tablePacienD").DataTable({
        data: data,
        columns: [
          { data: "username" },
          { data: "citation" },
          { data: "name" },
          { data: "lastNameP" },
          { data: "address" },
          { data: "age" },
          { data: "date" },
          { data: "time" },
        ],
        bLengthChange: false,
        bInfo: false,
        bAutoWidth: false,
        order: [[3, "desc"]],
        bPaginate: false,
      });
    });
}

var dataT;

$("#tablePacienD tbody").on("click", "tr", function () {
  dataT = table.row(this).data();
  $("#allPaciente").hide();
  $("#pacieIndivi").show();

  document.getElementById("pacieCoName").innerText =
    dataT.name + " " + dataT.lastNameP;
  document.getElementById("pacenCorreo").innerText = dataT.email;
  document.getElementById("edadP").innerText = dataT.age;
  document.getElementById("paisP").innerText = dataT.country;
  document.getElementById("ciudadP").innerText = dataT.city;
  document.getElementById("ubicacionP").innerText = dataT.address;

  document.getElementById("motConsul").innerText = dataT.motivConsult;
  document.getElementById("evaSalud").innerText = dataT.evaSalud;
  document.getElementById("solIntent").innerText = dataT.soluProb;
  getComments();
});

const form = document.getElementById("formComent");
form.addEventListener("submit", commentarios);

async function commentarios(event) {
  const paciId = dataT._id;
  const comentario = document.getElementById("commentField").value;
  event.preventDefault();

  const result = await fetch("/addCommentP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paciId,
      comentario,
    }),
  }).then((res) => res.json());

  if (result.status == 202) {
    Swal.fire({
      icon: "success",
      text: result.msg,
    });
  } else {
    Swal.fire({
      icon: "error",
      text: result.err,
    });
  }
}

function getComments() {
  const idPatientDoc = dataT.comentarios;
  let data = {
    idPatientCom: idPatientDoc,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const promise = fetch("/getPatieneComment", options)
    .then((res) => res.json())
    .then((data) => {
      if (data.length == 0) {
        $("#comentarioVis").append(
          '<div class="col-md-12">No hay commentarios<div>'
        );
      } else {
        for (var i = 0; i < data.length; i++) {
          $("#comentarioVis").append(
            '<div class="col-md-12" style="background:background: #c7c7c7;">' +
              '<h6 class="mb-0">' +
              data[i].createdAt +
              "</h6>" +
              "<h5>" +
              data[i].comentario +
              "<h5>" +
              "<div>"
          );
        }
      }
    });
}
