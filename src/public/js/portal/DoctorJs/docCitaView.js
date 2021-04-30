$(document).ready(function () {
  pacienteDocCitas();
  loadPacientes();
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

$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
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

$('.toggle-sidebar').click(function (e) {
  $('.main-sidebar').toggleClass('open');
});

function loadPacientes() {
  let data = {
    idAllDocPaciente: dataPacienteIn,
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
      console.log(data)
      var opctionP =
        '<option value"" disabled selected>Seleccione un paciente...</option>';
      $.each(data, function (i, pt) {
        opctionP += '<option value="' + pt._id + '">' + pt.name + "</option>";
      });
      $("#pacienteIdAdmin2").html(opctionP);
    });
}

document.addEventListener("DOMContentLoaded", function () {
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
  dataPacienteIn = tokenDoctor.pasientes;

  var calendarEl = document.getElementById("calendarCita");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "es",
    initialView: "dayGridMonth",
    events: function (fetchInfo, successCallback, failureCallback) {
      let data = {
        idAllDocPaciente: dataPacienteIn,
      };
      let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const promise = fetch("/getPacieCitaOfDoc", options)
        .then((res) => res.json())
        .then((data) => {
          var events = []
          data.forEach(function (evt) {
            events.push({
              title: evt.paciente,
              start: evt.date,
              end: evt.date,
              url: evt.zoomLink
            });
          });
          successCallback(events);
        });
    },
    eventClick: function(info) {
      if (info.event.url) {
        info.jsEvent.preventDefault(); 
        window.open(info.event.url);
      }
  },
  });
  calendar.render();
});

function pacienteDocCitas(){
  let data = {
    idAllDocPaciente: dataPacienteIn,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const promise = fetch("/getPacieCitaOfDoc", options)
    .then((res) => res.json())
    .then((data) => {
      table = $("#tablePaCita").DataTable({
        responsive:true,
        data: data,
        columns: [
          { data: "paciente" },
          { data: "date" },
          { data: "time" },
        ],
        filter: false,
        bLengthChange: false,
        bInfo: false,
        bAutoWidth: false,
        order: [[0, "desc"]],
        bPaginate: false,
      });
    });
}

//agregar cita a paciente
const form1 = document.getElementById("citasForm1");
form1.addEventListener("submit", citas1);

async function citas1(event) {
  const pasieId = document.getElementById("pacienteIdAdmin2").value;
  const pacienteT = document.getElementById("pacienteIdAdmin2");
  const paciente = pacienteT.options[pacienteT.selectedIndex].text;
  const date = document.getElementById("dateAdmin").value;
  const time = document.getElementById("timeAdmin").value;
  const zoomLink = document.getElementById("ligaZoom").value;

  event.preventDefault();

  const result1 = await fetch("/addLinkForm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pasieId,
      paciente,
      date,
      time,
      zoomLink,
    }),
  }).then((res) => res.json());

  if (result1.status == 202) {
    Swal.fire({ icon: "success", title:"Paciente:", text: result1.msg}).then(function () {
      location.reload();
    });
  } else {
    Swal.fire({
      icon: "error",
      text: result1.msg,
    });
  }
}