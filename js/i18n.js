// Define a variable to store the loaded translations
var translations = {};

function loadLanguageFile(langCode) {
    // Construct the file name based on the language code
    var fileName = 'i18n/' + langCode + '.json';
  
    // Make an HTTP request to load the JSON file
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', fileName, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Parse the JSON response
          translations = JSON.parse(xhr.responseText);
        } else {
          // If the request fails, set default language as "en"
          loadDefaultLanguage();
        }
        
        // Replace the translations in the HTML
        replaceTranslations();
      }
    };
    xhr.send(null);
  }
  
  // Function to load the default language (en)
  function loadDefaultLanguage() {
    var defaultFileName = 'i18n/en.json';
  
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', defaultFileName, false); // Use synchronous request
    xhr.send(null);
  
    if (xhr.status === 200) {
      translations = JSON.parse(xhr.responseText);
    }
  }

// Replace the translations in the HTML
function replaceTranslations() {
  // Find all elements with data-i18n attribute
  var elements = document.querySelectorAll('[data-i18n]');
  
  // Iterate through the elements and replace the translations
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var key = element.getAttribute('data-i18n');
    
    // Replace the innerHTML with the translation
    element.innerHTML = translations[key];
  }
}

// Detect the user's language and load the appropriate file
var userLanguage = navigator.language || navigator.userLanguage;
var languageCode = userLanguage.split('-')[0]; // Extract the language code

// Call the loadDefaultLanguage function when loadLanguageFile fails initially
if (!loadLanguageFile(languageCode)) {
    loadDefaultLanguage();
}