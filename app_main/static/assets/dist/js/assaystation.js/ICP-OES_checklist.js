$(document).ready(function () {

    const path = window.location.pathname
    if (path.includes('ICP-OES_checklist')) {

        $("form#icp-oes_form").on('submit', function () {

            const nebuliser = $('#nebuliser');
            const argon = $('#argon');
            const flowrate = $('#flowrate');
            const tubing = document.getElementById('tubing');


            formData = new FormData;
            let status = true;
            let checktubing = false;

            if(tubing.checked){
                formData.append('tubing', checktubing.val());

            }else{
                toastr.info('Please confirm that you have changed tubing');
                status = false;
            }


            if (nebuliser.val() === "") {
                nebuliser.addClass('is-invalid');
                status = false;
            } else {
                nebuliser.removeClass('is-invalid');
                formData.append('nebulizer',nebuliser.val());
            }

            if (argon.val() === "") {
                argon.addClass('is-invalid');
                status = false;
            } else {
                argon.removeClass('is-invalid');
                formData.append('argon', argon.val());
            }

            if (flowrate.val() === "") {
                flowrate.addClass('is-invalid');
                status = false;
            } else {
                flowrate.removeClass('is-invalid');
                formData.append('flowrate', flowrate.val());
            }
            if (status) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/#/', true);
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
            return false;
        });
    }
})