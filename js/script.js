let interViewList = [];
let rejectList = [];
let currentFilter = "all-btn";

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

function toggleStyle(id) {
    currentFilter = id;
    allBtn.classList.remove("bg-[#3B82F6]", "text-white");
    interviewBtn.classList.remove("bg-[#3B82F6]", "text-white");
    rejectBtn.classList.remove("bg-[#3B82F6]", "text-white");

    let selected = document.getElementById(id);
    selected.classList.add("bg-[#3B82F6]", "text-white");
}

function updateMainCard(companyTitle, status) {
    const allCards = document.querySelectorAll(
        "#job-card-container .card-body",
    );

    for (let card of allCards) {
        const title = card.querySelector(".company-title").innerText;

        if (title === companyTitle) {
            const interviewBadge = card.querySelector(".interview-badge");
            const rejectedBadge = card.querySelector(".rejected-badge");
            const notAppliedBadge = card.querySelector(".not-applied-badge");

            if (status === "interview") {
                interviewBadge.classList.remove("hidden");
                rejectedBadge.classList.add("hidden");
                notAppliedBadge.classList.add("hidden");
            }

            if (status === "rejected") {
                rejectedBadge.classList.remove("hidden");
                interviewBadge.classList.add("hidden");
                notAppliedBadge.classList.add("hidden");
            }
        }
    }
}

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

        updateCounts();

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

        updateCounts();

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
                                class="interview-badge badge bg-[#F8FAFC] rounded-sm border-[#10B981] text-[#10B981]"

                            >
                                Interview
                            </div>
                        </div>
                        <p class="job-description text-[#323B49] text-sm">
                            ${interview.jobDescription}
                        </p>
                        <div class="action mt-5">
                            <button
                                class="interview-btn btn font-semibold text-[14px] text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white mr-2"

                            >
                                Interview
                            </button>
                            <button
                                class="rejected-btn btn font-semibold text-[14px] text-[#EF4444] border-[#EF4444] hover:bg-[#EF4444] hover:text-white"

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
                                class="rejected-badge badge bg-[#F8FAFC] rounded-sm border-[#EF4444] text-[#EF4444]"

                            >
                                Rejected
                            </div>
                        </div>
                        <p class="job-description text-[#323B49] text-sm">
                            ${rejected.jobDescription}
                        </p>
                        <div class="action mt-5">
                            <button
                                class="interview-btn btn font-semibold text-[14px] text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white mr-2"

                            >
                                Interview
                            </button>
                            <button
                                class="rejected-btn btn font-semibold text-[14px] text-[#EF4444] border-[#EF4444] hover:bg-[#EF4444] hover:text-white"

                            >
                                Rejected
                            </button>
                        </div>
                    </div>`;

        filteredCardSection.appendChild(card);
    }
}

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
