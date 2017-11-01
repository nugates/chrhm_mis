var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";
var _allowadd, _allowedit, _allowdelete;
$(document).ready(function () {


    // *******************************start permissionm**************************
    permissionforlist('ExpenseCategoryList.aspx', 'CreateExpenseCategory.aspx', 'btn_create');
    // *******************************end permissionm**************************
    setTimeout(function () {
        GetExpenseCategoryDetails();
    }, 2000);

});
function GetExpenseCategoryDetails() {
    Req = 'GetExpenseCategoryList';
    obj = "Fill";
    url = "ExpenseCategoryList.aspx/ExpenseCategoryListDetails";
    ht = {};
    LoadAjaxExpenseCategory(ht, obj, Req, url);
}
function LoadAjaxExpenseCategory(ht, obj, Req, url) {
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
                var data = jQuery.parseJSON(Result.d.ExpenseCategoryData);
                var table = '<table id="ExpenseCategoryList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">ID</th><th>Expense Category</th><th>Expense Category Description</th><th  class=' + _allowedit + '>Edit</th><th  class=' + _allowdelete + '>Delete</th></tr></thead> <tbody>';
                $.each(data, function (i, item) {
                    if (item.Status == 1) {
                        statusclass = 'btn-success';
                        Text = 'Active';
                    } else {
                        statusclass = 'btn-danger';
                        Text = 'In-Active';
                    }
                    table = table + "<tr><td style='display:none' >" + item.ID +
                                    "</td><td>" + item.ExpenseCategory_Name +
                                    "</td><td>" + item.ExpenseCategory_Description +
                                    "<td class='Edit " + _allowedit + "' align='Left'> <button type='button' onclick=ExpenseCategoryEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='Left'> <button type='button' onclick=DeleteExpenseCategory(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "</tr>"
                });
                document.getElementById("ExpenseCategoryListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function () {
                    ShortTable('#ExpenseCategoryList');
                }, 100);
            }
            if (obj == "Delete") {
              
                if (Result.d.ExpenseCategoryData != "" && Result.d.ExpenseCategoryData != undefined) {
                    var json = jQuery.parseJSON(Result.d.ExpenseCategoryData)[0];

                    if (json.CustomErrorState == "0") {

                        swal({
                            title: json.CustomMessage,
                            text: "",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        
                        GetExpenseCategoryDetails();

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
        }
    });
}
function redirect() {
    window.location = 'CreateExpenseCategory.aspx';
}


function ExpenseCategoryEdit(id) {
    var bt = btoa("tid=" + id + "");
    window.location = 'CreateExpenseCategory.aspx?' + bt;
}
function DeleteExpenseCategory(id) {
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
    url = "ExpenseCategoryList.aspx/ExpenseCategoryListDetails";
    ht = {};
    ht["ID"] = id;
    LoadAjaxExpenseCategory(ht, obj, Req, url);
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


