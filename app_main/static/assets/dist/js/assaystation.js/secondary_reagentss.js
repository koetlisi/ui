$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('secondary_reagents')) {
        $("form#secondaryreagent").on('submit', () => {

            $(document).ready(function () {
                // Initialize Select2
                $('#precursor').select2({
                    placeholder: 'Select one or more precursors',
                    allowClear: true, // Adds a clear button to the dropdown
                });
            });
            const name = $("#name");
            const preparedBy = $('#prepared_by');
            const testedBy = $('#tested_by');
            const method = $('#method');
            const storageLoc = $('#storage_loc');
            const precursor = document.getElementById('precursor');
            const description = $('#description');
            const expiry = $('#expiry');
            const prepdate = $('#preparationdate');
            const concentration = $('#concentration');
            const precursorArray = [];
            const documentation = document.getElementById('documentation_files');
            const documentationFiles = documentation.files

            let status = true;

            const formData = new FormData();
            if (documentationFiles.length === 0) {
                toastr.info('No documentation files');
                status = false;
            } else {
                for (let i = 0; i < documentationFiles.length; i++) {
                    formData.append('documentation', documentationFiles[i]);
                }
            }

            if (prepdate.val() === "") {
                prepdate.addClass('is-invalid');
                status = false;
            } else {
                prepdate.removeClass('is-invalid');
            }

            if (testedBy.val() === "") {
                testedBy.addClass('is-invalid');
                status = false;
            } else {
                testedBy.removeClass('is-invalid');
            }

            if (expiry.val() === "") {
                expiry.addClass('is-invalid');
                status = false;
            } else {
                expiry.removeClass('is-invalid');
            }

            if (preparedBy.val() === "") {
                preparedBy.addClass('is-invalid');
                status = false;
            } else {
                preparedBy.removeClass('is-invalid');
            }

            if (storageLoc.val() === "") {
                storageLoc.addClass('is-invalid');
                status = false;
            } else {
                storageLoc.removeClass('is-invalid');
            }

            if (concentration.val() === "") {
                concentration.addClass('is-invalid');
                status = false;
            } else {
                concentration.removeClass('is-invalid');
            }

            if (method.val() === "") {
                method.addClass('is-invalid');
                status = false;
            } else {
                method.removeClass('is-invalid');
            }
            if (precursor.selectedOptions.length === 0) {
                toastr.info("Please select precursors");
                status = false;
            } else {
                for (let i = 0; i < precursor.selectedOptions.length; i++) {
                    const selectedOption = precursor.selectedOptions[i];
                    precursorArray.push(selectedOption.value);
                }
            }
            if(name.val() === ""){
                name.addClass('is-invalid');
                status = false
            }else{
                name.removeClass('is-invalid');
            }
            if (description.val() === "") {
                description.addClass('is-invalid');
                status = false;
            } else {
                description.removeClass('is-invalid');
            }
            if (status) {
                formData.append('pre_user_id', preparedBy.val());
                formData.append('test_user_id', testedBy.val());
                formData.append('test_method_id', method.val());
                formData.append('expiry', expiry.val());
                precursorArray.forEach(function (item) {
                    formData.append('precursor[]', item);
                });
                formData.append('prep_date', prepdate.val());
                formData.append('name',name.val());
                formData.append('storage_id', storageLoc.val());
                formData.append('concentration', concentration.val());
                formData.append('description', description.val());
                $.ajax({
                        url: '/secondary-reagent-registration/',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        headers: {'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()},
                        success: function (data) {
                            const response = JSON.parse(data);
                            alert(response.data);
                            if (data.code === 201) {
                                alert(data.data)
                            }
                        }
                    })
            }


        });
        const selectElement = $('#precursor');
        fetch('/secondary-precursor/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': $('input[name="csrfmiddlewaretoken"]').val()
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Loop through the fetched data and append options to the select element
                data.data.forEach(reagent => {
                    selectElement.append(`<option value="${reagent.id}">${reagent.name}</option>`);
                });

                // Initialize Select2 after appending options (if you're using Select2)
                selectElement.select2({
                    multiple: true,
                    placeholder: 'Select a State',
                    width: '100%'
                });
            })
            .catch(error => {
                alert(error.message);
                // Handle any errors during the API request
                console.error('Error fetching data:', error);
            });
    }

});