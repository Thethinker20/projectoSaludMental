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
  console.log(tokenPInfo);
  document.getElementById("pacienteNombreC").innerText =
    tokenPInfo.name + " " + tokenPInfo.lastNameP;
  document.getElementById("nomProfileC").innerText = tokenPInfo.name;
}

$("#citaButton").on("click", function () {
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

      if (response == "approved") {
        var citaId = tokenPInfo.cita;
        var citaOneId =  citaId[citaId.length - 1]
        console.log(citaId)
        console.log(citaOneId)
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
            $("#cita-content").show();
            console.log(data);
            document.getElementById("pDia").innerText = data.date;
            document.getElementById("pHorario").innerText = data.time;
            document.getElementById("pZlink").innerText = data.zoomLink;
          });
      }else{
        Swal.fire({
          icon: "error",
          title: "Ooops",
          text: "Si aun no has hecho to ago te invitamos a hacer su pago en el inicio de este pagina, si has hecho su pago, contacta su banco para mas información.",
        });
      }
    });
});

