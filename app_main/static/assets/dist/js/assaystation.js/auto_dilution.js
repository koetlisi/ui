$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('auto_dilution')) {


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
                $("#sampleId").prop("disabled", false);
                $("#aliqout").prop("disabled", false);
                $("#finalVol").prop("disabled", false);
                $("#addSampleVolume").prop("disabled", false);

            }

        });

        $("#clearjobfield").on("click", function () {

            $("#findJobButton").prop("disabled", false);
            $("#job_code").prop("disabled", false);
            $("#clearjobfield").prop("disabled", true);
            $("#addSampleWeight").prop("disabled", true);
            $("#sampleId").prop("disabled", true);
            $("#sub").prop("disabled", true);
        });

        $("#addSampleVolume").on("click",function (event) {
            const dispenserid = $("#dispenserid");
            const aliqout = $("#aliqout");
            const finalVol = $("#finalVol");
            const sampleId = $("#sampleId");

            let status = true;

            if (dispenserid.val() === "") {
                dispenserid.addClass('is-invalid');
                status = false;
            } else {
                dispenserid.removeClass('is-invalid');
            }

            if (!isNaN(parseFloat(finalVol.val())) && finalVol.val() !== "") {
                finalVol.removeClass('is-invalid');
            } else {
                finalVol.addClass('is-invalid');
                status = false;
            }



            if (aliqout.val() === ""){
                alert('Please enter')
                aliqout.addClass('is-invalid');
                status = false;
            }else{
                aliqout.removeClass('is-invalid');
                alert(aliqout.val());
            }

            if (sampleId.val() === "") {
                sampleId.addClass('is-invalid');
                status = false;
            } else {
                sampleId.removeClass('is-invalid');
            }
            if (status) {
                const newRow =
                    '<tr><td>' + sampleId.val() +
                    '</td><td>' + aliqout.val() +
                    '</td><td>' + finalVol.val() +
                    '</td><td><button class="deleteRowBtn btn btn-danger" style="width: 100%">Delete</button></td></tr>';
                $('#dataTable tbody').append(newRow);

                finalVol.val('');
                aliqout.val('');
                sampleId.val('');
            }
        });


        $('#dataTable').on('click', '.deleteRowBtn', function () {
                $(this).closest('tr').remove();
        });

        $('form#auto_dilution').on('submit', function (event) {
            event.preventDefault();
            let dataArray = [];
            let status = true;
            const formData = new FormData();
            // Capture table contents
            $('#dataTable tbody tr').each(function () {
                const row = $(this).find('td');
                const sampleId = row.eq(0).text();
                const aliqout = row.eq(1).text();
                const finalVol = row.eq(2).text();

                dataArray.push({ sampleId: sampleId, aliqout: aliqout, finalVol: finalVol });
                alert(dataArray.length);
            });
            if(dataArray.length == 0) {
                status = false;
                toast.info('Add atleast one weight');
            }else{
                dataArray.forEach(function (item,index) {
                    formData.append(`weights[]`,JSON.stringify(item));
                });
            }
            // Capture other form fields
            const jobCode = $("#job_code");
            const dispenserid = $("#finalVol");




            if(dataArray.length = 0){
                status = false;
                toastr.info('Input at least one sample to table');
            }else{
                formData.append('samples', dataArray.val());

            }

            if (dispenserid.val() === "") {
                dispenserid.addClass('is-invalid');
                status = false;
            } else {
                dispenserid.removeClass('is-invalid');
                formData.append('pipetteid', dispenserid.val());
            }

            if (jobCode.val() === "") {
                jobCode.addClass('is-invalid');
                status = false;
            } else {
                jobCode.removeClass('is-invalid');
                formData.append('jobcode',jobCode.val())
            }
            if( status){
                $.ajax({

                    url: '/#/',
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
