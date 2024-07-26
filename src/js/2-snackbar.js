import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// 1. обробка інформації з інпуту та радіокнопки і їхній запис у константу
// 2. створення слухача на кнопку і додавання функції з промісом
// 3. створення функції з шаблоном промісу та шаблонною вставкою констант
// 
// 
// 

const delay = document.querySelector('input[name="delay"][type="number"]')
const submitBtn = document.querySelector('button[type="submit"]')

const makePromise = ({ value, delay, shouldResolve = true }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
              if(shouldResolve) {
                  resolve(value)
              } else {
                  reject(value)
              }
          }, delay);
    });
  };

document.querySelector('form').addEventListener('submit', createPromises)

function createPromises(event) {
    event.preventDefault()

    const stateInput = document.querySelector('input[name="state"]:checked');

    if (!stateInput) {
        iziToast.error({
            title: 'Error',
            message: 'Please select a state'
        });
        return;
    }

    const state = stateInput.value.toLowerCase();

    if (state === 'fulfilled') {
        makePromise({ value: `✅ Fulfilled promise in ${delay.value}ms`, 
            delay: `${delay.value}`, 
            shouldResolve: true })
            .then(value => iziToast.info({ 
                title: 'Success', 
                message: value 
            }))
            .catch(error => iziToast.error({ 
                title: 'Error', 
                message: error})
            )
} else if(state === 'rejected') {
        makePromise({ value: `❌ Rejected promise in ${delay.value}ms`, 
            delay: `${delay.value}`, 
            shouldResolve: false })
            .then(value => iziToast.info({ 
                title: 'Success', 
                message: value 
            }))
            .catch(error => iziToast.error({ 
                title: 'Error', 
                message: error})
            )
}}