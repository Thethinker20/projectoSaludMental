$(document).ready(function () {
  $("#pacieIndivi").hide();
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

//imagenes random en prefil
var images = [
  "/ImagesDash/1.jpeg",
  "/ImagesDash/2.jpeg",
  "/ImagesDash/3.jpeg",
  "/ImagesDash/4.jpeg",
  "/ImagesDash/6.jpeg",
  "/ImagesDash/7.jpeg",
  "/ImagesDash/10.jpeg",
];
$(
  '<img class="fade-in " src="/media' +
    images[Math.floor(Math.random() * images.length)] +
    '">'
).appendTo("#profile-picture");