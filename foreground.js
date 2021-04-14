(function () {
    const ELEMENT_CONTAINS_CN_CSS_CLASS = 'tcne-contains-cn';

    if (location.hostname !== 'twitter.com') {
        return;
    }

    setInterval(() => {
        document.querySelectorAll(`article:not([data-tcne-parsed='true'])`).forEach((Tweet) => {
            Tweet.dataset.tcneParsed = true;

            let TweetContentWrapper = Tweet.querySelector('div[lang]');

            if (!TweetContentWrapper) {
                return;
            }

            let tweetText = '';

            TweetContentWrapper.querySelectorAll('span').forEach((Content) => {
                tweetText += Content.textContent;
            });

            let cnMatch = tweetText.match(/(^| +)(CN)(\s+|:|\s*\/+) *(?<CN>.*)/im)
            if (!cnMatch) {
                return;
            }

            Tweet.dataset.tcneContainsCn = true;

            let cnText = cnMatch?.groups?.CN;

            insertOverlay(TweetContentWrapper, cnText);
        });
    }, 500)

    /**
     * Inserts a blurred overlay above the TweetContentWrapper element.
     * CN is the Content Note to display on the overlay
     *
     * @param {Element} TweetContentWrapper
     * @param {String} CN
     */
    function insertOverlay(TweetContentWrapper, CN)
    {
        TweetContentWrapper.parentElement.insertAdjacentHTML('beforeend', `
            <div class="tcne-overlay">
                CN: ${CN}
            </div>
        `);
    }
})();


