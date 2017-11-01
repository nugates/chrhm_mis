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
    permissionforlist('CreateMaintenanceLog.aspx', 'btnsave', 'Maintenance_Log_List.aspx', 'btnCancel');
    // *******************************end permissionm**************************

    setTimeout(function () {  
    if (aid == undefined) {
        Req = 'Unit';
        obj = "Fill";
        url = "CreateMaintenanceLog.aspx/MaintenanceLogDetails";
        ht = {};
        LoadAjaxAddress(ht, obj, Req, url);
    }
    else {
        $('#ID_hidden').val('' + aid);
        Req = 'Unit@Edit';
        obj = "Fill";
        url = "CreateMaintenanceLog.aspx/MaintenanceLogDetails";
        ht = {};
        ht["ID"] = aid;
        LoadAjaxAddress(ht, obj, Req, url);
    }
    }, 2000);
});

//function DeeFormate(date) {

//    if (date != null && (date != undefined || date != 'undefined')) {
//        return new Date(parseInt((date).replace(/\/Date\((\d+)\)\//g, "$1")));
//    }
//    return "";
//}
//function formatDate(date) {
//    var d = new Date(date),
//            month = '' + (d.getMonth() + 1),
//            day = '' + d.getDate(),
//            year = d.getFullYear();
//    if (month.length < 2)
//        month = '0' + month;
//    if (day.length < 2)
//        day = '0' + day;
//    return [year, month, day].join('-');
//}

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

    
            if (obj == "Fill") {

                if (Result.d.Unit != "" && Result.d.Unit != undefined) {
                    var Unit = jQuery.parseJSON(Result.d.Unit);
                    $('#cmbUnit').html('');
                    $('#cmbUnit').append($('<option></option>'));
                    $.each(Unit, function (index, item) {
                        $('#cmbUnit').append($('<option></option>').val(item.Cust_Type_ID).html(item.Type));
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




           

                //EDIT MAPPING

                if (Result.d.LogData != "" && Result.d.LogData != undefined) {
                    var json = jQuery.parseJSON(Result.d.LogData);
                    $("#btnsave").text("Update");

                    $.each(json, function (index, item) {
                        $("#ID_hidden").val(item.ID);
                        $("#cmbUnit option").each(function () {
                            if ($(this).val().trim() == item.Unit) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        $("#txtDescription").val(item.Description);
                        $("#txtAmount").val(item.Amount);
                        $("#txtRepairdate").val(item.Repair_Date);
                        $("#txtOdometer").val(item.Odometer);
                       
                        setTimeout(function () {
                            $("#cmbVendor option").each(function () {
                                if ($(this).val().trim() == item.Maintenance_Vendor) {
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
                       window.location = 'Maintenance_Log_List.aspx';
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
                        window.location = 'Maintenance_Log_List.aspx';
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
    window.location = 'Maintenance_Log_List.aspx';
}

function AddNewMANLOG() {

    if (validationcheck() == true) {

      
        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["Unit"] = $("#cmbUnit :selected").val();
            ht["Description"] = $("#txtDescription").val();
            ht["Amount"] = $("#txtAmount").val();
            ht["Repair_Date"] = $("#txtRepairdate").val();
            ht["Odometer"] = $("#txtOdometer").val();
         
            ht["Maintenance_Vendor"] = $("#cmbVendor :selected").val();
           

            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            if ($("#btnsave").text() == "Save") {
                Req = 'Save';
                obj = "Save";
                url = "CreateMaintenanceLog.aspx/MaintenanceLogDetails";
                LoadAjaxAddress(ht, obj, Req, url);
            }
            if ($("#btnsave").text() == "Update") {
                Req = 'Update';
                obj = "Update";
                url = "CreateMaintenanceLog.aspx/MaintenanceLogDetails";
                LoadAjaxAddress(ht, obj, Req, url);
            }
        }, 1000);
    }
}

function validationcheck() {
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
      if ($('#txtAmount').val() == "") {
          popupErrorMsg($("#txtAmount"), "Amount Required", 5);
          //alert("email is required.");
          //$('#txtEmail').focus();
          return false;
      }
    if ($('#txtRepairdate').val() == "") {
        popupErrorMsg($("#txtRepairdate"), "Repair Date Required", 5);
        //alert("email is required.");
        //$('#txtEmail').focus();
        return false;
    }
    if ($('#txtOdometer').val() == "") {
        popupErrorMsg($("#txtOdometer"), "Odometer Is Required", 5);
        //alert("email is required.");
        //$('#txtEmail').focus();
        return false;
    }
    return true;
}




















