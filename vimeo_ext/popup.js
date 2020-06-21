

//function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
//    console.log('Tab script:');
//    console.log(document.querySelector('iframe'));
//    return document.body.innerHTML;
//}

function doStuff(domContent) {
    console.log('I received the following DOM content: ', domContent);
}

//We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
//chrome.tabs.executeScript({
 //   code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
//}, (results) => {
    //Here we have just the innerHTML and not DOM structure
//    console.log('Popup script:');
//    console.log(results[0]);
//});

let video_urls = [];
let numbers;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log('Listener: ', msg);
    if ( msg.video_url ) {
        video_urls.push(msg.video_url);
    } else {
        numbers = msg;
    }

    let cmds = []
    cmds = video_urls.map((u, i) => {
        if (video_urls.length > 1) {
            return 'wget '+ u + ' -O n' + numbers.nedelia + 'd' + numbers.den + 'z' + numbers.zadanie + '-p' + (i+1) + '.mp4';
        } else {
            return 'wget '+ u + ' -O n' + numbers.nedelia + 'd' + numbers.den + 'z' + numbers.zadanie + '.mp4';
        }
    });
    document.querySelector('#wget').innerHTML = cmds.join("<br/><br/>");
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('sending message to content script');
    chrome.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, doStuff);
});


