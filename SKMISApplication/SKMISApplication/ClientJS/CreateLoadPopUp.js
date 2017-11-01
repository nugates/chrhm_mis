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
    url = "CreateLoad.aspx/LoadDetails";
    ht = {};
    LoadAjaxLoadExtra(ht, obj, Req, url, '', '');

}
function stateload(cid, sid) {
    Req = 'State';
    obj = "State";
    url = "CreateLoad.aspx/LoadDetails";
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
                        $("#cmbCustomerCarrierBroker option[value='"+json.ID+"']").remove();
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
            url = "CreateLoad.aspx/LoadDetails";
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
