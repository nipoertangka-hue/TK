// 手機版語言選擇器功能

// 切換手機版語言選擇器
function toggleMobileLangSelector(){
  const selector = document.getElementById('mobileLangSelector');
  const chevron = document.querySelector('.mobile-nav-item[onclick="toggleMobileLangSelector()"] .fa-chevron-down');
  
  if(selector){
    const isVisible = selector.style.display !== 'none';
    selector.style.display = isVisible ? 'none' : 'block';
    
    // 旋轉箭頭
    if(chevron){
      chevron.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  }
}

// 關閉手機版語言選擇器
function closeMobileLangSelector(){
  const selector = document.getElementById('mobileLangSelector');
  const chevron = document.querySelector('.mobile-nav-item[onclick="toggleMobileLangSelector()"] .fa-chevron-down');
  
  if(selector) selector.style.display = 'none';
  if(chevron) chevron.style.transform = 'rotate(0deg)';
}

// 更新 closeFrontendMenu 函數，使其也關閉語言選擇器
const originalCloseFrontendMenu = window.closeFrontendMenu;
if(typeof originalCloseFrontendMenu === 'function'){
  window.closeFrontendMenu = function(){
    originalCloseFrontendMenu();
    closeMobileLangSelector();
  };
}

console.log('✅ 手機版語言選擇器功能已載入');
