function findEmail(firstName, lastName, domain) {
    var apiKey = PropertiesService.getScriptProperties().getProperty('HUNTER_API_KEY');
    
    if (!apiKey) {
        return "API Key is not set or invalid.";
    }

    var url = `https://api.hunter.io/v2/email-finder?domain=${encodeURIComponent(domain)}&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&api_key=${encodeURIComponent(apiKey)}`;
    
    try {
        var response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
        var json = JSON.parse(response.getContentText());

        if (response.getResponseCode() === 200 && json.data && json.data.email) {
            return json.data.email;
        } else {
            return json.errors ? json.errors[0].details : "No email found or other error occurred";
        }
    } catch (e) {
        return "Error executing the request: " + e.toString();
    }
}