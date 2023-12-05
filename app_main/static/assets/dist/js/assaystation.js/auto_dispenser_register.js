$(document).ready(function () {
    const currentPath = window.location.pathname;


    if (currentPath.includes('auto_dispenser_register')) {
        $("form#dispensorform").on('submit', function (event) {

            event.preventDefault();
            const formData = new FormData();
            let status = true;
            const dispensertype = $("#dispensertype");
            const serialnumber = $("#serialNumber");
            const dispensermodel = $("#dispensermodel");
            const Maxcapability = $("#Maxcapability");
            const maxunits = $("#maxunits");
            const mincapability = $("#mincapability");
            const minunits = $("#minunits");
            const AccuracyDisp = $("#AccuracyDisp");
            const location = $("#location");
            const purchasedate = $("#purchasedate");
            const comdate = $("#commissionDate");
            const interval = $("#interval");
            const Calunits = $("#Calunits");
            const supplier1 = $("#supplier1");
            const description = $("#description");



            const calibrationdoc = document.getElementById('calibrationDoc');
            const calibrationdocFile = calibrationdoc.files;

            const usermanual = document.getElementById('usermanual');
            const usermanualFile = calibrationdoc.files;




            if(dispensertype.val()===''){
                dispensertype.addClass('is-invalid');
                status = false;
            }else{
                dispensertype.removeClass('is-invalid');
                formData.append('dispensertype', dispensertype.val())
            }
            if(serialnumber.val()===""){
                 serialnumber.addClass('is-invalid');
                 status = false;
            }else{
                serialnumber.removeClass('is-invalid');
                formData.append('serialnumber', serialnumber.val())
            }

            if(dispensermodel.val() === ""){
                dispensermodel.addClass('is-invalid');
                status = false;
            }else{
                dispensermodel.removeClass('is-invalid');
                fomrmData.append('model', dispensermodel.val());
            }

            if (Maxcapability.val() === ""){
                Maxcapability.addClass('is-invalid');
                status = false;
            }else{
                Maxcapability.removeClass('is-invalid');
                formData.append('dispensertype',dispensertype.val());
            }

            if (maxunits.val() === ""){
                maxunits.addClass('is-invalid');
                status = false;
            }else{
                maxunits.removeClass('is-invalid');
                formData.append('maxunits',maxunits.val());
            }

            if (mincapability.val() === ""){
                mincapability.addClass('is-invalid');
                status = false;
            }else{
                mincapability.removeClass('is-invalid');
                formData.append('mincapability',mincapability.val());
            }
            
            if (minunits.val() === ""){
                minunits.addClass('is-invalid');
                status = false;
            }else{
                minunits.removeClass('is-invalid');
                formData.append('minunits',minunits.val());
            }

            if (AccuracyDisp.val() === ""){
                AccuracyDisp.addClass('is-invalid');
                status = false;
            }else{
                AccuracyDisp.removeClass('is-invalid');
                formData.append('AccuracyDisp',AccuracyDisp.val());
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

            if (supplier1.val() === "") {
                supplier1.addClass('is-invalid');
                status = false;
            } else {
                supplier1.removeClass('is-invalid');
                formData.append('supplier', supplier1.val());
            }

            if (location.val() === "") {
                location.addClass('is-invalid');
                status = false;
            } else {
                location.removeClass('is-invalid');
                formData.append('location', location.val());
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
