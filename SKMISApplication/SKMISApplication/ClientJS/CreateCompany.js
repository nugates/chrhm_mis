/// <reference path="C:\Users\Satyam-PC\Documents\Visual Studio 2015\Projects\SmartTrucking\SmartTrucking\CompanyList.aspx" />
var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";

var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {

    var cid = GetParameterValues('cid');
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
    //permissionforlist('CreateCompany.aspx', 'btnsave', 'CompanyList.aspx', 'btnCancel');
    // *******************************end permissionm**************************


    setTimeout(function () {        
        if (cid == undefined) {
            Req = 'Country';
            obj = "Fill";
            url = "CreateCompany.aspx/CompanyDetails";
            ht = {};
            LoadAjaxCompany(ht, obj, Req, url);
        }
        else {
            $('#ID_hidden').val('' + cid);
            Req = 'Country@Edit';
            obj = "Fill";
            url = "CreateCompany.aspx/CompanyDetails";
            ht = {};
            ht["COMPANY_ID"] = cid;
            LoadAjaxCompany(ht, obj, Req, url);
        }

    }, 2000);

});
$("#cmbCountry").change(function () {
    Req = 'State';
    obj = "State";
    url = "CreateCompany.aspx/CompanyDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#cmbCountry :selected").val();
    LoadAjaxCompany(ht, obj, Req, url);
});

//$("#cmbState").change(function () {    
//    $('#txtCity').focus();  
//});

function LoadAjaxCompany(ht, obj, Req, url) {
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


                OpenSelect2('cmbState');
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

                //for auto fill textbox start
                //if (Result.d.Country != "" && Result.d.Country != undefined) {
                //    var GetAllEmployee = jQuery.parseJSON(Result.d.Country);
                //    var availableTags = [];
                //    $.each(GetAllEmployee, function (index, item) {
                //        availableTags.push({ id: '' + item.COUNTRY_ID + '', value: '' + item.Name + '' });
                //    });                   
                //    employeedata(availableTags);
                //}
                //for auto fill textbox end




                if (Result.d.State != "" && Result.d.State != undefined) {
                    var State = jQuery.parseJSON(Result.d.State);
                    $('#cmbState').html('');
                    $('#cmbState').append($('<option></option>'));
                    $.each(State, function (index, item) {
                        $('#cmbState').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                //EDIT MAPPING

                if (Result.d.CompanyData != "" && Result.d.CompanyData != undefined) {
                    var json = jQuery.parseJSON(Result.d.CompanyData);
                    $("#btnsave").text("Update");

                    $.each(json, function (index, item) {
                        $("#ID_hidden").val(item.ID);
                        $("#txtCompanyName").val(item.CompanyName);
                        $("#txtCeoName").val(item.CEOName);
                        $("#txtMobileNo").val(item.MobileNo);
                        $("#txtPhoneNo").val(item.PhoneNo);
                        $("#txtEmail").val(item.Email);
                        $('#txtPassword').val("............");
                        $('#txtPassword').attr('readonly', 'true');
                        $("#txtCity").val(item.City);
                        $("#txtCompanyType").val(item.CompanyType);
                        $("#txtAddress").val(item.Address);
                        $("#txtWebsite").val(item.WebsiteUrl);

                        $("#cmbCountry option").each(function () {
                            if ($(this).val().trim() == item.Country) {
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


                        $('#selectimg').attr('src', "");
                        $('#LogoPath').val(item.LogoPath);
                        //alert(item.Logo);                    
                        $('#selectimg').attr('src', '' + item.LogoPath + '');
                        if (item.LogoPath != "") {
                            $("#selectimg").show();
                        }

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
                       window.location = 'CompanyList.aspx';
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
                        window.location = 'CompanyList.aspx';
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
    window.location = 'CompanyList.aspx';
}

function AddNewCompany() {

    if (validationcheck() == true) {

        if ($('#f_Uploadfile')[0].files[0] != undefined) {
            sendFile();
        }

        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["CompanyName"] = $("#txtCompanyName").val();
            ht["CEOName"] = $("#txtCeoName").val();
            ht["MobileNo"] = $("#txtMobileNo").val();
            ht["PhoneNo"] = $("#txtPhoneNo").val();
            ht["Email"] = $("#txtEmail").val();
            ht["Password"] = $("#txtPassword").val();
            ht["Country"] = $("#cmbCountry :selected").val();
            ht["State"] = $("#cmbState :selected").val();
            ht["City"] = $("#txtCity").val();
            ht["CompanyType"] = $("#txtCompanyType").val();

            ht["Address"] = $("#txtAddress").val();
            ht["WebsiteUrl"] = $("#txtWebsite").val();
            ht["Logo"] = $("#LogoPath").val();

            //ht["MODE"] = $("#ID_hidden").val() == undefined ? "INSERT" : "UPDATE";

            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            if ($("#btnsave").text() == "Save") {
                Req = 'Save';
                obj = "Save";
                url = "CreateCompany.aspx/CompanyDetails";
                LoadAjaxCompany(ht, obj, Req, url);
            }
            if ($("#btnsave").text() == "Update") {
                Req = 'Update';
                obj = "Update";
                url = "CreateCompany.aspx/CompanyDetails";
                LoadAjaxCompany(ht, obj, Req, url);
            }
        }, 1000);
    }
}

function validationcheck() {
    if ($('#txtCompanyName').val() == "") {
        popupErrorMsg($("#txtCompanyName"), "company name is required.", 5);
        //alert("company name is required.");
        //$('#txtCompanyName').focus();
        return false;
    }
    if ($('#txtEmail').val() == "") {
        popupErrorMsg($("#txtEmail"), "email is required.", 5);
        //alert("email is required.");
        //$('#txtEmail').focus();
        return false;
    }

    var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test($("#txtEmail").val())) {
        popupErrorMsg($("#txtEmail"), "enter a valid email.", 5);
        //alert("enter a valid email.");
        //$('#txtEmail').focus();
        return false;

    }
    if ($('#txtPassword').val() == "") {
        popupErrorMsg($("#txtPassword"), "password is required.", 5);
        //alert("password is required.");
        //$('#txtPassword').focus();
        return false;
    }
    return true;
}


$("#f_Uploadfile").on('change', function () {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#selectimg").attr("src", e.target.result);
            $("#selectimg").show();
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function sendFile() {
    var formData = new FormData();
    formData.append('file', $('#f_Uploadfile')[0].files[0]);
    $.ajax({
        type: 'post',
        url: 'ImageUploadHandler.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                $("#LogoPath").val("CompanyLogo/" + status); // id comming from html page             
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Error saving image");
        }
    });
}


//for auto fill textbox start
//function employeedata(data) {
//    $("#txtCompanyName").autocomplete({
//        source: data,
//        focus: function (event, ui) {
//            event.preventDefault();
//            $(this).val(ui.item.value);           
//        },
//        select: function (event, ui) {
//            event.preventDefault();
//            //$(this).val(ui.item.value);
//            //$("#hd_txtEmpnameWithCode").val(ui.item.id);

//        }
//    });
//}
//for auto fill textbox end


function OpenSelect2(id)
{  
    $("#"+id).select2('open');
}

