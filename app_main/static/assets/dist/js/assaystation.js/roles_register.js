$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('roles_register')) {
        $("form#roles_register").on('submit', function () {
            const roles_name = $("#roles_name");
            const description = $("#description");

            let status = true;
            const formData = new FormData();

            if (roles_name.val() === "") {
                roles_name.addClass('is-invalid');
                status = false;
            } else {
                roles_name.removeClass('is-invalid');
                formData.append('permissions', roles_name.val());
            }

            if (description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            } else {
                description.removeClass('is-invalid');
                formData.append('description', description.val());
            }
             if( status){
                $.ajax({
                    url: '/#/',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()},
                    success: function (data) {
                        if (data.code === 201) {
                            alert(data.data)
                        }
                    }
                })
            }


        }
    )}
})
