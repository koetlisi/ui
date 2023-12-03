$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('weightset_register')) {

        $("#addWeight").on("click",function (event) {
            const weight = $("#mass");
            const units = $("#units");
            const lowerbound = $("#lowerBound");
            const upperbound = $("#upperBound");

            let status = true;

            if(weight.val() === ""){
                status = false;
                weight.addClass('is-invalid');
            }else{
                weight.removeClass('is-invalid');
                if(units.val() === ""){
                    units.addClass('is-invalid');
                    status = false;
                }else{
                    units.removeClass('is-invalid');
                }
            }
            if (lowerbound.val() === ""){
                status = false;
                lowerbound.addClass('is-invalid');
            }else{
                lowerbound.removeClass('is-invalid');
            }

            if(upperbound.val()===""){
                status = false;
                upperbound.addClass('is-invalid');
            }else{
                upperbound.removeClass('is-invalid');
            }

            if (status) {
                 const weightNumber = $('#dataTable tbody tr').length + 1;
                const newRow =
                    '<tr>' +
                    '<td>' + weightNumber + '</td>' +
                    '<td>' + weight.val() + '.' + units.val() + '</td>' +
                    '<td>' + lowerbound.val() + '.' + units.val() + '</td>' +
                    '<td>' + upperbound.val() + '.' + units.val() + '</td>' +
                    '<td><button class="deleteRowBtn btn btn-danger" style="width: 100%">Delete</button></td>' +
                    '</tr>';
                $('#dataTable tbody').append(newRow);
                weight.val('');
                units.val('');
                lowerbound.val('');
                upperbound.val('');
            }
        });
        $('#dataTable').on('click', '.deleteRowBtn', function () {
                $(this).closest('tr').remove();
        });

        $('form#weightset_form').on('submit', function (event) {
            event.preventDefault();
            let dataArray = [];
            const formData = new FormData;

            $('#dataTable tbody tr').each(function () {
                const row = $(this).find('td');
                const weight = row.eq(1).text();
                const lowerbound = row.eq(2).text();
                const upperbound = row.eq(3).text();
                dataArray.push({ mass_weight: weight, min_weight: lowerbound, max_weight: upperbound });
            });
            const setname = $("#setname");
            const material = $("#material");
            const manufacture = $("#manufacture");
            const serial_num = $("#serial_num");
            const location = $("#location");
            const description = $("#description");
            const cal_cert = document.getElementById('cal_cert');
            const cal_certFile = cal_cert.files;
            let status = true;
            if (dataArray.length === 0){
                status = false;
                toastr.info('Add at least One Weight');
            }else {
                dataArray.forEach(function (item,index) {
                    formData.append(`weights[]`,JSON.stringify(item));
                });
            }

            if (setname.val() === "") {
                setname.addClass('is-invalid');
                status = false;
            } else {
                setname.removeClass('is-invalid');
                formData.append('name', setname.val());
            }

            if (material.val() === "") {
                material.addClass('is-invalid');
                status = false;
            } else {
                material.removeClass('is-invalid');
                formData.append('material', material.val());
            }

            if (manufacture.val() === "") {
                manufacture.addClass('is-invalid');
                status = false;
            } else {
                manufacture.removeClass('is-invalid');
                formData.append('manufacture', manufacture.val());
            }

            if (serial_num.val() === "") {
                serial_num.addClass('is-invalid');
                status = false;
            } else {
                serial_num.removeClass('is-invalid');
                formData.append('serial_num', serial_num.val());
            }

            if (location.val() === "") {
                location.addClass('is-invalid');
                status = false;
            } else {
                location.removeClass('is-invalid');
                formData.append('storage', location.val());
            }

            if (description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            } else {
                description.removeClass('is-invalid');
                formData.append('description', description.val());
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
            handleFileUpload(cal_cert.files, 'document');
            //alert(status)
            if( status){
                alert('Balance ID: ' + setname.val() +
                    '\nStart Time: ' + material.val() +
                    '\nEnd Time: ' + manufacture.val() +
                    '\nJob ID: ' + serial_num.val() +
                    '\nJob ID: ' + location.val() +
                    '\nJob ID: ' + description.val() +
                    '\nSample Data: ' + JSON.stringify(dataArray));

                $.ajax({
                        url: '/weight-set-registration/',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        headers: {'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()},
                        success: function (data) {
                            if (data.code === 201) {
                                alert(data.data)
                            }
                        }
                    })
            }

    });

    }
})
