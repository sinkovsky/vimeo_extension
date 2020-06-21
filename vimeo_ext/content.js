console.log('I am a content script');

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log('Received message: ', msg);
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        console.log('Sending response');
//        sendResponse(document.body.innerHTML);

        const script = document.querySelector('body > script').innerHTML;
        console.log('Script: ', script);
        const result = script.match(/"width":1280.+?"url":"(.+?)"/m);
        if ( result ) {
            console.log('video url: ', result[1]);
            chrome.runtime.sendMessage({video_url: result[1]});
        } else {
            const nedelia = document.querySelector('#wrapper > div > div.section._course-day-title > div > div > div.side-switcher > div > p');
            console.log('Nedelia: ', nedelia);
            const den = document.querySelector('#wrapper > div > div.section._course-day-title > div > div > div.course-day-page__days-of-week.days-of-week > ul > li.days-of-week__item._active > span');
            console.log('Den: ', den);
            const zadanie = document.querySelector('#wrapper > div > div:nth-child(3) > div > div.course-day.fixed-box > aside > section.sidebar-item.course-day__exercises > div > div > div > ul > li.exercise._selected > div.exercise__title > p');
            console.log('Zadanie: ', zadanie);
            chrome.runtime.sendMessage({
                nedelia: nedelia ? nedelia.innerHTML.match(/\d+/)[0] : '',
                den: den ? den.innerHTML.match(/\d+/)[0] : '',
                zadanie: zadanie ? zadanie.innerHTML.match(/\d+/)[0] : ''
            });
        }
        sendResponse('ok');
    }
    return true;
});

//console.log(document.body.querySelector(':nth-child(3)'));
