const API_BASE = 'http://localhost:8080/api';

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
    'species': '#species',
    'sightings': '#sightings',
    'threat reports': '#threat-reports',
    'wildlife': '#wildlife',
    'contact': '#wildlife',
    'forest': '#purpose',
};

const stageBackgrounds = [
    "url('images/stage1.jpg') center/cover no-repeat, linear-gradient(135deg, #2d7a2d 0%, #4a9e4a 40%, #6bbf6b 70%, #a8d8a8 100%)",
    "url('images/stage2.jpg') center/cover no-repeat, linear-gradient(135deg, #3d8a2d 0%, #6aaa3a 40%, #9dc96a 70%, #c8e8a0 100%)",
    "url('images/stage3.jpg') center/cover no-repeat, linear-gradient(135deg, #7a8a2d 0%, #aaaa3a 40%, #cccc5a 70%, #e8e890 100%)",
    "url('images/stage4.jpg') center/cover no-repeat, linear-gradient(135deg, #8a6a1a 0%, #b88a2a 40%, #d4aa50 70%, #e8cc80 100%)",
    "url('images/stage5.jpg') center/cover no-repeat, linear-gradient(135deg, #8a4a10 0%, #b86020 40%, #d48040 70%, #e8a860 100%)",
    "url('images/stage6.jpg') center/cover no-repeat, linear-gradient(135deg, #7a2a08 0%, #a84010 40%, #c86030 70%, #e08050 100%)",
    "url('images/stage7.jpg') center/cover no-repeat, linear-gradient(135deg, #5a1a04 0%, #882808 40%, #aa4010 70%, #cc6030 100%)",
    "url('images/stage8.jpg') center/cover no-repeat, linear-gradient(135deg, #1a0a02 0%, #3a1804 40%, #5a2808 70%, #783010 100%)",
];

const timelapseData = [
    { year: '1990', title: 'Healthy Ecosystem', description: 'Thriving savanna with abundant wildlife - elephants, zebras, and giraffes roam freely.', species: '150+ species', status: 'healthy' },
    { year: '1995', title: 'Early Warning Signs', description: 'First signs of environmental stress appear. Slight decline in animal populations.', species: '130 species', status: 'warning' },
    { year: '2000', title: 'Noticeable Decline', description: 'Wildlife populations noticeably reduced. Grass becoming patchy, some trees dying.', species: '95 species', status: 'warning' },
    { year: '2005', title: 'Significant Habitat Loss', description: 'Major habitat fragmentation. Few animals remain as drought conditions worsen.', species: '60 species', status: 'danger' },
    { year: '2010', title: 'Severe Degradation', description: 'Almost no wildlife visible. Desertification advancing rapidly across the region.', species: '25 species', status: 'critical' },
    { year: '2015', title: 'Near Complete Collapse', description: 'Ecosystem on brink of collapse. No large animals survive, vegetation nearly gone.', species: '12 species', status: 'critical' },
    { year: '2020', title: 'Nearly Barren', description: 'Only scattered dead vegetation remains. Soil exposed and cracking from drought.', species: '5 species', status: 'critical' },
    { year: '2025', title: 'Total Ecosystem Collapse', description: 'What was once thriving savanna is now barren desert. Complete biodiversity loss.', species: '0 species', status: 'dead' },
];

let currentIndex = 0;
let isPlaying = false;
let playInterval = null;

// Tracks the id of the item currently being edited
let editingSightingId = null;
let editingThreatId = null;

// DOM refs
const searchInput = document.getElementById('searchInput');
const searchInputMobile = document.getElementById('searchInputMobile');
const searchBtn = document.getElementById('searchBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const exploreBtn = document.getElementById('exploreBtn');
const imageContainer = document.getElementById('imageContainer');
const yearBadge = document.getElementById('yearBadge');
const speciesCountEl = document.getElementById('speciesCount');
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

// ─── Timelapse ────────────────────────────────────────────────────────────────

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

function updateDisplay() {
    const data = timelapseData[currentIndex];

    imageContainer.classList.add('fade-out');

    setTimeout(() => {
        imageContainer.style.background = stageBackgrounds[currentIndex];
        yearBadge.textContent = data.year;
        speciesCountEl.textContent = data.species;
        stageTitle.textContent = data.title;
        stageDescription.textContent = data.description;
        statusDot.className = 'status-dot ' + data.status;
        counter.textContent = `${currentIndex + 1} / ${timelapseData.length}`;
        progressFill.style.width = (((currentIndex + 1) / timelapseData.length) * 100) + '%';

        document.querySelectorAll('.timeline-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === currentIndex);
        });

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === timelapseData.length - 1;

        imageContainer.classList.remove('fade-out');
    }, 300);
}

