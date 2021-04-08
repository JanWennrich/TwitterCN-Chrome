chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.scripting.insertCSS({
        target: {tabId: details.tabId},
        files : ['style.css'],
    }, chrome.scripting.executeScript({
        target: {tabId: details.tabId},
        files : ['foreground.js'],
    }));
});
