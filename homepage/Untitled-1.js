// This section will allow the users to search up a topic which would direct them there
const sectionMap = {
    'home': '#home',
    'about': '#about', 
    'purpose': '#purpose',
    'impact': '#threats', 
    'threats': '#threats',
    'visualisation': '#visualisation',
    'visualization': '#visualisation', 
    'sightings': '#sightings', 
    'deforestation': '#deforestation',
    'london deforestation': '#deforestation-london',
    'forest': '#purpose',
    'wildlife': '#purpose',
};


function gotoSection(hash) {
    const el = document.querySelector(hash);
    if (!el) {
        console.warn('No section found for', hash);
        return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
}

// Search function
function searchSection() {
    const raw = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!raw) {
        return alert('Please enter a section to search for (e.g. purpose, sightings).');
    }

    if (sectionMap[raw]) {
        gotoSection(sectionMap[raw]);
        return;
    }

    for (const key of Object.keys(sectionMap)) {
        if (key.includes(raw) || raw.includes(key)) {
            gotoSection(sectionMap[key]);
            return;
        }
    }

    alert('Section not found. Try: home, purpose, impact, threats, visualisation, sightings, deforestation.');
}

// Enter key triggers search
document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchSection();
    }
});

document.getElementById('searchBtn').addEventListener('click', searchSection);

if (window.location.hash) {
    const h = window.location.hash;
    setTimeout(() => { gotoSection(h); }, 200);
}
