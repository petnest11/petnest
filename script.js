// ----- DATA -----
const pets = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    ageCategory: "Young",
    ageLabel: "2 years",
    gender: "Male",
    size: "Large",
    image:
      "https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Max is a friendly and energetic Golden Retriever who loves to play fetch and swim. Great with kids and other dogs.",
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Domestic Short Hair",
    ageCategory: "Adult",
    ageLabel: "3 years",
    gender: "Female",
    size: "Small",
    image:
      "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Luna is a calm and affectionate cat who enjoys window watching and cuddle time on the couch.",
  },
  {
    id: 3,
    name: "Buddy",
    type: "Dog",
    breed: "Beagle",
    ageCategory: "Adult",
    ageLabel: "4 years",
    gender: "Male",
    size: "Medium",
    image:
      "https://images.pexels.com/photos/1466005/pexels-photo-1466005.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Buddy is curious and playful, with a great nose and a love for outdoor adventures.",
  },
  {
    id: 4,
    name: "Misty",
    type: "Cat",
    breed: "Persian",
    ageCategory: "Young",
    ageLabel: "1.5 years",
    gender: "Female",
    size: "Small",
    image:
      "https://images.pexels.com/photos/208773/pexels-photo-208773.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Misty has a fluffy coat and relaxed personality. She prefers quiet homes and gentle humans.",
  },
  {
    id: 5,
    name: "Rocky",
    type: "Dog",
    breed: "Mixed Breed",
    ageCategory: "Adult",
    ageLabel: "5 years",
    gender: "Male",
    size: "Large",
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Rocky is loyal and protective with a soft side. He is house-trained and knows basic commands.",
  },
  {
    id: 6,
    name: "Coco",
    type: "Dog",
    breed: "Pomeranian",
    ageCategory: "Puppy / Kitten",
    ageLabel: "8 months",
    gender: "Female",
    size: "Small",
    image:
      "https://images.pexels.com/photos/860590/pexels-photo-860590.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Coco is a fluffy ball of energy who loves attention and short walks.",
  },
];

// favorites stored in-memory (you can later use localStorage)
const favorites = new Set();

// ----- RENDER PET CARDS -----
const petListEl = document.getElementById("pet-list");
const favoriteCountEl = document.getElementById("favorite-count");

function renderPets() {
  const typeFilter = document.getElementById("filter-type").value;
  const sizeFilter = document.getElementById("filter-size").value;
  const ageFilter = document.getElementById("filter-age").value;

  petListEl.innerHTML = "";

  const filtered = pets.filter((pet) => {
    const typeOk = typeFilter === "all" || pet.type === typeFilter;
    const sizeOk = sizeFilter === "all" || pet.size === sizeFilter;
    const ageOk = ageFilter === "all" || pet.ageCategory === ageFilter;
    return typeOk && sizeOk && ageOk;
  });

  if (filtered.length === 0) {
    petListEl.innerHTML =
      '<p style="text-align:center;color:#777;">No pets match your filters yet.</p>';
    return;
  }

  filtered.forEach((pet) => {
    const isFav = favorites.has(pet.id);
    const card = document.createElement("article");
    card.className = "pet-card";
    card.innerHTML = `
      <div class="pet-image">
        <img src="${pet.image}" alt="${pet.name}" />
        <span class="pet-type-badge">${pet.type}</span>
      </div>
      <div class="pet-body">
        <div class="pet-header">
          <div>
            <div class="pet-name">${pet.name}</div>
            <p class="pet-breed">${pet.breed}</p>
          </div>
          <button class="favorite-btn ${isFav ? "active" : ""}" data-id="${
      pet.id
    }" aria-label="Favorite">
            ${isFav ? "❤" : "♡"}
          </button>
        </div>
        <div class="pet-tags">
          <span class="pet-tag">${pet.ageLabel}</span>
          <span class="pet-tag">${pet.gender}</span>
          <span class="pet-tag">${pet.size}</span>
        </div>
        <p class="pet-desc">${pet.description.slice(0, 110)}...</p>
        <button class="btn secondary learn-more-btn" data-id="${
          pet.id
        }">Learn More</button>
      </div>
    `;
    petListEl.appendChild(card);
  });

  attachCardEvents();
}

// ----- EVENT HANDLERS FOR CARDS -----
function attachCardEvents() {
  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      if (favorites.has(id)) {
        favorites.delete(id);
      } else {
        favorites.add(id);
      }
      updateFavoriteCount();
      renderPets(); // re-render to update button state
    });
  });

  document.querySelectorAll(".learn-more-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      openPetModal(id);
    });
  });
}

function updateFavoriteCount() {
  favoriteCountEl.textContent = favorites.size;
}

// ----- MODAL -----
const modalEl = document.getElementById("pet-modal");
const modalBodyEl = document.getElementById("modal-body");
const modalCloseBtn = document.querySelector(".modal-close");

function openPetModal(id) {
  const pet = pets.find((p) => p.id === id);
  if (!pet) return;

  modalBodyEl.innerHTML = `
    <h2>${pet.name}</h2>
    <p style="margin-top:-0.2rem;color:#777;">${pet.breed} • ${pet.type}</p>
    <div class="pet-tags" style="margin:0.8rem 0 0.5rem;">
      <span class="pet-tag">${pet.ageLabel}</span>
      <span class="pet-tag">${pet.gender}</span>
      <span class="pet-tag">${pet.size}</span>
    </div>
    <img src="${pet.image}" alt="${pet.name}" style="width:100%;border-radius:18px;margin:0.8rem 0;max-height:260px;object-fit:cover;" />
    <p>${pet.description}</p>
    <p style="font-size:0.85rem;color:#777;">
      Interested in ${pet.name}? Submit the adoption form below and mention their name in your message.
    </p>
  `;
  modalEl.classList.remove("hidden");
}

function closeModal() {
  modalEl.classList.add("hidden");
}

modalCloseBtn.addEventListener("click", closeModal);
modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ----- FILTER CHANGES -----
["filter-type", "filter-size", "filter-age"].forEach((id) => {
  const select = document.getElementById(id);
  select.addEventListener("change", renderPets);
});

// ----- NAV TOGGLE (MOBILE) -----
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// close nav after clicking a link on mobile
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ----- FAQ ACCORDION -----
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains("open");
    document.querySelectorAll(".faq-answer").forEach((a) => {
      a.style.maxHeight = null;
      a.classList.remove("open");
      a.previousElementSibling
        .querySelector(".faq-toggle")
        .textContent = "+";
    });

    if (!isOpen) {
      answer.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
      btn.querySelector(".faq-toggle").textContent = "−";
    }
  });
});

// ----- CONTACT FORM (FRONT-END ONLY) -----
const form = document.getElementById("adoption-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "Submitting...";
  setTimeout(() => {
    formStatus.textContent =
      "Thank you! We received your application and will contact you soon.";
    form.reset();
  }, 800);
});

// ----- FOOTER YEAR -----
document.getElementById("year").textContent = new Date().getFullYear();

// ----- INITIAL RENDER -----
renderPets();
updateFavoriteCount();
