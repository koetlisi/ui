$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('sample_weight')) {
        const formData = new FormData;
        $("#findJobButton").on("click", function () {
            const jobCode = $("#job_code");

            let status = true;
            if (jobCode.val() === "") {
                jobCode.addClass('is-invalid');
                status = false;
            } else {
                jobCode.removeClass('is-invalid');
            }

            if (status) {

                $("#findJobButton").prop("disabled", true);
                $("#job_code").prop("disabled", true);
                $("#clearjobfield").prop("disabled", false);
                $("#startTime").prop("disabled", false);
                $("#endTime").prop("disabled", false);
                $("#addSampleWeight").prop("disabled", false);
                $("#mass").prop("disabled", false);
                $("#sampleId").prop("disabled", false);
                $("#sub").prop("disabled", false);

            }

        });

        $("#clearjobfield").on("click", function () {

            $("#findJobButton").prop("disabled", false);
            $("#job_code").prop("disabled", false);
            $("#clearjobfield").prop("disabled", true);
            $("#startTime").prop("disabled", true);
            $("#endTime").prop("disabled", true);
            $("#addSampleWeight").prop("disabled", true);
            $("#mass").prop("disabled", true);
            $("#sampleId").prop("disabled", true);
            $("#sub").prop("disabled", true);
        });

        $("#addSampleWeight").on("click", function (event) {
            const balanceId = $("#balanceId");
            const mass = $("#mass");
            const sampleId = $("#sampleId");

            let status = true;

            if (balanceId.val() === "") {
                balanceId.addClass('is-invalid');
                status = false;
            } else {
                balanceId.removeClass('is-invalid');
            }

            if (!isNaN(parseFloat(mass.val())) && mass.val() !== "") {
                mass.removeClass('is-invalid');
            } else {
                mass.addClass('is-invalid');
                status = false;
            }

            if (sampleId.val() === "") {
                sampleId.addClass('is-invalid');
                status = false;
            } else {
                sampleId.removeClass('is-invalid');
            }
            if (status) {
                const newRow = '<tr><td>' + sampleId.val() + '</td><td>' + mass.val() + '</td><td><button class="deleteRowBtn btn btn-danger" style="width: 100%">Delete</button></td></tr>';
                $('#dataTable tbody').append(newRow);

                mass.val('');
                sampleId.val('');
            }
        });


        $('#dataTable').on('click', '.deleteRowBtn', function () {
            $(this).closest('tr').remove();
        });

        $('form#sample-weight').on('submit', function (event) {
            event.preventDefault();
            let dataArray = [];
            let status = true;

            // Capture table contents
            $('#dataTable tbody tr').each(function () {
                const row = $(this).find('td');
                const sampleIdValue = row.eq(0).text();
                const massValue = row.eq(1).text();
                dataArray.push({sampleId: sampleIdValue, mass: massValue});
            });

            if (dataArray.length === 0){
                status = false;
                toastr.info('Add at least One Weight');
            }else {
                dataArray.forEach(function (item,index) {
                    formData.append(`weights[]`,JSON.stringify(item));
                });
            }



            // Capture other form fields
            const jobCode = $("#job_code");
            const balanceId = $("#balanceId");
            const start = $("#startTime");
            const end = $("#endTime");


            if (dataArray.length === 0){
                status= false;
                toast.info("Add at least one weight");
            }else{
                 dataArray.forEach(function (item,index) {
                    formData.append(`weight[]`,JSON.stringify(item));
                });
            }

            if (balanceId.val() === "") {
                balanceId.addClass('is-invalid');
                status = false;
            } else {
                balanceId.removeClass('is-invalid');
                formData.append('balance', balanceId);
            }

            if (jobCode.val() === "") {
                jobCode.addClass('is-invalid');
                status = false;
            } else {
                jobCode.removeClass('is-invalid');
                formData.append('jobCode', jobCode);
            }


            alert(status)
            if (status) {

                alert('Balance ID: ' + balanceId.val() +
                    '\nStart Time: ' + start.val() +
                    '\nEnd Time: ' + end.val() +
                    '\nJob ID: ' + jobCode.val() +
                    '\nSample Data: ' + JSON.stringify(dataArray));
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


