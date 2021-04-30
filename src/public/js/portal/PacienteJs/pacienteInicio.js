$(document).ready(function () {
  getPacienInfo();
  checkPagoyBono();
  $("#moduloPagos").hide();
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

var tokenPaciente;
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
  tokenPaciente = JSON.parse(jsonPayload);
  document.getElementById("pacienteNombre").innerText =
    tokenPaciente.name + " " + tokenPaciente.lastNameP;
  document.getElementById("nomProfile").innerText = tokenPaciente.name;
  document.getElementById("pacienteBienve").innerText =
    "Bienvenidos " + tokenPaciente.name;
}



function checkPagoyBono() {
  var citaId = tokenPaciente.cita;
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
      const bonodata = data.bonoCita;
      if(data.status == "404"){
        Swal.fire({
          icon: "error",
          title: "Perdon...",
          text: "Tu consulta un no ha sido creado, porfavor volver cuando consigues un correo de creado.",
        });
      }
      else{
        var pagosId = tokenPaciente.pagos;
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
              $("#moduloPagos").hide();
            }else{
              var citaId = tokenPaciente.cita;
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
                  const bonodata = data.bonoCita;
                  if(bonodata == "noBono"){
                    $("#moduloPagos").show();
                  }
                });
            }
          });
      }
    });
}
