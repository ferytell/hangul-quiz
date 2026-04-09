import { useState, useEffect, useRef, useCallback } from "react";
import {
  consonants,
  vowels,
  //syllables,
  groupLabels,
  fonts,
  ALL_GROUPS,
} from "./hangulData";
import { generateSyllableData } from "./hangulGenerator";
import "./App.css";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const syllables = generateSyllableData(consonants, vowels);

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("hq-theme") || "dark",
  );
  const [activeFont, setActiveFont] = useState(
    () => localStorage.getItem("hq-font") || "default",
  );

  const [enabledConsGroups, setEnabledConsGroups] = useState(() => {
    const s = localStorage.getItem("hq-consGroups");
    return s ? JSON.parse(s) : ["basic-consonants"];
  });
  const [enabledVowGroups, setEnabledVowGroups] = useState(() => {
    const s = localStorage.getItem("hq-vowGroups");
    return s
      ? JSON.parse(s)
      : ["basic-vowels-vertical", "basic-vowels-horizontal"];
  });

  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [wrongAnswer, setWrongAnswer] = useState("");
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() =>
    parseInt(localStorage.getItem("hq-bestStreak") || "0"),
  );
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [learningMode, setLearningMode] = useState("characters");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [enabledSylGroups, setEnabledSylGroups] = useState(() => {
    const s = localStorage.getItem("hq-sylGroups");
    return s ? JSON.parse(s) : ["cv-ㄱ", "cv-ㄴ", "cv-ㄷ"];
  });

  const inputRef = useRef(null);

  const getPool = useCallback(() => {
    const pool = [];

    if (learningMode === "characters") {
      consonants.forEach((c) => {
        if (enabledConsGroups.includes(c.group)) pool.push(c);
      });
      vowels.forEach((v) => {
        if (enabledVowGroups.includes(v.group)) pool.push(v);
      });
    } else {
      syllables.forEach((s) => {
        if (enabledSylGroups.includes(s.group)) pool.push(s);
      });
    }

    return pool;
  }, [enabledConsGroups, enabledVowGroups, enabledSylGroups, learningMode]);

  // Add localStorage effect for syllable groups
  useEffect(() => {
    localStorage.setItem("hq-sylGroups", JSON.stringify(enabledSylGroups));
  }, [enabledSylGroups]);

  const nextCard = useCallback(() => {
    const pool = getPool();
    if (pool.length === 0) {
      setCurrent(null);
      return;
    }
    const font = fonts.find((f) => f.id === activeFont) || fonts[0];
    const card = pickRandom(pool);
    setCurrent({ ...card, fontFamily: font.family });
    setInput("");
    setStatus("idle");
    setWrongAnswer(""); // Clear wrong answer state
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [getPool, activeFont]);

  // Reset input and keep focus for wrong answers
  const resetForRetry = useCallback(() => {
    setInput("");
    setStatus("idle");
    setWrongAnswer("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    nextCard();
  }, [enabledConsGroups, enabledVowGroups]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hq-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("hq-font", activeFont);
  }, [activeFont]);

  useEffect(() => {
    localStorage.setItem("hq-consGroups", JSON.stringify(enabledConsGroups));
  }, [enabledConsGroups]);

  useEffect(() => {
    localStorage.setItem("hq-vowGroups", JSON.stringify(enabledVowGroups));
  }, [enabledVowGroups]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!current) return;

    // If status is "wrong", treat as retry
    if (status === "wrong") {
      resetForRetry();
      return;
    }

    if (status !== "idle") return;

    const answer = input.trim().toLowerCase().replace(/\s/g, "");
    const correct = current.romaji.toLowerCase().replace(/\s/g, "");
    const accepted = correct.split("/").map((s) => s.trim());
    setTotalAnswered((t) => t + 1);

    if (accepted.includes(answer)) {
      setStatus("correct");
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTotalCorrect((t) => t + 1);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        localStorage.setItem("hq-bestStreak", String(newStreak));
      }
      setTimeout(() => nextCard(), 500);
    } else {
      setStatus("wrong");
      setWrongAnswer(answer);
      setStreak(0);
      // Clear input and keep focus for retry
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  function SyllableBreakdown({ components }) {
    return (
      <div className="syllable-breakdown">
        <span className="breakdown-label">=</span>
        {components.map((comp, idx) => (
          <span key={idx} className="breakdown-char">
            {comp}
          </span>
        ))}
      </div>
    );
  }

  const toggleGroup = (type, group) => {
    if (type === "consonants") {
      setEnabledConsGroups((prev) =>
        prev.includes(group)
          ? prev.filter((g) => g !== group)
          : [...prev, group],
      );
    } else {
      setEnabledVowGroups((prev) =>
        prev.includes(group)
          ? prev.filter((g) => g !== group)
          : [...prev, group],
      );
    }
  };

  const toggleAll = (type, val) => {
    const consKeys = [
      "basic-consonants",
      "aspirated-consonants",
      "tense-consonants",
    ];
    const vowKeys = [
      "basic-vowels-vertical",
      "basic-vowels-horizontal",
      "compound-vowels-vertical",
      "compound-vowels-horizontal",
    ];
    if (type === "consonants") setEnabledConsGroups(val ? consKeys : []);
    else setEnabledVowGroups(val ? vowKeys : []);
  };

  const pool = getPool();
  const accuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <span className="logo">한</span>
          <span className="title">Hangul Quiz</span>
        </div>
        <div className="header-right">
          <div className="font-picker">
            {fonts.map((f) => (
              <button
                key={f.id}
                className={`font-btn ${activeFont === f.id ? "active" : ""}`}
                onClick={() => {
                  setActiveFont(f.id);
                }}
                title={f.label}
                style={{ fontFamily: f.family }}
              >
                가
              </button>
            ))}
          </div>
          <button
            className="theme-btn"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "☀" : "☽"}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="quiz-panel">
          <div className="stats-row">
            <div className="stat">
              <span className="stat-val">{streak}</span>
              <span className="stat-label">Streak</span>
            </div>
            <div className="stat">
              <span className="stat-val">{bestStreak}</span>
              <span className="stat-label">Best</span>
            </div>
            <div className="stat">
              <span className="stat-val">
                {accuracy !== null ? accuracy + "%" : "—"}
              </span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-val">{pool.length}</span>
              <span className="stat-label">Pool</span>
            </div>
          </div>

          {pool.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">?</div>
              <p>Select some characters below to start!</p>
            </div>
          ) : (
            <>
              <div className="mode-toggle">
                <button
                  className={`mode-btn ${learningMode === "characters" ? "active" : ""}`}
                  onClick={() => setLearningMode("characters")}
                >
                  Characters
                </button>
                <button
                  className={`mode-btn ${learningMode === "syllables" ? "active" : ""}`}
                  onClick={() => setLearningMode("syllables")}
                >
                  Syllables
                </button>
              </div>
              {
                // Show breakdown toggle only for characters and syllables modes
                learningMode === "syllables" && (
                  <div className="breakdown-toggle">
                    <button
                      className={`breakdown-btn ${showBreakdown ? "active" : ""}`}
                      onClick={() => setShowBreakdown(!showBreakdown)}
                    >
                      {showBreakdown ? "Hide" : "Show"} Breakdown
                    </button>
                  </div>
                )
              }

              <div className={`kana-display ${status}`}>
                {current && (
                  <span
                    className="kana-char"
                    style={{ fontFamily: current.fontFamily }}
                  >
                    {current.char}
                  </span>
                )}
                {status === "correct" && (
                  <div className="feedback correct-feedback">✓</div>
                )}
                {status === "wrong" && (
                  <div className="feedback wrong-feedback">
                    <span>
                      ✗ You typed: <strong>{wrongAnswer}</strong>
                    </span>
                    <span className="correct-hint">
                      Correct: <strong>{current?.romaji}</strong>
                    </span>
                  </div>
                )}
              </div>

              {learningMode === "syllables" && showBreakdown && current && (
                <div className="syllable-breakdown">
                  {learningMode === "characters" ? (
                    // Character mode: show example syllable
                    <>
                      <span className="breakdown-label">Example:</span>
                      <span className="breakdown-char">{current.char}</span>
                      <span className="breakdown-char">+</span>
                      <span className="breakdown-char">ㅏ</span>
                      <span className="breakdown-char">=</span>
                      <span className="breakdown-char">
                        {current.char === "ㄱ"
                          ? "가"
                          : current.char === "ㄴ"
                            ? "나"
                            : current.char === "ㄷ"
                              ? "다"
                              : current.char === "ㄹ"
                                ? "라"
                                : current.char === "ㅁ"
                                  ? "마"
                                  : current.char === "ㅂ"
                                    ? "바"
                                    : current.char === "ㅅ"
                                      ? "사"
                                      : current.char === "ㅇ"
                                        ? "아"
                                        : current.char === "ㅈ"
                                          ? "자"
                                          : "?"}
                      </span>
                    </>
                  ) : (
                    // Syllable mode: show actual breakdown from the syllable data
                    current.components && (
                      <>
                        <span className="breakdown-label">=</span>
                        {current.components.map((comp, idx) => (
                          <span key={idx} className="breakdown-char">
                            {comp}
                          </span>
                        ))}
                      </>
                    )
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form">
                <input
                  ref={inputRef}
                  className={`kana-input ${status}`}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    status === "wrong"
                      ? "Type correct answer and press Enter..."
                      : "Type romanization..."
                  }
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={status === "correct"}
                />
                <button
                  type="submit"
                  className={`submit-btn ${status === "wrong" ? "retry" : ""}`}
                  disabled={status === "correct"}
                >
                  {status === "wrong" ? "Try Again" : "Check"}
                </button>
              </form>

              {current?.romaji?.includes("/") && status === "idle" && (
                <p className="hint-text">
                  Hint: multiple accepted answers (separated by /)
                </p>
              )}
            </>
          )}
        </div>

        <div className="selector-panel">
          {learningMode === "characters" && (
            <>
              <SelectorSection
                title="Consonants"
                korLabel="자음"
                groups={[
                  "basic-consonants",
                  "aspirated-consonants",
                  "tense-consonants",
                ]}
                chars={consonants}
                enabled={enabledConsGroups}
                onToggle={(g) => toggleGroup("consonants", g)}
                onAll={(v) => toggleAll("consonants", v)}
              />

              <SelectorSection
                title="Vowels"
                korLabel="모음"
                groups={[
                  "basic-vowels-vertical",
                  "basic-vowels-horizontal",
                  "compound-vowels-vertical",
                  "compound-vowels-horizontal",
                ]}
                chars={vowels}
                enabled={enabledVowGroups}
                onToggle={(g) => toggleGroup("vowels", g)}
                onAll={(v) => toggleAll("vowels", v)}
              />
            </>
          )}
          {learningMode === "syllables" && (
            <SelectorSection
              title="Syllable Blocks"
              korLabel="음절"
              groups={consonants.map((c) => `cv-${c.char}`)}
              chars={syllables}
              enabled={enabledSylGroups}
              onToggle={(g) =>
                setEnabledSylGroups((prev) =>
                  prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
                )
              }
              onAll={(val) =>
                setEnabledSylGroups(val ? ["cv-ㄱ", "cv-ㄴ", "cv-ㄷ"] : [])
              }
            />
          )}
        </div>
      </main>
      <footer>
        <p>
          by ferytell{" "}
          <a
            href="https://www.linkedin.com/in/feri-ginanjar-ferytell/"
            target="_blank"
          >
            Linkedin
          </a>
          .
          <a
            href="https://ferytell.github.io/react-portofolio/"
            target="_blank"
          >
            GitHub
          </a>
        </p>
        <p></p>
        <p>
          also try{" "}
          <a href="https://ferytell.github.io/kana-quiz/" target="_blank">
            kana-quiz
          </a>
        </p>
      </footer>
    </div>
  );
}

function SelectorSection({
  title,
  korLabel,
  groups,
  chars,
  enabled,
  onToggle,
  onAll,
}) {
  return (
    <div className="selector-section">
      <div className="section-header">
        <h2>
          {title} <span className="kana-label">{korLabel}</span>
        </h2>
        <div className="toggle-all-btns">
          <button onClick={() => onAll(true)}>All</button>
          <button onClick={() => onAll(false)}>None</button>
        </div>
      </div>
      <div className="group-list">
        {groups.map((group) => {
          const groupChars = chars.filter((c) => c.group === group);
          const checked = enabled.includes(group);
          return (
            <label
              key={group}
              className={`group-item ${checked ? "checked" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(group)}
              />
              <div className="group-kana">
                {groupChars.slice(0, 7).map((c) => (
                  <span key={c.char} className="preview-kana">
                    {c.char}
                  </span>
                ))}
              </div>
              <span className="group-label">{groupLabels[group]}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
