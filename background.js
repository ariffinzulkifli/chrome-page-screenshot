chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'capture-download') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                files: ['html2canvas.js']
            }, () => {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    files: ['content.js']
                });
            });
        });
    }
});