// intervalManager.js
let intervalId = null;

module.exports = {
  getIntervalId: () => intervalId,
  setIntervalId: (id) => { intervalId = id; },
  clearIntervalId: () => { intervalId = null; }
};
