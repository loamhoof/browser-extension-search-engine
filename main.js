;(() => {
    const redirect = (req) => {
        const url = new URL(req.url);
        const targetURL = url.searchParams.get('url');
        const searchTerms = url.searchParams.get('search');

        const decodedSearchTerms = searchTerms.replaceAll(/&#(\d+);/g, (...matches) => String.fromCodePoint(matches[1]));
        const redirectURL = targetURL.replace('%s', decodedSearchTerms);

        return { redirectUrl: redirectURL };
    };

    chrome.webRequest.onBeforeRequest.addListener(redirect, { urls: [ '<all_urls>' ] }, ['blocking']);
})();
