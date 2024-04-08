const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const milisecond = document.getElementById("milisecond");
const lapItemList = document.getElementById("lap__items");

const lap = document.getElementById("laps_comtainer");

let startTime = 0;
let excapedTime = 0;
let timerInterval;
let lapsTimes = [];
let isTimerRunning = false;

// Event listener for start button
startButton.addEventListener("click", () => {
  startButton.classList.add("hidden");
  stopButton.classList.remove("hidden");
  lapButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");

// Start the timer
  startTime = Date.now() - excapedTime;
  timerInterval = setInterval(() => {
    excapedTime = Date.now() - startTime;
    let timeData = formatTime(excapedTime);

    // Update the displayed time
    milisecond.innerText = timeData.timeInMillisecond;
    second.innerText = timeData.timeInSecond;
    minute.innerText = timeData.timeInMinute;
    hour.innerText = timeData.timeInHour;
  }, 10);
  isTimerRunning=true;
});

// Event listener for stop button
stopButton.addEventListener("click", () => {

  // Hide stop button and show start button
  startButton.classList.remove("hidden");
  stopButton.classList.add("hidden");

  // Stop the timer
  console.log(timerInterval);
  clearInterval(timerInterval);
  console.log(timerInterval);
  isTimerRunning =false;
});

resetButton.addEventListener("click", () => {
  // Reset all timing variables
  clearInterval(timerInterval);
  startTime = 0;
  excapedTime = 0;

    // Reset displayed time
  milisecond.innerText = "00";
  second.innerText = "00";
  minute.innerText = "00";
  hour.innerText = "00";
  startButton.innerText = "Start";
  startButton.classList.remove("hidden");
  stopButton.classList.add("hidden");
  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");

    // Clear lap times and remove lap items from the list
  lapsTimes = [];
  while (lapItemList.firstChild) {
    lapItemList.removeChild(lapItemList.firstChild);
  }
  lapItemList.classList.add("hidden");
  lap.classList.add("hidden");
  isTimerRunning = false;
});

// Function to format time

const formatTime = (timedifference) => {
  let timeInMillisecond = Math.floor((timedifference % 1000)/10)
    .toString()
    .padStart(2, "0");   // The padStart() method pads a string with another string (multiple times) until it reaches a given length.
  let timeInSecond = Math.floor((timedifference / 1000) % 60)
    .toString()
    .padStart(2, "0");
  let timeInMinute = Math.floor((timedifference / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  let timeInHour = Math.floor((timedifference / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");
  return { timeInMillisecond, timeInSecond, timeInMinute, timeInHour };
  
};

// Event listener for lap button
lapButton.addEventListener("click", () => {


if(isTimerRunning){
  lap.classList.remove("hidden");
  lapItemList.classList.remove("hidden");

// Record lap time and duration
  let lapTime = Date.now() - startTime;

 // Format lap time and duration
  let lapIndex = lapsTimes.length + 1;
  let prevLapTime =
    lapsTimes.length > 0 ? lapsTimes[lapsTimes.length - 1].time : 0;
  let lapDuration = lapTime - prevLapTime;

  lapsTimes.push({ time: lapTime, duration: lapDuration });

    // Format lap time and duration
  let lapTimeFormat = formatTime(lapTime);
  let lapDurationFormat = formatTime(lapDuration);

  // Create a new list item
  const listItem = document.createElement("li");
  listItem.classList.add("item__header", "flex", "justify-between", "w-full"  , "py-2");

  // Set the innerHTML of the list item with the lap data
  listItem.innerHTML = `
    <div class="w-1/3 text-center">
        <p class="lap__num">${lapIndex}</p>
    </div>
    <div class="w-1/3 text-center">
    <p class="total">${lapDurationFormat.timeInHour}:${lapDurationFormat.timeInMinute}:${lapDurationFormat.timeInSecond}:${lapDurationFormat.timeInMillisecond}</p>
    </div>
    <div class="w-1/3 text-center">
        <p class="lap__time">${lapTimeFormat.timeInHour}:${lapTimeFormat.timeInMinute}:${lapTimeFormat.timeInSecond}:${lapTimeFormat.timeInMillisecond}</p>
    </div>
  `;

  // Append the list item to the ul element
  if(timerInterval){  lapItemList.appendChild(listItem);}
}
});
