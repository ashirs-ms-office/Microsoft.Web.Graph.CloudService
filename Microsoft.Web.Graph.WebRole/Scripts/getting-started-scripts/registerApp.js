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

function checkParameter(selector, errorDivSelector, message) {
    var paramValue = $(selector).val();
    if (paramValue == "" || typeof (paramValue) === undefined) {
        $(errorDivSelector).html(message);
        $('#register-button').attr("disabled", "disabled");
        $(selector).addClass('highlight');
        return undefined;
    }
    var pattern = new RegExp(/^.*?(?=[\^#&$\*<>\?\{\|\}]).*$/);
    if (pattern.test(paramValue)) {
        $(errorDivSelector).html("Parameter contains at least one invalid chars");
        $(selector).addClass('highlight');
        return undefined;
    }
    $(selector).removeClass('highlight');
    return paramValue;
}

function checkProtocol(uri, objectToBeHighlightedSelector, errorDivSelector) {
    if (uri == "" || uri == undefined) {
        return;
    }
    var protocolHttp = uri.substr(0, 7);
    var protocolHttps = uri.substr(0, 8);
    var protocolMsAppxWeb = uri.substr(0, 14);
    if (protocolHttp != "http://" && protocolHttps != "https://" && protocolMsAppxWeb != "MS-APPX-WEB://") {
        $(errorDivSelector).text("Wrong protocol provided in the Uri, it should be starting with http://, https://, or MS-APPX-WEB:// for Universal Windows Platform.");
        $('#register-button').attr("disabled", "disabled");
        $(objectToBeHighlightedSelector).addClass('highlight');
        $('#registerSuccess').hide();
        return false;
    }
    if ($(objectToBeHighlightedSelector).hasClass('highlight')) {
        $(objectToBeHighlightedSelector).removeClass('highlight');
    }
    return true;
}

function hideErrorDiv(selector)
{
    $(selector).html("");
    $('#register-button').removeAttr("disabled");
}

function finePrintPopup() {
    event.preventDefault();
    $("#fineprint").show();
}

var uniqueId;

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

            if (platformId !== "option-windowsuniversal" && platformId !== "option-android" && platformId !== "option-ios-swift" && platformId !== "option-ios-objective-c" && platformId !== "option-dotnet" && platformId !== "option-xamarin") {
                $("#downloadCodeSampleButtonSdk").hide();
            }

            //currently no v2 Xamarin, dotnet, ios-swift, ios-objective-c REST samples, so hide that button
            if (platformId === "option-xamarin" || platformId === "option-python" || platformId === "option-ios-swift" || platformId === "option-ios-objective-c" || platformId === "option-dotnet" || platformId === "option-android") {
                $("#downloadCodeSampleButtonRest").hide();
            }

            //Hide secret prompt if on mobile
            if (getNameTypeAndRedirectByPlatformId(platformId).public == true) {
                $("#app-secret-prompt").hide();
            }
        }
    }

    // get the default app id uri, it is required to update the uri based on the name entered by the user
    var defaultAppIdUri = $("#appIdUriField").val();
    $('#appNameField').addClass('highlight');

    $("#go-reg-app").click(function () {
        //ru = the URL which the app registration page will redirect back to
        var platformInfo = getNameTypeAndRedirectByPlatformId(platformId);
        //NOTE: removing any existing querystrings from current URL. In case of bad appId, user should not be stopped from clicking "Let's Go" again without those bad querystrings being sent
        var ru = window.location.href.split('?')[0] + "?appID=_appId_&appName=_appName_&redirectUrl=" + platformInfo.redirectUri + "&platform=" + platformId;
        ru = encodeURIComponent(ru);
        ru = "&ru=" + ru;

        var deepLink = "/quickstart/graphIO?publicClientSupport=" + platformInfo.public + "&appName=" + platformInfo.name + "&redirectUrl=" + platformInfo.redirectUri;
        if (platformId === "option-dotnet" || platformId === "option-angular") {
            deepLink = deepLink + "&allowImplicitFlow=true";
        }
        deepLink = deepLink + ru;
        deepLink = encodeURIComponent(deepLink);
        deepLink = "deepLink=" + deepLink;
        var appregistrationUrl = "https://apps.dev.microsoft.com/?" + deepLink;
        window.open(appregistrationUrl, "_self");
    })


    $('#app-reg-signin').click(function () {
        if (typeof (platformId) != "undefined") {
            ga('send', 'event', 'O365path-Rest', 'Signin-ExistingAccount');
            MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Signin-ExistingAccount');
        }
        else {
            ga('send', 'event', 'AppRegistration', 'Signin-ExistingAccount');
            MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'AppRegistration', 'ms.ea_action', 'Signin-ExistingAccount');
        }
        var registrationCardId = "register-app";
        document.cookie = "current-card=" + registrationCardId + "; path=/";
        if (typeof (currentProduct) != "undefined") {
            document.cookie = "current-product=" + currentProduct + "; path=/";
        }
        if (typeof (platformId) != "undefined") {
            document.cookie = "current-platform=" + platformId + "; path=/";
        }
        window.location.href = "/GettingStarted/Account/SignIn";
    });
    
    
    $('#signup-new-account').click(function() {
        if (typeof (platformId) != "undefined") {
            ga('send', 'event', 'O365path-Rest', 'Signin-CreateNewAccount');
            MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Signin-CreateNewAccount');
        }
        else {
            ga('send', 'event', 'AppRegistration', 'Signin-CreateNewAccount');
            MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'AppRegistration', 'ms.ea_action', 'Signin-CreateNewAccount');
        }        
        window.open("http://dev.office.com/devprogram");
    });

    // app name
    $("#appNameField").focusout(function () {
        var appName = checkParameter("#appNameField", "#app-name-error-div", "Please enter the app name.");
        if (appName != undefined) {
            // update the app id Uri
            var appidUri = $("#appIdUriField").val();
            $("#appIdUriField").val(defaultAppIdUri + appName);
        }
    });
    $("#appNameField").focus(function () {
        hideErrorDiv("#app-name-error-div");
    });

    // signon uri
    $("#signOnUrlField").focusout(function () {
        var signonUri = checkParameter("#signOnUrlField", "#sign-onUrl-error-div", "Please enter the sign on url.");
        checkProtocol(signonUri, "#signOnUrlField", "#sign-onUrl-error-div");
    });
    $("#signOnUrlField").focus(function () {
        hideErrorDiv("#sign-onUrl-error-div");
    });

    $("#appIdUriField").focusout(function () {
        var appidUri = checkParameter("#appIdUriField", "#app-id-uri-error-div", "Please enter the app id uri.");
        checkProtocol(appidUri, "#appIdUriField", "#app-id-uri-error-div");
    });

    $("#appIdUriField").focus(function () {
        hideErrorDiv("#app-id-uri-error-div");
    });

    $("#redirectUriField").focusout(function () {
        var redirectUri = checkParameter("#redirectUriField", "#redirect-uri-error-div", "Please enter the redirect uri.");
            checkProtocol(redirectUri, "#redirectUriField", "#redirect-uri-error-div");
    });

    $("#redirectUriField").focus(function () {
        hideErrorDiv("#redirect-uri-error-div");
    });

    //currentProduct intialized in ApiWidget.cshtml
    //updatePermissionsTable(currentProduct);
});


