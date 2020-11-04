const ORDER_ASC_BY_COST = "ASC";
const ORDER_DESC_BY_COST = "DESC";
const ORDER_BY_PROD_COUNT = "Cant.";
var minCost = undefined;
var maxCost = undefined;
var currentProductsArray = [];
var currentSortCriteria = undefined;
var filtro = document.getElementById("filtro");
var cflitro = "";

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            console.log(a.cost, b.cost);
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    let filtrov = filtro.value.toLowerCase();
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        let productN = product.name.toLowerCase().indexOf(filtrov);
        let productD = product.description.toLowerCase().indexOf(filtrov);
        let serch = document.getElementById("filtro").value.toLowerCase();
        console.log(serch);

        if (((minCost == undefined) || (minCost != undefined && product.cost >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && product.cost <= maxCost)) &&
            (filtrov == undefined || productN > -1 || productD > -1)){

            htmlContentToAppend += `
            <a href="product-info.html" class="col list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-12">
                        <img src="` + product.imgSrc + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <small class="text-muted">Precio ` + product.currency + ` ` + product.cost + ` </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
        function idProduct(){
            localStorage.setItem("i", "product.id")
        }
    }

    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las produtos ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj.data)
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = 0;
        document.getElementById("rangeFilterCostMax").value = 0;

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != 0) && minCost >= 0){
            minCost = minCost;
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != 0) && maxCost >= 0){
            maxCost = maxCost;
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
    function logearse(){
        if(localStorage.getItem("userName") == null){
          window.location.href = "login.html";
        }
      }  
    logearse();
    filtro.addEventListener("keyup", showProductsList);
});