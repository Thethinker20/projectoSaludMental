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
  });
  calendar.render();
});