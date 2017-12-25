/* Maximum Length Validation*/

/* Checks when key press Works with all browsers*/
$(document).on("keypress", 'input[maxlength]', function (event) {
    var char = event.which || event.keyCode;
    var actual_len = ($(this).val()).length, limited_len = $(this).attr("maxlength");

    if (char != 8 && char != 46 && char != 37 && char != 39 && char != 9 && char != 13) {
        if (limited_len <= actual_len) {
            popupErrorMsg($(this), "Maximum length limit is: " + limited_len + " characters", 3);
            return false;
        }
    }
});

/* ./Checks when key press*/

/* Checks when focus out from the field*/
$(document).on("blur", 'input[maxlength]', function () {
    var actual_len = ($(this).val()).length,
            limited_len = $(this).attr("maxlength");
    if (limited_len < actual_len) {
        popupErrorMsg($(this), "Maximum length limit is: " + limited_len + " characters", 3);
        $(this).val(($(this).val()).slice(0, limited_len));
        return false;
    }
});

$(document).on("keypress", 'textarea[maxlength]', function () {
    var sel_str = window.getSelection().toString();
    if ((sel_str).trim() != "") {
        var char = event.which || event.keyCode;
        var str = $(this).val();
        str = str.replace(sel_str, String.fromCharCode(char));
        $(this).val(str);
        return false;
    }

    var actual_len = ($(this).val()).length,
            limited_len = $(this).attr("maxlength");
    if (limited_len <= actual_len) {
        popupErrorMsg($(this), "Maximum length limit is: " + limited_len + " characters", 3);
        return false;
    }
});

$(document).on("blur", 'textarea[maxlength]', function () {
    var actual_len = ($(this).val()).length,
            limited_len = $(this).attr("maxlength");
    if (limited_len < actual_len) {
        popupErrorMsg($(this), "Maximum length limit is: " + limited_len + " characters", 3);
        $(this).val(($(this).val()).slice(0, limited_len));
        return false;
    }
});

/* Checking for Alpha numeric value */
/* Checks when key press,  Works with all browsers also disabled Paste in js file*/
$(document).on("keypress", 'input[numericonly]', function (event) {
    var char = event.which || event.keyCode;
    if (char != 8 && char != 46 && char != 37 && char != 39 && char != 9 && char != 13) {
        if (!kmi_isNumeric(String.fromCharCode(char))) {
            popupErrorMsg($(this), "only numeric value allowed", 3);
            return false;
        }
    }
});

/* Checks when focus out from the field*/
$(document).on("blur", 'input[numericonly]', function () {
    var val = parseInt(String($(this).val()).moneyToNumber());
    if (!kmi_isNumeric(val) && val > 0) {
        $(this).val("");
        popupErrorMsg($(this), "Only numeric value allowed", 3);
        return false;
    }
});

/* ./Checking for numeric value */

/* Checking for Alphabets  value */
/* Checks when key press*/
$(document).on("keypress", 'input[alphaonly]', function (event) {
    var char = event.which || event.keyCode;
    if (!kmi_isAlphaOnly(String.fromCharCode(char))) {
        popupErrorMsg($(this), "Only alphabets are allowed", 3);
        return false;
    }
});

/* Checks when focus out from the field*/
$(document).on("blur", 'input[alphaonly]', function () {
    if (!kmi_isAlphaOnly($(this).val())) {
        $(this).val("");
        popupErrorMsg($(this), "Only alphabets are allowed", 3);
        return false;
    }
});
/* ./Checking for Alphabets value */

/* Checking for Decimal  value */
/* Checks when key press*/
$(document).on("keypress", 'input[decimalonly]', function (event) {
    var char = event.which || event.keyCode;
    if (char != 8 && char != 46 && char != 37 && char != 39 && char != 9 && char != 13) {
        if (!kmi_isDecimal(String.fromCharCode(char))) {
            popupErrorMsg($(this), "Only decimal value allowed", 3);
            return false;
        }
    }
});

/* Checks when focus out from the field*/
$(document).on("blur", "input[decimalonly]", function () {
    if ($(this).val().trim() != "") {
        if (!kmi_isDecimal($(this).val())) {
            $(this).val("");
            popupErrorMsg($(this), "Only dcimal value allowed", 3);
            return false;
        }
    }
});

