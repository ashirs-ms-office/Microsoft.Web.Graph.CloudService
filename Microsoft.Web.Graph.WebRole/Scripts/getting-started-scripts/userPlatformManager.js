var previousIconId = "";
var previousIconSrc = "";

function getPlatformInfo(platformId) {
    var index = 0;
    for (; index < window.platformData.length; ++index) {
        if (platformId == window.platformData[index].Id)
            break;
    }
    return window.platformData[index];
}

function setDocumentationDivForPlatform(platformId, fileType, divName) {
    var platformInfo = getPlatformInfo(platformId);
    var html = '<h1>' + platformInfo.PreDownloadInstruction.Title + '</h1>';
    html += '<p>' + platformInfo.PreDownloadInstruction.Description + '</p>';
    document.getElementById(divName).innerHTML = html;
    document.getElementById("app-reg-title").innerHTML = platformInfo.AppRegistrationInstruction.Title;
    document.getElementById("app-reg-desc").innerHTML = platformInfo.AppRegistrationInstruction.Description;
    if (platformInfo.AppRegistrationInstruction.Notes == "") {
        document.getElementById("app-reg-notes").style.display = 'none';
    }
    else {
        document.getElementById("app-reg-notes").style.display = 'block';
        document.getElementById("app-reg-notes").innerHTML = platformInfo.AppRegistrationInstruction.Notes;
    }
}

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


    if (selectPlatform.FirstTime == true) {
        cardTracker.removeBlockingCard(false);
        selectPlatform.FirstTime = false;
    }

    //fileType = setupFile //Hardcoded as this will not chnage ; divName is also Hardcoded
    setDocumentationDivForPlatform(platformId, "setupFile", "ShowDocumentationDiv");
}

// add a static proeprty in selectPlatform
selectPlatform.FirstTime = true;