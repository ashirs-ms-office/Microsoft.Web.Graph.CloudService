using System;
using System.Data.Common;


namespace Microsoft.Web.Portal.Common
{
    /// <summary>
    /// Class representing Runt time environment configuration
    /// </summary>
    public class Environment
    {

        /// <summary>
        /// Utility method that reads the web/appconfig file and gets the value for the specified key
        /// if that key not found, ti returns the default value stated for  that key
        /// </summary>
        /// <param name="key"></param>
        /// <param name="anyDefaultValue"></param>
        /// <returns></returns>
        private static string GetValue(string key, string anyDefaultValue = "")
        {
            string result = anyDefaultValue; // Default Value
            // to be very safe, because if sth goes wrong
            try
            {
                result = System.Configuration.ConfigurationManager.AppSettings[key];
                if (result == null)
                {
                    result = anyDefaultValue; // Default Value
                }
            }
            catch (Exception)
            {
                result = anyDefaultValue; // Default Value
            }
            return result;
        }

        #region Application Name

        /// <summary>
        /// ApplicationName
        /// </summary>
        private static string _applicationName;

        /// <summary>
        /// Name for currently running application
        /// </summary>
        public static string ApplicationName
        {
            get
            {
                if (_applicationName == null)
                {
                    _applicationName = GetValue("Microsoft.Web.Portal.Common.Environment.ApplicationName", "Warning.Applicaiton.Name.Missing");
                }
                return _applicationName;
            }
        }
        #endregion

        #region Default Culture
        private static string _defaultCulture;

        public static string DefaultCulture
        {
            get
            {
                if (_defaultCulture == null)
                {
                    _defaultCulture = GetValue("Microsoft.Web.Portal.DefaultCulture", "en-us");
                }
                return _defaultCulture;
            }
        }
        #endregion

        #region Supported Culture
        private static string _supportedCultures;

        public static string SupportedCultures
        {
            get
            {
                if (_supportedCultures == null)
                {
                    _supportedCultures = GetValue("Microsoft.Web.Portal.SupportedCulture", "[/-]en-us/?");
                }
                return _supportedCultures;
            }
        }
        #endregion

        private static string _mediaStorage;

        /// <summary>
        /// Media Storage that needs to be used it can be a CDN, or Azure Blob Storage
        /// if nothing is defined local file systme would be returned which is an empty string
        /// </summary>
        public static string MediaStorage
        {
            get
            {
                if (_mediaStorage == null)
                {
                    _mediaStorage = GetValue("Orchard.DevOffice.Common.MediaStorage");
                }
                return _mediaStorage;
            }
        }

        private static string _themeAssetStorage;

        /// <summary>
        /// Theme Storage that needs to be used it can be a CDN, or Azure Blob Storage
        /// if nothing is defined local file systme would be returned which is an empty string
        /// </summary>
        public static string ThemeAssetStorage
        {
            get
            {
                if (_themeAssetStorage == null)
                {
                    _themeAssetStorage = GetValue("Orchard.DevOffice.Common.ThemeAssetStorage");
                }
                return _themeAssetStorage;
            }
        }

        private static string _scriptStorage;

        /// <summary>
        /// Theme Storage that needs to be used it can be a CDN, or Azure Blob Storage
        /// if nothing is defined local file systme would be returned which is an empty string
        /// </summary>
        private static string ScriptStorage
        {
            get
            {
                if (_scriptStorage == null)
                {
                    _scriptStorage = GetValue("Orchard.DevOffice.Common.ScriptStorage");
                }
                return _scriptStorage;
            }
        }

        private static string _styleStorage;

        /// <summary>
        /// Theme Storage that needs to be used it can be a CDN, or Azure Blob Storage
        /// if nothing is defined local file systme would be returned which is an empty string
        /// </summary>
        private static string StyleStorage
        {
            get
            {
                if (_styleStorage == null)
                {
                    _styleStorage = GetValue("Orchard.DevOffice.Common.StyleStorage");
                }
                return _styleStorage;
            }
        }

        /// <summary>
        /// Returns the asset url depending on the storage defined in the config
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static string GetMediaUrl(string url)
        {
            return MediaStorage + url;
        }

        /// <summary>
        /// Returns the asset url depending on the storage defined in the config
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static string GetThemeAssetUrl(string url)
        {
            return ThemeAssetStorage + url;
        }

        /// <summary>
        /// Returns the asset url depending on the storage defined in the config
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static string GetScriptUrl(string url)
        {
            return ScriptStorage + url;
        }

        /// <summary>
        /// Returns the asset url depending on the storage defined in the config
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static string GetStyleUrl(string url)
        {
            return StyleStorage + url;
        }
    }
}