function getUrls() {
    chrome.storage.sync.get({
        sites_to_replace: []
    }, function (data) {
        console.log(data.sites_to_replace);
        update(data.sites_to_replace);
    });
}

function update(url_list) {
    var url = document.getElementById('textInputAdd').value;
    url_list.push(url);
    chrome.storage.sync.set({
        sites_to_replace: url_list
    }, function () {

        var saved = document.getElementById('saved');
        saved.textContent = url + " has been added to list of avoided sites.";
        setTimeout(function () {
            saved.textContent = '';
        }, 1500);
    });
}

document.getElementById('saveAddition').addEventListener('click', getUrls); //save_options);