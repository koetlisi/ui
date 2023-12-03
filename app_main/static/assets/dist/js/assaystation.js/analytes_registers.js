$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('analytes_register')) {

        $("form#analytes_register").on('submit', function () {
            const name = $("#analytes_name");
            const chem_name = $("#chemical_name");

            let status = true;

            if (name.val() === "") {
                name.addClass('is-invalid');
                status = false;
            } else {
                name.removeClass('is-invalid');
            }

            if (chem_name.val() === "") {
                chem_name.addClass('is-invalid');
                status = false;
            } else {
                chem_name.removeClass('is-invalid');

            }
            if( status){
                //alert('analyte name: ' + name.val() +
                //    '\nchemical name: ' + chem_name.val()
                //)
                const formData = new FormData;

                formData.append('name', name.val());
                formData.append('chemical_name', chem_name.val());
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/analyte-registration/', true);
                const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
                xhr.setRequestHeader('X-CSRF-Token', csrfToken);
                xhr.send(formData);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText)
                            if(response.code === 511){
                                window.location.reload()
                            }
                        } else {
                            const response = JSON.parse(xhr.responseText)
                            alert(response.code);
                        }
                    }
                }
            }


        }
    )}
})
