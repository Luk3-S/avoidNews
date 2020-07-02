let testDiv = document.getElementById('test');

chrome.storage.sync.get('url_to_replace',function(data){
    testDiv.innerHTML = data.url_to_replace;
});