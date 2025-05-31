  chrome.action.onClicked.addListener(() => {
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 150,
      height: 150,
      top: 700, 
      left: 20,
      focused: false
    });
  });
  
  