/* ./Checking for Decimal value */


function popupErrorMsg(e, msg, interval, o) {  // interval: is in second
    //$(".kmi-popup_error").remove();
    var div;
    if (o == undefined) {
        div = $(e).closest("div");
    } else {
        div = o;
    }

    var offset = $(e).position();
    var close = document.createElement('div');

    $(close).addClass("kmi-popup_error")
            .html(msg)
            .css({
                "position": "absolute",
                "left": (offset.left),
                "top": (offset.top - 30),
                "z-index": "10999",
                "color": "white",
                "font-size": "12px",
                "cursor": "pointer",
                "background-color": "#dd4b39",
                "border-radius": "3px",
                "padding": "5px",
                "width": "150px;",
                "text-align": "center",
                "display": "none"
            })
            .attr("id", "kmi-popup_error")
            .appendTo(div)
            .on("click", function () {
                $(close).remove();
            });
    $(close).slideDown("slow");
    $(close).fadeOut(interval * 1000);
    $(e).focus();
    setTimeout(function () {
        $(close).remove();
    }, interval * 1000);
}

function kmiPopupWindowMsg(msg, interval, method, param) {
    //$(".kmi-popup_error").remove();
    var div = $("body");
    var width = $(window).innerWidth();
    var left = (width - (width / 5)) + "px";
    var top = "50px";
    ;
    var close = document.createElement('div');

    var html = '<div class="panel panel-success"><div class="panel-heading"> Success</div><div class="panel-body">' +
            '<p style="font-size:12px">' + msg + '</p></div><div class="panel-footer">' +
            '<button type="button" class="btn btn-info btn-circle" onclick="' + method + '(\'' + param + '\')"><i class="fa fa-check"></i></button></div></div>';
    $(close).addClass("kmi-popup_window_error")
            .html(html)
            .css({
                "position": "fixed",
                "left": left,
                "top": top,
                "z-index": "10999",
                "font-size": "12px",
                "width": "250px",
                "text-align": "center",
                "display": "none"
            })
            .attr("id", "kmi-popup_window_error")
            .appendTo(div);
    //.on("click", function () {
    //    $(close).remove();
    //});
    $(close).slideDown("slow");
    //$(close).fadeOut(interval * 1000);
    //setTimeout(function () {
    //    $(close).remove();
    //}, interval * 1000);
}

function kmi_isEmail(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function kmi_isUrl(url) {
    return (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url));
}

function kmi_isDecimal(val) {
    var regx = /^[ 0-9 .]+$/;
    return regx.test(val);
}

function kmi_isAlphaOnly(val) {
    var regx = /^[ a-z A-Z ]*$/;
    return regx.test(val);
}

function kmi_isNumeric(val) {
    var regx = /^[0-9]*$/;
    return regx.test(val);
}

function kmiHasFormError(e) {
    var error = false;
    $(e).find('input[required]').each(function (event) {
        var val = $(this).val();
        if (val.trim() == "") {
            $(this).focus().css({"border": "1px solid red"});
            popupErrorMsg($(this), "This field is Required!!", 3);
            error = true;
        } else {
            $(this).css({"border": "1px solid #BBB"});
        }
    });

    $(e).find('textarea[required]').each(function (event) {
        var val = $(this).val();
        if (val.trim() == "") {
            $(this).focus().css({"border": "1px solid red"});
            popupErrorMsg($(this), "This field is Required!!", 3);
            error = true;
        } else {
            $(this).css({"border": "1px solid #BBB"});
        }
    });

    $(e).find('select[required]').each(function (event) {
        var val = $(this).val();
        if (val.trim() == "") {
            $(this).focus().css({"border": "1px solid red"});
            popupErrorMsg($(this), "Select a option to proceed", 3);
            error = true;
        } else {
            $(this).css({"border": "1px solid #BBB"});
        }
    });

    $(e).find('input[type="email"]').each(function (event) {
        var val = $(this).val();
        if (val.trim() != "") {
            if (!kmi_isEmail(val)) {
                $(this).focus().css({"border": "1px solid red"});
                popupErrorMsg($(this), "Please, Enter a valid email!!", 3);
                error = true;
            } else {
                $(this).css({"border": "1px solid #BBB"});
            }
        }
    });

    $(e).find('input[type="url"]').each(function (event) {
        var val = $(this).val();
        if (val.trim() != "") {
            if (!kmi_isUrl(val)) {
                $(this).focus().css({"border": "1px solid red"});
                popupErrorMsg($(this), "Please, Enter a valid URL!!", 3);
                error = true;
            } else {
                $(this).css({"border": "1px solid #BBB"});
            }
        }
    });
    kmiHasPassChangeError();
    return error ? error : kmiHasPassChangeError();
}

