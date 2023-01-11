$(function() {
    $('.delete').click(function() {
        Swal.fire({
            title: 'czy na pewno chcesz usunąć użytkownika o id: ' + $(this).data("id") + '?',
            text: "Nie będziesz mógł tego przywrócić!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'NIE',
            confirmButtonText: 'Tak, usuń to!'
          }).then((result) => {
            if (result.isConfirmed) {     
                $.ajax({
                    method: "DELETE",
                    url: deleteUrl + $(this).data("id")
                })  
                .done(function( data ){
                    window.location.reload();
                })   
                .fail(function( data  ){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.responseJSON.message,
                      })
                })    
            }
          })
    });
});