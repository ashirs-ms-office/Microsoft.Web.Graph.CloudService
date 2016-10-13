//Variables for error handling
var inError = false;
var zipHasContent = false;
var selectedPlatformIndex = undefined; //to identify which platform is selected in reposList

//repos in GitHub
var reposList = {
    "Repo": [
        {
            "Platform": "option-ios",
            "uid": "O365-iOS-Connect-outlook",
            "App": "outlook",
            "CodeSampleName": "O365-iOS-Connect",
            "Description": "This Connect sample for iOS shows how to connect your app to Office 365. Once connected, the sample shows how to send a simple service call. Comes in both Swift and Objective-C",
            "FileName": "O365-iOS-Microsoft-Graph-Connect-master\/O365-iOS-Unified-API-Connect\/ConnectViewController.m",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "ClientSecretStringToReplace": "ENTER_CLIENTSECRET_ID_HERE_HackWillNotReplace", //TODO: check if this matters!
            "RedirectURLStringToReplace": "ENTER_YOUR_REDIRECT_URI",
            "SignOnURLStringToReplace": "ENTER_SIGNON_URI_HERE_HackWillNotReplace", //TODO: check if this matters!
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples/O365-iOS-Microsoft-Graph-Connect-master.zip",
            "GitHubRepoName": "O365-iOS-Microsoft-Graph-Connect",
            "GitHubMasterZipUrl": "https://github.com/OfficeDev/O365-iOS-Microsoft-Graph-Connect/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/OfficeDev/O365-iOS-Microsoft-Graph-Connect"
        },
        {
            "Platform": "option-android",
            "uid": "O365-Android-Connect-outlook",
            "App": "outlook",
            "CodeSampleName": "O365-Android-Connect",
            "Description": "This Connect sample for Android shows you how to connect your app to Office 365. It also demonstrates how to issue a simple service call, like sending an email.",
            "FileName": "O365-Android-Microsoft-Graph-Connect-master\/app\/src\/main\/java\/com\/microsoft\/office365\/connectmicrosoftgraph\/Constants.java",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "ClientSecretStringToReplace": "ENTER_CLIENTSECRET_ID_HERE_HackWillNotReplace", //TODO: check if this matters!
            "RedirectURLStringToReplace": "ENTER_YOUR_REDIRECT_URI",
            "SignOnURLStringToReplace": "ENTER_SIGNON_URI_HERE_HackWillNotReplace", //TODO: check if this matters!
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/O365-Android-Microsoft-Graph-Connect-master.zip",
            "GitHubRepoName": "O365-Android-Microsoft-Graph-Connect",
            "GitHubMasterZipUrl": "https://github.com/OfficeDev/O365-Android-Microsoft-Graph-Connect/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/OfficeDev/O365-Android-Microsoft-Graph-Connect"
        },
        {
            "Platform": "option-dotnet",
            "uid": "option-dotnet-mail-api",
            "App": "outlook",
            "CodeSampleName": "DotNet-tutorial", /* we need to add name */
            "Description": "An ASP.NET MVC tutorial for using the Mail API. ",
            "FileName": "O365-AspNetMVC-Microsoft-Graph-Connect-master\/UnifiedApiConnect\/Web.config",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "ClientSecretStringToReplace": "ENTER_YOUR_SECRET",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/O365-AspNetMVC-Microsoft-Graph-Connect-master.zip",
            "GitHubRepoName": "O365-AspNetMVC-Microsoft-Graph-Connect",
            "GitHubMasterZipUrl": "https://github.com/OfficeDev/O365-AspNetMVC-Microsoft-Graph-Connect/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/OfficeDev/O365-AspNetMVC-Microsoft-Graph-Connect"
        },
        {
            "Platform": "option-php",
            "uid": "option-php-outlook",
            "App": "outlook",
            "CodeSampleName": "Simple PHP tutorial",
            "Description": "A simple tutorial for creating a PHP app that uses the Outlook Mail API",
            "FileName": "php-connect-rest-sample-master\/src\/Constants.php",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "ClientSecretStringToReplace": "ENTER_YOUR_SECRET",            
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/php-connect-rest-sample-master.zip",
            "GitHubRepoName": "php-connect-rest-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/php-connect-rest-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/php-connect-rest-sample.git"
        },
        {
            "Platform": "option-node",
            "uid": "option-node-outlook",
            "CodeSampleName": "Simple Node.js tutorial",
            "Description": "A simple Node.js tutorial to use the Mail API.",
            "App": "outlook",
            "FileName": "nodejs-connect-rest-sample-master\/authHelper.js",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "ClientSecretStringToReplace": "ENTER_YOUR_SECRET",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/nodejs-connect-rest-sample-master.zip",
            "GitHubRepoName": "nodejs-connect-rest-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/nodejs-connect-rest-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/nodejs-connect-rest-sample.git"
        },
        {
            "Platform": "option-python",
            "uid": "option-python-outlook",
            "CodeSampleName": "Simple Python tutorial",
            "Description": "A simple tutorial for creating a Python app that uses the Outlook Mail API.",
            "App": "outlook",
            "FileName": "O365-Python-Microsoft-Graph-Connect-master\/connect\/config.py",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "ClientSecretStringToReplace": "ENTER_YOUR_SECRET",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/O365-Python-Microsoft-Graph-Connect-master.zip",
            "GitHubRepoName": "O365-Python-Microsoft-Graph-Connect",
            "GitHubMasterZipUrl": "https://github.com/OfficeDev/O365-Python-Microsoft-Graph-Connect/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/OfficeDev/O365-Python-Microsoft-Graph-Connect"
        },
        {
            "Platform": "option-ruby",
            "uid": "option-ruby-outlook",
            "CodeSampleName": "O365-tutorial",
            "Description": "A simple guide to writing your first Ruby on Rails app using the Outlook Mail API.", /* we need to add description */
            "App": "outlook",
            "FileName": "ruby-connect-rest-sample-master\/config\/environment.rb",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "ClientSecretStringToReplace": "ENTER_YOUR_SECRET",
            "TenantNameToReplace": "ENTER_YOUR_TENANT",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/ruby-connect-rest-sample-master.zip",
            "GitHubRepoName": "ruby-connect-rest-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/ruby-connect-rest-sample.git",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/ruby-connect-rest-sample.git"
        },
        {
            "Platform": "option-angular",
            "uid": "option-angular-outlook",            
            "App": "outlook",
            "FileName": "angular-connect-rest-sample-master\/public\/scripts\/config.js",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/angular-connect-rest-sample-master.zip",
            "GitHubRepoName": "angular-connect-rest-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/angular-connect-rest-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/angular-connect-rest-sample.git"
        },
        {
            "Platform": "option-windowsuniversal",
            "uid": "option-windowsuniversal-outlook",            
            "App": "outlook",
            "FileName": "uwp-csharp-connect-rest-sample-master\/O365-UWP-Unified-API-Connect\/App.xaml",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "TenantNameToReplace": "ENTER_YOUR_TENANT",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/uwp-csharp-connect-rest-sample-master.zip",
            "GitHubRepoName": "uwp-csharp-connect-rest-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/uwp-csharp-connect-rest-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/uwp-csharp-connect-rest-sample.git"
        },
        {
            "Platform": "option-windowsuniversal-sdk",
            "uid": "option-windowsuniversal-sdk-outlook",
            "App": "outlook",
            "FileName": "uwp-csharp-connect-sample-master\/Microsoft-Graph-UWP-Connect-SDK\/App.xaml",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "TenantNameToReplace": "ENTER_YOUR_TENANT",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/uwp-csharp-connect-sample-master.zip",
            "GitHubRepoName": "uwp-csharp-connect-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/uwp-csharp-connect-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/uwp-csharp-connect-sample.git"
        },
        {
            "Platform": "option-dotnet-sdk",
            "uid": "option-dotnet-sdk-mail-api",
            "App": "outlook",
            "FileName": "aspnet-connect-sample-master\/Microsoft Graph SDK ASPNET Connect\/Microsoft Graph SDK ASPNET Connect\/Web.config",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "TenantNameToReplace": "ENTER_YOUR_TENANT",
            "ClientSecretStringToReplace": "ENTER_YOUR_SECRET",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/aspnet-connect-sample-master.zip",
            "GitHubRepoName": "aspnet-connect-sample-master",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/aspnet-connect-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/aspnet-connect-sample.git"
        },
        {
            "Platform": "option-android-sdk",
            "uid": "option-android-sdk-outlook",
            "App": "outlook",
            "FileName": "android-java-connect-sample-master\/app\/src\/main\/java\/com\/microsoft\/graph\/connect\/Constants.java", //TODO
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "RedirectURLStringToReplace": "ENTER_YOUR_REDIRECT_URI",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/android-java-connect-sample-master.zip",
            "GitHubRepoName": "android-java-connect-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/android-java-connect-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/android-java-connect-sample.git"
        },
        {
            "Platform": "option-ios-swift-sdk",
            "uid": "O365-iOS-Swift-sdk-Connect-outlook",
            "App": "outlook",
            "FileName": "ios-swift-connect-sample-master\/Graph-iOS-Swift-Connect\/ApplicationConstants.swift",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/ios-swift-connect-sample-master.zip",
            "GitHubRepoName": "ios-swift-connect-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/ios-swift-connect-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/ios-swift-connect-sample.git"
        },
        {
            "Platform": "option-ios-swift",
            "uid": "O365-iOS-Swift-Connect-outlook",
            "App": "outlook",
            "FileName": "ios-swift-connect-rest-sample-master\/O365-iOS-Microsoft-Graph-Connect-Swift\/AuthenticationConstants.swift",
            "ClientIdStringToReplace": "ENTER_CLIENT_ID_HERE", //TODO: change?
            "RedirectURLStringToReplace": "ENTER_REDIRECT_URI_HERE", //TODO: change?
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/ios-swift-connect-rest-sample-master.zip",
            "GitHubRepoName": "ios-swift-connect-rest-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/ios-swift-connect-rest-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/ios-swift-connect-rest-sample.git"
        },
        {
            "Platform": "option-ios-objective-c-sdk",
            "uid": "O365-iOS-Objective-C-sdk-Connect-outlook",
            "App": "outlook",
            "FileName": "ios-objectivec-connect-sample-master\/O365-iOS-Microsoft-Graph-SDK\/AuthenticationConstants.m",
            "ClientIdStringToReplace": "ENTER_CLIENT_ID_HERE", //TODO: change?
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/ios-objectivec-connect-sample-master.zip",
            "GitHubRepoName": "ios-objectivec-connect-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/ios-objectivec-connect-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/ios-objectivec-connect-sample.git"
        },
        {
            "Platform": "option-ios-objective-c",
            "uid": "O365-iOS-Objective-C-sdk-Connect-outlook",
            "App": "outlook",
            "FileName": "ios-objectivec-connect-rest-sample-master\/O365-iOS-Microsoft-Graph-Connect\/ConnectViewController.m",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "RedirectURLStringToReplace": "ENTER_YOUR_REDIRECT_URI",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/ios-objectivec-connect-rest-sample-master.zip",
            "GitHubRepoName": "ios-objectivec-connect-rest-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/ios-objectivec-connect-rest-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/ios-objectivec-connect-rest-sample.git"
        },
        {
            "Platform": "option-xamarin-sdk",
            "uid": "Xamarin-Connect-outlook",
            "App": "outlook",
            "FileName": "xamarin-csharp-connect-sample-master\/XamarinConnect\/XamarinConnect\/App.cs",
            "ClientIdStringToReplace": "ENTER_YOUR_CLIENT_ID",
            "LocalZipFile": "\/Modules\/Graph.GettingStarted\/CodeSamples\/xamarin-csharp-connect-sample-master.zip",
            "GitHubRepoName": "xamarin-csharp-connect-sample",
            "GitHubMasterZipUrl": "https://github.com/microsoftgraph/xamarin-csharp-connect-sample/archive/master.zip",
            "GitHubRepoUrl": "https://github.com/microsoftgraph/xamarin-csharp-connect-sample.git"
        }
    ]
}

