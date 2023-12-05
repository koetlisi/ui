$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('storage_register')) {
        $("form#storage_register").on('submit', function () {
            const storage_name = $("#storage_name");
            const storagetype = $("#storagetype");
            const labid = $("#labid");

            let status = true;
             const formData = new FormData;
            if (storage_name.val() === "") {
                storage_name.addClass('is-invalid');
                status = false;
            } else {
                storage_name.removeClass('is-invalid');
                formData.append('storage_name', storage_name.val());
            }

            if (storagetype.val() === "") {
                storagetype.addClass('is-invalid');
                status = false;
            } else {
                storagetype.removeClass('is-invalid');
                formData.append('storagetype', storagetype.val())
            }

            if (labid.val() === "") {
                labid.addClass('is-invalid');
                status = false;
            } else {
                labid.removeClass('is-invalid');
                formData.append('labid', labid.val());
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
