document.getElementById('capture-download').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'capture-download' });
    document.getElementsByClassName('loading-capture-download-start')[0].style.display = 'block';
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "hide-capture-download-loading") {
        document.getElementsByClassName('loading-capture-download-start')[0].style.display = 'none';
        document.getElementsByClassName('loading-capture-download-finish')[0].style.display = 'block';

        setTimeout(function() {
            document.getElementsByClassName('loading-capture-download-finish')[0].style.display = 'none';
        }, 1000);
    }
});

// Changelog:
// 0.1 - Create basic full page capture and download