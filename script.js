const gallery = document.querySelector(".gallery");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const filterButtons = document.querySelectorAll(".filters button");
const themeToggle = document.getElementById("themeToggle");

let currentIndex = 0;
let filteredImages = [];

/* IMAGENS — CURADORIA FINAL */
const images = [
    // 🌿 NATUREZA
    {
        src: "https://picsum.photos/id/1015/800/600",
        title: "Canyon",
        category: "nature",
    },
    {
        src: "https://picsum.photos/id/1035/800/600",
        title: "Cascata",
        category: "nature",
    },
    {
        src: "https://picsum.photos/id/1045/800/600",
        title: "Montanhas",
        category: "nature",
    },
    {
        src: "https://picsum.photos/id/1011/800/600",
        title: "Canoagem",
        category: "nature",
    },

    // 🐾 ANIMAIS
    {
        src: "https://picsum.photos/id/1025/800/600",
        title: "Cachorro",
        category: "animals",
    },
    {
        src: "https://picsum.photos/id/1074/800/600",
        title: "Leopardo",
        category: "animals",
    },

    // 🏙️ CIDADE — UNSPLASH
    {
        src: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
        title: "Big Ben, Londres",
        category: "city",
    },
    {
        src: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?auto=format&fit=crop&w=1200&q=80",
        title: "Escritórios Modernos",
        category: "city",
    },
    {
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
        title: "Rua no Subúrbio",
        category: "city",
    },
];

/* RENDERIZA GALERIA */
function renderGallery(list) {
    gallery.innerHTML = "";
    filteredImages = list;

    list.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.title;
        img.tabIndex = 0;

        img.addEventListener("click", () => openModal(index));
        img.addEventListener("keydown", (e) => {
            if (e.key === "Enter") openModal(index);
        });

        gallery.appendChild(img);
    });
}

/* MODAL */
function openModal(index) {
    currentIndex = index;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    updateModal();
}

function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

function updateModal() {
    modalImage.src = filteredImages[currentIndex].src;
    modalTitle.textContent = filteredImages[currentIndex].title;
}

/* CONTROLES */
prevBtn.addEventListener("click", () => {
    currentIndex =
        currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    updateModal();
});

nextBtn.addEventListener("click", () => {
    currentIndex =
        currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    updateModal();
});

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
});

/* FILTROS */
filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        renderGallery(
            filter === "all"
                ? images
                : images.filter((img) => img.category === filter)
        );
    });
});

/* TEMA CLARO / ESCURO */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark")
        ? "☀️ Tema Claro"
        : "🌙 Tema Escuro";
});

/* INIT */
renderGallery(images);
