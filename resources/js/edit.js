$(function() {
    $('.edit').click(function() {
        /* Swal.fire('Any fool can use a computer'); */
        window.location.href = "{{ route('products.edit') }}/" + $(this).data("id");

    });
});