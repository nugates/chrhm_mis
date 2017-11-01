var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";

$(document).ready(function () {
    countryload();
});

function countryload() {
    Req = 'Country';
    obj = "Country";
    url = "CreateDispatch.aspx/LoadDetails";
    ht = {};
    LoadAjaxLoadExtra(ht, obj, Req, url, '', '');

}
function stateload(cid, sid) {
    Req = 'State';
    obj = "State";
    url = "CreateDispatch.aspx/LoadDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#" + cid + " :selected").val();
    LoadAjaxLoadExtra(ht, obj, Req, url, cid, sid);

}


function LoadAjaxLoadExtra(ht, obj, Req, url, cid, sid) {
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
                    $('#' + sid).html('');
                    $('#' + sid).append($('<option></option>'));
                    $.each(State, function (index, item) {
                        $('#' + sid).append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }

            if (obj == "Country") {

                if (Result.d.Country != "" && Result.d.Country != undefined) {
                    var Country = jQuery.parseJSON(Result.d.Country);

                    $('#cmbCountry_Customer').html('');
                    $('#cmbCountry_Customer').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry_Customer').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });


                    $('#cmbCountry_Carrier').html('');
                    $('#cmbCountry_Carrier').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry_Carrier').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });


                    $('#cmbCountry_Broker').html('');
                    $('#cmbCountry_Broker').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry_Broker').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });


                    $('#cmbCountry_Shipper').html('');
                    $('#cmbCountry_Shipper').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry_Shipper').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });


                    $('#cmbCountry_Shipper_Address').html('');
                    $('#cmbCountry_Shipper_Address').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry_Shipper_Address').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });


                    $('#cmbCountry_Consignee').html('');
                    $('#cmbCountry_Consignee').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry_Consignee').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });


                    $('#cmbCountry_Consignee_Address').html('');
                    $('#cmbCountry_Consignee_Address').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry_Consignee_Address').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });

                    $('#cmbCountry').html('');
                    $('#cmbCountry').append($('<option></option>'));
                    $.each(Country, function (index, item) {
                        $('#cmbCountry').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.PeymenyType != "" && Result.d.PeymenyType != undefined) {
                    var PeymenyType = jQuery.parseJSON(Result.d.PeymenyType);
                    $('#cmbPaymentType').html('');
                    $('#cmbPaymentType').append($('<option></option>'));
                    $.each(PeymenyType, function (index, item) {
                        $('#cmbPaymentType').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.PercentageOf != "" && Result.d.PercentageOf != undefined) {
                    var PercentageOf = jQuery.parseJSON(Result.d.PercentageOf);
                    $('#cmbPayPercentOf').html('');
                    $('#cmbPayPercentOf').append($('<option></option>'));
                    $.each(PercentageOf, function (index, item) {
                        $('#cmbPayPercentOf').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.MAKE != "" && Result.d.MAKE != undefined) {
                    var MAKE = jQuery.parseJSON(Result.d.MAKE);
                    $('#cmbMake').html('');
                    $('#cmbMake').append($('<option></option>'));
                    $.each(MAKE, function (index, item) {
                        $('#cmbMake').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });

                    $('#cmbMake_Trailer').html('');
                    $('#cmbMake_Trailer').append($('<option></option>'));
                    $.each(MAKE, function (index, item) {
                        $('#cmbMake_Trailer').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });

                }


                if (Result.d.ModelYear != "" && Result.d.ModelYear != undefined) {
                    var ModelYear = jQuery.parseJSON(Result.d.ModelYear);
                    $('#cmbModelYear').html('');
                    $('#cmbModelYear').append($('<option></option>'));
                    $.each(ModelYear, function (index, item) {
                        $('#cmbModelYear').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.NotInServiceReason != "" && Result.d.NotInServiceReason != undefined) {
                    var NotInServiceReason = jQuery.parseJSON(Result.d.NotInServiceReason);
                    $('#cmbNotInService').html('');
                    $('#cmbNotInService').append($('<option></option>'));
                    $.each(NotInServiceReason, function (index, item) {
                        $('#cmbNotInService').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }


                if (Result.d.FuelType != "" && Result.d.FuelType != undefined) {
                    var FuelType = jQuery.parseJSON(Result.d.FuelType);
                    $('#cmbFuelType').html('');
                    $('#cmbFuelType').append($('<option></option>'));
                    $.each(FuelType, function (index, item) {
                        $('#cmbFuelType').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.GVW != "" && Result.d.GVW != undefined) {
                    var GVW = jQuery.parseJSON(Result.d.GVW);
                    $('#cmbGVW').html('');
                    $('#cmbGVW').append($('<option></option>'));
                    $.each(GVW, function (index, item) {
                        $('#cmbGVW').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.TrailerGroup_Popup != "" && Result.d.TrailerGroup_Popup != undefined) {
                    var TrailerGroup_Popup = jQuery.parseJSON(Result.d.TrailerGroup_Popup);
                    $('#cmbTrailerGroup_Trailer').html('');
                    $('#cmbTrailerGroup_Trailer').append($('<option></option>'));
                    $.each(TrailerGroup_Popup, function (index, item) {
                        $('#cmbTrailerGroup_Trailer').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.TrailerType_popup != "" && Result.d.TrailerType_popup != undefined) {
                    var TrailerType_popup = jQuery.parseJSON(Result.d.TrailerType_popup);
                    $('#cmbTrailerType_Trailer').html('');
                    $('#cmbTrailerType_Trailer').append($('<option></option>'));
                    $.each(TrailerType_popup, function (index, item) {
                        $('#cmbTrailerType_Trailer').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

            }
            if (obj == "Model") {
                if (Result.d.Model != "" && Result.d.Model != undefined) {
                    var Model = jQuery.parseJSON(Result.d.Model);
                    $('#' + sid).html('');
                    $('#' + sid).append($('<option></option>'));
                    $.each(Model, function (index, item) {
                        $('#' + sid).append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }

            $('body').pleaseWait('stop');
        }
    });
}


function LoadAjaxLoadExtraSave(ht, obj, Req, url) {
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

            if (obj == "CustomerSave") {
                if (Result.d.CustomerSave != "" && Result.d.CustomerSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.CustomerSave)[0];

                    if (json.CustomErrorState == "0") {


                        $("#btnCancel5_Cancel_Customer").click();
                        $("#cmbCustomerCarrierBroker option[value='" + json.ID + "']").remove();
                        $('#cmbCustomerCarrierBroker').append($('<option></option>').val(json.ID).html($("#txtCompanyName_Customer").val()));
                        $('#cmbCustomerCarrierBroker').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "CustomerContactSave") {
                if (Result.d.CustomerContactSave != "" && Result.d.CustomerContactSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.CustomerContactSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Customer_Contact").click();

                        $("#cmbContactname option[value='" + json.ID + "']").remove();
                        $('#cmbContactname').append($('<option></option>').val(json.ID).html($("#txtContactName_Customer_Contact").val()));
                        $('#cmbContactname').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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






            if (obj == "CarrierSave") {
                if (Result.d.CarrierSave != "" && Result.d.CarrierSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.CarrierSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Carrier").click();

                        $("#cmbCustomerCarrierBroker option[value='" + json.ID + "']").remove();
                        $('#cmbCustomerCarrierBroker').append($('<option></option>').val(json.ID).html($("#txtCompanyName_Carrier").val()));
                        $('#cmbCustomerCarrierBroker').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "CarrierContactSave") {
                if (Result.d.CarrierContactSave != "" && Result.d.CarrierContactSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.CarrierContactSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Carrier_Contact").click();

                        $("#cmbContactname option[value='" + json.ID + "']").remove();
                        $('#cmbContactname').append($('<option></option>').val(json.ID).html($("#txtContactName_Carrier_Contact").val()));
                        $('#cmbContactname').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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




            if (obj == "BrokerSave") {

                if (Result.d.BrokerSave != "" && Result.d.BrokerSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.BrokerSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Broker").click();

                        $("#cmbCustomerCarrierBroker option[value='" + json.ID + "']").remove();
                        $('#cmbCustomerCarrierBroker').append($('<option></option>').val(json.ID).html($("#txtCompanyName_Broker").val()));
                        $('#cmbCustomerCarrierBroker').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "BrokerContactSave") {
                if (Result.d.BrokerContactSave != "" && Result.d.BrokerContactSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.BrokerContactSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Broker_Contact").click();

                        $("#cmbContactname option[value='" + json.ID + "']").remove();
                        $('#cmbContactname').append($('<option></option>').val(json.ID).html($("#txtContactName_Broker_Contact").val()));
                        $('#cmbContactname').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "ShipperSave") {
                if (Result.d.ShipperSave != "" && Result.d.ShipperSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.ShipperSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Shipper").click();
                        $("#cmbShipper option[value='" + json.ID + "']").remove();
                        $('#cmbShipper').append($('<option></option>').val(json.ID).html($("#txtCompanyName_Shipper").val()));
                        $('#cmbShipper').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "ShipperAddressSave") {
                if (Result.d.ShipperAddressSave != "" && Result.d.ShipperAddressSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.ShipperAddressSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Shipper_Address").click();

                        $("#cmbShipperLocation option[value='" + json.ID + "']").remove();
                        $('#cmbShipperLocation').append($('<option></option>').val(json.ID).html($("#txtSaveLocationAs_Shipper_Address").val()));
                        $('#cmbShipperLocation').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "ConsigneeSave") {
                if (Result.d.ConsigneeSave != "" && Result.d.ConsigneeSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.ConsigneeSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Consignee").click();
                        $("#cmbConsignee option[value='" + json.ID + "']").remove();
                        $('#cmbConsignee').append($('<option></option>').val(json.ID).html($("#txtCompanyName_Consignee").val()));
                        $('#cmbConsignee').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "ConsigneeAddressSave") {
                if (Result.d.ConsigneeAddressSave != "" && Result.d.ConsigneeAddressSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.ConsigneeAddressSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancel5_Cancel_Consignee_Address").click();

                        $("#cmbConsigneeLocation option[value='" + json.ID + "']").remove();
                        $('#cmbConsigneeLocation').append($('<option></option>').val(json.ID).html($("#txtSaveLocationAs_Consignee_Address").val()));
                        $('#cmbConsigneeLocation').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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


            if (obj == "DriverPopupSave") {
                if (Result.d.DriverPopupSave != "" && Result.d.DriverPopupSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.DriverPopupSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancelPopupDriver").click();
                        $("#cmbDriver option[value='" + json.ID + "']").remove();
                        $('#cmbDriver').append($('<option></option>').val(json.ID).html($("#txtDriverName").val()));
                        $('#cmbDriver').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "Fill_Driver") {
                if (Result.d.Fill_Driver != "" && Result.d.Fill_Driver != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Driver);

                    $.each(json, function (index, item) {
                        if (item.DDB_IsEmpORCont == "1") {

                            $("#radioEmployee").iCheck('check');
                        }
                        else {
                            $("#radioContractor").iCheck('check');
                        }

                        $("#txtCompName").val(item.DDB_Company_Name);
                        $("#txtDriverName").val(item.DDB_Driver_Name);
                        if (item.DDB_Owner_Operator == "True") {

                            $("#chkOwnerOperator").iCheck('check');
                        }
                        else {
                            $("#chkOwnerOperator").iCheck('uncheck');
                        }
                        $("#txtWorkEmail").val(item.DDB_Work_Email);
                        if (item.DDB_Display_Status == "True") {

                            $("#radioActive").iCheck('check');
                        }
                        else {
                            $("#radioInactive").iCheck('check');
                        }

                        $("#txtWorkPhone").val(item.DDB_Work_Phone);
                        $("#cmbPaymentType").val(item.DDPL_Default_Payment_Type).trigger('change');
                        $("#txtCDLNo").val(item.DDPL_CDL_No);
                        $("#txtLicenseExpires").val(item.DDPL_License_Expires);
                        $("#txtContractStartDate").val(item.DDPL_Contract_Start_Date);
                        $("#txtContractEndDate").val(item.DDPL_Contract_End_Date);
                        $("#cmbCountry").val(item.DDPL_Issued_Country).trigger('change');

                        setTimeout(function () {
                            $("#txtLoadedMile").val(item.DDPL_Loaded_Miles);
                            $("#txtEmptyMile").val(item.DDPL_Empty_Miles);
                            $("#txtLoadPayPercent").val(item.DDPL_Load_Pay_Percent);
                            $("#cmbPayPercentOf").val(item.DDPL_Percent_Of).trigger('change');
                            $("#txtrate").val(item.DDPL_Rate);
                        }, 2000);

                        setTimeout(function () {
                            $("#cmbState").val(item.DDPL_Issued_State).trigger('change');
                        }, 2000);

                    });
                }
            }

            if (obj == "TruckPopupSave") {
                if (Result.d.TruckPopupSave != "" && Result.d.TruckPopupSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.TruckPopupSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancelPopupTruck").click();
                        $("#cmbTruck option[value='" + json.ID + "']").remove();
                        $('#cmbTruck').append($('<option></option>').val(json.ID).html($("#txtUnitNumber").val()));
                        $('#cmbTruck').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "Fill_Truck") {
                if (Result.d.Fill_Truck != "" && Result.d.Fill_Truck != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Truck);

                    $.each(json, function (index, item) {
                        $("#txtUnitNumber").val(item.TDB_Unit_Number);
                        $("#cmbMake").val(item.TDB_Make).trigger('change');
                        $("#cmbModelYear").val(item.TDB_Model_Year).trigger('change');
                        setTimeout(function () {
                            $("#cmbModel").val(item.TDB_Model).trigger('change');
                        }, 2000);

                        if (item.TDB_Include_Billing == "True") {

                            $("#chkBilling").iCheck('check');
                        }
                        else {
                            $("#chkBilling").iCheck('uncheck');
                        }

                        if (item.TDB_Include_IFTA == "True") {

                            $("#chkIftaReporting").iCheck('check');
                        }
                        else {
                            $("#chkIftaReporting").iCheck('uncheck');
                        }

                        if (item.TDB_Not_In_Service == "True") {

                            $("#chkService").iCheck('check');
                        }
                        else {
                            $("#chkService").iCheck('uncheck');
                        }

                        $("#cmbNotInService").val(item.TDB_Reason).trigger('change');
                        $("#txtOtherReason").val(item.TDB_Other_Reason);

                        $("#cmbFuelType").val(item.TDIH_Fuel_Type).trigger('change');
                        $("#cmbGVW").val(item.TDIH_GVW).trigger('change');

                        $("#txtLicensePlateNo").val(item.TDLI_License_Plate_No);
                        $("#txtLicenseExpDate").val(item.TDLI_License_Exp_Date);
                        $("#txtInsuranceExpiry").val(item.TDLI_Insurance_Exp_Date);
                        $("#txtPolicyNumber").val(item.TDLI_Policy_Number);

                    });
                }
            }

            if (obj == "TrailerPopupSave") {
                if (Result.d.TrailerPopupSave != "" && Result.d.TrailerPopupSave != undefined) {
                    var json = jQuery.parseJSON(Result.d.TrailerPopupSave)[0];

                    if (json.CustomErrorState == "0") {

                        $("#btnCancelPopupTrailer").click();
                        $("#cmbTrailer option[value='" + json.ID + "']").remove();
                        $('#cmbTrailer').append($('<option></option>').val(json.ID).html($("#txtUnitNumber_Trailer").val()));
                        $('#cmbTrailer').val(json.ID).trigger('change');

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
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

            if (obj == "Fill_Trailer") {
                if (Result.d.Fill_Trailer != "" && Result.d.Fill_Trailer != undefined) {
                    var json = jQuery.parseJSON(Result.d.Fill_Trailer);

                    $.each(json, function (index, item) {
                        $("#txtUnitNumber_Trailer").val(item.TDB_Unit_Number);
                        $("#cmbMake_Trailer").val(item.TDB_Make).trigger('change');
                        setTimeout(function () {
                            $("#cmbModel_Trailer").val(item.TDB_Model).trigger('change');
                        }, 2000);

                        if (item.TDB_Status == "True") {

                            $("#radioActive_Trailer").iCheck('check');
                            $("#radioInactive_Trailer").iCheck('uncheck');
                        }
                        else {
                            $("#radioInactive_Trailer").iCheck('check');
                            $("#radioActive_Trailer").iCheck('uncheck');
                        }
                        $("#txtUnladenWeight").val(item.TDV_Unladen_Weight);
                        $("#cmbTrailerGroup_Trailer").val(item.TDV_Trailer_Group).trigger('change');
                        $("#cmbTrailerType_Trailer").val(item.TDV_Trailer_Type).trigger('change');

                        $("#txtLicensePlateNo_Trailer").val(item.TDLI_License_Plate_No);
                        $("#txtLicenseExpDate_Trailer").val(item.TDLI_License_Exp_Date);
                        $("#txtInsuranceExpiry_Trailer").val(item.TDLI_Insurance_Exp_Date);
                        $("#txtPolicyNumber_Trailer").val(item.TDLI_Policy_Number);

                    });
                }
            }


            $('body').pleaseWait('stop');
        }
    });
}

function CustomerSave() {
    if (validationcheck_Customer() == true) {
        setTimeout(function () {

            ht = {};
            ht["Company_Name"] = $("#txtCompanyName_Customer").val();
            ht["Account_Number"] = $("#txtAcNo_Customer").val();
            ht["Country"] = $("#cmbCountry_Customer :selected").val();
            ht["State"] = $("#cmbState_Customer :selected").val();
            ht["City"] = $("#txtCity_Customer").val();
            ht["Zip_Code"] = $("#txtZipCode_Customer").val();
            ht["Address1"] = $("#txtAddress1_Customer").val();
            ht["Address2"] = $("#txtAddress2_Customer").val();
            ht["Accnt_Payable_Email"] = $("#txtaccntPayableEmail_Customer").val();

            ht["ContactName"] = $("#txtContactName_Customer").val();
            ht["Designation"] = $("#txtDesignation_Customer").val();
            ht["ContactEmail"] = $("#txtContactEmail_Customer").val();
            ht["ContactPhoneNo"] = $("#txtContactPhoneNo_Customer").val();
            ht["ContactFax"] = $("#txtContactFax_Customer").val();
            if ($("#btnsave5_Save_Customer").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Customer").text() == "Update") {
                ht["ID"] = $("#cmbCustomerCarrierBroker").val();
                ht["MODE"] = "UPDATE";
            }
            Req = 'CustomerSave';
            obj = "CustomerSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);

        }, 1000);

    }
}

function CustomerContactSave() {
    if (validationcheck_Customer_Contact() == true) {
        setTimeout(function () {

            ht = {};

            ht["Basic_Table_ID"] = $("#cmbCustomerCarrierBroker :selected").val();

            ht["ContactName"] = $("#txtContactName_Customer_Contact").val();
            ht["Designation"] = $("#txtDesignation_Customer_Contact").val();
            ht["ContactEmail"] = $("#txtContactEmail_Customer_Contact").val();
            ht["ContactPhoneNo"] = $("#txtContactPhoneNo_Customer_Contact").val();
            ht["ContactFax"] = $("#txtContactFax_Customer_Contact").val();

            if ($("#btnsave5_Save_Customer_Contact").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Customer_Contact").text() == "Update") {
                ht["ID"] = $("#cmbContactname").val();
                ht["MODE"] = "UPDATE";
            }

            Req = 'CustomerContactSave';
            obj = "CustomerContactSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);

        }, 1000);

    }
}
function CarrierSave() {
    if (validationcheck_Carrier() == true) {
        setTimeout(function () {
            ht = {};

            ht["Company_Name"] = $("#txtCompanyName_Carrier").val();
            ht["Account_Number"] = $("#txtAcNo_Carrier").val();
            ht["Country"] = $("#cmbCountry_Carrier :selected").val();
            ht["State"] = $("#cmbState_Carrier :selected").val();
            ht["City"] = $("#txtCity_Carrier").val();
            ht["Zip_Code"] = $("#txtZipCode_Carrier").val();
            ht["Address1"] = $("#txtAddress1_Carrier").val();
            ht["Address2"] = $("#txtAddress2_Carrier").val();
            ht["Accnt_Payable_Email"] = $("#txtaccntPayableEmail_Carrier").val();

            ht["ContactName"] = $("#txtContactName_Carrier").val();
            ht["Designation"] = $("#txtDesignation_Carrier").val();
            ht["ContactEmail"] = $("#txtContactEmail_Carrier").val();
            ht["ContactPhoneNo"] = $("#txtContactPhoneNo_Carrier").val();
            ht["ContactFax"] = $("#txtContactFax_Carrier").val();

            if ($("#btnsave5_Save_Carrier").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Carrier").text() == "Update") {
                ht["ID"] = $("#cmbCustomerCarrierBroker").val();
                ht["MODE"] = "UPDATE";
            }

            Req = 'CarrierSave';
            obj = "CarrierSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);


        }, 1000);

    }
}
function CarrierContactSave() {
    if (validationcheck_Carrier_Contact() == true) {
        setTimeout(function () {
            ht = {};
            ht["Basic_Table_ID"] = $("#cmbCustomerCarrierBroker :selected").val();

            ht["ContactName"] = $("#txtContactName_Carrier_Contact").val();
            ht["Designation"] = $("#txtDesignation_Carrier_Contact").val();
            ht["ContactEmail"] = $("#txtContactEmail_Carrier_Contact").val();
            ht["ContactPhoneNo"] = $("#txtContactPhoneNo_Carrier_Contact").val();
            ht["ContactFax"] = $("#txtContactFax_Carrier_Contact").val();


            if ($("#btnsave5_Save_Carrier_Contact").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Carrier_Contact").text() == "Update") {
                ht["ID"] = $("#cmbContactname").val();
                ht["MODE"] = "UPDATE";
            }

            Req = 'CarrierContactSave';
            obj = "CarrierContactSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);


        }, 1000);


    }
}



function BrokerSave() {
    if (validationcheck_Broker() == true) {
        setTimeout(function () {
            ht = {};
            ht["Company_Name"] = $("#txtCompanyName_Broker").val();
            ht["Account_Number"] = $("#txtAcNo_Broker").val();
            ht["Country"] = $("#cmbCountry_Broker :selected").val();
            ht["State"] = $("#cmbState_Broker :selected").val();
            ht["City"] = $("#txtCity_Broker").val();
            ht["Zip_Code"] = $("#txtZipCode_Broker").val();
            ht["Address1"] = $("#txtAddress1_Broker").val();
            ht["Address2"] = $("#txtAddress2_Broker").val();
            ht["Accnt_Payable_Email"] = $("#txtaccntPayableEmail_Broker").val();

            ht["ContactName"] = $("#txtContactName_Broker").val();
            ht["Designation"] = $("#txtDesignation_Broker").val();
            ht["ContactEmail"] = $("#txtContactEmail_Broker").val();
            ht["ContactPhoneNo"] = $("#txtContactPhoneNo_Broker").val();
            ht["ContactFax"] = $("#txtContactFax_Broker").val();

            if ($("#btnsave5_Save_Broker").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Broker").text() == "Update") {
                ht["ID"] = $("#cmbCustomerCarrierBroker").val();
                ht["MODE"] = "UPDATE";
            }


            Req = 'BrokerSave';
            obj = "BrokerSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);

        }, 1000);

    }
}


function BrokerContactSave() {
    if (validationcheck_Broker_Contact() == true) {
        setTimeout(function () {
            ht = {};
            ht["Basic_Table_ID"] = $("#cmbCustomerCarrierBroker :selected").val();

            ht["ContactName"] = $("#txtContactName_Broker_Contact").val();
            ht["Designation"] = $("#txtDesignation_Broker_Contact").val();
            ht["ContactEmail"] = $("#txtContactEmail_Broker_Contact").val();
            ht["ContactPhoneNo"] = $("#txtContactPhoneNo_Broker_Contact").val();
            ht["ContactFax"] = $("#txtContactFax_Broker_Contact").val();


            if ($("#btnsave5_Save_Broker_Contact").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Broker_Contact").text() == "Update") {
                ht["ID"] = $("#cmbContactname").val();
                ht["MODE"] = "UPDATE";
            }


            Req = 'BrokerContactSave';
            obj = "BrokerContactSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);

        }, 1000);

    }
}


function ShipperSave() {
    if (validationcheck_Shipper() == true) {
        setTimeout(function () {
            ht = {};

            ht["Company_Name"] = $("#txtCompanyName_Shipper").val();
            ht["EIN"] = $("#txtEIN_Shipper").val();
            ht["Contact_Name"] = $("#txtContactName_Shipper").val();
            ht["Email"] = $("#txtEmail_Shipper").val();
            ht["DBA_Name"] = $("#txtDBAName_Shipper").val();
            ht["Account_Number"] = $("#txtAcNo_Shipper").val();
            ht["Phone"] = $("#txtPhoneNumber_Shipper").val();


            ht["Country"] = $("#cmbCountry_Shipper :selected").val();
            ht["State"] = $("#cmbState_Shipper :selected").val();
            ht["Address1"] = $("#txtAddress1_Shipper").val();
            ht["Save_Location_As"] = $("#txtSaveLocationAs_Shipper").val();
            ht["Address_Contact_Name"] = $("#txtCntactName_Shipper").val();
            ht["City"] = $("#txtCity_Shipper").val();
            ht["Zip_Code"] = $("#txtZipCode_Shipper").val();
            ht["Address2"] = $("#txtAddress2_Shipper").val();
            ht["Instructions"] = $("#txtInstructions_Shipper").val();
            ht["ContactPhoneNo"] = $("#txtAddressPhoneNumber_Shipper").val();


            if ($("#btnsave5_Save_Shipper").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Shipper").text() == "Update") {
                ht["ID"] = $("#cmbShipper").val();
                ht["MODE"] = "UPDATE";
            }


            Req = 'ShipperSave';
            obj = "ShipperSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);


        }, 1000);
    }
}


function ShipperAddressSave() {
    if (validationcheck_Shipper_Address() == true) {
        setTimeout(function () {
            ht = {};
            ht["Basic_Table_ID"] = $("#cmbShipper :selected").val();

            ht["Country"] = $("#cmbCountry_Shipper_Address :selected").val();
            ht["State"] = $("#cmbState_Shipper_Address :selected").val();
            ht["Address1"] = $("#txtAddress1_Shipper_Address").val();
            ht["Save_Location_As"] = $("#txtSaveLocationAs_Shipper_Address").val();
            ht["Address_Contact_Name"] = $("#txtCntactName_Shipper_Address").val();
            ht["City"] = $("#txtCity_Shipper_Address").val();
            ht["Zip_Code"] = $("#txtZipCode_Shipper_Address").val();
            ht["Address2"] = $("#txtAddress2_Shipper_Address").val();
            ht["Instructions"] = $("#txtInstructions_Shipper_Address").val();
            ht["ContactPhoneNo"] = $("#txtAddressPhoneNumber_Shipper_Address").val();


            if ($("#btnsave5_Save_Shipper_Address").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Shipper_Address").text() == "Update") {
                ht["ID"] = $("#cmbShipperLocation").val();
                ht["MODE"] = "UPDATE";
            }


            Req = 'ShipperAddressSave';
            obj = "ShipperAddressSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);


        }, 1000);

    }
}

function ConsigneeSave() {
    if (validationcheck_Consignee() == true) {
        setTimeout(function () {
            ht = {};
            ht["Company_Name"] = $("#txtCompanyName_Consignee").val();
            ht["EIN"] = $("#txtEIN_Consignee").val();
            ht["Contact_Name"] = $("#txtContactName_Consignee").val();
            ht["Email"] = $("#txtEmail_Consignee").val();
            ht["DBA_Name"] = $("#txtDBAName_Consignee").val();
            ht["Account_Number"] = $("#txtAcNo_Consignee").val();
            ht["Phone"] = $("#txtPhoneNumber_Consignee").val();

            ht["Country"] = $("#cmbCountry_Consignee :selected").val();
            ht["State"] = $("#cmbState_Consignee :selected").val();
            ht["Address1"] = $("#txtAddress1_Consignee").val();
            ht["Save_Location_As"] = $("#txtSaveLocationAs_Consignee").val();
            ht["Address_Contact_Name"] = $("#txtCntactName_Consignee").val();
            ht["City"] = $("#txtCity_Consignee").val();
            ht["Zip_Code"] = $("#txtZipCode_Consignee").val();
            ht["Address2"] = $("#txtAddress2_Consignee").val();
            ht["Instructions"] = $("#txtInstructions_Consignee").val();
            ht["ContactPhoneNo"] = $("#txtAddressPhoneNumber_Consignee").val();


            if ($("#btnsave5_Save_Consignee").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Consignee").text() == "Update") {
                ht["ID"] = $("#cmbConsignee").val();
                ht["MODE"] = "UPDATE";
            }


            Req = 'ConsigneeSave';
            obj = "ConsigneeSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);


        }, 1000);

    }
}

function ConsigneeAddressSave() {
    if (validationcheck_Consignee_Address() == true) {
        setTimeout(function () {
            ht = {};
            ht["Basic_Table_ID"] = $("#cmbConsignee :selected").val();

            ht["Country"] = $("#cmbCountry_Consignee_Address :selected").val();
            ht["State"] = $("#cmbState_Consignee_Address :selected").val();
            ht["Address1"] = $("#txtAddress1_Consignee_Address").val();
            ht["Save_Location_As"] = $("#txtSaveLocationAs_Consignee_Address").val();
            ht["Address_Contact_Name"] = $("#txtCntactName_Consignee_Address").val();
            ht["City"] = $("#txtCity_Consignee_Address").val();
            ht["Zip_Code"] = $("#txtZipCode_Consignee_Address").val();
            ht["Address2"] = $("#txtAddress2_Consignee_Address").val();
            ht["Instructions"] = $("#txtInstructions_Consignee_Address").val();
            ht["ContactPhoneNo"] = $("#txtAddressPhoneNumber_Consignee_Address").val();


            if ($("#btnsave5_Save_Consignee_Address").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsave5_Save_Consignee_Address").text() == "Update") {
                ht["ID"] = $("#cmbConsigneeLocation").val();
                ht["MODE"] = "UPDATE";
            }


            Req = 'ConsigneeAddressSave';
            obj = "ConsigneeAddressSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);


        }, 1000);

    }
}


////////////////////Popup validations////////////////////////////////////

function validationcheck_Customer() {
    if ($('#txtCompanyName_Customer').val() == "" || $('#txtCompanyName_Customer').val() == null) {
        popupErrorMsg($("#txtCompanyName_Customer"), "Company Name is Required.", 5);

        return false;
    }
    if ($('#cmbCountry_Customer').val() == "" || $('#cmbCountry_Customer').val() == null) {
        popupErrorMsg($("#cmbCountry_Customer"), "Country is Required.", 5);

        return false;
    }
    if ($('#cmbState_Customer').val() == "" || $('#cmbState_Customer').val() == null) {
        popupErrorMsg($("#cmbState_Customer"), "State is Required.", 5);

        return false;
    }
    if ($('#txtCity_Customer').val() == "" || $('#txtCity_Customer').val() == null) {
        popupErrorMsg($("#txtCity_Customer"), "City is Required.", 5);

        return false;
    }
    if ($('#txtAddress1_Customer').val() == "" || $('#txtAddress1_Customer').val() == null) {
        popupErrorMsg($("#txtAddress1_Customer"), "Address is Required.", 5);

        return false;
    }

    return true;
}

function validationcheck_Customer_Contact() {
    if ($('#txtContactName_Customer_Contact').val() == "" || $('#txtContactName_Customer_Contact').val() == null) {
        popupErrorMsg($("#txtContactName_Customer_Contact"), "Contact Name is Required.", 5);

        return false;
    }
    return true;
}

function validationcheck_Carrier() {
    if ($('#txtCompanyName_Carrier').val() == "" || $('#txtCompanyName_Carrier').val() == null) {
        popupErrorMsg($("#txtCompanyName_Carrier"), "Company Name is Required.", 5);

        return false;
    }
    if ($('#cmbCountry_Carrier').val() == "" || $('#cmbCountry_Carrier').val() == null) {
        popupErrorMsg($("#cmbCountry_Carrier"), "Country is Required.", 5);

        return false;
    }
    if ($('#cmbState_Carrier').val() == "" || $('#cmbState_Carrier').val() == null) {
        popupErrorMsg($("#cmbState_Carrier"), "State is Required.", 5);

        return false;
    }
    if ($('#txtCity_Carrier').val() == "" || $('#txtCity_Carrier').val() == null) {
        popupErrorMsg($("#txtCity_Carrier"), "City is Required.", 5);

        return false;
    }
    if ($('#txtAddress1_Carrier').val() == "" || $('#txtAddress1_Carrier').val() == null) {
        popupErrorMsg($("#txtAddress1_Carrier"), "Address is Required.", 5);

        return false;
    }

    return true;
}

function validationcheck_Carrier_Contact() {
    if ($('#txtContactName_Carrier_Contact').val() == "" || $('#txtContactName_Carrier_Contact').val() == null) {
        popupErrorMsg($("#txtContactName_Carrier_Contact"), "Contact Name is Required.", 5);

        return false;
    }
    return true;
}
function validationcheck_Broker() {
    if ($('#txtCompanyName_Broker').val() == "" || $('#txtCompanyName_Broker').val() == null) {
        popupErrorMsg($("#txtCompanyName_Broker"), "Company Name is Required.", 5);

        return false;
    }
    if ($('#cmbCountry_Broker').val() == "" || $('#cmbCountry_Broker').val() == null) {
        popupErrorMsg($("#cmbCountry_Broker"), "Country is Required.", 5);

        return false;
    }
    if ($('#cmbState_Broker').val() == "" || $('#cmbState_Broker').val() == null) {
        popupErrorMsg($("#cmbState_Broker"), "State is Required.", 5);

        return false;
    }
    if ($('#txtCity_Broker').val() == "" || $('#txtCity_Broker').val() == null) {
        popupErrorMsg($("#txtCity_Broker"), "City is Required.", 5);

        return false;
    }
    if ($('#txtAddress1_Broker').val() == "" || $('#txtAddress1_Broker').val() == null) {
        popupErrorMsg($("#txtAddress1_Broker"), "Address is Required.", 5);

        return false;
    }

    return true;
}

function validationcheck_Broker_Contact() {
    if ($('#txtContactName_Broker_Contact').val() == "" || $('#txtContactName_Broker_Contact').val() == null) {
        popupErrorMsg($("#txtContactName_Broker_Contact"), "Contact Name is Required.", 5);

        return false;
    }
    return true;
}

function validationcheck_Shipper() {
    if ($('#txtCompanyName_Shipper').val() == "" || $('#txtCompanyName_Shipper').val() == null) {
        popupErrorMsg($("#txtCompanyName_Shipper"), "Company Name is Required.", 5);

        return false;
    }
    return true;
}

function validationcheck_Shipper_Address() {
    if ($('#cmbCountry_Shipper_Address').val() == "" || $('#cmbCountry_Shipper_Address').val() == null) {
        popupErrorMsg($("#cmbCountry_Shipper_Address"), "Country is Required.", 5);

        return false;
    }
    if ($('#cmbState_Shipper_Address').val() == "" || $('#cmbState_Shipper_Address').val() == null) {
        popupErrorMsg($("#cmbState_Shipper_Address"), "State is Required.", 5);

        return false;
    }
    if ($('#txtAddress1_Shipper_Address').val() == "" || $('#txtAddress1_Shipper_Address').val() == null) {
        popupErrorMsg($("#txtAddress1_Shipper_Address"), "Address is Required.", 5);

        return false;
    }
    if ($('#txtSaveLocationAs_Shipper_Address').val() == "" || $('#txtSaveLocationAs_Shipper_Address').val() == null) {
        popupErrorMsg($("#txtSaveLocationAs_Shipper_Address"), "Location Name  is Required.", 5);

        return false;
    }
    if ($('#txtCity_Shipper_Address').val() == "" || $('#txtCity_Shipper_Address').val() == null) {
        popupErrorMsg($("#txtCity_Shipper_Address"), "City is Required.", 5);

        return false;
    }
    if ($('#txtZipCode_Shipper_Address').val() == "" || $('#txtZipCode_Shipper_Address').val() == null) {
        popupErrorMsg($("#txtZipCode_Shipper_Address"), "Zip Code is Required.", 5);

        return false;
    }
    return true;
}

function validationcheck_Consignee() {
    if ($('#txtCompanyName_Consignee').val() == "" || $('#txtCompanyName_Consignee').val() == null) {
        popupErrorMsg($("#txtCompanyName_Consignee"), "Company Name is Required.", 5);

        return false;
    }
    return true;
}

function validationcheck_Consignee_Address() {
    if ($('#cmbCountry_Consignee_Address').val() == "" || $('#cmbCountry_Consignee_Address').val() == null) {
        popupErrorMsg($("#cmbCountry_Consignee_Address"), "Country is Required.", 5);

        return false;
    }
    if ($('#cmbState_Consignee_Address').val() == "" || $('#cmbState_Consignee_Address').val() == null) {
        popupErrorMsg($("#cmbState_Consignee_Address"), "State is Required.", 5);

        return false;
    }
    if ($('#txtAddress1_Consignee_Address').val() == "" || $('#txtAddress1_Consignee_Address').val() == null) {
        popupErrorMsg($("#txtAddress1_Consignee_Address"), "Address is Required.", 5);

        return false;
    }
    if ($('#txtSaveLocationAs_Consignee_Address').val() == "" || $('#txtSaveLocationAs_Consignee_Address').val() == null) {
        popupErrorMsg($("#txtSaveLocationAs_Consignee_Address"), "Location Name  is Required.", 5);

        return false;
    }
    if ($('#txtCity_Consignee_Address').val() == "" || $('#txtCity_Consignee_Address').val() == null) {
        popupErrorMsg($("#txtCity_Consignee_Address"), "City is Required.", 5);

        return false;
    }
    if ($('#txtZipCode_Consignee_Address').val() == "" || $('#txtZipCode_Consignee_Address').val() == null) {
        popupErrorMsg($("#txtZipCode_Consignee_Address"), "Zip Code is Required.", 5);

        return false;
    }
    return true;
}

//////////////////// End Popup validations////////////////////////////////////

////////////////////Clear Poupup//////////////////////////////////////////////

$('#CustomerModal').on('hidden.bs.modal', function (e) {
    $("#txtCompanyName_Customer").val("");
    $("#cmbCountry_Customer").val("").trigger('change');
    $("#cmbState_Customer").val("").trigger('change');
    $("#txtAcNo_Customer").val("");
    $("#txtCity_Customer").val("");
    $("#txtZipCode_Customer").val("");
    $("#txtAddress1_Customer").val("");
    $("#txtAddress2_Customer").val("");
    $("#txtaccntPayableEmail_Customer").val("");
    $("#txtContactName_Customer").val("");
    $("#txtDesignation_Customer").val("");
    $("#txtContactEmail_Customer").val("");
    $("#txtContactPhoneNo_Customer").val("");
    $("#txtContactFax_Customer").val("");
});

$('#CustomerContactModal').on('hidden.bs.modal', function (e) {
    $("#txtContactName_Customer_Contact").val("");
    $("#txtDesignation_Customer_Contact").val("");
    $("#txtContactEmail_Customer_Contact").val("");
    $("#txtContactPhoneNo_Customer_Contact").val("");
    $("#txtContactFax_Customer_Contact").val("");
});

$('#CarrierModal').on('hidden.bs.modal', function (e) {
    $("#txtCompanyName_Carrier").val("");
    $("#cmbCountry_Carrier").val("").trigger('change');
    $("#cmbState_Carrier").val("").trigger('change');
    $("#txtAcNo_Carrier").val("");
    $("#txtCity_Carrier").val("");
    $("#txtZipCode_Carrier").val("");
    $("#txtAddress1_Carrier").val("");
    $("#txtAddress2_Carrier").val("");
    $("#txtaccntPayableEmail_Carrier").val("");
    $("#txtContactName_Carrier").val("");
    $("#txtDesignation_Carrier").val("");
    $("#txtContactEmail_Carrier").val("");
    $("#txtContactPhoneNo_Carrier").val("");
    $("#txtContactFax_Carrier").val("");
});

$('#CarrierContactModal').on('hidden.bs.modal', function (e) {
    $("#txtContactName_Carrier_Contact").val("");
    $("#txtDesignation_Carrier_Contact").val("");
    $("#txtContactEmail_Carrier_Contact").val("");
    $("#txtContactPhoneNo_Carrier_Contact").val("");
    $("#txtContactFax_Carrier_Contact").val("");
});

$('#BrokerModal').on('hidden.bs.modal', function (e) {
    $("#txtCompanyName_Broker").val("");
    $("#cmbCountry_Broker").val("").trigger('change');
    $("#cmbState_Broker").val("").trigger('change');
    $("#txtAcNo_Broker").val("");
    $("#txtCity_Broker").val("");
    $("#txtZipCode_Broker").val("");
    $("#txtAddress1_Broker").val("");
    $("#txtAddress2_Broker").val("");
    $("#txtaccntPayableEmail_Broker").val("");
    $("#txtContactName_Broker").val("");
    $("#txtDesignation_Broker").val("");
    $("#txtContactEmail_Broker").val("");
    $("#txtContactPhoneNo_Broker").val("");
    $("#txtContactFax_Broker").val("");
});

$('#BrokerContactModal').on('hidden.bs.modal', function (e) {
    $("#txtContactName_Broker_Contact").val("");
    $("#txtDesignation_Broker_Contact").val("");
    $("#txtContactEmail_Broker_Contact").val("");
    $("#txtContactPhoneNo_Broker_Contact").val("");
    $("#txtContactFax_Broker_Contact").val("");
});

$('#ShipperModal').on('hidden.bs.modal', function (e) {
    $("#txtCompanyName_Shipper").val("");
    $("#txtEIN_Shipper").val("");
    $("#txtContactName_Shipper").val("");
    $("#txtEmail_Shipper").val("");
    $("#txtDBAName_Shipper").val("");
    $("#txtAcNo_Shipper").val("");
    $("#cmbCountry_Shipper").val("").trigger('change');
    $("#cmbState_Shipper").val("").trigger('change');
    $("#txtAddress1_Shipper").val("");
    $("#txtSaveLocationAs_Shipper").val("");
    $("#txtCntactName_Shipper").val("");
    $("#txtCity_Shipper").val("");
    $("#txtAddress1_Shipper").val("");
    $("#txtZipCode_Shipper").val("");
    $("#txtAddress2_Shipper").val("");
    $("#txtInstructions_Shipper").val("");
    $("#txtPhoneNumber_Shipper").val("");
});

$('#ShipperAddressModal').on('hidden.bs.modal', function (e) {
    $("#cmbCountry_Shipper_Address").val("").trigger('change');
    $("#cmbState_Shipper_Address").val("").trigger('change');
    $("#txtAddress1_Shipper_Address").val("");
    $("#txtSaveLocationAs_Shipper_Address").val("");
    $("#txtCntactName_Shipper_Address").val("");
    $("#txtCity_Shipper_Address").val("");
    $("#txtAddress1_Shipper_Address").val("");
    $("#txtZipCode_Shipper_Address").val("");
    $("#txtAddress2_Shipper_Address").val("");
    $("#txtInstructions_Shipper_Address").val("");
    $("#txtAddressPhoneNumber_Shipper_Address").val("");
});

$('#ConsigneeModal').on('hidden.bs.modal', function (e) {
    $("#txtCompanyName_Consignee").val("");
    $("#txtEIN_Consignee").val("");
    $("#txtContactName_Consignee").val("");
    $("#txtEmail_Consignee").val("");
    $("#txtDBAName_Consignee").val("");
    $("#txtAcNo_Consignee").val("");
    $("#cmbCountry_Consignee").val("").trigger('change');
    $("#cmbState_Consignee").val("").trigger('change');
    $("#txtAddress1_Consignee").val("");
    $("#txtSaveLocationAs_Consignee").val("");
    $("#txtCntactName_Consignee").val("");
    $("#txtCity_Consignee").val("");
    $("#txtAddress1_Consignee").val("");
    $("#txtZipCode_Consignee").val("");
    $("#txtAddress2_Consignee").val("");
    $("#txtInstructions_Consignee").val("");
    $("#txtPhoneNumber_Consignee").val("");
});

$('#ConsigneeAddressModal').on('hidden.bs.modal', function (e) {
    $("#cmbCountry_Consignee_Address").val("").trigger('change');
    $("#cmbState_Consignee_Address").val("").trigger('change');
    $("#txtAddress1_Consignee_Address").val("");
    $("#txtSaveLocationAs_Consignee_Address").val("");
    $("#txtCntactName_Consignee_Address").val("");
    $("#txtCity_Consignee_Address").val("");
    $("#txtAddress1_Consignee_Address").val("");
    $("#txtZipCode_Consignee_Address").val("");
    $("#txtAddress2_Consignee_Address").val("");
    $("#txtInstructions_Consignee_Address").val("");
    $("#txtAddressPhoneNumber_Consignee_Address").val("");
});
//////////////////End Clear Popup////////////////////////////////////////////
/////////////////Dispatch Driver Popup/////////////////////////////////////////////

$("#Btn_AddDriver").click(function () {
    $("#btnsavepopupDriver").text('Save');
    $("#Driver_Heading").text('QUICK ADD - DRIVER');
    $("#DriverModal").modal({ backdrop: "static" });
    $('#radioEmployee').iCheck('check');
    $('#radioActive').iCheck('check');
});
$('#radioEmployee').on('ifChecked', function (event) {
    $("#DivCompname").hide();
    $("#DivOwnerOperator").hide();
    $('#chkOwnerOperator').iCheck('uncheck');
    $('#txtCompName').val("");
});

$('#radioContractor').on('ifChecked', function (event) {
    $("#DivCompname").show();
    $("#DivOwnerOperator").show();
    $('#chkOwnerOperator').iCheck('check');
});
$("#cmbPaymentType").change(function () {

    if ($('#cmbPaymentType').val() == "1" || $('#cmbPaymentType').val() == "") {
        $("#DivLoadedMiles").hide();
        $("#DivEmptyMiles").hide();
        $("#DivLoadpayPercent").hide();
        $("#DivRate").hide();
        $("#DivPercentOf").hide();


    }
    else {
        if ($('#cmbPaymentType').val() == "2") {
            $("#DivLoadedMiles").show();
            $("#DivEmptyMiles").show();
            $("#DivLoadpayPercent").hide();
            $("#DivRate").hide();
            $("#DivPercentOf").hide();
        }

        else {
            if ($('#cmbPaymentType').val() == "3") {
                $("#DivLoadedMiles").hide();
                $("#DivEmptyMiles").hide();
                $("#DivLoadpayPercent").show();
                $("#DivRate").hide();
                $("#DivPercentOf").show();
            }
            else {
                if ($('#cmbPaymentType').val() == "4") {
                    $("#DivLoadedMiles").hide();
                    $("#DivEmptyMiles").hide();
                    $("#DivLoadpayPercent").hide();
                    $("#DivRate").show();
                    $("#DivPercentOf").hide();
                }
            }

        }
    }
});
$("#Btn_UpdateDriver").click(function () {
    if ($('#cmbDriver').val() != "") {
        $("#btnsavepopupDriver").text('Update');
        $("#Driver_Heading").text('QUICK UPDATE - DRIVER');
        $("#DriverModal").modal({ backdrop: "static" });

        Req = 'Fill_Driver';
        obj = "Fill_Driver";
        url = "CreateDispatch.aspx/LoadDetails";
        ht = {};
        ht["ID"] = $("#cmbDriver").val();
        LoadAjaxLoadExtraSave(ht, obj, Req, url);
    }
    else {
        swal({
            title: "Please Select a Driver to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});
$('#DriverModal').on('hidden.bs.modal', function (e) {
    $("#cmbCountry").val("").trigger('change');
    $("#cmbState").val("").trigger('change');
    $("#txtCompName").val("");
    $("#txtDriverName").val("");
    $("#txtWorkEmail").val("");
    $("#txtWorkPhone").val("");
    $("#cmbPaymentType").val("").trigger('change');
    $("#txtLoadedMile").val("");
    $("#txtEmptyMile").val("");
    $("#txtLoadPayPercent").val("");
    $("#txtrate").val("");
    $("#cmbPayPercentOf").val("").trigger('change');
    $("#txtCDLNo").val("");
    $("#txtContractStartDate").val("");
    $("#txtContractEndDate").val("");
    $("#txtLicenseExpires").val("");
});

function DriverPopupSave() {
    if (validationcheck_DriverPopup() == true) {

        setTimeout(function () {
            ht = {};

            if ($('#radioEmployee').is(':checked')) {
                ht["IsEmpORCont"] = "1";
            }
            else if ($('#radioContractor').is(':checked')) {
                ht["IsEmpORCont"] = "0";
            }
            ht["Company_Name"] = $("#txtCompName").val();
            ht["Driver_Name"] = $("#txtDriverName").val();
            if ($('#chkOwnerOperator').is(':checked')) {
                ht["Owner_Operator"] = "1";
            }
            else {
                ht["Owner_Operator"] = "0";
            }
            ht["Work_Email"] = $("#txtWorkEmail").val();
            if ($('#radioActive').is(':checked')) {
                ht["Display_Status"] = "1";
            }
            else if ($('#radioInactive').is(':checked')) {
                ht["Display_Status"] = "0";
            }

            ht["Work_Phone"] = $("#txtWorkPhone").val();

            ht["Default_Payment_Type"] = $("#cmbPaymentType :selected").val();
            ht["Loaded_Miles"] = $("#txtLoadedMile").val();
            ht["Empty_Miles"] = $("#txtEmptyMile").val();
            ht["Load_Pay_Percent"] = $("#txtLoadPayPercent").val();
            ht["Percent_Of"] = $("#cmbPayPercentOf :selected").val();
            ht["Rate"] = $("#txtrate").val();
            ht["CDL_No"] = $("#txtCDLNo").val();
            ht["License_Expires"] = $("#txtLicenseExpires").val();
            ht["Contract_Start_Date"] = $("#txtContractStartDate").val();
            ht["Issued_Country"] = $("#cmbCountry :selected").val();
            ht["Issued_State"] = $("#cmbState :selected").val();
            ht["Contract_End_Date"] = $("#txtContractEndDate").val();

            if ($("#btnsavepopupDriver").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsavepopupDriver").text() == "Update") {
                ht["ID"] = $("#cmbDriver").val();
                ht["MODE"] = "UPDATE";
            }

            Req = 'DriverPopupSave';
            obj = "DriverPopupSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);

        }, 1000);
    }

}
function validationcheck_DriverPopup() {
    if ($('#txtDriverName').val() == "" || $('#txtDriverName').val() == null) {
        popupErrorMsg($("#txtDriverName"), "The Driver Name is Required.", 5);

        return false;
    }
    if ($('#txtWorkEmail').val() == "" || $('#txtWorkEmail').val() == null) {
        popupErrorMsg($("#txtWorkEmail"), "Email ID is Required.", 5);

        return false;
    }

    var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test($("#txtWorkEmail").val())) {
        popupErrorMsg($("#txtWorkEmail"), "Enter a Valid Email ID.", 5);

        return false;

    }
    if ($('#txtWorkPhone').val() == "" || $('#txtWorkPhone').val() == null) {
        popupErrorMsg($("#txtWorkPhone"), "Phone Number is Required.", 5);

        return false;
    }
    if ($('#cmbPaymentType').val() == "" || $('#cmbPaymentType').val() == null) {
        popupErrorMsg($("#cmbPaymentType"), "Select Payment Type.", 5);

        return false;
    }
    return true;
}
///////////////// End Dispatch Driver Popup/////////////////////////////////////////////
/////////////////Dispatch Truck Popup/////////////////////////////////////////////

$("#Btn_AddTruck").click(function () {
    $("#btnsavepopupTruck").text('Save');
    $("#Truck_Heading").text('QUICK ADD - TRUCK');
    $("#TruckModal").modal({ backdrop: "static" });
    $('#chkIftaReporting').iCheck('disable');
});
$('#chkBilling').on('ifChecked', function (event) {
    $('#chkIftaReporting').iCheck('enable');
});

$('#chkBilling').on('ifUnchecked', function (event) {
    $('#chkIftaReporting').iCheck('disable');
    $('#chkIftaReporting').iCheck('uncheck');
});
$('#chkService').on('ifChecked', function (event) {
    $("#divNotInService").show();
});

$('#chkService').on('ifUnchecked', function (event) {
    $("#divNotInService").hide();
    $("#divNotInServiceReason").hide();
    $("#cmbNotInService").val("").trigger('change');
    $('#txtOtherReason').val("");

});
$("#cmbNotInService").change(function () {

    if ($('#cmbNotInService').val() == "5") {
        $("#divNotInServiceReason").show();
    }
    else {
        $("#divNotInServiceReason").hide();
        $('#txtOtherReason').val("");
    }

});
function Modelload(cid, sid) {
    Req = 'Model';
    obj = "Model";
    url = "CreateDispatch.aspx/LoadDetails";
    ht = {};
    ht["MAKE_ID"] = $("#" + cid + " :selected").val();
    LoadAjaxLoadExtra(ht, obj, Req, url, cid, sid);

}
$("#Btn_UpdateTruck").click(function () {
    if ($('#cmbTruck').val() != "") {
        $("#btnsavepopupTruck").text('Update');
        $("#Truck_Heading").text('QUICK UPDATE - TRUCK');
        $("#TruckModal").modal({ backdrop: "static" });

        Req = 'Fill_Truck';
        obj = "Fill_Truck";
        url = "CreateDispatch.aspx/LoadDetails";
        ht = {};
        ht["ID"] = $("#cmbTruck").val();
        LoadAjaxLoadExtraSave(ht, obj, Req, url);
    }
    else {
        swal({
            title: "Please Select a Truck to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});
$('#TruckModal').on('hidden.bs.modal', function (e) {
    $("#txtUnitNumber").val("");
    $("#cmbMake").val("").trigger('change');
    $("#cmbModelYear").val("").trigger('change');
    $("#cmbModel").val("").trigger('change');
    $("#cmbNotInService").val("").trigger('change');
    $("#cmbFuelType").val("").trigger('change');
    $("#cmbGVW").val("").trigger('change');
    $('#chkBilling').iCheck('uncheck');
    $('#chkService').iCheck('uncheck');
    $("#txtOtherReason").val("");
    $("#txtLicensePlateNo").val("");
    $("#txtLicenseExpDate").val("");
    $("#txtPolicyNumber").val("");
    $("#txtInsuranceExpiry").val("");
});
function TruckPopupSave() {
    if (validationcheck_TruckPopup() == true) {

        setTimeout(function () {
            ht = {};

            ht["Unit_Number"] = $("#txtUnitNumber").val();
            ht["Make"] = $("#cmbMake :selected").val();
            ht["Model_Year"] = $("#cmbModelYear :selected").val();
            ht["Model"] = $("#cmbModel :selected").val();

            if ($('#chkBilling').is(':checked')) {
                ht["Include_Billing"] = "1";
            }
            else {
                ht["Include_Billing"] = "0";
            }

            if ($('#chkIftaReporting').is(':checked')) {
                ht["Include_IFTA"] = "1";
            }
            else {
                ht["Include_IFTA"] = "0";
            }

            if ($('#chkService').is(':checked')) {
                ht["Not_In_Service"] = "1";
            }
            else {
                ht["Not_In_Service"] = "0";
            }

            ht["Reason"] = $("#cmbNotInService :selected").val();
            ht["Other_Reason"] = $("#txtOtherReason").val();

            ht["Fuel_Type"] = $("#cmbFuelType :selected").val();
            ht["GVW"] = $("#cmbGVW :selected").val();

            ht["License_Plate_No"] = $("#txtLicensePlateNo").val();
            ht["License_Exp_Date"] = $("#txtLicenseExpDate").val();
            ht["Policy_Number"] = $("#txtPolicyNumber").val();
            ht["Insurance_Exp_Date"] = $("#txtInsuranceExpiry").val();

            if ($("#btnsavepopupTruck").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsavepopupTruck").text() == "Update") {
                ht["ID"] = $("#cmbTruck").val();
                ht["MODE"] = "UPDATE";
            }

            Req = 'TruckPopupSave';
            obj = "TruckPopupSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);

        }, 1000);
    }

}
function validationcheck_TruckPopup() {
    if ($('#txtUnitNumber').val() == "") {
        popupErrorMsg($("#txtUnitNumber"), "The Unit Number is Required.", 5);

        return false;
    }
    if ($('#cmbFuelType').val() == "" || $('#cmbFuelType').val() == null) {
        popupErrorMsg($("#cmbFuelType"), "The Fuel Type is Required.", 5);

        return false;
    }

    if ($('#cmbGVW').val() == "" || $('#cmbGVW').val() == null) {
        popupErrorMsg($("#cmbGVW"), "The GVW (Gross Vehicle Weight) is Required.", 5);

        return false;
    }
    return true;
}
/////////////////End Dispatch Truck Popup/////////////////////////////////////////////

/////////////////Dispatch Trailer Popup/////////////////////////////////////////////

$("#Btn_AddTrailer").click(function () {
    $("#btnsavepopupTrailer").text('Save');
    $("#Trailer_Heading").text('QUICK ADD - TRAILER');
    $("#TrailerModal").modal({ backdrop: "static" });
    $('#radioActive_Trailer').iCheck('check');
});
$("#Btn_UpdateTrailer").click(function () {
    if ($('#cmbTrailer').val() != "") {
        $("#btnsavepopupTrailer").text('Update');
        $("#Trailer_Heading").text('QUICK UPDATE - TRAILER');
        $("#TrailerModal").modal({ backdrop: "static" });

        Req = 'Fill_Trailer';
        obj = "Fill_Trailer";
        url = "CreateDispatch.aspx/LoadDetails";
        ht = {};
        ht["ID"] = $("#cmbTrailer").val();
        LoadAjaxLoadExtraSave(ht, obj, Req, url);
    }
    else {
        swal({
            title: "Please Select a Trailer to Update",
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Ok!",
            closeOnConfirm: true,
            timer: 2000
        });
    }
});

$('#TrailerModal').on('hidden.bs.modal', function (e) {
    $("#txtUnitNumber_Trailer").val("");
    $("#cmbMake_Trailer").val("").trigger('change');
    $("#cmbTrailerGroup_Trailer").val("").trigger('change');
    $("#cmbModel_Trailer").val("").trigger('change');
    $("#cmbTrailerType_Trailer").val("").trigger('change');
    $("#txtUnladenWeight").val("");
    $("#txtLicensePlateNo_Trailer").val("");
    $("#txtLicenseExpDate_Trailer").val("");
    $("#txtPolicyNumber_Trailer").val("");
    $("#txtInsuranceExpiry_Trailer").val("");
});
function TrailerPopupSave() {
    if (validationcheck_TrailerPopup() == true) {

        setTimeout(function () {
            ht = {};

            ht["Unit_Number"] = $("#txtUnitNumber_Trailer").val();
            ht["Make"] = $("#cmbMake_Trailer :selected").val();
            ht["Model"] = $("#cmbModel_Trailer :selected").val();

            if ($('#radioActive_Trailer').is(':checked')) {
                ht["Status"] = "1";
            }
            else {
                ht["Status"] = "0";
            }

            ht["Trailer_Group"] = $("#cmbTrailerGroup_Trailer").val();
            ht["Trailer_Type"] = $("#cmbTrailerType_Trailer").val();
            ht["Unladen_Weight"] = $("#txtUnladenWeight").val();

            ht["License_Plate_No"] = $("#txtLicensePlateNo_Trailer").val();
            ht["License_Exp_Date"] = $("#txtLicenseExpDate_Trailer").val();
            ht["Policy_Number"] = $("#txtPolicyNumber_Trailer").val();
            ht["Insurance_Exp_Date"] = $("#txtInsuranceExpiry_Trailer").val();

            if ($("#btnsavepopupTrailer").text() == "Save") {
                ht["ID"] = '';
                ht["MODE"] = "INSERT";
            }
            if ($("#btnsavepopupTrailer").text() == "Update") {
                ht["ID"] = $("#cmbTrailer").val();
                ht["MODE"] = "UPDATE";
            }

            Req = 'TrailerPopupSave';
            obj = "TrailerPopupSave";
            url = "CreateDispatch.aspx/LoadDetails";
            LoadAjaxLoadExtraSave(ht, obj, Req, url);

        }, 1000);
    }

}
function validationcheck_TrailerPopup() {
    if ($('#txtUnitNumber_Trailer').val() == "") {
        popupErrorMsg($("#txtUnitNumber_Trailer"), "The Unit Number is Required.", 5);

        return false;
    }
    return true;
}
/////////////////Dispatch Trailer Popup/////////////////////////////////////////////