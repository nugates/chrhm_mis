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
    permissionforlist('CreateFuelVendor.aspx', 'btnsave', 'FuelVendorList.aspx', 'btnCancel');
    // *******************************end permissionm**************************
    setTimeout(function () {        
    if (aid == undefined) {
        Req = 'Country';
        obj = "Fill";
        url = "CreateFuelVendor.aspx/AddressDetails";
        ht = {};
        LoadAjaxAddress(ht, obj, Req, url);
    }
    else {
        $('#ID_hidden').val('' + aid);
        Req = 'Country@Edit';
        obj = "Fill";
        url = "CreateFuelVendor.aspx/AddressDetails";
        ht = {};
        ht["ID"] = aid;
        LoadAjaxAddress(ht, obj, Req, url);
    }
    }, 2000);
});
$("#cmbCountry").change(function () {
    Req = 'State';
    obj = "State";
    url = "CreateFuelVendor.aspx/AddressDetails";
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

                if (Result.d.Cust_Type != "" && Result.d.Cust_Type != undefined) {
                    var Cust_Type = jQuery.parseJSON(Result.d.Cust_Type);
                    $('#cmbCustomer').html('');
                    $('#cmbCustomer').append($('<option></option>'));
                    $.each(Cust_Type, function (index, item) {
                        $('#cmbCustomer').append($('<option></option>').val(item.Cust_Type_ID).html(item.Type));
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

                if (Result.d.AddressData != "" && Result.d.AddressData != undefined) {
                    var json = jQuery.parseJSON(Result.d.AddressData);
                    $("#btnsave").text("Update");

                    $.each(json, function (index, item) {
                        $("#ID_hidden").val(item.ID);
                        $("#txtCompanyName").val(item.Company_Name);
                        $("#txtStreet").val(item.Street);
                        $("#txtApt_Suite_Other").val(item.Apt_Suite_Other);
                        $("#txtCity").val(item.City);
                        $("#txtZip_Code").val(item.Zip_Code);
                        $('#txtCellNo').val(item.CellNo);
                        $("#txtPhoneNo").val(item.PhoneNo);
                        $("#txtFax").val(item.Fax);
                        $("#txtEmail").val(item.Email);
                        $("#txtWebsite").val(item.WebsiteUrl);
                        $("#txtContact").val(item.Contact);
                        $("#txtNotes").val(item.Notes);
                        $("#txtMotor_Carrier_Number").val(item.Motor_Carrier_Number);
                        $("#txtTax_ID").val(item.Tax_ID);

                        $("#cmbCountry option").each(function () {
                            if ($(this).val().trim() == item.Country) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });

                        $("#cmbCustomer option").each(function () {
                            if ($(this).val().trim() == item.Customer_Type) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });


                        setTimeout(function () {
                            $("#cmbState option").each(function () {
                                if ($(this).val().trim() == item.State.trim()) {
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
                       window.location = 'FuelVendorList.aspx';
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
                        window.location = 'FuelVendorList.aspx';
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
    window.location = 'FuelVendorList.aspx';
}

function AddNewAddress() {

    if (validationcheck() == true) {

      
        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["Company_Name"] = $("#txtCompanyName").val();
            ht["Customer_Type"] = $("#cmbCustomer :selected").val();
            ht["Street"] = $("#txtStreet").val();
            ht["Apt_Suite_Other"] = $("#txtApt_Suite_Other").val();
            ht["City"] = $("#txtCity").val();
            ht["Country"] = $("#cmbCountry :selected").val();
            ht["State"] = $("#cmbState :selected").val();
            ht["Zip_Code"] = $("#txtZip_Code").val();
            ht["CellNo"] = $("#txtCellNo").val();
            ht["PhoneNo"] = $("#txtPhoneNo").val();
            ht["Fax"] = $("#txtFax").val();
            ht["Email"] = $("#txtEmail").val();
            ht["WebsiteUrl"] = $("#txtWebsite").val();
            ht["Contact"] = $("#txtContact").val();
            ht["Notes"] = $("#txtNotes").val();
            ht["Motor_Carrier_Number"] = $("#txtMotor_Carrier_Number").val();
            ht["Tax_ID"] = $("#txtTax_ID").val();
          
          

            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            if ($("#btnsave").text() == "Save") {
                Req = 'Save';
                obj = "Save";
                url = "CreateFuelVendor.aspx/AddressDetails";
                LoadAjaxAddress(ht, obj, Req, url);
            }
            if ($("#btnsave").text() == "Update") {
                Req = 'Update';
                obj = "Update";
                url = "CreateFuelVendor.aspx/AddressDetails";
                LoadAjaxAddress(ht, obj, Req, url);
            }
        }, 1000);
    }
}

function validationcheck() {
    if ($('#txtCompanyName').val() == "") {
        popupErrorMsg($("#txtCompanyName"), "Company name is required.", 5);
        //alert("company name is required.");
        //$('#txtCompanyName').focus();
        return false;
    }
    if ($('#txtEmail').val() == "") {
        popupErrorMsg($("#txtEmail"), "Email Id is required.", 5);
        //alert("email is required.");
        //$('#txtEmail').focus();
        return false;
    }

    var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test($("#txtEmail").val())) {
        popupErrorMsg($("#txtEmail"), "Please Enter a Valid Email ID.", 5);
        //alert("enter a valid email.");
        //$('#txtEmail').focus();
        return false;

    }

    return true;
}




















