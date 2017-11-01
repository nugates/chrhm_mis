var ht = {};
var Req = "";
var obj = "";
var Procedure = "";
var Action = "";

var _allowadd, _allowedit, _allowdelete;

$(document).ready(function () {
    //localStorage.setItem('MENU', '<li><a href="CompanyList.aspx"><i class="fa fa-cog"></i><span>Company List</span></a></li>');


    // *******************************start permissionm**************************
    //permissionforlist('CompanyList.aspx', 'CreateCompany.aspx', 'btn_create');
    // *******************************end permissionm**************************

    setTimeout(function () {
        GetCompanyDetails();
    }, 2000);

});

function Proceed(companyId) {
    //localStorage.setItem('MENU', '<li><a href="CompanyList.aspx"><i class="fa fa-cog"></i><span>Company List</span></a></li><li><a href="BranchList.aspx"><i class="fa fa-cog"></i><span>List of Locations</span></a></li>');
    window.location.replace('BranchList.aspx?Company_ID=' + companyId + '');
}
function GetCompanyDetails() {
    Req = 'CompanyList';
    obj = "Fill";
    url = "CompanyList.aspx/CompanyDetails";
    ht = {};
    LoadAjaxCompany(ht, obj, Req, url);
}
function LoadAjaxCompany(ht, obj, Req, url) {
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
                var data = jQuery.parseJSON(Result.d.CompanyData);
                var table = '<table id="companyList" class="table table-bordered table-striped">';
                table = table + '<thead><tr><th style="display:none">Company ID</th><th>Company Name</th><th>CEO Name</th><th>Phone#</th><th>Email ID</th><th>Address</th><th class=' + _allowedit + '>Edit</th><th class=' + _allowedit + '>Profile</th><th  class=' + _allowdelete + '>Status</th><th>Proceed</th></tr></thead> <tbody>';
                $.each(data, function (i, item) {
                    if (item.Status == 1) {
                        statusclass = 'btn-success';
                        Text = 'Active';
                    } else {
                        statusclass = 'btn-danger';
                        Text = 'In-Active';
                    }
                    table = table + "<tr><td style='display:none' >" + item.ID +
                                    "</td><td>" + item.CompanyName +
                                    "</td><td>" + item.CEOName +
                                    "</td><td>" + item.PhoneNo +
                                    "</td><td>" + item.Email +
                                    "</td><td>" + item.Address +
                                    "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=CompanyEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowedit + "' align='center'> <button type='button' onclick=CompanyProfileEdit(" + item.ID + ") class='btn btn-default btn-sm' id='btnedit' > <span class='glyphicon glyphicon-edit'></span> </button></td>" +
                                    "</td>" +
                                    "<td class='Edit " + _allowdelete + "' align='center'> <button type='button' onclick=DeleteCompany(" + item.ID + ") class='btn btn-default btn-sm' id='btndelete' > <span class='glyphicon glyphicon-trash'></span> </button></td>" +
                                    "<td> <input class='btn-success btn ' onclick=Proceed(" + item.ID + ") type='button'  value='Proceed ' /></td></tr>"
                });
                document.getElementById("companyListDiv").innerHTML = table + '</tbody></table>';
                setTimeout(function () {
                    ShortTable('#companyList');
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

                        GetCompanyDetails();

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
    window.location = 'CreateCompany.aspx';
}


function CompanyEdit(id) {
    var bt = btoa("cid=" + id + "");
    //window.location = 'CreateCompany.aspx?cid=' + id;
    window.location = 'CreateCompany.aspx?' + bt;
}
function CompanyProfileEdit(id) {
    var bt = btoa("cid=" + id + "");
    window.location = 'Company_Profile.aspx?cid=' + id;
    // window.location = 'Company_Profile.aspx?' + bt;
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
    url = "CompanyList.aspx/CompanyDetails";
    ht = {};
    ht["COMPANY_ID"] = id;
    LoadAjaxCompany(ht, obj, Req, url);
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


