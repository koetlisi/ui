$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('peroxide_weight')) {
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
                $("#addPeroxideWeight").prop("disabled", false);
                $("#mass").prop("disabled", false);
                $("#peroxidemass").prop("disabled", false);
                $("#sampleId").prop("disabled", false);

            }

        });

        $("#clearjobfield").on("click", function () {


            $("#findJobButton").prop("disabled", false);
            $("#job_code").prop("disabled", false);
            $("#clearjobfield").prop("disabled", true);
            $("#startTime").prop("disabled", true);
            $("#endTime").prop("disabled", true);
            $("#addPeroxideWeight").prop("disabled", true);
            $("#mass").prop("disabled", true);
            $("#peroxidemass").prop("disabled", true);
            $("#sampleId").prop("disabled", true);
        });

        $("#addPeroxideWeight").on("click",function () {
            const balanceId = $("#balanceId");
            const mass = $("#mass");
            const sampleId = $("#sampleId");
            const peroxidemass = $("#peroxidemass");

            let status = true;
            let massnum = true;
            let numpero = true;

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
                massnum = false;
            }

            if (!isNaN(parseFloat(peroxidemass.val())) && peroxidemass.val() !== "") {
                peroxidemass.removeClass('is-invalid');
            } else {
                peroxidemass.addClass('is-invalid');
                numpero = false;
            }

            if (sampleId.val() === "") {
                sampleId.addClass('is-invalid');
                status = false;
            } else {
                sampleId.removeClass('is-invalid');
            }
            if (status && massnum && numpero) {
                const newRow = '<tr><td>' + sampleId.val() + '</td><td>' + mass.val() + '</td><td>' + peroxidemass.val() + '</td><td><button class="deleteRowBtn btn btn-danger" style="width: 100%">Delete</button></td></tr>';
                $('#dataTable tbody').append(newRow);

                mass.val('');
                sampleId.val('');
                peroxidemass.val('');
            }
        });


        $('#dataTable').on('click', '.deleteRowBtn', function () {
                $(this).closest('tr').remove();
        });

        $('form#peroxide-weight').on('submit', function (event) {
            event.preventDefault();
            let dataArray = [];

            // Capture table contents
            $('#dataTable tbody tr').each(function () {
                const row = $(this).find('td');
                const sampleIdValue = row.eq(0).text();
                const massValue = row.eq(1).text();
                const peroxidemassValue = row.eq(2).text();
                dataArray.push({ sampleId: sampleIdValue, mass: massValue, peroxidemass: peroxidemassValue });
            });



            // Capture other form fields
            const jobCode = $("#job_code");
            const balanceId = $("#balanceId");
            const start = $("#startTime");
            const end = $("#endTime");

            // Display the captured data
            alert('Balance ID: ' + jobCode.val() +
                '\nStart Time: ' + balanceId.val() +
                '\nEnd Time: ' + end.val() +
                '\nJob ID: ' + start.val() +
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
        });

    }
})
