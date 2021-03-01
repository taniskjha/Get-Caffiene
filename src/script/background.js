chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
    if( request.message === "reload" ) {
		chrome.tabs.getSelected(null, function(tab) {
		  var code = 'window.location.reload(true);';
		  chrome.tabs.executeScript(tab.id, {code: code});
		});
    }

});