/*
 * Searchs for list of suggestion based on the platform
 * 
 * platform=> platform to search for e.g. option-ios
 */
function searchSampleDownloads(platform, product) {
    var filteredRepo = $.map(reposList.Repo, function (value, index) {
        var matchPlatform = false; var matchProduct = false;
        matchPlatform = platform==undefined || platform==null || platform=="" ? true : value.Platform == platform;
        matchProduct = product==undefined || product==null || product=="" ? true : value.App == product;
        if (matchPlatform && matchProduct) {
            return value;
        }
    });
    return filteredRepo;
}

/*
 * returns the repo details  based on the uid
 * 
 * Returns the first platform match
 */
function getRepoById(platform) {
    for (var i = 0; i < reposList.Repo.length; ++i) {
        if (reposList.Repo[i].Platform === platform) {
            return reposList.Repo[i];
        }
    }
    return null;
}

/*
 * Adds the suggestion for selected platform in the given divid
 * 
 * selectedPlatform=> user selected platform
 * divId=> a div where the panels for multiple download will be added.
 */
function addSuggestions(divId, selectedPlatform, product) {
    var repos = searchSampleDownloads(selectedPlatform, product);
    if (repos.length <= 0) { 
        alert("No Suggestion found"); // TBD, need to remove, currently for debug purpose only
        return;
    }
    var innerHtml = "";
    for (var i = 0; i < repos.length; ++i) {
        innerHtml += "<li>" + getPanelHtml(repos[i]) + "</li>";
    }
    $("#" + divId).html("<ul class='panel-collection'>" + innerHtml + "</ul>");

    // do binding for each download button
    for (var i = 0; i < repos.length; ++i) {
        var btnid = "codesample-download-button-" + repos[i].uid;
        $('#' + btnid).click(downloadCodeSampleHandler);
    }
}


