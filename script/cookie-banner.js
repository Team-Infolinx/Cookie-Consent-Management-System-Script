document.addEventListener("DOMContentLoaded", function () {
  let bannerData = {
    position: "bottom",
    align: "left",
    backgroundColor: "#4285F4",
    textColor: "#fff",
    title: "We use cookies",
    body: "This website uses cookies to ensure you get the best experience on our website. By clicking Accept All Cookies, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. For more information, please see our ",
  };

  let cookieCategories = [];

  let consent = {
    consentId: "",
    createdDate: "",
    createdAt: "",
    consent: "",
    allowedCookieCategories: [],
    rejectedCookieCategories: [],
  };

  function showCookieBanner(bannerData) {
    let cookieBanner = document.createElement("div");
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

    let bannerText = document.createElement("h3");
    bannerText.style.marginTop = 0;
    bannerText.textContent = bannerData.title || "We use cookies";

    let bannerBodyText = document.createElement("p");
    let defualtBodyText =
      "This website uses cookies to ensure you get the best experience on our website. By clicking Accept All Cookies, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. For more information, please see our ";
    bannerBodyText.textContent = bannerData.body || defualtBodyText;

    let policyLink = document.createElement("a");
    policyLink.textContent = "Cookie Policy";
    policyLink.href = "https://gdpr-info.eu/";
    policyLink.target = "_blank";

    bannerBodyText.appendChild(policyLink);

    let acceptAllButton = document.createElement("button");
    acceptAllButton.textContent = "Accept All";
    acceptAllButton.addEventListener("click", function () {
      console.log("cliked accept all");
    });

    let rejectAllButton = document.createElement("button");
    rejectAllButton.textContent = "Reject All";
    rejectAllButton.addEventListener("click", function () {
      console.log("cliked reject all");
    });

    let cookieSettingButton = document.createElement("button");
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

    let btnDivRight = document.createElement("div");
    let btns = document.createElement("div");

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
    let script = document.getElementsByTagName("script")[0];
    let websiteId = script.getAttribute("websiteId");
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
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "none";

    let cookieSettingsModal = document.createElement("div");
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

    let heading = document.createElement("h3");
    heading.style.marginTop = 0;
    heading.textContent = "Cookie Settings";

    cookieSettingsModal.appendChild(heading);

    let bodyText = document.createElement("p");
    bodyText.textContent = bannerData.body;

    let policyLink = document.createElement("a");
    policyLink.textContent = "Cookie Policy";
    policyLink.href = "https://gdpr-info.eu/";
    policyLink.target = "_blank";

    let hrLine = document.createElement("hr");
    bodyText.appendChild(policyLink);
    bodyText.appendChild(hrLine);

    cookieSettingsModal.appendChild(bodyText);

    let subHeading = document.createElement("h5");
    subHeading.style.margin = "0px 0px 10px 0px";
    subHeading.textContent = "Categories";

    cookieSettingsModal.appendChild(subHeading);

    let categoryBody = document.createElement("div");
    categoryBody.style.overflowY = "auto";
    categoryBody.style.maxHeight = "250px";
    categoryBody.style.marginBottom = "20px";

    for (let i = 0; i < cookieCategories.length; i++) {
      let category = cookieCategories[i];

      let categoryDiv = document.createElement("div");
      categoryDiv.style.display = "flex";
      categoryDiv.style.flexDirection = "row";
      categoryDiv.style.justifyContent = "space-between";
      categoryDiv.style.padding = "0px 0px 10px 0px";

      let actionDiv = document.createElement("div");
      actionDiv.style.display = "flex";
      actionDiv.style.flexDirection = "row";
      actionDiv.style.justifyContent = "flex-end";

      let mainDiv = document.createElement("div");

      let categoryLabel = document.createElement("label");
      categoryLabel.textContent = category.categoryName;

      let categoryDescription = document.createElement("div");
      categoryDescription.textContent = category.categoryDescription;

      let categoryToggle = document.createElement("input");
      categoryToggle.type = "checkbox";
      categoryToggle.name = "cookie-category";
      categoryToggle.value = category.categoryId;

      categoryToggle.addEventListener("change", function () {
        console.log("toggled");
        const categoryId = this.value;
        let isChecked = this.checked;

        var categoryIndex = consent.allowedCookieCategories.findIndex(function (
          category
        ) {
          return String(category.categoryId) === String(categoryId);
        });
        console.log("categoryId : ", categoryId);

        let addingCategory = cookieCategories.find(function (category) {
          return String(category.categoryId) == String(categoryId);
        });

        console.log("adding category : ", addingCategory);
        console.log("categoryid", categoryId);

        // If the checkbox is checked and the category is not already in the allowed category array
        if (isChecked && categoryIndex === -1) {
          consent.allowedCookieCategories.push(addingCategory);
        }

        // If the checkbox is unchecked and the category is in the allowed category array
        if (!isChecked && categoryIndex !== -1) {
          consent.allowedCookieCategories.splice(categoryIndex, 1);
        }
        console.log("allowed catgeoires : ", consent.allowedCookieCategories);
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
      acceptCookiesInModal();
    });

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function () {
      console.log("Clicked save");
      acceptCookiesInModal();
    });

    var rejectAllButton = document.createElement("button");
    rejectAllButton.textContent = "Reject All";
    rejectAllButton.addEventListener("click", function () {
      console.log("cliked reject all");
      rejectCookiesInModal();
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

  function acceptCookiesInModal() {
    document.cookie = "cookies_accepted=true; path=/";
    // const cookieBanner = document.getElementById("cookie-banner");
    // document.body.removeChild(cookieBanner);
    let cookieSettingsModal = document.getElementById("cookie-settings-modal");
    if (cookieSettingsModal) {
      cookieSettingsModal.parentNode.removeChild(cookieSettingsModal);
    }
  }

  function rejectCookiesInModal() {
    // document.cookie = "cookies_accepted=false: path=/";
    // const cookieBanner = document.getElementById("cookie-banner");
    // document.appendChild(cookieBanner);
    var cookieSettingsModal = document.getElementById("cookie-settings-modal");
    if (cookieSettingsModal) {
      cookieSettingsModal.style.display = "none";
    }
    var cookieBanner = document.getElementById("cookie-banner");
    if (cookieBanner) {
      cookieBanner.style.display = "block";
    }
  }
});
