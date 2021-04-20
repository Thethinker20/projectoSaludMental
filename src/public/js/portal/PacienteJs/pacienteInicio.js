$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

$(document).ready(function () {
  getPacienInfo();
});

function getPacienInfo() {
  var tokenEncrypt = localStorage.getItem("tokenPaciente");
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
  var tokenPaciente = JSON.parse(jsonPayload);
  document.getElementById("pacienteNombre").innerText = tokenPaciente.name + " " + tokenPaciente.lastNameP;
  document.getElementById("nomProfile").innerText = tokenPaciente.name;
  document.getElementById("pacienteBienve").innerText = "Bienvenidos " + tokenPaciente.name;
  document.getElementById("pacienteNombreC").innerText = tokenPaciente.name + " " + tokenPaciente.lastNameP;
  document.getElementById("nomProfileC").innerText = tokenPaciente.name;
  console.log(tokenPaciente);
}

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