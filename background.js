chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript(null, {
    files: ['birthday.js']
  })
})
