var previousIconId = "";
var previousIconSrc = "";

// it fetches the user selected platform and updates the page
function updatePlatform(platform, product) {
    //load content
    if (platform == null || platform == undefined || platform == "#undefined" || platform == "") {
        //return;
    }
    
    selectPlatform(platform, product);
}

// this function will be called when an app has been registered
// successfully, so that user can not change the platform once the
// app has been registered
function disablePlatformSelection() {
    //var anchors = $("#pickPlatform ul li a");
    var anchors = $("#pickPlatform div button");
    for (var index = 0; index < anchors.length; ++index) {
        anchors[index].disabled = true;
        $(anchors[index]).addClass("disableClick");
    }

    $('#pickPlatform').click(function () {
        ga('send', 'event', 'DisabledPlatformButtonClicked', ''); //TODO: find which platform was clicked? Difficult with buttons disabled
        MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'AppRegistration', 'ms.ea_action', 'DisabledPlatformButtonClicked', 'ms.callresult', '');
    });
    $("#pickPlatformDisableDiv").show();
}
function SetAppTypeBasedOnPlatform(id) {
    //move setup card to the top so the user can see what they just clicked
    if (id == "option-ios" || id == "option-android" || id == "option-windowsuniversal") {
        // update the app type in app registration
        $("#appTypeField").val("Native App");
        $('#redirectUriLabel').attr("title", "A URI used for additional validation of the native client app.");

        //disable the items
        $("#signOnUrlFieldGroup").hide();

        //disable redirect uri field for UWP platform as the redirect uri is dynamtically generated when actually run the app. No way to know before.
        if (id == "option-windowsuniversal") {
            $("#redirectUriFieldGroup").hide();
        }
        else {
            $("#redirectUriFieldGroup").show();
        }
    }
    else {
        $("#appTypeField").val("Web App");
        $('#redirectUriLabel').attr("title", "The URI to which we will redirect in response to an OAuth 2.0 request.");

        if (id == "option-angular") {
            $("#signOnUrlFieldGroup").hide();
            $("#redirectUriFieldGroup").show();
        }
        else {
            
            $("#signOnUrlFieldGroup").show();
            $("#redirectUriFieldGroup").show();
        }
    }
}

function startCodingContentDisplay(selectedItem) {
    $(selectedItem).closest(".tabs").find(".selected").removeClass("selected");
    if (selectedItem.id === 'option-QuickInstructions') {
        setDocumentationDivForPlatform(platformId, "gettingStartedFile", "write-code-from-scratch");
        $("#use-starter-project").hide();
        $("#write-code-from-scratch").show();
        $("#editOnGithub").show();
    }
    else {
        $("#use-starter-project").show();
        $("#write-code-from-scratch").hide();
        $("#editOnGithub").hide();

    }
    $(selectedItem).addClass("selected");
}

//TODO: missing Android, ios swift, ios obj-C, Xamarin
function getNameTypeAndRedirectByPlatformId(platformId) {
    switch (platformId) {
        case "option-ruby":
            return { name: "My Ruby App", redirectUri: "http://localhost:3000/auth/microsoft_v2_auth/callback", public: false };
            break;
        case "option-node":
            return { name: "My Node.js App", redirectUri: "http://localhost:3000/login", public: false };
            break;
        case "option-php":
            return { name: "My PHP App", redirectUri: "http://localhost:8000/oauth.php", public: false };
            break;
        case "option-dotnet":
            return { name: "My ASP.NET App", redirectUri: "http://localhost:55065", public: false };
            break;
            //127.0.0.1 is used to avoid issues with IE
        case "option-angular":
            return { name: "My Angular App", redirectUri: "http://localhost:8080/login", public: true }; //Note: not mobile, but uses an SPA that uses the Implicit Auth Flow
            break;
        case "option-python":
            return { name: "My Python App", redirectUri: "http://127.0.0.1:8000/connect/get_token/", public: false };
            break;
        case "option-windowsuniversal":
            return { name: "My Win-Universal App", redirectUri: "http://localhost:8000", public: true, v1Link: "https://github.com/microsoftgraph/uwp-csharp-connect-rest-sample/tree/last_v1_auth" };
            break;
        case "option-android":
            return { name: "My Android App", redirectUri: "http://localhost:8000", public: true, v1Link: "https://github.com/microsoftgraph/android-java-connect-sample/tree/last_v1_auth" };
            break;
        case "option-ios-swift":
            return { name: "My iOS Swift App", redirectUri: "http://localhost:8000", public: true, v1Link: "https://github.com/microsoftgraph/ios-swift-connect-rest-sample" };
            break;
        case "option-ios-objective-c":
            return { name: "My iOS Objective C App", redirectUri: "http://localhost:8000", public: true, v1Link: "https://github.com/microsoftgraph/ios-objectivec-connect-rest-sample" };
            break;
        case "option-xamarin":
            return { name: "My Xamarin App", redirectUri: "http://localhost:8000", public: true, v1Link: "https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-xamarin" };
            break;
        default:
            return { name: "My Sample App", redirectUri: "http://localhost:8000", public: false };
    }
}

