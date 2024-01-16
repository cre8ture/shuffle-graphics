const text = "Hello World";
let frame = 0;

// Create an Intersection Observer
// Create an Intersection Observer with a threshold of 1
const observer = new IntersectionObserver((entries) => {
    // Your existing code here
    // Loop over the entries
    entries.forEach(entry => {
        // If the entry is intersecting
       // If the entry is intersecting
if (entry.isIntersecting) {
    console.log('Row is visible');

        // Loop over the entries
        entries.forEach(entry => {
            // If the entry is intersecting and not already shuffling
            if (entry.isIntersecting && entry.target.getAttribute('data-shuffling') !== 'true') {
                console.log('Row is visible');
    
                // Set the row as shuffling
                entry.target.setAttribute('data-shuffling', 'true');
    
                // Start the shuffling animation
                shuffleRowText(entry.target);
            }
        });
    // Create a new row
    lastRowHeight += 5;
    const newRow = createRow(lastRowHeight);

    // Observe the new row
    observer.observe(newRow);
}
    });
});
function updateFontSize() {
  // Select all elements with the class .row
  const rows = document.querySelectorAll(".row");

  // Iterate through each row
  for (let i = 0; i < rows.length; i++) {
    // Reset transform to get accurate measurements
    rows[i].style.transform = "none";

    // Get the width of the row and the text
    const rowWidth = rows[i].offsetWidth;
    const textWidth = rows[i].scrollWidth;

    // Calculate the scale factor
    const scaleFactor = rowWidth / textWidth;

    // Set the font size to the height of the row
    rows[i].style.fontSize = rows[i].offsetHeight + "px";

    // Scale the text to fit the width of the row
    rows[i].style.transform = "scaleX(" + scaleFactor + ")";
  }
}

updateFontSize(); // Call initially
window.addEventListener("resize", updateFontSize); // Recalculate on resize

let lastRowHeight = 10; // Start with a height of 10vh for the first row

// Call this function when the page loads
window.onload = function () {
  let totalHeight = 0;

  // Keep creating new rows until the total height is 100vh
  while (totalHeight <= 100) {
    createRow(lastRowHeight);
    totalHeight += lastRowHeight;
    lastRowHeight += 5; // Increase the height for the next row
  }

  // Add an extra row to ensure scroll will activate
  createRow(lastRowHeight);
};

// Create a new row at the end of the body
const lastRow = createRow(lastRowHeight);
// Define the target text
const targetText = 'Hello World';


// Define the characters to shuffle
const shuffleText = '@#$%&==+**--..,';

// function shuffleHelperPrevText(index, row, shuffleText) {
//     let shuffledText = '';
//     const targetText = 'Hello World';

//     for (let i = 0; i < targetText.length; i++) {
//         if (i <= index) {
//             shuffledText += shuffleText[frame - (index - i) % shuffleText.length];
//         } else {
//             shuffledText += targetText[i];
//         }
//     }

//     row.textContent = shuffledText;
// }


// function shuffleRowText(row, index = 0) {
//     // Update the row's text
//     const targetText = 'Hello World';
//     const shuffleText = '@#$%&==+**--..,';
    
//     // row.textContent = shuffleText[frame % shuffleText.length] + targetText.slice(index + 1);
//     shuffleHelperPrevText(index, row, shuffleText)

//     // If the entire shuffleText has been iterated, reset the row's text to the target text
//     if (index >= shuffleText.length - 1) {
//         row.textContent = targetText;
//         row.setAttribute('data-shuffling', 'false');
//     } else {
//         // Otherwise, request the next animation frame
//         requestAnimationFrame(() => shuffleRowText(row, index + 1));
//     }
//     frame++;
// }
function shuffleHelperPrevText(index, row, shuffleText) {
    let shuffledText = '';
    const targetText = 'Hello World';

    for (let i = 0; i < targetText.length; i++) {
        if (i <= index) {
            console.log("frame - (index - i) % shuffleText.length", (frame - index - i) % shuffleText.length)
            shuffledText += shuffleText[(frame - index - i) % shuffleText.length];
        } else {
            shuffledText += targetText[i];
        }
    }

    row.textContent = shuffledText;
}

async function shuffleRowText(row, index = 0, shuffleCount = 3) {
    const targetText = 'Hello World';
    const shuffleText = '@#$%&==+**--..,';

    async function shuffleIndex(i) {
        shuffleHelperPrevText(i, row, shuffleText);
        // Introduce a delay between shuffles
        await new Promise(resolve => setTimeout(resolve, 80)); // Adjust the delay time as needed
    }

    for (let count = 0; count < shuffleCount; count++) {
        for (let i = index; i >= 0; i--) {
            await shuffleIndex(i);
        }
    }

    if (index >= shuffleText.length - 1) {
        row.textContent = targetText;
        row.setAttribute('data-shuffling', 'false');
    } else {
        requestAnimationFrame(() => shuffleRowText(row, index + 1, shuffleCount));
    }
    frame++;
}


function createRow(height) {
    // Create a new row
    const row = document.createElement('div');
    row.className = 'row';
    row.style.height = `${height}vh`;

    
  // Set the styles for the new row
  row.style.height = `${height}vh`;
  row.style.width = "100vw";
  row.style.textAlign = "center";
  row.style.fontWeight = "bold";
  row.style.display = "flex";
  row.style.alignItems = "center";
  row.style.justifyContent = "center";
  row.style.overflow = "hidden";
  row.style.whiteSpace = "nowrap";


    // Append the row to the body
    document.body.appendChild(row);
    //   // Call your updateFontSize function to adjust the font size of the new row
  updateFontSize();

    // Start observing the row
    observer.observe(row);

    row.textContent = text;
    // Return the new row
    return row;
}


const newRow = createRow(lastRowHeight);
observer.observe(newRow);