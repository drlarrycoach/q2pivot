document.addEventListener('DOMContentLoaded', () => {
    // Check if container exists, if not, do nothing (prevents errors on other pages)
    const quotesContainer = document.getElementById('virtuoso-quotes-container');
    if (!quotesContainer) return;

    // Array of quotes with highlighted text
    // Gold (#D4AF37) for "Old/Rejected" concepts
    // Teal (#0D7C8C) for "New/Embraced" concepts
    const quotes = [
        {
            text: '"In general we might say that the relations between higher mental functions once were genuine relations between people... first, <span class=\'text-gold\'>between people</span> (interpsychological) and then inside the child (intrapsychological)."',
            author: "Lev Vygotsky",
            instrument: "Violin II"
        },
        {
            text: '"Because love is an act of courage, not of <span class=\'text-gold\'>fear</span>, love is commitment to others. No matter where the oppressed are found, the act of love is commitment to their cause—the cause of <span class=\'text-teal\'>liberation</span>."',
            author: "Paulo Freire",
            instrument: "Solo Oboe"
        },
        {
            text: '"I did not invent a <span class=\'text-gold\'>method of education</span>, I simply gave some little children a <span class=\'text-teal\'>chance to live</span>."',
            author: "Maria Montessori",
            instrument: "Violin I"
        },
        {
            text: '"The <span class=\'text-teal\'>blazing one</span> is something which I reach only to the extent that I experience, and make manifest, my feeling... I try to make the building so that it carries my eternal sadness."',
            author: "Christopher Alexander",
            instrument: "Violin I"
        },
        {
            text: '"What <span class=\'text-gold\'>any person</span> in the world can learn, <span class=\'text-teal\'>almost all persons</span> can learn if provided with appropriate prior and current conditions of learning."',
            author: "Benjamin Bloom",
            instrument: "Solo Violin"
        },
        {
            text: '"In many schools today, "computer-aided instruction" means making the <span class=\'text-gold\'>computer teach the child</span>. In my vision, the <span class=\'text-teal\'>child programs the computer</span>."',
            author: "Seymour Papert",
            instrument: "Violin I"
        },
        {
            text: '"Learning is not just <span class=\'text-gold\'>acquiring skills</span>; it is <span class=\'text-teal\'>becoming a person</span>—a knower in a context where what it means to know is negotiated with respect to the regime of competence of a community."',
            author: "Lave & Wenger",
            instrument: "Violin II"
        },
        {
            text: '"We have spent too long mining our minds the way we <span class=\'text-gold\'>strip-mine</span> the earth... To survive and flourish, we must offer our children the gift of their own <span class=\'text-teal\'>wholeness</span>."',
            author: "Sir Ken Robinson",
            instrument: "Solo Trumpet"
        },
        {
            text: '"In the <span class=\'text-gold\'>fixed mindset</span>, everything is about the outcome. The <span class=\'text-teal\'>growth mindset</span> allows people to value what they’re doing regardless of the outcome."',
            author: "Carol Dweck",
            instrument: "Solo Recorder"
        },
        {
            text: '"Since we have barely started <span class=\'text-gold\'>subordinating teaching</span> to <span class=\'text-teal\'>learning</span>... we can look forward to a fertile period... that will bring to each inhabitant of the earth the benefits of being thoroughly human."',
            author: "Caleb Gattegno",
            instrument: "Viola"
        },
        {
            text: '"We are captives of our own <span class=\'text-gold\'>cultural programming</span>... The great gift is an opportunity to achieve <span class=\'text-teal\'>awareness</span>."',
            author: "Edward T. Hall",
            instrument: "Viola"
        },
        {
            text: '"Passive leisure often leads to <span class=\'text-gold\'>psychic entropy</span>... True meaning comes from <span class=\'text-teal\'>psychic negentropy</span> (flow)."',
            author: "Mihaly Csikszentmihalyi",
            instrument: "Harpsichord"
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
