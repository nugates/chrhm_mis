var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";

function LoadAjaxLogin(ht, obj, Req, url) {
    $.ajax({
        type: "POST",
        url: url,
        data: "{ht:" + JSON.stringify(ht) + " ,Type :'" + obj + "' ,Req :'" + Req + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Result) {
            var json = jQuery.parseJSON(Result.d.ErrorDetail);
            var sa_error = "";
            var sa_errrorMsg = "";
            $.each(json, function (index, K) {
                sa_error = K.Error;
                sa_errrorMsg = K.ErrorMessage;
            });
            if (sa_error == '2') {
               // swal("", sa_errrorMsg, "error");
                alert(sa_errrorMsg);
                return 0;
            }
            else if (sa_error == '1') {
                //swal("", sa_errrorMsg, "info");
                alert(sa_errrorMsg);
                return 0;
            }
            else if (sa_error == '0') {

                window.location.assign('Login.aspx');

                alert(sa_errrorMsg);
            }
        }
    });
}
function Reset_Password() {
    if (validationchecklogin() == true) {

        setTimeout(function () {
            ht = {};
            ht["Email"] = $("#txtemail_forlogin").val();
            ht["MODE"] = "FORGET";
            Req = "NormalLogin";
            obj = "Login";
            url = "Forget_Password.aspx/LoginDetails";
            LoadAjaxLogin(ht, obj, Req, url);
        }, 1000);
    }
}
function validationchecklogin() {

    if ($('#txtemail_forlogin').val() == "") {
        alert("Email ID is required.");
        $('#txtemail_forlogin').focus();
        return false;
    }
   

    return true;
}