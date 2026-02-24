function updateCounts() {
    totalCount.innerText = totalCards;
    interviewCount.innerText = interViewList.length;
    rejectCount.innerText = rejectList.length;
}

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