function kmiHasPassChangeError() {
    var error = false;
    try {
        var curr_pass = $("#curr_password").val(),
                new_pass = $("#new_password").val(),
                conf_pass = $("#conf_password").val();
        if (curr_pass.trim() != "" || new_pass.trim() != "" || conf_pass.trim() != "") {
            $("#curr_password").css({"border": "1px solid #BBB"});
            $("#new_password").css({"border": "1px solid #BBB"});
            $("#conf_password").css({"border": "1px solid #BBB"});


            if (new_pass.trim() == "" && conf_pass.trim() != "") {
                $("#new_password").focus().css({"border": "1px solid red"});
                popupErrorMsg($("#new_password"), "New password is Required!!", 3);
                error = true;
            } else if (conf_pass.trim() == "" && new_pass.trim() != "") {
                $("#conf_password").focus().css({"border": "1px solid red"});
                popupErrorMsg($("#conf_password"), "Confirm password is Required!!", 3);
                error = true;
            } else if (new_pass != conf_pass) {
                $("#conf_password").focus().css({"border": "1px solid red"});
                popupErrorMsg($("#conf_password"), "Confirm password mismatch!!", 3);
                error = true;
            } else if (curr_pass == new_pass) {
                $("#new_password").focus().css({"border": "1px solid red"});
                popupErrorMsg($("#new_password"), "New & old password must not be same!!", 3);
                error = true;
            }
        }
        return error ? error : kmiIsPassMatchError();
    } catch (err) {
        return error ? error : kmiIsPassMatchError();
    }
}

function kmiIsPassMatchError() {
    var error = false;
    try {
        var new_pass = $("#new_password").val(),
                conf_pass = $("#conf_password").val();

        if (new_pass.trim() != "" || conf_pass.trim() != "") {

            $("#new_password").css({"border": "1px solid #BBB"});
            $("#conf_password").css({"border": "1px solid #BBB"});

            if (new_pass.trim() == "" && conf_pass.trim() != "") {
                $("#new_password").focus().css({"border": "1px solid red"});
                popupErrorMsg($("#new_password"), "New password is Required!!", 3);
                error = true;
            } else if (conf_pass.trim() == "" && new_pass.trim() != "") {
                $("#conf_password").focus().css({"border": "1px solid red"});
                popupErrorMsg($("#conf_password"), "Confirm password is Required!!", 3);
                error = true;
            } else if (new_pass != conf_pass) {
                $("#conf_password").focus().css({"border": "1px solid red"});
                popupErrorMsg($("#conf_password"), "Confirm password mismatch!!", 3);
                error = true;
            }
        }
        return error;
    } catch (err) {
        return error;
    }
}



//Validation for Date to check if date is Smaller than 1920 and greater than today
function popupErrorMsgForDate(e, msg, interval) {  // interval: is in second
    //$(".kmi-popup_error").remove();
    var div = $(e).closest("div");
    var offset = $(e).position();
    var close = document.createElement('div');

    $(close).addClass("kmi-popup_error")
            .html(msg)
            .css({
                "position": "absolute",
                "left": (offset.left),
                "top": (offset.top - 30),
                "z-index": "10999",
                "color": "white",
                "font-size": "12px",
                "cursor": "pointer",
                "background-color": "#dd4b39",
                "border-radius": "3px",
                "padding": "5px",
                "width": "150px;",
                "text-align": "center",
                "display": "none"
            })
            .attr("id", "kmi-popup_error")
            .appendTo(div)
            .on("click", function () {
                $(close).remove();
            });
    $(close).slideDown("slow");
    $(close).fadeOut(interval * 1000);
    //$(e).focus();
    setTimeout(function () {
        $(close).remove();
    }, interval * 1000);
}