let interViewList = [];
let rejectList = [];
let currentFilter = "all-btn";

const mainSection = document.querySelector("main");
const filteredCardSection = document.getElementById("filtered-card");

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectCount = document.getElementById("reject-count");

let totalCards = document.getElementById("job-card-container").children.length;

updateCounts();
document.getElementById("job-number").innerText = totalCards;

let allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", function () {
    toggleStyle("all-btn");
});
let interviewBtn = document.getElementById("interview-list-btn");
interviewBtn.addEventListener("click", function () {
    toggleStyle("interview-list-btn");
});
let rejectBtn = document.getElementById("reject-list-btn");
rejectBtn.addEventListener("click", function () {
    toggleStyle("reject-list-btn");
});

document.addEventListener("click", function (event) {
    const cardBody = event.target.closest(".card-body");
    if (!cardBody) return;
    const companyTitle = cardBody.querySelector(".company-title").innerText;
    const jobPosition = cardBody.querySelector(".job-position").innerText;
    const jobLocation = cardBody.querySelector(".job-location").innerText;
    const jobDescription = cardBody.querySelector(".job-description").innerText;

    const cardData = {
        companyTitle,
        jobPosition,
        jobLocation,
        jobDescription,
    };

    if (event.target.classList.contains("interview-btn")) {
        const jobExist = interViewList.find(
            (item) => item.companyTitle === cardData.companyTitle,
        );

        if (!jobExist) {
            interViewList.push(cardData);
        }

        updateMainCard(cardData.companyTitle, "interview");

        rejectList = rejectList.filter(
            (item) => item.companyTitle !== cardData.companyTitle,
        );

        if (currentFilter === "reject-list-btn") {
            renderRejected();

            if (rejectList.length === 0) {
                filteredCardSection.classList.add("hidden");
                document
                    .getElementById("empty-list")
                    .classList.remove("hidden");
            }

            document.getElementById("job-number").innerText = rejectList.length;
        }
    }

    if (event.target.classList.contains("rejected-btn")) {
        const jobExist = rejectList.find(
            (item) => item.companyTitle === cardData.companyTitle,
        );

        if (!jobExist) {
            rejectList.push(cardData);
        }

        updateMainCard(cardData.companyTitle, "rejected");

        interViewList = interViewList.filter(
            (item) => item.companyTitle !== cardData.companyTitle,
        );

        if (currentFilter === "interview-list-btn") {
            renderInterview();

            if (interViewList.length === 0) {
                filteredCardSection.classList.add("hidden");
                document
                    .getElementById("empty-list")
                    .classList.remove("hidden");
            }

            document.getElementById("job-number").innerText =
                interViewList.length;
        }

        if (currentFilter === "reject-list-btn") {
            renderRejected();

            if (rejectList.length === 0) {
                filteredCardSection.classList.add("hidden");
                document
                    .getElementById("empty-list")
                    .classList.remove("hidden");
            }

            document.getElementById("job-number").innerText = rejectList.length;
        }
    }

    if (event.target.closest(".delete-btn")) {
        const card = event.target.closest(".card");
        const companyTitle = card.querySelector(".company-title").innerText;

        interViewList = interViewList.filter(
            (item) => item.companyTitle !== companyTitle,
        );

        rejectList = rejectList.filter(
            (item) => item.companyTitle !== companyTitle,
        );

        card.remove();
        totalCards--;

        if (totalCards === 0) {
            filteredCardSection.classList.add("hidden");
            document
                .querySelector("#job-card-container")
                .classList.add("hidden");
            document.getElementById("empty-list").classList.remove("hidden");
        }

        document.getElementById("job-number").innerText = totalCards;
    }

    updateCounts();
});

document.getElementById("all-btn").addEventListener("click", function () {
    filteredCardSection.classList.add("hidden");
    document.getElementById("empty-list").classList.add("hidden");
    document.querySelector("#job-card-container").classList.remove("hidden");

    if (totalCards === 0) {
        filteredCardSection.classList.add("hidden");
        document.querySelector("#job-card-container").classList.add("hidden");
        document.getElementById("empty-list").classList.remove("hidden");
    }

    for (let item of interViewList) {
        updateMainCard(item.companyTitle, "interview");
    }

    for (let item of rejectList) {
        updateMainCard(item.companyTitle, "rejected");
    }

    document.getElementById("job-number").innerText = totalCards;
    updateCounts();
});

document
    .getElementById("interview-list-btn")
    .addEventListener("click", function () {
        renderInterview();
        filteredCardSection.classList.remove("hidden");
        document.getElementById("empty-list").classList.add("hidden");
        document.querySelector("#job-card-container").classList.add("hidden");

        if (interViewList.length === 0) {
            filteredCardSection.classList.add("hidden");
            document
                .querySelector("#job-card-container")
                .classList.add("hidden");
            document.getElementById("empty-list").classList.remove("hidden");
        }

        document.getElementById("job-number").innerText = interViewList.length;
        updateCounts();
    });

document
    .getElementById("reject-list-btn")
    .addEventListener("click", function () {
        renderRejected();
        filteredCardSection.classList.remove("hidden");
        document.getElementById("empty-list").classList.add("hidden");
        document.querySelector("#job-card-container").classList.add("hidden");

        if (rejectList.length === 0) {
            filteredCardSection.classList.add("hidden");
            document
                .querySelector("#job-card-container")
                .classList.add("hidden");
            document.getElementById("empty-list").classList.remove("hidden");
        }

        document.getElementById("job-number").innerText = rejectList.length;
        updateCounts();
    });
