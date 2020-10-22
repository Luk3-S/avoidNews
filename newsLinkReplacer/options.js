function getUrls(arg) {
    console.log(arg)
    chrome.storage.sync.get({
        sites_to_replace: []
    }, function (data) {
        //console.log(data.sites_to_replace);

        if (arg == "add") {
            update(data.sites_to_replace);
        } else {
            remove(data.sites_to_replace);
        }
    });
}

function update(url_list) {
    var url = document.getElementById('textInputAdd').value;
    var saved = document.getElementById('saved');
    const index = url_list.indexOf(url);
    var present = true;
    if (index == -1) {
        present = false;
        url_list.push(url);
    }
    chrome.storage.sync.set({
        sites_to_replace: url_list
    }, function () {
        if (!present) {
            saved.textContent = url + " has been added to list of avoided sites.";
        } else {
            saved.textContent = url + " is already on the list of avoided sites.";

        }
        setTimeout(function () {
            saved.textContent = '';
            document.getElementById('textInputAdd').value = "";
        }, 1500);
    });
}

function remove(url_list) {

    var url = document.getElementById('textInputRemove').value;
    console.log("url:" + url + ", url list: " + url_list)
    try {
        const index = url_list.indexOf(url);
        console.log("index is:" + index)
        if (index > -1) {
            url_list.splice(index, 1);
        }
    } catch {
        console.log("Element to be removed not found in site list")
    }
    console.log("url_list after " + url_list)
    chrome.storage.sync.set({
        sites_to_replace: url_list
    }, function () {

        var removed = document.getElementById('removed');
        removed.textContent = url + " has been removed from list of avoided sites.";
        setTimeout(function () {
            removed.textContent = '';
            document.getElementById('textInputRemove').value = "";

        }, 1500);
    });
}
document.getElementById('saveAddition').addEventListener('click', getUrls.bind(null, "add")); //getUrls("add")); 
document.getElementById('saveRemoval').addEventListener('click', getUrls.bind(null, "remove"));