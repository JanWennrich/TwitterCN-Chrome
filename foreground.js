(function () {
    const ELEMENT_CONTAINS_CN_CSS_CLASS = 'tcne-contains-cn';

    let areFontStylesInitialized = false;

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

            let cnMatch = tweetText.match(/^.*CN(\s+|:|\s*\/+) *(?<cnType>.*)/im)
            if (!cnMatch) {
                return;
            }

            Tweet.dataset.tcneContainsCn = true;

            let cnText = cnMatch?.groups?.cnType;

            // Only do this once
            if (!areFontStylesInitialized) {
                initializeFontStyles();
                areFontStylesInitialized = true;
            }

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

    /**
     * Sets the TCNE font CSS variables to the values that Twitter uses for Tweet fonts.
     * For some reason the font styles aren't inherited by the TCNE elements automatically.
     */
    function initializeFontStyles()
    {
        console.log('font update');

        // Get the computed styles
        let Tweet = document.querySelector('article div[lang]');

        if (!Tweet) {
            console.log('no tweet');
            return false;
        }

        let computedStyle = window.getComputedStyle(Tweet);
        let rootStyle = document.documentElement.style;

        // Set the CSS variables
        rootStyle.setProperty('--tce-font-family', computedStyle.fontFamily);
        rootStyle.setProperty('--tce-font-size', computedStyle.fontSize);
        rootStyle.setProperty('--tce-font-weight', computedStyle.fontWeight);
        rootStyle.setProperty('--tce-color', computedStyle.color);

        return true;
    }
})();


