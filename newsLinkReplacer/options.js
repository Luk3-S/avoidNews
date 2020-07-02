function save_options(){
    var url = document.getElementById('textInput').value;
    chrome.storage.sync.set({
        url_to_replace: url,
    }, function(){
        var saved = document.getElementById('saved');
        saved.textContent = url +" has been added to list of avoided sites.";
        setTimeout(function (){
            saved.textContent = '';
        },1500);

    });
}

document.getElementById('saveInput').addEventListener('click',save_options);