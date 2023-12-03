$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('sample_weight')) {
        $("#findJobButton").on("click", function () {
            const jobCode = $("#job_code");

            let status = true;
            if (jobCode.val() === "") {
                jobCode.addClass('is-invalid');
                status = false;
            } else {
                jobCode.removeClass('is-invalid');
                status = true;
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

        $("#addSampleWeight").on("click",function (event) {
            const balanceId = $("#balanceId");
            const mass = $("#mass");
            const sampleId = $("#sampleId");

            let status = true;

            if (balanceId.val() === "") {
                balanceId.addClass('is-invalid');
                status = false;
            } else {
                balanceId.removeClass('is-invalid');
                status = true;
            }
            if (mass.val() === "") {
                mass.addClass('is-invalid');
                status = false;
            } else {
                mass.removeClass('is-invalid');
                status = true;
            }

            if (!isNaN(parseFloat(mass.val())) && mass.val() !== "") {
                mass.removeClass('is-invalid');
                status = true;
            } else {
                peroxidemass.addClass('is-invalid');
                status = false;
            }

            if (sampleId.val() === "") {
                sampleId.addClass('is-invalid');
                status = false;
            } else {
                sampleId.removeClass('is-invalid');
                status = true;
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

            // Capture table contents
            $('#dataTable tbody tr').each(function () {
                const row = $(this).find('td');
                const sampleIdValue = row.eq(0).text();
                const massValue = row.eq(1).text();
                dataArray.push({ sampleId: sampleIdValue, mass: massValue });
            });


            // Capture other form fields
            const jobCode = $("#job_code");
            const balanceId = $("#balanceId");
            const start = $("#startTime");
            const end = $("#endTime");

            let status = true;
            if (balanceId.val() === "") {
                balanceId.addClass('is-invalid');
                status = false;
            } else {
                balanceId.removeClass('is-invalid');
                status = true;
            }

            if (jobCode.val() === "") {
                jobCode.addClass('is-invalid');
                status = false;
            } else {
                jobCode.removeClass('is-invalid');
                status = true;
            }

            if (status.val() === "") {
                balanceId.addClass('is-invalid');
                status = false;
            } else {
                start.removeClass('is-invalid');
                status = true;
            }

            if (end.val() === "") {
                end.addClass('is-invalid');
                status = false;
            } else {
                end.removeClass('is-invalid');
                status = true;
            }
            alert(status)
            if( status){
                alert('Balance ID: ' + balanceId.val() +
                    '\nStart Time: ' + start.val() +
                    '\nEnd Time: ' + end.val() +
                    '\nJob ID: ' + jobCode.val() +
                    '\nSample Data: ' + JSON.stringify(dataArray));
            }

    });

    }
})
