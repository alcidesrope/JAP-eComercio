//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  var myInputPsw = document.getElementById("psw");
  var myInputUsr = document.getElementById("usrname");
  var info = document.getElementById("info");

  document.getElementById("boton").addEventListener("click", function(){
    if(myInputUsr.value == "" && myInputPsw.value == ""){      
      myInputUsr.style.border = "2px solid red";
      myInputPsw.style.border = "2px solid red";  
      document.getElementById("infoUser").innerHTML="Debe ingresar un correo";
      document.getElementById("infoUser").style.fontSize = "12px";  
      document.getElementById("infoUser").style.fontSize = "12px";
      document.getElementById("infoUser").style.color = "red";
      document.getElementById("infoPsw").innerHTML="Debe ingresar una contraseña";
      document.getElementById("infoPsw").style.fontSize = "12px";  
      document.getElementById("infoPsw").style.color = "red";
      myInputUsr.onblur = function() {
        myInputUsr.style.border = "2px solid red";
      }
      myInputPsw.onblur = function() {
        myInputPsw.style.border = "2px solid red";
      }      
      //alert("Debe ingresar un correo y contraseña");
    }else if (myInputUsr.value == ""){
      myInputUsr.style.border = "2px solid red"; 
      //alert("Debe ingresar un correo");
      myInputPsw.style.border = "1px solid gray"; 
      document.getElementById("infoUser").innerHTML="Debe ingresar un correo";
      document.getElementById("infoUser").style.fontSize = "12px"; 
      document.getElementById("infoUser").style.color = "red";
      document.getElementById("infoPsw").innerHTML="";
      info.style.fontSize = "12px";  
      myInputUsr.onblur = function() {
        myInputUsr.style.border = "2px solid red";
      }     
    } else if(myInputPsw.value == ""){
      myInputPsw.style.border = "2px solid red";
      //alert("Debe ingresar una contraseña");
      myInputUsr.style.border = "1px solid gray";
      document.getElementById("infoPsw").innerHTML="Debe ingresar una contraseña";
      document.getElementById("infoPsw").style.fontSize = "12px";
      document.getElementById("infoUser").innerHTML="";
      document.getElementById("infoPsw").style.color = "red"; 
      myInputPsw.onblur = function() {
        myInputPsw.style.border = "2px solid red";
      } 
    } else if(!ValidateEmail(myInputUsr)){
      myInputPsw.style.border = "1px solid gray";
      myInputUsr.style.border = "2px solid red"; 
      document.getElementById("infoUser").innerHTML="Debe ingresar un correo valido";
      document.getElementById("infoUser").style.fontSize = "12px";
      document.getElementById("infoUser").style.color = "red";
      document.getElementById("infoPsw").innerHTML="";
      myInputUsr.onblur = function() {
        myInputUsr.style.border = "2px solid red";
      } 
    }else {
      index();
      usuario();
    } 
  })
  function usuario() {
    localStorage.setItem("userName", myInputUsr.value);
  }
  myInputUsr.onfocus = function() {
    myInputUsr.style.border = "1px solid gray";
  }
  myInputPsw.onfocus = function() {
    myInputPsw.style.border = "1px solid gray";
  }
  function ValidateEmail(mail) 
    {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))
      {
        return (true)
      }
        //alert("¡El correo es invalido!")
        return (false)
    }
  function index() {
      window.location.href = "index.html";
    }
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  
});