function setRedirectUri(platformId) {
    switch (platformId) {
        case "option-ruby":
            $("#redirectUriField").val("http://localhost:3000/auth/azureactivedirectory/callback");
            $("#signOnUrlField").val("http://localhost:3000");
            break;
        case "option-node":
            $("#redirectUriField").val("http://localhost:3000/login");
            $("#signOnUrlField").val("http://localhost:3000");
            break;
        case "option-php":
            $("#redirectUriField").val("http://localhost:8000/callback.php");
            $("#signOnUrlField").val("http://localhost:8000");
            break;
        case "option-dotnet":
            $("#redirectUriField").val("http://localhost:55065");
            $("#signOnUrlField").val("http://localhost:55065");
            break;
        //127.0.0.1 is used to avoid issues with IE
        case "option-angular":
            $("#redirectUriField").val("http://127.0.0.1:8080/");
            $("#signOnUrlField").val("http://127.0.0.1:8080/");
            break;
        case "option-python":
            $("#redirectUriField").val("http://127.0.0.1:8000/connect/get_token/");
            $("#signOnUrlField").val("http://127.0.0.1:8080/");
            break;
        case "option-windowsuniversal":
            $("#redirectUriField").val("");
            $("#signOnUrlField").val("");
            break;
        default:
            $("#redirectUriField").val("http://localhost:8000");
            $("#signOnUrlField").val("http://localhost:8000");
    }
}

function sendPlatformInfoToServer(platformId)
{
    //todo: ashirs, check if setcookie is required
    //setCookie("platform", platformId);
    ga('send', 'event', 'O365path-Rest', 'Setup-' + platformId);
    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'SelectPlatform', 'ms.contentproperties', platformId);
}

function selectPlatform(platform, product) {
    // restore previous selected icon's image
    if (selectPlatform.FirstTime != true) {
        $("button#" + previousIconId + " img").attr("src", previousIconSrc);
        $("button#" + platformId + " img").removeClass("img-white-foreground")
    }

    //load content
    if (platform == null || platform == undefined) {
        return;
    }

    if ($("#SetupPlatform:visible").length == 0) {
        cardTracker.showCard("SetupPlatform");
    }
    else {
        //remove selected from closes element
        $(platform).closest(".tabs").find(".selected").removeClass("selected");

        //scroll to SetupPlatform instructions
        var navBar = $("#myNavBar");
        var navBarHeight = navBar.height() + 10;
        var scrollTo = $("#SetupPlatform").offset().top - navBarHeight - (!navBar.hasClass('navbar-fixed-top') ? navBarHeight : 0);
        //accomodating for the new navigation banner which is 100px

        //scrollTo = scrollTo - 100; //Obsolete? Was used to adjust for header, but header disappears upon scroll
        //move the scroll to the top and animate it over time
        $("html,body").animate({
            duration: 1000,
            scrollTop: scrollTo
        });
    }
    $(platform).addClass("selected");

    //track platform clicked on
    platformId = platform.id || platform.replace("#", "");
    document.cookie = "current-platform=" + platformId + "; path=/";

    previousIconSrc = $("button#" + platformId + " img").attr("src");
    $("button#" + platformId + " img").attr("src", previousIconSrc.replace("_grey_", "_"));
    $("button#" + platformId + " img").addClass("img-white-foreground");

    previousIconId = platformId;
    
    $('#post-download-instructions').hide();

    //Hide secret-needed note if on mobile
    if (getNameTypeAndRedirectByPlatformId(platformId).public == true) {
        $("#secretNeededMessage").hide();
    } else {
        $("#secretNeededMessage").show();
    }

    //show or hide link to v1 authentication model
    var v1Link = getNameTypeAndRedirectByPlatformId(platformId).v1Link;
    if (v1Link) {
        $("#mobileMessage").show();
        $("#mobileFirstMessage").show();
        //$("#v1Link").href = v1link;
        $("#v1Link").attr('href', v1Link);
        console.log($("#v1Link").href);
    } else {
        $("#mobileMessage").hide();
        $("#mobileFirstMessage").hide();
        $("#v1Link").attr('href','#');
    }

    //platformName = platform.innerText;
    //save this platform info  on server
  //  SetAppTypeBasedOnPlatform(platformId);
  //  setRedirectUri(platformId);
    if (selectPlatform.FirstTime == true) {
        cardTracker.removeBlockingCard(false);
        selectPlatform.FirstTime = false;
    }

    //fileType = setupFile //Hardcoded as this will not chnage ; divName is also Hardcoded
    setDocumentationDivForPlatform(platformId, "setupFile", "ShowDocumentationDiv");

    sendPlatformInfoToServer(platformId);

    //Uncomment this to re-add mutliple downloads
    //_SetupProject.cshtml will also need to have the existing button commented out
    //addSuggestions("suggestionlistId", platformId, product);    
}

function hidePlatformsWithoutSamples(product) {
    if (product !== null && product != "") {
        $("#pickPlatform div button a").each(function () {
            var platform = $(this).attr("id");
            var found = searchSampleDownloads(platform, product);
            $(this).toggle(found.length > 0);
        });
        //TODO: What to do if no samples exist?
    }
}

// add a static proeprty in selectPlatform
selectPlatform.FirstTime = true;