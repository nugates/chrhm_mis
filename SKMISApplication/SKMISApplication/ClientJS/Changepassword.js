/// <reference path="C:\Users\Satyam-PC\Documents\Visual Studio 2015\Projects\SmartTrucking\SmartTrucking\TaxList.aspx" />
var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";

$(document).ready(function () {
    var cid = GetParameterValues('conid');
    function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
    }

    if (cid == undefined) {

    }
    else {
        $('#ID_hidden').val('' + cid);
      
    }
});

function LoadAjaxPassword(ht, obj, Req, url) {
    $('body').pleaseWait();

    $.ajax({
        type: "POST",
        url: url,
        data: "{ht:" + JSON.stringify(ht) + ",Type :'" + obj + "' ,Req :'" + Req + "'}",
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
            if (sa_error != 'false') {
                swal("", sa_errrorMsg, "error");
                $('body').pleaseWait('stop');
                return 0;
            }


            if (obj == "Update") {
                if (Result.d.Update != "" && Result.d.Update != undefined) {
                    var json = jQuery.parseJSON(Result.d.Update)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
                        },
                    function () {
                        window.location = 'ChangePassword.aspx';
                    });


                    }
                    else if (json.CustomErrorState == "1") {
                        swal("", "Something went wrong , please try again later !!", "error");

                    }
                    else if (json.CustomErrorState == "2") {
                        swal("", json.CustomMessage, "info");

                    }
                }
                else {
                    swal("", "Some problem occurred please try again later", "info");
                }
            }
            $('body').pleaseWait('stop');
        }
    });
}
function redirect() {
    window.location = 'Home.aspx';
}

function Change_Password() {

    if (validationcheck() == true) {

        setTimeout(function () {
            ht = {};
            ht["Contact_ID"] = $('#ID_hidden').val();
            ht["Old_Password"] = $("#txtoldPsswd").val();
            ht["New_password"] = $("#txtnewPsswd").val();
            ht["MODE"] = "CHANGE";
         
          
            if ($("#btnsave").text() == "Change") {
                Req = 'Update';
                obj = "Update";
                url = "ChangePassword.aspx/ChangePasswordDetails";
                LoadAjaxPassword(ht, obj, Req, url);
            }
        }, 1000);
    }
}
function validationcheck() {

    if ($('#txtoldPsswd').val() == "") {
        popupErrorMsg($("#txtoldPsswd"), "Please Enter Current Password.", 5);
        //alert("Tax is required.");
        //$('#txtTax').focus();
        return false;
    }
    if ($('#txtnewPsswd').val() == "") {
        popupErrorMsg($("#txtnewPsswd"), "Please Enter New Password.", 5);
        //alert("Short Neme is required.");
        //$('#txtShortName').focus();
        return false;
    }

    if ($('#txtconfPsswd').val() == "") {
        popupErrorMsg($("#txtconfPsswd"), "Please Confirm New Password.", 5);
        //alert("Short Neme is required.");
        //$('#txtShortName').focus();
        return false;
    }

    if ($('#txtnewPsswd').val() != $('#txtconfPsswd').val()) {
        swal("Passwords do not match!")
        return false;
    }

    return true;
}