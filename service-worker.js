// Register the service worker
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('reminderInterval', (data) => {
    const intervalInMinutes = data.reminderInterval || '30';
    const intervalInSeconds = Number(intervalInMinutes);
    chrome.alarms.create('postureReminder', { periodInMinutes: intervalInSeconds });
  });
});

// Handle alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'postureReminder') {
    // Show a notification
    self.registration.showNotification('ErgoAssist', {
      body: 'Time to check your posture and stretch!',
      icon: './logo/logo-128.png',
    });
  }
});

// Listen for changes to the reminder interval
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.reminderInterval) {
    // Clear the existing alarm
    chrome.alarms.clear('postureReminder', () => {
      // Create a new alarm with the updated interval
      const intervalInSeconds = Number(changes.reminderInterval.newValue);
      chrome.alarms.create('postureReminder', { periodInMinutes: intervalInSeconds });
    });
  }
});
