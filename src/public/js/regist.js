// Preloader
$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

$("#txtNewPassword").change(function () {
  var password = $("#txtNewPassword").val();
  if (password.length <= 7) {
    $("#CheckPasswordMatch1")
      .html("¡La contraseña debe ser mas de 8 letras!")
      .addClass("text-danger");
  } else {
    $("#CheckPasswordMatch1")
      .html("¡La contraseña es correcta!")
      .addClass("text-primary");
  }
});

//Confirma contraseña
$("#txtConfirmPassword").change(function () {
  var password = $("#txtNewPassword").val();
  var confirmPassword = $("#txtConfirmPassword").val();
  if (password != confirmPassword)
    $("#CheckPasswordMatch")
      .html("¡La contraseña no coincide!")
      .addClass("text-danger");
  else
    $("#CheckPasswordMatch")
      .html("Contraseña coincidencia.")
      .addClass("text-primary");
});

//Carga pais estado y ciudad
$.ajax({
  url: "/json/countries+states+cities.json",
  method: "get",
  success: function (response) {
    $.each(response.country, function (index, value) {
      var country_id;
      var state_id;
      var city_id;

      $("#country").append(
        '<option rel="' +
          index +
          '" value="' +
          value.id +
          '">' +
          value.name +
          "</option>"
      );

      $("#country").change(function () {
        $("#state, #city").find("option:gt(0)").remove();

        country_id = $(this).find("option:selected").attr("rel");

        $.each(response.country[country_id].states, function (index1, value1) {
          $("#state").find("option:first").text("Seleccione un estado");
          $("#state").append(
            '<option rel="' +
              index1 +
              '" value="' +
              value1.id +
              '">' +
              value1.name +
              "</option>"
          );
        });
      });

      $("#state").change(function () {
        $("#city").find("option:gt(0)").remove();

        state_id = $(this).find("option:selected").attr("rel");

        $.each(
          response.country[country_id].states[state_id].cities,
          function (index2, value2) {
            $("#city").find("option:first").text("Seleccione un ciudad");
            $("#city").append(
              '<option rel="' +
                index2 +
                '" value="' +
                value2.id +
                '">' +
                value2.name +
                "</option>"
            );
          }
        );
      });
    });
  },
  error: function (err) {
    alert("server error", err);
  },
});

const form = document.getElementById("formControl");
form.addEventListener("submit", registerUser);

var county1;
var city1;
var state1;

async function registerUser(event) {
  
  const selcou = document.getElementById("country");
  const selsta = document.getElementById("state");
  const selci = document.getElementById("city");
  

  event.preventDefault();
  const citation = document.getElementById("citation").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("txtNewPassword").value;
  const confirmpassword = document.getElementById("txtConfirmPassword").value;
  const name = document.getElementById("name").value;
  const lastNameM = document.getElementById("lastNameM").value;
  const lastNameP = document.getElementById("lastNameP").value;
  const address = document.getElementById("direction").value;
  const country = selcou.options[selcou.selectedIndex].text; 
  const state = selsta.options[selsta.selectedIndex].text;
  const city = selci.options[selci.selectedIndex].text;

  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const motivConsult = document.getElementById("motivConsult").value;
  const evaSalud = document.getElementById("evaSalud").value;
  const soluProb = document.getElementById("soluProb").value;

  const result = await fetch("/registerForm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      citation,
      username,
      password,
      confirmpassword,
      name,
      lastNameM,
      lastNameP,
      address,
      country,
      state,
      city,
      email,
      age,
      date,
      time,
      motivConsult,
      evaSalud,
      soluProb
    }),
  }).then((res) => res.json());

  if (result.status === "ok") {
    // everythign went fine
    window.location.replace("/succesful");
  } else {
    alert(result.error);
  }
}