/*
 * builds the panel html from the given repo
 */
function getPanelHtml(repo) {
    return "<div class='panel panel-default text-center panel-download'>" +
                "<div class='panel-heading'>" +
                    "<div class='panel-title'>" + repo.CodeSampleName + "</div>" +
                "</div>" +
               "<div class='panel-body'>" +
                  repo.Description +
               "</div>" +
                "<div class='panel-footer'>" + getDownloadButtonHTML(repo.uid) + "</div>" +
            "</div>";
}

/*
 * build the download html for the given repo
 */
function getDownloadButtonHTML(uid) {
    return "<a class='btn btn-success' "+ 
        "id='codesample-download-button-" + uid +"'"+ 
        "data-uid='" + uid + "'" +
        ">" + "<i class='fa fa-download'></i> Download" + "</a>";
}



function downloadCodeSampleHandler()
{
    var uid = $(this).attr("data-uid"); 
    codeSamplePackageAndDownload(uid, registerAppParams.clientId, registerAppParams.clientSecret,
    registerAppParams.redirectUri, registerAppParams.signonUri);
    
}

//$(function () {
//    $('#go-get-code-msg-done').click(function () {
//        $('#go-get-code-msg-done').addClass('hidden');
//        $('#spinner-for-downloading').addClass('fa-spin');
//        $('#spinner-for-injecting').addClass('fa-spin');        
//        $('#spinner-for-downloading').addClass('hidden');
//        $('#spinner-for-injecting').addClass('hidden');
//        $('#check-for-downloading').addClass('hidden');
//        $('#check-for-injecting').addClass('hidden');
//        $('#msg-for-downloading').addClass('hidden');
//        $('#msg-for-injecting').addClass('hidden');
//        $('#go-get-code-msg').addClass('hidden');
//    });
//});

