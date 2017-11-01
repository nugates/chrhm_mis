var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var LoadDocImage = "";
var emailid_multi = "";
var sms_multi = "";

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
    setTimeout(function () {
        if (Did == undefined) {
            // $('#radioCustomer').iCheck('check');
            Req = 'Customer@GET_Comments_Sender@LoadNumber@Shipper@Consignee@TrailerGroup@TrailerType@Weight_unit@Qty_Unit@LWH_Unit@FC@HaulingFee@AccessorialFee@FuelSurcharge@Discount';
            obj = "Fill";
            url = "CreateLoad.aspx/LoadDetails";
            ht = {};
            LoadAjaxLoad(ht, obj, Req, url);
        }
        else {
            $('#btnSaveLoad').text('Update Load');
            $('#Load_Title_Header').text('Update Load');
            $('#ID_hidden').val('' + Did);

            Req = 'Customer@GET_Comments_Sender@Shipper@Consignee@TrailerGroup@TrailerType@Weight_unit@Qty_Unit@LWH_Unit@FC@HaulingFee@AccessorialFee@FuelSurcharge@Discount@Edit@ShipperDetails@ConsigneeDetails@FreightDetails@AccessorialFeeDetails@HaulingFeeDetails@FuelSurchargeDetails@CPatDetails@csaDetails@CommentsDetails@DocumentDetails';
            obj = "Fill";
            url = "CreateLoad.aspx/LoadDetails";
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            LoadAjaxLoad(ht, obj, Req, url);
        }
    }, 2000);

});
////////////////////open popup for Add//////////////////////////////

$("#Btn_AddCustomerCarrierBroker").click(function () {
    if ($('#radioCustomer').is(':checked')) {
        $("#Customer_Heading").text('Add Customer Details');
        $("#btnsave5_Save_Customer").text('Save');
        $("#CustomerModal").modal({ backdrop: "static" });
        $("#Customer_Contact_Secton").show();
    }
    if ($('#radioCarrier').is(':checked')) {
        $("#Carrier_Heading").text('Add Carrier Details');
        $("#btnsave5_Save_Carrier").text('Save');
        $("#CarrierModal").modal({ backdrop: "static" });
        $("#Carrier_Contact_Secton").show();
    }
    if ($('#radiobroker').is(':checked')) {
        $("#btnsave5_Save_Broker").text('Save');
        $("#Broker_Heading").text('Add Broker Details');
        $("#BrokerModal").modal({ backdrop: "static" });
        $("#Broker_Contact_Secton").show();
    }
});

$("#Btn_AddContact").click(function () {
    if ($('#radioCustomer').is(':checked')) {
        $("#btnsave5_Save_Customer_Contact").text('Save');
        $("#CustomerContact_Heading").text('Add Customer Contact Details');
        $("#CustomerContactModal").modal({ backdrop: "static" });
    }
    if ($('#radioCarrier').is(':checked')) {
        $("#btnsave5_Save_Carrier_Contact").text('Save');
        $("#CarrierContact_Heading").text('Add Carrier Contact Details');
        $("#CarrierContactModal").modal({ backdrop: "static" });
    }
    if ($('#radiobroker').is(':checked')) {
        $("#btnsave5_Save_Broker_Contact").text('Save');
        $("#BrokerContact_Heading").text('Add Broker Agent Details');
        $("#BrokerContactModal").modal({ backdrop: "static" });
    }
});

