function registerAppParams() {
    var clientId = null;
    var clientSecret = null;
    var signonUri = null;
    var redirectUri = null;
}

function setIdAndRedirectFromQueryString() {
    registerAppParams.clientId = getQueryString("appID");
    registerAppParams.redirectUri = getQueryString("redirectUrl");
}

function getQueryString (query) {
    var reg = new RegExp('[?&]' + query + '=([^&#]*)', 'i');
    var string = reg.exec(window.location.href);
    return string ? string[1] : null;
};


function finePrintPopup() {
    event.preventDefault();
    $("#fineprint").show();
}

$(document).ready(function () {
    $("#fineprintlink").click(function () {
        event.preventDefault();
        $("#fineprint").show();
    });
    $("#fineprintlink2").click(function () {
        event.preventDefault();
        $("#fineprint").show();
    });
    $("#GotIt").click(function () {
        $("#fineprint").hide();
    });


    //TODO: TEMPORARY BUG FIX: hide navbar, since it is broken after app registration and does not move beyond card #3
    $("#myNavBar").hide();

    //Check querystring for AppId and RedirectUri. If found, then set values for embedding, scroll to RegistrationSuccessful card and fill in values
    setIdAndRedirectFromQueryString();
    if (registerAppParams.clientId != null) {
        //Compare to regular expression to determine whether clientId is a valid guid
        var guidRegex = "[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}";
        if (registerAppParams.clientId.search(guidRegex) == -1) {
            registerAppParams.clientId = "Error: badGuid";
            if (typeof (cardTracker) != "undefined") {
                cardTracker.hideCard("register-app");
                cardTracker.hideCard("setup-project");
                cardTracker.hideCard("next-step");
            }
            //Telemetry for invalid appId guid
            ga('send', 'event', 'BadRedirectFromAppRegistrationPortal', 'Querystring: ' + window.location.search.slice(1));
            MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'BadRedirectFromAppRegistrationPortal', 'ms.contentproperties', window.location.search.slice(1));
        }
        else {
            updatePlatform(document.getElementById(getQueryString("platform")), "");
            document.getElementById("appIdField").value = registerAppParams.clientId;
            document.getElementById("redirectUriField").value = registerAppParams.redirectUri;

            if (typeof (cardTracker) != "undefined") {
                if ($("#registration-successful:visible").length == 0) {
                    cardTracker.showCard("registration-successful");
                }
                cardTracker.hideCard("register-app");
                cardTracker.showCardNoScroll("registration-result");
                cardTracker.removeAllBlockingCards();
            }

            disablePlatformSelection();

            if (getPlatformInfo(platformId).RestCodeSample == null) {
                $("#downloadCodeSampleButtonRest").hide();
            }

            //currently no v2 Xamarin, dotnet, ios-swift, ios-objective-c REST samples, so hide that button
            if (getPlatformInfo(platformId).SDKCodeSample == null) {
                $("#downloadCodeSampleButtonSdk").hide();
        }

            //Hide secret prompt if on mobile
            if (getPlatformInfo(platformId).Public == true) {
                $("#app-secret-prompt").hide();
            }
        }
    }

    $("#go-reg-app").click(function () {
        //ru = the URL which the app registration page will redirect back to
        var platformInfo = getPlatformInfo(platformId);
    
        var codeSample = platformInfo.SDKCodeSample;
        if (codeSample == null) {
            codeSample = platformInfo.RestCodeSample;
        }
        //NOTE: removing any existing querystrings from current URL. In case of bad appId, user should not be stopped from clicking "Let's Go" again without those bad querystrings being sent
        var ru = window.location.href.split('?')[0] + "?appID=_appId_&appName=_appName_&redirectUrl=" + codeSample.RedirectUri + "&platform=" + platformId;
        ru = encodeURIComponent(ru);
        ru = "&ru=" + ru;

        var deepLink = "/quickstart/graphIO?publicClientSupport=" + platformInfo.Public + "&appName=" + codeSample.Name + "&redirectUrl=" + codeSample.RedirectUri;
        deepLink = deepLink + "&allowImplicitFlow=" + codeSample.AllowImplicitFlow + ru;
        deepLink = encodeURIComponent(deepLink);
        deepLink = "deepLink=" + deepLink;
        var appregistrationUrl = "https://apps.dev.microsoft.com/?" + deepLink;
        window.open(appregistrationUrl, "_self");
    })
});
