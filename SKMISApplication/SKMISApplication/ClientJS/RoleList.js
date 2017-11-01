var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;
$(document).ready(function () {

    // *******************************start permissionm**************************
    permissionforlist('RoleList.aspx', 'CreateRole.aspx', 'btn_create');
    // *******************************end permissionm**************************

    setTimeout(function () {
        GetRoleDetails();
    }, 2000);
});
function GetRoleDetails() {
    Req = 'RoleList';
    obj = "Fill";
    url = "RoleList.aspx/RoleDetails";
    ht = {};
    LoadAjaxRole(ht, obj, Req, url);
}
function LoadAjaxRole(ht, obj, Req, url) {
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
                var data = jQuery.parseJSON(Result.d.RoleData);
                var table = '<table id="RoleList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">Role ID</th><th>Right</th><th>Short Name</th><th>Description</th><th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th><th>Proceed</th></tr></thead> <tbody>';
                $.each(data, function (i, item) {
                    if (item.Status == 1) {
                        statusclass = 'btn-success';
                        Text = 'Active';
                    } else {
                        statusclass = 'btn-danger';
                        Text = 'In-Active';
                    }
                    table = table + "<tr><td style='display:none' >" + item.ID +
                                    "</td><td>" + item.Name +
                                    "</td><td>" + item.Short_Name +
                                    "</td><td>" + item.Description +
                                    "<td class='Edit " + _allowedit + "' align='Left'> <button type='button' onclick=RoleEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='Left'> <button type='button' onclick=DeleteRole(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                  "<td> <input class='btn-success btn ' onclick=Proceed(" + item.ID + ") type='button'  value='Proceed ' /></td></tr>"
                });
                document.getElementById("RoleListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function () {
                    ShortTable('#RoleList');
                }, 100);
            }
            if (obj == "Delete") {
                if (Result.d.CompanyData != "" && Result.d.CompanyData != undefined) {
                    var json = jQuery.parseJSON(Result.d.CompanyData)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: json.CustomMessage,
                            text: "",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

                        GetRoleDetails();

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
function redirect() {
    window.location = 'CreateRole.aspx';
}
function Proceed(id) {

    window.location = 'Permission.aspx?roleId=' + id;

}

function RoleEdit(id) {
    window.location = 'CreateRole.aspx?rid=' + id;
}
function DeleteRole(id) {
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
    url = "RoleList.aspx/RoleDetails";
    ht = {};
    ht["Role_ID"] = id;
    LoadAjaxRole(ht, obj, Req, url);
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


