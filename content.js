// Запрашиваем список всех вкладок у фонового скрипта
chrome.runtime.sendMessage({action: "getTabs"}, (response) => {
  if (!response || !response.tabs) return;

  // Создаем контейнер для нашей новой панели
  const tabContainer = document.createElement("div");
  tabContainer.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; z-index: 2147483647;
    background: #202124; display: flex; flex-wrap: wrap; gap: 4px; padding: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-family: sans-serif;
  `;

  // Сдвигаем сам сайт вниз, чтобы панель его не перекрывала
  document.documentElement.style.marginTop = "60px"; 

  // Рендерим каждую вкладку в многорядную сетку (flex-wrap отвечает за перенос строк)
  response.tabs.forEach(tab => {
    const tabEl = document.createElement("button");
    tabEl.textContent = tab.title || "Новая вкладка";
    tabEl.style.cssText = `
      padding: 6px 12px; background: ${tab.active ? '#35363a' : '#2f3033'};
      color: white; border: none; border-radius: 4px; cursor: pointer;
      max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    `;
    
    // При клике на кнопку — переключаем реальную вкладку Chrome
    tabEl.onclick = () => {
      chrome.runtime.sendMessage({action: "switchTab", tabId: tab.id});
    };
    tabContainer.appendChild(tabEl);
  });

  document.body.appendChild(tabContainer);
});
