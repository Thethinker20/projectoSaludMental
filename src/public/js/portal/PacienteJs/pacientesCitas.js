$(document).ready(function () {
  getPacienInfoC();
  $("#cita-content").hide();
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
$(document).bind("contextmenu", function (e) {
  e.preventDefault();
});

$(document).keydown(function (e) {
  if (e.which === 123) {
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

$('.toggle-sidebar').click(function (e) {
  $('.main-sidebar').toggleClass('open');
});

var tokenPInfo;

function getPacienInfoC() {
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
  tokenPInfo = JSON.parse(jsonPayload);
  document.getElementById("pacienteNombreC").innerText =
    tokenPInfo.name + " " + tokenPInfo.lastNameP;
  document.getElementById("nomProfileC").innerText = tokenPInfo.name;
}

var pagoStatus = "";
var citaStatus = "";
var citaData = [];

function checkCitas(){
  var citaId = tokenPInfo.cita;
  var citaOneId = citaId[citaId.length - 1];
  let data = {
    idCita: citaOneId,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const promise = fetch("/getCitaById", options)
    .then((res) => res.json())
    .then((data) => {
      citaData = data;
      citaStatus = citaData.bonoCita;
      console.log(citaStatus)
    });
}

$("#citaButton").on("click", function () {
  checkPago();
  checkCitas();
console.log(citaStatus)
  if(pagoStatus == undefined || citaStatus == undefined){
    Swal.fire({
      icon: "error",
      title: "Perdon..",
      text: "Tu consulta un no ha sido creado, porfavor volver cuando consigues un correo de creado.",
    });
  }else if(citaStatus == "Bono"){
    $("#cita-content").show();
    document.getElementById("pDia").innerText = citaData.date;
    document.getElementById("pHorario").innerText = citaData.time;
    document.getElementById("pZlink").innerText = citaData.zoomLink;
    $("#pZlink").on("click", function () {
      window.open(data.zoomLink);
    });
  }else if(pagoStatus == "approved" || citaStatus == "noBono"){
    $("#cita-content").show();
    document.getElementById("pDia").innerText = citaData.date;
    document.getElementById("pHorario").innerText = citaData.time;
    document.getElementById("pZlink").innerText = citaData.zoomLink;
    $("#pZlink").on("click", function () {
      window.open(data.zoomLink);
    });
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Ooops",
      text: "Si aun no has hecho to pago te invitamos a hacer su pago en el inicio de este pagina, si has hecho su pago, contacta su banco para mas información.",
    });
  }
});


function checkPago(){
  var pagosId = tokenPInfo.pagos;
  let data = {
    idPagos: pagosId,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const promise = fetch("/getPagoPaciente", options)
    .then((res) => res.json())
    .then((objArray) => {
      var response = objArray
        .map(function (a) {
          return a.response;
        })
        .toString();
        pagoStatus = response;
    });
}
