$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('hotplate_form')) {
        let startTime;
        function calculateTimeDifference(startTime, stopTime) {
            // Calculate the time difference in minutes
            const timeDifference = Math.floor((stopTime - startTime) / (1000 * 60));

            return timeDifference;
    }
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
                $("#hotplate-condition-no").prop("disabled", false);
                $("#hotplate-condition-yes").prop("disabled", false);
                $("#hotplate-temp-loading").prop("disabled", false);
                $("#time-loading").prop("disabled", true);
                $("#hotplate-temp-limits-yes").prop("disabled", false);
                $("#hotplate-temp-limits-no").prop("disabled", false);
                $("#hotplate-temp-unloading").prop("disabled", false);
                $("#time-unloading").prop("disabled", true);
                $("#action").prop("disabled", false);
                $("#probe-serial-no").prop("disabled", false);
                $("#total-time").prop("disabled", false);
                $("#start_time").prop("disabled", false);
                $("#stop_time").prop("disabled", true);

            }

        });

        $("#clearjobfield").on("click", function () {

            $("#findJobButton").prop("disabled", false);
            $("#job_code").prop("disabled", false);
            $("#clearjobfield").prop("disabled", true);
            $("#hotplate-condition-no").prop("disabled", true);
            $("#hotplate-condition-yes").prop("disabled", true);
            $("#hotplate-temp-loading").prop("disabled", true);
            $("#time-loading").prop("disabled", true);
            $("#hotplate-temp-limits-yes").prop("disabled", true);
            $("#hotplate-temp-limits-no").prop("disabled", true);
            $("#hotplate-temp-unloading").prop("disabled", true);
            $("#time-unloading").prop("disabled", true);
            $("#action").prop("disabled", true);
            $("#total-time").prop("disabled", true);
            $("#start_time").prop("disabled", true);
            $("#stop_time").prop("disabled", true);
        });

        $("#start_time").on("click", function(){
            const hotplateid = $('#hotplateId');
            const thermometerid = $('#thermometerId');
            const hotplateConditionYes = $('#hotplate-condition-yes');
            const hotplateConditionNo = $('#hotplate-condition-no');
            const hotplateTempLoading = $('#hotplate-temp-loading');
            const hotplateTempLimitsYes = $('#hotplate-temp-limits-yes');
            const hotplateTempLimitsNo = $('#hotplate-temp-limits-no');

            const action = $('#action');

            let status = true;

            if (hotplateid.val() === "") {
                hotplateid.addClass('is-invalid');
                status = false;
            } else {
                hotplateid.removeClass('is-invalid');
            }

            if (thermometerid.val() === "") {
                thermometerid.addClass('is-invalid');
                status = false;
            } else {
                thermometerid.removeClass('is-invalid');
            }

            if (hotplateTempLoading.val() === "") {
                hotplateTempLoading.addClass('is-invalid');
                status = false;
            } else {
                hotplateTempLoading.removeClass('is-invalid');
            }


            if (!(hotplateTempLimitsYes.prop('checked') &&  hotplateConditionYes.prop('checked')  )) {
                action.addClass('is-invalid');
                status = false;
            } else {
                action.removeClass('is-invalid');
            }
            alert(status);
            if (status) {
                $("#hotplate-condition-no").prop("disabled", true);
                $("#hotplate-condition-yes").prop("disabled", true);
                $("#hotplate-temp-loading").prop("disabled", true);
                $("#time-loading").prop("disabled", true);
                $("#hotplate-temp-limits-yes").prop("disabled", true);
                $("#hotplate-temp-limits-no").prop("disabled", true);
                $("#hotplate-temp-unloading").prop("disabled", false);
                $("#time-unloading").prop("disabled", true);
                $("#action").prop("disabled", true);
                $("#total-time").prop("disabled", true);
                $("#start_time").prop("disabled", true);
                $("#stop_time").prop("disabled", false);

                const currentTime = new Date();

                // Format the time as HH:mm (24-hour format)
                const formattedTime = currentTime.toISOString().slice(11, 16);

                // Set the formatted time to the "Time Loading" input
                $("#time-loading").val(formattedTime);
                startTime = currentTime;
            }

            return false;
        });

         $("#stop_time").on("click", function() {
             const hotplateTempUnloading = $('#hotplate-temp-unloading');
             const finished = $("#time-loading")
             let status = true;


             if (hotplateTempUnloading.val() === "") {
                hotplateTempUnloading.addClass('is-invalid');
                status = false;
            } else {
                hotplateTempUnloading.removeClass('is-invalid');
            }
             if(status){
                 const currentTime = new Date();
                 const formattedTime = currentTime.toISOString().slice(11, 16);
                 $("#time-unloading").val(formattedTime);
                 const timeDifference = calculateTimeDifference(startTime, currentTime);

                 $("#total-time").val(timeDifference);
                 $("#hotplate-temp-unloading").prop("disabled", true);


             }
        });










        $("form#hotplateform").on('submit', () => {

            const jobcode = $('#job_code');
            const hotplateid = $('#hotplateId');
            const thermometerid = $('#thermometerId');
            const hotplateConditionYes = $('#hotplate-condition-yes');
            const hotplateConditionNo = $('#hotplate-condition-no');
            const hotplateTempLoading = $('#hotplate-temp-loading');
            const timeLoading = $('#time-loading');
            const hotplateTempLimitsYes = $('#hotplate-temp-limits-yes');
            const hotplateTempLimitsNo = $('#hotplate-temp-limits-no');
            const hotplateTempUnloading = $('#hotplate-temp-unloading');
            const timeUnloading = $('#time-unloading');
            const action = $('#action');
            const totalTime = $('#total-time');


            let status = true;
           const formdata = new FormData();
            if (jobcode.val() === "") {
                jobcode.addClass('is-invalid');
                status = false;
            } else {
                jobcode.removeClass('is-invalid');
                formData.append('jobcode', jobcode.val());

            }

            if (thermometerid.val() === "") {
                thermometerid.addClass('is-invalid');
                status = false;
            } else {
                thermometerid.removeClass('is-invalid');
                formData.append('thermometerid',thermometerid.val());
            }

            if (hotplateid.val() === "") {
                hotplateid.addClass('is-invalid');
                status = false;
            } else {
                hotplateid.removeClass('is-invalid');
                formData.append('hotplate', hotplateid.val());
            }

            if (hotplateTempLoading.val() === "") {
                hotplateTempLoading.addClass('is-invalid');
                status = false;
            } else {
                hotplateTempLoading.removeClass('is-invalid');
                formData.append('hotplateTempLoading', hotplateTempLoading);
            }

            if (timeLoading.val() === "") {
                timeLoading.addClass('is-invalid');
                status = false;
            } else {
                timeLoading.removeClass('is-invalid');
                formData.append('time-loading', timeLoading.val());
            }



            if (hotplateTempUnloading.val() === "") {
                hotplateTempUnloading.addClass('is-invalid');
                status = false;
            } else {
                hotplateTempUnloading.removeClass('is-invalid');
                formData.append('hotplarteTempUnloading', hotplateTempUnloading.val());
            }

            if (timeUnloading.val() === "") {
                timeUnloading.addClass('is-invalid');
                status = false;
            } else {
                timeUnloading.removeClass('is-invalid');
                formData.append('timeUnloading',timeUnloading.val());
            }

            if (totalTime.val() === "") {
                totalTime.addClass('is-invalid');
                status = false;
            } else {
                totalTime.removeClass('is-invalid');
                formData.append('totalTime', totalTime.val());
            }

            if (!(hotplateTempLimitsYes.prop('checked') && hotplateConditionYes.prop('checked')  )) {
                action.addClass('is-invalid');
                status = false;
            } else {
                action.removeClass('is-invalid');
                formData.append('action', action.val());
            }

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

            return false;
        });

    }
})
