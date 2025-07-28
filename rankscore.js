document.querySelectorAll(".subject-row input").forEach(input => {
  input.addEventListener("input", calculate); 
});

// Added a click event listner to the "calaculate button"
document.getElementById("calculate-btn").addEventListener("click", calculate);

// function that will perform all calculations
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
     
    //
    for (let i = 0; i < e; i++) creditPoints.push(4);
    for (let i = 0; i < m; i++) creditPoints.push(3);
    for (let i = 0; i < a; i++) creditPoints.push(2);
  });

  const totalCredits = totalE + totalM + totalA;

  // sorts credits points in descending order so the highest points first 
  creditPoints.sort((a, b) => b - a);
  // slices best 80 credits
  const best80 = creditPoints.slice(0, 80);
  const rankScore = best80.reduce((sum, p) => sum + p, 0);

 // Counts how many of the 80 credits are excellence (4 points)
  const bestE = best80.filter(p => p === 4).length;
  // Counts how many of the 80 credits are merit (3 points)
  const bestM = best80.filter(p => p === 3).length;
  // Counts how many of the 80 credits are achived (2 points)
  const bestA = best80.filter(p => p === 2).length;
  // Calculates total score
  const bestTotal = bestE + bestM + bestA;

   // Updates subtotal display by showing total Excellence, Merit, Achieved and overall credits
  document.getElementById("subtotal-e").textContent = totalE;
  document.getElementById("subtotal-m").textContent = totalM;
  document.getElementById("subtotal-a").textContent = totalA;
  document.getElementById("subtotal-total").textContent = totalCredits;

  // Shows how many of each grade level were used in the best 80 credits
  document.getElementById("best-e").textContent = bestE;
  document.getElementById("best-m").textContent = bestM;
  document.getElementById("best-a").textContent = bestA;
  document.getElementById("best-total").textContent = bestTotal;

  // Calculated and displaying the points of each grade type
  document.getElementById("calc-e").textContent = bestE * 4;
  document.getElementById("calc-m").textContent = bestM * 3;
  document.getElementById("calc-a").textContent = bestA * 2;
  document.getElementById("calc-total").textContent = rankScore;

  // Displays the final calculated rank score
  document.getElementById("rank-score").textContent = rankScore;
}
