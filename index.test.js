const queryString = require('query-string');


beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    require('./index');
})

const visitPage = (title, path) => {
    window.history.pushState({}, title, path);

    // we recommend all consumers execute the javascript on each page load for best conversion tracking
    window.sqp.stickParams()
}

test('should persist all utm marketing codes to local storage', () => {
    window.sqpConfig = {conversionDomain: "app.awesomeproduct.com"};
    const search = queryString.stringify({
        utm_source: "facebook",
        utm_campaign: "20percentoff",
        utm_medium: "socialmedia",
        utm_term: "super awesome product",
        utm_content: "ad_version_bold_text"
    });

    visitPage('Awesome Product', `/plans.html?${search}`);

    expect(window.location.origin).toBe("https://www.awesomeproduct.com")
    expect(window.location.pathname).toBe("/plans.html")
    expect(window.location.search).toBe("?utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
    expect(window.localStorage.getItem('sqp.utm_source')).toBe('facebook')
    expect(window.localStorage.getItem('sqp.utm_campaign')).toBe('20percentoff')
    expect(window.localStorage.getItem('sqp.utm_medium')).toBe('socialmedia')
    expect(window.localStorage.getItem('sqp.utm_term')).toBe('super awesome product')
    expect(window.localStorage.getItem('sqp.utm_content')).toBe('ad_version_bold_text')
});

test('should persist some utm marketing codes to local storage', () => {
    window.sqpConfig = {conversionDomain: "app.awesomeproduct.com"};
    const search = queryString.stringify({
        utm_source: "facebook",
        utm_campaign: "20percentoff",
        utm_medium: "socialmedia",
    });

    visitPage('Awesome Product', `/plans.html?${search}`);

    expect(window.localStorage.getItem('sqp.utm_source')).toBe('facebook')
    expect(window.localStorage.getItem('sqp.utm_campaign')).toBe('20percentoff')
    expect(window.localStorage.getItem('sqp.utm_medium')).toBe('socialmedia')
    expect(window.localStorage.getItem('sqp.utm_term')).toBe(null)
    expect(window.localStorage.getItem('sqp.utm_content')).toBe(null)
});

test('should update domain specific links with utm codes to track conversions', () => {
    window.sqpConfig = {conversionDomain: "app.awesomeproduct.com"};
    document.body.innerHTML = `
        <div id="pricing-plans">
            <a id="free-tier" href="https://app.awesomeproduct.com/free">Startups (Free)</a>
            <a id="business-tier" href="https://app.awesomeproduct.com/business">Business ($50 / month)</a>
            <a id="enterprise-tier" href="https://app.awesomeproduct.com/enterprise">Enterprise ($500 / month)</a>
        </div>
    `
    const search = queryString.stringify({
        utm_source: "facebook",
        utm_campaign: "20percentoff",
        utm_medium: "socialmedia",
        utm_term: "super awesome product",
        utm_content: "ad_version_bold_text"
    });

    visitPage('Awesome Product', `/plans.html?${search}`);

    expect(document.getElementById('free-tier').href).toBe("https://app.awesomeproduct.com/free?utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
    expect(document.getElementById('business-tier').href).toBe("https://app.awesomeproduct.com/business?utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
    expect(document.getElementById('enterprise-tier').href).toBe("https://app.awesomeproduct.com/enterprise?utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
});

test('should update domain specific links and keep any query params', () => {
    window.sqpConfig = {conversionDomain: "app.awesomeproduct.com"};
    document.body.innerHTML = `
        <div id="pricing-plans">
            <a id="free-tier" href="https://app.awesomeproduct.com/free?planId=free">Startups (Free)</a>
            <a id="business-tier" href="https://app.awesomeproduct.com/business?planId=business_monthly">Business ($50 / month)</a>
            <a id="enterprise-tier" href="https://app.awesomeproduct.com/enterprise?planId=enterprise_monthly">Enterprise ($500 / month)</a>
        </div>
    `
    const search = queryString.stringify({
        utm_source: "facebook",
        utm_campaign: "20percentoff",
        utm_medium: "socialmedia",
        utm_term: "super awesome product",
        utm_content: "ad_version_bold_text"
    });

    visitPage('Awesome Product', `/plans.html?${search}`);

    expect(document.getElementById('free-tier').href).toBe("https://app.awesomeproduct.com/free?planId=free&utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
    expect(document.getElementById('business-tier').href).toBe("https://app.awesomeproduct.com/business?planId=business_monthly&utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
    expect(document.getElementById('enterprise-tier').href).toBe("https://app.awesomeproduct.com/enterprise?planId=enterprise_monthly&utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
});

test('should ignore links that do not match the conversion domain', () => {
    window.sqpConfig = {conversionDomain: "app.awesomeproduct.com"};
    document.body.innerHTML = `
        <div id="pricing-plans">
            <a id="free-tier" href="https://app.awesomeproduct.com/free">Startups (Free)</a>
        </div>
        <a id="login" href="https://www.awesomeproduct.com/login">Login</a>
        <a id="facebook" href="https://www.facebook.com/awesomeproduct">Follow us on Facebook!</a>
        <a id="support" href="mailto:support@awesomeproduct.com">support@awesomeproduct.com</a>
    `
    const search = queryString.stringify({
        utm_source: "facebook",
        utm_campaign: "20percentoff",
        utm_medium: "socialmedia",
        utm_term: "super awesome product",
        utm_content: "ad_version_bold_text"
    });

    visitPage('Awesome Product', `/plans.html?${search}`);

    expect(document.getElementById('free-tier').href).toBe("https://app.awesomeproduct.com/free?utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
    expect(document.getElementById('login').href).toBe("https://www.awesomeproduct.com/login")
    expect(document.getElementById('facebook').href).toBe("https://www.facebook.com/awesomeproduct")
    expect(document.getElementById('support').href).toBe("mailto:support@awesomeproduct.com")
});

test("should add utm codes to links even if the user explores multiple pages", () => {
    window.sqpConfig = {conversionDomain: "app.awesomeproduct.com"};
    const search = queryString.stringify({
        utm_source: "facebook",
        utm_campaign: "20percentoff",
        utm_medium: "socialmedia",
        utm_term: "super awesome product",
        utm_content: "ad_version_bold_text"
    });
    document.body.innerHTML = `
        <div id="pricing-plans">
            <a id="free-tier" href="https://app.awesomeproduct.com/free">Startups (Free)</a>
            <a id="business-tier" href="https://app.awesomeproduct.com/business">Business ($50 / month)</a>
            <a id="enterprise-tier" href="https://app.awesomeproduct.com/enterprise">Enterprise ($500 / month)</a>
        </div>
    `

    visitPage('Awesome Product', `/plans.html?${search}`); // customer isn't ready to purchase yet
    visitPage('About Us', `/about.html`); // learning more about the company
    visitPage('Our Services', `/services.html`); // checking out what they do
    visitPage('Product Features', `/features.html`); // what's in it for me?
    visitPage('See What Our Customers Say', `/reviews.html`); // double check this thing isn't a scam
    visitPage('Awesome Product', `/plans.html`); // purchase time!

    expect(document.getElementById('free-tier').href).toBe("https://app.awesomeproduct.com/free?utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
    expect(document.getElementById('business-tier').href).toBe("https://app.awesomeproduct.com/business?utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
    expect(document.getElementById('enterprise-tier').href).toBe("https://app.awesomeproduct.com/enterprise?utm_campaign=20percentoff&utm_content=ad_version_bold_text&utm_medium=socialmedia&utm_source=facebook&utm_term=super%20awesome%20product")
})
