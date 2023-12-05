$(document).ready(function () {
    const currentPath = window.location.pathname;


    if (currentPath.includes('glassware_register')) {
        $("form#glasswareform").on('submit', function (event) {

            event.preventDefault();
            const formData = new FormData();
            let status = true;
            const glassName = $("#glassName");
            const serialnumber = $("#serialNumber");
            const glassType = $("#glassType");
            const maxVol = $("#maxVol");
            const volAccuracy = $("#volAccuracy");
            const location = $("#location");
            const purchasedate = $("#purchasedate");
            const comdate = $("#commissionDate");
            const interval = $("#interval");
            const Calunits = $("#Calunits");
            const supplier = $("#supplier");
            const description = $("#description");



            const calibrationdoc = document.getElementById('calibrationDoc');
            const calibrationdocFile = calibrationdoc.files;

            const usermanual = document.getElementById('usermanual');
            const usermanualFile = calibrationdoc.files;




            if(glassName.val()===''){
                glassName.addClass('is-invalid');
                status = false;
            }else{
                glassName.removeClass('is-invalid');
                formData.append('glassName', glassName.val())
            }
            if(serialnumber.val()===""){
                 serialnumber.addClass('is-invalid');
                 status = false;
            }else{
                serialnumber.removeClass('is-invalid');
                formData.append('serialnumber', serialnumber.val())
            }

            if(glassType.val() === ""){
                glassType.addClass('is-invalid');
                status = false;
            }else{
                glassType.removeClass('is-invalid');
                fomrmData.append('glassType', glassType.val());
            }

            if (maxVol.val() === ""){
                maxVol.addClass('is-invalid');
                status = false;
            }else{
                maxVol.removeClass('is-invalid');
                formData.append('maxVol',maxVol.val());
            }

            if (volAccuracy.val() === ""){
                volAccuracy.addClass('is-invalid');
                status = false;
            }else{
                volAccuracy.removeClass('is-invalid');
                formData.append('volAccuracy',volAccuracy.val());
            }

            if (location.val() === ""){
                location.addClass('is-invalid');
                status = false;
            }else{
                location.removeClass('is-invalid');
                formData.append('location',location.val());
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

            if (Calunits.val() === "") {
                Calunits.addClass('is-invalid');
                status = false;
            } else {
                Calunits.removeClass('is-invalid');
                formData.append('Calunits', Calunits.val());
            }

            if (purchasedate.val() === "") {
                purchasedate.addClass('is-invalid');
                status = false;
            } else {
                purchasedate.removeClass('is-invalid');
                formData.append('purchasedate', purchasedate.val());
            }

            if (comdate.val() === "") {
                comdate.addClass('is-invalid');
                status = false;
            } else {
                comdate.removeClass('is-invalid');
                formData.append('comdate', comdate.val());
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
