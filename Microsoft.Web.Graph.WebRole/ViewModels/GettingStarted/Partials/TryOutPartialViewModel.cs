using System;
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
        private enum tryoutApiIndex
        {
            GetMessages = 0,
            GetEvents = 1,
            GetContacts = 2,
            GetFiles = 3,
            GetUsers = 4,
            GetGroups = 5
        }
        #region Json Data string

        public string jsonData = @"[
            {
            'serviceEndPointUri': 'https://graph.microsoft.com/v1.0',
            'urlpart': '/me/mailFolders/{0}/messages',
            'serverAction': '/GettingStarted/Proxy/EMail',
            'authToken': 'Bearer {token:https://graph.microsoft.com/}',
            'img': '/media/Default/GettingStarted/devOffice_getting_started_mailblue_53x40.png',
            'icon': 'graph-mail',
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
            'parameters': [
                {
                    'Name': 'file path',
                    'Type': 'string',
                    'Value': ['drive/root/children','me/drive'],
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
            'parameters': [
                 {
                     'Name': 'user',
                     'Type': 'string',
                     'Value': ['me','me?$select=skills','me/manager','myOrganization/users'],
                 }
            ]
            },
            {
            'serviceEndPointUri': 'https://graph.microsoft.com/v1.0',
            'urlpart': '/{0}',
            'authToken': 'Bearer {token:https://graph.microsoft.com/}',
            'img': '/media/Default/GettingStarted/devOffice_getting_started_groupsblue_53x50.png',
            'icon': 'graph-group',
            'parameters': [
                 {
                     'Name': 'group',
                     'Type': 'string',
                     'Value': ['me/memberOf' ,'groups/41525360-8eca-49ce-bcee-b205cd0aa747/members','groups/41525360-8eca-49ce-bcee-b205cd0aa747/drive/root/children','groups/41525360-8eca-49ce-bcee-b205cd0aa747/conversations'],
                 }
            ] // end parameters
        }
        ]";
        #endregion

        #region Try out Json data model
        private APIModel[] _apiModel;

        private void LocalizeTheApiModel()
        {
            //get the labels
            _apiModel[(int)tryoutApiIndex.GetMessages].apiDescription = Resources.GettingStarted.Index.TRY_OUT_GET_MESSAGE_LABEL;
            _apiModel[(int)tryoutApiIndex.GetEvents].apiDescription = Resources.GettingStarted.Index.TRY_OUT_GET_EVENTS_LABEL;
            _apiModel[(int)tryoutApiIndex.GetContacts].apiDescription = Resources.GettingStarted.Index.TRY_OUT_GET_CONTACTS_LABEL;
            _apiModel[(int)tryoutApiIndex.GetFiles].apiDescription = Resources.GettingStarted.Index.TRY_OUT_GET_FILES_LABEL;
            _apiModel[(int)tryoutApiIndex.GetUsers].apiDescription = Resources.GettingStarted.Index.TRY_OUT_GET_USERS_LABEL;
            _apiModel[(int)tryoutApiIndex.GetGroups].apiDescription = Resources.GettingStarted.Index.TRY_OUT_GET_GROUPS_LABEL;

            //fix the notes
            _apiModel[(int)tryoutApiIndex.GetMessages].parameters[0].Notes = Resources.GettingStarted.Index.TRY_OUT_GET_MESSAGES_NOTES_TEXT;
            _apiModel[(int)tryoutApiIndex.GetFiles].parameters[0].Notes = Resources.GettingStarted.Index.TRY_OUT_GET_FILES_NOTES_TEXT;
            _apiModel[(int)tryoutApiIndex.GetUsers].parameters[0].Notes = Resources.GettingStarted.Index.TRY_OUT_GET_USERS_NOTES_TEXT;
            _apiModel[(int)tryoutApiIndex.GetGroups].parameters[0].Notes = Resources.GettingStarted.Index.TRY_OUT_GET_GROUPS_NOTES_TEXT;
        }
        public APIModel[] DataModels
        {
            get
            {
                if (_apiModel == null)
                {
                    _apiModel = JsonConvert.DeserializeObject<APIModel[]>(jsonData);
                    LocalizeTheApiModel();
                }
                return _apiModel;
            }
        }
        #endregion
        public class TableHeader
        {
            public string Name { get; } = Resources.GettingStarted.Index.TRY_OUT_TABLE_HEADER_NAME;
            public string Type { get; } = Resources.GettingStarted.Index.TRY_OUT_TABLE_HEADER_TYPE;
            public string Value { get; } = Resources.GettingStarted.Index.TRY_OUT_TABLE_HEADER_VALUE;
            public string Notes { get; } = Resources.GettingStarted.Index.TRY_OUT_TABLE_HEADER_NOTES;
        }
        public TableHeader Header { get; } = new TableHeader();
        public string Title { get; set; } = Resources.GettingStarted.Index.TRY_OUT_TITLE;
        public string Description { get; set; } = Resources.GettingStarted.Index.TRY_OUT_DESCRIPTION;
        public string TryLabel { get; } = Resources.GettingStarted.Index.TRY_OUT_TRY_LABEL;
        public string RespondBody { get; } = Resources.GettingStarted.Index.TRY_OUT_RESONSE_BODY;
    }
}