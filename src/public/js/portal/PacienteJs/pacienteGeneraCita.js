$(document).ready(function () {
    getPacienInfo();
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
  document.getElementById("pacienteNombreC").innerText =
    tokenPaciente.name + " " + tokenPaciente.lastNameP;
  document.getElementById("nomProfileC").innerText = tokenPaciente.name;
  console.log(tokenPaciente)
}

$('#weekend_date').datepicker({
    daysOfWeekDisabled: [0, 6],
    orientation: 'bottom'
});

$("#weekend_date").datepicker().datepicker('setDate', new Date());

$("#btnCEnv").on('click', function(){
    const newDate = document.getElementById("weekend_date").value;
    const newTime = document.getElementById("newTime").value; 
    const pacieName = tokenPaciente.name;
    const pacieEmail = tokenPaciente.email;
    
    let data = {
        newDate: newDate,
        pacieName: pacieName,
        pacieEmail: pacieEmail,
        newTime: newTime,
      };
      let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const promise = fetch("/changeDateTime", options)
        .then((res) => res.json())
        .then((data) => {
          console.log("yess")
          if(data.status == "202"){
            Swal.fire({
                icon: "success",
                text: data.msg,
              });
          }
        });
})