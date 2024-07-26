import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('[data-start]')
const inputDate = document.querySelector('#datetime-picker')
btn.setAttribute('disabled', true)

const timerElements = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
  };



class Timer {
    constructor({ onTick }) {
        this.onTick = onTick;
        this.intervalID = 0;
        this.isActive = false;
        this.targetTime = null;
    }

    start(targetTime) {
        this.targetTime = targetTime;
        if (this.isActive) return;

        this.isActive = true;
        this.intervalID = setInterval(() => {
            const timeRemaining = this.targetTime - new Date();
            if (timeRemaining <= 0) {
                clearInterval(this.intervalID);
                this.isActive = false;
                this.onTick({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                this.onTick(convertMs(timeRemaining))
            }
            }, 1000)
        }
    }



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

  function updateTimerDisplay({ days, hours, minutes, seconds }) {
    timerElements.days.textContent = addLeadingZero(days);
    timerElements.hours.textContent = addLeadingZero(hours);
    timerElements.minutes.textContent = addLeadingZero(minutes);
    timerElements.seconds.textContent = addLeadingZero(seconds);
  }

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date()
        if (currentDate.getTime() > selectedDates[0].getTime()) {
            btn.setAttribute('disabled', true)
            iziToast.error({message: 'Please choose a date in the future'})
        } else btn.removeAttribute('disabled')
        const timer = new Timer({ onTick: updateTimerDisplay})

        const date = selectedDates[0]

        btn.addEventListener('click', () => {
            timer.start(date)
            btn.setAttribute('disabled', true)
            inputDate.setAttribute('disabled', true)
        })
      console.log(selectedDates[0]);
    },
  };
  

  flatpickr("#datetime-picker", options)
