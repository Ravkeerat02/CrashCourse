
const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];

  
const btn = document.querySelector('.share')
const form = document.querySelector('.fact-form')
const factsList = document.querySelector(".fact-list");

// RENDERS LIST
factsList.innerHTML = "";

loadFacts()


async function loadFacts() {
    const res = await fetch(
      "https://svdgwdpazhzewzbpabnb.supabase.co/rest/v1/fact",
      {
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZGd3ZHBhemh6ZXd6YnBhYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NjE3NTMsImV4cCI6MjAwNTIzNzc1M30.SbgCOwdigN5NwGiY1ZnBzKR9vlXSzCC1Cpqf50iwI2g", // Replace with your Supabase API key
          authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZGd3ZHBhemh6ZXd6YnBhYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NjE3NTMsImV4cCI6MjAwNTIzNzc1M30.SbgCOwdigN5NwGiY1ZnBzKR9vlXSzCC1Cpqf50iwI2g", // Replace with your Supabase Auth token
        },
      }
    );
    const data = await res.json();
    createFactsList(data);
  }

  function createFactsList(dataArray) {
    const htmlArr = dataArray.map(
      (fact) => `<li class="fact">
      <p>
      ${fact.text}
        <a
          class="source"
          href="${fact.source}"
          target="_blank"
        >(Source)</a>
      </p>
      <span class="tag" style="background-color: ${
        CATEGORIES.find((cat) => cat.name === fact.category).color
      }">${fact.category}</span>
    </li>`
    );
    const html = htmlArr.join("");
    factsList.insertAdjacentHTML("afterbegin", html);
  }

  // filter - returns new array 

  // find - returns the 1st value


btn.addEventListener('click', () => {
    if(form.classList.contains('hidden')){
        form.classList.remove('hidden')
        btn.textContent = "Close..."    
    }else{
        form.classList.add('hidden')
    }
})



