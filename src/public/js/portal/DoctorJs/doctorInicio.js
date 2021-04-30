$(document).ready(function () {
  getDoctInfo();
  var today = new Date();
  var dd = String(today.getDate()+1).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = dd + "-" + mm + "-" + yyyy;
  document.getElementById('iniPDate').innerText = today;
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

$('.toggle-sidebar').click(function (e) {
  $('.main-sidebar').toggleClass('open');
});

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
  document.getElementById('doctorName').innerText = "Dr. "+tokenDoctor.docNombre+" "+tokenDoctor.docPaterno;
  document.getElementById('docNombreNav').innerText = "Dr. "+tokenDoctor.docNombre;
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
  .then(res => res.json())
  .then(data => {
    table = $("#tablePacientesD").DataTable({
      responsive: true,
      data: data,
      columns: [
        { data: "name" },
        { data: "lastNameP" },
        { data: "age" },
        { data: "date" },
        { data: "time" },
      ],
      filter: false,
      bLengthChange: false,
      bInfo: false,
      bAutoWidth: false,
      order: [[3, "desc"]],
      bPaginate: false,
    });
  })
}