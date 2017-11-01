function permissionforlist(pagelistname, pagename, createbutton) {

    var USERPERMISSIONS = localStorage.getItem('USERPERMISSIONS');

    var obj = jQuery.parseJSON(USERPERMISSIONS);
    var _lUrl, _ladd, _ledit, _ldelete, _lview, _lpay;

    $.each(obj, function (key, value) {

        _lUrl = value.Url;
        _ladd = value.B_Add;
        _ledit = value.B_Edit;
        _ldelete = value.B_Delete;
        _lview = value.B_View;
        _lpay = value.B_Payment;

        //if (_lUrl == 'CompanyList.aspx') {


        if (_lUrl == pagename) {

            if (_lview == false) {

                $('#' + createbutton).hide();
            }

            if (_ladd == "False") {               
                $('#' + createbutton).hide();

            }

        }

        if (_lUrl == pagelistname) {

            if (_lview == false) {

                window.location = 'Login.aspx';
            }
            else {
                //if (_ladd == "False" && _ledit == "False" && _ldelete == "False") {

                //    window.location = 'Login.aspx';
                //}
                //else {                
                if (_ledit == "False") {

                    _allowedit = "permissionhide";
                }
                if (_ldelete == "False") {

                    _allowdelete = "permissionhide";
                }
                //}
            }

        }

    });
}