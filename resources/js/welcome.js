$(function () {
    $("div.products-count a").click(function (event) {
        event.preventDefault();
        $("a.products-actual-count").text($(this).text());
        getProducts($(this).text());
    });

    $("a#filter-button").click(function (event) {
        event.preventDefault();
        getProducts($("a.products-actual-count").first().text());
    });

    $("button.add-cart-button").click(function (event) {
        event.preventDefault();
        $.ajax({
            method: "POST",
            url: addToCart + $(this).data("id"),
        })

            .done(function (response) {
                Swal.fire({
                    title: "Brawo",
                    text: "Dodałeś przedmiot do koszyka",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Kontynuuj zakupy",
                    confirmButtonText: "Przejdz do koszyka",
                }).then((result) => {
                    if (result.isConfirmed) {
                        alert("dodano");
                    }
                });
            })
            .fail(function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Wystąpił błąd",
                });
            });
    });

    function getProducts(paginate) {
        const form = $("form.sidebar-filter").serialize();
        $.ajax({
            method: "GET",
            url: "/",
            data: form + "&" + $.param({ paginate: paginate }),
        }).done(function (response) {
            $("div#products-wrapper").empty();
            $.each(response.data, function (index, product) {
                const html =
                    '<div class="col-6 col-md-6 col-lg-4 mb-3">' +
                    '            <div class="card h-100 border-0">' +
                    '                <div class="card-img-top">' +
                    '                    <img src="' +
                    getImage(product) +
                    '" class="img-fluid mx-auto d-block" alt="Zdjęcie produktu">' +
                    "                </div>" +
                    '                <div class="card-body text-center">' +
                    '                    <h4 class="card-title">' +
                    product.name +
                    "                    </h4>" +
                    '                    <h5 class="card-price small">' +
                    "                        <i>PLN " +
                    product.price +
                    "</i>" +
                    "                    </h5>" +
                    "                </div>" +
                    '                <button class="btn btn-success btn-sm add-cart-button" data-id="' +
                    product.id +
                    '"><i class="fas fa-cart-plus"></i> Dodaj do koszyka</button>' +
                    "            </div>" +
                    "        </div>";
                $("div#products-wrapper").append(html);
            });
        });
    }

    function getImage(product) {
        if (!!product.image_path) {
            return storagePath + product.image_path;
        }
        return defaultImage;
    }
});