//TODO: remove!
function checkForAppID() {
    console.log('check...');

    //see if the requestingId is still on this page
   // if (document.getElementById(requestingId) && !this.props.bot.MsaAppId) { 
    if (document.getElementById('register-app')) {
        //this is a workaround for IE to trigger a refresh of localStorage
        localStorage.setItem('temp', '0');
        localStorage.removeItem('temp');

        //see if the other tab has set the createId
        var createId = localStorage.getItem('createId');
        if (createId) {
            console.log(createId);
           // localStorage.removeItem('createId');
            //  window.refreshBotMsaApp(createId);
            alert('app created!');

        }
        else {
            setTimeout(checkForAppID(), 500);
        }
    }
}

    function updatePermissionsTable(product) {
    if (product != null && product !="") {
        //select all permissions class elements and hide them
        $(".permissions").hide();

        //select all permissions class elements for the product and show them
        $(".permissions." +product).show();
    }
}

    function registerApp() {
    $('#reg-error_display').hide(); // make sure you hide the error message, if user does the second attempt
    var appType = $('#appTypeField').val();
    var includeCalendar = $('#calendarRead').is(':checked');
    var includeContacts = $('#contactsRead').is(':checked');
    var includeMail = $('#mailRead').is(':checked');
    var includeFiles = $('#filesRead').is(':checked');
    var includeUsers = $('#usersRead').is(':checked');
    var includeGroups = $('#groupsRead').is(':checked');

    var includeCalendarWrite = $('#calendarWrite').is(':checked');
    var includeContactsWrite = $('#contactsWrite').is(':checked');
    var includeMailWrite = $('#mailWrite').is(':checked');
    var includeFilesWrite = $('#filesWrite').is(':checked');
    var includeUsersWrite = $('#usersWrite').is(':checked');
    var includeGroupsWrite = $('#groupsWrite').is(':checked');

    var includeMailSend = $('#mailSend').is(':checked');
    var success = false;
        //do a frontend error check
    var appName = checkParameter("#appNameField", "#app-name-error-div", "Please enter the app name.");
    if (appName == undefined) {
        return;
    }
    var signOnUrl = checkParameter("#signOnUrlField", "#sign-onUrl-error-div", "Please enter the sign on url.");
    success = checkProtocol(signOnUrl, "#signOnUrlField", "#sign-onUrl-error-div");
    if (success == false) {
        return;
    }
    var appIdUri = checkParameter("#appIdUriField", "#app-id-uri-error-div", "Please enter the app id uri.");
    success = checkProtocol(appIdUri, "#appIdUriField", "#app-id-uri-error-div");
    if (success == false) {
        return;
    }
    var redirectUri;
    if (getCookie("platform") == "option-windowsuniversal") {
        redirectUri = $("#UWPRedirectUri").val();
        success = checkProtocol(redirectUri, "#UWPRedirectUri", "#UWP-Redirect-Uri-error-div");
    }
    else {
        redirectUri = checkParameter("#redirectUriField", "#redirect-uri-error-div", "Please enter the redirect uri.");
    }


    success = checkProtocol(redirectUri, "#redirectUriField", "#redirect-uri-error-div");
    if (success == false) {
        return;
    }
    registerAppParams.signonUri = signOnUrl;
    registerAppParams.redirectUri = redirectUri;

    var actionUrl = "/GettingStarted/AppRegistration/RegisterApp";

    var param = {
        "appName": appName,
        "appType": appType,
        "signOnUri": signOnUrl,
        "appIdUri": appIdUri,
        "redirectUri": redirectUri,
        "includeCalendar": includeCalendar,
        "includeContacts": includeContacts,
        "includeMail": includeMail,
        "includeFiles": includeFiles,
        "includeUsers": includeUsers,
        "includeGroups": includeGroups,
        "includeCalendarWrite": includeCalendarWrite,
        "includeContactsWrite": includeContactsWrite,
        "includeMailWrite": includeMailWrite,
        "includeFilesWrite": includeFilesWrite,
        "includeUsersWrite": includeUsersWrite,
        "includeGroupsWrite": includeGroupsWrite,
        "includeMailSend": includeMailSend,
        "appId": registerAppParams.clientId,
    }

    $('#register-button').attr("disabled", "disabled");
    $('#registration-progress').addClass('loading');
    $.ajax({
            url: actionUrl,
            type: "POST",
            data: AddAntiForgeryToken(param),
            success: function (data, textStatus, xhr) {
            if (registerAppParams.clientId !=null) {
                /* update case*/
                if (data.error_message != undefined) {
                    $('#registration-result .ms-font-xl').html("<strong>" +data.error_message +"</strong>");
                }
                else {
                    $('#registration-result .ms-font-xl').html("<strong>Application has been updated successfully</strong>");

                    if (appType == "Native App" || getCookie("platform") == "option-angular") {
                        $('#registration-result .spacer20').html("<p>Congratulations on registering your app! The client ID is used to identify your app when it connects to Office 365. Retain it for your records.</p>");

                        if (getCookie("platform") == "option-windowsuniversal") {
                            $("#UWP-Redirect-Uri-error-div").empty();
                            $("#registerSuccess").html("The redirect URI was successfully registered. You can now run the sample and sign in as an Office 365 user.").show();
                    }
                    }
                    else {
                        $('#registration-result .spacer20').html("<p>Congratulations on registering your app! The client ID is used to identify your app when it connects to Office 365. The client secret acts like a password for your app. Retain them for your records. </p>");
                }
            }
                ga('send', 'event', 'O365path-Rest', 'RegisterApp--UpdateClicked--' + data.error_message);
            }
            else if (data.client_id != undefined && data.client_id != "") {
                $('#clientIdField').val(data.client_id);
                if (appType == "Native App" || getCookie("platform") == "option-angular") {
                    $("#app-reg-client-secret").hide();
                    $('#registration-result .spacer20').html("<p>Congratulations on registering your app! The client ID is used to identify your app when it connects to Office 365. Retain it for your records. </p>");
                }
                else {
                    $('#clientSecretField').val(data.client_secret);
                    $("#app-reg-client-secret").show();
                    $('#registration-result .spacer20').html("<p>Congratulations on registering your app! The client ID is used to identify your app when it connects to Office 365. The client secret acts like a password for your app. Retain them for your records. </p>");
            }
                $('#registration-result .ms-font-xl').html("<strong>Registration Successful!</strong>");
                $('#registration-result').removeClass('hidden');
                $('#getcode-button').removeClass('hidden');
                //$('#registration-result').addClass('animated fadeInUp');

                registerAppParams.clientId = data.client_id;
                registerAppParams.clientSecret = data.client_secret;
                //Scroll the registration result into view, standalone registration page doesn't have cardTracker
                if (typeof (cardTracker) != "undefined") {
                    cardTracker.showCard("registration-result");
                    cardTracker.removeBlockingCard();
                    if (getCookie("platform") == "option-windowsuniversal") {
                        $('#downloadText').html("Download our code sample. If you signed in and registered your app, we'll help configure the app to use the registration values.");
                }
            }

                // standalone registration page doesn't have pickPlatform
                if ($("#pickPlatform")[0] != undefined) {
                    disablePlatformSelection();
                    ga('send', 'event', 'O365path-Rest', 'RegisterApp--Complete' + '-' + getCookie("platform"));
                    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'RegisterApp-Success', 'ms.contentproperties', getCookie("platform"), 'ms.callresult', data.client_id);
                }
                else {
                    ga('send', 'event', 'AppRegistration', 'RegisterApp--Complete');
                    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'AppRegistration', 'ms.ea_action', 'RegisterApp-Success', 'ms.callresult', data.client_id);
            }
            }
            else {
                $('#reg-error_msg').text(data.error_message);
                $('#reg-error_display').show();
                //$('#reg-error_display').addClass('animated fadeInUp');
                ga('send', 'event', 'O365path-Rest', 'RegisterApp--Error--' + data.error_message);
                MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'RegisterApp-Error', 'ms.callresult', data.error_message);
            }
    },
            error: function (jqXHR, exception) {
            var msg = "Status Code: " + jqXHR.status + "\n\r";
            msg += "Status Text: " + jqXHR.statusText + "\n\r";
            if (jqXHR.responseText.search("ForgeryToken") != -1) {
                msg +="it seems that you have stale cookies, please delete the cookies, close the browser and start again."
            }
            else {
                msg = jqXHR.responseText;
            }
            $('#reg-error_msg').text(msg);
            $('#reg-error_display').show();
                //$('#reg-error_display').addClass('animated fadeInUp');
    },
            complete: function (xhr) {
            $('#registration-progress').removeClass('loading');
            $('#register-button').removeAttr("disabled");
    }
    })
    }

$(function () {
    $('#appTypeField').change(function () {
        if ($('#appTypeField')[0].value === 'Native App') {
            $('#signOnUrlFieldGroup').hide();
            $('#redirectUriLabel').attr("title", "A URI used for additional validation of the native client app.");
        } else {
            $('#signOnUrlFieldGroup').show();
            $('#redirectUriLabel').attr("title", "The URI to which we will redirect in response to an OAuth 2.0 request.");
    }
        registerAppParams.clientId = null;
        registerAppParams.clientSecret = null;
        registerAppParams.signonUri = null;
        registerAppParams.redirectUri = null;
        $('#registration-result').addClass('hidden');
    })
})

    //function cancelRegi() {
    //    $('#signup-new-account-msg').toggleClass('hidden');
    //}