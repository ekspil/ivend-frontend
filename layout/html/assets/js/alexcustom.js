window.addEventListener('load', function () {
    if (document.getElementById('periodinput')) {
        vanillaCalendar.init({
            disablePastDays: true
        });
    }
});

jQuery('<div class="number-input__nav"><div class="number-input__button number-input__button--up">+</div><div class="number-input__button number-input__button--down">-</div></div>').insertAfter('.number-input input');
jQuery('.number-input').each(function() {
    var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.number-input__button--up'),
        btnDown = spinner.find('.number-input__button--down'),
        min = input.attr('min'),
        max = input.attr('max');

    btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
            var newVal = oldValue;
        } else {
            var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
    });

    btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
            var newVal = oldValue;
        } else {
            var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
    });
});