const right = document.querySelector(".right");
const activity = document.querySelectorAll(".activity p");
let timeframe = "daily";

const fetchData = async () => {
  try {
    const response = await fetch("./data.json", {
      method: "GET",
    });
    const data = await response.json();

    if (activity.length > 0) {
      activity[0].classList.add("active");
      timeframe = activity[0].textContent.toLowerCase();
    }
    activity.forEach((singleActivity) => {
      singleActivity.addEventListener("click", () => {
        activity.forEach((act) => {
          act.classList.remove("active");
          singleActivity.classList.add("active");
          timeframe = singleActivity.textContent.toLocaleLowerCase();
          showData(data);
        });
      });
    });
    showData(data);
  } catch (error) {
    console.error(error);
  }
};

const showData = (data) => {
  right.innerHTML = ""; // Clear existing content
  data.forEach((singleData) => {
    right.innerHTML += `
      <div class="box ${singleData.title.toLowerCase()}">
        <div class="imagcontainer">
          <img src='./images/${singleData.title.toLocaleLowerCase()}.svg' alt='${
      singleData.title
    }' />
        </div>
        <div class="activityContainer">
          <div class="act_title">
            <p>${singleData.title}</p>
            <img src="./images/icon-ellipsis.svg" alt="" />
          </div>
          <div class="time">
            <h2>${singleData.timeframes[timeframe].current}hrs</h2>
            <p>Previous - ${singleData.timeframes[timeframe].previous}hrs</p>
          </div>
        </div>
      </div>
    `;
  });
};

window.addEventListener("load", fetchData);
