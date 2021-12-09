const tipAmountResult = document.querySelector('.tip-amount');
const totalPerPersonResult = document.querySelector('.total-per-person');
const inputBillAmount = document.querySelector('.input-bill-amount-here');
const inputPersonNumber = document.querySelector('.input-number-of-person-here');
const tipRateButtons = document.querySelectorAll('.tip-rate');
const calculateTipAmountButton = document.querySelector('.calculate-tip-amount');


calculateTipAmountButton.addEventListener('click', computeTipAmount);

tipRateButtons.forEach(button => {
    button.addEventListener('click', selectTipRate);
})    


function computeTipAmount(event) {
    let billAmountValue = inputBillAmount.value;
    let totalPersonValue = inputPersonNumber.value;
    let tipRate;

    if(billAmountValue === "" || totalPersonValue === '') return;
    if(Number(billAmountValue) <= 0 || Number(totalPersonValue) <= 0) return;
    tipRateButtons.forEach(button => {
        if(button.dataset.id === 'selected') return tipRate = button.innerText;
    })
    tipRateButtons.forEach(button => {
        button.dataset.id = 'not-selected';
        button.classList.remove('selected');
    })
    if(tipRate === undefined) return;

    let output = tipAmountFormula(tipRate, billAmountValue, totalPersonValue);
    tipAmountResult.innerText = `$${output.tip}`;
    totalPerPersonResult.innerText = `$${output.amountPerPerson}`;
}

function selectTipRate(event) {
    let button = event.target;
    let parent = button.parentElement.querySelectorAll('.tip-rate');
    for(let i = 0; i < parent.length; i++) {
        let btn = parent[i];
        if(btn.dataset.id === 'selected') {
            return btn.innerText;
        }
    }
    button.dataset.id = 'selected';
    button.classList.add('selected');
}

function tipAmountFormula(rate, bill, person) {
    console.log(person, bill, rate)
    let tip = Number(bill) * (Number(rate.replace('%', '')) / 100);
    let amountPerPerson = (Number(bill) + tip) / Number(person);
    return {tip, amountPerPerson};
}