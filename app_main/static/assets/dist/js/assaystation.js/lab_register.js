$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('lab_register')) {
        $("form#labRegistrationForm").on('submit', function () {
            let status = true;
            const formdata = new FormData();

            const lab_name = $("#lab_name");
            const location = $("#location");
            const contacts = $("#contacts");
            const url = $("#url");
            const labid = $("#labid");
            const logo = document.getElementById("logo");
            const logoFile = logo.files
            
            if(logoFile.length === 0) {
                toastr.info("No logo")
                status = false;
            }{
                for( let i = 0; i < logoFile.length; i++) {
                    formdata.append('logo', logoFile[i]);
                }
            }


             const formData = new FormData;
            if (lab_name.val() === "") {
                lab_name.addClass('is-invalid');
                status = false;
            } else {
                lab_name.removeClass('is-invalid');
                formData.append('storage_name', lab_name.val());
            }

            if (location.val() === "") {
                location.addClass('is-invalid');
                status = false;
            } else {
                location.removeClass('is-invalid');
                formData.append('storagetype', location.val())
            }

            if (contacts.val() === "") {
                contacts.addClass('is-invalid');
                status = false;
            } else {
                contacts.removeClass('is-invalid');
                formData.append('labid', contacts.val());
            }

            if (url.val() === "") {
                url.addClass('is-invalid');
                status = false;
            } else {
                url.removeClass('is-invalid');
                formData.append('labid', url.val());
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
