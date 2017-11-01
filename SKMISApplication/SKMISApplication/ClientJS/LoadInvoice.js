/// <reference path="C:\Users\Satyam-PC\Documents\Visual Studio 2015\Projects\SmartTrucking\SmartTrucking\TaxList.aspx" />
var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {
    var Did = GetParameterValues('Did');
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

    //// *******************************start permissionm**************************
    //permissionforlist('CreateTax.aspx', 'btnsave', 'TaxList.aspx', 'btnCancel');
    //// *******************************end permissionm**************************

    setTimeout(function () {  
        if (Did == undefined) {

    }
    else {
        $('#ID_hidden').val('' + Did);
        Req = 'Basicvalue@ShipperDetails@ConsigneeDetails@FreightDetails@HaulingFeeDetails@FuelSurchargeDetails@AccessorialFeeDetails';
        obj = "Fill";
        url = "LoadInvoice.aspx/AllLoadDetails";
        ht = {};
        ht["Load_ID"] = Did;
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
                if (Result.d.Basicvalue != "" && Result.d.Basicvalue != undefined) {
                    var json = jQuery.parseJSON(Result.d.Basicvalue);

                    $.each(json, function (index, item) {
                        $("#InvoiceHeader").html(item.Cust_Carr_Bro_Name+'('+item.Load_Number+')');
                        $("#lblCust_carr_bro").html(item.Cust_Carr_Bro_Name);
                        $("#lbl_cust_carr_bro_Address").html(item.Cust_Carr_Bro_Address);
                        $("#lbl_load_no").html(item.Load_Number);
                        $("#lbl_Account_no").html(item.Account_No);
                        $("#lbl_Reference").html(item.Reference);
                        $("#lblInvoice_No").html(item.Invoice_Number);
                        $("#lbl_Invoice_Date").html(item.Invoice_date);
                        $("#lbl_Due_Date").html(item.Due_date);
                    });
                }

                if (Result.d.ShipperDetails != "" && Result.d.ShipperDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.ShipperDetails);
                    var table = "";

                    $.each(data, function (i, item) {
                        table = table + "<tr><td><label style='float: right;'>Shipper:</label>" +
                                    "</td><td> <label>" + item.Shipper_Name + " <label>" +
                                    "</td></tr><tr><td></td><td><label>" + item.Pickup_Location_Name + " <label>" +
                                    "</td></tr><tr><td><label style='float: right;'>Pickup Date:</label>" +
                                    "</td><td><label>" + item.Pickup_Date + " <label>" +
                                    "</td></tr><tr><td colspan='2' > <hr style='border-top: 1px dotted blue;' />" +
                                    "</td></tr>"
                    });
                    $("#ShipperListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#ShipperListDiv tbody").append(table);
                    }, 100);
                }

                if (Result.d.ConsigneeDetails != "" && Result.d.ConsigneeDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.ConsigneeDetails);
                    var table1 = "";

                    $.each(data, function (i, item) {
                        table1 = table1 + "<tr><td><label style='float: right;'>Consignee:</label>" +
                                    "</td><td> <label>" + item.Consignee_Name + " <label>" +
                                    "</td></tr><tr><td></td><td><label>" + item.Drop_Of_Location_Name + " <label>" +
                                    "</td></tr><tr><td><label style='float: right;'>Delivery Date:</label>" +
                                    "</td><td><label>" + item.Delivery_Date + " <label>" +
                                    "</td></tr><tr><td colspan='2' > <hr style='border-top: 1px dotted blue;' />" +
                                    "</td></tr>"
                    });
                    $("#ConsigneeListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#ConsigneeListDiv tbody").append(table1);
                    }, 100);
                }

                if (Result.d.FreightDetails != "" && Result.d.FreightDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.FreightDetails);
                    var table2 = "";

                    $.each(data, function (i, item) {
                        table2 = table2 + "<tr><td>" + item.Description +
                                    "</td><td>" + item.Weight_Value + '&nbsp;' + item.Weight_Qty+
                                    "</td><td>" + item.Qty_Value + '&nbsp;' + item.Qty_Unit +
                                    "</td><td>" + item.L_Value + 'x' + item.W_Value + 'x' + item.H_Value + '&nbsp;' + item.LWH_Unit +
                                    "</td></tr>"
                    });
                    $("#FreightListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#FreightListDiv tbody").append(table2);
                    }, 100);
                }
               
                if (Result.d.HaulingFeeDetails != "" && Result.d.HaulingFeeDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.HaulingFeeDetails);
                    var table3 = "";
                    table3 = table3 + "<tr><td> Hauling charges</td><td></td><td></td><td></td><td></td><td></td></tr>"
                    $.each(data, function (i, item) {
                        table3 = table3 + "<tr><td>" + item.HaulingFee_Name + "</td><td>" + item.HaulingFee_Rate + "</td><td>" + item.Tax_Name + "</td><td>" + item.HaulingFee_Amount + "</td><td>" + item.Tax_Amount + "</td><td>" + item.Line_Total + "</td></tr>"
                    });
                    $("#ChargesListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#ChargesListDiv tbody").append(table3);
                    }, 100);
                }


                if (Result.d.FuelSurchargeDetails != "" && Result.d.FuelSurchargeDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.FuelSurchargeDetails);
                    var table4 = "";
                    table4 = table4 + "<tr class='bordertableonly'><td> Fuel Surcharge Fee</td><td></td><td></td><td></td><td></td><td></td></tr>"
                    $.each(data, function (i, item) {
                        table4 = table4 + "<tr><td>" + item.FuelSurcharge_Name + "</td><td>" + item.FuelSurcharge_Rate + "</td><td>" + item.Tax_Name + "</td><td>" + item.FuelSurcharge_Amount + "</td><td>" + item.Tax_Amount + "</td><td>" + item.Line_Total + "</td></tr>"
                    });
                    $("#ChargesListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#ChargesListDiv tbody").append(table4);
                    }, 100);
                }

                if (Result.d.AccessorialFeeDetails != "" && Result.d.AccessorialFeeDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.AccessorialFeeDetails);
                    var table5 = "";
                    table5 = table5 + "<tr class='bordertableonly'><td>Accessory Fees</td><td></td><td></td><td></td><td></td><td></td></tr>"
                    $.each(data, function (i, item) {
                        table5 = table5 + "<tr><td>" + item.AccessorialFee_Name + "</td><td>" + item.AccessorialFee_Rate + "</td><td></td><td>" + item.AccessorialFee_Amount + "</td><td></td><td></td></tr>"
                           
                    });
                  
                    $("#ChargesListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#ChargesListDiv tbody").append(table5);
                    }, 100);
                }

                if (Result.d.Basicvalue != "" && Result.d.Basicvalue != undefined) {
                    var data = jQuery.parseJSON(Result.d.Basicvalue);
                    var table6 = "";
                    $.each(data, function (index, item) {
                        table6 = table6 + "<tr class='bordertableonly'><td colspan='3'> <label style='float: right;'>Total:</label></td><td>" + item.Sub_Total + "</td><td>" + item.Total_Tax_Amt + "</td><td>" + item.Total_Line_Total + "</td></tr>" +
                           " <tr class='bordertableonly'><td colspan='3' class='bordertableno'></td><td colspan='2'><label style='float: right;'>Discount:</label></td><td>" + item.Discount_Total_Amount + "</td></tr>" +
                           " <tr class='bordertableonly'><td colspan='3' class='bordertableno'></td><td colspan='2'><label style='float: right;'>Net Amount:</label></td><td>" + item.Total_Amount + "</td></tr>" +
                           " <tr class='bordertableonly'><td colspan='3' class='bordertableno'></td><td colspan='2'><label style='float: right;'>Advance Received:</label></td><td>0.00</td></tr>" +
                           " <tr class='bordertableonly'><td colspan='3' class='bordertableno'></td><td colspan='2'><label style='float: right;'>Amount To Pay:</label></td><td>" + item.Total_Amount + "</td></tr>" +
                           " <tr class='bordertableonly'><td colspan='6' class='bordertableno'></td></tr>"
                    });
                    $("#ChargesListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#ChargesListDiv tbody").append(table6);
                    }, 100);
                }


            }
            //if (obj == "Save") {
            //    if (Result.d.Save != "" && Result.d.Save != undefined) {
            //        var json = jQuery.parseJSON(Result.d.Save)[0];

            //        if (json.CustomErrorState == "0") {

            //            swal({
            //                title: "",
            //                text: json.CustomMessage,
            //                type: "success",
            //                showCancelButton: false,
            //                confirmButtonColor: "#5cb85c",
            //                confirmButtonText: "Ok!",
            //                closeOnConfirm: false,
            //                timer: 2000
            //            },
            //       function () {
            //           window.location = 'TaxList.aspx';
            //       });

            //        }
            //        else if (json.CustomErrorState == "1") {
            //            swal("", "Something went wrong , please try again later !!", "error");

            //        }
            //        else if (json.CustomErrorState == "2") {
            //            swal("", json.CustomMessage, "info");

            //        }
            //    }
            //    else {
            //        swal("", "Some problem occurred please try again later", "info");
            //    }

            //}
            //if (obj == "Update") {
            //    if (Result.d.Update != "" && Result.d.Update != undefined) {
            //        var json = jQuery.parseJSON(Result.d.Update)[0];

            //        if (json.CustomErrorState == "0") {

            //            swal({
            //                title: "",
            //                text: json.CustomMessage,
            //                type: "success",
            //                showCancelButton: false,
            //                confirmButtonColor: "#5cb85c",
            //                confirmButtonText: "Ok!",
            //                closeOnConfirm: false,
            //                timer: 2000
            //            },
            //        function () {
            //            window.location = 'TaxList.aspx';
            //        });


            //        }
            //        else if (json.CustomErrorState == "1") {
            //            swal("", "Something went wrong , please try again later !!", "error");

            //        }
            //        else if (json.CustomErrorState == "2") {
            //            swal("", json.CustomMessage, "info");

            //        }
            //    }
            //    else {
            //        swal("", "Some problem occurred please try again later", "info");
            //    }
            //}
            $('body').pleaseWait('stop');
        }
    });
}
//function redirect() {
//    window.location = 'TaxList.aspx';
//}

