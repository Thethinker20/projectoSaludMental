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
    getPacientesAdmin();
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

/*function getPacientesAdmin() {
    $.ajax({
      url: "/all-data",
      method: "get",
      success: function (response) {
        table = $("#tablePacientes").DataTable({
          responsive:true,
          data: response,
          columns: [
            { data: "username" },
            { data: "citation" },
            { data: "name" },
            { data: "lastNameP" },
            { data: "lastNameM" },
            { data: "address" },
            { data: "age" },
            { data: "date" },
            { data: "time" },
          ],
          bLengthChange: false,
          pageLength: 10,
          bInfo: false,
          bAutoWidth: false,
          order: [[2, "asc"]],
          columnDefs: [
            { width: '12%', targets: 4 },
            { width: '10%', targets: 7 }
        ],
        });
      },
      error: function (response) {
        alert("server error");
      },
    });
  }
*/
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