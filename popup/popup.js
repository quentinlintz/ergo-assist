// When the popup is opened
document.addEventListener('DOMContentLoaded', () => {
  // Get the HTML elements
  const reminderIntervalInput = document.getElementById('reminderIntervalInput');
  const saveButton = document.getElementById('saveButton');
  const startStretchingButton = document.getElementById('startStretchingButton');
  const timeLeftDisplay = document.getElementById('timeLeftDisplay');

  // Display the reminder interval
  chrome.storage.sync.get('reminderInterval', (data) => {
    reminderIntervalInput.value = data.reminderInterval || '30';
  });

  // Function to display the time left until the next alarm
  function updateCountdown() {
    chrome.alarms.get('postureReminder', (alarm) => {
      if (alarm) {
        const timeLeftInMinutes = Math.floor((alarm.scheduledTime - Date.now()) / 60000);
        const timeLeftInSeconds = Math.floor(((alarm.scheduledTime - Date.now()) / 1000) % 60);
        timeLeftDisplay.textContent = `Next reminder in: ${timeLeftInMinutes} min. ${timeLeftInSeconds} sec.`;
      } else {
        timeLeftDisplay.textContent = 'No alarm scheduled';
      }
    });
  }

  // Update the countdown every second
  setInterval(updateCountdown, 1000);

  // Handle the "Save" button click
  saveButton.addEventListener('click', () => {
    const reminderInterval = reminderIntervalInput.value;
    chrome.storage.sync.set({ reminderInterval });
  });

  // Handle the "Start Stretching" button click
  startStretchingButton.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://www.youtube.com/watch?v=3sEeVJEXTfY' });
  });
});