/*
 * The core function that downloads the code sample and embeds the client id and other details in
 * code sample
 * 
 * uid=> unique id of the repo that need to be downloaded
 * next 4 params come from the registerAppParams object
 * sdk is true if the sdk download button was clicked, false if not
 * 
 */
function codeSamplePackageAndDownload(uid, clientId, clientSecret, appRedirectUrl, signOnUrl, sdk) {
    //For sdk options, append -sdk so a different 
    if (sdk) {
        uid = uid + "-sdk";
    }
    var repo = getRepoById(uid);
    if (repo == null) {
        alert("No repo found for the given uid = " + uid); // TBD, need to remove, currently for debug purpose only
        return;
    }
    try {
        _resetFlags();
        var platformName = repo.Platform;
        _setPlatformSelectedIndex(platformName);
        ga('send', 'event', 'DownloadCodeSample', 'Begin-' + platformName, platformName, 0);

        if (typeof navigator !== "undefined" && /(Safari\/[1-9])/.test(navigator.userAgent) && /(Chrome\/[1-9])/.test(navigator.userAgent)==false)  {
            console.log('Safari does not support :blob for downloading.');
            throw new Error('SafariDownloadNotSupported');
        }

        if (clientId === undefined || clientId === null)
        {
            throw new Error('ClientIdIsUndefnied');
        }

        //$('#go-get-code-msg-done').addClass('hidden');
        //$('#go-get-code-msg').removeClass('hidden');
        //$('#spinner-for-downloading').removeClass('hidden');
        //$('#msg-for-downloading').removeClass('hidden');
        //$('#spinner-for-injecting').removeClass('hidden');
        //$('#msg-for-injecting').removeClass('hidden');

        var clientIdOriginalFormat = clientId;
        $.support.cors = true; //this is required for IE support
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            console.log('The File APIs are not fully supported in this browser.');
            throw new Error('FileAPINotSupported');
        }

        if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
            console.log('This IE version is not supported, please upgrade your browser.');
            throw new Error('IEUnsupportedVersion');
        }

        var zipFileName = repo.LocalZipFile;
        JSZipUtils.getBinaryContent(zipFileName, function (err, data) {
            if (err) {
                throw new Error('ErrorReadingFiles');
            }

            var codeSampleZip = new JSZip(data); //
            for (var nameOfFile in codeSampleZip.files) {
                var file = codeSampleZip.files[nameOfFile]; //may be move it inside If clause
               
                if (nameOfFile === repo.FileName) {
                    fileContent = file.asText();
                    codeSampleZip.remove(nameOfFile);
                    fileContent = fileContent.replace(repo.ClientIdStringToReplace, clientId);
                    fileContent = fileContent.replace(repo.ClientSecretStringToReplace, clientSecret);
                    fileContent = fileContent.replace(repo.RedirectURLStringToReplace, appRedirectUrl);
                    fileContent = fileContent.replace(repo.SignOnURLStringToReplace, signOnUrl);

                    //special case for UWP tenant name replacement
                    if (platformName === 'option-windowsuniversal' || platformName === 'option-ruby') {
                        var tenantName =  $("#tenantField").val();
                        fileContent = fileContent.replace(repo.TenantNameToReplace, tenantName);
                    }

                    codeSampleZip.file(nameOfFile, fileContent);
                }
                    //special case for iOS swift folder
                    if (platformName === 'option-ios') 
                    {
                        if (nameOfFile === 'O365-iOS-Connect-master\/swift\/O365-iOS-Connect-Swift\/AuthenticationManager.swift') {
                        fileContent = file.asText();
                        codeSampleZip.remove(nameOfFile);
                        fileContent = fileContent.replace(repo.ClientIdStringToReplace, clientId);
                        fileContent = fileContent.replace(repo.ClientSecretStringToReplace, clientSecret);
                        fileContent = fileContent.replace(repo.RedirectURLStringToReplace, appRedirectUrl);
                        fileContent = fileContent.replace(repo.SignOnURLStringToReplace, signOnUrl);
                        codeSampleZip.file(nameOfFile, fileContent);
                        }
                    }
            }

            var content = codeSampleZip.generate({ type: "blob" });
            window.saveAs(content, repo.GitHubRepoName + ".zip");
           
            ga('send', 'event', 'DownloadCodeSample', 'Success-' + platformName, platformName, 1);
            appInsights.trackEvent("DownloadCodeSampleWithClientId", { ClientId: clientIdOriginalFormat, Platform: platformName, IsSdkDownload: sdk});
            MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'DownloadCodeSample-Success', 'ms.contentproperties', platformName + '-withClientId');
        });
        _progressStatus(100);   
    }
    catch (error) {
        _errorHandlerDownloadSample(error, repo);
            }
}

