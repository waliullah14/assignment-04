let interViewList = [];
let rejectList = [];

const mainSection = document.querySelector("main");
const filteredCardSection = document.getElementById("filtered-card");

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectCount = document.getElementById("reject-count");

let totalCards = document.getElementById("job-card-container").children.length;

function updateCounts() {
    totalCount.innerText = totalCards;
    interviewCount.innerText = interViewList.length;
    rejectCount.innerText = rejectList.length;
}

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

function toggleStyle(id) {
    allBtn.classList.remove("bg-[#3B82F6]", "text-white");
    interviewBtn.classList.remove("bg-[#3B82F6]", "text-white");
    rejectBtn.classList.remove("bg-[#3B82F6]", "text-white");

    let selected = document.getElementById(id);
    selected.classList.add("bg-[#3B82F6]", "text-white");
}

mainSection.addEventListener("click", function (event) {
    const cardBody = event.target.parentNode.parentNode;
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

        cardBody.querySelector(".rejected-badge").classList.add("hidden");
        cardBody.querySelector(".not-applied-badge").classList.add("hidden");
        cardBody.querySelector(".interview-badge").classList.remove("hidden");
    }

    if (event.target.classList.contains("rejected-btn")) {
        const jobExist = rejectList.find(
            (item) => item.companyTitle === cardData.companyTitle,
        );

        if (!jobExist) {
            rejectList.push(cardData);
        }

        cardBody.querySelector(".rejected-badge").classList.remove("hidden");
        cardBody.querySelector(".not-applied-badge").classList.add("hidden");
        cardBody.querySelector(".interview-badge").classList.add("hidden");
    }

    updateCounts();
});

function renderInterview() {
    filteredCardSection.innerHTML = "";

    for (let interview of interViewList) {
        let card = document.createElement("div");
        card.classList.add(
            "card",
            "w-full",
            "mx-auto",
            "bg-base-100",
            "shadow-sm",
            "bg-[#F1F2F4]",
            "mt-4",
        );
        card.innerHTML = `<div class="card-body">
                        <div
                            class="card-heading flex justify-between items-center"
                        >
                            <h2
                                class="company-title text-[#002C5C] font-semibold text-lg"
                            >
                                ${interview.companyTitle}
                            </h2>
                            <button
                                class="btn w-[2.5rem] rounded-[50%]"
                                id="delte-btn"
                            >
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                        <p class="job-position text-[#64748B]">
                            ${interview.jobPosition}
                        </p>
                        <p class="job-location text-[#64748B] text-sm">
                            ${interview.jobLocation}
                        </p>
                        <div class="badge-container flex py-5">
                            <div
                                class="badge bg-[#F8FAFC] rounded-sm border-[#10B981] text-[#10B981]"
                                id="interview-badge"
                            >
                                Interview
                            </div>
                        </div>
                        <p class="job-description text-[#323B49] text-sm">
                            ${interview.jobDescription}
                        </p>
                        <div class="action mt-5">
                            <button
                                class="btn font-semibold text-[14px] text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white mr-2"
                                id="interview-btn"
                            >
                                Interview
                            </button>
                            <button
                                class="btn font-semibold text-[14px] text-[#EF4444] border-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                                id="rejected-btn"
                            >
                                Rejected
                            </button>
                        </div>
                    </div>`;

        filteredCardSection.appendChild(card);
    }
}

function renderRejected() {
    filteredCardSection.innerHTML = "";

    for (let rejected of rejectList) {
        let card = document.createElement("div");
        card.classList.add(
            "card",
            "w-full",
            "mx-auto",
            "bg-base-100",
            "shadow-sm",
            "bg-[#F1F2F4]",
            "mt-4",
        );
        card.innerHTML = `<div class="card-body">
                        <div
                            class="card-heading flex justify-between items-center"
                        >
                            <h2
                                class="company-title text-[#002C5C] font-semibold text-lg"
                            >
                                ${rejected.companyTitle}
                            </h2>
                            <button
                                class="btn w-[2.5rem] rounded-[50%]"
                                id="delete-btn"
                            >
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                        <p class="job-position text-[#64748B]">
                            ${rejected.jobPosition}
                        </p>
                        <p class="job-location text-[#64748B] text-sm">
                            ${rejected.jobLocation}
                        </p>
                        <div class="badge-container flex py-5">
                            <div
                                class="badge bg-[#F8FAFC] rounded-sm border-[#EF4444] text-[#EF4444]"
                                id="rejected-badge"
                            >
                                Rejected
                            </div>
                        </div>
                        <p class="job-description text-[#323B49] text-sm">
                            ${rejected.jobDescription}
                        </p>
                        <div class="action mt-5">
                            <button
                                class="btn font-semibold text-[14px] text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white mr-2"
                                id="interview-btn"
                            >
                                Interview
                            </button>
                            <button
                                class="btn font-semibold text-[14px] text-[#EF4444] border-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                                id="rejected-btn"
                            >
                                Rejected
                            </button>
                        </div>
                    </div>`;

        filteredCardSection.appendChild(card);
    }
}

//filter
document.getElementById("all-btn").addEventListener("click", function () {
    filteredCardSection.classList.add("hidden");
    document.getElementById("empty-list").classList.add("hidden");
    document.querySelector("#job-card-container").classList.remove("hidden");
    if (totalCount === 0) {
        filteredCardSection.classList.add("hidden");
        document.querySelector("#job-card-container").classList.add("hidden");
        document.getElementById("empty-list").classList.remove("hidden");
    }
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
    });
