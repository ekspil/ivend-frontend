var dateFrom, dateTo, selectedType;


function selectedInput(el, type) {
    var picked = document.querySelectorAll(
        '[data-calendar-label="picked"]'
    )[0];

    if (typeof picked != 'undefined') {
        picked.dataset.calendarLabel = '';
    }

    el.dataset.calendarLabel = 'picked';

    if (type) {
        selectedType = type;
    }
}

var openCal = false;

function switchCalendar(el) {
    var calendar = document.getElementById('calendar');
    var element = document.activeElement;

    if (openCal) {
        calendar.style.left = element.offsetLeft + 'px';
        calendar.classList.remove("disabled-block");
    } else {
        calendar.classList.add('disabled-block');
    }
}

document.getElementById('calendar').onclick = function (ev) {
    openCal = true;
    switchCalendar();
}

document.getElementById('calendar').onclick = function (ev) {
    openCal = true;
    switchCalendar();
}


document.getElementById('btn1').onfocus = function (ev) {
    openCal = true;
    switchCalendar();
}

document.getElementById('btn1').onblur = function (ev) {
    openCal = false;

    setTimeout(switchCalendar, 100);

}

document.getElementById('btn2').onfocus = function (ev) {
    openCal = true;

    switchCalendar();

}

document.getElementById('btn2').onblur = function (ev) {
    openCal = false;
    setTimeout(switchCalendar, 100);
}

var vanillaCalendar = {
    month: document.querySelectorAll('[data-calendar-area="month"]')[0],
    next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
    previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
    label: document.querySelectorAll('[data-calendar-label="month"]')[0],
    activeDates: null,
    date: new Date(),
    todaysDate: new Date(),

    init: function (options) {
        this.options = options
        this.date.setDate(1)
        this.createMonth()
        this.createListeners()
    },

    createListeners: function () {
        var _this = this
        this.next.addEventListener('click', function () {
            _this.clearCalendar()
            var nextMonth = _this.date.getMonth() + 1
            _this.date.setMonth(nextMonth)
            _this.createMonth()
        })
        // Clears the calendar and shows the previous month
        this.previous.addEventListener('click', function () {
            _this.clearCalendar()
            var prevMonth = _this.date.getMonth() - 1
            _this.date.setMonth(prevMonth)
            _this.createMonth()
        })
    },

    selectPeriod: function () {
        for(var i = 0; i < this.month.childNodes.length; i++) {
            var date = new Date (this.month.childNodes[i].dataset.calendarDate);

            if ( (date  < dateTo && date > dateFrom) ||(date  > dateTo && date < dateFrom) ) {
                this.month.childNodes[i].classList.add("cel-period");
            } else {
                this.month.childNodes[i].classList.remove("cel-period");
            }

            if (dateFrom) {
                if (date.getDate() === dateFrom.getDate() && date.getMonth() === dateFrom.getMonth() && date.getFullYear() === dateFrom.getFullYear()) {
                    this.month.childNodes[i].classList.add("cel-selected");
                } else {
                    this.month.childNodes[i].classList.remove("cel-selected");
                }
            }

            if (dateTo) {
                if (date.getDate() === dateTo.getDate() && date.getMonth() === dateTo.getMonth() && date.getFullYear() === dateTo.getFullYear()) {
                    this.month.childNodes[i].classList.add("cel-selected");
                } else {
                    this.month.childNodes[i].classList.remove("cel-selected");
                }
            }

            if (dateFrom && dateTo) {
                if (date.getDate() === dateFrom.getDate() && date.getMonth() === dateFrom.getMonth() && date.getFullYear() === dateFrom.getFullYear() ||
                    date.getDate() === dateTo.getDate() && date.getMonth() === dateTo.getMonth() && date.getFullYear() === dateTo.getFullYear()) {
                    this.month.childNodes[i].classList.add("cel-selected");
                } else {
                    this.month.childNodes[i].classList.remove("cel-selected");
                }
            }
        }
    },

    createDay: function (num, day, year) {
        var newDay = document.createElement('div')
        var dateEl = document.createElement('span')
        dateEl.innerHTML = num
        newDay.className = 'vcal-date'
        newDay.setAttribute('data-calendar-date', this.date)

        // if it's the first day of the month
        if (num === 1) {
            if (day === 0) {
                newDay.style.marginLeft = (6 * 14.28) + '%'
            } else {
                newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
            }
        }

        if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
            // Дата прошла
        } else {
            // дата из будущего
        }

        newDay.classList.add('vcal-date--active')
        newDay.setAttribute('data-calendar-status', 'active')

        if (this.date.toString() === this.todaysDate.toString()) {
            newDay.classList.add('vcal-date--today')
        }

        newDay.appendChild(dateEl)
        this.month.appendChild(newDay)
    },

    dateClicked: function () {
        var _this = this;
        this.activeDates = document.querySelectorAll(
            '[data-calendar-status="active"]'
        );
        for (var i = 0; i < this.activeDates.length; i++) {

            this.activeDates[i].addEventListener('click', function (event) {
                var picked = document.querySelectorAll(
                    '[data-calendar-label="picked"]'
                )[0];

                var date = new Date(this.dataset.calendarDate);

                switch (selectedType) {
                    case 'from':
                        dateFrom = date;
                      break;
                    case 'to':
                        dateTo = date;
                      break;
                }

                _this.selectPeriod();

                var str = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

                picked.innerHTML = str;
                //_this.removeActiveClass();
                //this.classList.add('vcal-date--selected')
            });
        }
    },

    createMonth: function () {
        var currentMonth = this.date.getMonth()
        while (this.date.getMonth() === currentMonth) {
            this.createDay(
                this.date.getDate(),
                this.date.getDay(),
                this.date.getFullYear()
            )
            this.date.setDate(this.date.getDate() + 1)
        }
        // while loop trips over and day is at 30/31, bring it back
        this.date.setDate(1)
        this.date.setMonth(this.date.getMonth() - 1)

        this.label.innerHTML =
            this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
        this.dateClicked()

        console.log('change month');
        this.selectPeriod();

    },

    monthsAsString: function (monthIndex) {
        return [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Мая',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ][monthIndex]
    },

    clearCalendar: function () {
        vanillaCalendar.month.innerHTML = ''
    },

    removeActiveClass: function () {
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].classList.remove('vcal-date--selected')
        }
    }
};
