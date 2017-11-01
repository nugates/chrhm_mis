/// <reference path="C:\Users\Satyam-PC\Documents\Visual Studio 2015\Projects\SmartTrucking\SmartTrucking\TaxList.aspx" />
var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {
    var rid = GetParameterValues('rid');
    function GetParameterValues(param) {
        //var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        if (window.location.href.indexOf('?') > 0) {
            var urlenc = (window.location.href.slice(window.location.href.indexOf('?') + 1));
            var url = atob(urlenc).split('&');
            for (var i = 0; i < url.length; i++) {
                var urlparam = url[i].split('=');
                if (urlparam[0] == param) {
                    return urlparam[1];
                }
            }
        }
    }

    // *******************************start permissionm**************************
    permissionforlist('CreateTax.aspx', 'btnsave', 'TaxList.aspx', 'btnCancel');
    // *******************************end permissionm**************************

    setTimeout(function () {  
    if (rid == undefined) {

    }
    else {
        $('#ID_hidden').val('' + rid);
        Req = 'Edit';
        obj = "Fill";
        url = "CreateTax.aspx/TaxDetails";
        ht = {};
        ht["Tax_ID"] = rid;
        LoadAjaxTax(ht, obj, Req, url);
    }
    }, 2000);
});

function LoadAjaxTax(ht, obj, Req, url) {
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


            if (obj == "Fill") {


                //EDIT MAPPING
                if (Result.d.TaxData != "" && Result.d.TaxData != undefined) {
                    var json = jQuery.parseJSON(Result.d.TaxData);
                    $("#btnsave").text("Update");

                    $.each(json, function (index, item) {
                        $("#ID_hidden").val(item.ID);
                        $("#txtTax").val(item.Name);
                        $("#txtShortName").val(item.Short_Name);
                        $("#txtDescription").val(item.Description);
                        $("#txtPercentage").val(item.Percentage);
                    });
                }


            }
            if (obj == "Save") {
                if (Result.d.Save != "" && Result.d.Save != undefined) {
                    var json = jQuery.parseJSON(Result.d.Save)[0];

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
                       window.location = 'TaxList.aspx';
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
                        window.location = 'TaxList.aspx';
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
    window.location = 'TaxList.aspx';
}

function AddNewTax() {

    if (validationcheck() == true) {

        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["Name"] = $("#txtTax").val();
            ht["Short_Name"] = $("#txtShortName").val();
            ht["Description"] = $("#txtDescription").val();
            ht["Percentage"] = $("#txtPercentage").val();

            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            if ($("#btnsave").text() == "Save") {
                Req = 'Save';
                obj = "Save";
                url = "CreateTax.aspx/TaxDetails";
                LoadAjaxTax(ht, obj, Req, url);
            }
            if ($("#btnsave").text() == "Update") {
                Req = 'Update';
                obj = "Update";
                url = "CreateTax.aspx/TaxDetails";
                LoadAjaxTax(ht, obj, Req, url);
            }
        }, 1000);
    }
}
function validationcheck() {

    if ($('#txtTax').val() == "") {
        popupErrorMsg($("#txtTax"), "Tax Name is required.", 5);
        //alert("Tax is required.");
        //$('#txtTax').focus();
        return false;
    }
    if ($('#txtShortName').val() == "") {
        popupErrorMsg($("#txtShortName"), "Short Name is required.", 5);
        //alert("Short Neme is required.");
        //$('#txtShortName').focus();
        return false;
    }
    if ($('#txtPercentage').val() == "") {
        popupErrorMsg($("#txtPercentage"), "Tax Percentage is required.", 5);
        //alert("Short Neme is required.");
        //$('#txtShortName').focus();
        return false;
    }
    var numbers = ("."[0 - 9]);
    if (txtPercentage.value.match(numbers)) {
        return true;
    }
    else {
        popupErrorMsg($("#txtPercentage"), "Please enter a valid Percentage.", 5);
        //alert('Please enter a valid Percentage');
        //$('#txtPercentage').focus();
        return false;
    }

    return true;
}