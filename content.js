async function loadingPage(container) {
    let totalHeight = container.scrollHeight;
    let currentScroll = 0;
    let scrollStep = window.innerHeight;
    let delay = 500;

    while (currentScroll < totalHeight) {
        window.scrollBy(0, scrollStep);
        currentScroll += scrollStep;
        await new Promise(resolve => setTimeout(resolve, delay));

        totalHeight = container.scrollHeight;
    }

    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, delay));
}

if (!window.container) {
    window.container = document.body;
}

loadingPage(window.container).then(() => {

    const fullWidth = document.documentElement.scrollWidth;
    const fullHeight = document.documentElement.scrollHeight;

    window.container.style.width = `${fullWidth}px`;
    window.container.style.height = `${fullHeight}px`;

    html2canvas(window.container, {
        width: fullWidth,
        height: fullHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: fullWidth,
        windowHeight: fullHeight,
        useCORS: true
    }).then(canvas => {

        const pageTitle = document.title || 'captured_image';

        const link = document.createElement('a');
        link.download = pageTitle + '.png';
        link.href = canvas.toDataURL();
        link.click();

        chrome.runtime.sendMessage({ action: 'hide-capture-download-loading' });
    }).catch(error => {
        console.log('html2canvas error:', error);
        chrome.runtime.sendMessage({ action: 'hide-capture-download-loading' });
    });
}).catch(error => {
    console.log('Image load error:', error);
    chrome.runtime.sendMessage({ action: 'hide-capture-download-loading' });
});