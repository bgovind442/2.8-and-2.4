// List of all subjects
const subjects = [
  "English","Dance","Design (Practical Art)","Drama","History of Art","Music Studies",
  "Painting (Practical Art)","Photography (Practical Art)","Printmaking (Practical Art)","Sculpture",
  "Health Education","Home Economics","Physical Education","Chinese","Cook Islands Māori","French",
  "German","Indonesian","Japanese","Korean","Latin","New Zealand Sign Language","Samoan","Spanish",
  "Tongan","Calculus","Mathematics","Statistics","Agriculture and Horticultural Science","Biology",
  "Chemistry","Earth and Space Science","Physics","Science","Accounting","Business Studies",
  "Classical Studies","Economics","Geography","History","Media Studies","Psychology","Social Studies",
  "Construction and Mechanical Technologies","Design and Visual Communication","Digital Technologies",
  "Processing Technologies","Technology","Religious Studies","Te Reo Māori","Te Reo Rangatira"
];

// Populate all subject dropdowns dynamically
document.querySelectorAll(".subject-name").forEach(select => {
  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    select.appendChild(option);
  });
});

// Add input event listener to all number fields
document.querySelectorAll(".subject-row input").forEach(input => {
  input.addEventListener("input", calculate);
});

// Add click event listener to the calculate button
document.getElementById("calculate-btn").addEventListener("click", calculate);

// Function that performs all calculations
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
