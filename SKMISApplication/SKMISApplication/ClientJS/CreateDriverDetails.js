var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var cmdEndorsementMultiselectValues = "";

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
            $('#radioEmployee').iCheck('check');
            $('#radioActive').iCheck('check');
            $("#DivCompname").hide();
            $("#DivOwnerOperator").hide();
            $("#DivSkip1").hide();
            $('#chkSendEmail').iCheck('check');
            $("#DivOtherAddress").hide();

            Req = 'Country';
            obj = "Fill";
            url = "CreateDriverDetails.aspx/DriverDetails";
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

            $("#DivSkip1").show();

            $('#ID_hidden').val('' + BTid);

            GetDriverDetails();
            $('#radioContractor').on('ifChecked', function (event) {
                $("#DivCompname").show();
                $("#DivOwnerOperator").show();
            });
            $("#cmbPaymentType").change(function () {

                if ($('#cmbPaymentType').val() == "1") {
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

            $("#cmbAddressType").change(function () {

                if ($('#cmbAddressType').val() == "3") {
                    $("#DivOtherAddress").show();
                }
                else {
                    $("#DivOtherAddress").hide();
                    $('#txtOtherAddress').val("");
                }
            });

        }
    }, 2000);


});

function GetDriverDetails() {

    Req = 'Country@Edit@ContactDetails@AddressDetails@EndorsementDetails';
    obj = "Fill";
    url = "CreateDriverDetails.aspx/DriverDetails";
    ht = {};
    ht["ID"] = $("#ID_hidden").val();
    LoadAjaxtruck(ht, obj, Req, url);
}

$("#cmbCountry").change(function () {
    Req = 'State';
    obj = "State";
    url = "CreateDriverDetails.aspx/DriverDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#cmbCountry :selected").val();
    LoadAjaxtruck(ht, obj, Req, url);
});

