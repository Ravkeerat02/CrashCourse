import { useEffect, useState } from 'react';
import supabase from './supabase';
import ReactAudioPlayer from 'react-audio-player';
// import BackgroundMusic from './BackgroundMusic';
import './style.css';

/* Issue - Settings werent correct in the supabaase
  Fix - changing the current settings to the correct ones

  Code works as usual
  Things to fdo
  - Adding a react counter 
*/
function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);

      let query = supabase.from('facts').select('*');

      if (currentCategory !== 'all')
        query = query.eq('category', currentCategory);

      try {
        const { data: facts, error } = await query
          .order('votesInteresting', { ascending: false })
          .limit(1000);

        if (!error) {
          setFacts(facts);
          console.log(facts); // Display the fetched facts in the console
        } else {
          alert('There was a problem getting data');
        }
      } catch (error) {
        alert('There was a problem getting data');
      }

      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
        {/* Backgroud mUSIC */}
    <BackgroundMusic />
    </>
  );
}

function Loader() {
  return <p className='message'>Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = 'Today I Learned';

  return (
    <header className='header'>
      <div className='logo'>
        <img src='logo.png' height='68' width='68' alt='Today I Learned Logo' />
        <h1>{appTitle}</h1>
      </div>

      <button
        className='btn-open'
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
}

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

// Function to handle form submission
async function handleSubmit(e) {
  e.preventDefault();

  // Check if data is valid
  if (text && isValidHttpUrl(source) && category && textLength <= 200) {
    setIsUploading(true);
    
    // Upload fact to Supabase and receive the new fact object
    try {
      const { data: newFact, error } = await supabase.from('facts').insert([{ text, source, category }]).select();

      if (!error) {
        setFacts((facts) => [newFact[0], ...facts]);
        setText('');
        setSource('');
        setCategory('');
        setShowForm(false);
      }
    } catch (error) {
      alert('There was a problem uploading data');
    }

    setIsUploading(false);
  }
}

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type='text'
        placeholder='Trustworthy source...'
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  );
}
  // CategoryFilter component
  function CategoryFilter({ setCurrentCategory }) {
    return (
      <aside>
        <ul>
          <li className='category'>
            <button
              className='btn btn-all-categories'
              onClick={() => setCurrentCategory('all')}
            >
              All
            </button>
          </li>

          {CATEGORIES.map((cat) => (
            <li key={cat.name} className='category'>
              <button
                className='btn btn-category'
                style={{ backgroundColor: cat.color }}
                onClick={() => setCurrentCategory(cat.name)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

function FactList({ facts, setFacts }) {
  if (facts.length === 0)
    return (
      <p className='message'>
        No facts for this category yet! Create the first one ✌️
      </p>
    );

  return (
    <section>
      <ul className='facts-list'>
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      {/* Dispalys the number of facts in the specific field */}
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}
// used to display the facts
function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className='fact'>
      <p>
        {isDisputed ? <span className='disputed'>[⛔️ DISPUTED]</span> : null}
        {fact.text}
        <a className='source' href={fact.source} target='_blank' rel='noreferrer'>
          (Source)
        </a>
      </p>
      <span
        className='tag'
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button
          className='btn'
          onClick={() => handleVote('votesInteresting',true)}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          className='btn'
          onClick={() => handleVote('votesMindblowing',true)}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button
          className='btn'
          onClick={() => handleVote('votesFalse',true)}
          disabled={isUpdating}
        >
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}


function BackgroundMusic() {
  const [player, /*setPlayer*/] = useState(null);
  return (
    <>
      <ReactAudioPlayer
        src="audio.mp3" // Replace with the URL of your audio file
        autoPlay
        controls
        loop
        muted={!player || player.getPlayerState() === 1 || player.getPlayerState() === 3} // Mute audio when video is playing (1: playing, 3: buffering)
      />
    </>
  );
}

export default App;