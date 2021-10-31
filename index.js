const formatNumber = (number) =>
  number !== "" ? parseFloat(number).toFixed(2) : 0;
const getPercentage = (value) => (value !== "" ? value / 100 : 0);
const getData = (form) => Array.from(new FormData(form));
const handleForm = (evt) => {
  const $tipTotal = document.getElementById("tipTotal");
  const $total = document.getElementById("total");
  const $warning = document.querySelector(".warning");
  const data = getData(evt.target.closest("form"));

  const [bill, tip, customTip, people] = data.map((item) =>
    formatNumber(item[1])
  );
  const tipFinalValue = isNaN(tip)
    ? getPercentage(customTip)
    : getPercentage(tip);
  if ($warning.classList.contains("hidden")) {
    $warning.classList.remove("hidden");
  }
  if (people > 0) {
    $warning.classList.add("hidden");
    let partialTip = (bill * tipFinalValue) / people;
    let totalTip = (bill * (1 + tipFinalValue)) / people;
    $tipTotal.innerText = formatNumber(partialTip);
    $total.innerText = formatNumber(totalTip);
  }
};
window.addEventListener("DOMContentLoaded", function () {
  const $formWrapper = document.querySelector(".form-wrapper");
  $formWrapper.addEventListener("change", handleForm);
  $formWrapper.addEventListener("keyup", handleForm);
});
