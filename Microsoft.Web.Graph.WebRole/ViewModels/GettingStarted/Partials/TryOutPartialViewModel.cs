﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials
{
    #region Classes for serialization and deserailization
    public class Parameter
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string[] Value { get; set; }
        public string Notes { get; set; }
    }

    public class APIModel
    {
        public string urlpart { get; set; }
        public string serverAction { get; set; }
        public string serviceEndPointUri { get; set; }
        public string img { get; set; }
        public string icon { get; set; }
        public string authToken { get; set; }
        public string apiDescription { get; set; }
        public Parameter[] parameters { get; set; }
    }

    #endregion


    public class TryOutPartialViewModel
    {
        #region Json Data string

        public string jsonData = @"[
            {
            'serviceEndPointUri': 'https://graph.microsoft.com/v1.0',
            'urlpart': '/me/mailFolders/{0}/messages',
            'serverAction': '/GettingStarted/Proxy/EMail',
            'authToken': 'Bearer {token:https://graph.microsoft.com/}',
            'img': '/media/Default/GettingStarted/devOffice_getting_started_mailblue_53x40.png',
            'icon': 'graph-mail',
            'apiDescription': 'Get messages',
            'parameters': [
               {
                   'Name': 'folder_id',
                   'Type': 'string',
                   'Value': ['Inbox', 'SentItems','Drafts','DeletedItems'],
                   'Notes': 'The target folder ID or well-known name: Inbox, SentItems, Drafts, or DeletedItems.'
               }
            ] // end parameters
            },
            {
            'serviceEndPointUri': 'https://graph.microsoft.com/v1.0',
            'urlpart': '/me/events?$top=5',
            'serverAction': '/GettingStarted/Proxy/Events',
            'authToken': 'Bearer {token:https://graph.microsoft.com/}',
            'img': '/media/Default/GettingStarted/devOffice_getting_started_calendarblue_53x50.png',
            'icon': 'graph-calendar',
            'apiDescription': 'Get events',
            'parameters': [
            ] // end parameters
            },
            {
            'serviceEndPointUri': 'https://graph.microsoft.com/v1.0',
            'urlpart': '/me/contacts',
            'serverAction': '/GettingStarted/Proxy/Contacts',
            'authToken': 'Bearer {token:https://graph.microsoft.com/}',
            'img': '/media/Default/GettingStarted/devOffice_getting_started_contactsblue_53x50.png',
            'icon': 'graph-contact',
            'apiDescription': 'Get all contacts',
            'parameters': [
            ] // end parameters
            },
            {
            'serviceEndPointUri': 'https://graph.microsoft.com/v1.0',            
            'urlpart': '/{0}',
            'serverAction': '/GettingStarted/Proxy/ListFolderContents',
            'authToken': 'Bearer {token:https://graph.microsoft.com/}',
            'img': '/media/Default/GettingStarted/devOffice_getting_started_filesblue_53x50.png',
            'icon': 'graph-file',
            'apiDescription': 'Get files',
            'parameters': [
                {
                    'Name': 'file path',
                    'Type': 'string',
                    'Value': ['drive/root/children','me/drive'],
                    'Notes': 'Path of the files.'
                }
            ]
            },
            {
            'name': 'Users API: ',
            'serviceEndPointUri': 'https://graph.microsoft.com/v1.0',
            'urlpart': '/{0}',
            'authToken': 'Bearer {token:https://graph.microsoft.com/}',
            'img': '/media/Default/GettingStarted/devOffice_getting_started_userblue_53x50.png',
            'icon': 'graph-user',
            'apiDescription': 'Get users',
            'parameters': [
                 {
                     'Name': 'user',
                     'Type': 'string',
                     'Value': ['me','me?$select=skills','me/manager','myOrganization/users'],
                     'Notes': 'User(s) and query strings of user(s) profile.'
                 }
            ]
            },
            {
            'serviceEndPointUri': 'https://graph.microsoft.com/v1.0',
            'urlpart': '/{0}',
            'authToken': 'Bearer {token:https://graph.microsoft.com/}',
            'img': '/media/Default/GettingStarted/devOffice_getting_started_groupsblue_53x50.png',
            'icon': 'graph-group',
            'apiDescription': 'Get groups',
            'parameters': [
                 {
                     'Name': 'group',
                     'Type': 'string',
                     'Value': ['me/memberOf' ,'groups/41525360-8eca-49ce-bcee-b205cd0aa747/members','groups/41525360-8eca-49ce-bcee-b205cd0aa747/drive/root/children','groups/41525360-8eca-49ce-bcee-b205cd0aa747/conversations'],
                     'Notes': 'Groups and query strings of group profile.'
                 }
            ] // end parameters
        }
        ]";
        #endregion

        #region Try out Json data model
        private APIModel[] _apiModel;

        public APIModel[] DataModels
        {
            get
            {
                if (_apiModel == null)
                {
                    _apiModel = JsonConvert.DeserializeObject<APIModel[]>(jsonData);
                }
                return _apiModel;
            }
        }
        #endregion

        public string Title { get; set; } = Resources.GettingStarted.Index.TRY_OUT_TITLE;
        public string Description { get; set; } = Resources.GettingStarted.Index.TRY_OUT_DESCRIPTION;
    }
}