function goToIndex(index) {
    if (index !== currentIndex && index >= 0 && index < timelapseData.length) {
        currentIndex = index;
        updateDisplay();
    }
}

function goToNext() {
    if (currentIndex < timelapseData.length - 1) {
        currentIndex++;
        updateDisplay();
    } else {
        stopPlayback();
    }
}

function goToPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updateDisplay();
    }
}

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

function stopPlayback() {
    isPlaying = false;
    playPauseBtn.textContent = '▶';
    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
    }
}

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

function reset() {
    stopPlayback();
    currentIndex = 0;
    updateDisplay();
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiFetch(path) {
    const res = await fetch(API_BASE + path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

async function apiPost(path, body) {
    const res = await fetch(API_BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

async function apiPut(path, body) {
    const res = await fetch(API_BASE + path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

async function apiDelete(path) {
    const res = await fetch(API_BASE + path, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// ─── Species ──────────────────────────────────────────────────────────────────

const SPECIES_DATA = [
    {
        commonName: 'Red Fox',
        scientificName: 'Vulpes vulpes',
        conservationStatus: 'LEAST CONCERN',
        habitat: 'Urban gardens and parks',
        description: 'Common across UK cities, highly adaptable and often seen scavenging in urban environments.'
    },
    {
        commonName: 'European Hedgehog',
        scientificName: 'Erinaceus europaeus',
        conservationStatus: 'VULNERABLE',
        habitat: 'Gardens and woodland edges',
        description: 'Important pest controller in serious decline due to habitat loss and road deaths.'
    },
    {
        commonName: 'European Robin',
        scientificName: 'Erithacus rubecula',
        conservationStatus: 'LEAST CONCERN',
        habitat: 'Gardens, woodland and hedgerows',
        description: 'Iconic UK garden bird and strong indicator of healthy green spaces.'
    },
    {
        commonName: 'Common Pipistrelle',
        scientificName: 'Pipistrellus pipistrellus',
        conservationStatus: 'NEAR THREATENED',
        habitat: 'Urban and rural areas near water',
        description: 'Small bat species vital for insect control, threatened by light pollution and roost disturbance.'
    },
    {
        commonName: 'Barn Owl',
        scientificName: 'Tyto alba',
        conservationStatus: 'VULNERABLE',
        habitat: 'Open farmland and grassland',
        description: 'Nocturnal hunter affected by habitat loss and rodenticide poisoning.'
    }
];

function formatConservationStatus(status) {
    if (!status) return 'Unknown';
    return status
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());
}

function getStatusKey(status) {
    if (!status) return 'unknown';
    return status.toLowerCase().replace(/[\s-]+/g, '_');
}

async function fetchSpecies() {
    const list = document.getElementById('speciesList');
    let data = SPECIES_DATA;
    try {
        const apiData = await apiFetch('/species');
        if (Array.isArray(apiData) && apiData.length) data = apiData;
    } catch (e) {
        // backend unavailable — use built-in data
    }
    list.innerHTML = data.map(s => {
        const name = s.commonName || s.name || 'Unknown Species';
        const scientific = s.scientificName || '';
        const status = s.conservationStatus || '';
        const habitat = s.habitat || 'Unknown habitat';
        const description = s.description || '';
        return `
            <div class="species-card">
                <div class="species-card-header">
                    <h3>${name}</h3>
                    <span class="conservation-badge status-${getStatusKey(status)}">${formatConservationStatus(status)}</span>
                </div>
                <p class="species-scientific"><em>${scientific}</em></p>
                <p>${description}</p>
                <div class="species-meta">
                    <span>📍 ${habitat}</span>
                </div>
            </div>
        `;
    }).join('');
}

// ─── Sightings ────────────────────────────────────────────────────────────────

async function fetchSightings() {
    const list = document.getElementById('sightingsList');
    try {
        const data = await apiFetch('/sightings');
        if (!data.length) {
            list.innerHTML = '<p class="empty-state">No sightings reported yet.</p>';
            return;
        }
        list.innerHTML = data.map(s => `
            <div class="sighting-card">
                <div class="sighting-card-header">
                    <h3>${s.speciesName}</h3>
                    <span class="sighting-location">📍 ${s.location}</span>
                </div>
                ${s.date ? `<p class="sighting-date">📅 ${s.date}</p>` : ''}
                <p>${s.description || ''}</p>
                <p class="sighting-observer">Reported by: <strong>${s.reportedBy}</strong></p>
                <div class="card-actions">
                    <button class="btn-edit" data-id="${s.id}">Edit</button>
                    <button class="btn-delete" data-id="${s.id}">Delete</button>
                </div>
            </div>
        `).join('');

        list.querySelectorAll('.btn-edit').forEach(btn => {
            const id = Number(btn.dataset.id);
            btn.addEventListener('click', () => openSightingEdit(data.find(s => s.id === id)));
        });
        list.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteSighting(Number(btn.dataset.id)));
        });
    } catch (e) {
        list.innerHTML = '<p class="api-error">Could not load sightings — is the backend running?</p>';
    }
}

async function submitSighting(e) {
    e.preventDefault();
    const msg = document.getElementById('sightingMessage');
    const body = {
        speciesName: document.getElementById('sightingSpecies').value,
        location: document.getElementById('sightingLocation').value,
        date: document.getElementById('sightingDate').value,
        reportedBy: document.getElementById('sightingReportedBy').value,
        description: document.getElementById('sightingDescription').value,
    };
    try {
        await apiPost('/sightings', body);
        msg.textContent = 'Sighting submitted successfully!';
        msg.className = 'form-message success';
        e.target.reset();
        fetchSightings();
    } catch (err) {
        msg.textContent = 'Failed to submit. Is the backend running?';
        msg.className = 'form-message error';
    }
}

async function deleteSighting(id) {
    if (!confirm('Delete this sighting?')) return;
    try {
        await apiDelete(`/sightings/${id}`);
        fetchSightings();
    } catch (err) {
        alert('Failed to delete sighting.');
    }
}

function openSightingEdit(sighting) {
    editingSightingId = sighting.id;
    document.getElementById('editSightingSpecies').value = sighting.speciesName || '';
    document.getElementById('editSightingLocation').value = sighting.location || '';
    document.getElementById('editSightingDate').value = sighting.date || '';
    document.getElementById('editSightingReportedBy').value = sighting.reportedBy || '';
    document.getElementById('editSightingDescription').value = sighting.description || '';
    document.getElementById('editSightingHealth').value = sighting.healthStatus || '';
    document.getElementById('sightingEditMessage').textContent = '';
    document.getElementById('sightingModal').classList.add('active');
}

async function saveSightingEdit(e) {
    e.preventDefault();
    const msg = document.getElementById('sightingEditMessage');
    const body = {
        speciesName: document.getElementById('editSightingSpecies').value,
        location: document.getElementById('editSightingLocation').value,
        date: document.getElementById('editSightingDate').value,
        reportedBy: document.getElementById('editSightingReportedBy').value,
        description: document.getElementById('editSightingDescription').value,
        healthStatus: document.getElementById('editSightingHealth').value,
    };
    try {
        await apiPut(`/sightings/${editingSightingId}`, body);
        closeSightingModal();
        fetchSightings();
    } catch (err) {
        msg.textContent = 'Failed to save changes.';
        msg.className = 'form-message error';
    }
}

function closeSightingModal() {
    document.getElementById('sightingModal').classList.remove('active');
    editingSightingId = null;
}

// ─── Threat Reports ───────────────────────────────────────────────────────────

async function fetchThreatReports() {
    const list = document.getElementById('threatReportsList');
    try {
        const data = await apiFetch('/threats');
        if (!data.length) {
            list.innerHTML = '<p class="empty-state">No threat reports yet.</p>';
            return;
        }
        list.innerHTML = data.map(t => `
            <div class="threat-report-card">
                <div class="threat-report-header">
                    <h3>${t.threatType}</h3>
                    <span class="severity-badge sev-${(t.severity || '').toLowerCase()}">${t.severity}</span>
                </div>
                <p class="threat-report-location">📍 ${t.location}</p>
                <p>${t.description || ''}</p>
                <p class="threat-reporter">Reported by: <strong>${t.reportedBy}</strong></p>
                <div class="card-actions">
                    <button class="btn-edit" data-id="${t.id}">Edit</button>
                    <button class="btn-delete" data-id="${t.id}">Delete</button>
                </div>
            </div>
        `).join('');

        list.querySelectorAll('.btn-edit').forEach(btn => {
            const id = Number(btn.dataset.id);
            btn.addEventListener('click', () => openThreatEdit(data.find(t => t.id === id)));
        });
        list.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteThreat(Number(btn.dataset.id)));
        });
    } catch (e) {
        list.innerHTML = '<p class="api-error">Could not load threat reports — is the backend running?</p>';
    }
}

async function submitThreat(e) {
    e.preventDefault();
    const msg = document.getElementById('threatMessage');
    const body = {
        threatType: document.getElementById('threatType').value,
        location: document.getElementById('threatLocation').value,
        severity: document.getElementById('threatSeverity').value,
        description: document.getElementById('threatDescription').value,
        reportedBy: document.getElementById('threatReportedBy').value,
    };
    try {
        await apiPost('/threats', body);
        msg.textContent = 'Threat report submitted successfully!';
        msg.className = 'form-message success';
        e.target.reset();
        fetchThreatReports();
    } catch (err) {
        msg.textContent = 'Failed to submit. Is the backend running?';
        msg.className = 'form-message error';
    }
}

async function deleteThreat(id) {
    if (!confirm('Delete this threat report?')) return;
    try {
        await apiDelete(`/threats/${id}`);
        fetchThreatReports();
    } catch (err) {
        alert('Failed to delete threat report.');
    }
}

function openThreatEdit(threat) {
    editingThreatId = threat.id;
    document.getElementById('editThreatType').value = threat.threatType || '';
    document.getElementById('editThreatLocation').value = threat.location || '';
    document.getElementById('editThreatSeverity').value = threat.severity || 'LOW';
    document.getElementById('editThreatReportedBy').value = threat.reportedBy || '';
    document.getElementById('editThreatDescription').value = threat.description || '';
    document.getElementById('threatEditMessage').textContent = '';
    document.getElementById('threatModal').classList.add('active');
}

async function saveThreatEdit(e) {
    e.preventDefault();
    const msg = document.getElementById('threatEditMessage');
    const body = {
        threatType: document.getElementById('editThreatType').value,
        location: document.getElementById('editThreatLocation').value,
        severity: document.getElementById('editThreatSeverity').value,
        reportedBy: document.getElementById('editThreatReportedBy').value,
        description: document.getElementById('editThreatDescription').value,
    };
    try {
        await apiPut(`/threats/${editingThreatId}`, body);
        closeThreatModal();
        fetchThreatReports();
    } catch (err) {
        msg.textContent = 'Failed to save changes.';
        msg.className = 'form-message error';
    }
}

function closeThreatModal() {
    document.getElementById('threatModal').classList.remove('active');
    editingThreatId = null;
}

// ─── Search / Nav ─────────────────────────────────────────────────────────────

function gotoSection(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function searchSection() {
    const input = document.activeElement === searchInputMobile ? searchInputMobile : searchInput;
    const raw = input.value.trim().toLowerCase();
    if (!raw) { alert('Please enter a section to search for.'); return; }

    if (sectionMap[raw]) {
        gotoSection(sectionMap[raw]);
        input.value = '';
        if (mobileMenu) mobileMenu.classList.remove('active');
        return;
    }
    for (const key of Object.keys(sectionMap)) {
        if (key.includes(raw) || raw.includes(key)) {
            gotoSection(sectionMap[key]);
            input.value = '';
            if (mobileMenu) mobileMenu.classList.remove('active');
            return;
        }
    }
    alert('Section not found. Try: home, purpose, threats, visualisation, species, sightings, wildlife.');
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    initTimelineButtons();
    updateDisplay();

    fetchSpecies();
    fetchSightings();
    fetchThreatReports();

    if (searchBtn) searchBtn.addEventListener('click', searchSection);
    if (searchInput) searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); searchSection(); } });
    if (searchInputMobile) searchInputMobile.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); searchSection(); } });

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('active'));
    document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('active')));

    if (exploreBtn) exploreBtn.addEventListener('click', () => gotoSection('#visualisation'));

    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayback);
    if (resetBtn) resetBtn.addEventListener('click', reset);

    const sightingForm = document.getElementById('sightingForm');
    if (sightingForm) sightingForm.addEventListener('submit', submitSighting);

    const threatForm = document.getElementById('threatForm');
    if (threatForm) threatForm.addEventListener('submit', submitThreat);

    document.getElementById('sightingEditForm').addEventListener('submit', saveSightingEdit);
    document.getElementById('sightingModalClose').addEventListener('click', closeSightingModal);
    document.getElementById('sightingModalCancel').addEventListener('click', closeSightingModal);
    document.getElementById('sightingModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeSightingModal(); });

    document.getElementById('threatEditForm').addEventListener('submit', saveThreatEdit);
    document.getElementById('threatModalClose').addEventListener('click', closeThreatModal);
    document.getElementById('threatModalCancel').addEventListener('click', closeThreatModal);
    document.getElementById('threatModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeThreatModal(); });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            gotoSection(this.getAttribute('href'));
        });
    });

    if (window.location.hash) {
        setTimeout(() => gotoSection(window.location.hash), 200);
    }
});
