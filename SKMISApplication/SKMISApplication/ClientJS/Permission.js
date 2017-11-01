var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {

    var roleId = GetParameterValues('roleId');
    function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
    }


    // *******************************start permissionm**************************
    permissionforlist('Permission.aspx', 'btnsave', 'RoleList.aspx', 'btnCancel');
    // *******************************end permissionm**************************

    setTimeout(function () {  
    if (roleId == undefined) {

    }
    else {

        Get_Details(roleId);
    }
    }, 2000);
});

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

            if (obj == "Insert") {
                if (Result.d.SaveAllMenuPermission != "" && Result.d.SaveAllMenuPermission != undefined) {
                    var json = jQuery.parseJSON(Result.d.SaveAllMenuPermission)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: "",
                            text: json.CustomMessage,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#5cb85c",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: false,
                            timer: 2000
                        },
                   function () {
                       window.location = 'RoleList.aspx';
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


                //var json = jQuery.parseJSON(Result.d.SaveAllMenuPermission);
                //swal("", "Role updated Succesfully..!!", "success");

            }

            if (obj == "Fill") {
                var data = '';
                var data = jQuery.parseJSON(Result.d.GetPermissionList);

                $('#header').text('PERMISSION');
                $('#example').dataTable({
                    "bDestroy": true
                }).fnDestroy();

                var table = $('#example').DataTable({

                    "data": data.data,
                    "columns": [
                        {
                            "className": 'details-control',
                            "orderable": false,
                            "data": null,
                            "defaultContent": ''
                        },
                        { "data": "Permission_ID", "className": 'dontshow' },
                        { "data": "MenuID", "className": 'dontshow' },
                        { "data": "MenuName" },
                        //{ "data": "B_View", template: "{common.checkbox()}" },
                        {
                            "data": "B_View",
                            "mRender": function (data, type, full) {
                                if (data == "1" || data == "true" || data == "True") {
                                    return '<input type=\"checkbox\" class="view" onchange="Check_Single()" checked ="true">';
                                } else {
                                    return '<input type=\"checkbox\"  class="view" onchange="Check_Single()" value="' + data + '">';
                                }
                            },
                            "orderable": false
                        },
                        //{ "data": "B_Add" },
                        {
                            "data": "B_Add",
                            "mRender": function (data, type, full) {
                                if (data == "1" || data == "true" || data == "True") {
                                    return '<input type=\"checkbox\" onchange="Check_Single()"  class="add" checked ="true">';
                                } else {
                                    return '<input type=\"checkbox\" onchange="Check_Single()"  class="add" value="' + data + '">';
                                }
                            },
                            "orderable": false
                        },
                        //{ "data": "B_Edit" },
                        {
                            "data": "B_Edit",
                            "mRender": function (data, type, full) {
                                if (data == "1" || data == "true" || data == "True") {
                                    return '<input type=\"checkbox\" onchange="Check_Single()"  class="edit" checked ="true">';
                                } else {
                                    return '<input type=\"checkbox\" onchange="Check_Single()"  class="edit" value="' + data + '">';
                                }
                            },
                            "orderable": false
                        },
                        //{ "data": "B_Delete" },
                        {
                            "data": "B_Delete",
                            "mRender": function (data, type, full) {
                                if (data == "1" || data == "true" || data == "True") {
                                    return '<input type=\"checkbox\" onchange="Check_Single()"  class="delete" checked ="true">';
                                } else {
                                    return '<input type=\"checkbox\" onchange="Check_Single()"  class="delete" value="' + data + '">';
                                }
                            },
                            "orderable": false
                        },
                        //{ "data": "B_Payment" }
                        {
                            "data": "B_Payment",
                            "mRender": function (data, type, full) {
                                if (data == "1" || data == "true" || data == "True") {
                                    return '<input type=\"checkbox\" onchange="Check_Single()"  class="payment" checked ="true" style="display: none;">';
                                } else {
                                    return '<input type=\"checkbox\" onchange="Check_Single()"  class="payment" value="' + data + '" style="display: none;">';
                                }
                            },
                            "orderable": false
                        }
                    ],
                    "order": [[1, 'asc']],
                    "paging": false
                });
                CheckifAllCheckboxIsCheckedWhileLodingPermission();
            }

            $('body').pleaseWait('stop');
        }
    });
}
function InsertRow() {
    Req = 'SaveAllMenuPermission';
    obj = "Insert";
    url = "Permission.aspx/RoleDetailsList";
    var PermissionID = "", MenuID = "", B_Add = "", B_Edit = "", B_Delete = "", B_View = "", B_Payment = "";
    $("#example tbody tr").each(function () {
        if ($(this).children("th").length > 0) {
            return;
        }
        PermissionID = PermissionID + $(this).children("td:nth-child(2)").text() + ",";
        MenuID = MenuID + $(this).children("td:nth-child(3)").text() + ",";
        B_Add = B_Add + $(this).find(".add").is(":checked") + ",";
        B_Edit = B_Edit + $(this).find(".edit").is(":checked") + ",";
        B_Delete = B_Delete + $(this).find(".delete").is(":checked") + ",";
        B_View = B_View + $(this).find(".view").is(":checked") + ",";
        B_Payment = B_Payment + $(this).find(".payment").is(":checked") + ",";
    });
    ht = {};
    ht["PermissionID"] = PermissionID;
    ht["MenuID"] = MenuID;
    ht["B_Add"] = B_Add;
    ht["B_Edit"] = B_Edit;
    ht["B_Delete"] = B_Delete;
    ht["B_View"] = B_View;
    ht["B_Payment"] = B_Payment;
    ht["roleid"] = $("#txtrole").val();
    LoadAjaxRole(ht, obj, Req, url);
}
function GetAllRole(Result) {
    var data = jQuery.parseJSON(Result.d.GetRoleList);
    var table = '<table id="example1" class="table table-bordered table-hover resizable">';
    table = table + '<thead><tr><th style="display:none" >Role ID</th><th>Role Name</th><th>Edit</th><th style="width:15%;">Proceed</th></tr></thead> <tbody>';
    $.each(data, function (i, item) {
        table = table + " <tr><td style='display:none' >" + item.Role_ID +
                        "</td><td>" + item.Role_Name +
                        "<td class='Edit' > <button type='button' onclick='RoleEdit(" + item.Role_ID + ")' class='btn_rk btn-default_rk btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                        "<td> <input class='btn-success btn_rk' onclick= Proceed(\'" + encodeURIComponent(item.Role_ID) + '\',\'' + encodeURIComponent(item.Role_Name) + "\') type='button'  value='proceed' /></td></tr>"
    });
    document.getElementById("RoleDetails").innerHTML = table + '</tbody></table>';
    ShortTable('#example1');
}
function ShortTable(Tbl) {
    $(Tbl).DataTable({
        "paging": false,
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
function Get_Details(roleId) {

    $('#txtrole').val(roleId);
    Req = 'GetPermissionList';
    ht["roleid"] = roleId;
    obj = "Fill";
    url = "Permission.aspx/RoleDetailsList";
    LoadAjaxRole(ht, obj, Req, url);
}
function GetAllPermission(Result) {
    $('#example').dataTable({
        "bDestroy": true,
        "paging": false
    }).fnDestroy();
    var data = '';
    data = jQuery.parseJSON(Result.d.GetPermissionList);
    var table = $('#example').DataTable({
        "data": data.data,
        "columns": [
            {
                "className": 'details-control2',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            { "data": "Permission_ID" },
            { "data": "MenuID" },
            { "data": "MenuName" },
            { "data": "B_View" },
            { "data": "B_Add" },
            { "data": "B_Edit" },
            { "data": "B_Delete" },
            { "data": "B_Payment" }
        ],
        "bDestroy": true,
        "order": [[1, 'asc']],
        "paging": false
    }).fnDestroy();

}
function Check_All() {
    for (var i = 0; i <= document.getElementsByClassName("add").length; i++) {

        if (document.getElementById("Allchkbox").checked == true) {
            document.getElementsByClassName("add")[i].checked = true;
            document.getElementsByClassName("edit")[i].checked = true;
            document.getElementsByClassName("delete")[i].checked = true;
            document.getElementsByClassName("view")[i].checked = true;
            document.getElementsByClassName("payment")[i].checked = true;
            //  document.getElementsByClassName("payment")[i].checked = true;
            document.getElementById("ViewRowchkbox").checked = true;
            document.getElementById("AddRowchkbox").checked = true;
            document.getElementById("EditRowchkbox").checked = true;
            document.getElementById("DeleteRowchkbox").checked = true;
            document.getElementById("PaymentRowchkbox").checked = true;
        }
        else {
            document.getElementsByClassName("add")[i].checked = false;
            document.getElementsByClassName("edit")[i].checked = false;
            document.getElementsByClassName("delete")[i].checked = false;
            document.getElementsByClassName("view")[i].checked = false;
            document.getElementsByClassName("payment")[i].checked = false;
            document.getElementById("ViewRowchkbox").checked = false;
            document.getElementById("AddRowchkbox").checked = false;
            document.getElementById("EditRowchkbox").checked = false;
            document.getElementById("DeleteRowchkbox").checked = false;
            document.getElementById("PaymentRowchkbox").checked = false;
        }
    }
}
function Check_AllColoumn(className, IdCheck) {
    //

    for (var i = 0; i <= document.getElementsByClassName(className).length; i++) {
        if (document.getElementById(IdCheck).checked == true) {
            document.getElementsByClassName(className)[i].checked = true;
        }
        else {
            document.getElementsByClassName(className)[i].checked = false;
            //   document.getElementById("Allchkbox").checked = false;
        }
    }
    CheckAllHeader();
}
function CheckAllHeader() {
    if ((document.getElementById("ViewRowchkbox").checked == true) &&
        (document.getElementById("AddRowchkbox").checked == true) &&
        (document.getElementById("EditRowchkbox").checked == true) &&
        (document.getElementById("DeleteRowchkbox").checked == true) &&
        (document.getElementById("PermissionRowchkbox").checked == true)
        ) {
        document.getElementById("Allchkbox").checked = true;
    }
    else {
        document.getElementById("Allchkbox").checked = false;
    }
}
function UncheckAllCheckBox() {
    for (var i = 0; i <= document.getElementsByClassName("add").length; i++) {

        document.getElementsByClassName("add")[i].checked = false;
        document.getElementsByClassName("edit")[i].checked = false;
        document.getElementsByClassName("delete")[i].checked = false;
        document.getElementsByClassName("view")[i].checked = false;
    }
    document.getElementById("Allchkbox").checked = false;
    CheckWithValue(false);
}
function CheckifAllCheckboxIsCheckedWhileLodingPermission() {
    if (($('input[class="add"]').length == $('input[class="add"]:checked').length)) {
        document.getElementById("AddRowchkbox").checked = true;
    }
    else {
        document.getElementById("AddRowchkbox").checked = false;
    }
    if (($('input[class="edit"]').length == $('input[class="edit"]:checked').length)) {
        document.getElementById("EditRowchkbox").checked = true;
    }
    else {
        document.getElementById("EditRowchkbox").checked = false;
    }

    if (($('input[class="delete"]').length == $('input[class="delete"]:checked').length)) {
        document.getElementById("DeleteRowchkbox").checked = true;
    }
    else {
        document.getElementById("DeleteRowchkbox").checked = false;
    }

    if (($('input[class="view"]').length == $('input[class="view"]:checked').length)) {
        document.getElementById("ViewRowchkbox").checked = true;
    }
    else {
        document.getElementById("ViewRowchkbox").checked = false;
    }
    if (($('input[class="payment"]').length == $('input[class="payment"]:checked').length)) {
        document.getElementById("PaymentRowchkbox").checked = true;
    }
    else {
        document.getElementById("PaymentRowchkbox").checked = false;
    }
}
function viewallclick() {

    Check_AllColoumn("view", "ViewRowchkbox");
}
//$("#ViewRowchkbox").click(function () {
//    Check_AllColoumn("view", "ViewRowchkbox");
//});
function addallclick() {
    Check_AllColoumn("add", "AddRowchkbox");
}
function editallclick() {
    Check_AllColoumn("edit", "EditRowchkbox");
}
function deleteallclick() {
    Check_AllColoumn("delete", "DeleteRowchkbox");
}
//$("#PaymentRowchkbox").click(function () {
//    Check_AllColoumn("payment", "PaymentRowchkbox");
//});
function Check_Single() {
    CheckifAllCheckboxIsCheckedWhileLodingPermission();
}



function redirect() {
    //alert("Hello! I am an alert box!!");

    window.location = 'RoleList.aspx';
}
