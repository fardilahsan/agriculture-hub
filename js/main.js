document.addEventListener("DOMContentLoaded", () => {
  const timeBadge = document.getElementById("currentTimeBadge");
  if (timeBadge) {
    const updateTime = () => {
      const now = new Date();
      timeBadge.textContent = now.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  const guideFilterBtns = document.querySelectorAll("[data-guide-filter]");
  const guideCards = document.querySelectorAll(".guide-item");
  if (guideFilterBtns.length > 0 && guideCards.length > 0) {
    const activeFilters = {
      type: "all",
      season: "all",
      method: "all"
    };

    guideFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filterCategory = btn.getAttribute("data-filter-group");
        const filterVal = btn.getAttribute("data-guide-filter");

        const groupBtns = document.querySelectorAll(`[data-filter-group="${filterCategory}"]`);
        groupBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        activeFilters[filterCategory] = filterVal;

        let visibleCount = 0;
        guideCards.forEach((card) => {
          const cardType = card.getAttribute("data-crop-type");
          const cardSeason = card.getAttribute("data-season");
          const cardMethod = card.getAttribute("data-method");

          const matchType = activeFilters.type === "all" || activeFilters.type === cardType;
          const matchSeason = activeFilters.season === "all" || activeFilters.season === cardSeason;
          const matchMethod = activeFilters.method === "all" || activeFilters.method === cardMethod;

          if (matchType && matchSeason && matchMethod) {
            card.classList.remove("d-none");
            visibleCount++;
          } else {
            card.classList.add("d-none");
          }
        });

        const noMatchAlert = document.getElementById("noGuidesAlert");
        if (noMatchAlert) {
          if (visibleCount === 0) {
            noMatchAlert.classList.remove("d-none");
          } else {
            noMatchAlert.classList.add("d-none");
          }
        }
      });
    });
  }

  const contactForm = document.getElementById("agriInquiryForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const fullName = document.getElementById("fullName");
      const email = document.getElementById("emailAddress");
      const subject = document.getElementById("inquirySubject");
      const message = document.getElementById("inquiryMessage");
      const successBanner = document.getElementById("formSuccessMessage");

      const inputs = [fullName, email, subject, message];
      inputs.forEach((input) => {
        if (input) {
          input.classList.remove("is-invalid");
          input.classList.remove("is-valid");
        }
      });

      if (!fullName || fullName.value.trim().length < 2) {
        if (fullName) fullName.classList.add("is-invalid");
        isValid = false;
      } else {
        fullName.classList.add("is-valid");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.value.trim())) {
        if (email) email.classList.add("is-invalid");
        isValid = false;
      } else {
        email.classList.add("is-valid");
      }

      if (!subject || subject.value === "" || subject.value.trim() === "") {
        if (subject) subject.classList.add("is-invalid");
        isValid = false;
      } else {
        subject.classList.add("is-valid");
      }

      if (!message || message.value.trim().length < 10) {
        if (message) message.classList.add("is-invalid");
        isValid = false;
      } else {
        message.classList.add("is-valid");
      }

      if (isValid) {
        if (successBanner) {
          successBanner.classList.remove("d-none");
          successBanner.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        contactForm.reset();
        inputs.forEach((input) => {
          if (input) {
            input.classList.remove("is-valid");
          }
        });
      }
    });
  }
});
