let interViewList = [];
let rejectList = [];

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectCount = document.getElementById("reject-count");

let totalCards = document.getElementById("job-card-container").children.length;

updateCounts();

let allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", function () {
    toggleStyle("all-btn");
});
let interviewBtn = document.getElementById("interview-btn");
interviewBtn.addEventListener("click", function () {
    toggleStyle("interview-btn");
});
let rejectBtn = document.getElementById("reject-btn");
rejectBtn.addEventListener("click", function () {
    toggleStyle("reject-btn");
});

//functions
function updateCounts() {
    totalCount.innerText = totalCards;
    interviewCount.innerText = interViewList.length;
    rejectCount.innerText = rejectList.length;
}

function toggleStyle(id) {
    allBtn.classList.remove("bg-[#3B82F6]", "text-white");
    interviewBtn.classList.remove("bg-[#3B82F6]", "text-white");
    rejectBtn.classList.remove("bg-[#3B82F6]", "text-white");

    let selected = document.getElementById(id);
    selected.classList.add("bg-[#3B82F6]", "text-white");
}
