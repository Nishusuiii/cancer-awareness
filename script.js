
async function loadQuote() {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    quoteText.innerHTML = "“Loading quote...”";
    quoteAuthor.innerHTML = "—";

    try {
       
        const res = await fetch("https://api.quotable.io/random");

        if (!res.ok) throw new Error("Quotable API failed");

        const data = await res.json();

        quoteText.innerHTML = `“${data.content}”`;
        quoteAuthor.innerHTML = `— ${data.author}`;
    } 
    catch (error) {
        console.warn("Quotable API failed, switching to backup!", error);

        try {
            const res2 = await fetch("https://zenquotes.io/api/random");

            const data2 = await res2.json();

            quoteText.innerHTML = `“${data2[0].q}”`;
            quoteAuthor.innerHTML = `— ${data2[0].a}`;
        } 
        catch (err2) {
            console.error("Both APIs failed!", err2);
            quoteText.innerHTML = "Couldn't load quote 😢";
            quoteAuthor.innerHTML = "";
        }
    }
}

window.onload = loadQuote;
