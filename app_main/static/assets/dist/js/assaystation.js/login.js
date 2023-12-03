$(document).ready(function(){
    $("#login_spinner").hide();
    $('form#login_form').on('submit', function (event) {
        event.preventDefault();// Hide the login button// Show the loading div
        const email = $('#form2Example17');
        const password = $('#form2Example27');
        const currentDate = new Date();
        // Add 8 hours to the current date and time
        const eightHoursFromNow = new Date(currentDate.getTime() + 8 * 60 * 60 * 1000); // 8 hours * 60 minutes * 60 seconds * 1000 milliseconds
        let status = false;
        if (email.val() === "") {
            email.addClass('is-invalid');
            status = false;
            return status;
        } else {
            if (isEmailValid(email.val())) {
                email.removeClass('is-invalid');
                status = true;
            } else {
                email.addClass('is-invalid');
                status = false;
                return status;
            }
        }
        if (password.val() === "") {
            password.addClass('is-invalid');
            status = false;
            return status;
        } else {
            password.removeClass('is-invalid');
            status = true;
        }
        if (status) {
            $("#login_spinner").show();
            $("#login_form").hide();
            $("#start_session").hide();
            document.getElementById('card_id').style.backgroundColor = "transparent";
            const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
            $.ajax({
                url: 'login/',
                type: 'POST',
                dataType: 'json',
                crossDomain: true,
                data: {email: email.val(), password: password.val()},
                headers: {
                    'X-CSRFToken': csrfToken
                },
                success: function (data) {
                    if (data.code === 200) {
                        //document.cookie = 'laravel_token=' + data.data['access_token'] + '; path=/; expires=Sat, '+eightHoursFromNow.toUTCString()+' GMT;';
                        window.location.href = "/dashboard/"
                    } else {
                        $("#login_form").show();
                        $("#start_session").show();
                        document.getElementById('card_id').style.background = "white";
                        alert(data.code);
                    }
                }
            })
        }
    });

    function isEmailValid(email) {
        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

})