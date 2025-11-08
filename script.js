// ...existing code...
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const hourEl = $(".hour");
const minEl = $(".min");
const secEl = $(".sec");
const dateEl = $(".date");
const tempEl = $(".temp-value");
const weekdays = $$(".weekday");
const ampmEl = $(".ampm");
const toggleBtn = $("#toggle-format");

let is24 = true;

// Simulovaná teplota (pro test)
async function getTemperature() {
    return new Promise(resolve => {
        const t = (Math.random() * 12 + 12).toFixed(1); // 12.0 - 24.0
        setTimeout(() => resolve(t), 200);
    });
}

async function updateTemperature() {
    const t = await getTemperature();
    if (t != null) tempEl.textContent = t;
}

function updateClock() {
    const now = new Date();

    // čas
    let hh = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();

    if (!is24) {
        const suffix = hh >= 12 ? "PM" : "AM";
        let displayHour = hh % 12;
        if (displayHour === 0) displayHour = 12;
        hourEl.textContent = String(displayHour).padStart(2, "0");
        ampmEl.textContent = suffix;
        ampmEl.style.display = "inline-block";
    } else {
        hourEl.textContent = String(hh).padStart(2, "0");
        ampmEl.textContent = "";
        ampmEl.style.display = "none";
    }

    minEl.textContent = String(mm).padStart(2, "0");
    secEl.textContent = String(ss).padStart(2, "0");

    // datum
    dateEl.textContent = `${String(now.getDate()).padStart(2,"0")}.${String(now.getMonth()+1).padStart(2,"0")}.${now.getFullYear()}`;

    // aktivní den
    $$(".weekday").forEach(w => w.classList.remove("active"));
    const today = document.querySelector(`.weekday[data-day="${now.getDay()}"]`);
    if (today) today.classList.add("active");
}

// toggle 12/24
toggleBtn.addEventListener("click", () => {
    is24 = !is24;
    toggleBtn.setAttribute("aria-pressed", String(is24));
    toggleBtn.textContent = is24 ? "24H" : "12H";
    updateClock();
});

// init
updateClock();
setInterval(updateClock, 1000);

// temperature update
updateTemperature();
setInterval(updateTemperature, 5 * 60 * 1000);