$(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });
  
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');
  
  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
  });
  
  var tokenEncrypt
  
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", login);
  
  async function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username.substring(0, 2) == "ps") {
      const result = await fetch("/loginDoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then((res) => res.json());
  
      if (result.status === "ok") {
        localStorage.setItem("tokenDoc", result.data);
        window.location.replace("/inicioDoctor");
      }
      if (result.status == "error1") {
        Swal.fire({
          icon: "error",
          title: result.error,
        });
      }
      if (result.status == "error2") {
        Swal.fire({
          icon: "error",
          title: result.error,
        });
      }
    } else {
      const result = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then((res) => res.json());
  
      if (result.status === "ok") {
        if (username == "admin") {
          window.location.replace("/inicioAdmin");
        } else {
          $("#loginContent").hide();
          $("#pacienteContent").show();
          localStorage.setItem("tokenPaciente", result.data);
          window.location.replace("/inicioPacientes");
        }
      }
      if (result.status == "404") {
        Swal.fire({
          icon: "error",
          title: result.error,
        });
      }
      if (result.status == "405") {
        Swal.fire({
          icon: "error",
          title: result.error,
        });
      }
    }
  }
  