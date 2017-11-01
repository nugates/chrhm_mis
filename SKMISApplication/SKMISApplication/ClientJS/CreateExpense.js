/// <reference path="C:\Users\Satyam-PC\Documents\Visual Studio 2015\Projects\SmartTrucking\SmartTrucking\CompanyList.aspx" />
var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {
    var aid = GetParameterValues('aid');
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
    permissionforlist('CreateExpense.aspx', 'btnsave', 'ExpenseList.aspx', 'btnCancel');
    // *******************************end permissionm**************************

    setTimeout(function () {  
    if (aid == undefined) {
        Req = 'Country';
        obj = "Fill";
        url = "CreateExpense.aspx/ExpenseDetails";
        ht = {};
        LoadAjaxAddress(ht, obj, Req, url);
    }
    else {
        $('#ID_hidden').val('' + aid);
        Req = 'Country@Edit';
        obj = "Fill";
        url = "CreateExpense.aspx/ExpenseDetails";
        ht = {};
        ht["ID"] = aid;
        LoadAjaxAddress(ht, obj, Req, url);
    }
    }, 2000);
});
$("#cmbCountry").change(function () {
    Req = 'State';
    obj = "State";
    url = "CreateExpense.aspx/ExpenseDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#cmbCountry :selected").val();
    LoadAjaxAddress(ht, obj, Req, url);
});

function LoadAjaxAddress(ht, obj, Req, url) {
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
            if (obj == "State") {
                if (Result.d.State != "" && Result.d.State != undefined) {
                    var State = jQuery.parseJSON(Result.d.State);
                    $('#cmbState').html('');
                    $('#cmbState').append($('<option></option>'));
                    $.each(State, function (index, item) {
                        $('#cmbState').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }
    
            if (obj == "Fill") {

                if (Result.d.Country != "" && Result.d.Country != undefined) {
                    var Country = jQuery.parseJSON(Result.d.Country);
                    $('#cmbCountry').html('');
                    $('#cmbCountry').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.Unit != "" && Result.d.Unit != undefined) {
                    var Unit = jQuery.parseJSON(Result.d.Unit);
                    $('#cmbUnit').html('');
                    $('#cmbUnit').append($('<option></option>'));
                    $.each(Unit, function (index, item) {
                        $('#cmbUnit').append($('<option></option>').val(item.Cust_Type_ID).html(item.Type));
                    });
                }

                if (Result.d.ExpenseCategory != "" && Result.d.ExpenseCategory != undefined) {
                    var ExpenseCategory = jQuery.parseJSON(Result.d.ExpenseCategory);
                    $('#cmbExpenseCategory').html('');
                    $('#cmbExpenseCategory').append($('<option></option>'));
                    $.each(ExpenseCategory, function (index, item) {
                        $('#cmbExpenseCategory').append($('<option></option>').val(item.Cust_Type_ID).html(item.Type));
                    });
                }

                if (Result.d.Vendor != "" && Result.d.Vendor != undefined) {
                    var Vendor = jQuery.parseJSON(Result.d.Vendor);
                    $('#cmbVendor').html('');
                    $('#cmbVendor').append($('<option></option>'));
                    $.each(Vendor, function (index, item) {
                        $('#cmbVendor').append($('<option></option>').val(item.Cust_Type_ID).html(item.Type));
                    });
                }


                if (Result.d.State != "" && Result.d.State != undefined) {
                    var State = jQuery.parseJSON(Result.d.State);
                    $('#cmbState').html('');
                    $('#cmbState').append($('<option></option>'));
                    $.each(State, function (index, item) {
                        $('#cmbState').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

           

                //EDIT MAPPING

                if (Result.d.ExpenseData != "" && Result.d.ExpenseData != undefined) {
                    var json = jQuery.parseJSON(Result.d.ExpenseData);
                    $("#btnsave").text("Update");

                    $.each(json, function (index, item) {
                        $("#ID_hidden").val(item.ID);
                        $("#cmbExpenseCategory option").each(function () {
                            if ($(this).val().trim() == item.Expense_category_ID) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        $("#txtExpensedate").val(item.Expense_Date);
                        $("#txtAmount").val(item.Amount);
                        $("#txtDescription").val(item.Description);
                        $("#cmbUnit option").each(function () {
                            if ($(this).val().trim() == item.Unit_ID) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        $("#txtGallons").val(item.Gallons);
                        $("#txtOdometer").val(item.Odometer);
                        $("#cmbCountry option").each(function () {
                            if ($(this).val().trim() == item.Country_ID) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        $("#cmbVendor option").each(function () {
                            if ($(this).val().trim() == item.Fuel_Vendor_ID) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                       
                        setTimeout(function () {
                            $("#cmbState option").each(function () {
                                if ($(this).val().trim() == item.State_ID.trim()) {
                                    $(this).attr("selected", "selected");
                                    $(this).prop('selected', true).trigger('change');
                                }
                            });
                        }, 1000);


                      

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
                       window.location = 'ExpenseList.aspx';
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
                        window.location = 'ExpenseList.aspx';
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
    window.location = 'ExpenseList.aspx';
}

function AddNewMANLOG() {

    if (validationcheck() == true) {

      
        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["Expense_category_ID"] = $("#cmbExpenseCategory :selected").val();
            ht["Expense_Date"] = $("#txtExpensedate").val();
            ht["Amount"] = $("#txtAmount").val();
            ht["Description"] = $("#txtDescription").val();
            ht["Unit_ID"] = $("#cmbUnit :selected").val();
            ht["Gallons"] = $("#txtGallons").val();
            ht["Odometer"] = $("#txtOdometer").val();
            ht["Fuel_Vendor_ID"] = $("#cmbVendor :selected").val();
            ht["Country_ID"] = $("#cmbCountry :selected").val();
            ht["State_ID"] = $("#cmbState :selected").val();
            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            if ($("#btnsave").text() == "Save") {
                Req = 'Save';
                obj = "Save";
                url = "CreateExpense.aspx/ExpenseDetails";
                LoadAjaxAddress(ht, obj, Req, url);
            }
            if ($("#btnsave").text() == "Update") {
                Req = 'Update';
                obj = "Update";
                url = "CreateExpense.aspx/ExpenseDetails";
                LoadAjaxAddress(ht, obj, Req, url);
            }
        }, 1000);
    }
}

function validationcheck() {
    if ($('#cmbExpenseCategory').val() == "") {
        popupErrorMsg($("#cmbExpenseCategory"), "Please select a Category.", 5);
        //alert("company name is required.");
        //$('#txtCompanyName').focus();
        return false;
    }
    if ($('#txtExpensedate').val() == "") {
        popupErrorMsg($("#txtExpensedate"), "Expense Date Required", 5);
        //alert("email is required.");
        //$('#txtEmail').focus();
        return false;
    }
    if ($('#txtAmount').val() == "") {
        popupErrorMsg($("#txtAmount"), "Amount Required", 5);
        //alert("email is required.");
        //$('#txtEmail').focus();
        return false;
    }
    if ($('#cmbUnit').val() == "") {
        popupErrorMsg($("#cmbUnit"), "Please select an Unit.", 5);
        //alert("company name is required.");
        //$('#txtCompanyName').focus();
        return false;
     }
      if ($('#cmbVendor').val() == "") {
     popupErrorMsg($("#cmbVendor"), "Please select a Vendor.", 5);
        //alert("email is required.");
        //$('#txtEmail').focus();
        return false;
     }
    return true;
}




















