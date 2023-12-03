$(document).ready(function () {
    const currentPath = window.location.pathname;

    if (currentPath.includes('balance_register')) {
        $("form#balanceform").on('submit', function (event) {
            event.preventDefault();
            const formData = new FormData();
            const equipmentype = $("#equipmentype");
            const serialnumber = $("#serialNumber");
            const balancemodel = $("#balancemodel");
            const maxweight = $("#maxweight");
            const maxunits = $("#maxunits");
            const minweight = $("#minweight");
            const minunits = $("#minunits");
            const location = $("#location");
            const description = $("#description");
            const interval = $("#interval");
            const units = $("#units");
            const supplier = $("#supplier");
            const calibrationdoc = document.getElementById('calibrationDoc');
            const calibrationdocFile = calibrationdoc.files;
            const usermanual = document.getElementById('usermanual');
            const usermanualFile = calibrationdoc.files;
            let status = true;
            const purchasedate = $("#purchasedate");
            if(purchasedate.val() === ""){
                purchasedate.addClass('is-invalid');
                status = false;
            }else {
                purchasedate.removeClass('is-invalid');
                formData.append('purchase_date',purchasedate.val());
            }
            const commissionDate = $("#commissionDate");
            if(commissionDate.val() === ""){
                commissionDate.addClass('is-invalid');
                status = false;
            }else{
                commissionDate.removeClass('is-invalid');
                formData.append('commission_date',commissionDate.val());
            }
            if (maxweight.val() === "") {
                maxweight.addClass('is-invalid');
                status = false;
            } else {
                maxweight.removeClass('is-invalid');
            }

            if (minweight.val() === "") {
                minweight.addClass('is-invalid');
                status = false;
            } else {
                minweight.removeClass('is-invalid');

            }
            function handleFileUpload(files, fieldName) {
                if (files.length === 0) {
                    toastr.info(`Please attach ${fieldName}`);
                    status = false;
                } else {
                    for (let i = 0; i < files.length; i++) {
                        formData.append(fieldName, files[i]);
                    }
                }
            }
            handleFileUpload(calibrationdoc.files, 'calibration_cert');
            handleFileUpload(usermanual.files, 'user_manual');
            if (interval.val() === "") {
                interval.addClass('is-invalid');
                status = false;
            } else {
                interval.removeClass('is-invalid');
                formData.append('balance_name', interval.val());
            }

            if (supplier.val() === "") {
                supplier.addClass('is-invalid');
                status = false;
            } else {
                supplier.removeClass('is-invalid');
                formData.append('supplier', supplier.val());
            }

            if (units.val() === "") {
                units.addClass('is-invalid');
                status = false;
            } else {
                units.removeClass('is-invalid');
                formData.append('balance_name', units.val());
            }

            if (equipmentype.val() === "") {
                equipmentype.addClass('is-invalid');
                status = false;
            } else {
                equipmentype.removeClass('is-invalid');
                formData.append('equipment_id', equipmentype.val());
            }

            if (serialnumber.val() === "") {
                serialnumber.addClass('is-invalid');
                status = false;
            } else {
                serialnumber.removeClass('is-invalid');
                formData.append('serial_num', serialnumber.val());
            }

            if (balancemodel.val() === "") {
                balancemodel.addClass('is-invalid');
                status = false;
            } else {
                balancemodel.removeClass('is-invalid');
                formData.append('model', balancemodel.val());
            }


            if (location.val() === "") {
                location.addClass('is-invalid');
                status = false;
            } else {
                location.removeClass('is-invalid');
                formData.append('location', location.val());
            }

            if (description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            } else {
                description.removeClass('is-invalid');
                formData.append('description', description.val());
            }

            if (minunits.val() === "") {
                minunits.addClass('is-invalid');
                status = false;
            } else {
                minunits.removeClass('is-invalid');
                formData.append('description', minunits.val());
            }
            if (maxunits.val() === "") {
                maxunits.addClass('is-invalid');
                status = false;
            }else{
                maxunits.removeClass('is-invalid');
            }
            formData.append('max_weight', maxweight.val()+'.'+maxunits.val());
            formData.append('min_weight', minweight.val()+'.'+minunits.val());
            if (status) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/balance-registration/', true);
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