$("#cmbCountry1").change(function () {
    Req = 'State1';
    obj = "State1";
    url = "CreateDriverDetails.aspx/DriverDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#cmbCountry1 :selected").val();
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


                if (Result.d.State != "" && Result.d.State != undefined) {
                    var State = jQuery.parseJSON(Result.d.State);
                    $('#cmbState').html('');
                    $('#cmbState').append($('<option></option>'));
                    $.each(State, function (index, item) {
                        $('#cmbState').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }
                if (Result.d.State1 != "" && Result.d.State1 != undefined) {
                    var State1 = jQuery.parseJSON(Result.d.State);
                    $('#cmbState1').html('');
                    $('#cmbState1').append($('<option></option>'));
                    $.each(State1, function (index, item) {
                        $('#cmbState1').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
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

                if (Result.d.RoleList != "" && Result.d.RoleList != undefined) {
                    var RoleList = jQuery.parseJSON(Result.d.RoleList);
                    $('#cmbRole').html('');
                    $('#cmbRole').append($('<option></option>'));
                    $.each(RoleList, function (index, item) {
                        $('#cmbRole').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.AddressType != "" && Result.d.AddressType != undefined) {
                    var AddressType = jQuery.parseJSON(Result.d.AddressType);
                    $('#cmbAddressType').html('');
                    $('#cmbAddressType').append($('<option></option>'));
                    $.each(AddressType, function (index, item) {
                        $('#cmbAddressType').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                if (Result.d.Endorsement != "" && Result.d.Endorsement != undefined) {
                    var Endorsement = jQuery.parseJSON(Result.d.Endorsement);
                    $('#CmbEndorsement').html('');
                    $('#CmbEndorsement').append($('<option></option>'));
                    $.each(Endorsement, function (index, item) {
                        $('#CmbEndorsement').append($('<option></option>').val(item.COUNTRY_ID).html(item.Name));
                    });
                }

                //EDIT MAPPING

                if (Result.d.Edit != "" && Result.d.Edit != undefined) {
                    var json = jQuery.parseJSON(Result.d.Edit);
                    $.each(json, function (index, item) {


                        if (item.DDB_IsEmpORCont == "1") {

                            $("#radioEmployee").iCheck('check');
                        }
                        else {
                            $("#radioContractor").iCheck('check');
                        }

                        $("#txtCompName").val(item.DDB_Company_Name);
                        $("#txtDriverName").val(item.DDB_Driver_Name);
                        $("#txtDriverId").val(item.DDB_Driver_ID);
                        if (item.DDB_Owner_Operator == "True") {

                            $("#chkOwnerOperator").iCheck('check');
                        }
                        else {
                            $("#chkOwnerOperator").iCheck('uncheck');
                        }
                        $("#txtWorkEmail").val(item.DDB_Work_Email);
                        $("#txtPersonalEmail").val(item.DDB_Personal_Email);
                        $("#txtOtherEmail").val(item.DDB_Other_Email);

                        if (item.DDB_Display_Status == "True") {

                            $("#radioActive").iCheck('check');
                        }
                        else {
                            $("#radioInactive").iCheck('check');
                        }

                        $("#txtWorkPhone").val(item.DDB_Work_Phone);
                        $("#txtHomePhone").val(item.DDB_Home_Phone);
                        $("#txtPersonalPhone").val(item.DDB_Personal_Phone);
                        $("#txtFaxPhone").val(item.DDB_Fax_Phone);
                        $("#txtOtherPhone").val(item.DDB_Other_Phone);


                        $('#selectimg').attr('src', "");
                        $('#LogoPath').val(item.DDB_LogoPath);
                        $('#selectimg').attr('src', '' + item.DDB_LogoPath + '');
                        if (item.DDB_LogoPath != "") {
                            $("#selectimg").show();
                        }


                        //******************Payment and License Details

                        $("#cmbPaymentType").val(item.DDPL_Default_Payment_Type).trigger('change');
                        $("#txtCDLNo").val(item.DDPL_CDL_No);
                        $("#txtLicenseExpires").val(item.DDPL_License_Expires);
                        $("#txtContractStartDate").val(item.DDPL_Contract_Start_Date);
                        $("#txtMedicalCardRenewalDate").val(item.DDPL_Medical_Card_Renewal);
                        $("#txtContractEndDate").val(item.DDPL_Contract_End_Date);
                        $("#txtBirthDate").val(item.DDPL_Birth_Date);
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


                        //******************Driver Accounts
                        $("#txtPasswordAccnt").hide();
                        $("#cmbRole").val(item.C_RoleId).trigger('change');
                        if (item.DDB_Contact_Notification == "1") {

                            $("#chkSendEmail").iCheck('check');
                        }
                        else {
                            $("#chkSendEmail").iCheck('uncheck');
                        }

                        $("#txtDriverNameAccnt").val(item.DDB_Driver_Name);
                        $("#txtWorkEmailAccnt").val(item.DDB_Work_Email);
                        $("#txtWorkPhoneAccnt").val(item.DDB_Work_Phone);

                        //******************Other Info
                        $("#txtFacebook").val(item.DDOI_Facebook);
                        $("#txtLinkedIn").val(item.DDOI_LinkedIn);
                        $("#txtBlog").val(item.DDOI_Blog);
                        $("#txtNotesandDescription").val(item.DDOI_Notes_Description);
                        $("#txtTwitter").val(item.DDOI_Twitter);
                        $("#txtGoogle").val(item.DDOI_Google);
                        $("#txtTumblr").val(item.DDOI_Tumblr);

                    });
                                        

                }
                if (Result.d.EndorsementDetails != "" && Result.d.EndorsementDetails != undefined) {
                    var arr = new Array();
                    var Endorsement = jQuery.parseJSON(Result.d.EndorsementDetails);  
                    $.each(Endorsement, function (index, item) {
                        arr.push(item.ID);                       
                    });

                    $('#CmbEndorsement').val(arr);
                }
                if (Result.d.ContactDetails != "" && Result.d.ContactDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.ContactDetails);
                    var table = '<table id="ContactList" class="table table-bordered table-striped">';
                    table = table + '<thead><tr><th style="display:none">ID</th><th>Name</th><th>Phone</th><th>Address</th>' +
                        '<th>Relationship</th><th>Email</th>' +
                        '<th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                    $.each(data, function (i, item) {
                        table = table + "<tr><td style='display:none' >" + item.ID +
                                        "</td><td>" + item.Name +
                                        "</td><td>" + item.Phone +
                                        "</td><td>" + item.Address +
                                         "</td><td>" + item.Relationship +
                                        "</td><td>" + item.Email +
                                         "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=ContactEdit(this) class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                        "</td>" +
                                        "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=ContactDelete(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                        "</tr>"
                    });
                    document.getElementById("DriverContactListDiv").innerHTML = table + '</tbody></table>';
                    setTimeout(function () {
                        ShortTable('#ContactList');
                    }, 100);
                }

            }
            if (Result.d.AddressDetails != "" && Result.d.AddressDetails != undefined) {
                var data = jQuery.parseJSON(Result.d.AddressDetails);
                var table = '<table id="AddressList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">ID</th><th>Address Type</th><th style="display:none">Country</th><th>Country Name</th>' +
                    '<th style="display:none">State</th><th>State Name</th><th>City</th><th style="display:none">Address1</th>' +
                    '<th style="display:none">Zip_Code</th><th style="display:none">Address2</th><th style="display:none">OtherAddress</th>' +
                    '<th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                $.each(data, function (i, item) {
                    table = table + "<tr><td style='display:none' >" + item.ID +
                                    "</td><td>" + item.Address_Type +
                                    "</td><td style='display:none' >" + item.Country +
                                    "</td><td>" + item.Country_Name +
                                     "</td><td style='display:none' >" + item.State +
                                    "</td><td>" + item.State_Name +
                                    "</td><td>" + item.City +
                                    "</td><td style='display:none' >" + item.Address1 +
                                    "</td><td style='display:none' >" + item.Zip_Code +
                                    "</td><td style='display:none' >" + item.Address2 +
                                    "</td><td style='display:none' >" + item.OtherAddress +
                                     "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=AddressEdit(this) class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=AddressDelete(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "</tr>"
                });
                document.getElementById("DriverAddressListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function () {
                    ShortTable('#AddressList');
                }, 100);
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
            if (obj == "Save4") {
                Clear4();
                GetContactDetails();
            }
            if (obj == "Delete4") {
                if (Result.d.Delete4 != "" && Result.d.Delete4 != undefined) {
                    var json = jQuery.parseJSON(Result.d.Delete4)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: json.CustomMessage,
                            text: "",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

                        Clear4();
                        GetContactDetails();

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
                Clear5();
                GetAddressDetails();
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

                        Clear5();
                        GetAddressDetails();

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
                        $("#ID_hidden_Basic").val(json.ID);

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
                            window.location = 'DriverDetailsList.aspx';
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

        if ($('#f_Uploadfile')[0].files[0] != undefined) {
            sendFile();
        }

        setTimeout(function () {
            ht = {};
            ht["ID"] = $("#ID_hidden").val();
            if ($('#radioEmployee').is(':checked')) {
                ht["IsEmpORCont"] = "1";
            }
            else if ($('#radioContractor').is(':checked')) {
                ht["IsEmpORCont"] = "0";
            }
            ht["Company_Name"] = $("#txtCompName").val();
            ht["Driver_Name"] = $("#txtDriverName").val();
            ht["Driver_ID"] = $("#txtDriverId").val();
            if ($('#chkOwnerOperator').is(':checked')) {
                ht["Owner_Operator"] = "1";
            }
            else {
                ht["Owner_Operator"] = "0";
            }
            ht["Work_Email"] = $("#txtWorkEmail").val();
            ht["Personal_Email"] = $("#txtPersonalEmail").val();
            ht["Other_Email"] = $("#txtOtherEmail").val();
            if ($('#radioActive').is(':checked')) {
                ht["Display_Status"] = "1";
            }
            else if ($('#radioInactive').is(':checked')) {
                ht["Display_Status"] = "0";
            }

            ht["Work_Phone"] = $("#txtWorkPhone").val();
            ht["Home_Phone"] = $("#txtHomePhone").val();
            ht["Personal_Phone"] = $("#txtPersonalPhone").val();
            ht["Fax_Phone"] = $("#txtFaxPhone").val();
            ht["Other_Phone"] = $("#txtOtherPhone").val();
            ht["Logo"] = $("#LogoPath").val();

            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            Req = 'Save1';
            obj = "Save1";
            url = "CreateDriverDetails.aspx/DriverDetails";
            LoadAjaxtruck(ht, obj, Req, url);

        }, 2000);

        $("#Edit1").show();
        $("#collapseOne").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
        $("#collapseTwo").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
        $("#Edit2").show();
        $("#DivSkip1").show();
    }
}
function Skip1() {

    $("#Edit1").show();
    $("#collapseOne").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseTwo").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit2").show();
}

function Save2() {


    setTimeout(function () {
        ht = {};
        ht["Basic_Table_ID"] = $("#ID_hidden").val();
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
        ht["Medical_Card_Renewal"] = $("#txtMedicalCardRenewalDate").val();
        ht["Contract_End_Date"] = $("#txtContractEndDate").val();
        ht["Birth_Date"] = $("#txtBirthDate").val();

        if ($("#ID_hidden").val() != "") {
            ht["MODE"] = "UPDATE";
        }
        else {
            ht["MODE"] = "INSERT";
        }

        ht["Endorsement"] = cmdEndorsementMultiselectValues.join(",");       

        Req = 'Save2';
        obj = "Save2";
        url = "CreateDriverDetails.aspx/DriverDetails";
        LoadAjaxtruck(ht, obj, Req, url);

    }, 1000);


    $("#collapseTwo").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseThree").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit3").show();

}
function Skip2() {

    $("#collapseTwo").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseThree").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit3").show();
}
function Save3() {
    if (validationcheck3() == true) {


        setTimeout(function () {
            ht = {};
            ht["Basic_Table_ID"] = $("#ID_hidden").val();
            ht["Driver_Name"] = $("#txtDriverNameAccnt").val();
            ht["Work_Email"] = $("#txtWorkEmailAccnt").val();
            ht["Work_Phone"] = $("#txtWorkPhoneAccnt").val();

            ht["Password"] = $("#txtPasswordAccnt").val();
            ht["Rights"] = $("#cmbRole :selected").val();
            if ($('#chkSendEmail').is(':checked')) {
                ht["Contact_Notification"] = "1";
            }
            else if ($('#radioInactive').is(':checked')) {
                ht["Contact_Notification"] = "0";
            }


            if ($("#ID_hidden").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            Req = 'Save3';
            obj = "Save3";
            url = "CreateDriverDetails.aspx/DriverDetails";
            LoadAjaxtruck(ht, obj, Req, url);

        }, 1000);


        $("#collapseThree").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
        $("#collapseFour").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
        $("#Edit4").show();
    }
}
function Skip3() {

    $("#collapseThree").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseFour").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit4").show();
}

function Save4(txt) {


    setTimeout(function () {
        ht = {};
        ht["Basic_Table_ID"] = $("#ID_hidden").val();
        ht["ID"] = $("#txtID").val();

        ht["Name"] = $("#txtEmergencyContactName").val();
        ht["Phone"] = $("#txtEmergencyContactPhone").val();
        ht["Address"] = $("#txtEmergencyContactAddress").val();
        ht["Relationship"] = $("#txtEmergencyContactRelation").val();
        ht["Email"] = $("#txtEmergencyContactEmail").val();

        Req = 'Save4';
        obj = "Save4";
        url = "CreateDriverDetails.aspx/DriverDetails";
        LoadAjaxtruck(ht, obj, Req, url);


    }, 1000);
    if (txt == "savecont") {
        $("#collapseFour").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
        $("#collapseFive").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
        $("#Edit5").show();
    }

}
function Skip4() {

    $("#collapseFour").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseFive").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit5").show();
}
function Clear4() {
    $("#txtID").val('');
    $("#txtEmergencyContactName").val('');
    $("#txtEmergencyContactPhone").val('');
    $("#txtEmergencyContactAddress").val('');
    $("#txtEmergencyContactRelation").val('');
    $("#txtEmergencyContactEmail").val('');
}
function GetContactDetails() {

    Req = 'ContactDetails';
    obj = "Fill";
    url = "CreateDriverDetails.aspx/DriverDetails";
    ht = {};
    ht["ID"] = $("#ID_hidden").val();
    LoadAjaxtruck(ht, obj, Req, url);

}
function ContactEdit(e) {

    $("#txtID").val($(e).closest('tr').find('td:eq(0)').text());

    $("#txtEmergencyContactName").val($(e).closest('tr').find('td:eq(1)').text());
    $("#txtEmergencyContactPhone").val($(e).closest('tr').find('td:eq(2)').text());
    $("#txtEmergencyContactAddress").val($(e).closest('tr').find('td:eq(3)').text());
    $("#txtEmergencyContactRelation").val($(e).closest('tr').find('td:eq(4)').text());
    $("#txtEmergencyContactEmail").val($(e).closest('tr').find('td:eq(5)').text());

}
function ContactDelete(id) {
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
    Req = 'Delete4';
    obj = "Delete4";
    url = "CreateDriverDetails.aspx/DriverDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxtruck(ht, obj, Req, url);
});
}


