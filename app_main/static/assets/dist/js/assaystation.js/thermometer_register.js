$(document).ready(function () {
    const currentPath = window.location.pathname;


    if (currentPath.includes('thermometer_register')) {
        $("form#thermometerform").on('submit', function (event) {

            event.preventDefault();
            const formData = new FormData();
            const thermName = $("#thermName");
            const serialnumber = $("#serialNumber");
            const thermType = $("#thermType");
            const maxtemp = $("#maxtemp");
            const mintemp = $("#mintemp");
            const Accuracytemp = $("#Accuracytemp");
            const location = $("#location");
            const  purchasedate = $("#purchasedate");
            const comdate = $("#commissionDate");
            const interval = $("#interval");
            const units = $("#units");
            const supplier = $("#supplier");
            const description = $("#description");
            const model = $("#model");



            const calibrationdoc = document.getElementById('calibrationDoc');
            const calibrationdocFile = calibrationdoc.files;

            const usermanual = document.getElementById('usermanual');
            const usermanualFile = calibrationdoc.files;

            let status = true;



            if(thermName.val()===''){
                thermName.addClass('is-invalid');
                status = false;
            }else{
                thermName.removeClass('is-invalid');
                formData.append('thermName', thermName.val())
            }
            if(serialnumber.val()===""){
                 serialnumber.addClass('is-invalid');
                 status = false;
            }else{
                serialnumber.removeClass('is-invalid');
                formData.append('serialnumber', serialnumber.val())
            }

            if(model.val() === ""){
                model.addClass('is-invalid');
                status = false;
            }else{
                model.removeClass('is-invalid');
                fomrmData.append('model', model);
            }

            if (thermType.val() === ""){
                thermType.addClass('is-invalid');
                status = false;
            }else{
                thermType.removeClass('is-invalid');
                formData.append('thermType',thermType.val());
            }


            if (calibrationdocFile.length === 0) {
                toastr.info('Please attach a calibration Documentation');
                status = false;
            } else {
                for (let i = 0; i < calibrationdocFile.length; i++) {
                    formData.append('calibration_cert', calibrationdoc[i]);
                }
            }

            if (usermanualFile.length === 0) {
                toastr.info('Please attach a manual Documentation');
                status = false;
            } else {
                for (let i = 0; i < usermanualFile.length; i++) {
                    formData.append('user_manual', usermanual[i]);
                }
            }

            if (interval.val() === "") {
                interval.addClass('is-invalid');
                status = false;
            } else {
                interval.removeClass('is-invalid');
                formData.append('interval', interval.val());
            }

            if (maxtemp.val() === "") {
                maxtemp.addClass('is-invalid');
                status = false;
            } else {
                maxtemp.removeClass('is-invalid');
                formData.append('maxtemp', maxtemp.val());
            }

            if (units.val() === "") {
                units.addClass('is-invalid');
                status = false;
            } else {
                units.removeClass('is-invalid');
                formData.append('units', units.val());
            }

            if (mintemp.val() === "") {
                mintemp.addClass('is-invalid');
                status = false;
            } else {
                mintemp.removeClass('is-invalid');
                formData.append('mintemo', mintemp.val());
            }

            if (Accuracytemp.val() === "") {
                Accuracytemp.addClass('is-invalid');
                status = false;
            } else {
                Accuracytemp.removeClass('is-invalid');
                formData.append('accuracyTemp', Accuracytemp.val());
            }

            if (purchasedate.val() === "") {
                purchasedate.addClass('is-invalid');
                status = false;
            } else {
                purchasedate.removeClass('is-invalid');
                formData.append('model', purchasedate.val());
            }

            if (comdate.val() === "") {
                comdate.addClass('is-invalid');
                status = false;
            } else {
                comdate.removeClass('is-invalid');
                formData.append('comdate', comdate.val());
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

            if (supplier.val() === "") {
                supplier.addClass('is-invalid');
                status = false;
            } else {
                supplier.removeClass('is-invalid');
                formData.append('supplier', supplier.val());
            }



            if (status) {
                alert('hello')
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
        });
    }
});
