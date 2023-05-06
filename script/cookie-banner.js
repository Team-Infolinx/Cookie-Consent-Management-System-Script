document.addEventListener("DOMContentLoaded", function () {
  function showCookieBanner(banner) {
    const cookieBanner = document.createElement("div");
    cookieBanner.id = "cookie-banner";
    cookieBanner.innerHTML = "This is the sample cookie banner";

    cookieBanner.style.position = "fixed";
    cookieBanner.style.bottom = 0;
    cookieBanner.style.left = 0;
    cookieBanner.style.right = 0;
    cookieBanner.style.backgroundColor = "orange";
    cookieBanner.style.padding = "10px";
    cookieBanner.style.color = "white";
    cookieBanner.style.width = "100%";
    cookieBanner.style.zIndex = "9999";

    const bannerHeading = document.createElement("h4");
    bannerHeading.innerText = banner.websiteName;
    cookieBanner.appendChild(bannerHeading);

    const acceptButton = document.createElement("button");
    acceptButton.innerText = "Accept";
    acceptButton.addEventListener("click", acceptCookies);
    cookieBanner.appendChild(acceptButton);

    document.body.appendChild(cookieBanner);
  }

  if (document.cookie.indexOf("cookies_accepted=true") === -1) {
    var script = document.getElementsByTagName("script")[0];
    var websiteId = script.getAttribute("websiteId");
    fetch(`http://localhost:8080/api/v1/getBanner/${websiteId}`)
      .then((res) => res.json())
      .then((bannerDetails) => {
        console.log(JSON.stringify(bannerDetails));
        showCookieBanner(bannerDetails);
      });
  }

  function acceptCookies() {
    document.cookie = "cookies_accepted=true; path=/";
    const cookieBanner = document.getElementById("cookie-banner");
    document.body.removeChild(cookieBanner);
  }
});