function Save5(txt) {


    setTimeout(function () {
        ht = {};
        ht["Basic_Table_ID"] = $("#ID_hidden").val();
        ht["ID"] = $("#txtID5").val();

        ht["Address_Type"] = $("#cmbAddressType :selected").val();
        ht["Country"] = $("#cmbCountry1 :selected").val();
        ht["State"] = $("#cmbState1 :selected").val();

        ht["City"] = $("#txtCity").val();
        ht["Address1"] = $("#txtAddress1").val();
        ht["Zip_Code"] = $("#txtZipCode").val();
        ht["Address2"] = $("#txtAddress2").val();
        ht["OtherAddress"] = $("#txtOtherAddress").val();

        Req = 'Save5';
        obj = "Save5";
        url = "CreateDriverDetails.aspx/DriverDetails";
        LoadAjaxtruck(ht, obj, Req, url);


    }, 1000);
    if (txt == "savecont") {
        $("#collapseFive").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
        $("#collapseSix").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
        $("#Edit6").show();
    }

}
function Skip5() {

    $("#collapseFive").removeClass("panel-collapse collapse in").addClass("panel-collapse collapse");
    $("#collapseSix").removeClass("panel-collapse collapse").addClass("panel-collapse collapse in");
    $("#Edit6").show();
}
function Clear5() {
    $("#txtID5").val('');

    $("#cmbAddressType").val('').trigger('change');
    $("#cmbCountry1").val('').trigger('change');
    $("#cmbState1").val('').trigger('change');

    $("#txtCity").val('');
    $("#txtAddress1").val('');
    $("#txtZipCode").val('');
    $("#txtAddress2").val('');
    $("#txtOtherAddress").val('');

}
function GetAddressDetails() {

    Req = 'AddressDetails';
    obj = "Fill";
    url = "CreateDriverDetails.aspx/DriverDetails";
    ht = {};
    ht["ID"] = $("#ID_hidden").val();
    LoadAjaxtruck(ht, obj, Req, url);

}
function AddressEdit(e) {

    $("#txtID5").val($(e).closest('tr').find('td:eq(0)').text());


    $("#cmbCountry1 option").each(function () {
        if ($(this).val().trim() == $(e).closest('tr').find('td:eq(2)').text()) {
            $(this).attr("selected", "selected");
            $(this).prop('selected', true).trigger('change');
        }
    });
    setTimeout(function () {
        $("#cmbState1 option").each(function () {
            if ($(this).val().trim() == $(e).closest('tr').find('td:eq(4)').text()) {
                $(this).attr("selected", "selected");
                $(this).prop('selected', true).trigger('change');
            }
        });
    }, 1000);
    $("#cmbAddressType option").each(function () {
        if ($(this).val().trim() == $(e).closest('tr').find('td:eq(1)').text()) {
            $(this).attr("selected", "selected");
            $(this).prop('selected', true).trigger('change');
        }
    });

    $("#txtCity").val($(e).closest('tr').find('td:eq(6)').text());
    $("#txtAddress1").val($(e).closest('tr').find('td:eq(7)').text());
    $("#txtZipCode").val($(e).closest('tr').find('td:eq(8)').text());
    $("#txtAddress2").val($(e).closest('tr').find('td:eq(9)').text());
    $("#txtOtherAddress").val($(e).closest('tr').find('td:eq(10)').text());

}
function AddressDelete(id) {
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
    url = "CreateDriverDetails.aspx/DriverDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxtruck(ht, obj, Req, url);
});
}