$("#Btn_AddShipper").click(function () {
    $("#btnsave5_Save_Shipper").text('Save');
    $("#Shipper_Heading").text('Add Shipper Details');
    $("#ShipperModal").modal({ backdrop: "static" });
    $("#Shipper_Address_Secton").show();
});
$("#Btn_AddShipperLocation").click(function () {
    if ($('#cmbShipper').val() != "") {
        $("#btnsave5_Save_Shipper_Address").text('Save');
        $("#ShipperAddress_Heading").text('Add Pickup Location');
        $("#ShipperAddressModal").modal({ backdrop: "static" });
    }
    else {
        swal({
            title: "Please Select a Shipper",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});

$("#Btn_AddConsignee").click(function () {
    $("#btnsave5_Save_Consignee").text('Save');
    $("#Consignee_Heading").text('Add Consignee Details');
    $("#ConsigneeModal").modal({ backdrop: "static" });
    $("#Consignee_Address_Secton").show();
});
$("#Btn_AddConsigneeLocation").click(function () {
    if ($('#cmbConsignee').val() != "") {
        $("#btnsave5_Save_Consignee_Address").text('Save');
        $("#ConsigneeAddress_Heading").text('Add Drop Off Location');
        $("#ConsigneeAddressModal").modal({ backdrop: "static" });
    }
    else {
        swal({
            title: "Please Select a Consignee",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});

////////////////////End open popup for Add//////////////////////////////

////////////////////open popup for update//////////////////////////////

$("#Btn_UpdateCustomerCarrierBroker").click(function () {
    if ($('#cmbCustomerCarrierBroker').val() != "") {
        if ($('#radioCustomer').is(':checked')) {
            $("#btnsave5_Save_Customer").text('Update');
            $("#Customer_Heading").text('Update Customer Details');
            $("#CustomerModal").modal({ backdrop: "static" });
            $("#Customer_Contact_Secton").hide();

            Req = 'Fill_Customer';
            obj = "Fill_Customer";
            url = "CreateLoad.aspx/LoadDetails";
            ht = {};
            ht["ID"] = $("#cmbCustomerCarrierBroker").val();
            LoadAjaxLoad(ht, obj, Req, url);

        }
        if ($('#radioCarrier').is(':checked')) {
            $("#btnsave5_Save_Carrier").text('Update');
            $("#Carrier_Heading").text('Update Carrier Details');
            $("#CarrierModal").modal({ backdrop: "static" });
            $("#Carrier_Contact_Secton").hide();

            Req = 'Fill_Carrier';
            obj = "Fill_Carrier";
            url = "CreateLoad.aspx/LoadDetails";
            ht = {};
            ht["ID"] = $("#cmbCustomerCarrierBroker").val();
            LoadAjaxLoad(ht, obj, Req, url);
        }
        if ($('#radiobroker').is(':checked')) {
            $("#btnsave5_Save_Broker").text('Update');
            $("#Broker_Heading").text('Update Broker Details');
            $("#BrokerModal").modal({ backdrop: "static" });
            $("#Broker_Contact_Secton").hide();

            Req = 'Fill_Broker';
            obj = "Fill_Broker";
            url = "CreateLoad.aspx/LoadDetails";
            ht = {};
            ht["ID"] = $("#cmbCustomerCarrierBroker").val();
            LoadAjaxLoad(ht, obj, Req, url);
        }
    }
    else {
        swal({
            title: "Please Select an item to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});

$("#Btn_UpdateContact").click(function () {
    if ($('#cmbContactname').val() != "") {
        if ($('#radioCustomer').is(':checked')) {
            $("#btnsave5_Save_Customer_Contact").text('Update');
            $("#CustomerContact_Heading").text('Update Customer Contact Details');
            $("#CustomerContactModal").modal({ backdrop: "static" });

            Req = 'Fill_Customer_Contact';
            obj = "Fill_Customer_Contact";
            url = "CreateLoad.aspx/LoadDetails";
            ht = {};
            ht["ID"] = $("#cmbContactname").val();
            LoadAjaxLoad(ht, obj, Req, url);
        }
        if ($('#radioCarrier').is(':checked')) {
            $("#btnsave5_Save_Carrier_Contact").text('Update');
            $("#CarrierContact_Heading").text('Update Carrier Contact Details');
            $("#CarrierContactModal").modal({ backdrop: "static" });

            Req = 'Fill_Carrier_Contact';
            obj = "Fill_Carrier_Contact";
            url = "CreateLoad.aspx/LoadDetails";
            ht = {};
            ht["ID"] = $("#cmbContactname").val();
            LoadAjaxLoad(ht, obj, Req, url);
        }
        if ($('#radiobroker').is(':checked')) {
            $("#btnsave5_Save_Broker_Contact").text('Update');
            $("#BrokerContact_Heading").text('Update Broker Agent Details');
            $("#BrokerContactModal").modal({ backdrop: "static" });

            Req = 'Fill_Broker_Contact';
            obj = "Fill_Broker_Contact";
            url = "CreateLoad.aspx/LoadDetails";
            ht = {};
            ht["ID"] = $("#cmbContactname").val();
            LoadAjaxLoad(ht, obj, Req, url);
        }
    }
    else {
        swal({
            title: "Please Select an item to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});

$("#Btn_UpdateShipper").click(function () {
    if ($('#cmbShipper').val() != "") {
        $("#btnsave5_Save_Shipper").text('Update');
        $("#Shipper_Heading").text('Update Shipper Details');
        $("#ShipperModal").modal({ backdrop: "static" });
        $("#Shipper_Address_Secton").hide();


        Req = 'Fill_Shipper';
        obj = "Fill_Shipper";
        url = "CreateLoad.aspx/LoadDetails";
        ht = {};
        ht["ID"] = $("#cmbShipper").val();
        LoadAjaxLoad(ht, obj, Req, url);
    }
    else {
        swal({
            title: "Please Select a Shipper to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});
$("#Btn_UpdateShipperLocation").click(function () {
    if ($('#cmbShipperLocation').val() != "") {
        $("#btnsave5_Save_Shipper_Address").text('Update');
        $("#ShipperAddress_Heading").text('Update Pickup Location');
        $("#ShipperAddressModal").modal({ backdrop: "static" });

        Req = 'Fill_Shipper_Address';
        obj = "Fill_Shipper_Address";
        url = "CreateLoad.aspx/LoadDetails";
        ht = {};
        ht["ID"] = $("#cmbShipperLocation").val();
        LoadAjaxLoad(ht, obj, Req, url);
    }
    else {
        swal({
            title: "Please Select a Location to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});

$("#Btn_UpdateConsignee").click(function () {
    if ($('#cmbConsignee').val() != "") {
        $("#btnsave5_Save_Consignee").text('Update');
        $("#Consignee_Heading").text('Update Consignee Details');
        $("#ConsigneeModal").modal({ backdrop: "static" });
        $("#Consignee_Address_Secton").hide();

        Req = 'Fill_Consignee';
        obj = "Fill_Consignee";
        url = "CreateLoad.aspx/LoadDetails";
        ht = {};
        ht["ID"] = $("#cmbConsignee").val();
        LoadAjaxLoad(ht, obj, Req, url);
    }
    else {
        swal({
            title: "Please Select a Consignee to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});
$("#Btn_UpdateConsigneeLocation").click(function () {
    if ($('#cmbConsigneeLocation').val() != "") {
        $("#btnsave5_Save_Consignee_Address").text('Update');
        $("#ConsigneeAddress_Heading").text('Update Drop Off Location');
        $("#ConsigneeAddressModal").modal({ backdrop: "static" });

        Req = 'Fill_Consignee_Address';
        obj = "Fill_Consignee_Address";
        url = "CreateLoad.aspx/LoadDetails";
        ht = {};
        ht["ID"] = $("#cmbConsigneeLocation").val();
        LoadAjaxLoad(ht, obj, Req, url);
    }
    else {
        swal({
            title: "Please Select a Location to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});

////////////////////End open popup for update//////////////////////////////

$("#cmbCustomerCarrierBroker").change(function () {
    $("#Div_ContactName").show();
    if ($('#radioCustomer').is(':checked')) {
        Req = 'Customer_Contact';
        obj = "Customer_Contact";
        url = "CreateLoad.aspx/LoadDetails";
        ht = {};
        ht["Customer_ID"] = $("#cmbCustomerCarrierBroker :selected").val();
        LoadAjaxLoad(ht, obj, Req, url);
    }
    if ($('#radioCarrier').is(':checked')) {
        Req = 'Carrier_Contact';
        obj = "Carrier_Contact";
        url = "CreateLoad.aspx/LoadDetails";
        ht = {};
        ht["Carrier_ID"] = $("#cmbCustomerCarrierBroker :selected").val();
        LoadAjaxLoad(ht, obj, Req, url);
    }
    if ($('#radiobroker').is(':checked')) {
        Req = 'Broker_Contact';
        obj = "Broker_Contact";
        url = "CreateLoad.aspx/LoadDetails";
        ht = {};
        ht["Broker_ID"] = $("#cmbCustomerCarrierBroker :selected").val();
        LoadAjaxLoad(ht, obj, Req, url);
    }
});
$("#cmbShipper").change(function () {
    Req = 'Shipper_Address';
    obj = "Shipper_Address";
    url = "CreateLoad.aspx/LoadDetails";
    ht = {};
    ht["Shipper_ID"] = $("#cmbShipper :selected").val();
    LoadAjaxLoad(ht, obj, Req, url);
});
$("#cmbConsignee").change(function () {
    Req = 'Consignee_Address';
    obj = "Consignee_Address";
    url = "CreateLoad.aspx/LoadDetails";
    ht = {};
    ht["Consignee_ID"] = $("#cmbConsignee :selected").val();
    LoadAjaxLoad(ht, obj, Req, url);
});
function LoadAjaxLoad(ht, obj, Req, url) {
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

            if (obj == "Customer_Contact") {
                if (Result.d.Customer_Contact != "" && Result.d.Customer_Contact != undefined) {
                    var Customer_Contact = jQuery.parseJSON(Result.d.Customer_Contact);
                    $('#cmbContactname').html('');
                    $('#cmbContactname').append($('<option></option>'));
                    $.each(Customer_Contact, function (index, item) {
                        $('#cmbContactname').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }
            if (obj == "Carrier_Contact") {
                if (Result.d.Carrier_Contact != "" && Result.d.Carrier_Contact != undefined) {
                    var Carrier_Contact = jQuery.parseJSON(Result.d.Carrier_Contact);
                    $('#cmbContactname').html('');
                    $('#cmbContactname').append($('<option></option>'));
                    $.each(Carrier_Contact, function (index, item) {
                        $('#cmbContactname').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }
            if (obj == "Broker_Contact") {
                if (Result.d.Broker_Contact != "" && Result.d.Broker_Contact != undefined) {
                    var Broker_Contact = jQuery.parseJSON(Result.d.Broker_Contact);
                    $('#cmbContactname').html('');
                    $('#cmbContactname').append($('<option></option>'));
                    $.each(Broker_Contact, function (index, item) {
                        $('#cmbContactname').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }
            if (obj == "Shipper_Address") {
                if (Result.d.Shipper_Address != "" && Result.d.Shipper_Address != undefined) {
                    var Shipper_Address = jQuery.parseJSON(Result.d.Shipper_Address);
                    $('#cmbShipperLocation').html('');
                    $('#cmbShipperLocation').append($('<option></option>'));
                    $.each(Shipper_Address, function (index, item) {
                        $('#cmbShipperLocation').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }
            if (obj == "Consignee_Address") {
                if (Result.d.Consignee_Address != "" && Result.d.Consignee_Address != undefined) {
                    var Consignee_Address = jQuery.parseJSON(Result.d.Consignee_Address);
                    $('#cmbConsigneeLocation').html('');
                    $('#cmbConsigneeLocation').append($('<option></option>'));
                    $.each(Consignee_Address, function (index, item) {
                        $('#cmbConsigneeLocation').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }
            if (obj == "Fill") {

                ////////////// Load munber fill///////////////////////////////////////////////

                if (Result.d.LoadMunber != "" && Result.d.LoadMunber != undefined) {
                    var json = jQuery.parseJSON(Result.d.LoadMunber);

                    $.each(json, function (index, item) {
                        $("#txtLoadNumber").val(item.LOAD_NUMBER);
                    });
                }

                //////////////End Load munber fill///////////////////////////////////////////////

                if (Result.d.Customer != "" && Result.d.Customer != undefined) {
                    var Customer = jQuery.parseJSON(Result.d.Customer);
                    $('#cmbCustomerCarrierBroker').html('');
                    $('#cmbCustomerCarrierBroker').append($('<option></option>'));
                    $.each(Customer, function (index, item) {
                        $('#cmbCustomerCarrierBroker').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.Carrier != "" && Result.d.Carrier != undefined) {
                    var Carrier = jQuery.parseJSON(Result.d.Carrier);
                    $('#cmbCustomerCarrierBroker').html('');
                    $('#cmbCustomerCarrierBroker').append($('<option></option>'));
                    $.each(Carrier, function (index, item) {
                        $('#cmbCustomerCarrierBroker').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.Broker != "" && Result.d.Broker != undefined) {
                    var Broker = jQuery.parseJSON(Result.d.Broker);
                    $('#cmbCustomerCarrierBroker').html('');
                    $('#cmbCustomerCarrierBroker').append($('<option></option>'));
                    $.each(Broker, function (index, item) {
                        $('#cmbCustomerCarrierBroker').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.Shipper != "" && Result.d.Shipper != undefined) {
                    var Shipper = jQuery.parseJSON(Result.d.Shipper);
                    $('#cmbShipper').html('');
                    $('#cmbShipper').append($('<option></option>'));
                    $.each(Shipper, function (index, item) {
                        $('#cmbShipper').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.Consignee != "" && Result.d.Consignee != undefined) {
                    var Consignee = jQuery.parseJSON(Result.d.Consignee);
                    $('#cmbConsignee').html('');
                    $('#cmbConsignee').append($('<option></option>'));
                    $.each(Consignee, function (index, item) {
                        $('#cmbConsignee').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.TrailerGroup != "" && Result.d.TrailerGroup != undefined) {
                    var TrailerGroup = jQuery.parseJSON(Result.d.TrailerGroup);
                    $('#cmbTrailerGroup').html('');
                    $('#cmbTrailerGroup').append($('<option></option>'));
                    $.each(TrailerGroup, function (index, item) {
                        $('#cmbTrailerGroup').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.TrailerType != "" && Result.d.TrailerType != undefined) {
                    var TrailerType = jQuery.parseJSON(Result.d.TrailerType);
                    $('#cmbTrailerType').html('');
                    $('#cmbTrailerType').append($('<option></option>'));
                    $.each(TrailerType, function (index, item) {
                        $('#cmbTrailerType').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.Weight_unit != "" && Result.d.Weight_unit != undefined) {
                    var Weight_unit = jQuery.parseJSON(Result.d.Weight_unit);
                    $('.cmbWeight').html('');
                    $.each(Weight_unit, function (index, item) {
                        $('.cmbWeight').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.Qty_Unit != "" && Result.d.Qty_Unit != undefined) {
                    var Qty_Unit = jQuery.parseJSON(Result.d.Qty_Unit);
                    $('.cmbQty').html('');
                    $.each(Qty_Unit, function (index, item) {
                        $('.cmbQty').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.LWH_Unit != "" && Result.d.LWH_Unit != undefined) {
                    var LWH_Unit = jQuery.parseJSON(Result.d.LWH_Unit);
                    $('.cmbLHT').html('');
                    $.each(LWH_Unit, function (index, item) {
                        $('.cmbLHT').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.FC != "" && Result.d.FC != undefined) {
                    var FC = jQuery.parseJSON(Result.d.FC);
                    $('.cmbFC').html('');
                    $.each(FC, function (index, item) {
                        $('.cmbFC').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.HaulingFee != "" && Result.d.HaulingFee != undefined) {
                    var HaulingFee = jQuery.parseJSON(Result.d.HaulingFee);
                    $('#cmbHaulingFee').html('');
                    $.each(HaulingFee, function (index, item) {
                        $('#cmbHaulingFee').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                ///// Dispatch add/////////////////////////

                if (Result.d.AccessorialFee != "" && Result.d.AccessorialFee != undefined) {
                    var AccessorialFee = jQuery.parseJSON(Result.d.AccessorialFee);
                    $('#cmbAccessorialFee').html('');
                    $.each(AccessorialFee, function (index, item) {
                        $('#cmbAccessorialFee').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                /////End  Dispatch add/////////////////////////

                if (Result.d.FuelSurcharge != "" && Result.d.FuelSurcharge != undefined) {
                    var FuelSurcharge = jQuery.parseJSON(Result.d.FuelSurcharge);
                    $('#cmbFuelSurcharge').html('');
                    $.each(FuelSurcharge, function (index, item) {
                        $('#cmbFuelSurcharge').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.Discount != "" && Result.d.Discount != undefined) {
                    var Discount = jQuery.parseJSON(Result.d.Discount);
                    $('#cmbDiscount').html('');
                    $.each(Discount, function (index, item) {
                        $('#cmbDiscount').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.GET_Comments_Sender != "" && Result.d.GET_Comments_Sender != undefined) {
                    var Comments_Sender = jQuery.parseJSON(Result.d.GET_Comments_Sender);


                    $('#cmbSendCommentEmail').html('');
                    $('#cmbSendCommentEmail').append($('<option></option>'));
                    $.each(Comments_Sender, function (index, item) {
                        $('#cmbSendCommentEmail').append($('<option type=' + item.Type + ', Emil_ID=' + item.Emil_ID + '></option>').val(item.id).html(item.company_name));
                    });


                    $('#cmbSendCommentSMS').html('');
                    $('#cmbSendCommentSMS').append($('<option></option>'));
                    $.each(Comments_Sender, function (index, item) {
                        $('#cmbSendCommentSMS').append($('<option type=' + item.Type + ', Phone_Number=' + item.Phone_Number + '></option>').val(item.id).html(item.company_name));
                    });
                }

                /////////////////////////////////////////Edit Fill/////////////////////////////////////////////////////////////////////////

                if (Result.d.Edit != "" && Result.d.Edit != undefined) {
                    var json = jQuery.parseJSON(Result.d.Edit);
                    $.each(json, function (index, item) {

                        $("#txtLoadNumber").val(item.Load_Number);
                        if (item.IsLTLorFTL == "0") {

                            $("#radioFTL").iCheck('check');
                        }
                        else {
                            if (item.IsLTLorFTL == "1") {
                                $("#radioLTL").iCheck('check');
                            }
                        }

                        if (item.IsCustCarrORBro == "0") {

                            $("#radioCustomer").iCheck('check');
                        }
                        else {
                            if (item.IsCustCarrORBro == "1") {
                                $("#radioCarrier").iCheck('check');
                            }
                            else {
                                if (item.IsCustCarrORBro == "2") {
                                    $("#radiobroker").iCheck('check');
                                }
                            }
                        }
                        setTimeout(function () {
                            $("#cmbCustomerCarrierBroker").val(item.CustCarrORBro_ID).trigger('change');
                        }, 1000);
                        setTimeout(function () {
                            $("#cmbContactname").val(item.CustCarrORBroContact_ID).trigger('change');
                        }, 2000);
                        $("#txtAccountNo").val(item.Account_No);
                        $("#txtLoadDate").val(item.Load_Date);
                        $("#txtLoadTime").val(item.Load_Time);
                        $("#txtReference").val(item.Reference);
                        if (item.IsLDropTrailer == "1") {

                            $("#chkDropTrailer").iCheck('check');
                        }
                        else {
                            $("#chkDropTrailer").iCheck('uncheck');
                        }
                        $("#cmbTrailerGroup").val(item.Trailer_Group_ID).trigger('change');
                        $("#cmbTrailerType").val(item.Trailer_Type_ID).trigger('change');
                        if (item.IsLHazMat == "1") {

                            $("#chkHazMat").iCheck('check');
                        }
                        else {
                            $("#chkHazMat").iCheck('uncheck');
                        }
                        if (item.IsOversize_Load == "1") {

                            $("#chkOversizeLoad").iCheck('check');
                        }
                        else {
                            $("#chkOversizeLoad").iCheck('uncheck');
                        }
                        if (item.IsReefer == "1") {

                            $("#chkReefer").iCheck('check');
                        }
                        else {
                            $("#chkReefer").iCheck('uncheck');
                        }
                        if (item.IsTanker == "1") {

                            $("#chkTanker").iCheck('check');
                        }
                        else {
                            $("#chkTanker").iCheck('uncheck');
                        }
                        $("#txtTemp").val(item.Temp);
                        $("#txtTotalMiles").val(item.Total_Miles);
                        //$("#cmbHaulingFee").val(item.Hauling_Fee_ID).trigger('change');
                        //$("#txtHauingRate").val(item.Hauling_Fee_Rate);
                        //$("#cmbFuelSurcharge").val(item.FuelSurcharge_ID).trigger('change');
                        //$("#txtFuelSurchargeRate").val(item.FuelSurcharge_Rate);
                        $("#cmbDiscount").val(item.Discount_ID).trigger('change');
                        $("#txtDiscount").val(item.Discount_Amount).trigger('keyup');
                    });
                }
                if (Result.d.ShipperDetails != "" && Result.d.ShipperDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.ShipperDetails);
                    var table = "";

                    $.each(data, function (i, item) {
                        table = table + "<tr><td style='display: none'>" + item.ID +
                                    "</td><td>" + item.Shipper_Name +
                                    "</td><td style='display:none'>" + item.Shipper_ID +
                                    "</td><td>" + item.Pickup_Location_Name +
                                    "</td><td style='display:none'>" + item.Pickup_Location_ID +
                                    "</td><td>" + item.Pickup_Date +
                                    "</td><td style='display:none' >" + item.Pickup_Fixed_Time +
                                    "</td><td style='display:none' >" + item.Pickup_From_Time +
                                    "</td><td style='display:none' >" + item.Pickup_To_Time +
                                    "</td><td style='display:none' >" + item.Pickup_Instruction +
                                    "</td><td style='display:none' >" + item.Contact_Person_at_PickUp +
                                    "</td><td style='display:none' >" + item.Phone +
                                    "</td><td style='display:none' >" + item.BOL +
                                    "</td><td style='display:none' >" + item.Reference +
                                    "</td><td style='display:none' >" + item.Notes +
                                    "<td class='Edit " + _allowedit + "' align='center'> <button type='button' " +
                                    " onclick=ShipperEdit(this) class='btn btn-default btn-sm' id='btnedit_Shipper' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=ShipperDelet(this) class='btn btn-default btn-sm' id='btndelete_Shipper' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "</tr>"
                        $(".cmbPickup").append($('<option></option>').val(item.Pickup_Location_ID).html(item.Pickup_Location_Name));
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
                        table1 = table1 + "<tr><td style='display: none'>" + item.ID +
                                    "</td><td>" + item.Consignee_Name +
                                    "</td><td style='display:none'>" + item.Consignee_ID +
                                    "</td><td>" + item.Drop_Of_Location_Name +
                                    "</td><td style='display:none'>" + item.Drop_Of_Location_ID +
                                    "</td><td>" + item.Delivery_Date +
                                    "</td><td style='display:none' >" + item.Delivery_Fixed_Time +
                                    "</td><td style='display:none' >" + item.Delivery_From_Time +
                                    "</td><td style='display:none' >" + item.Delivery_To_Time +
                                    "</td><td style='display:none' >" + item.Delivery_Instruction +
                                    "</td><td style='display:none' >" + item.Contact_Person_at_Delivery +
                                    "</td><td style='display:none' >" + item.Phone +
                                    "</td><td style='display:none' >" + item.Reference +
                                    "</td><td style='display:none' >" + item.Notes +
                                    "<td class='Edit " + _allowedit + "' align='center'> <button type='button' " +
                                    " onclick=ConsigneeEdit(this) class='btn btn-default btn-sm' id='btnedit_Consignee' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=ConsigneeDelet(this) class='btn btn-default btn-sm' id='btndelete_Consignee' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "</tr>"
                        $(".cmbDropOff").append($('<option></option>').val(item.Drop_Of_Location_ID).html(item.Drop_Of_Location_Name));
                    });
                    $("#ConsigneeListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#ConsigneeListDiv tbody").append(table1);
                    }, 100);
                }


                if (Result.d.FreightDetails != "" && Result.d.FreightDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.FreightDetails);
                    var j = 1;
                    var ik = 0;
                    $.each(data, function (i, item) {


                        //fill

                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.ID').val(item.ID);
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.Description').val(item.Description);
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.cmbPickup').val(item.Pick_Up).trigger('change');
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.cmbDropOff').val(item.Drop_Of).trigger('change');
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.Weight').val(item.Weight_Value);
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.cmbWeight').val(item.Weight_Unit_ID).trigger('change');
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.Qty').val(item.Qty_Value);
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.cmbQty').val(item.Qty_Unit_ID).trigger('change');
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.L').val(item.L_Value);
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.H').val(item.W_Value);
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.T').val(item.H_Value);
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.cmbLHT').val(item.LWH_ID).trigger('change');
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.cmbFC').val(item.FC_ID).trigger('change');
                        $('#tab_logic tbody tr:eq(' + ik + ')').find('.DV').val(item.Declared_Value).trigger('keyup');

                        if (j < data.length) {
                            $('#add_row').click();
                        }
                        j++;
                        ik++;
                    });
                }

                if (Result.d.AccessorialFeeDetails != "" && Result.d.AccessorialFeeDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.AccessorialFeeDetails);
                    var k = 1;
                    var kk = 0;
                    $.each(data, function (i, item) {


                        //fill

                        $('.DivAccFee').eq(kk).find('.txtAccessorialfee').attr('AccFeeID', item.ID);
                        $('.DivAccFee').eq(kk).find('.cmbAccessorialfee').val(item.AccessorialFee_ID).trigger('change');
                        $('.DivAccFee').eq(kk).find('.txtAccessorialfee').val(item.AccessorialFee_Rate).trigger('keyup');

                        if (k < data.length) {
                            $('#Btn_AccessorialFeeAdd').click();
                        }
                        k++;
                        kk++;
                    });
                }
                ///// Dispatch add/////////////////////////
                if (Result.d.HaulingFeeDetails != "" && Result.d.HaulingFeeDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.HaulingFeeDetails);
                    var k1 = 1;
                    var kk1 = 0;
                    $.each(data, function (i, item) {


                        //fill

                        $('.DivHauling_Fee').eq(kk1).find('.txtHauingFee').attr('HaulingFeeid', item.ID);
                        $('.DivHauling_Fee').eq(kk1).find('.cmbHaulingFee').val(item.HaulingFee_ID).trigger('change');
                        $('.DivHauling_Fee').eq(kk1).find('.txtHauingFee').val(item.HaulingFee_Rate).trigger('keyup');

                        if (k1 < data.length) {
                            $('#Btn_HaulingFeeAdd').click();
                        }
                        k1++;
                        kk1++;
                    });
                }

                if (Result.d.FuelSurchargeDetails != "" && Result.d.FuelSurchargeDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.FuelSurchargeDetails);
                    var k2 = 1;
                    var kk2 = 0;
                    $.each(data, function (i, item) {


                        //fill

                        $('.DivFuel_Surcharge').eq(kk2).find('.txtFuelSurcharge').attr('FuelSurchargeid', item.ID);
                        $('.DivFuel_Surcharge').eq(kk2).find('.cmbFuelSurcharge').val(item.FuelSurcharge_ID).trigger('change');
                        $('.DivFuel_Surcharge').eq(kk2).find('.txtFuelSurcharge').val(item.FuelSurcharge_Rate).trigger('keyup');

                        if (k2 < data.length) {
                            $('#Btn_FuelSurchargeAdd').click();
                        }
                        k2++;
                        kk2++;
                    });
                }
                ///// Dispatch add/////////////////////////
                if (Result.d.CPatDetails != "" && Result.d.CPatDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.CPatDetails);
                    var ck = 1;
                    var tk = 0;
                    $.each(data, function (i, item) {

                        //fill

                        $('.ctpat').eq(tk).attr('attrid', item.ID);
                        $('.ctpat').eq(tk).val(item.CTPAT);


                        if (ck < data.length) {
                            $('#Btn_CTPATADD').click();
                        }
                        ck++;
                        tk++;
                    });
                }

                if (Result.d.csaDetails != "" && Result.d.csaDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.csaDetails);
                    var ck_csa = 1;
                    var tk_csa = 0;
                    $.each(data, function (i, item) {

                        //fill

                        $('.csa').eq(tk_csa).attr('attrid', item.ID);
                        $('.csa').eq(tk_csa).val(item.CSA);


                        if (ck_csa < data.length) {
                            $('#Btn_CSAADD').click();
                        }
                        ck_csa++;
                        tk_csa++;
                    });
                }

                if (Result.d.CommentsDetails != "" && Result.d.CommentsDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.CommentsDetails);
                    $.each(data, function (i, item) {

                        var tb = "<tr><td>" + item.Comment +
                                "</td><td style = 'display:none'>" + item.Email_ID +
                                "</td><td style = 'display:none'>" +
                                "</td><td style = 'display:none'>" + item.Email_ID_Text +
                                "</td><td style = 'display:none'>" + item.Is_Email_Text +
                                "</td><td style = 'display:none'>" + item.Email_ID_Type +

                                "</td><td style = 'display:none'>" + item.Phone_No +
                                "</td><td style = 'display:none'>" +
                                "</td><td style = 'display:none'>" + item.Phone_No_Text +
                                "</td><td style = 'display:none'>" + item.Is_Phone_Text +
                                "</td><td style = 'display:none'>" + item.Phone_ID_Type +

                                "</td><td>" + item.CONTACT_NAME +
                                "</td><td>" + item.Entry_Date +
                                "</td><td style = 'display:none'>" +
                                "</td><td style = 'display:none'>" + item.type +

                                 "</td><td>" +
                        "</td><td>"
                        "</td></tr>";

                        $("#CommentListDiv tbody").append(tb);



                    });
                }

                if (Result.d.DocumentDetails != "" && Result.d.DocumentDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.DocumentDetails);
                    var table_Doc = "";
                    $.each(data, function (i, item) {

                        table_Doc = table_Doc + "<tr><td>" + item.Tittle +
                        "</td><td><a href=" + item.Url + " target='_blank'>Download</a> " +
                        "</td><td>" + item.Name +
                        "</td><td>" + item.CreatedDate +
                        "</td><td style = 'display:none'>" + item.Url +
                          "</td><td style = 'display:none'>"
                        "</tr>"

                    });
                    $("#DocumentListDiv tbody tr .dataTables_empty").parents('tr').remove()
                    setTimeout(function () {
                        $("#DocumentListDiv tbody").append(table_Doc);
                    }, 100);
                }




                /////////////////////////////////////////End Edit Fill/////////////////////////////////////////////////////////////////////////
            }

            /////////////////////////////////// Popup Fill/////////////////////////////////////////////////////////
            if (obj == "Fill_Customer") {
                if (Result.d.Fill_Customer != "" && Result.d.Fill_Customer != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Customer);

                    $.each(json, function (index, item) {
                        $("#txtCompanyName_Customer").val(item.Company_Name);
                        $("#txtAcNo_Customer").val(item.Account_Number);
                        $("#txtCity_Customer").val(item.City);
                        $("#txtZipCode_Customer").val(item.Zip_Code);
                        $("#txtAddress1_Customer").val(item.Address1);
                        $("#txtAddress2_Customer").val(item.Address2);
                        $("#txtaccntPayableEmail_Customer").val(item.Accnt_Payable_Email);
                        $("#cmbCountry_Customer option").each(function () {
                            if ($(this).val().trim() == item.Country) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        setTimeout(function () {
                            $("#cmbState_Customer option").each(function () {
                                if ($(this).val().trim() == item.State.trim()) {
                                    $(this).attr("selected", "selected");
                                    $(this).prop('selected', true).trigger('change');
                                }
                            });
                        }, 1000);
                    });
                }
            }

            if (obj == "Fill_Customer_Contact") {
                if (Result.d.Fill_Customer_Contact != "" && Result.d.Fill_Customer_Contact != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Customer_Contact);

                    $.each(json, function (index, item) {
                        $("#txtContactName_Customer_Contact").val(item.Contact_Name);
                        $("#txtDesignation_Customer_Contact").val(item.Designation);
                        $("#txtContactEmail_Customer_Contact").val(item.Email);
                        $("#txtContactPhoneNo_Customer_Contact").val(item.Phone);
                        $("#txtContactFax_Customer_Contact").val(item.Fax);
                    });
                }
            }

            if (obj == "Fill_Carrier") {
                if (Result.d.Fill_Carrier != "" && Result.d.Fill_Carrier != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Carrier);

                    $.each(json, function (index, item) {
                        $("#txtCompanyName_Carrier").val(item.Company_Name);
                        $("#txtAcNo_Carrier").val(item.Account_Number);
                        $("#txtCity_Carrier").val(item.City);
                        $("#txtZipCode_Carrier").val(item.Zip_Code);
                        $("#txtAddress1_Carrier").val(item.Address1);
                        $("#txtAddress2_Carrier").val(item.Address2);
                        $("#txtaccntPayableEmail_Carrier").val(item.Accnt_Payable_Email);
                        $("#cmbCountry_Carrier option").each(function () {
                            if ($(this).val().trim() == item.Country) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        setTimeout(function () {
                            $("#cmbState_Carrier option").each(function () {
                                if ($(this).val().trim() == item.State.trim()) {
                                    $(this).attr("selected", "selected");
                                    $(this).prop('selected', true).trigger('change');
                                }
                            });
                        }, 1000);
                    });
                }
            }

            if (obj == "Fill_Carrier_Contact") {
                if (Result.d.Fill_Carrier_Contact != "" && Result.d.Fill_Carrier_Contact != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Carrier_Contact);

                    $.each(json, function (index, item) {
                        $("#txtContactName_Carrier_Contact").val(item.Contact_Name);
                        $("#txtDesignation_Carrier_Contact").val(item.Designation);
                        $("#txtContactEmail_Carrier_Contact").val(item.Email);
                        $("#txtContactPhoneNo_Carrier_Contact").val(item.Phone);
                        $("#txtContactFax_Carrier_Contact").val(item.Fax);
                    });
                }
            }

            if (obj == "Fill_Broker") {
                if (Result.d.Fill_Broker != "" && Result.d.Fill_Broker != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Broker);

                    $.each(json, function (index, item) {
                        $("#txtCompanyName_Broker").val(item.Company_Name);
                        $("#txtAcNo_Broker").val(item.Account_Number);
                        $("#txtCity_Broker").val(item.City);
                        $("#txtZipCode_Broker").val(item.Zip_Code);
                        $("#txtAddress1_Broker").val(item.Address1);
                        $("#txtAddress2_Broker").val(item.Address2);
                        $("#txtaccntPayableEmail_Broker").val(item.Accnt_Payable_Email);
                        $("#cmbCountry_Broker option").each(function () {
                            if ($(this).val().trim() == item.Country) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        setTimeout(function () {
                            $("#cmbState_Broker option").each(function () {
                                if ($(this).val().trim() == item.State.trim()) {
                                    $(this).attr("selected", "selected");
                                    $(this).prop('selected', true).trigger('change');
                                }
                            });
                        }, 1000);
                    });
                }
            }

            if (obj == "Fill_Broker_Contact") {
                if (Result.d.Fill_Broker_Contact != "" && Result.d.Fill_Broker_Contact != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Broker_Contact);

                    $.each(json, function (index, item) {
                        $("#txtContactName_Broker_Contact").val(item.Contact_Name);
                        $("#txtDesignation_Broker_Contact").val(item.Designation);
                        $("#txtContactEmail_Broker_Contact").val(item.Email);
                        $("#txtContactPhoneNo_Broker_Contact").val(item.Phone);
                        $("#txtContactFax_Broker_Contact").val(item.Fax);
                    });
                }
            }

            if (obj == "Fill_Shipper") {
                if (Result.d.Fill_Shipper != "" && Result.d.Fill_Shipper != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Shipper);

                    $.each(json, function (index, item) {
                        $("#txtCompanyName_Shipper").val(item.Company_Name);
                        $("#txtEIN_Shipper").val(item.EIN);
                        $("#txtContactName_Shipper").val(item.Contact_Name);
                        $("#txtEmail_Shipper").val(item.Email);
                        $("#txtDBAName_Shipper").val(item.DBA_Name);
                        $("#txtAcNo_Shipper").val(item.Account_Number);
                        $("#txtPhoneNumber_Shipper").val(item.Phone);

                    });
                }
            }

            if (obj == "Fill_Shipper_Address") {
                if (Result.d.Fill_Shipper_Address != "" && Result.d.Fill_Shipper_Address != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Shipper_Address);

                    $.each(json, function (index, item) {
                        $("#txtAddress1_Shipper_Address").val(item.Address1);
                        $("#txtSaveLocationAs_Shipper_Address").val(item.Save_Location_As);
                        $("#txtCntactName_Shipper_Address").val(item.Contact_Name);
                        $("#txtCity_Shipper_Address").val(item.City);
                        $("#txtZipCode_Shipper_Address").val(item.Zip_Code);
                        $("#txtAddress2_Shipper_Address").val(item.Address2);
                        $("#txtInstructions_Shipper_Address").val(item.Instructions);
                        $("#txtAddressPhoneNumber_Shipper_Address").val(item.Phone);
                        $("#cmbCountry_Shipper_Address option").each(function () {
                            if ($(this).val().trim() == item.Country) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        setTimeout(function () {
                            $("#cmbState_Shipper_Address option").each(function () {
                                if ($(this).val().trim() == item.State.trim()) {
                                    $(this).attr("selected", "selected");
                                    $(this).prop('selected', true).trigger('change');
                                }
                            });
                        }, 1000);
                    });
                }
            }

            if (obj == "Fill_Consignee") {
                if (Result.d.Fill_Consignee != "" && Result.d.Fill_Consignee != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Consignee);

                    $.each(json, function (index, item) {
                        $("#txtCompanyName_Consignee").val(item.Company_Name);
                        $("#txtEIN_Consignee").val(item.EIN);
                        $("#txtContactName_Consignee").val(item.Contact_Name);
                        $("#txtEmail_Consignee").val(item.Email);
                        $("#txtDBAName_Consignee").val(item.DBA_Name);
                        $("#txtAcNo_Consignee").val(item.Account_Number);
                        $("#txtPhoneNumber_Consignee").val(item.Phone);

                    });
                }
            }

            if (obj == "Fill_Consignee_Address") {
                if (Result.d.Fill_Consignee_Address != "" && Result.d.Fill_Consignee_Address != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Consignee_Address);

                    $.each(json, function (index, item) {
                        $("#txtAddress1_Consignee_Address").val(item.Address1);
                        $("#txtSaveLocationAs_Consignee_Address").val(item.Save_Location_As);
                        $("#txtCntactName_Consignee_Address").val(item.Contact_Name);
                        $("#txtCity_Consignee_Address").val(item.City);
                        $("#txtZipCode_Consignee_Address").val(item.Zip_Code);
                        $("#txtAddress2_Consignee_Address").val(item.Address2);
                        $("#txtInstructions_Consignee_Address").val(item.Instructions);
                        $("#txtAddressPhoneNumber_Consignee_Address").val(item.Phone);
                        $("#cmbCountry_Consignee_Address option").each(function () {
                            if ($(this).val().trim() == item.Country) {
                                $(this).attr("selected", "selected");
                                $(this).prop('selected', true).trigger('change');
                            }
                        });
                        setTimeout(function () {
                            $("#cmbState_Consignee_Address option").each(function () {
                                if ($(this).val().trim() == item.State.trim()) {
                                    $(this).attr("selected", "selected");
                                    $(this).prop('selected', true).trigger('change');
                                }
                            });
                        }, 1000);
                    });
                }
            }

            ///////////////////////////////////End Popup Fill/////////////////////////////////////////////////////////
            $('body').pleaseWait('stop');
        }

    });
}
// Add Dynamic Textbox CTPAT//////////////////////
$(function () {
    $("#Btn_CTPATADD").bind("click", function () {
        var div = $("<div />");
        div.html(GetDynamicTextBox("", ""));
        $("#TextBoxContainer").append(div);
    });
    $("body").on("click", ".remove", function () {
        var CTPAT_Delete = $(this);

        swal({
            title: "Are you sure you want to delete?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        },
    function () {
        //alert("aaa");
        $(CTPAT_Delete).closest(".form-group").remove();
    });
    });
});
function GetDynamicTextBox(value, attrid) {
    return ' <div class="clearfix"></div><div class="form-group" style="padding-top: 5px;"> <div class="col-lg-4"><button id="Btn_delete" type="button" class="btn btn-danger btn-sm remove"> <span class="glyphicon glyphicon-trash"></span> ' +
    ' </button><label>C-TPAT:</label> </div> <div class="col-lg-8"><input attrid="' + attrid + '" name = "DynamicTextBox" class="form-control DynamicTextBox ctpat" type="text" value = "' + value + '" />  </div></div>'

}
//End Add Dynamic Textbox CTPAT//////////////////////

// Add Dynamic Textbox CSA//////////////////////
$(function () {
    $("#Btn_CSAADD").bind("click", function () {
        var div = $("<div />");
        div.html(GetDynamicTextBox_CSA("", ""));
        $("#TextBoxContainer_CSA").append(div);
    });
    $("body").on("click", ".remove", function () {
        var CSA_Delete = $(this);

        swal({
            title: "Are you sure you want to delete?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        },
    function () {
        //alert("aaa");
        $(CSA_Delete).closest(".form-group").remove();
    });
    });
});
function GetDynamicTextBox_CSA(value, attrid) {
    return ' <div class="clearfix"></div><div class="form-group" style="padding-top: 5px;"> <div class="col-lg-4"><button id="Btn_delete_Csa" type="button" class="btn btn-danger btn-sm remove"> <span class="glyphicon glyphicon-trash"></span> ' +
    ' </button><label>CSA:</label> </div> <div class="col-lg-8"><input attrid="' + attrid + '" name = "DynamicTextBox_CSA" class="form-control csa" type="text" value = "' + value + '" />  </div></div>'

}
//End Add Dynamic Textbox CSA//////////////////////

///// Dispatch add/////////////////////////

// Add Dynamic Textbox ACC FEE//////////////////////
$(function () {
    $("#Btn_AccessorialFeeAdd").bind("click", function () {
        var div = $("<div />");
        div.html(GetDynamicTextBoxAccFee("", "", ""));
        $("#TextBoxContainerAccFee").append(div);
    });
    $("body").on("click", ".removeAccFee", function () {
        var AssFee_Delete = $(this);
        swal({
            title: "Are you sure you want to delete?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        },
   function () {
       $(AssFee_Delete).closest(".row").remove();
       calculationHauling();
   });
    });
});
function GetDynamicTextBoxAccFee(txtvalue, dropvalue, AccFeeID) {
    var accfeeddl = $('.divAccessorialfee').eq(0).html();

    //return '<div class="row DivAccFee"  style="padding-top: 5px;"><div class="col-md-6"> <div class="form-group"><div class="col-lg-4"><button type="button" class="btn btn-danger btn-sm removeAccFee"> <span class="glyphicon glyphicon-trash"></span> </button>' +
    //'<label>Accessorial Fee:</label></div> <div class="col-lg-8"><select class="form-control select2 cmbAccessorialfee"  style="width: 100%;" data-placeholder="Select Option">' +
    //'<option value="1">Stop Off</option><option value="2">Lumper</option><option value="3">Detention</option><option value="4">Tarp</option>' +
    //'</select></div> </div></div><div class="col-md-6"> <div class="form-group"> <div class="col-lg-4">' +
    //'<input class="form-control txtAccessorialfee" type="number" placeholder="0" AccFeeID="' + AccFeeID + '" onkeyup="Accessorial(this)" onchange="Accessorial(this)"/>' +
    //'</div><div class="col-lg-8"><label  style="float: right;" class="Accessorialfeeslbl">0.00</label></div></div></div> </div>'

    return '<div class="row DivAccFee"  style="padding-top: 5px;"><div class="col-md-6"> <div class="form-group"><div class="col-lg-4"><button type="button" class="btn btn-danger btn-sm removeAccFee"> <span class="glyphicon glyphicon-trash"></span> </button>' +
    '<label>Accessorial Fee:</label></div> <div class="col-lg-8"><div class="divAccessorialfee">' + accfeeddl + '</div></div> </div></div><div class="col-md-6"> <div class="form-group"> <div class="col-lg-4">' +
    '<input class="form-control txtAccessorialfee" type="number" placeholder="0" AccFeeID="' + AccFeeID + '" onkeyup="Accessorial(this)" onchange="Accessorial(this)"/>' +
    '</div><div class="col-lg-8"><label  style="float: right;" class="Accessorialfeeslbl">0.00</label></div></div></div> </div>'
}
//End Add Dynamic Textbox ACC FEE//////////////////////

// Add Dynamic Textbox HALUING FEE//////////////////////
$(function () {
    $("#Btn_HaulingFeeAdd").bind("click", function () {
        var div = $("<div />");
        div.html(GetDynamicTextBoxHaulingFee("", "", ""));
        $("#TextBoxContainerHaulingFee").append(div);
    });
    $("body").on("click", ".removeHaulingFee", function () {
        var HaulingFee_Delete = $(this);
        swal({
            title: "Are you sure you want to delete?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        },
   function () {
       $(HaulingFee_Delete).closest(".row").remove();
       calculationHauling();
   });
    });
});
function GetDynamicTextBoxHaulingFee(txtvalue1, dropvalue1, HaulingFeeID) {
    var HaulingFeeddl = $('.divHaulingFee').eq(0).html();


    return '<div class="row DivHauling_Fee"  style="padding-top: 5px;"><div class="col-md-6"> <div class="form-group"><div class="col-lg-4"><button type="button" class="btn btn-danger btn-sm removeHaulingFee"> <span class="glyphicon glyphicon-trash"></span> </button>' +
    '<label>Hauling Fee:</label></div> <div class="col-lg-8"><div class="divHaulingFee">' + HaulingFeeddl + '</div></div> </div></div><div class="col-md-6"> <div class="form-group"> <div class="col-lg-4">' +
    '<input class="form-control txtHauingFee" type="number" placeholder="0" HaulingFeeid="' + HaulingFeeID + '" onkeyup="calculationHauling()" onchange="calculationHauling()"/>' +
    '</div><div class="col-lg-8"><label  style="float: left;" class="LblHauingCalculation"></label><label  style="float: right;" class="LblHauingAmount">0.00</label></div></div></div> </div>'
}
//End Add Dynamic Textbox HALUING FEE//////////////////////

// Add Dynamic Textbox Fuel Surcharge//////////////////////
$(function () {
    $("#Btn_FuelSurchargeAdd").bind("click", function () {
        var div = $("<div />");
        div.html(GetDynamicTextBoxFuelSurcharge("", "", ""));
        $("#TextBoxContainerFuelSurcharge").append(div);
    });
    $("body").on("click", ".removeFuelSurcharge", function () {
        var FuelSurcharge_Delete = $(this);
        swal({
            title: "Are you sure you want to delete?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        },
   function () {
       $(FuelSurcharge_Delete).closest(".row").remove();
       calculationHauling();
   });
    });
});
function GetDynamicTextBoxFuelSurcharge(txtvalue2, dropvalue2, FuelSurchargeID) {
    var FuelSurchargeddl = $('.divFuelSurcharge').eq(0).html();


    return '<div class="row DivFuel_Surcharge"  style="padding-top: 5px;"><div class="col-md-6"> <div class="form-group"><div class="col-lg-4"><button type="button" class="btn btn-danger btn-sm removeFuelSurcharge"> <span class="glyphicon glyphicon-trash"></span> </button>' +
    '<label>Fuel Surcharge:</label></div> <div class="col-lg-8"><div class="divFuelSurcharge">' + FuelSurchargeddl + '</div></div> </div></div><div class="col-md-6"> <div class="form-group"> <div class="col-lg-4">' +
    '<input class="form-control txtFuelSurcharge" type="number" placeholder="0" FuelSurchargeid="' + FuelSurchargeID + '" onkeyup="calculationHauling()" onchange="calculationHauling()"/>' +
    '</div><div class="col-lg-8"><label  style="float: left;" class="LblFuelSurchargeCalculation"></label><label  style="float: right;" class="LblFuelSurchargeAmount">0.00</label></div></div></div> </div>'
}
//End Add Dynamic Textbox Fuel Surcharge//////////////////////

/////End Dispatch add/////////////////////////

// Add Dynamic Table Row//////////////////////
$(function () {
    var i = 1;
    $("#add_row").click(function () {

        var Description = $('#tab_logic tr:eq(1) td:eq(1)').html();
        var Pickup_Location = $('#tab_logic tr:eq(1) td:eq(2)').html();
        var DropOff_Location = $('#tab_logic tr:eq(1) td:eq(3)').html();
        var Weight = $('#tab_logic tr:eq(1) td:eq(4)').html();
        var Oty = $('#tab_logic tr:eq(1) td:eq(5)').html();
        var LWH = $('#tab_logic tr:eq(1) td:eq(6)').html();
        var FTCUBE = '<label class="LblCubicfeet">0.00</label>'
        var FC = $('#tab_logic tr:eq(1) td:eq(8)').html();
        var DV = $('#tab_logic tr:eq(1) td:eq(9)').html();

        $('#addr' + i).html("<td>  <input type='number' style='display: none;' class='ID' /><button type='button' class='btn btn-danger btn-sm removetr'> <span class='glyphicon glyphicon-trash'></span> </button></td>" +
            " <td>" + Description + "</td><td>" + Pickup_Location + "</td> " +
            " <td>" + DropOff_Location + "</td><td>" + Weight + "</td><td>" + Oty + "</td><td>" + LWH + "</td><td>" + FTCUBE + "</td><td>" + FC + "</td><td>" + DV + "</td>");

        $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
        // $(".select2").select2();
        i++;
    });
    $("body").on("click", ".removetr", function () {
        var Table_Delete = $(this);
        swal({
            title: "Are you sure you want to delete?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        },
   function () {
       var Weight_Value = $(Table_Delete).closest("tr").find('.Weight').val();
       var Weight_Unit = $(Table_Delete).closest("tr").find('.cmbWeight').val();
       var Total_Weight = $("#LblTotalWeight").html();
       var _total = 0;
       if (!isNaN(Weight_Value) && Weight_Value.length != 0) {

           if (Weight_Value != null && Weight_Value != '' && Weight_Value != undefined) {

               if (Weight_Unit == '1') {
                   _total = parseFloat(Weight_Value);
                   $("#LblTotalWeight").html((Total_Weight - _total).toFixed(2));
               }
               else {
                   _total = ConvertTonsToLbs(Weight_Value);
                   $("#LblTotalWeight").html((Total_Weight - _total).toFixed(2));
               }
           }
       }

       calculationHauling();
       var _total1 = 0;
       var L_Value = $(Table_Delete).closest("tr").find('.L').val();
       var H_Value = $(Table_Delete).closest("tr").find('.H').val();
       var T_Value = $(Table_Delete).closest("tr").find('.T').val();
       var LHT_Unit = $(Table_Delete).closest("tr").find('.cmbLHT').val();
       var Total_LHT = $("#LblTotalLWH").html();
       if (!isNaN(L_Value) && L_Value.length != 0 && !isNaN(H_Value) && H_Value.length != 0 && !isNaN(T_Value) && T_Value.length != 0) {

           if (L_Value != null && L_Value != '' && L_Value != undefined && H_Value != null && H_Value != '' && H_Value != undefined && T_Value != null && T_Value != '' && T_Value != undefined) {
               if (LHT_Unit == '2') {
                   _total1 += ConvertInchesToFeets(L_Value * H_Value * T_Value);
                   $("#LblTotalLWH").html((Total_LHT - _total1).toFixed(2));
               }
               else {
                   _total1 += parseFloat(L_Value * H_Value * T_Value);
                   $("#LblTotalLWH").html((Total_LHT - _total1).toFixed(2));
               }
           }

       }
       var _total2 = 0;
       var DV_Value = $(Table_Delete).closest("tr").find('.DV').val();
       var Total_DV = $("#LblTotalValue").html();
       if (!isNaN(DV_Value) && DV_Value.length != 0) {
           if (DV_Value != null && DV_Value != '' && DV_Value != undefined) {

               _total2 += parseFloat(DV_Value);
               $("#LblTotalValue").html((Total_DV - _total2).toFixed(2));

           }
       }


       $(Table_Delete).closest("tr").remove();

   });
    });
    //$("#delete_row").click(function () {
    //    if (i > 1) {
    //        $("#addr" + (i - 1)).html('');
    //        i--;
    //    }
    //});
});
// End Add Dynamic Table Row//////////////////////

//Flat red color scheme for iCheck
$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass: 'iradio_flat-green'
});

//Timepicker
$(".timepicker").timepicker({
    showInputs: false
});

$('#radioCustomer').on('ifChecked', function (event) {
    Req = 'Customer';
    obj = "Fill";
    url = "CreateLoad.aspx/LoadDetails";
    ht = {};
    LoadAjaxLoad(ht, obj, Req, url);

    $("#Div_ContactName").hide();
    $('#LblCustomerCarrierBroker').text("Customer:");
    $('#LblContactname').text("Contact Name:");
});
$('#chkManualEmailID').on('ifChecked', function (event) {
    $("#cmbSendCommentEmail").prop("disabled", true);
    $("#cmbSendCommentEmail").val("").trigger('change');
    $("#txtManualEmail").prop("disabled", false);
});
$('#chkManualEmailID').on('ifUnchecked', function (event) {
    $("#cmbSendCommentEmail").prop("disabled", false);
    $("#txtManualEmail").prop("disabled", true);
});
$('#chkManualPhoneNo').on('ifChecked', function (event) {
    $("#cmbSendCommentSMS").prop("disabled", true);
    $("#cmbSendCommentSMS").val("").trigger('change');
    $("#txtManualPhoneNo").prop("disabled", false);
});
$('#chkManualPhoneNo').on('ifUnchecked', function (event) {
    $("#cmbSendCommentSMS").prop("disabled", false);
    $("#txtManualPhoneNo").prop("disabled", true);
});
$('#radioCarrier').on('ifChecked', function (event) {
    Req = 'Carrier';
    obj = "Fill";
    url = "CreateLoad.aspx/LoadDetails";
    ht = {};
    LoadAjaxLoad(ht, obj, Req, url);

    $("#Div_ContactName").hide();
    $('#LblCustomerCarrierBroker').text("Carrier:");
    $('#LblContactname').text("Contact Name:");
});
$('#radiobroker').on('ifChecked', function (event) {
    Req = 'Broker';
    obj = "Fill";
    url = "CreateLoad.aspx/LoadDetails";
    ht = {};
    LoadAjaxLoad(ht, obj, Req, url);

    $("#Div_ContactName").hide();
    $('#LblCustomerCarrierBroker').text("Broker:");
    $('#LblContactname').text("Agent Name:");
});
$('#chkDropTrailer').on('ifChecked', function (event) {
    $("#cmbTrailerGroup").prop("disabled", true);
    $("#cmbTrailerType").prop("disabled", true);
    $("#cmbTrailerGroup").val("").trigger('change');
    $("#cmbTrailerType").val("").trigger('change');
});
$('#chkDropTrailer').on('ifUnchecked', function (event) {
    $("#cmbTrailerGroup").prop("disabled", false);
    $("#cmbTrailerType").prop("disabled", false);

});
$('#chkReefer').on('ifChecked', function (event) {
    $("#DivTemp").show();
});
$('#chkReefer').on('ifUnchecked', function (event) {
    $("#DivTemp").hide();
    $("#txtTemp").val("");
});
function TimeRangeShow() {
    $("#SpanPickupTime").hide();
    $("#DivTimeRange").show();
    $("#HrefShowTimeRange").hide();
}
function TimeRangeHide() {
    $("#SpanPickupTime").show();
    $("#DivTimeRange").hide();
    $("#HrefShowTimeRange").show();
}
function TimeRangeShowConsignee() {
    $("#SpanDropOffTime").hide();
    $("#DivTimeRangeConsignee").show();
    $("#HrefShowTimeRangeConsignee").hide();
}
function TimeRangeHideConsignee() {
    $("#SpanDropOffTime").show();
    $("#DivTimeRangeConsignee").hide();
    $("#HrefShowTimeRangeConsignee").show();
}
$("#cmbFuelSurcharge").change(function () {

    if ($('#cmbFuelSurcharge').val() == "2") {
        $("#DivPercentSign").show();
        $("#txtFuelSurchargeRate").width(108);
    }
    else {
        $("#DivPercentSign").hide();
        $("#txtFuelSurchargeRate").width(120);
    }

});
$("#cmbDiscount").change(function () {

    if ($('#cmbDiscount').val() == "1") {
        $("#txtDiscount").prop("disabled", true);
        $("#txtDiscount").val("");
    }
    else {
        $("#txtDiscount").prop("disabled", false);
    }

});
function ShortTable(Tbl) {
    $(Tbl).DataTable({
        "paging": false,
        "lengthChange": true,
        "searching": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        dom: 'C<"clear">lfrtip',
        colVis: {
            exclude: [0]
        }
    });
}
function LoadAjaxLoadwithlist(ht, obj, Req, url, cpatlist, csalist, ShipperList, ConsigneeList, FreightList, CommentList, DocumentList, AccessorialFeelist, HaulingFeelist, FuelSurchargelist) {
    $('body').pleaseWait();

    $.ajax({
        type: "POST",
        url: url,
        data: "{ht:" + JSON.stringify(ht) + ",Type :'" + obj + "' ,Req :'" + Req + "'," +
            " cpatlist:" + JSON.stringify(cpatlist) + ",csalist:" + JSON.stringify(csalist) + ",ShipperList:" + JSON.stringify(ShipperList) + "," +
            " ConsigneeList:" + JSON.stringify(ConsigneeList) + ",FreightList:" + JSON.stringify(FreightList) + "," +
            " CommentList:" + JSON.stringify(CommentList) + ",DocumentList:" + JSON.stringify(DocumentList) + ",AccessorialFeelist:" + JSON.stringify(AccessorialFeelist) + ",HaulingFeelist:" + JSON.stringify(HaulingFeelist) + ",FuelSurchargelist:" + JSON.stringify(FuelSurchargelist) + "" +
            "}",
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

            if (obj == "SaveCompleteLoad") {
                if (Result.d.SaveCompleteLoad != "" && Result.d.SaveCompleteLoad != undefined) {
                    var json = jQuery.parseJSON(Result.d.SaveCompleteLoad)[0];

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
                            window.location = 'AllLoadList.aspx';
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
function SaveCompleteLoad() {
    if (validationcheck_Total_Load() == true) {
        setTimeout(function () {



            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["Load_Number"] = $("#txtLoadNumber").val();

            if ($('#radioFTL').is(':checked')) {

                ht["IsLTLorFTL"] = "0";
            }
            else if ($('#radioLTL').is(':checked')) {

                ht["IsLTLorFTL"] = "1";
            }

            if ($('#radioCustomer').is(':checked')) {

                ht["IsCustCarrORBro"] = "0";
                ht["Type"] = "CUS";
            }
            else if ($('#radioCarrier').is(':checked')) {

                ht["IsCustCarrORBro"] = "1";
                ht["Type"] = "CAR";
            }
            else if ($('#radiobroker').is(':checked')) {

                ht["IsCustCarrORBro"] = "2";
                ht["Type"] = "BRO";
            }

            ht["CustCarrORBro_ID"] = $("#cmbCustomerCarrierBroker :selected").val();
            ht["CustCarrORBroContact_ID"] = $("#cmbContactname :selected").val();

            ht["Account_No"] = $("#txtAccountNo").val();
            ht["Load_Date"] = $("#txtLoadDate").val();
            ht["Load_Time"] = $("#txtLoadTime").val();
            ht["Reference"] = $("#txtReference").val();


            if ($('#chkDropTrailer').is(':checked')) {
                ht["IsLDropTrailer"] = "1";
            }
            else {
                ht["IsLDropTrailer"] = "0";
            }

            ht["Trailer_Group_ID"] = $("#cmbTrailerGroup :selected").val();
            ht["Trailer_Type_ID"] = $("#cmbTrailerType :selected").val();

            if ($('#chkHazMat').is(':checked')) {
                ht["IsLHazMat"] = "1";
            }
            else {
                ht["IsLHazMat"] = "0";
            }

            if ($('#chkOversizeLoad').is(':checked')) {
                ht["IsOversize_Load"] = "1";
            }
            else {
                ht["IsOversize_Load"] = "0";
            }

            if ($('#chkReefer').is(':checked')) {
                ht["IsReefer"] = "1";
            }
            else {
                ht["IsReefer"] = "0";
            }


            if ($('#chkTanker').is(':checked')) {
                ht["IsTanker"] = "1";
            }
            else {
                ht["IsTanker"] = "0";
            }

            ht["Temp"] = $("#txtTemp").val();
            if ($("txtTotalMiles").val() != "" && $("#txtTotalMiles").val() != null && $("#txtTotalMiles").val() != undefined) {
                ht["Total_Miles"] = $("#txtTotalMiles").val();
            }
            else {
                ht["Total_Miles"] = "0";
            }
            //ht["Hauling_Fee_ID"] = $("#cmbHaulingFee :selected").val();
            //if ($("#txtHauingRate").val() != "" && $("#txtHauingRate").val() != null && $("#txtHauingRate").val() != undefined) {
            //    ht["Hauling_Fee_Rate"] = $("#txtHauingRate").val();
            //}
            //else {
            //    ht["Hauling_Fee_Rate"] = "0";
            //}

            //ht["FuelSurcharge_ID"] = $("#cmbFuelSurcharge :selected").val();
            //if ($("#txtFuelSurchargeRate").val() != "" && $("#txtFuelSurchargeRate").val() != null && $("#txtFuelSurchargeRate").val() != undefined) {
            //    ht["FuelSurcharge_Rate"] = $("#txtFuelSurchargeRate").val();
            //}
            //else {
            //    ht["FuelSurcharge_Rate"] = "0";
            //}

            ht["Discount_ID"] = $("#cmbDiscount :selected").val();
            if ($("#txtDiscount").val() != "" && $("#txtDiscount").val() != null && $("#txtDiscount").val() != undefined) {
                ht["Discount_Amount"] = $("#txtDiscount").val();
                ht["Discount_Total_Amount"] = $("#LblDiscount").html();

            }
            else {
                ht["Discount_Amount"] = "0";
                ht["Discount_Total_Amount"] = "0";
            }

            ht["Sub_Total"] = $("#LblSubTotal").html();
            ht["Total_Amount"] = $("#LblTotalAmount").html();

            //@CTPAT_Details  UDT_LOAD_DETAILS_CTPAT readonly,
            //@Accessorial_Fee_Details  UDT_LOAD_DETAILS_Accessorial_Fee readonly,



            var i = 0;
            var cpatlist = new Array();

            $(".ctpat").each(function () {
                var cpat = {};
                cpat.id = $(this).attr("attrid");
                cpat.value = $(this).val();
                cpatlist[i++] = cpat;
            });

            var j = 0;
            var csalist = new Array();

            $(".csa").each(function () {
                var csa = {};
                csa.id = $(this).attr("attrid");
                csa.value = $(this).val();
                csalist[j++] = csa;
            });

            //////////////////////////Shipper List Send////////////////////////////////////////////

            var i = 0;
            ShipperList = new Array();
            $('#ShipperList tbody tr').each(function () {
                var ShipperList_Model = {};
                ShipperList_Model.ID = $(this).find('td:eq(0)').html();
                ShipperList_Model.Shipper_ID = $(this).find('td:eq(2)').html();
                ShipperList_Model.Pickup_Location_ID = $(this).find('td:eq(4)').html();
                ShipperList_Model.Pickup_Date = $(this).find('td:eq(5)').html();
                ShipperList_Model.Pickup_Fixed_Time = $(this).find('td:eq(6)').html();
                ShipperList_Model.Pickup_From_Time = $(this).find('td:eq(7)').html();
                ShipperList_Model.Pickup_To_Time = $(this).find('td:eq(8)').html();
                ShipperList_Model.Pickup_Instruction = $(this).find('td:eq(9)').html();
                ShipperList_Model.Contact_Person_at_PickUp = $(this).find('td:eq(10)').html();
                ShipperList_Model.Phone = $(this).find('td:eq(11)').html();
                ShipperList_Model.BOL = $(this).find('td:eq(12)').html();
                ShipperList_Model.Reference = $(this).find('td:eq(13)').html();
                ShipperList_Model.Notes = $(this).find('td:eq(14)').html();
                ShipperList[i++] = ShipperList_Model;
            });


            ////////////////////////// End Shipper List Send////////////////////////////////////////////
            //////////////////////////Consignee List Send////////////////////////////////////////////

            var i = 0;
            ConsigneeList = new Array();
            $('#ConsigneeList tbody tr').each(function () {
                var Consignee_Model = {};
                Consignee_Model.ID = $(this).find('td:eq(0)').html();
                Consignee_Model.Consignee_ID = $(this).find('td:eq(2)').html();
                Consignee_Model.Drop_Of_Location_ID = $(this).find('td:eq(4)').html();
                Consignee_Model.Delivery_Date = $(this).find('td:eq(5)').html();
                Consignee_Model.Delivery_Fixed_Time = $(this).find('td:eq(6)').html();
                Consignee_Model.Delivery_From_Time = $(this).find('td:eq(7)').html();
                Consignee_Model.Delivery_To_Time = $(this).find('td:eq(8)').html();
                Consignee_Model.Delivery_Instruction = $(this).find('td:eq(9)').html();
                Consignee_Model.Contact_Person_at_Delivery = $(this).find('td:eq(10)').html();
                Consignee_Model.Phone = $(this).find('td:eq(11)').html();
                Consignee_Model.Reference = $(this).find('td:eq(12)').html();
                Consignee_Model.Notes = $(this).find('td:eq(13)').html();
                ConsigneeList[i++] = Consignee_Model;
            });

            ////////////////////////// End Consignee List Send////////////////////////////////////////////
            //////////////////////////Freight List Send////////////////////////////////////////////

            var i = 0;
            FreightList = new Array();
            var len = $('#tab_logic tbody tr').length;

            $('#tab_logic tbody tr').each(function () {
                var Freight_Model = {};
                Freight_Model.ID = $(this).find('.ID').val();
                Freight_Model.Description = $(this).find('.Description').val();
                Freight_Model.Pick_Up = $(this).find('.cmbPickup').val();
                Freight_Model.Drop_Of = $(this).find('.cmbDropOff').val();
                Freight_Model.Weight_Value = $(this).find('.Weight').val();
                Freight_Model.Weight_Unit_ID = $(this).find('.cmbWeight').val();
                Freight_Model.Qty_Value = $(this).find('.Qty').val();
                Freight_Model.Qty_Unit_ID = $(this).find('.cmbQty').val();
                Freight_Model.L_Value = $(this).find('.L').val();
                Freight_Model.W_Value = $(this).find('.H').val();
                Freight_Model.H_Value = $(this).find('.T').val();
                Freight_Model.LWH_ID = $(this).find('.cmbLHT').val();
                Freight_Model.FC_ID = $(this).find('.cmbFC').val();
                Freight_Model.Declared_Value = $(this).find('.DV').val();
                if (i < len - 2) {
                    FreightList[i++] = Freight_Model;
                }
            });
            ////////////////////////// End Freight List Send////////////////////////////////////////////


            //////////////////////////Comments Send////////////////////////////////////////////

            var i = 0;
            CommentList = new Array();
            $('#CommentList tbody tr').each(function () {
                var CommentL_Model = {};
                CommentL_Model.ID = "";
                CommentL_Model.Comment = $(this).find('td:eq(0)').html();

                CommentL_Model.Email_Person_ID = $(this).find('td:eq(1)').html();
                CommentL_Model.Email_ID = $(this).find('td:eq(2)').html();
                CommentL_Model.Email_ID_Text = $(this).find('td:eq(3)').html();
                CommentL_Model.Is_Email_Text = $(this).find('td:eq(4)').html();
                CommentL_Model.Email_ID_Type = $(this).find('td:eq(5)').html();

                CommentL_Model.Phone_Person_ID = $(this).find('td:eq(6)').html();
                CommentL_Model.Phone_No = $(this).find('td:eq(7)').html();
                CommentL_Model.Phone_No_Text = $(this).find('td:eq(8)').html();
                CommentL_Model.Is_Phone_Text = $(this).find('td:eq(9)').html();
                CommentL_Model.Phone_ID_Type = $(this).find('td:eq(10)').html();

                CommentL_Model.side = $(this).find('td:eq(13)').html();
                CommentL_Model.type = $(this).find('td:eq(14)').html();
                CommentList[i++] = CommentL_Model;
            });

            ////////////////////////// End Comments Send////////////////////////////////////////

            //////////////////////////Document Send////////////////////////////////////////////

            var i = 0;
            DocumentList = new Array();
            $('#DocumentList tbody tr').each(function () {
                if ($(this).find('td:eq(5)').html() == "L") {
                    var Document_Model = {};
                    Document_Model.ID = "";
                    Document_Model.Tittle = $(this).find('td:eq(0)').html();
                    Document_Model.Url = $(this).find('td:eq(4)').html();
                    DocumentList[i++] = Document_Model;
                }
            });

            ////////////////////////// End Document////////////////////////////////////////
            ///////////////////////// Accessorial Fee Send/////////////////////////////////

            var i = 0;
            var AccessorialFeelist = new Array();

            $(".DivAccFee").each(function () {
                var AccessorialFee = {};
                AccessorialFee.ID = $(this).find(".txtAccessorialfee").attr("AccFeeID");
                AccessorialFee.AccessorialFee_ID = $(this).find(".cmbAccessorialfee").val();
                AccessorialFee.AccessorialFee_Rate = $(this).find(".txtAccessorialfee").val();
                AccessorialFee.AccessorialFee_Amount = $(this).find(".Accessorialfeeslbl").html();
                AccessorialFeelist[i++] = AccessorialFee;
            });

            ///////////////////////// End Accessorial Fee Send/////////////////////////////////

            ///////////////////////// Hauling Fee Send/////////////////////////////////

            var i = 0;
            var HaulingFeelist = new Array();

            $(".DivHauling_Fee").each(function () {
                var HaulingFee = {};
                HaulingFee.ID = $(this).find(".txtHauingFee").attr("HaulingFeeid");
                HaulingFee.HaulingFee_ID = $(this).find(".cmbHaulingFee").val();
                HaulingFee.HaulingFee_Rate = $(this).find(".txtHauingFee").val();
                HaulingFee.HaulingFee_Amount = $(this).find(".LblHauingAmount").html();
                HaulingFee.Tax_ID = 0;
                HaulingFee.Tax_Amount ="";
                HaulingFee.Line_Total = "";
                HaulingFeelist[i++] = HaulingFee;
            });

            ///////////////////////// End Hauling Fee Send/////////////////////////////////

            ///////////////////////// Fuel Surcharge Send/////////////////////////////////

            var i = 0;
            var FuelSurchargelist = new Array();

            $(".DivFuel_Surcharge").each(function () {
                var FuelSurcharge = {};
                FuelSurcharge.ID = $(this).find(".txtFuelSurcharge").attr("FuelSurchargeid");
                FuelSurcharge.FuelSurcharge_ID = $(this).find(".cmbFuelSurcharge").val();
                FuelSurcharge.FuelSurcharge_Rate = $(this).find(".txtFuelSurcharge").val();
                FuelSurcharge.FuelSurcharge_Amount = $(this).find(".LblFuelSurchargeAmount").html();
                FuelSurcharge.Tax_ID = 0;
                FuelSurcharge.Tax_Amount = "";
                FuelSurcharge.Line_Total = "";
                FuelSurchargelist[i++] = FuelSurcharge;
            });

            ///////////////////////// End Fuel Surcharge Send/////////////////////////////////

            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }


            Req = 'SaveCompleteLoad';
            obj = "SaveCompleteLoad";
            url = "CreateLoad.aspx/savedetailswithlist";
            LoadAjaxLoadwithlist(ht, obj, Req, url, cpatlist, csalist, ShipperList, ConsigneeList, FreightList, CommentList, DocumentList, AccessorialFeelist, HaulingFeelist, FuelSurchargelist);

        }, 1000);
    }
}
////////////////////////////////////Shipper Add//////////////////////////////////////////////////////////////////////////

function ClearShipper() {
    $("#txtShipperID").val("");
    $("#cmbShipper").val("").trigger('change');
    $("#cmbShipperLocation").val("").trigger('change');
    $("#txtPickupDate").val("");
    $("#txtPickupTime").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    $("#txtPickupTimerangeFrom").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    $("#txtPickupTimerangeTo").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    $("#txtPickupInstruction").val("");
    $("#txtPickupContactperson").val("");
    $("#txtPickupPhone").val("");
    $("#txtPickupBol").val("");
    $("#txtPickupReference").val("");
    $("#txtPickupNotes").val("");
}

function SaveShipper() {
    if (validationcheckShipper() == true) {
        setTimeout(function () {

            ht["ID"] = $("#txtShipperID").val();
            ht["ShipperName"] = $("#cmbShipper option:selected").text();
            ht["ShipperID"] = $("#cmbShipper").val();
            ht["PickupLocation"] = $("#cmbShipperLocation option:selected").text();
            ht["PickupLocationID"] = $("#cmbShipperLocation").val();
            ht["PickupDate"] = $("#txtPickupDate").val();
            ht["PickupTime"] = $("#txtPickupTime").val();
            ht["PickupTimerangeFrom"] = $("#txtPickupTimerangeFrom").val();
            ht["PickupTimerangeTo"] = $("#txtPickupTimerangeTo").val();
            ht["PickupInstruction"] = $("#txtPickupInstruction").val();
            ht["PickupContactperson"] = $("#txtPickupContactperson").val();
            ht["PickupPhone"] = $("#txtPickupPhone").val();
            ht["PickupBol"] = $("#txtPickupBol").val();
            ht["PickupReference"] = $("#txtPickupReference").val();
            ht["PickupNotes"] = $("#txtPickupNotes").val();

            $(".cmbPickup").append($('<option></option>').val(ht["PickupLocationID"]).html(ht["PickupLocation"]));

            var table = "";

            table = table + "<tr><td style='display:none' >" + ht["ID"] +
                            "</td><td>" + ht["ShipperName"] +
                            "</td><td style='display:none'>" + ht["ShipperID"] +
                            "</td><td>" + ht["PickupLocation"] +
                            "</td><td style='display:none'>" + ht["PickupLocationID"] +
                            "</td><td>" + ht["PickupDate"] +
                            "</td><td style='display:none' >" + ht["PickupTime"] +
                            "</td><td style='display:none' >" + ht["PickupTimerangeFrom"] +
                            "</td><td style='display:none' >" + ht["PickupTimerangeTo"] +
                            "</td><td style='display:none' >" + ht["PickupInstruction"] +
                            "</td><td style='display:none' >" + ht["PickupContactperson"] +
                            "</td><td style='display:none' >" + ht["PickupPhone"] +
                            "</td><td style='display:none' >" + ht["PickupBol"] +
                            "</td><td style='display:none' >" + ht["PickupReference"] +
                            "</td><td style='display:none' >" + ht["PickupNotes"] +
                            "<td class='Edit " + _allowedit + "' align='center'> <button type='button' " +
                            " onclick=ShipperEdit(this) class='btn btn-default btn-sm' id='btnedit_Shipper' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                            "</td>" +
                            "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=ShipperDelet(this) class='btn btn-default btn-sm' id='btndelete_Shipper' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                            "</tr>"

            $("#ShipperListDiv tbody tr .dataTables_empty").parents('tr').remove()
            $("#ShipperListDiv tbody").append(table);

            $("#txtShipperID").val("");
            $("#cmbShipper").val("").trigger('change');
            $("#cmbShipperLocation").val("").trigger('change');
            $("#txtPickupDate").val("");
            $("#txtPickupTime").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            $("#txtPickupTimerangeFrom").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            $("#txtPickupTimerangeTo").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            $("#txtPickupInstruction").val("");
            $("#txtPickupContactperson").val("");
            $("#txtPickupPhone").val("");
            $("#txtPickupBol").val("");
            $("#txtPickupReference").val("");
            $("#txtPickupNotes").val("");

        }, 1000);
    }
}
function ShipperEdit(e) {

    $("#txtShipperID").val($(e).closest('tr').find('td:eq(0)').text());
    $("#cmbShipper").val($(e).closest('tr').find('td:eq(2)').text()).trigger('change');
    setTimeout(function () { $("#cmbShipperLocation").val($(e).closest('tr').find('td:eq(4)').text()).trigger('change'); }, 1000);
    $("#txtPickupDate").val($(e).closest('tr').find('td:eq(5)').text());
    $("#txtPickupTime").val($(e).closest('tr').find('td:eq(6)').text());
    $("#txtPickupTimerangeFrom").val($(e).closest('tr').find('td:eq(7)').text());
    $("#txtPickupTimerangeTo").val($(e).closest('tr').find('td:eq(8)').text());
    $("#txtPickupInstruction").val($(e).closest('tr').find('td:eq(9)').text());
    $("#txtPickupContactperson").val($(e).closest('tr').find('td:eq(10)').text());
    $("#txtPickupPhone").val($(e).closest('tr').find('td:eq(11)').text());
    $("#txtPickupBol").val($(e).closest('tr').find('td:eq(12)').text());
    $("#txtPickupReference").val($(e).closest('tr').find('td:eq(13)').text());
    $("#txtPickupNotes").val($(e).closest('tr').find('td:eq(14)').text());

    $(e).parents('tr').remove();

}
function ShipperDelet(e) {
    swal({
        title: "Are you sure you want to delete?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: true
    },
function () {
    var remove_ID = $(e).closest('tr').find('td:eq(4)').text();
    $(".cmbPickup option[value='" + remove_ID + "']").remove();
    $(e).parents('tr').remove();

    //tr:eq(1) td:eq(2)
});
}
function validationcheckShipper() {
    if ($('#cmbShipper').val() == "" || $('#cmbShipper').val() == null) {
        popupErrorMsg($("#cmbShipper"), "Shipper Name is Required.", 5);

        return false;
    }

    if ($('#cmbShipperLocation').val() == "" || $('#cmbShipperLocation').val() == null) {
        popupErrorMsg($("#cmbShipperLocation"), "Pickup Location is Required.", 5);

        return false;
    }
    if ($('#txtPickupDate').val() == "" || $('#txtPickupDate').val() == null) {
        popupErrorMsg($("#txtPickupDate"), "Pickup Date is Required.", 5);

        return false;
    }
    return true;
}
////////////////////////////////////End Shipper Add//////////////////////////////////////////////////////////////////////////
////////////////////////////////////Consignee Add//////////////////////////////////////////////////////////////////////////

function ClearConsignee() {
    $("#txtConsigneeID").val("");
    $("#cmbConsignee").val("").trigger('change');
    $("#cmbConsigneeLocation").val("").trigger('change');
    $("#txtDropOffDate").val("");
    $("#txtDropOffTime").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    $("#txtDropOffTimerangeFrom").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    $("#txtDropOffTimerangeTo").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    $("#txtDropOffInstruction").val("");
    $("#txtDropOffContactperson").val("");
    $("#txtDropOffPhone").val("");
    $("#txtDropOffReference").val("");
    $("#txtDropOffNotes").val("");
}

function SaveConsignee() {
    if (validationcheckConsignee() == true) {
        setTimeout(function () {

            ht["ID"] = $("#txtConsigneeID").val();
            ht["ConsigneeName"] = $("#cmbConsignee option:selected").text();
            ht["ConsigneeID"] = $("#cmbConsignee").val();
            ht["DropOffLocation"] = $("#cmbConsigneeLocation option:selected").text();
            ht["DropOffLocationID"] = $("#cmbConsigneeLocation").val();
            ht["DropOffDate"] = $("#txtDropOffDate").val();
            ht["DropOffTime"] = $("#txtDropOffTime").val();
            ht["DropOffTimerangeFrom"] = $("#txtDropOffTimerangeFrom").val();
            ht["DropOffTimerangeTo"] = $("#txtDropOffTimerangeTo").val();
            ht["DropOffInstruction"] = $("#txtDropOffInstruction").val();
            ht["DropOffContactperson"] = $("#txtDropOffContactperson").val();
            ht["DropOffPhone"] = $("#txtDropOffPhone").val();
            ht["DropOffReference"] = $("#txtDropOffReference").val();
            ht["DropOffNotes"] = $("#txtDropOffNotes").val();

            $(".cmbDropOff").append($('<option></option>').val(ht["DropOffLocationID"]).html(ht["DropOffLocation"]));

            var table = "";

            table = table + "<tr><td style='display:none' >" + ht["ID"] +
                            "</td><td>" + ht["ConsigneeName"] +
                            "</td><td style='display:none'>" + ht["ConsigneeID"] +
                            "</td><td>" + ht["DropOffLocation"] +
                            "</td><td style='display:none'>" + ht["DropOffLocationID"] +
                            "</td><td>" + ht["DropOffDate"] +
                            "</td><td style='display:none' >" + ht["DropOffTime"] +
                            "</td><td style='display:none' >" + ht["DropOffTimerangeFrom"] +
                            "</td><td style='display:none' >" + ht["DropOffTimerangeTo"] +
                            "</td><td style='display:none' >" + ht["DropOffInstruction"] +
                            "</td><td style='display:none' >" + ht["DropOffContactperson"] +
                            "</td><td style='display:none' >" + ht["DropOffPhone"] +
                            "</td><td style='display:none' >" + ht["DropOffReference"] +
                            "</td><td style='display:none' >" + ht["DropOffNotes"] +
                            "<td class='Edit " + _allowedit + "' align='center'> <button type='button' " +
                            " onclick=ConsigneeEdit(this) class='btn btn-default btn-sm' id='btnedit_Consignee' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                            "</td>" +
                            "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=ConsigneeDelet(this) class='btn btn-default btn-sm' id='btndelete_Consignee' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                            "</tr>"

            $("#ConsigneeListDiv tbody tr .dataTables_empty").parents('tr').remove()
            $("#ConsigneeListDiv tbody").append(table);

            $("#txtConsigneeID").val("");
            $("#cmbConsignee").val("").trigger('change');
            $("#cmbConsigneeLocation").val("").trigger('change');
            $("#txtDropOffDate").val("");
            $("#txtDropOffTime").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            $("#txtDropOffTimerangeFrom").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            $("#txtDropOffTimerangeTo").val(new Date(new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            $("#txtDropOffInstruction").val("");
            $("#txtDropOffContactperson").val("");
            $("#txtDropOffPhone").val("");
            $("#txtDropOffReference").val("");
            $("#txtDropOffNotes").val("");

        }, 1000);
    }
}
function ConsigneeEdit(e) {

    $("#txtConsigneeID").val($(e).closest('tr').find('td:eq(0)').text());
    $("#cmbConsignee").val($(e).closest('tr').find('td:eq(2)').text()).trigger('change');
    setTimeout(function () { $("#cmbConsigneeLocation").val($(e).closest('tr').find('td:eq(4)').text()).trigger('change'); }, 1000);
    $("#txtDropOffDate").val($(e).closest('tr').find('td:eq(5)').text());
    $("#txtDropOffTime").val($(e).closest('tr').find('td:eq(6)').text());
    $("#txtDropOffTimerangeFrom").val($(e).closest('tr').find('td:eq(7)').text());
    $("#txtDropOffTimerangeTo").val($(e).closest('tr').find('td:eq(8)').text());
    $("#txtDropOffInstruction").val($(e).closest('tr').find('td:eq(9)').text());
    $("#txtDropOffContactperson").val($(e).closest('tr').find('td:eq(10)').text());
    $("#txtDropOffPhone").val($(e).closest('tr').find('td:eq(11)').text());
    $("#txtDropOffReference").val($(e).closest('tr').find('td:eq(12)').text());
    $("#txtDropOffNotes").val($(e).closest('tr').find('td:eq(13)').text());

    $(e).parents('tr').remove();

}
function ConsigneeDelet(e) {
    swal({
        title: "Are you sure you want to delete?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: true
    },
function () {
    var remove_ID = $(e).closest('tr').find('td:eq(4)').text();
    $(".cmbDropOff option[value='" + remove_ID + "']").remove();
    $(e).parents('tr').remove();
});
}
function validationcheckConsignee() {
    if ($('#cmbConsignee').val() == "" || $('#cmbConsignee').val() == null) {
        popupErrorMsg($("#cmbConsignee"), "Consignee Name is Required.", 5);

        return false;
    }

    if ($('#cmbConsigneeLocation').val() == "" || $('#cmbConsigneeLocation').val() == null) {
        popupErrorMsg($("#cmbConsigneeLocation"), "Drop Off Location is Required.", 5);

        return false;
    }
    if ($('#txtDropOffDate').val() == "" || $('#txtDropOffDate').val() == null) {
        popupErrorMsg($("#txtDropOffDate"), "Drop Off Date is Required.", 5);

        return false;
    }
    return true;
}
////////////////////////////////////End Consignee Add//////////////////////////////////////////////////////////////////////////


function formatDate(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });

    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}

//function formatDate(date) {
//    var monthNames = [
//      "January", "February", "March",
//      "April", "May", "June", "July",
//      "August", "September", "October",
//      "November", "December"
//    ];

//    var day = date.getDate();
//    var monthIndex = date.getMonth();
//    var year = date.getFullYear();

//    return day + ' ' + monthNames[monthIndex] + ' ' + year;
//}



function SaveComment_email() {
    setTimeout(function () {

        var comment_CONTACT_NAME = localStorage.getItem('CONTACT_NAME')
        //var comment_Entry_Date = formatDate(new Date(), 'yyyy-MM-dd');
        var d = new Date();
        var comment_Entry_Date = d.toLocaleString().replace(',', '');
        var start;
        var end;
        var table = "";

        var emailidfields = emailid_multi.split(',');
        end = emailidfields.length;
        start = 0;

        if ($('#chkManualEmailID').is(':checked')) {

            ht = {};
            ht["Comment"] = $("#txtLoadComment").val()

            ht["Email_Person_ID"] = "";
            ht["Email_ID"] = "";

            ht["Email_ID_Text"] = $("#txtManualEmail").val();
            if ($('#chkManualEmailID').is(':checked')) {
                ht["Is_Email_Text"] = "1";
            }
            else {
                ht["Is_Email_Text"] = "0";
            }

            ht["Email_ID_Type"] = "";



            ht["Phone_Person_ID"] = "";
            ht["Phone_No"] = "";

            ht["Phone_No_Text"] = "";
            if ($('#chkManualPhoneNo').is(':checked')) {
                ht["Is_Phone_Text"] = "1";
            }
            else {
                ht["Is_Phone_Text"] = "0";
            }

            ht["Phone_ID_Type"] = "";


            if (ht["Email_ID_Text"] != "") {
                table = table + "<tr><td>" + ht["Comment"] +

                                "</td><td style = 'display:none'>" + ht["Email_Person_ID"] +
                                "</td><td style = 'display:none'>" + ht["Email_ID"] +
                                "</td><td style = 'display:none'>" + ht["Email_ID_Text"] +
                                "</td><td style = 'display:none'>" + ht["Is_Email_Text"] +
                                "</td><td style = 'display:none'>" + ht["Email_ID_Type"] +

                                "</td><td style = 'display:none'>" +
                "</td><td style = 'display:none'>" +
                "</td><td style = 'display:none'>" +
                "</td><td style = 'display:none'>" +
                "</td><td style = 'display:none'>" +

                "</td><td>" + comment_CONTACT_NAME +
                "</td><td>" + comment_Entry_Date +
                "</td><td style = 'display:none'>email" +
                "</td><td style = 'display:none'>L" +

                 "</td><td>EMAIL" +
                  "</td><td>" + ht["Email_ID_Text"] +
                "</td></tr>"

            }
        }
        else {
            while (start < end) {

                var emailidfields_seperate = emailidfields[start].split('|@|');

                ht = {};
                ht["Comment"] = $("#txtLoadComment").val()

                ht["Email_Person_ID"] = emailidfields_seperate[0];
                ht["Email_ID"] = emailidfields_seperate[1];

                ht["Email_ID_Text"] = $("#txtManualEmail").val();
                if ($('#chkManualEmailID').is(':checked')) {
                    ht["Is_Email_Text"] = "1";
                }
                else {
                    ht["Is_Email_Text"] = "0";
                }

                ht["Email_ID_Type"] = emailidfields_seperate[2];



                ht["Phone_Person_ID"] = "";
                ht["Phone_No"] = "";

                ht["Phone_No_Text"] = "";
                if ($('#chkManualPhoneNo').is(':checked')) {
                    ht["Is_Phone_Text"] = "1";
                }
                else {
                    ht["Is_Phone_Text"] = "0";
                }

                ht["Phone_ID_Type"] = "";


                if (emailidfields_seperate[0] != "") {
                    table = table + "<tr><td>" + ht["Comment"] +

                                    "</td><td style = 'display:none'>" + ht["Email_Person_ID"] +
                                    "</td><td style = 'display:none'>" + ht["Email_ID"] +
                                    "</td><td style = 'display:none'>" + ht["Email_ID_Text"] +
                                    "</td><td style = 'display:none'>" + ht["Is_Email_Text"] +
                                    "</td><td style = 'display:none'>" + ht["Email_ID_Type"] +

                                    "</td><td style = 'display:none'>" +
                    "</td><td style = 'display:none'>" +
                    "</td><td style = 'display:none'>" +
                    "</td><td style = 'display:none'>" +
                    "</td><td style = 'display:none'>" +

                    "</td><td>" + comment_CONTACT_NAME +
                    "</td><td>" + comment_Entry_Date +
                    "</td><td style = 'display:none'>email" +
                    "</td><td style = 'display:none'>L" +

                     "</td><td>EMAIL" +
                  "</td><td>" + ht["Email_ID"] +
                    "</td></tr>"

                }

                start = start + 1;

            }
        }


        $("#CommentListDiv tbody tr .dataTables_empty").parents('tr').remove()
        $("#CommentListDiv tbody").append(table);

        $("#txtLoadComment").val("");

        $("#cmbSendCommentEmail").val("").trigger('change');
        $("#txtManualEmail").val("");
        $("#chkManualEmailID").iCheck('uncheck');

        $("#cmbSendCommentSMS").val("").trigger('change');
        $("#txtManualPhoneNo").val("");
        $("#chkManualPhoneNo").iCheck('uncheck');

    }, 2000);
}




function SaveComment() {
    setTimeout(function () {

        var comment_CONTACT_NAME = localStorage.getItem('CONTACT_NAME')

        var d = new Date();
        var comment_Entry_Date = d.toLocaleString().replace(',', '');

        //var comment_Entry_Date = formatDate(new Date());
        var table = "";

        ht = {};
        ht["Comment"] = $("#txtLoadComment").val();

        ht["Email_Person_ID"] = "";
        ht["Email_ID"] = "";

        ht["Email_ID_Text"] = "";
        if ($('#chkManualEmailID').is(':checked')) {
            ht["Is_Email_Text"] = "1";
        }
        else {
            ht["Is_Email_Text"] = "0";
        }

        ht["Email_ID_Type"] = "";



        ht["Phone_Person_ID"] = "";
        ht["Phone_No"] = "";

        ht["Phone_No_Text"] = "";
        if ($('#chkManualPhoneNo').is(':checked')) {
            ht["Is_Phone_Text"] = "1";
        }
        else {
            ht["Is_Phone_Text"] = "0";
        }

        ht["Phone_ID_Type"] = "";



        table = table + "<tr><td>" + ht["Comment"] +

        "</td><td style = 'display:none'>" +
        "</td><td style = 'display:none'>" +
        "</td><td style = 'display:none'>" +
        "</td><td style = 'display:none'>" +
        "</td><td style = 'display:none'>" +

        "</td><td style = 'display:none'>" +
        "</td><td style = 'display:none'>" +
        "</td><td style = 'display:none'>" +
        "</td><td style = 'display:none'>" +
        "</td><td style = 'display:none'>" +

        "</td><td>" + comment_CONTACT_NAME +
        "</td><td>" + comment_Entry_Date +
        "</td><td style = 'display:none'>general" +
         "</td><td style = 'display:none'>L" +

         "</td><td>" +
         "</td><td>"
        "</td></tr>"

        $("#CommentListDiv tbody tr .dataTables_empty").parents('tr').remove()
        $("#CommentListDiv tbody").append(table);

        $("#txtLoadComment").val("");

        $("#cmbSendCommentEmail").val("").trigger('change');
        $("#txtManualEmail").val("");
        $("#chkManualEmailID").iCheck('uncheck');

        $("#cmbSendCommentSMS").val("").trigger('change');
        $("#txtManualPhoneNo").val("");
        $("#chkManualPhoneNo").iCheck('uncheck');


    }, 2000);
}



function SaveComment_sms() {
    setTimeout(function () {

        var comment_CONTACT_NAME = localStorage.getItem('CONTACT_NAME')
        var d = new Date();
        var comment_Entry_Date = d.toLocaleString().replace(',', '');

        //var comment_Entry_Date = formatDate(new Date());
        var start;
        var end;
        var table = "";

        var smsfields = sms_multi.split(',');
        end = smsfields.length;
        start = 0;


        if ($('#chkManualPhoneNo').is(':checked')) {
            ht = {};
            ht["Comment"] = $("#txtLoadComment").val();

            ht["Email_Person_ID"] = "";
            ht["Email_ID"] = "";

            ht["Email_ID_Text"] = "";
            if ($('#chkManualEmailID').is(':checked')) {
                ht["Is_Email_Text"] = "1";
            }
            else {
                ht["Is_Email_Text"] = "0";
            }

            ht["Email_ID_Type"] = "";



            ht["Phone_Person_ID"] = "";
            ht["Phone_No"] = "";

            ht["Phone_No_Text"] = $("#txtManualPhoneNo").val()
            if ($('#chkManualPhoneNo').is(':checked')) {
                ht["Is_Phone_Text"] = "1";
            }
            else {
                ht["Is_Phone_Text"] = "0";
            }

            ht["Phone_ID_Type"] = "";


            if (ht["Phone_No_Text"] != "") {
                table = table + "<tr><td>" + ht["Comment"] +

                                "</td><td style = 'display:none'>" +
                "</td><td style = 'display:none'>" +
                "</td><td style = 'display:none'>" +
                "</td><td style = 'display:none'>" +
                "</td><td style = 'display:none'>" +

                "</td><td style = 'display:none'>" + ht["Phone_Person_ID"] +
                "</td><td style = 'display:none'>" + ht["Phone_No"] +
                "</td><td style = 'display:none'>" + ht["Phone_No_Text"] +
                "</td><td style = 'display:none'>" + ht["Is_Phone_Text"] +
                "</td><td style = 'display:none'>" + ht["Phone_ID_Type"] +

                "</td><td>" + comment_CONTACT_NAME +
                "</td><td>" + comment_Entry_Date +
                "</td><td style = 'display:none'>sms" +
                 "</td><td style = 'display:none'>L" +

                    "</td><td>SMS" +
                  "</td><td>" + ht["Phone_No_Text"] +
                "</td></tr>"

            }
        }
        else {

            while (start < end) {

                var smsfields_seperate = smsfields[start].split('|@|');

                ht = {};
                ht["Comment"] = $("#txtLoadComment").val();

                ht["Email_Person_ID"] = "";
                ht["Email_ID"] = "";

                ht["Email_ID_Text"] = "";
                if ($('#chkManualEmailID').is(':checked')) {
                    ht["Is_Email_Text"] = "1";
                }
                else {
                    ht["Is_Email_Text"] = "0";
                }

                ht["Email_ID_Type"] = "";



                ht["Phone_Person_ID"] = smsfields_seperate[0];
                ht["Phone_No"] = smsfields_seperate[1];

                ht["Phone_No_Text"] = $("#txtManualPhoneNo").val()
                if ($('#chkManualPhoneNo').is(':checked')) {
                    ht["Is_Phone_Text"] = "1";
                }
                else {
                    ht["Is_Phone_Text"] = "0";
                }

                ht["Phone_ID_Type"] = smsfields_seperate[2];


                if (smsfields_seperate[0] != "") {
                    table = table + "<tr><td>" + ht["Comment"] +

                                    "</td><td style = 'display:none'>" +
                    "</td><td style = 'display:none'>" +
                    "</td><td style = 'display:none'>" +
                    "</td><td style = 'display:none'>" +
                    "</td><td style = 'display:none'>" +

                    "</td><td style = 'display:none'>" + ht["Phone_Person_ID"] +
                    "</td><td style = 'display:none'>" + ht["Phone_No"] +
                    "</td><td style = 'display:none'>" + ht["Phone_No_Text"] +
                    "</td><td style = 'display:none'>" + ht["Is_Phone_Text"] +
                    "</td><td style = 'display:none'>" + ht["Phone_ID_Type"] +

                    "</td><td>" + comment_CONTACT_NAME +
                    "</td><td>" + comment_Entry_Date +
                    "</td><td style = 'display:none'>sms" +
                     "</td><td style = 'display:none'>L" +

                            "</td><td>SMS" +
                  "</td><td>" + ht["Phone_No"] +

                    "</td></tr>"

                }

                start = start + 1;

            }
        }

        $("#CommentListDiv tbody tr .dataTables_empty").parents('tr').remove()
        $("#CommentListDiv tbody").append(table);

        $("#txtLoadComment").val("");

        $("#cmbSendCommentEmail").val("").trigger('change');
        $("#txtManualEmail").val("");
        $("#chkManualEmailID").iCheck('uncheck');

        $("#cmbSendCommentSMS").val("").trigger('change');
        $("#txtManualPhoneNo").val("");
        $("#chkManualPhoneNo").iCheck('uncheck');



    }, 2000);


}
function UploadDocument() {

    LoadDocImage = "";

    var comment_CONTACT_NAME = localStorage.getItem('CONTACT_NAME')
    var d = new Date();
    var comment_Entry_Date = d.toLocaleString().replace(',', '');

    //var comment_Entry_Date = formatDate(new Date());

    if ($('#f_Uploadfile')[0].files[0] != undefined) {
        sendFile();
    }

    setTimeout(function () {
        ht = {};

        ht["DocText"] = $("#txtDocument").val();
        ht["DocUpload"] = LoadDocImage;

        var table = "";

        table = table + "<tr><td>" + ht["DocText"] +
                        "</td><td><a href=" + ht["DocUpload"] + " target='_blank'>Download</a> " +
        "</td><td>" + comment_CONTACT_NAME +
        "</td><td>" + comment_Entry_Date +
        "</td><td style = 'display:none'>" + ht["DocUpload"] +
         "</td><td style = 'display:none'>L" +
        "</tr>"

        $("#DocumentListDiv tbody tr .dataTables_empty").parents('tr').remove()
        $("#DocumentListDiv tbody").append(table);

        $("#txtDocument").val("");
        $('#f_Uploadfile')[0].files[0] = "";

    }, 2000);

}
function sendFile() {

    var formData = new FormData();
    formData.append('file', $('#f_Uploadfile')[0].files[0]);
    $.ajax({
        type: 'post',
        url: 'ImageUploadHandlerLoad.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                LoadDocImage = "LoadDocument/" + status;
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Error saving image");
        }
    });
}






function ConvertTonsToLbs(Tons) {
    var _totalLbs = 0;
    _totalLbs = Tons * 2000;
    return _totalLbs;
}

function ConvertInchesToFeets(Inches) {
    var _totalFeets = 0;
    _totalFeets = Inches / 12;
    return _totalFeets;
}
//function ConvertLbsToTons(lbs) {
//    var _totalTons = 0;
//    _totalTons = lbs * 0.0005;
//    return _totalTons;
//}function ConvertFeetsToInches(Feets) {
    var _totalInches = 0;
    _totalInches = Feets * 12;
    return _totalInches;
}
function CalculateTotalWeight() {
    var _total = 0;
    $('#tab_logic tbody tr').each(function () {
        var Weight_Value = $(this).find('.Weight').val();
        var Weight_Unit = $(this).find('.cmbWeight').val();
        if (!isNaN(Weight_Value) && Weight_Value.length != 0) {
            if (Weight_Value != null && Weight_Value != '' && Weight_Value != undefined) {
                if (Weight_Unit == '1') {
                    _total += parseFloat(Weight_Value);
                }
                else {
                    _total += ConvertTonsToLbs(Weight_Value);
                }
            }
            else {

                $(this).find('.Weight').val("0.00");

            }
        }
        else {

            $(this).find('.Weight').val("0.00");

        }
    });
    //return _total;
    $("#LblTotalWeight").html(_total.toFixed(2));//.toFixed(2));    calculationHauling();
}
function CMBCalculateTotalWeight() {
    var _total = 0;
    $('#tab_logic tbody tr').each(function () {
        var Weight_Value = $(this).find('.Weight').val();
        var Weight_Unit = $(this).find('.cmbWeight').val();
        if (!isNaN(Weight_Value) && Weight_Value.length != 0) {

            if (Weight_Value != null && Weight_Value != '' && Weight_Value != undefined) {
                if (Weight_Unit == '1') {
                    _total += parseFloat(Weight_Value);
                }
                else {
                    _total += ConvertTonsToLbs(Weight_Value);
                }
            }

        }

    });
    //return _total;
    $("#LblTotalWeight").html(_total.toFixed(2));//.toFixed(2));    calculationHauling();
}
function CalculateTotalLHT_L() {
    var _total = 0;
    var _Subtotal = 0;
    $('#tab_logic tbody tr').each(function () {
        var L_Value = $(this).find('.L').val();
        var H_Value = $(this).find('.H').val();
        var T_Value = $(this).find('.T').val();
        var LHT_Unit = $(this).find('.cmbLHT').val();
        if (!isNaN(L_Value) && L_Value.length != 0) {
            if (L_Value != null && L_Value != '' && L_Value != undefined) {
                if (LHT_Unit == '2') {
                    _total += ConvertInchesToFeets(L_Value * H_Value * T_Value);
                    _Subtotal = ConvertInchesToFeets(L_Value * H_Value * T_Value);
                }
                else {
                    _total += parseFloat(L_Value * H_Value * T_Value);
                    _Subtotal = parseFloat(L_Value * H_Value * T_Value);
                }
            }
            else {

                $(this).find('.L').val("0.00");

            }
        }
        else {

            $(this).find('.L').val("0.00");

        }
        $(this).find('.LblCubicfeet').html(_Subtotal.toFixed(2));
    });
    //return _total;

    $("#LblTotalLWH").html(_total.toFixed(2));//.toFixed(2));}function CalculateTotalLHT_H() {
    var _total = 0;
    var _Subtotal = 0;
    $('#tab_logic tbody tr').each(function () {
        var L_Value = $(this).find('.L').val();
        var H_Value = $(this).find('.H').val();
        var T_Value = $(this).find('.T').val();
        var LHT_Unit = $(this).find('.cmbLHT').val();
        if (!isNaN(H_Value) && H_Value.length != 0) {
            if (H_Value != null && H_Value != '' && H_Value != undefined) {
                if (LHT_Unit == '2') {
                    _total += ConvertInchesToFeets(L_Value * H_Value * T_Value);
                    _Subtotal = ConvertInchesToFeets(L_Value * H_Value * T_Value);
                }
                else {
                    _total += parseFloat(L_Value * H_Value * T_Value);
                    _Subtotal = parseFloat(L_Value * H_Value * T_Value);
                }
            }
            else {

                $(this).find('.H').val("0.00");

            }
        }
        else {

            $(this).find('.H').val("0.00");

        }
        $(this).find('.LblCubicfeet').html(_Subtotal.toFixed(2));
    });
    //return _total;

    $("#LblTotalLWH").html(_total.toFixed(2));//.toFixed(2));}function CalculateTotalLHT_T() {
    var _total = 0;
    var _Subtotal = 0;
    $('#tab_logic tbody tr').each(function () {
        var L_Value = $(this).find('.L').val();
        var H_Value = $(this).find('.H').val();
        var T_Value = $(this).find('.T').val();
        var LHT_Unit = $(this).find('.cmbLHT').val();
        if (!isNaN(T_Value) && T_Value.length != 0) {
            if (T_Value != null && T_Value != '' && T_Value != undefined) {
                if (LHT_Unit == '2') {
                    _total += ConvertInchesToFeets(L_Value * H_Value * T_Value);
                    _Subtotal = ConvertInchesToFeets(L_Value * H_Value * T_Value);
                }
                else {
                    _total += parseFloat(L_Value * H_Value * T_Value);
                    _Subtotal = parseFloat(L_Value * H_Value * T_Value);
                }
            }
            else {

                $(this).find('.T').val("0.00");

            }
        }
        else {

            $(this).find('.T').val("0.00");

        }
        $(this).find('.LblCubicfeet').html(_Subtotal.toFixed(2));
    });
    //return _total;

    $("#LblTotalLWH").html(_total.toFixed(2));//.toFixed(2));}function CMBCalculateTotalLHT() {
    var _total = 0;
    var _Subtotal = 0;
    $('#tab_logic tbody tr').each(function () {
        var L_Value = $(this).find('.L').val();
        var H_Value = $(this).find('.H').val();
        var T_Value = $(this).find('.T').val();
        var LHT_Unit = $(this).find('.cmbLHT').val();
        if (!isNaN(L_Value) && L_Value.length != 0 && !isNaN(H_Value) && H_Value.length != 0 && !isNaN(T_Value) && T_Value.length != 0) {

            if (L_Value != null && L_Value != '' && L_Value != undefined && H_Value != null && H_Value != '' && H_Value != undefined && T_Value != null && T_Value != '' && T_Value != undefined) {
                if (LHT_Unit == '2') {
                    _total += ConvertInchesToFeets(L_Value * H_Value * T_Value);
                    _Subtotal = ConvertInchesToFeets(L_Value * H_Value * T_Value);
                }
                else {
                    _total += parseFloat(L_Value * H_Value * T_Value);
                    _Subtotal = parseFloat(L_Value * H_Value * T_Value);
                }
            }

        }
        $(this).find('.LblCubicfeet').html(_Subtotal.toFixed(2));
    });
    //return _total;
    $("#LblTotalLWH").html(_total.toFixed(2));//.toFixed(2));}function CalculateTotalValue() {
    var _total = 0;
    $('#tab_logic tbody tr').each(function () {
        var DV_Value = $(this).find('.DV').val();
        if (!isNaN(DV_Value) && DV_Value.length != 0) {
            if (DV_Value != null && DV_Value != '' && DV_Value != undefined) {

                _total += parseFloat(DV_Value);

            }
            else {

                $(this).find('.DV').val("0.00");

            }
        }
        else {

            $(this).find('.DV').val("0.00");

        }
    });
    //return _total;
    $("#LblTotalValue").html(_total.toFixed(2));//.toFixed(2));}function ReturnZeroQty() {
    $('#tab_logic tbody tr').each(function () {
        var Qty_Value = $(this).find('.Qty').val();
        if (!isNaN(Qty_Value) && Qty_Value.length != 0) {
            if (Qty_Value != null && Qty_Value != '' && Qty_Value != undefined) {

            }
            else {

                $(this).find('.Qty').val("0");

            }
        }
        else {

            $(this).find('.Qty').val("0");

        }
    });
}function CancelLoad() {
    window.location = 'AllLoadList.aspx';
}

function calculationHauling() {

    var Hauling, Miles, TotalWeight;

    //$('#LblHauingCalculation').text('');

    //if ($('#txtHauingRate').val() != undefined && $('#txtHauingRate').val() != "") {
    //    Hauling = $('#txtHauingRate').val();
    //}
    //else {
    //    Hauling = 0;

    //}
    if ($('#txtTotalMiles').val() != undefined && $('#txtTotalMiles').val() != "") {
        Miles = $('#txtTotalMiles').val();
    }
    else {
        Miles = 0;

    }

    if ($('#LblTotalWeight').text() != undefined && $('#LblTotalWeight').text() != "") {
        TotalWeight = $('#LblTotalWeight').text();
    }
    else {
        TotalWeight = 0;

    }





    calculationHaulingFee(Miles, TotalWeight);
    calculationSurcharge(Miles);
    SubTotal();
    calculationDiscount();
    TotalTotal();

}

function calculationDiscount() {

    var Discount, subtotalamount;

    $('#LblDiscountCalculation').text('');

    if ($('#txtDiscount').val() != undefined && $('#txtDiscount').val() != "") {
        Discount = $('#txtDiscount').val();
    }
    else {
        Discount = 0;

    }

    if ($("#cmbDiscount :selected").val() == "1") {
        $('#LblDiscount').text('0');
    }

    if ($("#cmbDiscount :selected").val() == "2") {
        $('#LblDiscount').text(parseFloat(Discount).toFixed(2));
    }
    if ($("#cmbDiscount :selected").val() == "3") {

        subtotalamount = $('#LblSubTotal').text();

        $('#LblDiscountCalculation').text('( ' + Discount + ' % of ' + subtotalamount + ' ) =');
        $('#LblDiscount').text(parseFloat(Discount * subtotalamount * 0.01).toFixed(2));
    }
}

function SubTotal() {

    var subcal;

    var sum = 0;
    $('.Accessorialfeeslbl').each(function () {
        if ($(this).text() != undefined && $(this).text() != "") {
            sum += parseFloat($(this).text());  // Or this.innerHTML, this.innerText
        }
    });

    var LblHauingAmountsum = 0;
    $('.LblHauingAmount').each(function () {
        if ($(this).text() != undefined && $(this).text() != "") {
            LblHauingAmountsum += parseFloat($(this).text());  // Or this.innerHTML, this.innerText
        }
    });

    var LblFuelSurchargeAmountsum = 0;
    $('.LblFuelSurchargeAmount').each(function () {
        if ($(this).text() != undefined && $(this).text() != "") {
            LblFuelSurchargeAmountsum += parseFloat($(this).text());  // Or this.innerHTML, this.innerText
        }
    });

    subcal = LblHauingAmountsum + LblFuelSurchargeAmountsum + sum;
    $('#LblSubTotal').text(subcal.toFixed(2));

}

function TotalTotal() {

    var finalsub, finaldis, finaltotal;

    finalsub = $('#LblSubTotal').text();
    finaldis = $('#LblDiscount').text();

    finaltotal = parseFloat(finalsub) - parseFloat(finaldis);
    $('#LblTotalAmount').text(finaltotal.toFixed(2));

}

function Accessorial(e) {
    if ($(e).val() != "") {
        $(e).closest('div.form-group').find(".Accessorialfeeslbl").text($(e).val());
    }
    else {
        $(e).closest('div.form-group').find(".Accessorialfeeslbl").text("0");
    }

    calculationHauling();
}

$('#cmbSendCommentEmail').on('change', function () {
    emailid_multi = "";
    $('#cmbSendCommentEmail option:selected').each(function () {
        if ($(this).attr('emil_id') != "") {
            emailid_multi = $(this).val() + '|@|' + $(this).attr('emil_id') + '|@|' + $(this).attr('type') + ',' + emailid_multi;
        }
    });
});


$('#cmbSendCommentSMS').on('change', function () {
    sms_multi = "";
    $('#cmbSendCommentSMS option:selected').each(function () {
        if ($(this).attr('phone_number') != "") {
            sms_multi = $(this).val() + '|@|' + $(this).attr('phone_number') + '|@|' + $(this).attr('type') + ',' + sms_multi;
        }
    });
});
function validationcheck_Total_Load() {
    if ($('#txtLoadNumber').val() == "" || $('#txtLoadNumber').val() == null) {
        popupErrorMsg($("#txtLoadNumber"), "Load Number is Required.", 5);

        return false;
    }
    if ($('#cmbCustomerCarrierBroker').val() == "" || $('#cmbCustomerCarrierBroker').val() == null) {
        popupErrorMsg($("#cmbCustomerCarrierBroker"), "Select Option.", 5);

        return false;
    }
    if ($('#cmbContactname').val() == "" || $('#cmbContactname').val() == null) {
        popupErrorMsg($("#cmbContactname"), "Select Option.", 5);

        return false;
    }
    return true;
}




//**********************************



function calculationHaulingFee(Miles, TotalWeight) {

    var Hauling;

    $(".DivHauling_Fee").each(function () {

        $(this).find(".LblHauingCalculation").text('');
        $(this).find(".LblHauingAmount").text('');


        //cmbHaulingFee_var = $(this).find(".cmbHaulingFee").val();
        Hauling = $(this).find(".txtHauingFee").val();
        //LblHauingCalculation_var = $(this).find(".LblHauingCalculation").html();
        //LblHauingAmount_var = $(this).find(".LblHauingAmount").html();

        if ($(this).find(".cmbHaulingFee").val() == "1" || $(this).find(".cmbHaulingFee").val() == "5" || $(this).find(".cmbHaulingFee").val() == "6") {
            $(this).find(".LblHauingAmount").text(Hauling);
        }
        if ($(this).find(".cmbHaulingFee").val() == "2") {
            $(this).find(".LblHauingCalculation").text('x ' + Miles + ' =');
            $(this).find(".LblHauingAmount").text(Hauling * Miles);

        }
        if ($(this).find(".cmbHaulingFee").val() == "3") {
            var cmbHaulingFeetons;
            cmbHaulingFeetons = TotalWeight * 0.0005;

            $(this).find(".LblHauingCalculation").text('x ' + cmbHaulingFeetons + ' tons  =');
            $(this).find(".LblHauingAmount").text(Hauling * cmbHaulingFeetons);

        }
        if ($(this).find(".cmbHaulingFee").val() == "4") {
            var cmbHaulingFeetons;
            cmbHaulingFeetons = TotalWeight * 0.01;

            $(this).find(".LblHauingCalculation").text('x ' + cmbHaulingFeetons + ' =');
            $(this).find(".LblHauingAmount").text(Hauling * cmbHaulingFeetons);
        }


        if ($(this).find(".LblHauingAmount").html() == "" || $(this).find(".LblHauingAmount").html() == undefined) {
            $(this).find(".LblHauingAmount").text("0");

        }
        else {

            var LblHauingAmount_fx= $(this).find(".LblHauingAmount").html();
            $(this).find(".LblHauingAmount").text(parseFloat(LblHauingAmount_fx).toFixed(2));
        }


    });

}



function calculationSurcharge(MilesSur) {

    //var Surcharge, HauingAmount, MilesSur;

    //$('#LblFuelSurchargeCalculation').text('');

    //if ($('#txtFuelSurchargeRate').val() != undefined && $('#txtFuelSurchargeRate').val() != "") {
    //    Surcharge = $('#txtFuelSurchargeRate').val();
    //}
    //else {
    //    Surcharge = 0;

    //}
    //if ($('#txtTotalMiles').val() != undefined && $('#txtTotalMiles').val() != "") {
    //    MilesSur = $('#txtTotalMiles').val();
    //}
    //else {
    //    MilesSur = 0;

    //}

    var HauingAmount = 0;
    $('.LblHauingAmount').each(function () {
        if ($(this).text() != undefined && $(this).text() != "") {
            HauingAmount += parseFloat($(this).text());  // Or this.innerHTML, this.innerText
        }
    });


    var Surcharge;


    $(".DivFuel_Surcharge").each(function () {

        $(this).find(".LblFuelSurchargeCalculation").text('');
        $(this).find(".LblFuelSurchargeAmount").text('');


        //cmbFuelSurcharge_var = $(this).find(".cmbFuelSurcharge").val();
        Surcharge = $(this).find(".txtFuelSurcharge").val();
        //LblFuelSurchargeCalculation_var = $(this).find(".LblFuelSurchargeCalculation").html();
        //LblFuelSurchargeAmount_var = $(this).find(".LblFuelSurchargeAmount").html();

        if ($(this).find(".cmbFuelSurcharge").val() == "1") {
            $(this).find(".LblFuelSurchargeAmount").text(Surcharge);
        }

        if ($(this).find(".cmbFuelSurcharge").val() == "2") {

            $(this).find(".LblFuelSurchargeCalculation").text('x ' + HauingAmount + ' =');
            $(this).find(".LblFuelSurchargeAmount").text(Surcharge * HauingAmount * 0.01);

        }

        if ($(this).find(".cmbFuelSurcharge").val() == "3") {
            $(this).find(".LblFuelSurchargeCalculation").text('x ' + MilesSur + ' =');
            $(this).find(".LblFuelSurchargeAmount").text(Surcharge * MilesSur);
        }

        if ($(this).find(".LblFuelSurchargeAmount").html() == "" || $(this).find(".LblFuelSurchargeAmount").html() == undefined) {
            $(this).find(".LblFuelSurchargeAmount").text("0");

        } else {

            var LblFuelSurchargeAmount_fx = $(this).find(".LblFuelSurchargeAmount").html();
            $(this).find(".LblFuelSurchargeAmount").text(parseFloat(LblFuelSurchargeAmount_fx).toFixed(2));
        }

    });

}