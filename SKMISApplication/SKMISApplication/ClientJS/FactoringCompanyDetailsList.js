/// <reference path="D:\SmartSolution\SmartTrucking24072017\SmartTrucking\CreateTruckDetails.aspx" />
/// <reference path="D:\SmartSolution\SmartTrucking24072017\SmartTrucking\CreateTruckDetails.aspx" />
/// <reference path="D:\SmartSolution\SmartTrucking24072017\SmartTrucking\CreateTruckDetails.aspx" />
var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";

var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {
  //  localStorage.setItem('MENU', '<li><a href="CompanyList.aspx"><i class="fa fa-cog"></i><span>Company List</span></a></li>');


    // *******************************start permissionm**************************
    //permissionforlist('CompanyList.aspx', 'CreateCompany.aspx', 'btn_create');
    // *******************************end permissionm**************************

    setTimeout(function () {
        GetCustomerDetails();
    }, 2000);

});


function GetCustomerDetails() {
    Req = 'CustomerList';
    obj = "Fill";
    url = "FactoringCompanyDetailsList.aspx/CustomerDetails";
    ht = {};
    LoadAjaxCustomer(ht, obj, Req, url);
}
function LoadAjaxCustomer(ht, obj, Req, url) {
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
                var data = jQuery.parseJSON(Result.d.BasicData);
                var table = '<table id="CustomerList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">ID</th><th>Company Name</th><th>DBA Name</th><th>Account Number</th><th>Contact Name</th><th>Phone Number</th><th>Factoring Rate</th><th>Email</th><th class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                $.each(data, function (i, item) {
                    if (item.Status == 1) {
                        statusclass = 'btn-success';
                        Text = 'Active';
                    } else {
                        statusclass = 'btn-danger';
                        Text = 'In-Active';
                    }
                    table = table + "<tr><td style='display:none' >" + item.ID +
                                    "</td><td>" + item.Company_Name +
                                     "</td><td>" + item.DBA_Name +
                                    "</td><td>" + item.Account_Number +
                                    "</td><td>" + item.Contact_Name +
                                    "</td><td>" + item.Phone +
                                    "</td><td>" + item.Factoring_Rate + '&nbsp' + item.Factoring_Rate_Unit +
                                     "</td><td>" + item.Email +
                                    "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=CustomerDetailsEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=DeleteCUstomer(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "</tr>"
                });
                document.getElementById("ShipperListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function () {
                    ShortTable('#CustomerList');
                }, 100);
            }
            if (obj == "Delete") {

                if (Result.d.CustomerData != "" && Result.d.CustomerData != undefined) {
                    var json = jQuery.parseJSON(Result.d.CustomerData)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: json.CustomMessage,
                            text: "",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

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


function CustomerDetailsEdit(id) {
    var bt = btoa("BTid=" + id + "");
    //window.location = 'CreateCompany.aspx?cid=' + id;
    window.location = 'CreateFactoringCompanyDetails.aspx?' + bt;
}

function redirect() {
    window.location = 'CreateFactoringCompanyDetails.aspx';
}

function DeleteCUstomer(id) {
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
    url = "FactoringCompanyDetailsList.aspx/CustomerDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxCustomer(ht, obj, Req, url);
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


