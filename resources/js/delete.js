$(function () {
    $(".delete").click(function () {
        Swal.fire({
            title: confirmDelete + $(this).data("id") + "??",
            text: infoDelete,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "NIE",
            confirmButtonText: "Tak, usuń to!",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    method: "DELETE",
                    url: deleteUrl + $(this).data("id"),
                })
                    .done(function (data) {
                        window.location.reload();
                    })
                    .fail(function (data) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: data.responseJSON.message,
                        });
                    });
            }
        });
    });
});
