document.addEventListener('DOMContentLoaded', function () {
    // Select input groups
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    const crustInputs = document.querySelectorAll('input[name="crust"]');
    const toppingInputs = document.querySelectorAll('input[name="toppings"]');
    const orderLabel = document.getElementById('OrderLabel');
    const cancelButton = document.getElementById('CancelButton');

    function calculateTotal() {
        let pricingVal = 0.00;
        let receiptHtml = "";

        // Find selected size
        let selectedSize = null;
        for (const input of sizeInputs) {
            if (input.checked) {
                selectedSize = input;
                break;
            }
        }

        // Find selected crust
        let selectedCrust = null;
        for (const input of crustInputs) {
            if (input.checked) {
                selectedCrust = input;
                break;
            }
        }

        if (selectedSize && selectedCrust) {
            // Base Pizza
            receiptHtml += "<span id='blue' class='uline'>Base Pizza</span><br />";

            // Size Logic
            const sizePrice = parseFloat(selectedSize.value);
            const sizeName = selectedSize.getAttribute('data-name');

            pricingVal += sizePrice;
            receiptHtml += "<span id='blue'>Size: " + sizeName + "</span><br />";

            // Crust Logic
            const crustPrice = parseFloat(selectedCrust.value);
            const crustName = selectedCrust.getAttribute('data-name');

            pricingVal += crustPrice;
            receiptHtml += "<span id='blue'>Crust: " + crustName + "</span><br />";

            // Toppings Logic
            receiptHtml += "<br /><span id='blue' class='uline'> Toppings </span><br />";
            let toppingCount = 0;

            toppingInputs.forEach(t => {
                if (t.checked) {
                    receiptHtml += "<span id='blue'>&nbsp;" + t.value + ": True</span><br />";
                    pricingVal += 2.00;
                    toppingCount++;
                }
            });

            // Pricing Display
            receiptHtml += "<br /><span id='green' class='uline'> Pricing </span>";
            receiptHtml += "<br /><span id='green'> $" + (sizePrice + crustPrice).toFixed(2) + " (Base Pizza)</span>";
            if (toppingCount > 0) {
                receiptHtml += "<br /><span id='green'>$" + (toppingCount * 2).toFixed(2) + " (" + toppingCount + " Toppings)</span>";
            }

            receiptHtml += "<br /><br /><span id='green'>$" + pricingVal.toFixed(2) + " Subtotal</span>";

            const taxVal = Math.round((pricingVal * 0.06) * 100) / 100;
            receiptHtml += "<br /><span id='green' class='taxLine'>$" + taxVal.toFixed(2) + " Sales Tax</span>";

            receiptHtml += "<br /><span id='total'>$" + (pricingVal + taxVal).toFixed(2) + " Total</span>";

            orderLabel.innerHTML = receiptHtml;

        } else {
            orderLabel.innerHTML = "Please select a size and crust";
        }
    }

    // Bind Events
    sizeInputs.forEach(i => i.addEventListener('change', calculateTotal));
    crustInputs.forEach(i => i.addEventListener('change', calculateTotal));
    toppingInputs.forEach(i => i.addEventListener('change', calculateTotal));

    if (cancelButton) {
        cancelButton.addEventListener('click', function (e) {
            e.preventDefault();
            // Reset form
            sizeInputs.forEach(i => i.checked = false);
            crustInputs.forEach(i => i.checked = false);
            toppingInputs.forEach(i => i.checked = false);
            calculateTotal();
        });
    }

    // Initial check
    calculateTotal();
});
