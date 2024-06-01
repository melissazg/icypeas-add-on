function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Hunter.io')
        .addItem('Set API Key', 'showSidebar')
        .addItem('Check API Key', 'displayApiKey')
        .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('SideBar')
      .setTitle('Icypeas add-on')
      .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

// Mask all but the last 4 characters of the API key
function displayApiKey() {
    var apiKey = PropertiesService.getScriptProperties().getProperty('HUNTER_API_KEY');
    if (!apiKey) {
        SpreadsheetApp.getUi().alert("API Key is not set.");
        return;
    }
    var maskedKey = '•'.repeat(apiKey.length - 4) + apiKey.slice(-4);
    SpreadsheetApp.getUi().alert("API Key: " + maskedKey);
}

function saveApiKey(apiKey) {
    PropertiesService.getScriptProperties().setProperty('HUNTER_API_KEY', apiKey);
}