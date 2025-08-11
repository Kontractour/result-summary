// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Load data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Generate the summary list from JSON data
            generateSummaryList(data);
            
            // Animate all scores after a short delay
            setTimeout(() => {
                animateMainScore();
                animateSummaryScores(data);
            }, 500);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            // Fallback: show error message or use hardcoded data
        });
});

// Function to generate summary list HTML from JSON data
function generateSummaryList(data) {
    const summaryList = document.getElementById('summary-list');
    
    // Clear existing content
    summaryList.innerHTML = '';
    
    // Create HTML for each item
    data.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `summary-item ${item.category.toLowerCase()}`;
        
        li.innerHTML = `
            <img src="${item.icon}" alt="${item.category} icon" />
            <span class="category">${item.category}</span>
            <span class="score">
                <span class="animated-score" data-target="${item.score}">0</span>
                <span class="max"> / 100</span>
            </span>
        `;
        
        summaryList.appendChild(li);
    });
}

// Function to animate the main score (76)
function animateMainScore() {
    const scoreElement = document.querySelector('.result .score');
    const targetScore = 76;
    
    animateNumber(scoreElement, 0, targetScore, 2000); // 2 seconds
}

// Function to animate all summary scores
function animateSummaryScores(data) {
    const animatedScores = document.querySelectorAll('.animated-score');
    
    animatedScores.forEach((element, index) => {
        const targetScore = parseInt(element.getAttribute('data-target'));
        
        // Stagger the animations slightly for a nice effect
        setTimeout(() => {
            animateNumber(element, 0, targetScore, 1500); // 1.5 seconds each
        }, index * 200); // 200ms delay between each
    });
}

// Core animation function
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (starts fast, slows down at end)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.round(start + (end - start) * easeOut);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}
