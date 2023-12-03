$(document).ready(function () {

    const currentPath = window.location.pathname;
    if (currentPath.includes('crms_reagents')) {
        $("form#crm_register").on('submit', () => {
            const lotNumber = $('#lot_number');
            const registeredBy = $('#registered_by');
            const reagentId = $('#reagent_id');
            const storageLoc = $('#storage_loc');
            const concentration = $('#concentration');
            const supplierId = $('#supplier_id');
            const description = $('#description');
            const nistnumber = $('#nist_number');
            const test_method = $('#test_method');
            const expiry_date = $('#expiry_date');
            const coa = document.getElementById('coa_files');
            const msds = document.getElementById('msds_files');
            const coaFiles = coa.files
            const msdsFiles = msds.files
            let status = true;
            const formData = new FormData();

            if(coaFiles.length ===0) {
                toastr.info('Please select a C.O.A file');
                status = false;
            }else{
                for (let i = 0; i < coaFiles.length; i++) {
                    formData.append('coa', coaFiles[i]);
                }
            }
            if(msdsFiles.length ===0) {
                toastr.info('Please select a M.S.D.S file');
                status = false;
            }else{
                 for (let i = 0; i < msdsFiles.length; i++) {
                    formData.append('msds', msdsFiles[i]);
                }
            }
            if (expiry_date.val() === "") {
                expiry_date.addClass('is-invalid');
                status = false;
            } else {
                expiry_date.removeClass('is-invalid');
            }

            if (lotNumber.val() === "") {
                lotNumber.addClass('is-invalid');
                status = false;
            } else {
                lotNumber.removeClass('is-invalid');
            }

            if (nistnumber.val() === "") {
                nistnumber.addClass('is-invalid');
                status = false;
            } else {
                nistnumber.removeClass('is-invalid');
            }

            if (registeredBy.val() === "") {
                registeredBy.addClass('is-invalid');
                status = false;
            } else {
                registeredBy.removeClass('is-invalid');
            }

            if (reagentId.val() === "") {
                reagentId.addClass('is-invalid');
                status = false;
            } else {
                reagentId.removeClass('is-invalid');
            }

            if (storageLoc.val() === "") {
                storageLoc.addClass('is-invalid');
                status = false;
            } else {
                storageLoc.removeClass('is-invalid');
            }

            if (concentration.val() === "") {
                concentration.addClass('is-invalid');
                status = false;
            } else {
                concentration.removeClass('is-invalid');
            }

            if (supplierId.val() === "") {
                supplierId.addClass('is-invalid');
                status = false;
            } else {
                supplierId.removeClass('is-invalid');
            }

            if (test_method.val() === "") {
                test_method.addClass('is-invalid');
                status = false;
            } else {
                test_method.removeClass('is-invalid');
            }

            if(description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            }else{
                description.removeClass('is-invalid');
            }

            if (status) {
                formData.append('lot_num', lotNumber.val());
                formData.append('storage', storageLoc.val());
                formData.append('concentration', concentration.val());
                formData.append('description', description.val());
                formData.append('nist_num', nistnumber.val());
                formData.append('expiry', expiry_date.val());
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/crm-registration/', true);
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
            } else {
                return false;
            }
        }
        );}
});
