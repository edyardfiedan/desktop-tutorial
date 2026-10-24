// Слушаем команды от нашей кастомной панели на страницах
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTabs") {
    chrome.tabs.query({currentWindow: true}, (tabs) => sendResponse({tabs}));
    return true; // Важно для асинхронного ответа
  }
  if (request.action === "switchTab") {
    chrome.tabs.update(request.tabId, {active: true});
  }
});
