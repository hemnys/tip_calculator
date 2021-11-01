const formatNumber = (number) =>
  number !== "" ? parseFloat(number).toFixed(2) : 0;
const getPercentage = (value) => (value !== "" ? value / 100 : 0);
const getData = (form) => Array.from(new FormData(form));
const updateTotals = ({ partialTip, totalTip }) => {
  const $tipTotal = document.getElementById("tipTotal");
  const $total = document.getElementById("total");
  $tipTotal.innerText = formatNumber(partialTip);
  $total.innerText = formatNumber(totalTip);
};
const toggleWarning = (status) => {
  const $warning = document.querySelector(".warning");
  status
    ? $warning.classList.remove("hidden")
    : $warning.classList.add("hidden");
};
const cleanForm = (evt) => {
  evt.target.setAttribute("disabled", true);
  const form = document.getElementById("form");
  const items = [...form.querySelectorAll("input")];
  items.forEach((item) => {
    switch (item.type) {
      case "number":
        item.value = "0";
        break;
      case "radio":
        item.checked = false;
        break;
      default:
        break;
    }
  });

  updateTotals({ partialTip: "0", totalTip: "0" });
};
const handleForm = (evt) => {
  const $reset = document.querySelector(".btn-reset");
  const data = getData(evt.target.closest("form"));

  const [bill, tip, customTip, people] = data.map((item) =>
    formatNumber(item[1])
  );
  const tipFinalValue = isNaN(tip)
    ? getPercentage(customTip)
    : getPercentage(tip);
  toggleWarning(true);
  if (people > 0) {
    let partialTip = (bill * tipFinalValue) / people;
    let totalTip = (bill * (1 + tipFinalValue)) / people;
    updateTotals({ partialTip, totalTip });
    $reset.removeAttribute("disabled");
    toggleWarning(false);
  }
};
window.addEventListener("DOMContentLoaded", function () {
  const $form = document.getElementById("form");
  const $reset = document.querySelector(".btn-reset");
  $form.addEventListener("change", handleForm);
  $form.addEventListener("keyup", handleForm);
  $reset.addEventListener("click", cleanForm);
});
