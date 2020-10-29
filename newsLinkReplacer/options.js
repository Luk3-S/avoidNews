function getUrls(arg) {
    chrome.storage.sync.get({
        sites_to_replace: []
    }, function (data) {
        if (arg == "Add") {
            update(data.sites_to_replace, "Add");
        } else {
            update(data.sites_to_replace, "Remove");
        }
    });
}

function update(url_list, option) {
    console.log(url_list);
    var elId = "textInput";
    var url = document.getElementById(elId).value;
    var divTarget = document.getElementById("updateMsg");
    var divContent = "";
    url = generaliseUrl(url);
    const index = url_list.indexOf(url);

    if (option == "Add") {
        if (url != "") {

            var present = true;
            if (index == -1) {
                present = false;
                url_list.push(url);

            }
            divContent = present ? url + " is already on the list of avoided sites." : url + " has been added to list of avoided sites.";
        } else {
            divContent = "The url entered is not well formed. Please try again."
        }
    } else {
        if (index > -1) {
            url_list.splice(index, 1);
            divContent = url + " has been removed from list of avoided sites.";
        } else {
            divContent = url + " wasn't on the list of avoided sites."
        }
    }
    chrome.storage.sync.set({
        sites_to_replace: url_list
    }, function () {
        divTarget.textContent = divContent;

        setTimeout(function () {
            divTarget.textContent = '';
            document.getElementById(elId).value = "";
        }, 500);
    });

    updateListView();

}

function updateListView() {
    chrome.storage.sync.get('sites_to_replace', function (data) {
        $.ajax({
            data: data.sites_to_replace,
            success: function (result) {
                $("#siteListDiv").html(initList(data.sites_to_replace));
            }
        });
    });
}

function validateURL(value) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}

function generaliseUrl(url) {
    if (validateURL(url)) {
        var pos = url.split("/", 3).join("/").length;
        tmp = url.substring(0, pos);
        tmp = tmp + "/*"
    } else {
        tmp = "";
    }
    return tmp;
}




document.getElementById('saveAddition').addEventListener('click', getUrls.bind(null, "Add"));
document.getElementById('saveRemoval').addEventListener('click', getUrls.bind(null, "Remove"));