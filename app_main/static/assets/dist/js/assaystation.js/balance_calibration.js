$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('balance_calibration')) {
        const balanceid = $("#balanceId");
        const setid = $("#setId");


        $("#record").on("click",function () {
            const originalmass = $("#originalMass");
            const weightedmass = $("#weightedMass");



            let status = true;
            let originNum = true;

            if (balanceid.val() === "") {
                balanceid.addClass('is-invalid');
                status = false;
            } else {
                balanceid.removeClass('is-invalid');
            }

            if (setid.val() === "") {
                setid.addClass('is-invalid');
                status = false;
            } else {
                setid.removeClass('is-invalid');
            }


            if (originalmass.val() === "") {
                originalmass.addClass('is-invalid');
                status = false;
            } else {
                originalmass.removeClass('is-invalid');
            }

            if (weightedmass.val() === "") {
                weightedmass.addClass('is-invalid');
                status = false;
            } else {
                weightedmass.removeClass('is-invalid');
                status = true;
            }


            if (!isNaN(parseFloat(originalmass.val())) &&  !isNaN(parseFloat(weightedmass.val()))) {
                originalmass.removeClass('is-invalid');
                originNum = true;
            } else {
                originalmass.addClass('is-invalid');
                originNum = false;
            }



            if (status && originNum ) {
                const newRow = '<tr><td>' + originalmass.val() + '</td><td>' + weightedmass.val() + '</td><td><button class="deleteRowBtn btn btn-danger" style="width: 100%">Delete</button></td></tr>';
                $('#dataTable tbody').append(newRow);

                originalmass.val('');
                weightedmass.val('');

                $("#balanceId").prop("disabled", true);
                $("#setId").prop("disabled", true);
            }
        });


        $('#dataTable').on('click', '.deleteRowBtn', function () {
                $(this).closest('tr').remove();
        });

        $('form#balance_calibration').on('submit', function (event) {
            event.preventDefault();

            let dataArray = [];
            const formData = new FormData;

            $('#dataTable tbody tr').each(function () {
                const row = $(this).find('td');
                const originalmassValue = row.eq(0).text();
                const weightedmassValue = row.eq(1).text();
                dataArray.push({ originalmass: originalmassValue, weightedmass: weightedmassValue });
            });

            formData.append('balance', balanceid.val());
            formData.append('set', setid.val());
            formData.append('data', JSON.stringify(dataArray));

            if (dataArray.length > 0){
                $.ajax({
                    url: '/#',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()},
                    success: function (data){
                        if(data.code === 201){
                           alert(data.data)
                        }
                    }
                })
            }else {
                toastr.info("No calibration has been done");
            }
        });

    }
})
