
function getCurrentTime() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const now = new Date().toLocaleTimeString();
      // const hours = now.getHours().toString();
      // const minutes = now.getMinutes().toString().padStart(2, '0');
      // const seconds = now.getSeconds().toString().padStart(2, '0');
      // const timeString = `${hours}:${minutes}:${seconds}`;
      res(now);
      rej("--:--:--")
    }, 1000);
  });
}

async function updateClock() {
  let i = 8; // seconds to live
  while (i) {
    const currentTime = await getCurrentTime();
    console.log(currentTime);
    i--;
  }
}

updateClock(); // Start the clock