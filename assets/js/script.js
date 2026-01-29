// SOAR Modal Data
const soarData = {
    strength: {
        category: 'STRENGTH // INTELLIGENCE',
        title: 'The Renaissance of the Socratic Method',
        description: 'As AI handles rote tasks, faculty can return to what humans do best: asking the right questions, facilitating deep dialogue, and modeling critical thinking. The future of education is not content delivery—it\'s intellectual mentorship.',
        solution: 'Implement AI-powered curriculum mapping to free up 40% of faculty time for high-touch, Socratic-style seminars and personalized student mentorship.',
        color: 'var(--soar-strength)'
    },
    opportunity: {
        category: 'OPPORTUNITY // TECHNOLOGY',
        title: 'DeepSeek-V4 Integration',
        description: 'Multi-modal AI agents can now provide 24/7 academic counseling, mental health support, and career guidance—scaling personalized support beyond what any institution could afford with human staff alone.',
        solution: 'Deploy AI counseling agents trained on institutional data lakes, providing every student with a personalized support system that learns and adapts to their unique needs.',
        color: 'var(--soar-opportunity)'
    },
    aspiration: {
        category: 'ASPIRATION // CULTURE',
        title: 'The 4-Day Campus',
        description: 'With AI handling administrative overhead and asynchronous learning, institutions can redesign the campus experience around deep work, community building, and experiential learning—not seat time.',
        solution: 'Transition to a 4-day intensive model: 3 days of AI-augmented independent work, 1 day of mandatory in-person collaboration and community building.',
        color: 'var(--soar-aspiration)'
    },
    result: {
        category: 'RESULT // IMPACT',
        title: 'Alumni Impact 2.0',
        description: 'Success is no longer measured by job placement rates, but by the problems graduates solve, the ventures they launch, and the communities they transform. AI enables real-time tracking of alumni impact at scale.',
        solution: 'Build an AI-powered alumni impact dashboard that tracks career trajectories, entrepreneurial ventures, and social impact—creating a new accountability framework for institutional success.',
        color: 'var(--soar-result)'
    }
};

// Modal functionality
function openModal(type) {
    const data = soarData[type];
    const modal = document.getElementById('modal');
    const modalHeader = document.getElementById('modal-header');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalSolution = document.getElementById('modal-solution');
    
    modalHeader.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalSolution.textContent = data.solution;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    e.target.reset();
}
