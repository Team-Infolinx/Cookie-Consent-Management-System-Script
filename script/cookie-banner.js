document.addEventListener("DOMContentLoaded", function () {
  var bannerData = {
    position: "bottom",
    align: "left",
    backgroundColor: "#4285F4",
    textColor: "#fff",
    title: "We use cookies",
    body: "This website uses cookies to ensure you get the best experience on our website. By clicking Accept All Cookies, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. For more information, please see our ",
  };

  var cookieCategories = [];

  function showCookieBanner(bannerData) {
    var cookieBanner = document.createElement("div");
    cookieBanner.id = "cookie-banner";
    cookieBanner.style.position = "fixed";
    cookieBanner.style.width = "450px";
    cookieBanner.style.minWidth = "400px";
    cookieBanner.style.padding = "15px";
    cookieBanner.style.borderRadius = "8px";

    if (bannerData.position === "top" && bannerData.align === "left") {
      cookieBanner.style.top = "10px";
      cookieBanner.style.left = "10px";
    } else if (bannerData.position === "top" && bannerData.align === "right") {
      cookieBanner.style.top = "10px";
      cookieBanner.style.right = "10px";
    } else if (
      bannerData.position === "bottom" &&
      bannerData.align === "left"
    ) {
      cookieBanner.style.bottom = "10px";
      cookieBanner.style.left = "10px";
    } else {
      cookieBanner.style.bottom = "10px";
      cookieBanner.style.right = "10px";
    }

    cookieBanner.style.backgroundColor =
      bannerData.backgroundColor || "#4285F4";
    cookieBanner.style.color = bannerData.textcolor || "#fff";

    var bannerText = document.createElement("h3");
    bannerText.style.marginTop = 0;
    bannerText.textContent = bannerData.title || "We use cookies";

    var bannerBodyText = document.createElement("p");
    var defualtBodyText =
      "This website uses cookies to ensure you get the best experience on our website. By clicking Accept All Cookies, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. For more information, please see our ";
    bannerBodyText.textContent = bannerData.body || defualtBodyText;

    var policyLink = document.createElement("a");
    policyLink.textContent = "Cookie Policy";
    policyLink.href = "https://gdpr-info.eu/";
    policyLink.target = "_blank";

    bannerBodyText.appendChild(policyLink);

    var acceptAllButton = document.createElement("button");
    acceptAllButton.textContent = "Accept All";
    acceptAllButton.addEventListener("click", function () {
      console.log("cliked accept all");
    });

    var rejectAllButton = document.createElement("button");
    rejectAllButton.textContent = "Reject All";
    rejectAllButton.addEventListener("click", function () {
      console.log("cliked reject all");
    });

    var cookieSettingButton = document.createElement("button");
    cookieSettingButton.textContent = "Cookie Settings";
    cookieSettingButton.addEventListener("click", function () {
      console.log("clicked cookie settings");
      showCookieSettingsModal();
    });

    acceptAllButton.style.fontSize = "16px";
    acceptAllButton.style.border = "none";
    acceptAllButton.style.padding = "10px 0px 10px 0px";
    acceptAllButton.style.width = "50%";
    acceptAllButton.style.background = bannerData.textColor;
    acceptAllButton.style.color = bannerData.backgroundColor;
    acceptAllButton.style.borderRadius = "8px";

    rejectAllButton.style.fontSize = "16px";
    rejectAllButton.style.color = bannerData.textColor;
    rejectAllButton.style.border = "solid";
    rejectAllButton.style.borderWidth = "2px";
    rejectAllButton.style.backgroundColor = bannerData.backgroundColor;
    rejectAllButton.style.borderColor = bannerData.textColor;
    rejectAllButton.style.padding = "10px 0px 10px 0px";
    rejectAllButton.style.width = "50%";
    rejectAllButton.style.borderRadius = "8px";
    rejectAllButton.style.marginRight = "5px";

    cookieSettingButton.style.fontSize = "16px";
    cookieSettingButton.style.color = bannerData.textColor;
    cookieSettingButton.style.border = "solid";
    cookieSettingButton.style.borderWidth = "2px";
    cookieSettingButton.style.backgroundColor = bannerData.backgroundColor;
    cookieSettingButton.style.borderColor = bannerData.textColor;
    cookieSettingButton.style.padding = "10px 0px 10px 0px";
    cookieSettingButton.style.width = "100%";
    cookieSettingButton.style.borderRadius = "8px";

    var btnDivRight = document.createElement("div");
    var btns = document.createElement("div");

    btnDivRight.style.display = "flex";
    btnDivRight.style.flexDirection = "row";
    btnDivRight.style.justifyContent = "space-between";

    btns.style.padding = "5px 0px";
    btns.style.display = "flex";
    btns.style.flexDirection = "row";
    btns.style.justifyContent = "space-between";

    btns.appendChild(cookieSettingButton);

    btnDivRight.appendChild(rejectAllButton);
    btnDivRight.appendChild(acceptAllButton);

    cookieBanner.appendChild(bannerText);
    cookieBanner.appendChild(bannerBodyText);
    cookieBanner.appendChild(btnDivRight);
    cookieBanner.appendChild(btns);

    document.body.appendChild(cookieBanner);
  }

  if (document.cookie.indexOf("cookies_accepted=true") === -1) {
    var script = document.getElementsByTagName("script")[0];
    var websiteId = script.getAttribute("websiteId");
    // fetch(`http://localhost:8080/api/v1/cookiebannerjs/getBanner/${websiteId}`)
    //   .then((res) => res.json())
    //   .then((bannerDetails) => {
    //     console.log(JSON.stringify(bannerDetails));
    //     showCookieBanner(bannerDetails);
    //   });
    console.log(websiteId);
    fetchCookieCategories(websiteId);
    showCookieBanner(bannerData);
  }

  function fetchCookieCategories(websiteId) {
    fetch(
      `http://localhost:8080/api/v1/websites/${websiteId}/cookie-categories`
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch cookie categories");
        }
      })
      .then(function (data) {
        cookieCategories = data;
        console.log(cookieCategories);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function showCookieSettingsModal() {
    var cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "none";

    var cookieSettingsModal = document.createElement("div");
    cookieSettingsModal.id = "cookie-settings-modal";
    cookieSettingsModal.style.position = "fixed";
    cookieSettingsModal.style.top = "50%";
    cookieSettingsModal.style.left = "50%";
    cookieSettingsModal.style.width = "400px";
    cookieSettingsModal.style.minWidth = "380px";
    cookieSettingsModal.style.height = "500px";
    cookieSettingsModal.style.transform = "translate(-50%, -50%)";
    cookieSettingsModal.style.backgroundColor = "#fff";
    cookieSettingsModal.style.padding = "20px";
    cookieSettingsModal.style.borderRadius = "8px";
    cookieSettingsModal.style.border = "solid";
    cookieSettingsModal.style.borderWidth = "2px";
    cookieSettingsModal.style.borderColor = "#e7e7e7";
    cookieSettingsModal.style.boxShadow =
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

    var heading = document.createElement("h3");
    heading.style.marginTop = 0;
    heading.textContent = "Cookie Settings";

    cookieSettingsModal.appendChild(heading);

    var bodyText = document.createElement("p");
    bodyText.textContent = bannerData.body;

    var policyLink = document.createElement("a");
    policyLink.textContent = "Cookie Policy";
    policyLink.href = "https://gdpr-info.eu/";
    policyLink.target = "_blank";

    var hrLine = document.createElement("hr");
    bodyText.appendChild(policyLink);
    bodyText.appendChild(hrLine);

    cookieSettingsModal.appendChild(bodyText);

    var subHeading = document.createElement("h5");
    subHeading.style.margin = "0px 0px 10px 0px";
    subHeading.textContent = "Categories";

    cookieSettingsModal.appendChild(subHeading);

    var categoryBody = document.createElement("div");
    categoryBody.style.overflowY = "auto";
    categoryBody.style.maxHeight = "250px";
    categoryBody.style.marginBottom = "20px";

    for (var i = 0; i < cookieCategories.length; i++) {
      var category = cookieCategories[i];

      var categoryDiv = document.createElement("div");
      categoryDiv.style.display = "flex";
      categoryDiv.style.flexDirection = "row";
      categoryDiv.style.justifyContent = "space-between";
      categoryDiv.style.padding = "0px 0px 10px 0px";

      var actionDiv = document.createElement("div");
      actionDiv.style.display = "flex";
      actionDiv.style.flexDirection = "row";
      actionDiv.style.justifyContent = "flex-end";

      var mainDiv = document.createElement("div");

      var categoryLabel = document.createElement("label");
      categoryLabel.textContent = category.categoryName;

      var categoryDescription = document.createElement("div");
      categoryDescription.textContent = category.categoryDescription;

      var categoryToggle = document.createElement("input");
      categoryToggle.type = "checkbox";
      categoryToggle.name = "cookie-category";
      categoryToggle.value = category.categoryId;

      categoryToggle.addEventListener("change", function () {
        console.log("toggled");
        // code for the handling consent.
        var categoryId = this.value;
        var consent = this.checked;
      });

      actionDiv.appendChild(categoryToggle);
      categoryDiv.appendChild(categoryLabel);
      categoryDiv.appendChild(actionDiv);
      mainDiv.appendChild(categoryDiv);
      mainDiv.appendChild(categoryDescription);
      var hr = document.createElement("hr");
      categoryBody.appendChild(mainDiv);
      categoryBody.appendChild(hr);
    }

    cookieSettingsModal.appendChild(categoryBody);

    var btnsDiv = document.createElement("div");
    btnsDiv.style.display = "flex";
    btnsDiv.style.justifyContent = "space-between";
    btnsDiv.style.flexDirection = "row";
    btnsDiv.style.padding = "10px , 0px , 0px, 0px";

    var acceptAllButton = document.createElement("button");
    acceptAllButton.textContent = "Accept All";
    acceptAllButton.addEventListener("click", function () {
      console.log("cliked accept all");
    });

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function () {
      console.log("Clicked save");
    });

    var rejectAllButton = document.createElement("button");
    rejectAllButton.textContent = "Reject All";
    rejectAllButton.addEventListener("click", function () {
      console.log("cliked reject all");
    });

    acceptAllButton.style.fontSize = "14px";
    acceptAllButton.style.border = "none";
    acceptAllButton.style.padding = "10px 0px 10px 0px";
    acceptAllButton.style.width = "30%";
    acceptAllButton.style.background = bannerData.backgroundColor;
    acceptAllButton.style.color = bannerData.textColor;
    acceptAllButton.style.borderRadius = "8px";

    rejectAllButton.style.fontSize = "16px";
    rejectAllButton.style.border = "solid";
    rejectAllButton.style.borderWidth = "2px";
    rejectAllButton.style.backgroundColor = "white";
    rejectAllButton.style.borderColor = "black";
    rejectAllButton.style.padding = "10px 0px 10px 0px";
    rejectAllButton.style.width = "30%";
    rejectAllButton.style.borderRadius = "8px";
    rejectAllButton.style.marginRight = "5px";

    saveButton.style.fontSize = "16px";
    saveButton.style.border = "solid";
    saveButton.style.borderWidth = "2px";
    saveButton.style.backgroundColor = "white";
    saveButton.style.borderColor = "black";
    saveButton.style.padding = "10px 0px 10px 0px";
    saveButton.style.width = "30%";
    saveButton.style.borderRadius = "8px";
    saveButton.style.marginRight = "5px";

    btnsDiv.appendChild(rejectAllButton);
    btnsDiv.appendChild(saveButton);
    btnsDiv.appendChild(acceptAllButton);

    cookieSettingsModal.appendChild(btnsDiv);
    document.body.appendChild(cookieSettingsModal);
  }

  function acceptCookies() {
    document.cookie = "cookies_accepted=true; path=/";
    const cookieBanner = document.getElementById("cookie-banner");
    document.body.removeChild(cookieBanner);
  }
});
