
// favourite btn
var favouriteBtn = document.querySelectorAll(".favourite-btn");
if (favouriteBtn) {
    Array.from(document.querySelectorAll(".favourite-btn")).forEach(function (item) {
        item.addEventListener("click", function (event) {
            this.classList.toggle("active");
        });
    });
}