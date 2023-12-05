$(document).ready(function() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('register-sample')) {
        const selectElement = $('#analyteOptions');
        const selectUnits = $("#sinits");
        select(selectUnits,'/analyte-unit-name/');
        select(selectElement,'/optionsSelectAnalyte/');
        $("#addAnalytesButton").on("click",function (){
            const analytes = $("#analyteOptions");
            const units = $("#sinits");
            let status = true;
            if(analytes.val() === ""){
                analytes.addClass('is-invalid');
                status = false;
            }else{
                analytes.removeClass('is-invalid');
                status = true;
            }
            if(units.val() === ""){
                units.addClass('is-invalid');
                status = false;
            }else{
                units.removeClass('is-invalid');
                status = true;
            }
            if(status){
                const combined = analytes.val() + '.' + units.val(); // Concatenate analyte and unit
                const newRow = '<tr><td>' + analytes.val() + '</td><td>' + units.val() + '</td><td>' + combined + '</td><td><button class="deleteRowBtn btn btn-danger" style="width: 100%">Delete</button></td></tr>';
                $('#dataTable tbody').append(newRow);
                $('#dataTable').on('click', '.deleteRowBtn', function () {
                    $(this).closest('tr').remove(); // Remove the closest row when delete button is clicked
                });
            }
        })

        $('form#sample-registration').on('submit', function (event) {
            event.preventDefault();

            const name = $("#sample-name");
            const type = $("#sample-type").val();
            const state = $("#sample-state");
            const note = $("#summernote").val();
            const date = $("#date-collection");
            const tat = $("#turn-around-time");
            const stat = $("#tat").val();
            const weight = $("#weight").val();
            const wunits = $("#units").val();

            let status = true;
            let dataArray = [];

            $('#dataTable tbody tr').each(function () {
                const row = $(this).find('td');
                const analyteUnit = row.eq(2).text(); // Get the combined analyte/unit value
                dataArray.push(analyteUnit);
            });

            if (dataArray.length === 0) {
                toastr.info('Sample cannot be created with an empty list of Analytes');
                status = false;
            }else{
                status = true;
            }

            if (!tat.val()) {
                tat.addClass('is-invalid');
                status = false;
            }else{
                tat.removeClass('is-invalid');
                status = true;
            }

            if (!date.val()) {
                date.addClass('is-invalid');
                status = false;
            }else{
                date.removeClass('is-invalid');
                status = true;
            }

            if (!name.val()) {
                name.addClass('is-invalid');
                status = false;
            }else{
                name.removeClass('is-invalid');
                status = true;
            }

            if (!state.val()) {
                toastr.info('Make sure you have selected the sample State')
                status = false;
            }else{
                state.removeClass('is-invalid');
                status = true;
            }
            if (status) {
                overlay.style.display = 'block';
                const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
                const formData = new FormData;
                formData.append('name', name.val());
                formData.append('sample_type', type);
                formData.append('state', state.val());
                formData.append('description', note);
                formData.append('collection_date', date.val());
                formData.append('frequency', tat.val() + '' + stat);
                formData.append('weight', weight + '' + wunits);
                dataArray.forEach(function (item) {
                    formData.append('analyte[]', item);
                });
                $.ajax({
                    url: '/sample-registration/',
                    type: 'POST',
                    processData: false, // Prevent jQuery from processing FormData
                    contentType: false, // Prevent jQuery from setting contentType
                    headers: {
                        'X-CSRFToken': csrfToken
                    },
                    data: formData,
                    success: function (data) {
                       //
                        if(data.code === 201){
                            overlay.style.display = 'none';
                            toastr.success('sample is successfully registered');

                        }else{
                            toastr.error(data.message);
                        }
                        // Handle success response
                    },
                    error: function (error) {
                       overlay.style.display = 'none';
                       toastr.error(error);
                        // Handle error response
                    }
                });
            }
        });

    }
    function select(element, api) {
            fetch(api,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': $('input[name="csrfmiddlewaretoken"]').val()
            }
        }).then(function(response) {
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response.json();
        }).then(function(data) {
            data.data.forEach(analytes =>{
                element.append('<option value="' + analytes.name + '">' + analytes.name + '</option>');
            });
            element.select2({
                placeholder: 'Analytes',
                width: '100%'
            });
        }).catch(error =>{
            alert(error.message);
            console.log(error);
        });
        }
})