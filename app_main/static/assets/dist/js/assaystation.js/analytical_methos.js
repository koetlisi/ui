$(document).ready(function () {
    const currentPath = window.location.pathname;

    if (currentPath.includes('analytical_methods')) {
        $("form#analyticalmethod").on('submit', function (event) {
            event.preventDefault();

            const name = $("#name");
            const description = $("#description");
            const report = document.getElementById('notes');
            const reportFiles = report.files;
            let status = true;

            const formData = new FormData();

            if (reportFiles.length === 0) {
                toastr.info('Please attach a report');
                status = false;
            } else {
                for (let i = 0; i < reportFiles.length; i++) {
                    formData.append('notes', reportFiles[i]);
                }
            }

            if (name.val() === "") {
                name.addClass('is-invalid');
                status = false;
            } else {
                name.removeClass('is-invalid');
                formData.append('name', name.val());
            }

            if (description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            } else {
                description.removeClass('is-invalid');
                formData.append('description', description.val());
            }

            if (status) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/analytical-method-registration/', true);
                const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
                xhr.setRequestHeader('X-CSRF-Token', csrfToken);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            alert(xhr.responseText);
                        } else {
                            alert(xhr.responseText);
                        }
                    }
                };
                xhr.send(formData);
            }
        });
    }
});
