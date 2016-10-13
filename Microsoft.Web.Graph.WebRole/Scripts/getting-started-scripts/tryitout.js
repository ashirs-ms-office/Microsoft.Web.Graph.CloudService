var responseBody = '';

function TryItOut(elemIDs, elemClasses, app) {

    var serviceEndpointUris_user;
    var curServiceOptionIndex = 0;
    var data = [
        {
            "name": "Mail API: Get messages",
            "App": "outlook",
            "serviceName": "Mail",
            "serviceEndPointUri": "https://graph.microsoft.com/v1.0",
            "urlpart": "/me/mailFolders/{0}/messages",
            "serverAction": "/GettingStarted/Proxy/EMail",
            "authToken": "Bearer {token:https://graph.microsoft.com/}",
            "img": window.runTimeEnv.getMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_mailblue_53x40.png"),
            "alt": "Mail",
            "icon": "graph-mail",
            "apiDescription": "Get messages",
            "parameters": [
               {
                   "Name": "folder_id",
                   "Type": "string",
                   "Value": [{ "value1": "Inbox" }, { "value2": "SentItems" }, { "value3": "Drafts" }, { "value4": "DeletedItems" }],
                   "Notes": "The target folder ID or well-known name: Inbox, SentItems, Drafts, or DeletedItems."
               }
            ] // end parameters
        }, // end of item
        {
            "name": "Calendar API: Get events",
            "App": "outlook",
            "serviceName": "Calendar",
            "serviceEndPointUri": "https://graph.microsoft.com/v1.0",
            "urlpart": "/me/events?$top=5",
            "serverAction": "/GettingStarted/Proxy/Events",
            "authToken": "Bearer {token:https://graph.microsoft.com/}",
            "img": window.runTimeEnv.getMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_calendarblue_53x50.png"),
            "alt": "Calendar",
            "icon": "graph-calendar",
            "apiDescription": "Get events",
            "parameters": [
            ] // end parameters
        }, // end of item
        {
            "name": "Contacts API: Get all contacts",
            "App": "outlook",
            "serviceName": "Contacts",
            "serviceEndPointUri": "https://graph.microsoft.com/v1.0",
            "urlpart": "/me/contacts",
            "serverAction": "/GettingStarted/Proxy/Contacts",
            "authToken": "Bearer {token:https://graph.microsoft.com/}",
            "img": window.runTimeEnv.getMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_contactsblue_53x50.png"),
            "alt": "Contacts",
            "icon": "graph-contact",
            "apiDescription": "Get all contacts",
            "parameters": [
            ] // end parameters
        }, // end of item
        {
            "name": "Files API: Get files",
            "App": "onedrive",
            "serviceName": "MyFiles",
            "serviceEndPointUri": "https://graph.microsoft.com/v1.0",            
            "urlpart": "/{0}",
            "serverAction": "/GettingStarted/Proxy/ListFolderContents",
            "authToken": "Bearer {token:https://graph.microsoft.com/}",
            "img": window.runTimeEnv.getMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_filesblue_53x50.png"),
            "alt": "File",
            "icon": "graph-file",
            "apiDescription": "Get files",
            "parameters": [
                {
                    "Name": "file path",
                    "Type": "string",
                    "Value": [{ "value1": "drive/root/children" }, { "value2": "me/drive" }, ],
                    "Notes": "Path of the files."
                }
            ] // end parameters
        },
        {
            "name": "Users API: ",
            "serviceEndPointUri": "https://graph.microsoft.com/v1.0",
            "urlpart": "/{0}",
            "authToken": "Bearer {token:https://graph.microsoft.com/}",
            "img": window.runTimeEnv.getMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_userblue_53x50.png"),
            "alt": "User",
            "icon": "graph-user",
            "apiDescription": "Get users",
            "parameters": [
                 {
                     "Name": "user",
                     "Type": "string",
                     "Value": [{ "value1": "me" }, { "value2": "me?$select=skills" }, { "value3": "me/manager" }, { "value4": "myOrganization/users" }, ],
                     "Notes": "User(s) and query strings of user(s) profile."
                 }
            ] // end parameters
        },
        {
            "name": "Groups API: ",
            "serviceEndPointUri": "https://graph.microsoft.com/v1.0",
            "urlpart": "/{0}",
            "authToken": "Bearer {token:https://graph.microsoft.com/}",
            "img": window.runTimeEnv.getMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_groupsblue_53x50.png"),
            "alt": "Group",
            "icon": "graph-group",
            "apiDescription": "Get groups",
            "parameters": [
                 {
                     "Name": "group",
                     "Type": "string",
                     "Value": [{ "value1": "me/memberOf" }, { "value2": "groups/41525360-8eca-49ce-bcee-b205cd0aa747/members" }, { "value3": "groups/41525360-8eca-49ce-bcee-b205cd0aa747/drive/root/children" }, { "value4": "groups/41525360-8eca-49ce-bcee-b205cd0aa747/conversations" }, ],
                     "Notes": "Groups and query strings of group profile."
                 }
            ] // end parameters
        },
    ];

    var elementIDs = elemIDs;
    var elementClasses = elemClasses;
    var serviceMenu = $("#" + elementIDs.services);
    var urlValueElem = $("#" + elementIDs.urlValue);
    var responseBodyElem = $("#" + elementIDs.responseBody);
    var parameterDetailsElem = $("#" + elementIDs.parameterDetails);
    var invokeUrlBtnElem = $("#" + elementIDs.invokeurlBtn);
    var responseCodeContainer = $("." + elementClasses.CodeContainer);
    //var sandBoxOptions = $("#" + elementIDs.sandBoxOptions);
    ShowTryItOutServiceMenu(serviceMenu);

    function ShowTryItOutServiceMenu(menuSelector)
    {
        // build product menu
        var appHtml = '<button id="serviceOption0' + '" class="serviceOptionBlock col-xs-6 col-sm-4 col-md-2 click" value="0">';
        //appHtml += '<img class="img-responsive imgGS imgSelectApp" src="' + data[0].img + '"' + 'alt="' + data[0].alt + '"><span>' + data[0].apiDescription + '</span><br /><br /></button>';
        appHtml += '<span class="graph ' + data[0].icon + '"' + '></span><p>' + data[0].apiDescription + '</p></button>';

        for (var i = 1; i < data.length; ++i) {
            //filter "Pick a service to Try" combo based on app name in querystring, if specified
            // var appName = data[i].App;
            var appName = "";
            if ((app==null || app=="") || appName.indexOf(app) > -1) {               
                appHtml += '<button id="serviceOption' + i + '" class="serviceOptionBlock col-xs-6 col-sm-4 col-md-2" value="' + i + '">';
                //appHtml += '<img class="img-responsive imgGS imgSelectApp" src="' + data[i].img + '"' + 'alt="' + data[i].alt + '"><span>' + data[i].apiDescription + '</span><br /><br /></button>';
                appHtml += '<span class="graph ' + data[i].icon + '"' + '></span><p>' + data[i].apiDescription + '</p></button>';
            }
        }

        appHtml += '<div style="clear:both;"></div>';

        menuSelector.html(appHtml);
    }
    // register handler on clicking the try button
    invokeUrlBtnElem.on("click", function () {
        var url = urlValueElem.text();
        responseBodyElem.text("");

        // CopyCode feature only works on IE (not Edge) and FireFox. So hide the button for other browsers. 
        if (typeof navigator !== "undefined" && (!!document.documentMode || (typeof InstallTrigger !== 'undefined'))) {
            $('#CopyCodeLink').removeClass('hidden');
        }

        invokeUrlOnSampleData(url, curServiceOptionIndex);       
    })

   
    function updateParams() {
        buildParameterTable(parameterDetailsElem);
        $(responseBodyElem).text("");
        $("#tryError").html("");
        updateUrl();
        $("#invokeurlBtn").prop("disabled", false).css("cursor", "pointer");
    }

    $(function () {
        $(".serviceOptionBlock").click(function () {
            $(this).addClass("click").siblings().removeClass("click");
            $("#response-container").hide();
            curServiceOptionIndex = $(this).attr("value");
            updateParams();
        })
    });

    $(function () {
        $("#CopyCodeLink").click(function () {
            copyCode(responseBody);
        });
    });
   
    function updateUrl() {
        var url = GetUrl(true);
        urlValueElem.html(url);
    }
    function GetUrl(useDefault) {
      
        var json = data[curServiceOptionIndex];
        var serviceEndpoint;
        serviceEndpoint = json["serviceEndPointUri"];
       
        var url = serviceEndpoint + json["urlpart"];
        if (json["parameters"].length > 0) {
            var paramValue = $("#paramTable .textbox").val();
            if (paramValue === undefined || paramValue == null || paramValue == "")
            {
                //TBD: hacky code, currently  it assumes that we are using only one parameter
                paramValue = json["parameters"][0]["Value"];
            }
            url = url.replace("{0}",paramValue);
        }
        return url;
    }

    // builds the parameter table based on the selected menus
    function buildParameterTable(tableSelector)   
    {       
        var parameters = data[curServiceOptionIndex]["parameters"];
        if (parameters.length === 0)
        {
            $(tableSelector).empty();
            return;
        }
        //build header
        var headerHtml = "<thead><td>Name</td><td>Type</td><td>Value</td><td>Notes</td></thead>";
        //build rows
        var rowHtml = "";
        for (var i = 0; i < parameters.length; ++i) {
            var cell1 = "<td>" + parameters[i]["Name"] + "</td>";
            var cell2 = "<td>" + parameters[i]["Type"] + "</td>";
            var cell3 = "";

            if (curServiceOptionIndex == 0) {
                cell3 = "<td>" + "<select aria-label='parameter' id='valueSelection' class='textbox'>" + '<option value="Inbox">Inbox</option><option value="SentItems">SentItems</option><option value="Drafts">Drafts</option><option value="DeletedItems">DeletedItems</option>' + "</select></td>";
            } else
            if (curServiceOptionIndex == 3) {
                cell3 = "<td>" + "<select aria-label='parameter' id='valueSelection' class='textbox'>" + '<option value="drive/root/children">drive/root/children</option><option value="me/drive">me/drive</option>' + "</select></td>";
            } else if (curServiceOptionIndex == 4) {
                cell3 = "<td>" + "<select aria-label='parameter' id='valueSelection' class='textbox'>" + '<option value="me">me</option><option value="me?$select=skills">me?$select=skills</option><option value="me/manager">me/manager</option><option value="myOrganization/users">myOrganization/users</option>' + "</select></td>";
            } else if (curServiceOptionIndex == 5) {
                cell3 = "<td>" + "<select aria-label='parameter' id='valueSelection' class='textbox'>" + '<option value="me/memberOf">me/memberOf</option><option value="groups/41525360-8eca-49ce-bcee-b205cd0aa747/members">groups/41525360-8eca-49ce-bcee-b205cd0aa747/members</option><option value="groups/41525360-8eca-49ce-bcee-b205cd0aa747/drive/root/children">groups/41525360-8eca-49ce-bcee-b205cd0aa747/drive/root/children</option><option value="groups/41525360-8eca-49ce-bcee-b205cd0aa747/conversations">groups/41525360-8eca-49ce-bcee-b205cd0aa747/conversations</option>' + "</select></td>";
            } else {
                cell3 = "<td>" + "<input class='textbox' type='text' value= " + parameters[i]["Value"] + " />" + "</td>";
            }

            var cell4 = "<td>" + parameters[i]["Notes"] + "</td>";
            rowHtml += "<tr>" + cell1 + cell2 + cell3 + cell4 + "</tr>";
        }
        var html = "<table id='paramTable' class='table'>" + headerHtml + rowHtml + "</table>";
        var tab = $(tableSelector);
        tab.empty();
        tab.append(html);

        // add error handler
        // sample URL displayed in the challengebox is get updated when mouse focus out
        $("#paramTable .textbox").focusout(function () {
            var paramValue = $("#paramTable .textbox").val();
            if(paramValue =="" || typeof(paramValue)===undefined) {
                $("#tryError").html("Please enter a parameter");
                $("#invokeurlBtn").prop("disabled", true).css("cursor", "default");
                return;
            }
            updateUrl();
            var pattern = new RegExp(/^.*?(?=[\^#&\*:<>\{\|\}]).*$/);
            if(pattern.test(paramValue)) {
                $("#tryError").html("<bold>parameter contains at least one invalid chars</bold>");
                $("#invokeurlBtn").prop("disabled", true).css("cursor", "default");
            }
        });

        // sample URL displayed in the challengebox get updated when select value changes
        $("#valueSelection").change(function () {
            var paramValue = $("#paramTable .textbox").val();
            if (paramValue == "" || typeof (paramValue) === undefined) {
                $("#tryError").html("Please enter a parameter");
                $("#invokeurlBtn").prop("disabled", true).css("cursor", "default");
                return;
            }
            updateUrl();           
            var pattern = new RegExp(/^.*?(?=[\^#&\*:<>\{\|\}]).*$/);
            if (pattern.test(paramValue)) {
                $("#tryError").html("<bold>parameter contains at least one invalid chars</bold>");
                $("#invokeurlBtn").prop("disabled", true).css("cursor", "default");
            }
        });

        $("#paramTable .textbox").focus(function () {
            $("#tryError").html("");
            $("#invokeurlBtn").prop("disabled", false).css("cursor", "pointer");
            return;
        });
    }
   
    function getServiceEndPoint()
    {
        var msgHolder = $("#tryError");
        //msgHolder.addClass('loading');;
        msgHolder.html("Getting the service endpoint...");
        ga('send', 'event', 'O365path-Rest', 'Try-it-out-GetServiceEndPoint-Begin');
        $.ajax({
            url: "/gettingstarted/proxy/EndPoints",
            async:false,
            type: 'GET',
            success: function (data, textStatus, xhr) {
                msgHolder.html("");
                serviceEndpointUris_user = data;
                ga('send', 'event', 'O365path-Rest', 'Try-it-out-GetServiceEndPoint-Success');
            },
            error: function (jqXHR, exception) {
                msgHolder.html("<div class='ms-font-color-error ms-font-m'>Encountered error while requesting service endpoint, Please login and try again</div>");
                ga('send', 'event', 'O365path-Rest', 'Try-it-out-GetServiceEndPoint-Error-' + jqXHR.responseText);
                MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-GetServiceEndPoint-Error', 'ms.callresult', jqXHR.responseText);
            },
            complete: function (xhr) {
            }
        });
    }

    function invokeUrlOnUserData()
    {
        $("#response-container").show("slow");
        invokeUrlBtnElem.prop("disabled", true).css("cursor", "default");
        responseCodeContainer.addClass('loading');

        var json = data[curServiceOptionIndex];
        var controller = json["serverAction"];
        var param = $("#paramTable .textbox").val();
        if (typeof (param) != 'undefined')
        {
            controller += ("/" + param);
        }

        var requestHeaders = JSON.parse('{}');
        requestHeaders['Accept'] = 'application/json';
 
        var result = "";
        ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnUserData-' + controller + '-Begin');

        $.ajax({
            url: controller,
            type: 'GET',
            headers: requestHeaders,
            success: function (data, textStatus, xhr) {
                updateResponse(result, data, true);
                resultStatus = xhr.status;
                ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnUserData-' + controller + '-Success');
                MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-invokeUrlOnUserData-Success', 'ms.contentproperties', controller);
            },
            error: function (jqXHR, exception) {
                updateResponse(result, "Error...", false);
                if (jqXHR.status === 0) {
                    updateResponse(result, "The request has been cancelled, please login and try again", false);
                    ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnUserData-' + controller + '-Error-Request has been cancelled');
                    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-invokeUrlOnUserData-Error', 'ms.contentproperties', controller, 'ms.callresult', 'Request has been cancelled');
                    return;
                }
                else {
                    updateResponse(result, jqXHR.responseText, false);
                    ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnUserData-' + controller + '-Error-' + jqXHR.responseText);
                    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-invokeUrlOnUserData-Error', 'ms.contentproperties', controller, 'ms.callresult', jqXHR.responseText);
                    return;
                }
            },
            complete: function (xhr) {
                responseCodeContainer.removeClass('loading');;
                responseBodyElem.jsonView(result);
                // enable the btn
                invokeUrlBtnElem.prop("disabled", false).css("cursor", "pointer");
            }
        });

        function updateResponse(x, data, jsonFormatting) {
            if (jsonFormatting) {
                result += JSON.stringify(data);
            } else {
                result += data;
            }
        }

    }

    // invokes the URL
    function invokeUrlOnSampleData(url)
    {
        $("#response-container").show("slow");
        
        //disable invoke btn
        invokeUrlBtnElem.prop("disabled", true).css("cursor", "default");
        responseCodeContainer.addClass('loading');

        var authToken = data[curServiceOptionIndex]["authToken"];
        var resultStatus='';
        var requestHeaders = JSON.parse('{}');
        requestHeaders['Accept'] = 'application/json';
        requestHeaders['Authorization'] = authToken;
        requestHeaders['ApiExProxy-FixedAadUser'] = 1;
        var urlToSend = "https://apiexproxy.azurewebsites.net/svc?url=" + url;

        var result ="";
        ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnSampleData-' + url + '-Begin');

        $.ajax({
            url: urlToSend,
            type: 'GET',
            headers: requestHeaders,
            success: function (data, textStatus, xhr) {
                updateResponse(result, data, true);
                resultStatus = xhr.status;
                ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnSampleData-' + url + '-Success');
                MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-invokeUrlOnSampleData-Success', 'ms.contentproperties', url);
            },
            error: function(jqXHR, exception) { 
                // Time out 
                if (exception === 'timeout') {
                    updateResponse(result, "Timeout occurred...", false);
                    ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnSampleData-' + url + '-Error-' + 'TimeoutError');
                    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-invokeUrlOnSampleData-Error', 'ms.contentproperties', url, 'ms.callresult', 'TimeoutError');
                    return;
                }
                var errorHeader = jqXHR.getResponseHeader('ApiExProxy-Error');
                //Proxy Error or DNS Lookup Failure (502)
                if (jqXHR.status == '0' || (errorHeader != null && errorHeader != '0')) {
                    updateResponse(result, "Proxy not reachable", false);
                    ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnSampleData-' + url + '-Error-' + 'ProxyNotReachable');
                    MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-invokeUrlOnSampleData-Error', 'ms.contentproperties', url, 'ms.callresult', 'ProxyNotReachable');
                } else {
                    try {
                       // Service Error
                        var jsonResponseText = $.parseJSON(jqXHR.responseText);
                        updateResponse(result, jsonResponseText, true);
                        resultStatus = jqXHR.status;
                        ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnSampleData-' + url + '-Error-' + jsonResponseText);
                        MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-invokeUrlOnSampleData-Error', 'ms.contentproperties', url, 'ms.callresult', jsonResponseText);
                    }
                    catch (error) {
                        // Unexpected Service Error 
                        updateResponse(result, "Unexpected Error occured", false);
                        ga('send', 'event', 'O365path-Rest', 'Try-it-out-invokeUrlOnSampleData-' + url + '-Error-' + 'Unexpected Service Error');
                        MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'O365apis', 'ms.ea_action', 'Try-it-out-invokeUrlOnSampleData-Error', 'ms.contentproperties', url, 'ms.callresult', 'Unexpected Service Error');
                    }
                }
            },
            complete: function(xhr) {
                responseCodeContainer.removeClass('loading');;
                responseBodyElem.jsonView(result);
                // enable the btn
                invokeUrlBtnElem.prop("disabled", false).css("cursor", "pointer");
            }
        });
        
        function updateResponse(x, data, jsonFormatting) {
            if (jsonFormatting) {
                result+=JSON.stringify(data);
            } else {
                result+=data;
            }
            responseBody = result;
        }
    }

    // initialize the parameters for the first time
   // updateParams();
    updateParams();
    // get service endpoint if user is authenticated
    //$.ajax({
    //    url: "/GettingStarted/Account/IsAuthenticated",
    //    async: true,
    //    type: 'GET',
    //    success: function (data, textStatus, xhr) {
    //        if (data == "True") {
    //            getServiceEndPoint();
    //        }
    //    }
    //});
}
