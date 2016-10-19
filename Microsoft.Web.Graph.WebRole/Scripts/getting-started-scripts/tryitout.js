var responseBody = '';

function TryItOut(elemIDs, elemClasses, app) {

    var serviceEndpointUris_user;
    var curServiceOptionIndex = 0;
    var data = window.tryoutSampleData;
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
        var html = "<table id='paramTable' class='table'>" + window.tryoutTableHeader + rowHtml + "</table>";
        var tab = $(tableSelector);
        tab.empty();
        tab.append(html);
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
}
