$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('analyses_methods')) {

        $("form#analysesmethod").on('submit', function () {
                const name = $("#analyses_name");
                const description = $("#description");
                const SelectedAnalytes = document.getElementById('analytes');
                const analyticMethods = document.getElementById('analytics');
                const samplePrepMethods = document.getElementById('sample_prep_methods');
                const analytes = [];
                const analyticalMethod = [];
                const samplePrep = [];
                let status = true;
                const formData = new FormData;
                if (samplePrepMethods.selectedOptions.length === 0) {
                    toastr.info('Please select some analytes')
                    status = false;
                } else {
                    for (let i = 0; i < samplePrepMethods.selectedOptions.length; i++) {
                        const option = samplePrepMethods.options[i];
                        // Check if the option is selected
                        if (option.selected) {
                            alert(option.value)
                            // Push the selected value into the array
                            samplePrep.push(option.value);
                        }
                    }
                    status = true
                }
                if (SelectedAnalytes.selectedOptions.length === 0) {
                    toastr.info('Please select some analytes')
                    status = false;
                } else {
                    for (let i = 0; i < SelectedAnalytes.selectedOptions.length; i++) {
                        const option = SelectedAnalytes.options[i];
                        // Check if the option is selected
                        if (option.selected) {
                            // Push the selected value into the array
                            analyticalMethod.push(option.value);
                        }
                    }
                    status = true
                }
                if (analyticMethods.selectedOptions.length === 0) {
                    toastr.info('Please select some analytes')
                    status = false;
                } else {
                    for (let i = 0; i < analyticMethods.options.length; i++) {
                        const option = analyticMethods.options[i];
                        // Check if the option is selected
                        if (option.selected) {
                            // Push the selected value into the array
                            analytes.push(option.value);
                        }
                    }
                    status = true
                }
                if (name.val() === "") {
                    name.addClass('is-invalid');
                    status = false;
                } else {
                    name.removeClass('is-invalid');
                    status = true
                }

                if (description.val() === "") {
                    description.addClass('is-invalid');
                    status = false;
                } else {
                    description.removeClass('is-invalid');
                    status = true
                }
                if (status) {
                    analytes.forEach(function (item) {
                        formData.append('analytes_id[]', item);
                    });
                    analyticalMethod.forEach(function (item) {
                        formData.append('analytical_method_id[]', item);
                    });
                    samplePrep.forEach(function (item) {
                        formData.append('sam_prep_method_id[]', item);
                    });
                    formData.append('name', name.val());
                    formData.append('description', description.val());
                    $.ajax({
                        url: '/analysis-registration/',
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
            }
        )
    }
})

