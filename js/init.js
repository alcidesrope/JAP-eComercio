const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCTS_AWS_URL = "http://ec2-18-191-222-30.us-east-2.compute.amazonaws.com:3000/product/";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  const correo = localStorage.getItem("userName");
  var user = [];
  var i = 0;
  if (localStorage.getItem("userName") == "") {
    document.getElementById("userName").remove
    document.getElementById("login").removeAttribute
  } else {
    while (correo[i] != "@") {
      user += correo[i];
      i++;
    }
    document.getElementById("userName").innerHTML = `<i class="far fa-user"></i> ` + user.toUpperCase();
    //addElement ();
  }  
  
  document.getElementById("cerrarSesion").addEventListener("click", function(){
    localStorage.removeItem("userName");
    window.location.href = "login.html";
  })
});

/*function addElement () { 
  // crea un nuevo a 
  // y añade contenido 
  var newa = document.createElement("a"); 
  var newContent = document.createTextNode("Probando"); 
   //añade texto al a creado. 
   newa.appendChild(newContent);
  // añade el elemento creado y su contenido al DOM 
  var currenta = document.getElementById("div1");
  document.body.insertBefore(newa, currenta); 
}*/