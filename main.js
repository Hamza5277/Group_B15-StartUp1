// Section Map for Search
const sectionMap = {
    'home': '#home',
    'about': '#purpose',
    'purpose': '#purpose',
    'impact': '#threats',
    'threats': '#threats',
    'visualisation': '#visualisation',
    'visualization': '#visualisation',
    'timelapse': '#visualisation',
    'deforestation': '#deforestation',
    'wildlife': '#wildlife',
    'contact': '#wildlife',
    'forest': '#purpose',
};

// Timelapse Data - 8 stages of ecosystem degradation
const timelapseData = [
    {
        image: 'images/stage1.jpg',
        year: '1990',
        title: 'Healthy Ecosystem',
        description: 'Thriving savanna with abundant wildlife - elephants, zebras, and giraffes roam freely.',
        species: '150+ species',
        status: 'healthy'
    },
    {
        image: 'images/stage2.jpg',
        year: '1995',
        title: 'Early Warning Signs',
        description: 'First signs of environmental stress appear. Slight decline in animal populations.',
        species: '130 species',
        status: 'warning'
    },
    {
        image: 'images/stage3.jpg',
        year: '2000',
        title: 'Noticeable Decline',
        description: 'Wildlife populations noticeably reduced. Grass becoming patchy, some trees dying.',
        species: '95 species',
        status: 'warning'
    },
    {
        image: 'images/stage4.jpg',
        year: '2005',
        title: 'Significant Habitat Loss',
        description: 'Major habitat fragmentation. Few animals remain as drought conditions worsen.',
        species: '60 species',
        status: 'danger'
    },
    {
        image: 'images/stage5.jpg',
        year: '2010',
        title: 'Severe Degradation',
        description: 'Almost no wildlife visible. Desertification advancing rapidly across the region.',
        species: '25 species',
        status: 'critical'
    },
    {
        image: 'images/stage6.jpg',
        year: '2015',
        title: 'Near Complete Collapse',
        description: 'Ecosystem on brink of collapse. No large animals survive, vegetation nearly gone.',
        species: '12 species',
        status: 'critical'
    },
    {
        image: 'images/stage7.jpg',
        year: '2020',
        title: 'Nearly Barren',
        description: 'Only scattered dead vegetation remains. Soil exposed and cracking from drought.',
        species: '5 species',
        status: 'critical'
    },
    {
        image: 'images/stage8.jpg',
        year: '2025',
        title: 'Total Ecosystem Collapse',
        description: 'What was once thriving savanna is now barren desert. Complete biodiversity loss.',
        species: '0 species',
        status: 'dead'
    }
];

// Current state
let currentIndex = 0;
let isPlaying = false;
let playInterval = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchInputMobile = document.getElementById('searchInputMobile');
const searchBtn = document.getElementById('searchBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const exploreBtn = document.getElementById('exploreBtn');
const timelapseImage = document.getElementById('timelapseImage');
const yearBadge = document.getElementById('yearBadge');
const speciesCount = document.getElementById('speciesCount');
const statusDot = document.getElementById('statusDot');
const stageTitle = document.getElementById('stageTitle');
const stageDescription = document.getElementById('stageDescription');
const prevBtn = document.getElementById('prevBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const counter = document.getElementById('counter');
const progressFill = document.getElementById('progressFill');
const timelineButtons = document.getElementById('timelineButtons');

// Initialize timeline buttons
function initTimelineButtons() {
    timelineButtons.innerHTML = '';
    timelapseData.forEach((data, index) => {
        const btn = document.createElement('button');
        btn.className = 'timeline-btn' + (index === 0 ? ' active' : '');
        btn.textContent = data.year;
        btn.addEventListener('click', () => goToIndex(index));
        timelineButtons.appendChild(btn);
    });
}

// Update display
function updateDisplay() {
    const data = timelapseData[currentIndex];
    
    // Fade out
    timelapseImage.classList.add('fade-out');
    
    setTimeout(() => {
        // Update image
        timelapseImage.src = data.image;
        
        // Update text content
        yearBadge.textContent = data.year;
        speciesCount.textContent = data.species;
        stageTitle.textContent = data.title;
        stageDescription.textContent = data.description;
        
        // Update status dot
        statusDot.className = 'status-dot ' + data.status;
        
        // Update counter
        counter.textContent = `${currentIndex + 1} / ${timelapseData.length}`;
        
        // Update progress bar
        const progressPercent = ((currentIndex + 1) / timelapseData.length) * 100;
        progressFill.style.width = progressPercent + '%';
        
        // Update timeline buttons
        document.querySelectorAll('.timeline-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === currentIndex);
        });
        
        // Update prev/next button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === timelapseData.length - 1;
        
        // Fade in
        timelapseImage.classList.remove('fade-out');
    }, 300);
}

// Go to specific index
function goToIndex(index) {
    if (index !== currentIndex && index >= 0 && index < timelapseData.length) {
        currentIndex = index;
        updateDisplay();
    }
}

// Go to next
function goToNext() {
    if (currentIndex < timelapseData.length - 1) {
        currentIndex++;
        updateDisplay();
    } else {
        stopPlayback();
    }
}

// Go to previous
function goToPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updateDisplay();
    }
}

// Start playback
function startPlayback() {
    isPlaying = true;
    playPauseBtn.textContent = '⏸';
    playInterval = setInterval(() => {
        if (currentIndex < timelapseData.length - 1) {
            goToNext();
        } else {
            stopPlayback();
        }
    }, 2500);
}

// Stop playback
function stopPlayback() {
    isPlaying = false;
    playPauseBtn.textContent = '▶';
    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
    }
}

// Toggle playback
function togglePlayback() {
    if (isPlaying) {
        stopPlayback();
    } else {
        if (currentIndex === timelapseData.length - 1) {
            currentIndex = 0;
            updateDisplay();
        }
        startPlayback();
    }
}

// Reset
function reset() {
    stopPlayback();
    currentIndex = 0;
    updateDisplay();
}

// Scroll to section
function gotoSection(hash) {
    const el = document.querySelector(hash);
    if (!el) {
        console.warn('No section found for', hash);
        return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Search function
function searchSection() {
    const input = searchInput || searchInputMobile;
    const raw = input.value.trim().toLowerCase();
    
    if (!raw) {
        alert('Please enter a section to search for (e.g. purpose, visualisation).');
        return;
    }

    // Direct match
    if (sectionMap[raw]) {
        gotoSection(sectionMap[raw]);
        input.value = '';
        if (mobileMenu) mobileMenu.classList.remove('active');
        return;
    }

    // Partial match
    for (const key of Object.keys(sectionMap)) {
        if (key.includes(raw) || raw.includes(key)) {
            gotoSection(sectionMap[key]);
            input.value = '';
            if (mobileMenu) mobileMenu.classList.remove('active');
            return;
        }
    }

    alert('Section not found. Try: home, purpose, threats, visualisation, wildlife, contact.');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline buttons
    initTimelineButtons();
    
    // Update initial display
    updateDisplay();
    
    // Search
    if (searchBtn) {
        searchBtn.addEventListener('click', searchSection);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchSection();
            }
        });
    }
    
    if (searchInputMobile) {
        searchInputMobile.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchSection();
            }
        });
    }
    
    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Explore button
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            gotoSection('#visualisation');
        });
    }
    
    // Timelapse controls
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayback);
    if (resetBtn) resetBtn.addEventListener('click', reset);
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            gotoSection(hash);
        });
    });
    
    // Handle initial hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            gotoSection(window.location.hash);
        }, 200);
    }
});
