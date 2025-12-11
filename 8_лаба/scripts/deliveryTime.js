// deliveryTime.js
export function setupDeliveryTime() {
  const deliveryTypeRadios = document.querySelectorAll('input[name="delivery_type"]');
  const timeInput = document.getElementById('time_val');

  if (!timeInput) return;

  timeInput.step = 300;

  function setMinTime() {
    const now = new Date();
    let targetTime = new Date(now.getTime() + 30 * 60 * 1000);

    const minutes = targetTime.getMinutes();
    const remainder = minutes % 5;
    if (remainder !== 0) {
      targetTime.setMinutes(minutes + (5 - remainder));
    }
    targetTime.setSeconds(0);

    const hours = targetTime.getHours().toString().padStart(2, '0');
    const mins  = targetTime.getMinutes().toString().padStart(2, '0');
    const minTimeString = `${hours}:${mins}`;

    timeInput.min = minTimeString;

    if (timeInput.value && timeInput.value < minTimeString) {
      timeInput.value = '';
    }
  }

  deliveryTypeRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      if (this.value === 'time') {
        timeInput.disabled = false;
        timeInput.required = true;
        setMinTime();
      } else {
        timeInput.disabled = true;
        timeInput.required = false;
        timeInput.value = '';
      }
    });
  });

  if (!document.getElementById('delivery_time')?.checked) {
    timeInput.disabled = true;
  } else {
    setMinTime();
  }

  setInterval(setMinTime, 60 * 1000);
}
