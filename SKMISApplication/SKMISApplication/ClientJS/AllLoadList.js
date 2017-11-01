var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;
$(document).ready(function () {


    //// *******************************start permissionm**************************
    //permissionforlist('TaxList.aspx', 'CreateTax.aspx', 'btn_create');
    //// *******************************end permissionm**************************
    setTimeout(function () {
        GetLoadDetails();
    }, 2000);
});
function GetLoadDetails() {
    Req = 'LoadList';
    obj = "Fill";
    url = "AllLoadList.aspx/AllLoadDetails";
    ht = {};
    LoadAjaxLoad(ht, obj, Req, url);
}
function LoadAjaxLoad(ht, obj, Req, url) {
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
                var Complete_Status
                var Text_complete
                var Complete_Status
                var Text_complete
                var statusclass_complete
                var statusclass_cancel
                var data = jQuery.parseJSON(Result.d.LoadData);
                var table = '<table id="LoadList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">Load ID</th><th>Load Number</th><th>Load Type</th><th>Type</th><th>Name</th><th>Load Date</th><th>Load Time</th><th>Reference</th><th>Complete Status</th><th>Cancel Status</th><th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                $.each(data, function (i, item) {
                    if (item.IS_COMPLETE == "False") {
                        Complete_Status=1
                        statusclass_complete = 'btn btn-block btn-info';
                        Text_complete = 'Pending';
                    } else {
                        Complete_Status=0
                        statusclass_complete = 'btn btn-block btn-warning';
                        Text_complete = 'Complete';
                    }
                    if (item.IS_CANCEL == "False") {
                        Cancel_Status = 1
                        statusclass_cancel = 'btn btn-block btn-info';
                        Text_cancel = 'Active';
                    } else {
                        Cancel_Status = 0
                        statusclass_cancel = 'btn btn-block btn-warning';
                        Text_cancel = 'Cancelled';
                    }
                    table = table + "<tr><td style='display:none' >" + item.ID +
                                    "</td><td>" + item.Load_Number +
                                    "</td><td>" + item.IsLTLorFTL +
                                     "</td><td>" + item.IsCustCarrORBro +
                                    "</td><td>" + item.Name +
                                     "</td><td>" + item.Load_Date +
                                      "</td><td>" + item.Load_Time +
                                       "</td><td>" + item.Reference +
                                        "</td><td><input id=status_" + item.ID + " data=" + item.IS_COMPLETE + " class='" + statusclass_complete + "'  onclick=setComplete_cancel(" +Complete_Status + "," + item.ID + ",'Complete') type='button' value='" + Text_complete + "' />" +
                                    "</td><td><input id=status_" + item.ID + " data=" + item.IS_CANCEL + " class='" + statusclass_cancel + "'  onclick=setComplete_cancel(" +Cancel_Status + "," + item.ID + ",'Cancel') type='button' value='" + Text_cancel + "' />" +
                                    "<td class='Edit " + _allowedit + "' align='Left'> <button type='button' onclick=LoadEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='Left'> <button type='button' onclick=DeleteLoad(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                   "</tr>"
                });
                document.getElementById("LoadListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function(){
                    ShortTable('#LoadList');
                }, 100);
            }
            if (obj == "Delete")
            {
                if (Result.d.LoadData != "" && Result.d.LoadData != undefined) {
                    var json = jQuery.parseJSON(Result.d.LoadData)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: json.CustomMessage,
                            text: "",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

                        GetLoadDetails();

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
    window.location = 'CreateLoad.aspx';
}

function setComplete_cancel(Status,ID,Mode) {
    swal({
        title: "Are you sure you want to Proceed?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: true
    },
 function () {
     Req = 'Update_Complete_cancel';
     obj = "Update_Complete_cancel";
     url = "AllLoadList.aspx/AllLoadDetails";
     ht = {};
     ht["ID"] = ID;
     ht["STATUS"] = Status;
     ht["MODE"] = Mode;
     LoadAjaxLoad(ht, obj, Req, url);
     GetLoadDetails();
 });

    return false;
}
function LoadEdit(id) {
    var bt = btoa("Did=" + id + "");
    window.location = 'CreateLoad.aspx?' + bt;
}
function DeleteLoad(id) {
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
    url = "AllLoadList.aspx/AllLoadDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxLoad(ht, obj, Req, url);
});

    return false;
}

function ShortTable(Tbl) {
    $(Tbl).DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        dom: 'C<"clear">lfrtip',
        colVis: {
            exclude: [0]
        }
    });
}


