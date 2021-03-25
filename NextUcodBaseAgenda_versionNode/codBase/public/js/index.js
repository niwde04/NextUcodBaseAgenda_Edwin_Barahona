function validarUsuario() {
    var Usuario = $('#user');
    var Password = $('#pass');

    if (Usuario.val() != "" && Password.val() != "") {

        $.ajax({
             url: '/login',
             method: 'POST',
             contentType: "application/json",
             dataType: "json",
             data: JSON.stringify({
                 usuario: Usuario.val(),
                 password: Password.val()
             }),
             success: function(res) {

                 let authorize = (JSON.stringify(res.success))
                 
                 if (authorize) {
                     window.location.href = "http://localhost:3000/main.html";
                 }
             }
         }) 


    } else {
        alert("Complete todos los campos");
    }
}

$( document ).ready(function() {
    alert("Usuario: edwin, Password: 1234");
});


$("#login").click(function () {
    console.log('click')
    validarUsuario()
})