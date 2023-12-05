$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('office_register')) {
        $("form#OfficeRegistrationForm").on('submit', function () {
            let status = true;
            const formdata = new FormData();

            const name = $("#name");
            const office_num = $("#office_num");
            const contacts = $("#contacts");
            const location = $("#location");
            const description = $("#description");

            const formData = new FormData;
            if (name.val() === "") {
                name.addClass('is-invalid');
                status = false;
            } else {
                name.removeClass('is-invalid');
                formData.append('storage_name', name.val());
            }

            if (office_num.val() === "") {
                office_num.addClass('is-invalid');
                status = false;
            } else {
                office_num.removeClass('is-invalid');
                formData.append('storage_name', office_num.val());
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

            if (description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            } else {
                description.removeClass('is-invalid');
                formData.append('labid', description.val());
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
