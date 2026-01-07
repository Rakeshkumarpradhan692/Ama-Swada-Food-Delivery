const cron = require('node-cron');
const checkExpiredSubscriptions = require('./utils/checkExpiredSubscriptions');
const checkQueuedSubscriptions = require('./utils/checkQueuedSubscriptions');


cron.schedule('0 0 * * *', async () => {
  console.log('🕛 Running daily subscription expiry check...');
  await checkExpiredSubscriptions();
   await checkQueuedSubscriptions();
});
