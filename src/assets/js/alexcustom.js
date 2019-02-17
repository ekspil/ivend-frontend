window.addEventListener('load', function () {
    if (document.getElementById('periodinput')) {
        vanillaCalendar.init({
            disablePastDays: true
        });
    }
})