document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */

  const backButton =
    document.getElementById("backButton");

  const mobileTab =
    document.getElementById("mobileTab");

  const pochiTab =
    document.getElementById("pochiTab");

  const mobileForm =
    document.getElementById("mobileForm");

  const pochiForm =
    document.getElementById("pochiForm");

  const phone =
    document.getElementById("phone");

  const amount =
    document.getElementById("amount");

  const continueButton =
    document.getElementById("continueButton");

  const businessNumber =
    document.getElementById("businessNumber");

  const pochiAmount =
    document.getElementById("pochiAmount");

  const pochiContinue =
    document.getElementById("pochiContinue");

  const mpesaPayment =
    document.getElementById("mpesaPayment");

  const shirikiPayment =
    document.getElementById("shirikiPayment");

  const contactButton =
    document.getElementById("contactButton");

  const qrButton =
    document.getElementById("qrButton");

  const addFavourite =
    document.getElementById("addFavourite");

  const toast =
    document.getElementById("toast");


  /* =========================
     TOAST
  ========================= */

  function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 1800);
  }


  /* =========================
     BACK BUTTON
  ========================= */

  backButton.addEventListener("click", () => {

    /*
      Returns to your main dashboard.
      Make sure your dashboard is named index.html.
    */

    window.location.href = "index.html";

  });


  /* =========================
     TABS
  ========================= */

  mobileTab.addEventListener("click", () => {

    mobileTab.classList.add("active");

    pochiTab.classList.remove("active");

    mobileForm.classList.remove("hidden");

    pochiForm.classList.add("hidden");

  });


  pochiTab.addEventListener("click", () => {

    pochiTab.classList.add("active");

    mobileTab.classList.remove("active");

    pochiForm.classList.remove("hidden");

    mobileForm.classList.add("hidden");

  });


  /* =========================
     PHONE NUMBER
  ========================= */

  phone.addEventListener("input", () => {

    // Only numbers
    phone.value =
      phone.value.replace(/\D/g, "");

    updateContinueButton();

  });


  /* =========================
     AMOUNT
  ========================= */

  amount.addEventListener("input", () => {

    updateContinueButton();

  });


  /* =========================
     VALIDATE MOBILE FORM
  ========================= */

  function updateContinueButton() {

    const phoneValue =
      phone.value.trim();

    const amountValue =
      Number(amount.value);

    /*
      Accept:
      07XXXXXXXX
      01XXXXXXXX
      2547XXXXXXXX
      2541XXXXXXXX
    */

    const validPhone =
      /^(?:07|01)\d{8}$/.test(phoneValue) ||
      /^254(?:7|1)\d{8}$/.test(phoneValue);

    const validAmount =
      amountValue > 0;

    continueButton.disabled =
      !(validPhone && validAmount);

  }


  /* =========================
     PAYMENT METHOD
  ========================= */

  mpesaPayment.addEventListener("click", () => {

    mpesaPayment.classList.add("selected");

    shirikiPayment.classList.remove("selected");

    showToast("M-PESA selected");

  });


  shirikiPayment.addEventListener("click", () => {

    shirikiPayment.classList.add("selected");

    mpesaPayment.classList.remove("selected");

    showToast("Shiriki Pay selected");

  });


  /* =========================
     CONTINUE
  ========================= */

  continueButton.addEventListener("click", () => {

    if (continueButton.disabled) {
      return;
    }

    const phoneValue =
      phone.value.trim();

    const amountValue =
      Number(amount.value);

    /*
      Convert 07XXXXXXXX / 01XXXXXXXX
      into 254XXXXXXXXX.
    */

    let formattedPhone =
      phoneValue;

    if (
      phoneValue.startsWith("07") ||
      phoneValue.startsWith("01")
    ) {

      formattedPhone =
        "254" + phoneValue.substring(1);

    }

    showToast(
      `Sending Ksh ${amountValue.toFixed(2)} to ${formattedPhone}`
    );

    /*
      Later we can connect this button
      to your real M-PESA backend.
    */

  });


  /* =========================
     POCHI FORM
  ========================= */

  businessNumber.addEventListener("input", () => {

    businessNumber.value =
      businessNumber.value.replace(/\D/g, "");

    updatePochiButton();

  });


  pochiAmount.addEventListener("input", () => {

    updatePochiButton();

  });


  function updatePochiButton() {

    const business =
      businessNumber.value.trim();

    const money =
      Number(pochiAmount.value);

    pochiContinue.disabled =
      !(business.length >= 5 && money > 0);

  }


  pochiContinue.addEventListener("click", () => {

    if (pochiContinue.disabled) {
      return;
    }

    showToast(
      `Pochi payment of Ksh ${Number(
        pochiAmount.value
      ).toFixed(2)}`
    );

  });


  /* =========================
     CONTACT BUTTON
  ========================= */

  contactButton.addEventListener("click", () => {

    showToast("Contacts will open here");

    /*
      Later we can connect this to
      the phone's contacts functionality
      where supported.
    */

  });


  /* =========================
     QR SCANNER
  ========================= */

  qrButton.addEventListener("click", () => {

    showToast("Opening QR scanner");

    /*
      Later we can connect this to
      a real camera QR scanner.
    */

  });


  /* =========================
     ADD FAVOURITE
  ========================= */

  addFavourite.addEventListener("click", () => {

    showToast("Add Favourite");

  });


  /* =========================
     VIEW ALL
  ========================= */

  document
    .querySelector(".view-all")
    .addEventListener("click", () => {

      showToast("Favourites");

    });


  /* =========================
     DO MORE BUTTONS
  ========================= */

  document
    .querySelectorAll("[data-action]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const action =
          button.dataset.action;

        showToast(action);

      });

    });

});
