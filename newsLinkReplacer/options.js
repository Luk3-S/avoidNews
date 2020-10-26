function getUrls(arg) {
    console.log(arg)
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
    var elId = "textInput"; //+ option;
    var url = document.getElementById(elId).value;
    var divTarget = document.getElementById("updateMsg");
    var divContent = "";
    const index = url_list.indexOf(url);
    console.log("option: " + option)
    if (option == "Add") {
        if (url != "") {
            var present = true;
            if (index == -1) {
                present = false;
                if (url.length > 0) {
                    url_list.push(url);
                }
            }
            divContent = present ? url + " is already on the list of avoided sites." : url + " has been added to list of avoided sites.";
        } else {
            divContent = "You cannot add an empty string to the list. Try again"
        }
    } else {
        if (index > -1) {
            url_list.splice(index, 1);
            divContent = url + " has been removed from list of avoided sites.";
        } else {
            divContent = url + "wasn't on the list of avoided sites."
        }
    }
    chrome.storage.sync.set({
        sites_to_replace: url_list
    }, function () {
        divTarget.textContent = divContent;

        setTimeout(function () {
            divTarget.textContent = '';
            document.getElementById(elId).value = "";
        }, 1500);
    });

    updateList();

}

function updateList() {
    console.log("hrer")
    chrome.storage.sync.get('sites_to_replace', function (data) {
        $.ajax({
            data: data.sites_to_replace,
            success: function (result) {
                console.log("data: " + data.sites_to_replace);
                $("#siteListDiv").html(initList(data.sites_to_replace));
            }
        });
    });
}






document.getElementById('saveAddition').addEventListener('click', getUrls.bind(null, "Add"));
document.getElementById('saveRemoval').addEventListener('click', getUrls.bind(null, "Remove"));