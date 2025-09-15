// List of subject in alphabetical order
const subjects = [
  "Accounting",
  "Agriculture and Horticultural Science",
  "Biology",
  "Business Studies",
  "Calculus",
  "Chemistry",
  "Chinese",
  "Classical Studies",
  "Construction and Mechanical Technologies",
  "Cook Islands Māori",
  "Dance",
  "Design (Practical Art)",
  "Design and Visual Communication",
  "Digital Technologies",
  "Drama",
  "Earth and Space Science",
  "Economics",
  "English",
  "French",
  "German",
  "Health Education",
  "History",
  "History of Art",
  "Home Economics",
  "Indonesian",
  "Japanese",
  "Korean",
  "Latin",
  "Media Studies",
  "Mathematics",
  "Music Studies",
  "New Zealand Sign Language",
  "Painting (Practical Art)",
  "Photography (Practical Art)",
  "Physical Education",
  "Physics",
  "Printmaking (Practical Art)",
  "Processing Technologies",
  "Psychology",
  "Religious Studies",
  "Samoan",
  "Science",
  "Social Studies",
  "Spanish",
  "Statistics",
  "Sculpture",
  "Technology",
  "Te Reo Māori",
  "Te Reo Rangatira",
  "Tongan"
];


// Populating subject dropdowns
document.querySelectorAll(".subject-name").forEach(select => {
  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    select.appendChild(option);
  });
});

// Add input listener for real-time calculation
document.querySelectorAll(".subject-row input").forEach(input => {
  input.addEventListener("input", calculate);
});

function calculate() {
  const rows = document.querySelectorAll(".subject-row");
  let totalE = 0, totalM = 0, totalA = 0;
  let creditPoints = [];

  rows.forEach(row => {
    const e = parseInt(row.querySelector(".excellence")?.value || 0);
    const m = parseInt(row.querySelector(".merit")?.value || 0);
    const a = parseInt(row.querySelector(".achieved")?.value || 0);
    const rowTotal = e + m + a;
    row.querySelector(".total").textContent = rowTotal;

    totalE += e;
    totalM += m;
    totalA += a;

    for (let i = 0; i < e; i++) creditPoints.push(4);
    for (let i = 0; i < m; i++) creditPoints.push(3);
    for (let i = 0; i < a; i++) creditPoints.push(2);
  });

  const totalCredits = totalE + totalM + totalA;
  creditPoints.sort((a, b) => b - a);
  const best80 = creditPoints.slice(0, 80);
  const rankScore = best80.reduce((sum, p) => sum + p, 0);
  const bestE = best80.filter(p => p === 4).length;
  const bestM = best80.filter(p => p === 3).length;
  const bestA = best80.filter(p => p === 2).length;
  const bestTotal = bestE + bestM + bestA;

  document.getElementById("subtotal-e").textContent = totalE;
  document.getElementById("subtotal-m").textContent = totalM;
  document.getElementById("subtotal-a").textContent = totalA;
  document.getElementById("subtotal-total").textContent = totalCredits;

  document.getElementById("best-e").textContent = bestE;
  document.getElementById("best-m").textContent = bestM;
  document.getElementById("best-a").textContent = bestA;
  document.getElementById("best-total").textContent = bestTotal;

  document.getElementById("calc-e").textContent = bestE * 4;
  document.getElementById("calc-m").textContent = bestM * 3;
  document.getElementById("calc-a").textContent = bestA * 2;
  document.getElementById("calc-total").textContent = rankScore;
  document.getElementById("rank-score").textContent = rankScore;
}
