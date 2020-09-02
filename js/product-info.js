var product = {};

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
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
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
        }
        
    });
    function logearse() {
        if (localStorage.getItem("userName") == null) {
            window.location.href = "login.html";
        }
    }
    logearse();
});

