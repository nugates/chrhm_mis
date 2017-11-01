var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";

var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {

    var BTid = GetParameterValues('BTid');
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
        if (BTid == undefined) {
            $("#Edit1").hide();
            $("#Edit2").hide();
            $("#Edit3").hide();
            $("#Edit4").hide();
            $("#Edit5").hide();
            $("#Edit6").hide();
            $("#radioActive").iCheck('check');
            $("#DivSkip1").hide();
            Req = 'Country';
            obj = "Fill";
            url = "CreateTrailerDetails.aspx/TruckDetails";
            ht = {};
            LoadAjaxtruck(ht, obj, Req, url);
        }
        else {
            $("#Edit1").show();
            $("#Edit2").show();
            $("#Edit3").show();
            $("#Edit4").show();
            $("#Edit5").show();
            $("#Edit6").show();
            $("#turckLocationListDiv").show();
            $("#DivSkip1").show();

            $('#ID_hidden').val('' + BTid);
            
            $('#ID_hidden_Additional').val('' + BTid);
            // Req = 'Edit';

            GetTruckLocationDetails();


        }
    }, 2000);


});

function GetTruckLocationDetails() {
    Req = 'Country@Edit@AddressDetails';
    obj = "Fill";
    url = "CreateTrailerDetails.aspx/TruckDetails";
    ht = {};
    ht["ID"] = $("#ID_hidden").val();
    LoadAjaxtruck(ht, obj, Req, url);
}

$("#cmbCountry").change(function () {
    Req = 'State';
    obj = "State";
    url = "CreateTrailerDetails.aspx/TruckDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#cmbCountry :selected").val();
    LoadAjaxtruck(ht, obj, Req, url);
});

$("#cmbCountry1").change(function () {
    Req = 'State1';
    obj = "State1";
    url = "CreateTrailerDetails.aspx/TruckDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#cmbCountry1 :selected").val();
    LoadAjaxtruck(ht, obj, Req, url);
});

$("#cmbMake").change(function () {
    Req = 'Model';
    obj = "Model";
    url = "CreateTrailerDetails.aspx/TruckDetails";
    ht = {};
    ht["MAKE_ID"] = $("#cmbMake :selected").val();
    LoadAjaxtruck(ht, obj, Req, url);
});

