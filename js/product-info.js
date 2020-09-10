var product = {};
var nuevoComent = {};
var comments = [];
var user = [];

function showProductInfo(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
function showComments(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        htmlContentToAppend += `
        <div class="container">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-2">
                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                <p class="text-secondary text-center">`+ comment.dateTime + `</p>
              </div>
              <div class="col-md-10">
                <p>
                  <a class="float-left"
                    href="#"><strong>` + comment.user + `</strong></a>
                    <em>
                        <span class="float-right fa fa-star"></span>
                        <span class="float-right fa fa-star"></span>
                        <span class="float-right fa fa-star"></span>
                        <span class="float-right fa fa-star"></span>
                        <span class="float-right fa fa-star"></span>
                    </em>
                </p>
                <div class="clearfix"></div>
                <p>`+ comment.description + `</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        `

        document.getElementById("productComments").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {    
    var idURL = window.location.search;
    var regex = /\d+/g;
    var string = idURL;
    var matches = string.match(regex);
    var url = PRODUCTS_AWS_URL + matches[0];

    console.log(matches)

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {

            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCountHTML = document.getElementById("productSoldCount");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + ` ` + product.cost;
            productCategoryHTML.innerHTML = product.category;
            productSoldCountHTML.innerHTML = product.soldCount;

            showProductInfo(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showComments(comments);
            for (let i = 0; i < comments.length; i++) {
                let comentario = comments[i];
                let score = comentario.score;
                for (j = 0; j < score; j++) {
                    document.getElementsByTagName("em")[i].getElementsByTagName("span")[j].classList.add("checked");
                };
            };
            var indi = comments.length;

        }

    });
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            rprod = product.relatedProducts;
            let htmlContentToAppend = "";
            for (let i = 0; i < rprod.length; i++) {
                var prod = products[rprod[i]];
                console.log(prod);
                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + prod.imgSrc + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ prod.name + `</h4>
                                <small class="text-muted">Precio ` + prod.currency + ` ` + prod.cost + ` </small>
                            </div>
                            <p class="mb-1">` + prod.description + `</p>
                        </div>
                    </div>
                </a>
                `

                /* var node = document.createElement("div");
                var footer = document.getElementById("footer");
                footer.insertBefore(node, footer.childNodes[0]); */
                document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
            }
        }

    });
    function logearse() {
        if (localStorage.getItem("userName") == null) {
            window.location.href = "login.html";
        }
    }
    logearse();
    var star1 = document.getElementById("one");
    var star2 = document.getElementById("two");
    var star3 = document.getElementById("three");
    var star4 = document.getElementById("four");
    var star5 = document.getElementById("five");
    var coment = new Object();
    star1.addEventListener("click", function () {
        star1.classList.add("checked");
        star2.classList.remove("checked");
        star3.classList.remove("checked");
        star4.classList.remove("checked");
        star5.classList.remove("checked");
        coment.score = 1;
    });
    star2.addEventListener("click", function () {
        star1.classList.add("checked");
        star2.classList.add("checked");
        star3.classList.remove("checked");
        star4.classList.remove("checked");
        star5.classList.remove("checked");
        coment.score = 2;
    });
    star3.addEventListener("click", function () {
        star1.classList.add("checked");
        star2.classList.add("checked");
        star3.classList.add("checked");
        star4.classList.remove("checked");
        star5.classList.remove("checked");
        coment.score = 3;
    });
    star4.addEventListener("click", function () {
        star1.classList.add("checked");
        star2.classList.add("checked");
        star3.classList.add("checked");
        star4.classList.add("checked");
        star5.classList.remove("checked");
        coment.score = 4;
    });
    star5.addEventListener("click", function () {
        star1.classList.add("checked");
        star2.classList.add("checked");
        star3.classList.add("checked");
        star4.classList.add("checked");
        star5.classList.add("checked");
        coment.score = 5;
    });
    star1.onblur = function () {
        star1.classList.remove("checked");
    };
    star2.onblur = function () {
        star2.classList.remove("checked");
    };
    star3.onblur = function () {
        star3.classList.remove("checked");
    };
    star4.onblur = function () {
        star4.classList.remove("checked");
    };
    star5.onblur = function () {
        star5.classList.remove("checked");
    };
    const correo = localStorage.getItem("userName");
    var i = 0;
    while (correo[i] != "@") {
        user += correo[i];
        i++;
    };
    document.getElementById("usuarioComent").innerHTML = `<strong>` + user.toUpperCase() + `</strong>`;
    document.getElementById("comentar").addEventListener("click", function () {
        var date = new Date();
        var fecha = "";
        fecha = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        var descri = document.getElementById("comentario").value;
        coment.description = descri;
        coment.user = user.toUpperCase();
        coment.dateTime = fecha;
        if (coment.score != undefined && coment.description != "") {
            comments.push(coment);
            console.log(coment);
            console.log(comments)
            showComments(comments);
            for (let i = 0; i < comments.length; i++) {
                let comentario = comments[i];
                let score = comentario.score;
                for (j = 0; j < score; j++) {
                    document.getElementsByTagName("em")[i].getElementsByTagName("span")[j].classList.add("checked");
                };
                limpiar(document.getElementById("comentario"));
                star1.classList.remove("checked");
                star2.classList.remove("checked");
                star3.classList.remove("checked");
                star4.classList.remove("checked");
                star5.classList.remove("checked");

            };
        } else {
            alert("Debe ingresar una puntuacion y un comentario")
        };


    });

    function limpiar(input) {
        input.value = "";
    };

});

