$(document).ready(function () {
    const currentPath = window.location.pathname;
   if (currentPath.includes('sample_prep_methods')) {
        $("form#samplePrepMethod").on('submit', function () {
            const name = $("#name");
            const description = $("#description");
            const file = document.getElementById('report');
            const reports = file.files
            let  status = true;
            const formData =  new FormData();
            if (reports.length === 0) {
                toastr.info('please attach report');
                status = false;
            }else{
                for (let i = 0; i < reports.length; i++) {
                    formData.append('notes', reports[i]);
                }
            }
            if (name.val() === "") {
                name.addClass('is-invalid');
                status = false;
            } else {
                name.removeClass('is-invalid');
            }

            if (description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            } else {
                description.removeClass('is-invalid');

            }
            if (status) {
                formData.append('name', name.val());
                formData.append('description', description.val());
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/sample-preparation-method-registration/', true);
                const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
                xhr.setRequestHeader('X-CSRF-Token', csrfToken);
                xhr.send(formData);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            alert(xhr.responseText);
                        } else {
                            alert(xhr.responseText);
                        }
                    }
                }
            }
        });

    }
})
