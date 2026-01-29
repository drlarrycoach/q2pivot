document.addEventListener('DOMContentLoaded', () => {
    const quotesContainer = document.getElementById('virtuoso-quotes-container');
    if (!quotesContainer) return;

    const quotes = [
        {
            text: '"We must judge the value of any educational system... only on the ground of <span class=\'text-primary glow-teal\'>what it moves toward and into</span>."',
            author: "John Dewey",
            instrument: "The Democratic Philosopher"
        },
        {
            text: '"I did not invent a <span class=\'text-secondary glow-gold\'>method of education</span>, I simply gave some little children a <span class=\'text-primary glow-teal\'>chance to live</span>."',
            author: "Maria Montessori",
            instrument: "Violin I"
        },
        {
            text: '"In general we might say that the relations between higher mental functions once were genuine relations between people... first, <span class=\'text-primary glow-teal\'>between people</span> (interpsychological) and then inside the child (intrapsychological)."',
            author: "Lev Vygotsky",
            instrument: "Violin II"
        },
        {
            text: '"Only <span class=\'text-primary glow-teal\'>awareness</span> is educable. ... Teaching is subordinated to <span class=\'text-primary glow-teal\'>learning</span>."',
            author: "Caleb Gattegno",
            instrument: "Viola"
        },
        {
            text: '"What <span class=\'text-secondary glow-gold\'>any person</span> in the world can learn, <span class=\'text-primary glow-teal\'>almost all persons</span> can learn if provided with appropriate prior and current conditions of learning."',
            author: "Benjamin Bloom",
            instrument: "Solo Violin"
        },
        {
            text: '"The new mission of education is to develop a <span class=\'text-primary glow-teal\'>total environment conducive to human growth</span> and self-actualization to create an educative society."',
            author: "Malcolm Knowles",
            instrument: "The Autonomy Architect"
        },
        {
            text: '"We are captives of our own <span class=\'text-secondary glow-gold\'>cultural programming</span>... The great gift is an opportunity to achieve <span class=\'text-primary glow-teal\'>awareness</span>."',
            author: "Edward T. Hall",
            instrument: "Viola"
        },
        {
            text: '"Any subject can be taught effectively in some <span class=\'text-primary glow-teal\'>intellectually honest form</span> to any child at any stage of development."',
            author: "Jerome Bruner",
            instrument: "The Narrative Architect"
        },
        {
            text: '"Because love is an act of courage, not of <span class=\'text-secondary glow-gold\'>fear</span>, love is commitment to others. No matter where the oppressed are found, the act of love is commitment to their cause—the cause of <span class=\'text-primary glow-teal\'>liberation</span>."',
            author: "Paulo Freire",
            instrument: "Solo Oboe"
        },
        {
            text: '"In many schools today, "computer-aided instruction" means making the <span class=\'text-secondary glow-gold\'>computer teach the child</span>. In my vision, the <span class=\'text-primary glow-teal\'>child programs the computer</span>."',
            author: "Seymour Papert",
            instrument: "Violin I"
        },
        {
            text: '"Passive leisure often leads to <span class=\'text-secondary glow-gold\'>psychic entropy</span>... True meaning comes from <span class=\'text-primary glow-teal\'>psychic negentropy</span> (flow)."',
            author: "Mihaly Csikszentmihalyi",
            instrument: "Harpsichord"
        },
        {
            text: '"The <span class=\'text-primary glow-teal\'>blazing one</span> is something which I reach only to the extent that I experience, and make manifest, my feeling... I try to make the building so that it carries my eternal sadness."',
            author: "Christopher Alexander",
            instrument: "Violin I"
        },
        {
            text: '"Learning is not just <span class=\'text-secondary glow-gold\'>acquiring skills</span>; it is <span class=\'text-primary glow-teal\'>becoming a person</span>—a knower in a context where what it means to know is negotiated with respect to the regime of competence of a community."',
            author: "Lave & Wenger",
            instrument: "Violin II"
        },
        {
            text: '"In the <span class=\'text-secondary glow-gold\'>fixed mindset</span>, everything is about the outcome. The <span class=\'text-primary glow-teal\'>growth mindset</span> allows people to value what they’re doing regardless of the outcome."',
            author: "Carol Dweck",
            instrument: "Solo Recorder"
        },
        {
            text: '"We have spent too long mining our minds the way we <span class=\'text-secondary glow-gold\'>strip-mine</span> the earth... To survive and flourish, we must offer our children the gift of their own <span class=\'text-primary glow-teal\'>wholeness</span>."',
            author: "Sir Ken Robinson",
            instrument: "Solo Trumpet"
        }
    ];

    let currentIndex = 0;

    // Create DOM elements
    const quoteText = document.createElement('p');
    quoteText.className = 'virtuoso-quote-text';

    const quoteAuthor = document.createElement('div');
    quoteAuthor.className = 'virtuoso-quote-author';

    quotesContainer.appendChild(quoteText);
    quotesContainer.appendChild(quoteAuthor);

    function showQuote(index) {
        const quote = quotes[index];

        // Fade out
        quotesContainer.style.opacity = '0';

        setTimeout(() => {
            // Update content
            quoteText.innerHTML = quote.text;
            quoteAuthor.innerHTML = `<span class="author-name">${quote.author}</span> <span class="instrument-badge">${quote.instrument}</span>`;

            // Fade in
            quotesContainer.style.opacity = '1';
        }, 500);
    }

    // Initial show
    showQuote(currentIndex);

    // Rotate every 10 seconds (time to read)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % quotes.length;
        showQuote(currentIndex);
    }, 10000);
});
