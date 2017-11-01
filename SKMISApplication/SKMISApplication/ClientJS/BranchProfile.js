/// <reference path="C:\Users\Satyam-PC\Documents\Visual Studio 2015\Projects\SmartTrucking\SmartTrucking\CompanyList.aspx" />
var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";

$(document).ready(function () {
    var cid = GetParameterValues('cid');
    //function GetParameterValues(param) {
    //    //var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    //    if (window.location.href.indexOf('?') > 0) {
    //        var urlenc = (window.location.href.slice(window.location.href.indexOf('?') + 1));
    //        var url = atob(urlenc).split('&');
    //        for (var i = 0; i < url.length; i++) {
    //            var urlparam = url[i].split('=');
    //            if (urlparam[0] == param) {
    //                return urlparam[1];
    //            }
    //        }
    //    }
    //}
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
        Req = 'Country@Company';
        obj = "Fill";
        url = "Branch_Profile.aspx/CompanyDetails";
        ht = {};
        LoadAjaxBranch(ht, obj, Req, url);
    }
    else {
        $('#ID_hidden').val('' + cid);
        Req = 'Country@Edit@Company';
        obj = "Fill";
        url = "Branch_Profile.aspx/CompanyDetails";
        ht = {};
        ht["COMPANY_ID"] = cid;
        LoadAjaxBranch(ht, obj, Req, url);
    }
});
$("#cmbCountry").change(function () {
    Req = 'State';
    obj = "State";
    url = "Branch_Profile.aspx/CompanyDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#cmbCountry :selected").val();
    LoadAjaxBranch(ht, obj, Req, url);
});


function LoadAjaxBranch(ht, obj, Req, url) {
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

                if (Result.d.Company != "" && Result.d.Company != undefined) {
                    var Company = jQuery.parseJSON(Result.d.Company);
                    $('#cmbCompany').html('');
                    $('#cmbCompany').append($('<option></option>'));
                    $.each(Company, function (index, item) {
                        $('#cmbCompany').append($('<option></option>').val(item.ID).html(item.CompanyName));
                    });
                }

                if (Result.d.Country != "" && Result.d.Country != undefined) {
                    var Country = jQuery.parseJSON(Result.d.Country);
                    $('#cmbCountry').html('');
                    $('#cmbCountry').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
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

                if (Result.d.CompanyData != "" && Result.d.CompanyData != undefined) {
                    var json = jQuery.parseJSON(Result.d.CompanyData);
                    $("#btnupdate").text("Update");

                    $.each(json, function (index, item) {
                        $("#ID_hidden").val(item.ID);
                        $("#ID_hiddenContact_ID").val(item.Contact_ID);
                        $("#txtCBranchName").val(item.Name);
                        $("#lblBranchName").html(item.Name);
                        $("#cmbCompany").val(item.Company_ID);
                        $("#cmbCompany").attr('disabled', 'true');
                        $("#txtHOD").val(item.HODName);
                        $("#txtMobileNo").val(item.MobileNo);
                        $("#txtPhoneNo").val(item.PhoneNo);
                        $("#txtEmail").val(item.Email);
                       // $('#txtPassword').val("............");
                       // $('#txtPassword').attr('readonly', 'true');
                        $("#txtCity").val(item.City);
                        $("#txtAddress").val(item.Address);

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
                        window.location = 'Branch_Profile.aspx?cid=' + document.getElementById('ID_hidden').value;
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
    window.location = 'ChangePassword.aspx?cid=' + document.getElementById('ID_hiddenContact_ID').value;
}

function UpdateBranch() {

    if (validationcheck() == true) {

        if ($('#f_Uploadfile')[0].files[0] != undefined) {
            sendFile();
        }

        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["Name"] = $("#txtCBranchName").val();
            ht["Company_ID"] = $("#cmbCompany").val();
            ht["HODName"] = $("#txtHOD").val();
            ht["MobileNo"] = $("#txtMobileNo").val();
            ht["PhoneNo"] = $("#txtPhoneNo").val();
            ht["Email"] = $("#txtEmail").val();
         //   ht["Password"] = $("#txtPassword").val();
            ht["Country"] = $("#cmbCountry :selected").val();
            ht["State"] = $("#cmbState :selected").val();
            ht["City"] = $("#txtCity").val();
            ht["Address"] = $("#txtAddress").val();
            ht["Logo"] = $("#LogoPath").val();

            

            //ht["MODE"] = $("#ID_hidden").val() == undefined ? "INSERT" : "UPDATE";

          
                ht["MODE"] = "UPDATE";
           

        
                if ($("#btnupdate").text() == "Update") {
                Req = 'Update';
                obj = "Update";
                url = "Branch_Profile.aspx/CompanyDetails";
                LoadAjaxBranch(ht, obj, Req, url);
            }
        }, 1000);
    }
}

function validationcheck() {
    if ($('#cmbCompany').val() == "") {
        popupErrorMsg($("#cmbCompany"), "company name is required.", 5);
        //alert("company name is required.");
        //$('#Company_ID').focus();
        return false;
    }
    if ($('#txtCBranchName').val() == "") {
        popupErrorMsg($("#txtCBranchName"), "branch name is required.", 5);
        //alert("Branch name is required.");
        //$('#txtCBranchName').focus();
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
        alert("enter a valid email.");
        $('#txtEmail').focus();
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
        url: 'ImageUploadHandlerBranch.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                $("#LogoPath").val("BranchLogo/" + status); // id comming from html page             
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Error saving image");
        }
    });
}















