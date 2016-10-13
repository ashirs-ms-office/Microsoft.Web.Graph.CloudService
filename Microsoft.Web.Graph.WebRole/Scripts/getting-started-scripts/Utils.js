var foregeryTokenName = '__RequestVerificationToken';

function AddAntiForgeryToken(data) {
    data.__RequestVerificationToken = getAntiForgeryToken();
    return data;
};

function getAntiForgeryTokenQuery() {
    return '?__RequestVerificationToken=' + getAntiForgeryToken();
}

function getAntiForgeryToken()
{
    var forgeryToken = getCookie(foregeryTokenName);
    if (forgeryToken == "") {
        forgeryToken = $('#o365ForgeryToken').val();
    }
    return antiForgeryToken; // coming from main page
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var cookieItems = document.cookie.split(';');
    for (var i = 0; i < cookieItems.length; ++i) {
        var cookieItem = cookieItems[i];
        while (cookieItem.charAt(0) == ' ')
            cookieItem = cookieItem.substring(1);
        if (cookieItem.indexOf(name) == 0)
            return cookieItem.substring(name.length, cookieItem.length);
    }
    return "";
}


function copyCode(text) {
    if (window.clipboardData != undefined) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", text);
        alert("Response Body code is copied to clipboard.");
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = text;
        alert("Response Body code is copied to clipboard.");
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch (e) {
            alert("Copy rejected by browser. Please input 'about:config' in the address field of the browser, press enter and then set 'signed.applets.codebase_principal_support' to 'true'");
            return false;
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance;

        (Components.interfaces.nsIClipboard);
        if (!clip) {
            return;
        }
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance;

        (Components.interfaces.nsITransferable);
        if (!trans) {
            return;
        }
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance;

        (Components.interfaces.nsISupportsString);
        var copytext = text; str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) {
            return false;
        }
        clip.setData(trans, null, clipid.kGlobalClipboard);
    } else {
        alert("Browser doesn't support clip board. Please select code and right click to copy.");
    }
}