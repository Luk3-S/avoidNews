//$("a[href^='http://stackoverflow.com']").attr("href", "https://www.w3schools.com/");

// $("a[href^='https://stackoverflow.com']").each(function(){
//     this.href = this.href.replace('href', 
//         "https://www.youtube.com/watch?v=660L1AmOh2g")
// });




var matched_tags = document.querySelectorAll('a[href^="https://stackoverflow.com"]');

matched_tags.forEach(function(tag){
    console.log("take a break");
    tag.setAttribute('href','https://www.reddit.com/')
});

