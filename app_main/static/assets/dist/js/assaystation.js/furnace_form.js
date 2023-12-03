$(document).ready(function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes('furnace_form')) {

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
                $("#furnace-condition-no").prop("disabled", false);
                $("#furnace-condition-yes").prop("disabled", false);
                $("#furnace-temp-loading").prop("disabled", false);
                $("#time-loading").prop("disabled", true);
                $("#furnace-temp-limits-yes").prop("disabled", false);
                $("#furnace-temp-limits-no").prop("disabled", false);
                $("#furnace-temp-unloading").prop("disabled", true);
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
            $("#furnace-condition-no").prop("disabled", true);
            $("#furnace-condition-yes").prop("disabled", true);
            $("#furnace-temp-loading").prop("disabled", true);
            $("#time-loading").prop("disabled", true);
            $("#furnace-temp-limits-yes").prop("disabled", true);
            $("#furnace-temp-limits-no").prop("disabled", true);
            $("#furnace-temp-unloading").prop("disabled", false);
            $("#time-unloading").prop("disabled", true);
            $("#action").prop("disabled", true);
            $("#total-time").prop("disabled", true);
            $("#start_time").prop("disabled", true);
            $("#stop_time").prop("disabled", true);
        });

        $("#start_time").on("click", function(){
            const furnaceid = $('#furnaceId');
            const thermometerid = $('#thermometerId');
            const furnaceConditionYes = $('#furnace-condition-yes');
            const furnaceConditionNo = $('#furnace-condition-no');
            const furnaceTempLoading = $('#furnace-temp-loading');
            const furnaceTempLimitsYes = $('#furnace-temp-limits-yes');
            const furnaceTempLimitsNo = $('#furnace-temp-limits-no');

            const action = $('#action');

            let status = true;

            if (thermometerid.val() === "") {
                thermometerid.addClass('is-invalid');
                status = false;
            } else {
                thermometerid.removeClass('is-invalid');
            }

            if (furnaceid.val() === "") {
                furnaceid.addClass('is-invalid');
                status = false;
            } else {
                furnaceid.removeClass('is-invalid');
            }

            if (furnaceTempLoading.val() === "") {
                furnaceTempLoading.addClass('is-invalid');
                status = false;
            } else {
                furnaceTempLoading.removeClass('is-invalid');
            }


            if (!(furnaceTempLimitsYes.prop('checked') && furnaceConditionYes.prop('checked')  )) {
                action.addClass('is-invalid');
                status = false;
            } else {
                action.removeClass('is-invalid');
            }

            if (status) {
                $("#furnace-condition-no").prop("disabled", true);
                $("#furnace-condition-yes").prop("disabled", true);
                $("#furnace-temp-loading").prop("disabled", true);
                $("#time-loading").prop("disabled", true);
                $("#furnace-temp-limits-yes").prop("disabled", true);
                $("#furnace-temp-limits-no").prop("disabled", true);
                $("#furnace-temp-unloading").prop("disabled", false);
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
             const furnaceTempUnloading = $('#furnace-temp-unloading');
             const finished = $("#time-loading")
             let status = true;


             if (furnaceTempUnloading.val() === "") {
                furnaceTempUnloading.addClass('is-invalid');
                status = false;
            } else {
                furnaceTempUnloading.removeClass('is-invalid');
            }
             if(status){
                 const currentTime = new Date();
                 const formattedTime = currentTime.toISOString().slice(11, 16);
                 $("#time-unloading").val(formattedTime);
                 const timeDifference = calculateTimeDifference(startTime, currentTime);

                 $("#total-time").val(timeDifference);
                 $("#furnace-temp-unloading").prop("disabled", true);


             }
        });










        $("form#furnaceform").on('submit', () => {

            const jobcode = $('#job_code');
            const furnaceid = $('#furnaceId');
            const thermometerid = $('#thermometerId');
            const furnaceConditionYes = $('#furnace-condition-yes');
            const furnaceConditionNo = $('#furnace-condition-no');
            const furnaceTempLoading = $('#furnace-temp-loading');
            const timeLoading = $('#time-loading');
            const furnaceTempLimitsYes = $('#furnace-temp-limits-yes');
            const furnaceTempLimitsNo = $('#furnace-temp-limits-no');
            const furnaceTempUnloading = $('#furnace-temp-unloading');
            const timeUnloading = $('#time-unloading');
            const action = $('#action');
            const totalTime = $('#total-time');


            let status = true;


            if (jobcode.val() === "") {
                jobcode.addClass('is-invalid');
                status = false;
            } else {
                jobcode.removeClass('is-invalid');
            }

            if (thermometerid.val() === "") {
                thermometerid.addClass('is-invalid');
                status = false;
            } else {
                thermometerid.removeClass('is-invalid');
            }

            if (furnaceid.val() === "") {
                furnaceid.addClass('is-invalid');
                status = false;
            } else {
                furnaceid.removeClass('is-invalid');
            }

            if (furnaceTempLoading.val() === "") {
                furnaceTempLoading.addClass('is-invalid');
                status = false;
            } else {
                furnaceTempLoading.removeClass('is-invalid');
            }

            if (timeLoading.val() === "") {
                timeLoading.addClass('is-invalid');
                status = false;
            } else {
                timeLoading.removeClass('is-invalid');
            }



            if (furnaceTempUnloading.val() === "") {
                furnaceTempUnloading.addClass('is-invalid');
                status = false;
            } else {
                furnaceTempUnloading.removeClass('is-invalid');
            }

            if (timeUnloading.val() === "") {
                timeUnloading.addClass('is-invalid');
                status = false;
            } else {
                timeUnloading.removeClass('is-invalid');
            }

            if (totalTime.val() === "") {
                totalTime.addClass('is-invalid');
                status = false;
            } else {
                totalTime.removeClass('is-invalid');
            }

            if (!(furnaceTempLimitsYes.prop('checked') && furnaceConditionYes.prop('checked')  )) {
                action.addClass('is-invalid');
                status = false;
            } else {
                action.removeClass('is-invalid');
            }

            if (status) {
                alert("Form is valid");
            }

            return false;
        });

    }
})
