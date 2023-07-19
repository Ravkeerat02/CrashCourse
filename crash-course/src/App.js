import './style.css'
import {useState} from 'react'


const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// function Counter(){
//   // devlarative call - react will figrue out how to udpate the value
//   const [count , setCount] = useState(0)
//   return(
//   <div>
//     <span style={{fontSize: '40px'}}>{count}</span>
//     {/* using callback function and setcount to make it work propelry */}
//     <button className="btn btn-large" onClick={() => setCount((c) => c+1 ) }>+1</button>
//   </div>
//   )
// }



function App() {
  // used to display the form when 
 const [showForm , setShowForm] = useState(false) 

  return (
  <>
  {/* functionality for the header - open/close */}
    <Header showForm={showForm} setShowForm={setShowForm} />

    {showForm ? <NewFactForm /> : null }
    <main className= "main">
      <CategoryFilter />
      <FactsList />
    </main>
      
    </>
  );


}
function Header({showForm , setShowForm}) {
  const appTitle = 'Today I Learned';
  return (
    <header className="head">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="logo" />
        <h1>{appTitle}</h1>
      </div>
      <button className="btn btn-large share" onClick={() => setShowForm((show) => !show)}>
        {showForm ? 'Close' : "Share a fact"}
      </button>
    </header>
  );
}
// function NewFactForm(){
//   return (
//     <form class ="fact-form hidden">
//             <input type="text" placeholder="Share fact with world" />
//             <span>200</span>
//             <input type="text" placeholder="Trustworthy source"/>
//             <select>
//                 <option value="">Choose category</option>
//                 <option value="technology">Technology</option>
//                 <option value="society">Society</option>
//                 <option value="science">Science</option>
//                 <option value="business">Business</option>
//                 <option value="politics">Politics</option>
//                 <option value="entertainment">Entertainment</option>
//                 <option value="finance">Finance</option>
//                 <option value="others">Others</option>
//             </select>
//             <button class="btn btn-large">Post</button>
//         </form>
//   )
// }

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

function CategoryFilter() {
  return (
    <aside>
      <ul>
          <li className="category">
            <button className="btn btn-all">All</button>
          </li>
        {CATEGORIES.map((cat) => (
          <li className="category" key={cat.name}>
            <button
              className="btn category-btn"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactsList(){
  // temp
  const facts =  initialFacts
  return <section>
    <ul clasName="fact-list">{
      facts.map((fact)=>
      <Fact key={fact.id} fact={fact}/>
      )}
  </ul>
  </section>
}

function Fact({fact}){

  return( 
  <li className="fact">
  <p >{fact.text} 
      <a class="source" href={fact.source} target="_blank" rel="noreferrer">Source</a>
  </p>
  <span className="tag" 
  style={{
    backgroundColor: CATEGORIES.find((cat)=> cat.name ===fact.category).color,
  }}
  >{fact.category}</span>
  <div className="vote">
      <button>👍{fact.votesInteresting}</button> 
      <button>🤯{fact.voteMindBlowing}</button>
      <button>⛔️{fact.votesFalse}</button>
  </div>
</li>
  )
}

export default App;
