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

           
            Req = 'Country';
            obj = "Fill";
            url = "CreateCustomerDetails.aspx/CustomerDetails";
            ht = {};
            LoadAjaxtruck(ht, obj, Req, url);
        }
        else {

            $("#btnAdd").show();

            $('#ID_hidden_Basic').val('' + BTid);
            GetBasicDetails();

        }
    }, 2000);

});

function GetBasicDetails() {
    Req = 'Country@Fill1@ContactDetails';
    obj = "Fill";
    url = "CreateCustomerDetails.aspx/CustomerDetails";
    ht = {};
    ht["ID"] = $("#ID_hidden_Basic").val();
    LoadAjaxtruck(ht, obj, Req, url);
}

$("#cmbCountry").change(function () {
    Req = 'State';
    obj = "State";
    url = "CreateCustomerDetails.aspx/CustomerDetails";
    ht = {};
    ht["COUNTRY_ID"] = $("#cmbCountry :selected").val();
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

            if (obj == "Fill") {

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

                if (Result.d.BasicData != "" && Result.d.BasicData != undefined) {
                    var json = jQuery.parseJSON(Result.d.BasicData);

                    $.each(json, function (index, item) {
                        $("#ID_hidden_Basic").val(item.ID);
                        $("#txtCompanyName").val(item.Company_Name);
                        $("#txtAcNo").val(item.Account_Number);
                        $("#txtCity").val(item.City);
                        $("#txtZipCode").val(item.Zip_Code);
                        $("#txtAddress1").val(item.Address1);
                        $("#txtAddress2").val(item.Address2);
                        $("#txtaccntPayableEmail").val(item.Accnt_Payable_Email);
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
                    });
                }


                if (Result.d.ContactDetails != "" && Result.d.ContactDetails != undefined) {
                    var data = jQuery.parseJSON(Result.d.ContactDetails);
                    var table = '<table id="truckList" class="table table-bordered table-striped">';
                    table = table + '<thead><tr><th style="display:none">ID</th><th>Name</th><th>Designationn</th><th>Email</th><th>Phone</th><th>Fax</th><th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                    $.each(data, function (i, item) {

                        table = table + "<tr><td style='display:none' >" + item.ID +
                                       "</td><td>" + item.Contact_Name +
                                       "</td><td>" + item.Designation +
                                         "</td><td>" + item.Email +
                                           "</td><td>" + item.Phone +
                                             "</td><td>" + item.Fax +
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
            if (obj == "Save") {
                if (Result.d.Save != "" && Result.d.Save != undefined) {
                    var json = jQuery.parseJSON(Result.d.Save)[0];

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
            if (obj == "Delete") {
                if (Result.d.Delete != "" && Result.d.Delete != undefined) {
                    var json = jQuery.parseJSON(Result.d.Delete)[0];

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

            $('body').pleaseWait('stop');
        }
    });
}

function GetCustomerDetails() {

    Req = 'ContactDetails';
    obj = "Fill";
    url = "CreateCustomerDetails.aspx/CustomerDetails";
    ht = {};
    ht["ID"] = $("#ID_hidden_Basic").val();
    LoadAjaxtruck(ht, obj, Req, url);

}

function Save() {
    if (validationcheck() == true) {

        setTimeout(function () {

            ht = {};

            ht["ID"] = $("#ID_hidden_Basic").val();
            ht["Company_Name"] = $("#txtCompanyName").val();
            ht["Account_Number"] = $("#txtAcNo").val();
            ht["Country"] = $("#cmbCountry :selected").val();
            ht["State"] = $("#cmbState :selected").val();
            ht["City"] = $("#txtCity").val();
            ht["Zip_Code"] = $("#txtZipCode").val();
            ht["Address1"] = $("#txtAddress1").val();
            ht["Address2"] = $("#txtAddress2").val();
            ht["Accnt_Payable_Email"] = $("#txtaccntPayableEmail").val();


            ht["ContactID"] = $("#txtID").val();
            ht["ContactName"] = $("#txtContactName").val();
            ht["Designation"] = $("#txtDesignation").val();
            ht["ContactEmail"] = $("#txtContactEmail").val();
            ht["ContactPhoneNo"] = $("#txtContactPhoneNo").val();
            ht["ContactFax"] = $("#txtContactFax").val();

            if ($("#ID_hidden_Basic").val() != "") {
                ht["MODE"] = "UPDATE";
            }
            else {
                ht["MODE"] = "INSERT";
            }

            Req = 'Save';
            obj = "Save";
            url = "CreateCustomerDetails.aspx/CustomerDetails";
            LoadAjaxtruck(ht, obj, Req, url);




        }, 1000);


    }
}

function Cancel() {
    window.location = 'CustomerDetailsList.aspx';
}

function validationcheck() {
    if ($('#txtCompanyName').val() == "" || $('#txtCompanyName').val() == null) {
        popupErrorMsg($("#txtCompanyName"), "Company Name is Required.", 5);

        return false;
    }
    if ($('#cmbCountry').val() == "" || $('#cmbCountry').val() == null) {
        popupErrorMsg($("#cmbCountry"), "Country is Required.", 5);

        return false;
    }
    if ($('#cmbState').val() == "" || $('#cmbState').val() == null) {
        popupErrorMsg($("#cmbState"), "State is Required.", 5);

        return false;
    }
    if ($('#txtCity').val() == "" || $('#txtCity').val() == null) {
        popupErrorMsg($("#txtCity"), "City is Required.", 5);

        return false;
    }
    if ($('#txtAddress1').val() == "" || $('#txtAddress1').val() == null) {
        popupErrorMsg($("#txtAddress1"), "Address is Required.", 5);

        return false;
    }

    return true;
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

function ClearAdd() {
    $("#txtID").val('');
    $("#txtContactName").val('');
    $("#txtDesignation").val('');
    $("#txtContactEmail").val('');
    $("#txtContactPhoneNo").val('');
    $("#txtContactFax").val('');
}


function ContactEdit(e) {

    $("#txtID").val($(e).closest('tr').find('td:eq(0)').text());
    $("#txtContactName").val($(e).closest('tr').find('td:eq(1)').text());
    $("#txtDesignation").val($(e).closest('tr').find('td:eq(2)').text());
    $("#txtContactEmail").val($(e).closest('tr').find('td:eq(3)').text());
    $("#txtContactPhoneNo").val($(e).closest('tr').find('td:eq(4)').text());
    $("#txtContactFax").val($(e).closest('tr').find('td:eq(5)').text());
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
    Req = 'Delete';
    obj = "Delete";
    url = "CreateCustomerDetails.aspx/CustomerDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxtruck(ht, obj, Req, url);
});
}