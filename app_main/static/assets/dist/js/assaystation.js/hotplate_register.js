$(document).ready(function () {
    const currentPath = window.location.pathname;


    if (currentPath.includes('hotplate_register')) {
        $("form#hotplateform").on('submit', function (event) {

            event.preventDefault();
            const formData = new FormData();
            const equipmentype = $("#equipmentype");
            const serialnumber = $("#serialNumber");
            const hotplatemodel = $("#hotplatemodel");
            const location = $("#location");
            const description = $("#description");
            const interval = $("#interval");
            const units = $("#units");
            const supplier = $("#supplier");
            const maxtemp = $("#maxtemp");
            const tempunits = $("#tempunits");
            const  purchasedate = $("#purchasedate");
            const comdate = $("#commissionDate");




            const calibrationdoc = document.getElementById('calibrationDoc');
            const calibrationdocFile = calibrationdoc.files;

            const usermanual = document.getElementById('usermanual');
            const usermanualFile = calibrationdoc.files;

            let status = true;

            if(purchasedate.val()===''){
                purchasedate.addClass('is-invalid');
                status = false;
            }else{
                purchasedate.removeClass('is-invalid');
                formData.append('purchasedate', purchasedate.val())
            }
            if(comdate.val()===""){
                 comdate.addClass('is-invalid');
                 status = false;
            }else{
                comdate.removeClass('is-invalid');
                formData.append('comdate', comdate.val())
            }


            if (maxtemp.val() === ""){
                maxtemp.addClass('is-invalid');
                status = false;
            }else{
                maxtemp.removeClass('is-invalid');
                formData.append('maxtemp',maxtemp.val());
            }

            if (tempunits.val() === ""){
                tempunits.addClass('is-invalid');
                status = false;
            }else{
                tempunits.removeClass('is-invalid');
                formData.append('maxtemp',tempunits.val());
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
                formData.append('balance_name', equipmentype.val());
            }

            if (serialnumber.val() === "") {
                serialnumber.addClass('is-invalid');
                status = false;
            } else {
                serialnumber.removeClass('is-invalid');
                formData.append('serial_num', serialnumber.val());
            }

            if (hotplatemodel.val() === "") {
                hotplatemodel.addClass('is-invalid');
                status = false;
            } else {
                hotplatemodel.removeClass('is-invalid');
                formData.append('model', ba.val());
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
