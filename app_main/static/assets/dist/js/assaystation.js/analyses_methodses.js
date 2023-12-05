$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('analyses_methods')) {
        const sample_prep_methods = $("#sample_prep_methods");
        const analytics = $("#analytics");
        const analytes = $("#analytes");
        select(analytes,'/optionsSelectAnalyte/');
        select(sample_prep_methods,'/get-sample-prep-method-name-id/');
        select(analytics,'/get-analytical-method-name-id/');
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
                        const option = samplePrepMethods.selectedOptions[i];
                        // Check if the option is selected
                        samplePrep.push(option.value);
                    }
                    status = true
                }
                if (SelectedAnalytes.selectedOptions.length === 0) {
                    toastr.info('Please select some analytes')
                    status = false;
                } else {
                    for (let i = 0; i < SelectedAnalytes.selectedOptions.length; i++) {
                        const option = SelectedAnalytes.selectedOptions[i];
                        analyticalMethod.push(option.value);
                    }
                    status = true
                }
                if (analyticMethods.selectedOptions.length === 0) {
                    toastr.info('Please select some analytes')
                    status = false;
                } else {
                    for (let i = 0; i < analyticMethods.selectedOptions.length; i++) {
                        const option = analyticMethods.selectedOptions[i];
                        // Check if the option is selected
                        analytes.push(option.value);
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
                                alert(3)
                            }else{
                                alert(2)
                            }
                        }
                    })
                }
            }
        )
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
                element.append('<option value="' + analytes.id + '">' + analytes.name + '</option>');
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

