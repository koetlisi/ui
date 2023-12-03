$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('analyte_units_register')) {

        $("form#AnalyteUnitsForm").on('submit', function () {
            const name = $("#full_name");
            const shortForm = $("#short_form");

            let status = true;

            if (name.val() === "") {
                name.addClass('is-invalid');
                status = false;
            } else {
                name.removeClass('is-invalid');
            }

            if (shortForm.val() === "") {
                shortForm.addClass('is-invalid');
                status = false;
            } else {
                shortForm.removeClass('is-invalid');

            }
            if( status){
                const formData = new FormData;


                formData.append('name', name.val());
                formData.append('shot_name', shortForm.val());
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/analyte-unit-registration/', true);
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


        }
    )}
})
