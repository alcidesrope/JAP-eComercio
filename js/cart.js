//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  function logearse() {
    if (localStorage.getItem("userName") == null) {
      window.location.href = "login.html";
    }
  }

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
  function showCartInfo(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
      let info = array[i];

      htmlContentToAppend += `
        <tr>
            <td>
              <img src="`+ info.src + `" alt="" width="30" height="30">
            </td>
            <td>`+ info.name + `</td>
            <td>`+ info.unitCost + `</td>
            <td>
                <input cost="`+ info.unitCost + `" type="number" min="1" max="100" value="`+ info.count + `">
            </td>
            <td class="total" curr="`+ info.currency +`">`+ info.currency + ` <span>` + (info.count * info.unitCost) + `</span></td>
        </tr>
        `
      $("#tablaCarrito tbody").append(htmlContentToAppend);
    }
  }
  logearse();
  getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data.articles;
      console.log(product)
      showCartInfo(product);
      var subtoto = document.getElementById("subtotal")      
      subtoto.value = subTotal(product);
    }
  });
  $('table').on('change', 'input', function () {
    var cant = $(this).val()
    var cost = $(this).attr("cost")
    var to = cant*cost
    var subto = $(this).closest('tr').children('td.total').children('span')
    var subtoto = $("#subtotal").val()
    if( $(this).closest('tr').children('td.total').attr("curr") == "USD"){
      $("#subtotal").val((parseInt(subtoto)- (parseInt(subto.text())*40))+to*40)
    } else{
      $("#subtotal").val((parseInt(subtoto)- parseInt(subto.text()))+to)
    }
    $(this).closest('tr').children('td.total').children('span').text(to)
    
  });
});