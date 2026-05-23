// script.js

const billInput = document.getElementById("bill");
const customTipInput = document.getElementById("customTip");
const peopleInput = document.getElementById("people");

const tipButtons = document.querySelectorAll(".tip-btn");

const tipAmountText = document.getElementById("tipAmount");
const grandTotalText = document.getElementById("grandTotal");
const perPersonText = document.getElementById("perPerson");

const billError = document.getElementById("billError");
const tipError = document.getElementById("tipError");
const peopleError = document.getElementById("peopleError");

const resetBtn = document.getElementById("resetBtn");

const state = {
  bill: "",
  tip: 10,
  people: 1,
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

function sanitizeNumber(value) {
  return value.replace(/[^0-9.]/g, "");
}

function validate() {

  let valid = true;

  billError.textContent = "";
  tipError.textContent = "";
  peopleError.textContent = "";

  const bill = parseFloat(state.bill);
  const tip = parseFloat(state.tip);
  const people = parseInt(state.people);

  if (isNaN(bill) || bill <= 0) {
    billError.textContent = "Bill must be greater than 0";
    valid = false;
  }

  if (isNaN(tip) || tip < 0 || tip > 100) {
    tipError.textContent = "Tip must be between 0 and 100";
    valid = false;
  }

  if (
    isNaN(people) ||
    people < 1 ||
    !Number.isInteger(people)
  ) {
    peopleError.textContent =
      "People must be a whole number greater than 0";
    valid = false;
  }

  return valid;
}

function calculate() {

  if (!validate()) {
    tipAmountText.textContent = "₹0.00";
    grandTotalText.textContent = "₹0.00";
    perPersonText.textContent = "₹0.00";
    return;
  }

  const bill = parseFloat(state.bill);
  const tip = parseFloat(state.tip);
  const people = parseInt(state.people);

  const tipAmount = bill * (tip / 100);
  const grandTotal = bill + tipAmount;

  // round up policy
  const perPerson =
    Math.ceil((grandTotal / people) * 100) / 100;

  tipAmountText.textContent =
    formatCurrency(tipAmount);

  grandTotalText.textContent =
    formatCurrency(grandTotal);

  perPersonText.textContent =
    formatCurrency(perPerson);
}

billInput.addEventListener("input", (e) => {
  e.target.value = sanitizeNumber(e.target.value);
  state.bill = e.target.value;
  calculate();
});

customTipInput.addEventListener("input", (e) => {

  e.target.value = sanitizeNumber(e.target.value);

  state.tip = e.target.value || 0;

  tipButtons.forEach((btn) =>
    btn.classList.remove("active")
  );

  calculate();
});

peopleInput.addEventListener("input", (e) => {

  e.target.value = e.target.value.replace(/[^0-9]/g, "");

  state.people = e.target.value;

  calculate();
});

tipButtons.forEach((button) => {

  button.addEventListener("click", () => {

    tipButtons.forEach((btn) =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    customTipInput.value = "";

    state.tip = button.dataset.tip;

    calculate();
  });
});

resetBtn.addEventListener("click", () => {

  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "1";

  state.bill = "";
  state.tip = 10;
  state.people = 1;

  tipButtons.forEach((btn) =>
    btn.classList.remove("active")
  );

  tipButtons[0].classList.add("active");

  billError.textContent = "";
  tipError.textContent = "";
  peopleError.textContent = "";

  tipAmountText.textContent = "₹0.00";
  grandTotalText.textContent = "₹0.00";
  perPersonText.textContent = "₹0.00";
});

calculate();