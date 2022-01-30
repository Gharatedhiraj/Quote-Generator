const quoteContainer=document.getElementById("qoute-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById("loader");
let colors=["#ff0000","#ffa500","#008000","#0000ff","#4b0082","#000000","#290025"];

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

// Get Quote from API
let apiQuotes=[];
async function getQuote(){
    showLoadingSpinner();
    const apiUrl="https://type.fit/api/quotes"
    try{
        const respons=await fetch(apiUrl);
        apiQuotes=await respons.json();
        // pick random Quote from apiQuote array
        const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
        quoteText.style.color=colors[Math.floor(Math.random() * colors.length)];
        // Check if author feild is blank and replace it with "Unknown"
        if(!quote.author){
            authorText.textContent="Unknown";
        }else{
            
            authorText.textContent=quote.author;
        }
        // check Quote lenght to determaine styling
        if(quote.text.length > 120){
            quoteText.classList.add("long-quote");
        }
        else{
            quoteText.classList.remove("long-quote");
        }
        quoteText.textContent=quote.text;
        removeLoadingSpinner();
    } 
    catch(error){
        // catch error here
        console.log("whoops,no quote",error);
    }
}

function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,"_blank");
}
// Event Listener 
newQuoteBtn.addEventListener("click",getQuote);
twitterBtn.addEventListener("click",tweetQuote);

// On load
getQuote();