function LoadAjaxtruck(ht, obj, Req, url) {
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
            if (obj == "State1") {
                if (Result.d.State1 != "" && Result.d.State1 != undefined) {
                    var State1 = jQuery.parseJSON(Result.d.State1);
                    $('#cmbState1').html('');
                    $('#cmbState1').append($('<option></option>'));
                    $.each(State1, function (index, item) {
                        $('#cmbState1').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
            }

            if (obj == "Model") {
                if (Result.d.Model != "" && Result.d.Model != undefined) {
                    var Model = jQuery.parseJSON(Result.d.Model);
                    $('#cmbModel').html('');
                    $('#cmbModel').append($('<option></option>'));
                    $.each(Model, function (index, item) {
                        $('#cmbModel').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
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

                if (Result.d.Country1 != "" && Result.d.Country1 != undefined) {
                    var Country1 = jQuery.parseJSON(Result.d.Country1);
                    $('#cmbCountry1').html('');
                    $('#cmbCountry1').append($('<option></option>'));
                    $.each(Country1, function (index, item) {
                        $('#cmbCountry1').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.MAKE != "" && Result.d.MAKE != undefined) {
                    var MAKE = jQuery.parseJSON(Result.d.MAKE);
                    $('#cmbMake').html('');
                    $('#cmbMake').append($('<option></option>'));
                    $.each(MAKE, function (index, item) {
                        $('#cmbMake').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
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

                if (Result.d.PurchaseYear != "" && Result.d.PurchaseYear != undefined) {
                    var PurchaseYear = jQuery.parseJSON(Result.d.PurchaseYear);
                    $('#cmbYearPurchased').html('');
                    $('#cmbYearPurchased').append($('<option></option>'));
                    $.each(PurchaseYear, function (index, item) {
                        $('#cmbYearPurchased').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
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

                if (Result.d.NumberofAxel != "" && Result.d.NumberofAxel != undefined) {
                    var NumberofAxel = jQuery.parseJSON(Result.d.NumberofAxel);
                    $('#cmbAxels').html('');
                    $('#cmbAxels').append($('<option></option>'));
                    $.each(NumberofAxel, function (index, item) {
                        $('#cmbAxels').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.Edit != "" && Result.d.Edit != undefined) {
                    var json = jQuery.parseJSON(Result.d.Edit);
                    $.each(json, function (index, item) {

                        //***********************Unit Details
                        $("#txtUnitNumber").val(item.TDB_Unit_Number);
                        $("#cmbMake").val(item.TDB_Make).trigger('change');
                        $("#cmbModelYear").val(item.TDB_Model_Year).trigger('change');
                        setTimeout(function () {
                        $("#cmbModel").val(item.TDB_Model).trigger('change');
                        }, 2000);
                        if (item.TDB_Status == "True") {

                            $("#radioActive").iCheck('check');
                            $("#radioInactive").iCheck('uncheck');
                        }
                        else {
                            $("#radioInactive").iCheck('check');
                            $("#radioActive").iCheck('uncheck');
                        }

                        //***********************Trailer Details

                        $("#txtOwner").val(item.TDV_Owner);
                        $("#txtTitleNo").val(item.TDV_Title_No);
                        $("#txtHeight").val(item.TDV_Height);
                        $("#txtSerialNumber").val(item.TDV_Serial_No);
                        $("#txtVIN").val(item.TDV_VIN);
                        $("#cmbYearPurchased").val(item.TDV_Year_Purchased);
                        $("#txtUnladenWeight").val(item.TDV_Unladen_Weight);
                        $("#cmbTrailerGroup").val(item.TDV_Trailer_Group).trigger('change');
                        $("#cmbTrailerType").val(item.TDV_Trailer_Type).trigger('change');
                        $("#cmbAxels").val(item.TDV_No_Of_Axle).trigger('change');

                        if (item.TDV_Used_For_Logging == "True") {

                            $("#chkLogging").iCheck('check');
                        }
                        else {
                            $("#chkLogging").iCheck('uncheck');
                        }

                        if (item.TDV_Used_For_Agriculture == "True") {

                            $("#chkAgriculture").iCheck('check');
                        }
                        else {
                            $("#chkAgriculture").iCheck('uncheck');
                        }

                        //***********************License & Insurance

                        $("#txtLicensePlateNo").val(item.TDLI_License_Plate_No);
                        $("#txtInspectionDate").val(item.TDLI_Inspection_Date);
                        $("#txtLicenseExpDate").val(item.TDLI_License_Exp_Date);
                        $("#txtInsuranceName").val(item.TDLI_Insurance_Name);
                        $("#txtInsuranceExpiry").val(item.TDLI_Insurance_Exp_Date);
                        $("#txtPolicyNumber").val(item.TDLI_Policy_Number);
                        $("#cmbCountry").val(item.TDLI_Registered_Country).trigger('change');


                        //***********************Additional Details

                        $("#txtCose").val(item.TDA_Cost);
                        $("#txtColor").val(item.TDA_Color);
                        $("#txtNotes").val(item.TDA_Notes);
                        $("#txtFMV").val(item.TDA_FMV);
                        $("#txtTireInfo").val(item.TDA_Tire_Info);

                        $('#selectimg').attr('src', "");
                        $('#LogoPath').val(item.TDA_LogoPath);
                        //alert(item.Logo);                    
                        $('#selectimg').attr('src', '' + item.TDA_LogoPath + '');
                        if (item.TDA_LogoPath != "") {
                            $("#selectimg").show();
                        }

                        setTimeout(function () {
                            $("#cmbState").val(item.TDLI_Registered_State).trigger('change');
                        }, 5000);

                    });
                }

                if (Result.d.AddressDetails != "" && Result.d.AddressDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.AddressDetails);
                    var table = '<table id="truckList" class="table table-bordered table-striped">';
                    table = table + '<thead><tr><th style="display:none">ID</th><th style="display:none">Country</th><th>Country Name</th><th style="display:none">State</th>' +
                        '<th>State Name</th><th>City</th><th>Zip_Code</th>' +
                        '<th style="display:none">Date</th>' +
                        '<th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                    $.each(data, function (i, item) {
                        table = table + "<tr><td style='display:none' >" + item.ID +
                                        "</td><td style='display:none'>" + item.Country +
                                        "</td><td>" + item.Country_Name +
                                        "</td><td style='display:none'>" + item.State +
                                         "</td><td>" + item.State_Name +
                                        "</td><td>" + item.City +
                                        "</td><td>" + item.Zip_Code +
                                        "</td><td style='display:none'>" + item.Date +
                                         "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=ContactEdit(this) class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                        "</td>" +
                                        "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=ContactDelet(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                        "</tr>"
                    });
                    document.getElementById("turckLocationListDiv").innerHTML = table + '</tbody></table>';
                    setTimeout(function () {
                        ShortTable('#truckList');
                    }, 100);
                }

            }

            if (obj == "Save1") {
                if (Result.d.Save1 != "" && Result.d.Save1 != undefined) {
                    var json = jQuery.parseJSON(Result.d.Save1)[0];

                    if (json.CustomErrorState == "0") {
                        $("#ID_hidden").val(json.ID);

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
            if (obj == "Save5") {

                ClearAdd();
                GetCustomerDetails();
            }
            if (obj == "Delete5") {
                if (Result.d.Delete5 != "" && Result.d.Delete5 != undefined) {
                    var json = jQuery.parseJSON(Result.d.Delete5)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: json.CustomMessage,
                            text: "",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

                        ClearAdd();
                        GetCustomerDetails();

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

            if (obj == "Save6") {
                if (Result.d.Save6 != "" && Result.d.Save6 != undefined) {
                    var json = jQuery.parseJSON(Result.d.Save6)[0];

                    if (json.CustomErrorState == "0") {
                        $("#ID_hidden_Additional").val(json.ID);

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

                        setTimeout(function () {
                            window.location = 'TrailerDetailsList.aspx';
                        }, 1000);
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

function Save1() {
    if (validationcheck1() == true) {

        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            ht["Unit_Number"] = $("#txtUnitNumber").val();
            ht["Make"] = $("#cmbMake :selected").val();
            ht["Model_Year"] = $("#cmbModelYear :selected").val();
            ht["Model"] = $("#cmbModel :selected").val();

            if ($('#radioActive').is(':checked')) {
                ht["Status"] = "1";
            }
            else {
                    ht["Status"] = "0";
            }

            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            Req = 'Save1';
            obj = "Save1";
            url = "CreateTrailerDetails.aspx/TruckDetails";
            LoadAjaxtruck(ht, obj, Req, url);

        }, 1000);


        $("#Edit1").show();
        $("#collapseOne").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
        $("#collapseThree").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
        $("#Edit3").show();
        $("#DivSkip1").show();
    }
}
function Skip1() {

    $("#Edit1").show();
    $("#collapseOne").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseThree").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit3").show();
}

function Save3() {

    setTimeout(function () {
        ht = {};
        ht["ID"] = $("#ID_hidden").val();
        ht["Owner"] = $("#txtOwner").val();
        ht["Title_No"] = $("#txtTitleNo").val();
        ht["Height"] = $("#txtHeight").val();
        ht["Serial_No"] = $("#txtSerialNumber").val();
        ht["VIN"] = $("#txtVIN").val();
        ht["Year_Purchased"] = $("#cmbYearPurchased :selected").val();
        ht["Unladen_Weight"] = $("#txtUnladenWeight").val();
        ht["Trailer_Group"] = $("#cmbTrailerGroup").val();
        ht["Trailer_Type"] = $("#cmbTrailerType").val();
        ht["No_Of_Axle"] = $("#cmbAxels").val();
        if ($('#chkLogging').is(':checked')) {
            ht["Used_For_Logging"] = "1";
        }
        else {
            ht["Used_For_Logging"] = "0";
        }

        if ($('#chkAgriculture').is(':checked')) {
            ht["Used_For_Agriculture"] = "1";
        }
        else {
            ht["Used_For_Agriculture"] = "0";
        }

        if ($("#ID_hidden").val() != "") {
            ht["MODE"] = "UPDATE";
        }
        else {
            ht["MODE"] = "INSERT";
        }

        Req = 'Save3';
        obj = "Save3";
        url = "CreateTrailerDetails.aspx/TruckDetails";
        LoadAjaxtruck(ht, obj, Req, url);
    }, 1000);

    $("#collapseThree").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseFour").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit4").show();
}
function Skip3() {

    $("#collapseThree").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseFour").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit4").show();
}
function Save4() {
    setTimeout(function () {
        ht = {};
        ht["ID"] = $("#ID_hidden").val();
        ht["License_Plate_No"] = $("#txtLicensePlateNo").val();
        ht["Inspection_Date"] = $("#txtInspectionDate").val();
        ht["License_Exp_Date"] = $("#txtLicenseExpDate").val();
        ht["Insurance_Name"] = $("#txtInsuranceName").val();
        ht["Insurance_Exp_Date"] = $("#txtInsuranceExpiry").val();
        ht["Policy_Number"] = $("#txtPolicyNumber").val();
        ht["Registered_Country"] = $("#cmbCountry :selected").val();
        ht["Registered_State"] = $("#cmbState :selected").val();


        if ($("#ID_hidden").val() != "") {
            ht["MODE"] = "UPDATE";
        }
        else {
            ht["MODE"] = "INSERT";
        }

        Req = 'Save4';
        obj = "Save4";
        url = "CreateTrailerDetails.aspx/TruckDetails";
        LoadAjaxtruck(ht, obj, Req, url);
    }, 1000);
    $("#collapseFour").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseFive").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit5").show();
}
function Skip4() {

    $("#collapseFour").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseFive").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit5").show();
}
function Save5(txt) {

    if (validationcheck5() == true) {
        setTimeout(function () {
            ht = {};
            ht["Basic_Table_ID"] = $("#ID_hidden").val();
            ht["ID"] = $("#txtID").val();
            ht["Country"] = $("#cmbCountry1 :selected").val();
            ht["State"] = $("#cmbState1 :selected").val();
            ht["City"] = $("#txtCity").val();
            ht["Zip_Code"] = $("#txtZipCode").val();
            ht["Date"] = $("#txtLastLocationdate").val();

            Req = 'Save5';
            obj = "Save5";
            url = "CreateTrailerDetails.aspx/TruckDetails";
            LoadAjaxtruck(ht, obj, Req, url);


        }, 1000);
        if (txt == "savecont") {
            $("#collapseFive").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
            $("#collapseSix").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
            $("#Edit6").show();
        }
    }
}
function Skip5() {

    $("#collapseFive").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseSix").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit6").show();
}
function ClearAdd() {
    $("#txtID").val('');
    $("#cmbCountry1").val('').trigger('change');
    $("#cmbState1").val('').trigger('change');
    $("#txtCity").val('');
    $("#txtZipCode").val('');
    $("#txtLastLocationdate").val('');
}
function GetCustomerDetails() {

    Req = 'AddressDetails';
    obj = "Fill";
    url = "CreateTrailerDetails.aspx/TruckDetails";
    ht = {};
    ht["ID"] = $("#ID_hidden").val();
    LoadAjaxtruck(ht, obj, Req, url);

}
function Save6() {


    if ($('#f_Uploadfile')[0].files[0] != undefined) {
        sendFile();
    }

    setTimeout(function () {
        ht = {};
        ht["ID"] = $("#ID_hidden").val();
        ht["Cost"] = $("#txtCose").val();
        ht["Color"] = $("#txtColor").val();
        ht["Notes"] = $("#txtNotes").val();
        ht["FMV"] = $("#txtFMV").val();
        ht["Tire_Info"] = $("#txtTireInfo").val();


        ht["Logo"] = $("#LogoPath").val();

        if ($("#ID_hidden_Additional").val() != "") {
            ht["MODE"] = "UPDATE";
        }
        else {
            ht["MODE"] = "INSERT";
        }

        Req = 'Save6';
        obj = "Save6";
        url = "CreateTrailerDetails.aspx/TruckDetails";
        LoadAjaxtruck(ht, obj, Req, url);
    }, 2000);

    //$("#collapseFour").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    //$("#collapseFive").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    //$("#Edit5").show();
}
function Skip6() {

    //$("#collapseFour").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    //$("#collapseFive").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    //$("#Edit5").show();
}
function Cancel6() {
    window.location = 'TrailerDetailsList.aspx';
}


//Flat red color scheme for iCheck
$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass: 'iradio_flat-green'
});



function validationcheck1() {
    if ($('#txtUnitNumber').val() == "") {
        popupErrorMsg($("#txtUnitNumber"), "The Unit Number is Required.", 5);

        return false;
    }
    return true;
}

function validationcheck5() {
    if ($('#cmbCountry1').val() == "" || $('#cmbCountry1').val() == null) {
        popupErrorMsg($("#cmbCountry1"), "Country is Required.", 5);

        return false;
    }
    if ($('#cmbState1').val() == "" || $('#cmbState1').val() == null) {
        popupErrorMsg($("#cmbState1"), "State is Required.", 5);

        return false;
    }
    if ($('#txtCity').val() == "" || $('#txtCity').val() == null) {
        popupErrorMsg($("#txtCity"), "City is Required.", 5);

        return false;
    }
    if ($('#txtZipCode').val() == "" || $('#txtZipCode').val() == null) {
        popupErrorMsg($("#txtZipCode"), "Zip Code is Required.", 5);

        return false;
    }
    if ($('#txtLastLocationdate').val() == "" || $('#txtLastLocationdate').val() == null) {
        popupErrorMsg($("#txtLastLocationdate"), "Date is Required.", 5);

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
        url: 'ImageUploadHandlerTrailer.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                $("#LogoPath").val("TrailerPhoto/" + status); // id comming from html page             
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Error saving image");
        }
    });
}
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

function ContactEdit(e) {

    $("#txtID").val($(e).closest('tr').find('td:eq(0)').text());

    $("#txtCity").val($(e).closest('tr').find('td:eq(5)').text());
    $("#txtZipCode").val($(e).closest('tr').find('td:eq(6)').text());
    $("#txtLastLocationdate").val($(e).closest('tr').find('td:eq(7)').text());

    $("#cmbCountry1 option").each(function () {
        if ($(this).val().trim() == $(e).closest('tr').find('td:eq(1)').text()) {
            $(this).attr("selected", "selected");
            $(this).prop('selected', true).trigger('change');
        }
    });
    setTimeout(function () {
        $("#cmbState1 option").each(function () {
            if ($(this).val().trim() == $(e).closest('tr').find('td:eq(3)').text()) {
                $(this).attr("selected", "selected");
                $(this).prop('selected', true).trigger('change');
            }
        });
    }, 1000);


}
function ContactDelet(id) {
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
    Req = 'Delete5';
    obj = "Delete5";
    url = "CreateTrailerDetails.aspx/TruckDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxtruck(ht, obj, Req, url);
});
}