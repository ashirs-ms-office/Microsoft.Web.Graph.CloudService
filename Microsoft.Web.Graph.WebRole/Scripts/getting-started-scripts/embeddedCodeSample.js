//Variables for error handling
var inError = false;
var zipHasContent = false;
var selectedPlatformIndex = undefined; //to identify which platform is selected in reposList

/*
 * The core function that downloads the code sample and embeds the client id and other details in
 * code sample
 * 
 * uid=> unique id of the repo that need to be downloaded
 * next 4 params come from the registerAppParams object
 * sdk is true if the sdk download button was clicked, false if not
 * 
 */
function codeSamplePackageAndDownload(repo, clientId, clientSecret, appRedirectUrl, signOnUrl) {
    try {
        _resetFlags();
        var platformName = repo.Platform;

        ga('send', 'event', 'DownloadCodeSample', 'Begin-' + platformName, platformName, 0);

        if (typeof navigator !== "undefined" && /(Safari\/[1-9])/.test(navigator.userAgent) && /(Chrome\/[1-9])/.test(navigator.userAgent)==false)  {
            console.log('Safari does not support :blob for downloading.');
            throw new Error('SafariDownloadNotSupported');
        }

        if (clientId === undefined || clientId === null)
        {
            throw new Error('ClientIdIsUndefnied');
        }

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
            appInsights.trackEvent("DownloadCodeSampleWithClientId", { ClientId: clientIdOriginalFormat, Platform: platformName});
            MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'DownloadCodeSample-Success', 'ms.contentproperties', platformName + '-withClientId');
        });
        _progressStatus(100);   
    }
    catch (error) {
        _errorHandlerDownloadSample(error, repo);
            }
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