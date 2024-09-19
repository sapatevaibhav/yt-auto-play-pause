browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('youtube.com/watch')) {
    browser.scripting.executeScript({
      target: {tabId: tabId},
      files: ['content.js']
    });
  }
});
browser.runtime.onMessage.addListener((message, sender) => {
  browser.tabs.query({url: "*://*.youtube.com/*"}).then((tabs) => {
    tabs.forEach(tab => {
      if (tab.id !== sender.tab.id) {
        browser.tabs.sendMessage(tab.id, message);
      }
    });
  });
});

