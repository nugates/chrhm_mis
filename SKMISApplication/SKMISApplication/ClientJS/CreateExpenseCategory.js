/// <reference path="C:\Users\Chandan-PC\Documents\Visual Studio 2015\Projects\SmartTrucking\SmartTrucking\TruckList.aspx" />
var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {
    var tid = GetParameterValues('tid');
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
    permissionforlist('CreateExpenseCategory.aspx', 'btnsave', 'ExpenseCategoryList.aspx', 'btnCancel');
    // *******************************end permissionm**************************


    setTimeout(function () {  
    if (tid == undefined) {

    }
    else {
        $('#ID_hidden').val('' + tid);
        Req = 'Edit';
        obj = "Fill";
        url = "CreateExpenseCategory.aspx/CreateExpenseCategoryDetails";
        ht = {};
        ht["ID"] = tid;
        LoadAjaxCreateExpenseCategory(ht, obj, Req, url);
    }
    }, 2000);
});


function LoadAjaxCreateExpenseCategory(ht, obj, Req, url) {
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

                if (Result.d.ExpenseCategoryData != "" && Result.d.ExpenseCategoryData != undefined) {
                    var json = jQuery.parseJSON(Result.d.ExpenseCategoryData);
                    $("#btnsave").text("Update");

                    $.each(json, function (index, item) {
                        $("#ID_hidden").val(item.ID);
                        $("#txtExpenseCategory").val(item.ExpenseCategory_Name);
                        $("#txtExpenseCategorydescription").val(item.ExpenseCategory_Description);
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
                       window.location = 'ExpenseCategoryList.aspx';
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
                        window.location = 'ExpenseCategoryList.aspx';
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
    window.location = 'ExpenseCategoryList.aspx';
}

function AddNewExpenseCategory() {

    if (validationcheck() == true) {

        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["ExpenseCategory_Name"] = $("#txtExpenseCategory").val();
            ht["ExpenseCategory_Description"] = $("#txtExpenseCategorydescription").val();

            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            if ($("#btnsave").text() == "Save") {
                Req = 'Save';
                obj = "Save";
                url = "CreateExpenseCategory.aspx/CreateExpenseCategoryDetails";
                LoadAjaxCreateExpenseCategory(ht, obj, Req, url);
            }
            if ($("#btnsave").text() == "Update") {
                Req = 'Update';
                obj = "Update";
                url = "CreateExpenseCategory.aspx/CreateExpenseCategoryDetails";
                LoadAjaxCreateExpenseCategory(ht, obj, Req, url);
            }
        }, 1000);
    }
}

function validationcheck() {
    if ($('#txtExpenseCategory').val() == "") {
        popupErrorMsg($("#txtExpenseCategory"), "Expense Category is Required.", 5);
       
        return false;
    }
    return true;
}













