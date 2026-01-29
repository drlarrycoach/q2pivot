document.addEventListener('DOMContentLoaded', () => {
    // Quote Data
    const quotes = [
        {
            text: '"We must judge the value of any educational system... only on the ground of <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>what it moves toward and into</span>."',
            author: "Dr John Dewey",
            instrument: "The Democratic Philosopher • Cello"
        },
        {
            text: '"I did not invent a <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>method of education</span>, I simply gave some little children a <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>chance to live</span>."',
            author: "Dr Maria Montessori",
            instrument: "The Architect • Violin I"
        },
        {
            text: '"In general we might say that the relations between higher mental functions once were genuine relations between people... first, <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>between people</span> (interpsychological) and then inside the child (intrapsychological)."',
            author: "Dr Lev Vygotsky",
            instrument: "The Networker • Violin II"
        },
        {
            text: '"Only <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>awareness</span> is educable. ... Teaching is subordinated to <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>learning</span>."',
            author: "Dr Caleb Gattegno",
            instrument: "The Silence Keeper • Viola"
        },
        {
            text: '"What <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>any person</span> in the world can learn, <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>almost all persons</span> can learn if provided with appropriate prior and current conditions of learning."',
            author: "Dr Benjamin Bloom",
            instrument: "The Optimizer • Solo Violin"
        },
        {
            text: '"The new mission of education is to develop a <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>total environment conducive to human growth</span> and self-actualization to create an educative society."',
            author: "Dr Malcolm Knowles",
            instrument: "The Autonomy Architect • Violin I"
        },
        {
            text: '"We are captives of our own <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>cultural programming</span>... The great gift is an opportunity to achieve <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>awareness</span>."',
            author: "Dr Edward T. Hall",
            instrument: "The Context Reader • Viola"
        },
        {
            text: '"Any subject can be taught effectively in some <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>intellectually honest form</span> to any child at any stage of development."',
            author: "Dr Jerome Bruner",
            instrument: "The Narrative Architect • Violin I"
        },
        {
            text: '"Because love is an act of courage, not of <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>fear</span>, love is commitment to others. No matter where the oppressed are found, the act of love is commitment to their cause—the cause of <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>liberation</span>."',
            author: "Dr Paulo Freire",
            instrument: "The Liberator • Solo Oboe"
        },
        {
            text: '"In many schools today, "computer-aided instruction" means making the <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>computer teach the child</span>. In my vision, the <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>child programs the computer</span>."',
            author: "Dr Seymour Papert",
            instrument: "The Maker • Violin I"
        },
        {
            text: '"Passive leisure often leads to <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>psychic entropy</span>... True meaning comes from <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>psychic negentropy</span> (flow)."',
            author: "Dr Mihaly Csikszentmihalyi",
            instrument: "The Flow Architect • Harpsichord"
        },
        {
            text: '"The <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>blazing one</span> is something which I reach only to the extent that I experience, and make manifest, my feeling... I try to make the building so that it carries my eternal sadness."',
            author: "Dr Christopher Alexander",
            instrument: "The Pattern Weaver • Violin I"
        },
        {
            text: '"Learning is not just <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>acquiring skills</span>; it is <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>becoming a person</span>—a knower in a context where what it means to know is negotiated with respect to the regime of competence of a community."',
            author: "Drs Lave & Wenger",
            instrument: "The Apprenticeship Architects • Violin II"
        },
        {
            text: '"In the <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>fixed mindset</span>, everything is about the outcome. The <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>growth mindset</span> allows people to value what they’re doing regardless of the outcome."',
            author: "Dr Carol Dweck",
            instrument: "The Gardener • Solo Recorder"
        },
        {
            text: '"We have spent too long mining our minds the way we <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>strip-mine</span> the earth... To survive and flourish, we must offer our children the gift of their own <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>wholeness</span>."',
            author: "Sir Ken Robinson",
            instrument: "The Alchemist • Solo Trumpet"
        },
        {
            text: '"Understanding is revealed through <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>transfer</span>. If students cannot apply knowledge in new contexts, they never understood it—they only <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>memorized</span> it."',
            author: "Dr Grant Wiggins & Jay McTighe",
            instrument: "The Backward Designers • Violin I"
        },
        {
            text: '"...organizations where people continually expand their capacity to create the <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>results they truly desire</span>, where new and expansive patterns of thinking are nurtured, where <span class=\'text-q2-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]\'>collective aspiration is set free</span>, and where people are continually <span class=\'text-q2-cyan drop-shadow-[0_0_10px_rgba(13,124,140,0.5)]\'>learning how to learn together</span>."',
            author: "Dr Peter Senge",
            instrument: "The Systems Thinker • Conductor"
        }
    ];

    const container = document.getElementById('hero-quotes');
    if (!container) return; // Exit if no container found

    let index = 0;

    function renderQuote() {
        const q = quotes[index];
        // Only trigger if container exists
        if (container) {
            // Fade out first if reusing element, but since we replace innerHTML, we can just animate the new one
            // Ideally we'd fade out the old content, wait, then swap.
            // Simplified for vanilla: inject new content with opacity 0, then fade in.

            // Create a wrapper for transition
            const wrapper = document.createElement('div');
            wrapper.className = "max-w-4xl mx-auto px-6 text-center transition-opacity duration-1000 opacity-0";
            wrapper.innerHTML = `
                <p class="text-lg md:text-xl italic text-gray-300 mb-2 font-serif">${q.text}</p>
                <div class="flex items-center justify-center gap-2 text-sm">
                    <span class="font-bold text-q2-gold">${q.author}</span>
                    <span class="text-gray-600">•</span>
                    <span class="text-gray-500 font-mono text-xs uppercase">${q.instrument}</span>
                </div>
            `;

            container.innerHTML = ''; // Clear previous
            container.appendChild(wrapper);

            // Force reflow
            void wrapper.offsetWidth;

            // Fade in
            wrapper.classList.remove('opacity-0');
        }

        index = (index + 1) % quotes.length;
    }

    renderQuote(); // Initial render
    setInterval(renderQuote, 6000); // Rotate every 6 seconds
});
