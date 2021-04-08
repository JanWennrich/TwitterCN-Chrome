(function () {
    const ELEMENT_CONTAINS_CN_CSS_CLASS = 'tcne-contains-cn';

    if (location.hostname !== 'twitter.com') {
        return;
    }

    setInterval(() => {
        document.querySelectorAll(`article:not([data-tcne-parsed='true'])`).forEach((Tweet) => {
            Tweet.dataset.tcneParsed = true;

            let TweetContentWrapper = Tweet.querySelector('div[lang]');
            let containsCN = false;

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

            let cn = cnMatch?.groups?.CN;

            insertOverlay(TweetContentWrapper, cn);
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
        TweetContentWrapper.classList.add(ELEMENT_CONTAINS_CN_CSS_CLASS);
        TweetContentWrapper.parentElement.insertAdjacentHTML('afterbegin', `
            <div class="tcne-overlay">
                CN: ${CN}
            </div>
        `);
    }
})();


