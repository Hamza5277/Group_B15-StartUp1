/* Mobile Menu Toggle */
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                if (mobileMenu) mobileMenu.classList.remove('active');
            }
        });
    });

    loadTeamMembers();
});

const API_URL = 'http://localhost:8080/api/team';

const FALLBACK_MEMBERS = [
    { id: 1, name: 'Anas', role: 'About Page Developer', contribution: 'Designed and developed this About page, ensuring responsive design and proper navigation across the website.' },
    { id: 2, name: 'Hamza', role: 'Contact Page Developer', contribution: 'Developed the contact page and form functionality.' },
    { id: 3, name: 'Ahmad', role: 'Homepage Developer', contribution: 'Created the main homepage with hero section and wildlife information.' },
    { id: 4, name: 'Bader', role: 'Registration Developer', contribution: 'Built the user registration and login system.' }
];

function getInitials(name) {
    return name.split(' ').map(function(w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
}

function renderTeamCards(members, fromApi) {
    const grid = document.getElementById('teamGrid');
    const statusEl = document.getElementById('apiStatus');

    if (fromApi) {
        statusEl.innerHTML = '<span class="api-badge api-online">&#9679; Live data from Spring Boot API (localhost:8080)</span>';
    } else {
        statusEl.innerHTML = '<span class="api-badge api-offline">&#9679; Backend offline &mdash; showing static data</span>';
    }

    grid.innerHTML = '';

    members.forEach(function(member, index) {
        const isFeatured = index === 0;
        const initials = getInitials(member.name);
        const card = document.createElement('div');
        card.className = isFeatured ? 'team-card team-card-featured' : 'team-card';
        card.innerHTML = (isFeatured ? '<div class="featured-badge">About Page Developer</div>' : '') +
            '<div class="team-avatar"><span class="avatar-initials">' + initials + '</span></div>' +
            '<h3 class="team-name">' + member.name + '</h3>' +
            (isFeatured ? '<p class="team-id">Student ID: 2377406</p>' : '') +
            '<span class="team-role">' + member.role + '</span>' +
            '<p class="team-contribution">' + member.contribution + '</p>';
        grid.appendChild(card);
    });
}

function loadTeamMembers() {
    fetch(API_URL)
        .then(function(res) {
            if (!res.ok) throw new Error('API error');
            return res.json();
        })
        .then(function(data) { renderTeamCards(data, true); })
        .catch(function() { renderTeamCards(FALLBACK_MEMBERS, false); });
}