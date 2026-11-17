import { useCallback, useEffect, useRef, useState } from 'react';

const photos = [
  { src: '/1b9366f9-deeb-488a-88d7-4f071e484b77.jpeg', caption: 'main character energy' },
  { src: '/1e374884-ebb0-4fd9-9b04-ef6d977feeb0.jpeg', caption: 'a whole mood' },
  { src: '/2a9f8158-810c-466d-9cc6-edea4972f0e5.jpeg', caption: 'pretty in purple' },
  { src: '/3929da7f-ad4c-4499-85ab-65a8cf298099.jpeg', caption: 'soft-focus superstar' },
  { src: '/452bf0f4-3d79-4425-b976-50282e074420.jpeg', caption: 'just being iconic' },
  { src: '/5762c2dd-dd03-4a79-9b52-2a2402fd8ef2.jpeg', caption: 'favorite little moment' },
  { src: '/63f6d362-4bc1-4597-9be3-45ae100cf356.jpeg', caption: 'certified cutie' },
  { src: '/6e058cf3-ae69-42d4-850e-c5202783752a.jpeg', caption: 'the camera loves you' },
  { src: '/7987df5d-3a78-4494-9c8e-6d25638917b1.jpeg', caption: 'one for the scrapbook' },
  { src: '/85bf69a9-5646-4638-9217-9edd3016e011.jpeg', caption: 'no notes, just wow' },
  { src: '/8daa82ee-552a-4ce4-94ff-4ce183a020a6.jpeg', caption: 'a little bit of magic' },
  { src: '/ec62608f-a02d-4486-8558-2ab3e27af34c.jpeg', caption: 'too cute for the timeline' },
  { src: '/fe9b2891-e1df-470c-aa97-d03c41f6684d.jpeg', caption: 'the one and only Madhu' },
];

const secretNames = new Set(['rohan', 'suprit']);
const jarNotes = [
  'You make ordinary days feel a little bit magical. ✨',
  'In case you forgot today: you are very, very lovely. ♡',
  'Your smile deserves its own fan club. (This is the fan club.)',
  'Somehow, the world got cuter when you showed up. ✿',
  'You deserve the same kindness you give everyone else.',
  'Friendly reminder: being you is already more than enough.',
  'You are somebody’s favorite plot twist. 💌',
  'If today is a little wobbly, you can try again tomorrow. I believe in you.',
  'Your laugh is absolutely one of my favorite sounds.',
  'Sending you one tiny pocket-sized hug. Keep it with you. ♡',
  'You have a talent for making people feel at home.',
  'Breaking news: you are still a total cutie.',
];
const dateIdeas = [
  'Sunset walk + a snack mission. The snack is non-negotiable. 🌇',
  'Pick a movie neither of you has seen and make dramatic reviews afterward. 🎬',
  'Choose a new recipe and be each other’s extremely enthusiastic sous-chefs. 🍓',
  'Build a shared playlist, then take turns explaining each song. ♫',
  'Get your favorite drinks and go on a tiny photo walk. 📸',
  'Have a cozy café date: one drink, one treat, unlimited conversation. ☕',
  'Take turns picking silly questions and see where the conversation goes. 💬',
  'Plan a no-rush picnic with snacks you already love. 🧺',
  'Explore a bookstore or market and pick a little surprise for each other. ✿',
  'Have a stay-in date: comfy clothes, favorite food, and absolutely no rush. ♡',
];
const pookieNotes = [
  'Pookie spotted a cutie exploring! That must be you. ♡',
  'Official Pookie report: you make this place extra sparkly. ✨',
  'Tiny reminder from Pookie: you are so easy to adore.',
  'Pookie is keeping a teeny-tiny secret safe. 💌',
  'Pookie says: take a breath, get comfy, and stay a while.',
  'You found Pookie! Your reward is this extremely important hug. ♡',
  'Breaking news from Pookie: Madhu is still the main character.',
  'Pookie thinks you deserve a little treat today. Just saying. ✿',
];
const trackPath = "/OFFICIAL_%20%27Lovely%27%20FULL%20VIDEO%20Song%20_%20Shah%20Rukh%20Khan%20_%20Deepika%20Padukone_Kanika%20Kapoor_%20Happy%20New%20Year%20%5BHT7g_9eNnYk%5D.mp3";
const suppliedTrack = {
  src: trackPath,
  name: 'Lovely — Kanika Kapoor',
};
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
];