function ViewCodeSampleInGithub(platformName) {
    var gitHubRepoLocation = "https://github.com/OfficeDev"; //onError it will redirect to Office Dev repo
    $.each(reposList, function (key, repos) {
        $(repos).each(function (index, repo) {
            if (repo.Platform === platformName) {
                gitHubRepoLocation = platform.GitHubRepoUrl;
                return;
            }
        });
    });
    window.open(gitHubRepoLocation, "_blank");
    ga('send', 'event', 'DownloadCodeSample', 'ViewOnGithub-' + platformName);
    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'ViewCodeSampleOnGithub', 'ms.contentproperties', platformName);
}



//To be edited for production, elements name will be different.
function _resetFlags() {
    inError = false; zipHasContent = false; selectedPlatformIndex = undefined;
    }

//Need to improve this function to show error in UI. Show download link from GitHub if in Error.
function _errorHandlerDownloadSample(error, repo) {
    var msg;
    switch (error.message) {
        case 'ClientIdIsUndefnied':
            msg = 'If you sign in and register an app then we can embed the client id and related credential values for you.';
            break;
        case 'SafariDownloadNotSupported':
            msg = "So you know Safari and our desire to set you up as fast as possible don't play as well together as we'd like at the moment. We've downloaded the code sample for you, but you'll need to update the client id, client secret (if applicable), and redirect uri in the code yourself. See the readme in the download for more instructions. If you don't want to make the changes yourself, you can use Chrome or Firefox to download the sample.";
            break;
        case 'FileAPINotSupported':
            msg = 'File APIs are not supported in your browser.';
            break;
        case 'ErrorReadingFiles':
            msg = 'Error Reading file from source.';
            break;
        case 'IEUnsupportedVersion':
            msg = 'IE version less than 10 is not supported.';
            break;
        default:
            msg = 'Unknown Error'
            break;
    }

    if (selectedPlatformIndex != undefined) {
        msg = 'We downloaded the sample from GitHub, but it is not configured with an Azure app registration. Follow the readme instructions in the sample to configure it. ' + msg;
        location.href = (repo.GitHubMasterZipUrl);
        MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'DownloadCodeSample-Success', 'ms.contentproperties', getCookie("platform"));
        ga('send', 'event', 'DownloadCodeSample', getCookie("platform"));
        $('#post-download-instructions').html(msg)
        $('#post-download-instructions').show();
        return;

    }
    ga('send', 'event', 'DownloadCodeSample', 'Error-' + msg, '', 0);
    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'DownloadCodeSample-Error', 'ms.callresult', error.message);
}

function _setPlatformSelectedIndex(platformSelected) {
    $.each(reposList, function (key, repos) {
        $(repos).each(function (index, platform) {
            if (platform.Platform === platformSelected) {
                selectedPlatformIndex = index;
                return;
            }
        });
    });
}


//To Be Deleted: This function will be replaced with actuall progress bar function. This is added for testing only
function _progressStatus(progressBar) {
    if (progressBar >= 100) {
        progressBar = 100;
        setDocumentationDivForPlatform(platformId, 'postDownloadInstructions', 'post-download-instructions');
    }
//document.getElementById("progressBar").textContent = 'Download progress ' + progressBar + ' %.';
}

function setAllSetDiv() {
    var imgHtml = '<img src='+window.runTimeEnv.getMediaUrl("/media/Default/GettingStarted/graph_getting_started_keepgoing_486x250.png")+' alt="keep going">';
    var allSetDiv=$('#AllSet');
    allSetDiv.html(imgHtml);
    allSetDiv.removeClass('hidden');
    return;
}