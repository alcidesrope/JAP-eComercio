//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = [];
function totalSimple(array) {
  var total = 0
  if (!Array.isArray(array)) {
    if (array.currency == "UYU")
      total = array.unitCost * array.count
    else {
      total = array.unitCost * array.count * 40
    }
    return total
  }
}
function subTotal(array) {
  var total = 0
  array.forEach(element => {
    total += totalSimple(element)
  })
  return total
}
function borrarProduct(id) {
  swal({
    title: "Atención",
    text: "Se borrará un elemento",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      product.splice(id,1);
      let node = document.getElementById("tbody")
      console.log(node)
      node.querySelectorAll('*').forEach(n => n.remove());
      showCartInfo(product);
      swal("El item se ha eliminado satisfactoriamente", {
        icon: "success",
      });
    } else {
      swal("Ha cancelado la eliminacion.");
    }
  });
  
}
function showCartInfo(array) {
  let total = 0;
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let info = array[i];
    if (info.currency == "USD") {
      total += (info.count * info.unitCost) * 40;
    } else {
      total += info.count * info.unitCost;
    }
    htmlContentToAppend += `
      <tr>
          <td>
            <img src="`+ info.src + `" alt="" width="30" height="30">
          </td>
          <td>`+ info.name + `</td>
          <td>`+ info.unitCost + `</td>
          <td>
              <input cost="`+ info.unitCost + `" type="number" min="1" max="100" value="` + info.count + `">
          </td>
          <td class="total" curr="`+ info.currency + `">` + info.currency + ` <span>` + (info.count * info.unitCost) + `</span></td>
          <td><i id="${i}" onclick="borrarProduct(` + i + `)" class="far fa-times-circle"></i></td>
      </tr>
      `
  }
  $("#tablaCarrito tbody").append(htmlContentToAppend);
  /* document.getElementById("algo").innerHTML = htmlContentToAppend; */
  $("#total").val(total);
}
document.addEventListener("DOMContentLoaded", function (e) {
  function logearse() {
    if (localStorage.getItem("userName") == null) {
      window.location.href = "login.html";
    }
  }
  logearse();
  getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data.articles;
      showCartInfo(product);
      var subtoto = document.getElementById("subtotal")
      subtoto.value = subTotal(product);
    }
  });

  $('table').on('change', 'input', function () {
    var cant = $(this).val()
    var cost = $(this).attr("cost")
    var to = cant * cost
    var subto = $(this).closest('tr').children('td.total').children('span')
    var subtoto = $("#subtotal").val()
    var costoenv = parseInt($("#costoenvio").val())
    if ($(this).closest('tr').children('td.total').attr("curr") == "USD") {
      $("#subtotal").val((parseInt(subtoto) - (parseInt(subto.text()) * 40)) + to * 40);
      $("#total").val(costoenv + (parseInt(subtoto) - (parseInt(subto.text()) * 40)) + to * 40);
    } else {
      $("#subtotal").val((parseInt(subtoto) - parseInt(subto.text())) + to);
      $("#total").val(costoenv + (parseInt(subtoto) - parseInt(subto.text())) + to);
    }
    $(this).closest('tr').children('td.total').children('span').text(to)

  });

  document.getElementById("credito").addEventListener("change", function () {
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <fieldset class="was-validated">
      <legend>Datos:</legend>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Titular</span>
        </div>
        <input id="creNombre" type="text" class="validar form-control" aria-label="Username" aria-describedby="basic-addon1" required>
        <div class="valid-feedback">Valido.</div>
        <div class="invalid-feedback">Invalido.</div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">Nro. tarjeta</span>
        </div>
        <input id="creNum" type="number" class="validar form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" required>
        <div class="valid-feedback">Valido.</div>
        <div class="invalid-feedback">Invalido.</div>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">Nro. seguridad</span>
            <input id="creNroSeg" type="number" class="validar form-control" size="3" aria-label="Recipient's username"
              aria-describedby="basic-addon2" required>
              <div class="valid-feedback">Valido.</div>
              <div class="invalid-feedback">Invalido.</div>
          </div>
        </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">Fecha de vencimiento:</span>
        </div>
        <input id="creFecha" type="date" class="validar form-control" id="basic-url" aria-describedby="basic-addon3" required>
        <div class="valid-feedback">Valido.</div>
      <div class="invalid-feedback">Invalido.</div>
      </div>
    </fieldset>
        `
    if ($("#datosPago").children()) {
      $("#datosPago").children().remove();
      $("#datosPago").append(htmlContentToAppend);
    } else {
      $("#datosPago").append(htmlContentToAppend);
    }
  })

  document.getElementById("transferencia").addEventListener("change", function () {
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <fieldset class="was-validated">
      <legend>Datos:</legend>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Numero de cuenta</span>
        </div>
        <input id="trNum" type="number" class="validar form-control" aria-label="Username" aria-describedby="basic-addon1" required>
        <div class="valid-feedback">Valido.</div>
        <div class="invalid-feedback">Invalido.</div>
      </div>

      <div class="input-group">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">Banco</span>
        </div>
        <select id="trBanc" name="cars" class="validar" id="cars" required>
          <option value="vacio">Seleccione</option>
          <option value="bbva">BBVA</option>
          <option value="brou">BROU</option>
          <option value="skotia">SKOTIABANK</option>
        </select>
        <div class="valid-feedback">Valido.</div>
        <div class="invalid-feedback">Invalido.</div>
      </div>

      <div class="input-group">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">Nro Sucursal</span>
          <input id="trNumSu" type="text" class="validar form-control" size="3" aria-label="Recipient's username"
            aria-describedby="basic-addon2" required>
            <div class="valid-feedback">Valido.</div>
            <div class="invalid-feedback">Invalido.</div>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">Nombre del beneficiario:</span>
        </div>
        <input id="trNom" type="text" class="validar form-control" id="basic-url" aria-describedby="basic-addon3" required>
        <div class="valid-feedback">Valido.</div>
        <div class="invalid-feedback">Invalido.</div>
      </div>
      
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">Concepto:</span>
        </div>
        <input id="trCon" type="text" class="validar form-control" id="basic-url" aria-describedby="basic-addon3" required>
        <div class="valid-feedback">Valido.</div>
        <div class="invalid-feedback">Invalido.</div>
      </div>
    </fieldset>
        `
    if ($("#datosPago").children()) {
      $("#datosPago").children().remove();
      $("#datosPago").append(htmlContentToAppend);
    } else {
      $("#datosPago").append(htmlContentToAppend);
    }
  })

  document.getElementById("efectivo").addEventListener("change", function () {
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <fieldset class="was-validated">
      <legend>Datos:</legend>  
      <div class="input-group">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">Red de cobranza</span>
        </div>
        <select id="redRed" name="cars" class="validar" id="cars" required>
          <option value="vacio">Seleccione</option>
          <option value="RedPagos">RedPagos</option>
          <option value="Abitab">Abitab</option>
          <option value="BlaBla">BlaBla</option>
        </select>
        <div class="valid-feedback">Valido.</div>
        <div class="invalid-feedback">Invalido.</div>
      </div>
    </fieldset>`
    if ($("#datosPago").children()) {
      $("#datosPago").children().remove();
      $("#datosPago").append(htmlContentToAppend);
    } else {
      $("#datosPago").append(htmlContentToAppend);
    }
  })

  document.getElementById("modenvio").addEventListener("click", function () {
    var resultInputEnvio = document.querySelectorAll('input[name="envio"]');
    for (let rIE of resultInputEnvio) {
      if (rIE.checked) {
        var selectedValue = rIE;
        break;
      }
    }
    var valAct = parseInt($("#subtotal").val());
    if (selectedValue.value == "standard") {
      let htmlContentToAppend = "";
      htmlContentToAppend = `
        <p>El envio seleccionado es del tipo standar. El valor de este envio es del 5% del subtotal, 
        y tiene una demora de 12 a 15 dias. </p>`
      $("#datoEnvio").children().remove();
      $("#datoEnvio").append(htmlContentToAppend);      
      $("#costoenvio").val(valAct * 0.05);
      $("#total").val(valAct * 1.05);
    } else if (selectedValue.value == "express") {
      let htmlContentToAppend = "";
      htmlContentToAppend = `
        <p>El envio seleccionado es del tipo express. El valor de este envio es del 7% del subtotal, 
        y tiene una demora de 5 a 8 dias. </p>`
      $("#datoEnvio").children().remove();
      $("#datoEnvio").append(htmlContentToAppend);
      $("#costoenvio").val(valAct * 0.07);
      $("#total").val(valAct * 1.07);
    } else {
      let htmlContentToAppend = "";
      htmlContentToAppend = `
        <p>El envio seleccionado es del tipo premium. El valor de este envio es del 15% del subtotal, 
        y tiene una demora de 2 a 5 dias. </p>`
      $("#datoEnvio").children().remove();
      $("#datoEnvio").append(htmlContentToAppend);
      $("#costoenvio").val(valAct * 0.15);
      $("#total").val(valAct * 1.15);
    }
  })
  document.getElementById("modenvio").addEventListener("click", function () {
    var prem = document.getElementById("premium");
    var exp = document.getElementById("express");
    var stan = document.getElementById("standard");
    if (!stan.checked && !exp.checked && !prem.checked) {
      swal("No ha seleccionado!", "Debe seleccionar un metodo de envio!", "error")
    } else {
      swal("Perfecto!", "Metodo de envio seleccionado!", "success")
      $('#metodoenviomodal').modal('hide');
    }
  });
  document.getElementById("modpago").addEventListener("click", function () {
    var cre = document.getElementById("credito");
    var tra = document.getElementById("transferencia");
    var efe = document.getElementById("efectivo");
    if (!cre.checked && !tra.checked && !efe.checked) {
      swal("No ha seleccionado!", "Debe seleccionar una forma de pago!", "error")
    } else if (cre.checked && validCred()) {
      swal("Datos vacios!", "Todos o algun dato faltante!", "error")
    } else if (tra.checked && validTranf()) {
      swal("Datos vacios!", "Todos o algun dato faltante!", "error")      
    } else if (efe.checked && validRed()) {
      swal("Datos vacios!", "Seleccione una red de cobranza!", "error")      
    }
    else {
      swal("Perfecto!", "Forma de pago seleccionado!", "success")
      $('#formadepagomodal').modal('hide');
    }
  });
  document.getElementById("finalizarCompra").addEventListener("click", function(){
    var prem = document.getElementById("premium");
    var exp = document.getElementById("express");
    var stan = document.getElementById("standard");
    var cre = document.getElementById("credito");
    var tra = document.getElementById("transferencia");
    var efe = document.getElementById("efectivo");
    if((!stan.checked && !exp.checked && !prem.checked) || (!cre.checked && !tra.checked && !efe.checked)) {
      swal("Falta metodo de envio y/o forma de pago!", "Debe seleccionar!", "error")
    } else {
      swal("Perfecto!", "Compra realizada!", "success")
      setTimeout(function(){ window.location.href = "index.html"; }, 2000);
      
    }
  })
   function validCred(){
    return ($("#creNombre").val() == "" || $("#creNum").val() == "" || $("#creNroSeg").val() == "" || $("#creFecha").val() == "")
   }
   function validTranf(){
    return ($("#trNum").val() == "" || $("#trBanc").val() == "vacio" || $("#trNumSu").val() == "" || $("#trNom").val() == "" || $("#trCon").val() == "")
   }
   function validRed(){
    return ($("#redRed").val() == "vacio")
   }  
});