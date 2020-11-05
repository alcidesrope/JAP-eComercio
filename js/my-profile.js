//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function logearse() {
  if (localStorage.getItem("userName") == null) {
    window.location.href = "login.html";
  }
}
function editar_perfil() {
  var btn_edit = document.getElementById("editarPerfil")
  var divfooter = $("#editarfooter")
  var nombre = document.getElementById("nombre")
  var apellido = document.getElementById("apellido")
  var email = document.getElementById("email")
  var cel = document.getElementById("cel")
  var htmlContentToAppend = `
                    <div class="card-footer bg-transparent border-success">
                      <button onclick="guardar()" class="btn btn-primary" id="guardar_cambios"  style="float: right;">Guardar cambios</button>
                    </div> `
  btn_edit.style.display = 'none';
  nombre.removeAttribute("readonly")
  apellido.removeAttribute("readonly")
  email.removeAttribute("readonly")
  cel.removeAttribute("readonly")
  divfooter.append(htmlContentToAppend)
}
function guardar() {
  var btn_edit = document.getElementById("editarPerfil")
  var nombre = document.getElementById("nombre")
  var apellido = document.getElementById("apellido")
  var email = document.getElementById("email")
  var cel = document.getElementById("cel")
  var divfooter = $("#editarfooter")
  var user = new Object();
  if (nombre.value != "" && apellido.value != "" && email.value != "" && cel.value != "") {
    user.nombre = nombre.value
    user.apellido = apellido.value
    user.email = email.value
    user.cel = cel.value
    localStorage.setItem("user", JSON.stringify(user));
    nombre.setAttribute("readonly", "")
    apellido.setAttribute("readonly", "")
    email.setAttribute("readonly", "")
    cel.setAttribute("readonly", "")
    btn_edit.style.display = 'inline';
    divfooter.children().remove();
    swal("¡Perfecto!", "¡Se han editato los datos correctamente!", "success")
  } else {
    swal("Error!", "Debe ingresar todos los datos!", "error")
  }
}
function loadpage() {
  if (localStorage.getItem("user")) {
    var nombre = document.getElementById("nombre")
    var apellido = document.getElementById("apellido")
    var email = document.getElementById("email")
    var cel = document.getElementById("cel")
    var user = JSON.parse(localStorage.getItem("user"));
    nombre.value = user.nombre
    apellido.value = user.apellido
    email.value = user.email
    cel.value = user.cel
  }
}
document.addEventListener("DOMContentLoaded", function (e) {
  logearse();
  loadpage();
  document.getElementById("editarPerfil").addEventListener('click', function () {
    editar_perfil();
  })
});