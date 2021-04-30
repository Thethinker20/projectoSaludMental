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
  loadPacienteInfo();
  loadCitasInfo()
  $.ajax({
    url: "/all-doctors",
    method: "get",
    success: function (response) {
      document.getElementById("cantiDoc").innerHTML = response["length"];
    },
    error: function (response) {
      alert("server error");
    },
  });
});

  /* To Disable Inspect Element */
  // $(document).bind("contextmenu",function(e) {
  //   e.preventDefault();
  //  });
   
  //  $(document).keydown(function(e){
  //      if(e.which === 123){
  //         return false;
  //      }
  //  });

function loadPacienteInfo() {
  $.ajax({
    url: "/all-data",
    method: "get",
    success: function (response) {
      document.getElementById("numPaAdmin").innerHTML = response.length;
    },
    error: function (response) {
      alert("server error");
    },
  });
}

function loadCitasInfo() {
  $.ajax({
    url: "/getAllCitas",
    method: "get",
    success: function (response) {
      document.getElementById("adminCitasT").innerHTML = response["length"];
    },
    error: function (response) {
      alert("server error");
    },
  });
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

$('.toggle-sidebar').click(function (e) {
  $('.main-sidebar').toggleClass('open');
});