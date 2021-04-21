$(document).ready(function () {
  getDoctorsAdmin();
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

$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

//Confirma contraseña
$("#docPassConfirm").change(function () {
  var password = $("#docPass").val();
  var confirmPassword = $("#docPassConfirm").val();
  if (password == confirmPassword) {
    $("#docPassConfirm").addClass("is-valid");
  } else {
    $("#docPassConfirm").addClass("is-invalid");
  }
});

var table;
const form = document.getElementById("doctorsForm");
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();
  const docUsername = document.getElementById("docUsername").value;
  const docPass = document.getElementById("docPass").value;
  const docPassConfirm = document.getElementById("docPassConfirm").value;
  const docNombre = document.getElementById("docNombre").value;
  const docPaterno = document.getElementById("docPaterno").value;
  const docMaterno = document.getElementById("docMaterno").value;
  const docEmail = document.getElementById("docEmail").value;
  const docPuesto = document.getElementById("docPuesto").value;

  console.log(docPass);
  const result = await fetch("/doctorsForm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      docUsername,
      docPass,
      docPassConfirm,
      docNombre,
      docPaterno,
      docMaterno,
      docEmail,
      docPuesto,
    }),
  }).then((res) => res.json());
  if (result.status == "202") {
    Swal.fire({ icon: "success", title: "Listo!", text: result.msg }).then(function () {
      location.reload();
    });
  } else if (result.status == "passError") {
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: result.error,
    });
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: result.error,
    });
  }
}

function getDoctorsAdmin() {
  $.ajax({
    url: "/all-doctors",
    method: "get",
    success: function (response) {
      table = $("#tableDoctores").DataTable({
        data: response,
        columns: [
          { data: "docUsername" },
          { data: "docNombre" },
          { data: "docPaterno" },
          { data: "docMaterno" },
          { data: "docEmail" },
          { data: "docPuesto" },
          {
            data: null,
            className: "center",
            defaultContent: '<div class="text-danger borButton">Borrar</div>',
          },
        ],
        bLengthChange: false,
        bInfo: false,
        bAutoWidth: false,
        order: [[2, "asc"]],
        bPaginate: false,
      });
    },
    error: function (response) {
      alert("server error");
    },
  });
}
$("#tableDoctores tbody").on("click", "tr", function () {
  var tableDataId = table.row(this).data();
  var docId = tableDataId._id;
  let data = {
    idDoc: docId,
  };
  console.log(docId);

  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const promise = fetch("/addDelteTableId", options);
  promise.then((response) => {
    if (response.status == 200) {
      Swal.fire({ icon: "success", title: "Doctor Borrado" }).then(function () {
        location.reload();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: response.error,
      });
    }
  });
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