function pickDifferentMessage(messages, previousMessage) {
  const choices = messages.filter((message) => message !== previousMessage);
  return choices[Math.floor(Math.random() * choices.length)];
}

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState('');
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterUnlocked, setLetterUnlocked] = useState(false);
  const [nameGuess, setNameGuess] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [partyMode, setPartyMode] = useState(false);
  const [easterEggMessage, setEasterEggMessage] = useState('');
  const [visitorCount, setVisitorCount] = useState(1);
  const [jarNote, setJarNote] = useState('');
  const [dateIdea, setDateIdea] = useState('');
  const [pookieMessage, setPookieMessage] = useState('');
  const [galleryRevealed, setGalleryRevealed] = useState(false);
  const [mascotHappy, setMascotHappy] = useState(false);
  const letterDialog = useRef(null);
  const photoDialog = useRef(null);
  const audioRef = useRef(null);
  const mascotRef = useRef(null);
  const galleryRef = useRef(null);
  const deckRef = useRef(null);
  const pointerPaused = useRef(false);
  const pointerInsideMascot = useRef(false);
  const previousJarNote = useRef('');
  const previousDateIdea = useRef('');
  const previousPookieMessage = useRef('');
  const visitedSections = useRef(new Set());
  const pookieTimer = useRef(null);
  const mascotHappyTimer = useRef(null);
  const mascotTapTimer = useRef(null);
  const mascotTapCount = useRef(0);
  const titleClicks = useRef(0);
  const wordmarkClicks = useRef(0);
  const easterEggTimer = useRef(null);
  const keySequence = useRef([]);
  const typedSequence = useRef('');
  const nameInput = useRef(null);

  const makeMascotHappy = () => {
    setMascotHappy(true);
    window.clearTimeout(mascotHappyTimer.current);
    mascotHappyTimer.current = window.setTimeout(() => setMascotHappy(false), 1200);
  };

  const showPookieMessage = (message) => {
    const note = message || pickDifferentMessage(pookieNotes, previousPookieMessage.current);
    previousPookieMessage.current = note;
    pointerPaused.current = true;
    if (mascotRef.current) {
      mascotRef.current.style.transform = '';
      mascotRef.current.classList.remove('is-following');
    }
    setPookieMessage(note);
    window.clearTimeout(pookieTimer.current);
    pookieTimer.current = window.setTimeout(() => {
      setPookieMessage('');
      pointerPaused.current = pointerInsideMascot.current;
    }, 6500);
  };

  const dismissPookieMessage = () => {
    window.clearTimeout(pookieTimer.current);
    setPookieMessage('');
    pointerPaused.current = pointerInsideMascot.current;
  };

  const handleMascotTap = () => {
    makeMascotHappy();
    mascotTapCount.current += 1;
    window.clearTimeout(mascotTapTimer.current);

    if (mascotTapCount.current >= 5) {
      mascotTapCount.current = 0;
      window.clearTimeout(pookieTimer.current);
      setPookieMessage('');
      pointerPaused.current = true;
      setLetterOpen(true);
      return;
    }

    if (mascotTapCount.current === 3) {
      showPookieMessage('Psst... Pookie might be guarding a little secret. Try a few more taps. 💌');
    } else {
      showPookieMessage();
    }

    mascotTapTimer.current = window.setTimeout(() => {
      mascotTapCount.current = 0;
    }, 3500);
  };

  const pickJarNote = () => {
    const message = pickDifferentMessage(jarNotes, previousJarNote.current);
    previousJarNote.current = message;
    setJarNote(message);
  };

  const pickDateIdea = () => {
    const idea = pickDifferentMessage(dateIdeas, previousDateIdea.current);
    previousDateIdea.current = idea;
    setDateIdea(idea);
  };

  const showEasterEgg = useCallback((message) => {
    setEasterEggMessage(message);
    window.clearTimeout(easterEggTimer.current);
    easterEggTimer.current = window.setTimeout(() => setEasterEggMessage(''), 5500);
  }, [letterOpen, pookieMessage]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setMusicError('');
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setMusicError('The song could not start. Try pressing play again.');
      }
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    if (letterOpen && !letterDialog.current?.open) {
      letterDialog.current?.showModal();
      if (!letterUnlocked) nameInput.current?.focus();
    } else if (!letterOpen && letterDialog.current?.open) {
      letterDialog.current.close();
    }
  }, [letterOpen]);

  useEffect(() => {
    if (selectedPhoto !== null && !photoDialog.current?.open) {
      photoDialog.current?.showModal();
    } else if (selectedPhoto === null && photoDialog.current?.open) {
      photoDialog.current.close();
    }
  }, [selectedPhoto]);

  useEffect(() => {
    const sections = document.querySelectorAll('.intro-card, #gallery, #mixtape, #message-jar, #date-ideas');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || visitedSections.current.has(entry.target)) return;
        visitedSections.current.add(entry.target);
        if (entry.target.id === 'gallery') setGalleryRevealed(true);
        showPookieMessage();
      });
    }, { threshold: 0.35 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!galleryRevealed || !galleryRef.current || !deckRef.current) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const deckBounds = deckRef.current.getBoundingClientRect();
    const deckX = deckBounds.left + deckBounds.width / 2;
    const deckY = deckBounds.top + deckBounds.height / 2;
    const cards = [...galleryRef.current.querySelectorAll('.photo-card')];
    const animations = cards.map((card, index) => {
      const bounds = card.getBoundingClientRect();
      const rotation = getComputedStyle(card).getPropertyValue('--card-rotation').trim() || '0deg';
      const animation = card.animate(
        [
          {
            transform: `translate(${deckX - (bounds.left + bounds.width / 2)}px, ${deckY - (bounds.top + bounds.height / 2)}px) scale(.32) rotate(${rotation})`,
            opacity: 0,
          },
          { transform: `rotate(${rotation})`, opacity: 1 },
        ],
        {
          duration: 850,
          delay: index * 75,
          easing: 'cubic-bezier(.16, 1, .3, 1)',
          fill: 'both',
        },
      );
      animation.onfinish = () => animation.cancel();
      return animation;
    });

    return () => animations.forEach((animation) => animation.cancel());
  }, [galleryRevealed]);

  useEffect(() => {
    const moveMascot = (event) => {
      if (
        event.pointerType !== 'mouse'
        || pointerPaused.current
        || pookieMessage
        || letterOpen
        || !mascotRef.current
      ) return;
      const { offsetWidth: width, offsetHeight: height } = mascotRef.current;
      const mascotButton = mascotRef.current.querySelector('.mascot');
      const x = Math.max(8, Math.min(event.clientX - width / 2 - 24, window.innerWidth - width - 8));
      const y = Math.max(8, Math.min(event.clientY - height / 2 - 12, window.innerHeight - height - 8));
      mascotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      mascotRef.current.classList.add('is-following');
      if (mascotButton) {
        const bounds = mascotButton.getBoundingClientRect();
        const lookX = Math.max(-2.5, Math.min(2.5, ((event.clientX - bounds.left) / bounds.width - 0.5) * 5));
        const lookY = Math.max(-2, Math.min(2, ((event.clientY - bounds.top) / bounds.height - 0.5) * 4));
        mascotButton.style.setProperty('--look-x', `${lookX}px`);
        mascotButton.style.setProperty('--look-y', `${lookY}px`);
      }
    };

    window.addEventListener('pointermove', moveMascot);
    return () => window.removeEventListener('pointermove', moveMascot);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (
        event.target instanceof HTMLInputElement
        || event.target instanceof HTMLTextAreaElement
        || (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) return;

      if (/^[a-z]$/i.test(event.key)) {
        typedSequence.current = `${typedSequence.current}${event.key.toLowerCase()}`.slice(-5);
        if (typedSequence.current === 'madhu') {
          showEasterEgg('Secret unlocked: this whole little world has one very special main character. ♡');
          typedSequence.current = '';
        }
      } else {
        typedSequence.current = '';
      }

      keySequence.current = [...keySequence.current, event.key].slice(-konamiCode.length);
      if (keySequence.current.join('|') === konamiCode.join('|')) {
        setPartyMode(true);
        window.setTimeout(() => setPartyMode(false), 4000);
        showEasterEgg('You found the retro cheat code! Pookie says: legendary move. ✨');
        keySequence.current = [];
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showEasterEgg]);

  useEffect(() => () => {
    window.clearTimeout(pookieTimer.current);
    window.clearTimeout(mascotTapTimer.current);
    window.clearTimeout(mascotHappyTimer.current);
    window.clearTimeout(easterEggTimer.current);
  }, []);

  const closeLetter = () => {
    pointerPaused.current = false;
    setLetterOpen(false);
  };

  const checkName = (event) => {
    event.preventDefault();
    if (secretNames.has(nameGuess.trim().toLowerCase())) {
      setLetterUnlocked(true);
      setNameError('');
      setNameGuess('');
    } else {
      setNameError('Hmm, that is not the secret name. Try the name of the person who made this little world ✨');
    }
  };

  const closePhoto = () => setSelectedPhoto(null);

  return (
    <div className={partyMode ? 'site party-mode' : 'site'} id="top">
      <div className="top-strip" aria-label="Site status">
        <span>✿ MADHU'S LITTLE CORNER OF THE INTERNET ✿</span>
        <span className="online"><i /> ONLINE & THINKING OF YOU</span>
      </div>

      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label="A Little World Called Madhu home"
          onClick={() => {
            wordmarkClicks.current += 1;
            if (wordmarkClicks.current >= 5) {
              showEasterEgg('You found the secret fan club. Membership: you, me, and Pookie. ♡');
              wordmarkClicks.current = 0;
            }
          }}
        >
          <span className="wordmark-star">✳</span> m♡dhu.exe
        </a>
        <nav aria-label="Main navigation">
          <a href="#gallery">the scrapbook</a>
          <a href="#mixtape">our mixtape</a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-sticker sticker-top">100%<br />cutie</div>
          <div className="hero-copy">
            <p className="eyebrow"><span>✦</span> YOU HAVE ENTERED A VERY SPECIAL PLACE <span>✦</span></p>
            <h1 id="hero-title">A Little World<br />Called <span>Madhu</span><b>♡</b></h1>
            <p className="hero-intro">A tiny corner of the internet for one very<br className="desktop-break" /> lovely human. (Yes, you.)</p>
            <a className="button button-pink" href="#gallery">come on in <span>↓</span></a>
            <p className="hero-microcopy">best viewed with a little daydreaming</p>
          </div>
          <div className="hero-art" aria-label="A little snapshot of Madhu">
            <div className="hero-sparkle sparkle-one">✦</div>
            <div className="hero-sparkle sparkle-two">♡</div>
            <div className="hero-photo">
              <img src={photos[0].src} alt="Madhu, the star of this little world" />
              <span className="photo-label">THE ORIGINAL ANGEL ✧</span>
            </div>
            <div className="hero-sticker sticker-bottom">ur<br />a star!</div>
          </div>
          <div className="hero-scribble" aria-hidden="true">♡</div>
        </section>

        <div className="ticker" aria-label="A little reminder">
          <div className="ticker-track">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>MADE WITH A SILLY AMOUNT OF AFFECTION <b>♥</b> MADHU FAN CLUB PRESIDENT: ME <b>♥</b> YOU MAKE THE INTERNET CUTER <b>♥</b>&nbsp;</span>
            ))}
          </div>
        </div>

        <section className="intro-card">
          <div className="intro-icon" aria-hidden="true">♡</div>
          <div>
            <p className="eyebrow">A NOTE FROM YOUR INTERNET BESTIE</p>
            <h2>Some people just make<br className="desktop-break" /> everything a little brighter.</h2>
            <p>This little webpage is a pocket-sized reminder that you are pretty wonderful, Madhu. Click around, stay awhile, and take a tiny piece of happy with you.</p>
          </div>
          <span className="intro-doodle" aria-hidden="true">✷</span>
        </section>

        <section className="gallery-section section-wrap" id="gallery" aria-labelledby="gallery-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A VERY IMPORTANT COLLECTION</p>
              <h2 id="gallery-title">The Madhu scrapbook <span>✿</span></h2>
            </div>
            <p className="section-aside">13 little windows<br />into your world ♡</p>
          </div>
          <div className={`scrapbook-stage${galleryRevealed ? ' is-dealt' : ''}`} ref={galleryRef}>
            <div className="photo-deck" ref={deckRef} aria-hidden="true">
              <span className="deck-card deck-card-back" />
              <span className="deck-card deck-card-middle" />
              <span className="deck-card deck-card-front">13<span>♡</span></span>
              <span className="deck-label">LITTLE MEMORIES</span>
            </div>
            <div className="photo-grid">
              {photos.map((photo, index) => (
                <button
                  className={`photo-card photo-card-${(index % 4) + 1}`}
                  key={photo.src}
                  type="button"
                  onClick={() => setSelectedPhoto(index)}
                  aria-label={`Open photo ${index + 1}: ${photo.caption}`}
                >
                  <span className="photo-frame">
                    <img src={photo.src} alt={`Madhu — ${photo.caption}`} loading={index < 3 ? 'eager' : 'lazy'} />
                    <span className="photo-number">{String(index + 1).padStart(2, '0')} / 13</span>
                  </span>
                  <span className="photo-caption"><span>{photo.caption}</span><b>♡</b></span>
                </button>
              ))}
            </div>
          </div>
          <p className="gallery-footnote">13 little memories, dealt with a whole lot of love <span>✧</span></p>
        </section>

        <section className="music-section" id="mixtape" aria-labelledby="music-title">
          <div className="music-card">
            <button
              className={`cassette${musicPlaying ? ' is-playing' : ''}`}
              type="button"
              aria-label={musicPlaying ? 'Pause the looping mixtape song' : 'Play the looping mixtape song'}
              aria-pressed={musicPlaying}
              onClick={toggleMusic}
            >
              <span className="cassette-label">MADHU<br /><span>mixtape no. 01</span></span>
              <span className="cassette-reels"><i /><i /></span>
              <span className="cassette-bottom">{musicPlaying ? 'NOW PLAYING · LOOPING FOR YOU' : 'PRESS PLAY · JUST FOR YOU'}</span>
            </button>
            <div className="music-copy">
              <p className="eyebrow">PRESS PLAY ON THE FEELINGS</p>
              <h2 id="music-title">Our little mixtape</h2>
              <p>One favorite song for our little world. Press play and let it loop while you explore.</p>
              <button
                type="button"
                className="button button-dark music-section-toggle"
                onClick={toggleMusic}
                aria-pressed={musicPlaying}
              >
                <span aria-hidden="true">{musicPlaying ? 'Ⅱ' : '▶'}</span>
                {musicPlaying ? 'pause our song' : 'play our song'}
                <span>♫</span>
              </button>
            </div>
            <span className="music-heart" aria-hidden="true">♥</span>
          </div>
        </section>

        <section className="message-jar-section section-wrap" id="message-jar" aria-labelledby="message-jar-title">
          <div className="message-jar-card">
            <div className="jar-illustration" aria-hidden="true">
              <span className="jar-lid" />
              <div className="jar-glass">
                <span>♥</span><span>✿</span><span>♥</span><span>✧</span><span>♥</span>
                <span className="jar-label">OPEN WHEN<br />YOU NEED A SMILE</span>
              </div>
              <span className="jar-sparkle jar-sparkle-one">✦</span>
              <span className="jar-sparkle jar-sparkle-two">♡</span>
            </div>
            <div className="message-jar-copy">
              <p className="eyebrow">A LITTLE PICK-ME-UP, ON DEMAND</p>
              <h2 id="message-jar-title">The happy-thought jar</h2>
              <p>Pick a tiny note whenever you need a smile. Pookie filled this jar up with them just for you.</p>
              <button className="button button-pink" type="button" onClick={pickJarNote}>
                pick a little note <span>✧</span>
              </button>
              <p className={`jar-note${jarNote ? ' has-note' : ''}`} aria-live="polite" aria-atomic="true">
                {jarNote || 'your next little happy is waiting right here ♡'}
              </p>
            </div>
          </div>
        </section>

        <section className="date-ideas section-wrap" id="date-ideas" aria-labelledby="date-ideas-title">
          <div className="date-ideas-card">
            <span className="date-ideas-deco" aria-hidden="true">♡</span>
            <p className="eyebrow">A TINY PLAN FOR TWO</p>
            <h2 id="date-ideas-title">The next-date generator</h2>
            <p>Need a little inspiration? Pookie's got a sweet idea for your next hangout.</p>
            <button type="button" className="button button-dark" onClick={pickDateIdea}>
              {dateIdea ? 'give us another idea' : 'surprise us'} <span>✧</span>
            </button>
            <p className={`date-idea${dateIdea ? ' has-idea' : ''}`} aria-live="polite" aria-atomic="true">
              {dateIdea || 'your next little adventure is one click away ♡'}
            </p>
          </div>
        </section>

        <section className="tiny-love section-wrap" aria-label="A tiny compliment">
          <span className="tiny-love-star" aria-hidden="true">✷</span>
          <p>official internet fact: <strong>Madhu is ridiculously easy to adore.</strong></p>
          <button type="button" onClick={() => setVisitorCount((count) => count + 1)}>
            visitors who agree: {visitorCount.toString().padStart(3, '0')} <span>↗</span>
          </button>
        </section>

      </main>

      <footer className="site-footer">
        <a href="#top" className="footer-wordmark">m♡dhu.exe</a>
        <p>made on the internet, with extra love <span>♥</span></p>
        <button
          type="button"
          className="easter-egg"
          onClick={() => {
            titleClicks.current += 1;
            if (titleClicks.current >= 5) {
              showEasterEgg("You found a secret: you're someone's favorite notification. ♡");
              titleClicks.current = 0;
            }
          }}
          aria-label="A tiny hidden surprise"
        >✿</button>
      </footer>
      {easterEggMessage && <p className="easter-message" role="status" aria-live="polite">{easterEggMessage}</p>}

      <audio
        className="background-audio"
        ref={audioRef}
        src={trackPath}
        loop
        preload="none"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onError={() => {
          setMusicPlaying(false);
          setMusicError('The song could not load. Check the MP3 file and try again.');
        }}
      />
      <aside className={`music-dock${musicPlaying ? ' is-playing' : ''}`} aria-label="Background music player">
        <button
          type="button"
          className="music-dock-toggle"
          onClick={toggleMusic}
          aria-label={musicPlaying ? 'Pause song' : 'Play song'}
          aria-pressed={musicPlaying}
        >
          <span aria-hidden="true">{musicPlaying ? 'Ⅱ' : '▶'}</span>
        </button>
        <div className="music-dock-info">
          <span className="music-dock-title">{suppliedTrack.name}</span>
          <span className="music-dock-status">{musicError || (musicPlaying ? 'playing on repeat' : 'tap to play · loops forever')}</span>
        </div>
        <span className="music-equalizer" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </span>
        <span className="music-loop" aria-label="Repeat enabled">↻</span>
      </aside>

      <div
        className={`mascot-wrap${pookieMessage ? ' has-message' : ''}`}
        ref={mascotRef}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') {
            pointerInsideMascot.current = true;
            pointerPaused.current = true;
            makeMascotHappy();
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') {
            pointerInsideMascot.current = false;
            if (!pookieMessage && !letterOpen) pointerPaused.current = false;
          }
        }}
      >
        <button
          type="button"
          className={`mascot${mascotHappy ? ' is-happy' : ''}`}
          onClick={handleMascotTap}
          aria-label="Pookie the mascot. Tap for a sweet message and a hidden surprise"
          title="Pookie has a little secret tucked away..."
        >
          <span className="mascot-sparkle" aria-hidden="true">✦</span>
          <span className="mascot-face" aria-hidden="true">
            <span className="mascot-eye-row">
              <i className="mascot-eye"><b /></i>
              <i className="mascot-eye"><b /></i>
            </span>
            <span className="mascot-blush"><i /><i /></span>
            <span className="mascot-mouth" />
          </span>
          <span className="mascot-label">pookie!</span>
        </button>
        {pookieMessage && (
          <div className="mascot-bubble">
            <span className="mascot-note-title">POOKIE'S LITTLE NOTE</span>
            <button type="button" className="bubble-close" onClick={dismissPookieMessage} aria-label="Dismiss Pookie's message">×</button>
            <p role="status" aria-live="polite">{pookieMessage}</p>
          </div>
        )}
      </div>

      <dialog
        className="letter-dialog"
        ref={letterDialog}
        onClose={() => {
          pointerPaused.current = false;
          setLetterOpen(false);
        }}
        onClick={(event) => { if (event.target === letterDialog.current) closeLetter(); }}
        aria-labelledby="letter-heading"
      >
        <button className="dialog-close" type="button" onClick={closeLetter} aria-label="Close letter">×</button>
        {!letterUnlocked ? (
          <div className="letter-content">
            <span className="letter-icon" aria-hidden="true">💌</span>
            <p className="eyebrow">POOKIE'S SECRET MAIL</p>
            <h2 id="letter-heading">Only the right person<br />can open this one...</h2>
            <p>Tell me the name of the person who made this little world for you.</p>
            <form onSubmit={checkName}>
              <label htmlFor="secret-name">Their name</label>
              <input
                id="secret-name"
                ref={nameInput}
                value={nameGuess}
                onChange={(event) => { setNameGuess(event.target.value); setNameError(''); }}
                autoComplete="off"
                required
                placeholder="type a name..."
              />
              {nameError && <p className="form-error" role="alert">{nameError}</p>}
              <button className="button button-pink" type="submit">open my letter <span>♡</span></button>
            </form>
            <p className="hint">You found Pookie's hidden letter. The secret name is the key. ♡</p>
          </div>
        ) : (
          <div className="letter-content letter-revealed">
            <span className="letter-icon" aria-hidden="true">💌</span>
            <p className="eyebrow">A LITTLE LETTER, JUST FOR YOU</p>
            <h2 id="letter-heading">Dear Madhu,</h2>
            <p className="letter-body">If this tiny corner of the internet made you smile even a little, then it did exactly what it was made to do. You bring a lovely kind of magic wherever you go, and I hope you never forget how special you are. Keep being your wonderful self, okay?</p>
            <p className="letter-signoff">With a little extra affection,<br /><strong>Rohan / Suprit ♡</strong></p>
            <button className="button button-dark" type="button" onClick={closeLetter}>keep this feeling <span>✧</span></button>
          </div>
        )}
      </dialog>

      <dialog
        className="photo-dialog"
        ref={photoDialog}
        onClose={closePhoto}
        onClick={(event) => { if (event.target === photoDialog.current) closePhoto(); }}
        aria-label="Photo viewer"
      >
        <button className="dialog-close" type="button" onClick={closePhoto} aria-label="Close photo">×</button>
        {selectedPhoto !== null && (
          <figure>
            <img src={photos[selectedPhoto].src} alt={`Madhu — ${photos[selectedPhoto].caption}`} />
            <figcaption>{photos[selectedPhoto].caption} <span>♡</span></figcaption>
          </figure>
        )}
      </dialog>
    </div>
  );
}

export default App;