//function AddNewTax() {

//    if (validationcheck() == true) {

//        setTimeout(function () {
//            ht = {};
//            ht["ID"] = $("#ID_hidden").val();
//            ht["Name"] = $("#txtTax").val();
//            ht["Short_Name"] = $("#txtShortName").val();
//            ht["Description"] = $("#txtDescription").val();
//            ht["Percentage"] = $("#txtPercentage").val();

//            if ($("#ID_hidden").val() != "") {
//                ht["MODE"] = "UPDATE";
//            }
//            else {
//                ht["MODE"] = "INSERT";
//            }

//            if ($("#btnsave").text() == "Save") {
//                Req = 'Save';
//                obj = "Save";
//                url = "CreateTax.aspx/TaxDetails";
//                LoadAjaxTax(ht, obj, Req, url);
//            }
//            if ($("#btnsave").text() == "Update") {
//                Req = 'Update';
//                obj = "Update";
//                url = "CreateTax.aspx/TaxDetails";
//                LoadAjaxTax(ht, obj, Req, url);
//            }
//        }, 1000);
//    }
//}
//function validationcheck() {

//    if ($('#txtTax').val() == "") {
//        popupErrorMsg($("#txtTax"), "Tax Name is required.", 5);
//        //alert("Tax is required.");
//        //$('#txtTax').focus();
//        return false;
//    }
//    if ($('#txtShortName').val() == "") {
//        popupErrorMsg($("#txtShortName"), "Short Name is required.", 5);
//        //alert("Short Neme is required.");
//        //$('#txtShortName').focus();
//        return false;
//    }
//    if ($('#txtPercentage').val() == "") {
//        popupErrorMsg($("#txtPercentage"), "Tax Percentage is required.", 5);
//        //alert("Short Neme is required.");
//        //$('#txtShortName').focus();
//        return false;
//    }
//    var numbers = ("."[0 - 9]);
//    if (txtPercentage.value.match(numbers)) {
//        return true;
//    }
//    else {
//        popupErrorMsg($("#txtPercentage"), "Please enter a valid Percentage.", 5);
//        //alert('Please enter a valid Percentage');
//        //$('#txtPercentage').focus();
//        return false;
//    }

//    return true;
//}

function Edit_Load() {
    var loadid = $("#ID_hidden").val();
    var bt = btoa("Did=" + loadid + "");
    window.location = 'InvoiceEdit.aspx?' + bt;
}