function Save6() {

    setTimeout(function () {
        ht = {};
        ht["Basic_Table_ID"] = $("#ID_hidden").val();
        ht["Facebook"] = $("#txtFacebook").val();
        ht["LinkedIn"] = $("#txtLinkedIn").val();
        ht["Blog"] = $("#txtBlog").val();
        ht["Notes_Description"] = $("#txtNotesandDescription").val();
        ht["Twitter"] = $("#txtTwitter").val();
        ht["Google"] = $("#txtGoogle").val();
        ht["Tumblr"] = $("#txtTumblr").val();

        if ($("#ID_hidden").val() != "") {
            ht["MODE"] = "UPDATE";
        }
        else {
            ht["MODE"] = "INSERT";
        }

        Req = 'Save6';
        obj = "Save6";
        url = "CreateDriverDetails.aspx/DriverDetails";
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
    window.location = 'DriverDetailsList.aspx';
}


//Flat red color scheme for iCheck
$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass: 'iradio_flat-green'
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
});

$("#cmbPaymentType").change(function () {

    if ($('#cmbPaymentType').val() == "1") {
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

$("#cmbAddressType").change(function () {

    if ($('#cmbAddressType').val() == "3") {
        $("#DivOtherAddress").show();
    }
    else {
        $("#DivOtherAddress").hide();
        $('#txtOtherAddress').val("");
    }
});
function validationcheck1() {
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
    return true;
}
function validationcheck3() {
    if ($('#txtDriverNameAccnt').val() == "" || $('#txtDriverNameAccnt').val() == null) {
        popupErrorMsg($("#txtDriverNameAccnt"), "Driver Name is Required.", 5);

        return false;
    }
    if ($('#txtWorkEmailAccnt').val() == "" || $('#txtWorkEmailAccnt').val() == null) {
        popupErrorMsg($("#txtWorkEmailAccnt"), "Email ID is Required.", 5);

        return false;
    }
    //if ($('#txtPasswordAccnt').val() == "" || $('#txtPasswordAccnt').val() == null) {
    //    popupErrorMsg($("#txtPasswordAccnt"), "Password is Required.", 5);

    //    return false;
    //}

    if ($('#cmbRole').val() == "" || $('#cmbRole').val() == null) {
        popupErrorMsg($("#cmbRole"), "Right is Required.", 5);

        return false;
    }
    return true;
}
function validationcheck4() {
    if ($('#txtEmergencyContactName').val() == "" || $('#txtEmergencyContactName').val() == null) {
        popupErrorMsg($("#txtEmergencyContactName"), "Contact Name is Required.", 5);

        return false;
    }
    if ($('#txtEmergencyContactPhone').val() == "" || $('#txtEmergencyContactPhone').val() == null) {
        popupErrorMsg($("#txtEmergencyContactPhone"), "Phone Number is Required.", 5);

        return false;
    }
    return true;
}
function validationcheck5() {
    if ($('#cmbAddressType').val() == "" || $('#cmbAddressType').val() == null) {
        popupErrorMsg($("#cmbAddressType"), "Address Type is Required.", 5);

        return false;
    }
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
    if ($('#txtAddress1').val() == "" || $('#txtAddress1').val() == null) {
        popupErrorMsg($("#txtAddress1"), "Address is Required.", 5);

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
        url: 'ImageUploadHandlerTruck.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                $("#LogoPath").val("TruckPhoto/" + status); // id comming from html page             
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
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        dom: 'C<"clear">lfrtip',
        colVis: {
            exclude: [0]
        }
    });
}


$(function () {
    $('input[id$=txtDriverName]').keyup(function () {
        var txtClone = $(this).val();
        $('input[id$=txtDriverNameAccnt]').val(txtClone);
    });

    $('input[id$=txtWorkEmail]').keyup(function () {
        var txtClone = $(this).val();
        $('input[id$=txtWorkEmailAccnt]').val(txtClone);
    });

    $('input[id$=txtWorkPhone]').keyup(function () {
        var txtClone = $(this).val();
        $('input[id$=txtWorkPhoneAccnt]').val(txtClone);
    });
});
$('#CmbEndorsement').on('change', function () {
    cmdEndorsementMultiselectValues = $(this).val();// pass    
});


