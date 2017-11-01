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
        GetTruckDetails();
    }, 2000);

});


function GetTruckDetails() {
    Req = 'TruckList';
    obj = "Fill";
    url = "TruckDetailsList.aspx/TruckDetails";
    ht = {};
    LoadAjaxtruck(ht, obj, Req, url);
}
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

            if (obj == "Fill") {
                var data = jQuery.parseJSON(Result.d.TruckData);
                var table = '<table id="TruckList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">ID</th><th>Unit Number</th><th>Owner</th><th>VIN</th><th>Title No</th><th>License Plate No</th><th>Insurance Name</th><th class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                $.each(data, function (i, item) {
                    if (item.Status == 1) {
                        statusclass = 'btn-success';
                        Text = 'Active';
                    } else {
                        statusclass = 'btn-danger';
                        Text = 'In-Active';
                    }
                    table = table + "<tr><td style='display:none' >" + item.ID +
                                    "</td><td>" + item.Unit_Number +
                                    "</td><td>" + item.Owner +
                                    "</td><td>" + item.VIN +
                                    "</td><td>" + item.Title_No +
                                    "</td><td>" + item.License_Plate_No +
                                    "</td><td>" + item.Insurance_Name +
                                    "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=TruckDetailsEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=DeleteCompany(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "</tr>"
                });
                document.getElementById("TruckListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function () {
                    ShortTable('#TruckList');
                }, 100);
            }
            if (obj == "Delete") {

                if (Result.d.TruckData != "" && Result.d.TruckData != undefined) {
                    var json = jQuery.parseJSON(Result.d.TruckData)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: json.CustomMessage,
                            text: "",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

                        GetTruckDetails();

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


function TruckDetailsEdit(id) {
    var bt = btoa("BTid=" + id + "");
    //window.location = 'CreateCompany.aspx?cid=' + id;
    window.location = 'CreateTruckDetails.aspx?' + bt;
}

function redirect() {
    window.location = 'CreateTruckDetails.aspx';
}

function DeleteCompany(id) {
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
    url = "TruckDetailsList.aspx/TruckDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxtruck(ht, obj, Req, url);
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


