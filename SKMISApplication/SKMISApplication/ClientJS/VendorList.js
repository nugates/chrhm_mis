var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;
$(document).ready(function () {


    // *******************************start permissionm**************************
    permissionforlist('VendorList.aspx', 'CreateVendor.aspx', 'btn_create');
    // *******************************end permissionm**************************

    setTimeout(function () {
        GetAddressDetails();
    }, 2000);

});
function GetAddressDetails() {
    Req = 'AddressList';
    obj = "Fill";
    url = "VendorList.aspx/AddressDetails";
    ht = {};
    LoadAjaxAddress(ht, obj, Req, url);
}
function LoadAjaxAddress(ht, obj, Req, url) {
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
                var data = jQuery.parseJSON(Result.d.AddressData);
                var table = '<table id="AddressList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">ID</th><th>Company Name</th><th>Cell#</th><th>Phone#</th><th>Email ID</th><th>Website</th><th>Contact</th><th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete+ '>Delete</th></tr></thead> <tbody>';
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
                                    "</td><td>" + item.CellNo +
                                     "</td><td>" + item.PhoneNo +
                                    "</td><td>" + item.Email +
                                    "</td><td>" + item.WebsiteUrl +
                                     "</td><td>" + item.Contact +
                                    "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=AddressEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=DeleteAddress(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "</tr>"
                });
                document.getElementById("AddressListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function () {
                    ShortTable('#AddressList');
                }, 100);
            }
            if (obj == "Delete") {

                if (Result.d.AddressData != "" && Result.d.AddressData != undefined) {
                    var json = jQuery.parseJSON(Result.d.AddressData)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: json.CustomMessage,
                            text: "",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

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



                //GetCompanyDetails();
                //alert("deleted successfully.");
            }

            $('body').pleaseWait('stop');
        }
    });
}
function redirect() {
    window.location = 'CreateVendor.aspx';
}


function AddressEdit(id) {
    var bt = btoa("aid=" + id + "");
    //window.location = 'CreateCompany.aspx?cid=' + id;
    window.location = 'CreateVendor.aspx?' + bt;
}
function DeleteAddress(id) {
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
    url = "VendorList.aspx/AddressDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxAddress(ht, obj, Req, url);
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


