$(document).ready(function () {
    /*const downloadButton = document.getElementById('downloadButton');
    const barcodeImage = document.getElementById('barcodeImage');

    window.addEventListener('click', function (event) {
        const modal = document.getElementById('barcodeModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    document.getElementsByClassName('close')[0].addEventListener('click', function () {
        const modal = document.getElementById('barcodeModal');
        modal.style.display = 'none';
    });*/
    const path = window.location.pathname
    if (path.includes('primary_reagent')) {
        $("form#primaryreagent").on('submit', function () {
            const date = $('#expirydate');
            const lotNumber = $('#lot_number');
            const storageLoc = $('#storage_loc');
            const concentration = $('#concentration');
            const supplierId = $('#supplier_id');
            const description = $('#description');
            const name = $('#name1');
            const coa = document.getElementById('coa_files');
            const msds = document.getElementById('msds_files');
            const coafiles = coa.files
            const msdsfiles = msds.files

            let status = true;

            const formData = new FormData();
            if (coafiles.length === 0) {
                toastr.info('Please make sure that the C.O.A file has been attached');
                status = false;
            } else {
                for (let i = 0; i < coafiles.length; i++) {
                    formData.append('coa', coafiles[i]);
                }
            }
            if (msdsfiles.length === 0) {
                toastr.info('Please make sure that the MSDS file has been attached');
                status = false;
            } else {
                for (let i = 0; i < msdsfiles.length; i++) {
                    formData.append('msds', msdsfiles[i]);
                }
            }

            if (date.val() === "") {
                date.addClass('is-invalid');
                status = false;
            } else {
                date.removeClass('is-invalid');
            }

            if (lotNumber.val() === "") {
                lotNumber.addClass('is-invalid');
                status = false;
            } else {
                lotNumber.removeClass('is-invalid');
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

            if (description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            } else {
                description.removeClass('is-invalid');
            }

            if (name.val() === "") {
                name.addClass('is-invalid');
                status = false;
            } else {
                name.removeClass('is-invalid');
            }

            if (status) {
                document.getElementById('button').style.display = 'none';
                formData.append('lot_num', lotNumber.val());
                formData.append('expiry', date.val());
                formData.append('storage', storageLoc.val());
                formData.append('concentration', concentration.val());
                formData.append('description', description.val());
                formData.append('name', name.val());
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/primary-reagent-registration/', true);
                const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
                xhr.setRequestHeader('X-CSRF-Token', csrfToken);
                xhr.send(formData);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);
                            const code = response.code;
                            if (code === 201) {
                                const barcodePath = response.data.barcode_path;
                                toastr.success('Reagent has been registered successfully')
                                /*const modal = document.getElementById('barcodeModal');
                                const barcodeImage = document.getElementById('barcodeImage');
                                barcodeImage.src = "http://localhost:8001/" + barcodePath;
                                modal.style.display = 'block';
                                document.getElementById('button').style.display = 'block';*/
                            }
                        } else {
                            alert(xhr.responseText);
                            document.getElementById('button').style.display = 'block';
                        }
                    }
                }
            }

            return false;
        });
    }
    // Select the <select> element using its ID


})