$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('permissions_register')) {
        $("form#permissions_register").on('submit', function () {
            const permission_name = $("#permission_name");
            const description = $("#description");

            let status = true;
            const formData = new FormData();

            if (permission_name.val() === "") {
                permission_name.addClass('is-invalid');
                status = false;
            } else {
                permission_name.removeClass('is-invalid');
                formData.append('permissions', permission_name.val());
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
