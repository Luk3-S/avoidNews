var matched_tags = document.querySelectorAll('a[href^="https://stackoverflow.com"]');

matched_tags.forEach(function(tag){
    console.log("take a break");
    tag.setAttribute('href','https://www.reddit.com/')
});

