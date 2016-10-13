function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function logSignedIn(isAuthed) {
    var firstSignedIn = getCookie("firstSignedIn");
    if (firstSignedIn != "false") {
        if (isAuthed === "True") {
            setCookie("firstSignedIn", "false");
            return "true";
        }
    }
    if (isAuthed != "True")
    {
        setCookie("firstSignedIn", "");
    }
    return "false";
}
