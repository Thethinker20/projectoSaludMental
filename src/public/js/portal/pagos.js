$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});


var isFactura = false;

$(document).ready(function () {
  getPacienInfo();
  $("#dataFactur").hide();
  $("#iframContent").hide();
  $('input[type="checkbox"]').click(function(){
    if($(this).prop("checked") == true){
      $("#dataFactur").show();
      isFactura = true;
    }
    else if($(this).prop("checked") == false){
      $("#dataFactur").hide();
      isFactura = false;
    }
});
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
  document.getElementById("nombreCliente").innerText = tokenPaciente.name;
  document.getElementById("correoCliente").innerText = tokenPaciente.email;
  document.getElementById("consultCliente").innerText = tokenPaciente.citation;

  console.log(tokenPaciente);
}

$("#realizarPago").on("click", function (e) {
  e.preventDefault();
  const pacienteId = tokenPaciente.id;
  var today = new Date();
  var dd = String(today.getDate()+1).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  const monthName = today.toLocaleString("default", { month: "long" });
  today = dd + "/" + mm + "/" + yyyy;
  const referencia = "PGINTCRI01-" + "SMUM" + ( Math.floor(Math.random() * 1000) + 1) + "-";
  const cantidad = document.getElementById("montoPagoCliente").innerText;
  const fhVigencia = today;
  const email = document.getElementById("correoCliente").innerText;
  const nombre = document.getElementById("nombreCliente").innerText;
  const referenciaC = document.getElementById("consultCliente").innerText;
  const formaPago = document.getElementById("formPago").value;
  const nombreFactura = document.getElementById("nombreFactura").value;
  const RFC = document.getElementById("RFC").value;
  const domicilio = document.getElementById("Domicilio").value;
  const usoCFDI = document.getElementById("usoCFDI").value;
console.log(pacienteId)
  let data = {
    pacienteId: pacienteId,
    reference1P: referencia,
    amountP: cantidad,
    fhVigenciaP: fhVigencia,
    emailP: email,
    nomClienteP: nombre,
    reference2P: referenciaC,
    tipoTarjetaP: formaPago,
    iFacturaP: isFactura,
    nomRFCP: nombreFactura,
    RFCP: RFC,
    usoCFDIP: usoCFDI,
    domicilioP: domicilio,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const promise = fetch("/hacerPagos", options)
  .then(res => res.text())
  .then(data => {
    $("#pagoSection").hide();
    $("#iframContent").show();
    var frame = document.getElementById("iframe");
    frame.src= data;
  })
});
