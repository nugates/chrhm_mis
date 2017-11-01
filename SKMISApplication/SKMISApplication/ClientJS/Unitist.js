var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;
$(document).ready(function () {


    // *******************************start permissionm**************************
    permissionforlist('UnitList.aspx', 'CreateUnit.aspx', 'btn_create');
    // *******************************end permissionm**************************
    setTimeout(function () {
        GetTruckDetails();
    }, 2000);

});
function GetTruckDetails() {
    Req = 'TruckList';
    obj = "Fill";
    url = "UnitList.aspx/TruckDetails";
    ht = {};
    LoadAjaxTruck(ht, obj, Req, url);
}
function LoadAjaxTruck(ht, obj, Req, url) {
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
                return 0;
            }

            if (obj == "Fill") {
                var data = jQuery.parseJSON(Result.d.TruckData);
                var table = '<table id="truckList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">Truck ID</th><th>Unit</th><th>Unit Description</th><th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                $.each(data, function (i, item) {
                    if (item.Status == 1) {
                        statusclass = 'btn-success';
                        Text = 'Active';
                    } else {
                        statusclass = 'btn-danger';
                        Text = 'In-Active';
                    }
                    table = table + "<tr><td style='display:none' >" + item.ID +
                                    "</td><td>" + item.Unit_Name +
                                    "</td><td>" + item.Unit_Description +
                                    "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=TruckEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=DeleteTruck(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "</tr>"
                });
                document.getElementById("turckListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function () {
                    ShortTable('#truckList');
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



                //GetTruckDetails();
                //alert("deleted successfully.");
            }
        }
    });
}
function redirect() {
    window.location = 'CreateUnit.aspx';
}


function TruckEdit(id) {
    var bt = btoa("tid=" + id + "");
    window.location = 'CreateUnit.aspx?' + bt;
}
function DeleteTruck(id) {
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
    url = "UnitList.aspx/TruckDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxTruck(ht, obj, Req, url);  
});



    //swal({
    //    title: 'Are you sure you want to delete?',
    //    text: "",
    //    type: 'warning',
    //    showCancelButton: true,
    //    confirmButtonColor: '#3085d6',
    //    cancelButtonColor: '#d33',
    //    confirmButtonText: 'Yes!'
    //}).then(function () {

    //});



    //if (confirm("Are you sure you want to delete?")) {
    //    Req = 'Delete';
    //    obj = "Delete";
    //    url = "TruckList.aspx/TruckDetails";
    //    ht = {};
    //    ht["COMPANY_ID"] = id;
    //    LoadAjaxTruck(ht, obj, Req, url);
    //}
    //return false;
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


