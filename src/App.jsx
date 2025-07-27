// Simple landing page for the home route
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        background: '#23232a',
        boxShadow: '0 4px 24px rgba(0,0,0,0.32)',
        borderRadius: 16,
        padding: '2.5rem 2rem',
        maxWidth: 400,
        width: '100%',
        textAlign: 'center',
        margin: '0 auto',
      }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 16, color: '#a5b4fc' }}>Welcome to Productivity App</h1>
        <p style={{ color: '#cbd5e1', fontSize: 18, marginBottom: 24 }}>
          Choose a provider to view your tasks and calendar events.
        </p>
        <button
          onClick={() => navigate('/microsoft')}
          style={{
            fontSize: 18,
            padding: '12px 32px',
            background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(59,130,246,0.18)',
            marginBottom: 12,
            marginRight: 8,
            transition: 'background 0.2s',
          }}
        >Microsoft</button>
        <button
          onClick={() => navigate('/google')}
          style={{
            fontSize: 18,
            padding: '12px 32px',
            background: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(52,168,83,0.18)',
            marginLeft: 8,
            transition: 'background 0.2s',
          }}
        >Google</button>
      </div>
    </div>
  );
}
// ...existing code...
// ...full code from previous message...
// ...existing code...

import { useEffect, useState } from "react";
import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { useNavigate, Routes, Route } from "react-router-dom";
// Carousel for horizontal card navigation
function Carousel({ children }) {
  const [scroll, setScroll] = useState(0);
  const containerRef = React.useRef(null);
  const cardWidth = 280; // match card maxWidth
  const visibleCards = 1; // show 1 card at a time
  const totalCards = React.Children.count(children);
  const maxScroll = Math.max(0, totalCards - visibleCards);

  const handleLeft = () => setScroll(s => Math.max(0, s - 1));
  const handleRight = () => setScroll(s => Math.min(maxScroll, s + 1));

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: scroll * (cardWidth + 24), behavior: 'smooth' });
    }
  }, [scroll]);

  // Render a slice of visible cards
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        onClick={handleLeft}
        disabled={scroll === 0}
        style={{
          position: 'relative',
          left: 0,
          zIndex: 2,
          background: '#23232a',
          color: '#a5b4fc',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          fontSize: 24,
          cursor: 'pointer',
          opacity: scroll === 0 ? 0.5 : 1,
          marginRight: 16,
        }}
      >&lt;</button>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          gap: 24,
          overflow: 'hidden',
          scrollBehavior: 'smooth',
          paddingBottom: 8,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 320,
          width: `${cardWidth}px`, // exactly 1 card wide
          maxWidth: `${cardWidth}px`,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {
          (() => {
            const arr = React.Children.toArray(children);
            // If not enough cards to fill a full set, only show the remaining cards
            const start = Math.min(scroll, Math.max(0, arr.length - visibleCards));
            const end = Math.min(start + visibleCards, arr.length);
            return arr.slice(start, end).map((child, idx) => (
              <div key={idx} style={{ flex: `0 0 ${cardWidth}px`, maxWidth: cardWidth }}>{child}</div>
            ));
          })()
        }
      </div>
      <button
        onClick={handleRight}
        disabled={scroll === maxScroll}
        style={{
          position: 'relative',
          right: 0,
          zIndex: 2,
          background: '#23232a',
          color: '#a5b4fc',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          fontSize: 24,
          cursor: 'pointer',
          opacity: scroll === maxScroll ? 0.5 : 1,
          marginLeft: 16,
        }}
      >&gt;</button>
    </div>
  );
}
// TaskConsole: input for creating tasks
function TaskConsole({ onCreateTask, loading }) {
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateTask(title);
      setTitle("");
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 24, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new task..."
        style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #3f3f46', background: '#23232a', color: '#cbd5e1', fontSize: 16 }}
        disabled={loading}
      />
      <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 600, cursor: 'pointer', fontSize: 18 }} disabled={loading}>
        Add
      </button>
    </form>
  );
}

// Add Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// MSAL config and instance
let msalInstance = null;
const msalConfig = {
  auth: {
    clientId: "13610454-f73c-4fb0-884d-767524ecd333",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin,
  },
};
if (typeof window !== "undefined") {
  msalInstance = window.__msalInstance;
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
    window.__msalInstance = msalInstance;
  }
}

// Google OAuth config
const GOOGLE_CLIENT_ID = "824212903399-a447na3jmq57g0btduivrvfum0iqhg1b.apps.googleusercontent.com";
const GOOGLE_SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/tasks";

// Load Google Identity Services script
function loadGISScript(callback) {
  if (window.google && window.google.accounts && window.google.accounts.oauth2) {
    callback();
    return;
  }
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
}

function formatTime(dateTimeStr) {
  if (!dateTimeStr) return '';
  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return dateTimeStr;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDateCustom(dateTimeStr) {
  if (!dateTimeStr) return '';
  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return dateTimeStr;
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day},${month} ${year}`;
}




function MicrosoftPage() {
  // Voice confirmation using Google Text-to-Speech API
  async function speakConfirmation() {
    try {
      const apiKey = "AIzaSyCQGLCYuj8Ff3tDamBmjVMnLkT87cDvQKE";
      const ttsRes = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: "Task has been added" },
            voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
            audioConfig: { audioEncoding: "MP3" }
          })
        }
      );
      if (!ttsRes.ok) return;
      const ttsJson = await ttsRes.json();
      const audioContent = ttsJson.audioContent;
      if (audioContent) {
        const audio = new window.Audio("data:audio/mp3;base64," + audioContent);
        audio.play();
      }
    } catch (err) {
      // Ignore TTS errors
    }
  }
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [msalReady, setMsalReady] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Manual due date state
  const [manualDueDate, setManualDueDate] = useState("");
  // Standard Microsoft task creation with due date
  const handleCreateTask = async (title) => {
    setLoading(true);
    setError(null);
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ["Tasks.ReadWrite"],
        account,
      });
      const accessToken = tokenResponse.accessToken;
      // Get first list
      const listsRes = await fetch("https://graph.microsoft.com/v1.0/me/todo/lists", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!listsRes.ok) throw new Error('Failed to fetch task lists');
      const listsJson = await listsRes.json();
      if (!Array.isArray(listsJson.value) || listsJson.value.length === 0) throw new Error('No task lists found');
      const firstListId = listsJson.value[0].id;
      // Build body
      const body = { title };
      if (manualDueDate) {
        // Set to 9am UTC for consistency
        const d = new Date(manualDueDate);
        d.setUTCHours(9, 0, 0, 0);
        body.dueDateTime = { dateTime: d.toISOString(), timeZone: "UTC" };
      }
      const res = await fetch(`https://graph.microsoft.com/v1.0/me/todo/lists/${firstListId}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const createdTask = await res.json();
      setTasks(prev => [...prev, {
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.body?.content || "",
        completed: createdTask.status === "completed",
        listId: firstListId,
        due: createdTask.dueDateTime?.dateTime || null
      }]);
      setManualDueDate("");
      await speakConfirmation();
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  // NLP-powered Microsoft task creation
  const [nlpInput, setNlpInput] = useState("");
  const [nlpLoading, setNlpLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = React.useRef(null);
  const handleNlpTask = async (e) => {
    e.preventDefault();
    if (!nlpInput.trim()) return;
    setNlpLoading(true);
    setError(null);
    try {
      // Google Cloud NLP API
      const apiKey = "AIzaSyCQGLCYuj8Ff3tDamBmjVMnLkT87cDvQKE";
      const nlpRes = await fetch(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            document: { type: "PLAIN_TEXT", content: nlpInput },
            encodingType: "UTF8"
          })
        }
      );
      if (!nlpRes.ok) throw new Error("NLP API error");
      const nlpJson = await nlpRes.json();
      // Extract title and date/time from entities
      let title = nlpInput;
      let notes = "";
      let due = "";
      if (nlpJson.entities) {
        // Find a DATE entity
        const dateEntity = nlpJson.entities.find(e => e.type === "DATE");
        if (dateEntity) {
          // Remove ordinal suffixes (st, nd, rd, th)
          let cleanDate = dateEntity.name.replace(/(\d+)(st|nd|rd|th)/gi, '$1');
          let d = new Date(cleanDate);
          if (!isNaN(d.getTime())) {
            d.setUTCHours(9, 0, 0, 0);
            due = d.toISOString();
          }
        }
        // Use first non-DATE entity as title
        const titleEntity = nlpJson.entities.find(e => e.type !== "DATE");
        if (titleEntity) {
          title = titleEntity.name;
        }
        notes = nlpInput;
      }
      // Create Microsoft Task with extracted info
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ["Tasks.ReadWrite"],
        account,
      });
      const accessToken = tokenResponse.accessToken;
      // Get first list
      const listsRes = await fetch("https://graph.microsoft.com/v1.0/me/todo/lists", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!listsRes.ok) throw new Error('Failed to fetch task lists');
      const listsJson = await listsRes.json();
      if (!Array.isArray(listsJson.value) || listsJson.value.length === 0) throw new Error('No task lists found');
      const firstListId = listsJson.value[0].id;
      // Build body
      const body = { title };
      if (notes) body.body = { content: notes, contentType: "text" };
      if (due) body.dueDateTime = { dateTime: due, timeZone: "UTC" };
      const res = await fetch(`https://graph.microsoft.com/v1.0/me/todo/lists/${firstListId}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const createdTask = await res.json();
      setTasks(prev => [...prev, {
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.body?.content || "",
        completed: createdTask.status === "completed",
        listId: firstListId,
        due: createdTask.dueDateTime?.dateTime || null
      }]);
      setNlpInput("");
      await speakConfirmation();
    } catch (err) {
      setError("NLP task creation failed");
    } finally {
      setNlpLoading(false);
    }
  };

  // Mark Microsoft task as done
  const handleMarkAsDone = async (task) => {
    setLoading(true);
    setError(null);
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ["Tasks.ReadWrite", "Tasks.Read"],
        account,
      });
      const accessToken = tokenResponse.accessToken;
      const patchRes = await fetch(`https://graph.microsoft.com/v1.0/me/todo/lists/${task.listId}/tasks/${task.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'completed' })
        }
      );
      if (!patchRes.ok) {
        throw new Error('Failed to mark task as done');
      }
      // Refresh tasks after marking as done
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true } : t));
    } catch (err) {
      setError('Failed to mark task as done');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function initMsal() {
      await msalInstance.initialize();
      if (!isMounted) return;
      setMsalReady(true);
      try {
        const response = await msalInstance.handleRedirectPromise();
        if (response && response.account) {
          setAccount(response.account);
        }
      } catch (e) {
        console.error('MSAL redirect error:', e);
        setError('Microsoft login failed: ' + (e && e.message ? e.message : 'Unknown error'));
      }
      const currentAccounts = msalInstance.getAllAccounts();
      setAccounts(currentAccounts);
      if (currentAccounts && currentAccounts.length > 0) {
        setAccount(currentAccounts[0]);
      }
    }
    initMsal();
    return () => { isMounted = false; };
  }, [navigate]);

  useEffect(() => {
    if (msalReady && account) {
      navigate('/microsoft', { replace: true });
    }
  }, [msalReady, account, navigate]);
  // Account switching
  const handleAccountSwitch = (event) => {
    const selectedId = event.target.value;
    const selected = accounts.find(acc => acc.homeAccountId === selectedId);
    if (selected) {
      setAccount(selected);
    }
  };

  // Logout
  const handleLogout = async () => {
    setError(null);
    try {
      await msalInstance.logoutRedirect({ account });
      setAccount(null);
      setTasks([]);
      setCalendarEvents([]);
      navigate('/');
    } catch (e) {
      setError('Logout failed: ' + (e && e.message ? e.message : 'Unknown error'));
    }
  };

  const loginMicrosoft = async () => {
    try {
      await msalInstance.initialize();
      await msalInstance.loginRedirect({ scopes: ["Tasks.ReadWrite", "Tasks.Read", "Calendars.Read"] });
      // After redirect, MSAL will handle navigation in useEffect
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!account) return;
      setLoading(true);
      setError(null);
      try {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          scopes: ["Tasks.Read", "Calendars.Read"],
          account,
        });
        const accessToken = tokenResponse.accessToken;
        // Fetch task lists
        const listsRes = await fetch("https://graph.microsoft.com/v1.0/me/todo/lists", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let tasksData = [];
        if (listsRes.ok) {
          const listsJson = await listsRes.json();
          if (Array.isArray(listsJson.value) && listsJson.value.length > 0) {
            // Fetch all tasks from the first list
            const firstListId = listsJson.value[0].id;
            const tasksRes = await fetch(`https://graph.microsoft.com/v1.0/me/todo/lists/${firstListId}/tasks`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (tasksRes.ok) {
              const tasksJson = await tasksRes.json();
              if (Array.isArray(tasksJson.value)) {
                tasksData = tasksJson.value.map(t => ({
                  id: t.id,
                  title: t.title,
                  description: t.body?.content || "",
                  completed: t.status === "completed",
                  listId: firstListId,
                  due: t.dueDateTime?.dateTime || null
                }));
              }
            }
          }
        }
        // Fetch all calendar entries (limit to 20 for performance)
        const calRes = await fetch("https://graph.microsoft.com/v1.0/me/calendar/events?$orderby=start/dateTime&$top=20", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let calData = [];
        if (calRes.ok) {
          const allEvents = await calRes.json();
          calData = Array.isArray(allEvents.value) ? allEvents.value.map((event, idx) => ({
            id: idx + 1,
            subject: event.subject || "(No subject)",
            start: event.start?.dateTime || "",
            end: event.end?.dateTime || "",
            location: event.location?.displayName || ""
          })) : [];
        }
        setTasks(tasksData);
        setCalendarEvents(calData);
      } catch (err) {
        let errorMsg = "Failed to fetch data from Microsoft Graph API";
        if (err && err.message) {
          errorMsg += ": " + err.message;
        }
        if (err && err.response) {
          errorMsg += ` (status: ${err.response.status})`;
        }
        console.error("Microsoft Graph API error:", err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [account]);

  if (!msalReady || !account) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: '#23232a',
          boxShadow: '0 4px 24px rgba(0,0,0,0.32)',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}>
          <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 16, color: '#a5b4fc' }}>Microsoft Tasks & Calendar</h1>
          <button
            onClick={loginMicrosoft}
            style={{
              fontSize: 18,
              padding: '12px 32px',
              background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(59,130,246,0.18)',
              marginTop: 12,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)'}
            onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)'}
          >
            Sign in with Microsoft
          </button>
          {error && <div style={{ color: '#ef4444', marginTop: 16, fontWeight: 500 }}>{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
      fontFamily: 'Inter, sans-serif',
      padding: '0',
      boxSizing: 'border-box',
    }}>
      <header style={{
        width: '100%',
        background: '#23232a',
        color: '#a5b4fc',
        padding: '1.5rem 0',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 28,
        letterSpacing: 1,
        boxShadow: '0 2px 8px rgba(99,102,241,0.18)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 12, padding: 0 }}>
            <svg height="36" viewBox="0 0 48 48" width="36" style={{ verticalAlign: 'middle' }}>
              <circle cx="24" cy="24" r="22" fill="#6366f1" />
              <text x="24" y="30" textAnchor="middle" fontSize="20" fill="#fff" fontFamily="Inter, sans-serif">P</text>
            </svg>
          </button>
          <span>Microsoft Tasks & Calendar</span>
          {accounts.length > 1 && (
            <select value={account?.homeAccountId || ''} onChange={handleAccountSwitch} style={{ marginLeft: 24, padding: '6px 12px', borderRadius: 8, fontWeight: 600, fontSize: 16, border: '1px solid #6366f1', background: '#18181b', color: '#a5b4fc', cursor: 'pointer' }}>
              {accounts.map(acc => (
                <option key={acc.homeAccountId} value={acc.homeAccountId}>{acc.username || acc.name || acc.homeAccountId}</option>
              ))}
            </select>
          )}
          {account && (
            <button onClick={handleLogout} style={{ marginLeft: 24, background: 'none', border: '1px solid #6366f1', color: '#a5b4fc', borderRadius: 8, padding: '6px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'background 0.2s' }}>Sign out</button>
          )}
        </div>
      </header>
      <main style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '0 1rem',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* NLP Task Input */}
        <form onSubmit={handleNlpTask} style={{ display: 'flex', gap: 8, marginBottom: 16, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          <input
            type="text"
            value={nlpInput}
            onChange={e => setNlpInput(e.target.value)}
            placeholder="Enter a task in natural language (e.g. 'Remind me to call John next Friday at 2pm')"
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #3f3f46', background: '#23232a', color: '#cbd5e1', fontSize: 16 }}
            disabled={nlpLoading || loading}
          />
          <button
            type="button"
            aria-label={recording ? "Stop recording" : "Record speech"}
            style={{ background: recording ? '#ef4444' : '#6366f1', color: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={nlpLoading || loading}
            onClick={async () => {
              if (recording) {
                // Stop recording
                setRecording(false);
                if (mediaRecorderRef.current) {
                  mediaRecorderRef.current.stop();
                }
                return;
              }
              if (!window.MediaRecorder || !navigator.mediaDevices) {
                setError('Speech recording not supported in this browser');
                return;
              }
              setError(null);
              try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new window.MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                let audioChunks = [];
                mediaRecorder.ondataavailable = event => {
                  if (event.data.size > 0) audioChunks.push(event.data);
                };
                mediaRecorder.onstop = async () => {
                  setRecording(false);
                  const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                  const reader = new FileReader();
                  reader.onloadend = async () => {
                    // Convert audio to base64
                    const base64Audio = reader.result.split(',')[1];
                    // Call Google Cloud Speech-to-Text API
                    setNlpLoading(true);
                    try {
                      const apiKey = "AIzaSyCQGLCYuj8Ff3tDamBmjVMnLkT87cDvQKE";
                      const sttRes = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
                        {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            config: {
                              encoding: 'WEBM_OPUS',
                              sampleRateHertz: 48000,
                              languageCode: 'en-US',
                            },
                            audio: { content: base64Audio }
                          })
                        }
                      );
                      if (!sttRes.ok) throw new Error('Speech-to-Text API error');
                      const sttJson = await sttRes.json();
                      const transcript = sttJson.results?.[0]?.alternatives?.[0]?.transcript || '';
                      if (transcript) setNlpInput(transcript);
                      else setError('No speech recognized');
                    } catch (err) {
                      setError('Speech-to-Text failed');
                    } finally {
                      setNlpLoading(false);
                    }
                  };
                  reader.readAsDataURL(audioBlob);
                };
                mediaRecorder.start();
                setRecording(true);
              } catch (err) {
                setError('Could not access microphone');
              }
            }}
          >
            <span role="img" aria-label={recording ? "stop" : "microphone"}>{recording ? "■" : "🎤"}</span>
          </button>
          <button type="submit" style={{ background: 'linear-gradient(90deg, #22c55e 0%, #6366f1 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 600, cursor: 'pointer', fontSize: 18 }} disabled={nlpLoading || loading}>
            {nlpLoading ? 'Processing...' : 'Add (NLP)'}
          </button>
        </form>
        {/* Standard Task Input with due date */}
        <form onSubmit={e => { e.preventDefault(); if (e.target.title.value.trim()) handleCreateTask(e.target.title.value); }} style={{ display: 'flex', gap: 8, marginBottom: 24, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          <input
            name="title"
            type="text"
            placeholder="Add a new task..."
            style={{ flex: 2, padding: '12px 16px', borderRadius: 8, border: '1px solid #3f3f46', background: '#23232a', color: '#cbd5e1', fontSize: 16 }}
            disabled={loading}
          />
          <input
            name="due"
            type="date"
            value={manualDueDate}
            onChange={e => setManualDueDate(e.target.value)}
            style={{ flex: 1, padding: '12px 8px', borderRadius: 8, border: '1px solid #3f3f46', background: '#23232a', color: '#cbd5e1', fontSize: 16 }}
            disabled={loading}
          />
          <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 600, cursor: 'pointer', fontSize: 18 }} disabled={loading}>
            Add
          </button>
        </form>
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#a5b4fc', marginBottom: 12, fontSize: 24 }}>
            Your Tasks
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 18 }}>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 18 }}>No tasks found.</div>
          ) : (
            <Carousel>
              {tasks.map((task) => (
                <div key={task.id} style={{
                  background: task.completed ? '#1e293b' : '#23232a',
                  boxShadow: task.completed ? '0 2px 12px rgba(34,197,94,0.18)' : '0 2px 12px rgba(59,130,246,0.18)',
                  borderRadius: 12,
                  padding: '1.5rem 1.25rem',
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '0 0 240px',
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginRight: 16,
                  border: task.completed ? '2px solid #22c55e' : 'none',
                  opacity: task.completed ? 0.85 : 1,
                  transition: 'background 0.2s',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#a5b4fc', marginBottom: 8 }}>{task.title}</div>
                  <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{task.description}</div>
                  {task.due && (
                    <div style={{ color: '#f59e42', marginBottom: 8, fontWeight: 500 }}>
                      Due: {formatDateCustom(task.due)} {formatTime(task.due)}
                    </div>
                  )}
                  <div style={{ fontWeight: 500, color: task.completed ? '#22c55e' : '#f59e42', marginBottom: 8 }}>
                    Status: {task.completed ? 'Completed' : 'Not Started'}
                  </div>
                  {!task.completed && (
                    <button
                      style={{
                        background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600, cursor: 'pointer', marginTop: 4
                      }}
                      onClick={() => handleMarkAsDone(task)}
                    >Mark as Done</button>
                  )}
                </div>
              ))}
            </Carousel>
          )}
        </section>
        <section style={{ marginBottom: 0 }}>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#a5b4fc', marginBottom: 12, fontSize: 24 }}>
            Your Calendar Entries
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 18 }}>Loading calendar entries...</div>
          ) : calendarEvents.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 18 }}>No upcoming events.</div>
          ) : (
            <Carousel>
              {calendarEvents.map((event) => (
                <div key={event.id} style={{
                  background: '#23232a',
                  boxShadow: '0 2px 12px rgba(99,102,241,0.18)',
                  borderRadius: 12,
                  padding: '1.5rem 1.25rem',
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '0 0 240px',
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginRight: 16,
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#a5b4fc', marginBottom: 8 }}>{event.subject}</div>
                  <div style={{ color: '#cbd5e1', marginBottom: 8 }}>
                    {event.start ? `${formatDateCustom(event.start)} ` : ''}{formatTime(event.start)} - {event.end ? `${formatDateCustom(event.end)} ` : ''}{formatTime(event.end)}
                  </div>
                  <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{event.location}</div>
                </div>
              ))}
            </Carousel>
          )}
        </section>
        {error && <div style={{ color: '#ef4444', marginTop: 24, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
      </main>
    </div>
  );
}


function GooglePage() {
  // Voice confirmation using Google Text-to-Speech API
  async function speakConfirmation() {
    try {
      const apiKey = "AIzaSyCQGLCYuj8Ff3tDamBmjVMnLkT87cDvQKE";
      const ttsRes = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: "Task has been added" },
            voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
            audioConfig: { audioEncoding: "MP3" }
          })
        }
      );
      if (!ttsRes.ok) return;
      const ttsJson = await ttsRes.json();
      const audioContent = ttsJson.audioContent;
      if (audioContent) {
        const audio = new window.Audio("data:audio/mp3;base64," + audioContent);
        audio.play();
      }
    } catch (err) {
      // Ignore TTS errors
    }
  }
  const [googleReady, setGoogleReady] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // NLP-powered Google task creation
  const [nlpInput, setNlpInput] = useState("");
  const [nlpLoading, setNlpLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = React.useRef(null);
  // ...existing code...

  // Standard task creation (unchanged)
  const handleCreateTask = async (title) => {
    if (!googleUser) return;
    setLoading(true);
    setError(null);
    try {
      const accessToken = googleUser.accessToken;
      const res = await fetch("https://tasks.googleapis.com/tasks/v1/lists/@default/tasks", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const createdTask = await res.json();
      setTasks(prev => [...prev, {
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.notes || "",
        completed: createdTask.status === "completed",
        due: createdTask.due || null
      }]);
      await speakConfirmation();
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // NLP task creation using Google Cloud NLP API
  const handleNlpTask = async (e) => {
    e.preventDefault();
    if (!nlpInput.trim() || !googleUser) return;
    setNlpLoading(true);
    setError(null);
    try {
      // Call Google Cloud NLP API (replace YOUR_API_KEY with your actual key)
      const apiKey = "AIzaSyCQGLCYuj8Ff3tDamBmjVMnLkT87cDvQKE";
      const nlpRes = await fetch(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            document: { type: "PLAIN_TEXT", content: nlpInput },
            encodingType: "UTF8"
          })
        }
      );
      if (!nlpRes.ok) throw new Error("NLP API error");
      const nlpJson = await nlpRes.json();
      // ...existing code...
      // Extract title and date/time from entities
      let title = nlpInput;
      let notes = "";
      let due = "";
      if (nlpJson.entities) {
        // Find a DATE entity
        const dateEntity = nlpJson.entities.find(e => e.type === "DATE");
        if (dateEntity) {
          // Try to parse date string to RFC3339
          let parsedDate = null;
          // Remove ordinal suffixes (st, nd, rd, th)
          let cleanDate = dateEntity.name.replace(/(\d+)(st|nd|rd|th)/gi, '$1');
          // Try parsing with Date
          let d = new Date(cleanDate);
          if (!isNaN(d.getTime())) {
            // Set to 9am UTC for consistency
            d.setUTCHours(9, 0, 0, 0);
            parsedDate = d.toISOString();
          }
          if (parsedDate) {
            due = parsedDate;
          } else {
            due = null; // Don't set if parsing fails
          }
        }
        // Use first non-DATE entity as title
        const titleEntity = nlpJson.entities.find(e => e.type !== "DATE");
        if (titleEntity) {
          title = titleEntity.name;
        }
        notes = nlpInput;
      }
      // Create Google Task with extracted info
      const accessToken = googleUser.accessToken;
      const body = { title };
      if (notes) body.notes = notes;
      if (due) body.due = due; // Google Tasks expects RFC3339 date
      const res = await fetch("https://tasks.googleapis.com/tasks/v1/lists/@default/tasks", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const createdTask = await res.json();
      setTasks(prev => [...prev, {
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.notes || "",
        completed: createdTask.status === "completed",
        due: createdTask.due || null
      }]);
      setNlpInput("");
      await speakConfirmation();
    } catch (err) {
      setError("NLP task creation failed");
    } finally {
      setNlpLoading(false);
    }
  };

  useEffect(() => {
    loadGISScript(() => setGoogleReady(true));
  }, []);

  const loginGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        throw new Error("Google Identity Services not loaded");
      }
      window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GOOGLE_SCOPES,
        callback: async (tokenResponse) => {
          if (!tokenResponse || !tokenResponse.access_token) {
            setError("Google sign-in failed: No access token");
            setLoading(false);
            return;
          }
          // Fetch user info
          const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          const userInfo = await userInfoRes.json();
          setGoogleUser({
            ...userInfo,
            accessToken: tokenResponse.access_token,
          });
          setLoading(false);
        },
        error_callback: (err) => {
          setError("Google sign-in failed: " + (err && err.error ? err.error : "Unknown error"));
          setLoading(false);
        },
      }).requestAccessToken();
    } catch (err) {
      setError("Google sign-in failed: " + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchGoogleData() {
      if (!googleUser) return;
      setLoading(true);
      setError(null);
      try {
        const accessToken = googleUser.accessToken;
        // Fetch Google Tasks
        const tasksRes = await fetch("https://tasks.googleapis.com/tasks/v1/lists/@default/tasks", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let tasksData = [];
        if (tasksRes.ok) {
          const tasksJson = await tasksRes.json();
          if (tasksJson.items) {
            tasksData = tasksJson.items.map(t => ({
              id: t.id,
              title: t.title,
              description: t.notes || "",
              completed: t.status === "completed",
              due: t.due || null
            }));
          }
        }
        // Fetch Google Calendar events (limit to 20 for performance)
        const now = new Date().toISOString();
        const calRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(now)}&maxResults=20&singleEvents=true&orderBy=startTime`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let calData = [];
        if (calRes.ok) {
          const calJson = await calRes.json();
          if (calJson.items) {
            calData = calJson.items.map((event, idx) => ({
              id: idx + 1,
              subject: event.summary || "(No subject)",
              start: event.start?.dateTime || event.start?.date || "",
              end: event.end?.dateTime || event.end?.date || "",
              location: event.location || ""
            }));
          }
        }
        setTasks(tasksData);
        setCalendarEvents(calData);
      } catch (err) {
        setError("Failed to fetch data from Google APIs");
      } finally {
        setLoading(false);
      }
    }
    fetchGoogleData();
  }, [googleUser]);

  if (!googleReady || !googleUser) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: '#23232a',
          boxShadow: '0 4px 24px rgba(0,0,0,0.32)',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}>
          <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 16, color: '#a5b4fc' }}>Google Tasks & Calendar</h1>
          <button
            onClick={loginGoogle}
            disabled={!googleReady}
            style={{
              opacity: googleReady ? 1 : 0.5,
              fontSize: 18,
              padding: '12px 32px',
              background: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(52,168,83,0.18)',
              marginTop: 12,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #34a853 0%, #4285f4 100%)'}
            onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)'}
          >
            Sign in with Google
          </button>
          {error && <div style={{ color: '#ef4444', marginTop: 16, fontWeight: 500 }}>{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
      fontFamily: 'Inter, sans-serif',
      padding: '0',
      boxSizing: 'border-box',
    }}>
      <header style={{
        width: '100%',
        background: '#23232a',
        color: '#a5b4fc',
        padding: '1.5rem 0',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 28,
        letterSpacing: 1,
        boxShadow: '0 2px 8px rgba(66,133,244,0.18)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 12, padding: 0 }}>
            <svg height="36" viewBox="0 0 48 48" width="36" style={{ verticalAlign: 'middle' }}>
              <circle cx="24" cy="24" r="22" fill="#4285f4" />
              <text x="24" y="30" textAnchor="middle" fontSize="20" fill="#fff" fontFamily="Inter, sans-serif">P</text>
            </svg>
          </button>
          <span>Google Tasks & Calendar</span>
          <button
            onClick={() => {
              setGoogleUser(null);
              setTimeout(() => { navigate('/'); }, 300);
            }}
            style={{
              marginLeft: 24,
              background: 'none',
              border: '1px solid #4285f4',
              color: '#a5b4fc',
              borderRadius: 8,
              padding: '6px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >Sign out</button>
        </div>
      </header>
      <main style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '0 1rem',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* NLP Task Input */}
        <form onSubmit={handleNlpTask} style={{ display: 'flex', gap: 8, marginBottom: 16, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          <input
            type="text"
            value={nlpInput}
            onChange={e => setNlpInput(e.target.value)}
            placeholder="Enter a task in natural language (e.g. 'Remind me to call John next Friday at 2pm')"
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #3f3f46', background: '#23232a', color: '#cbd5e1', fontSize: 16 }}
            disabled={nlpLoading || loading}
          />
          <button
            type="button"
            aria-label={recording ? "Stop recording" : "Record speech"}
            style={{ background: recording ? '#ef4444' : '#4285f4', color: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={nlpLoading || loading}
            onClick={async () => {
              if (recording) {
                setRecording(false);
                if (mediaRecorderRef.current) {
                  mediaRecorderRef.current.stop();
                }
                return;
              }
              if (!window.MediaRecorder || !navigator.mediaDevices) {
                setError('Speech recording not supported in this browser');
                return;
              }
              setError(null);
              try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new window.MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                let audioChunks = [];
                mediaRecorder.ondataavailable = event => {
                  if (event.data.size > 0) audioChunks.push(event.data);
                };
                mediaRecorder.onstop = async () => {
                  setRecording(false);
                  const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                  const reader = new FileReader();
                  reader.onloadend = async () => {
                    // Convert audio to base64
                    const base64Audio = reader.result.split(',')[1];
                    // Call Google Cloud Speech-to-Text API
                    setNlpLoading(true);
                    try {
                      const apiKey = "AIzaSyCQGLCYuj8Ff3tDamBmjVMnLkT87cDvQKE";
                      const sttRes = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
                        {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            config: {
                              encoding: 'WEBM_OPUS',
                              sampleRateHertz: 48000,
                              languageCode: 'en-US',
                            },
                            audio: { content: base64Audio }
                          })
                        }
                      );
                      if (!sttRes.ok) throw new Error('Speech-to-Text API error');
                      const sttJson = await sttRes.json();
                      const transcript = sttJson.results?.[0]?.alternatives?.[0]?.transcript || '';
                      if (transcript) setNlpInput(transcript);
                      else setError('No speech recognized');
                    } catch (err) {
                      setError('Speech-to-Text failed');
                    } finally {
                      setNlpLoading(false);
                    }
                  };
                  reader.readAsDataURL(audioBlob);
                };
                mediaRecorder.start();
                setRecording(true);
              } catch (err) {
                setError('Could not access microphone');
              }
            }}
          >
            <span role="img" aria-label={recording ? "stop" : "microphone"}>{recording ? "■" : "🎤"}</span>
          </button>
          <button type="submit" style={{ background: 'linear-gradient(90deg, #34a853 0%, #4285f4 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 600, cursor: 'pointer', fontSize: 18 }} disabled={nlpLoading || loading}>
            {nlpLoading ? 'Processing...' : 'Add (NLP)'}
          </button>
        </form>
        {/* ...existing code... */}
        {/* Standard Task Input */}
        <TaskConsole onCreateTask={handleCreateTask} loading={loading} />
        {/* ...existing code for tasks and calendar... */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#a5b4fc', marginBottom: 12, fontSize: 24 }}>
            Your Tasks
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 18 }}>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 18 }}>No tasks found.</div>
          ) : (
            <Carousel>
              {tasks.map((task) => (
                <div key={task.id} style={{
                  background: task.completed ? '#1e293b' : '#23232a',
                  boxShadow: task.completed ? '0 2px 12px rgba(34,197,94,0.18)' : '0 2px 12px rgba(66,133,244,0.18)',
                  borderRadius: 12,
                  padding: '1.5rem 1.25rem',
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '0 0 240px',
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginRight: 16,
                  border: task.completed ? '2px solid #22c55e' : 'none',
                  opacity: task.completed ? 0.85 : 1,
                  transition: 'background 0.2s',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#a5b4fc', marginBottom: 8 }}>{task.title}</div>
                  <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{task.description}</div>
                  {task.due && (
                    <div style={{ color: '#f59e42', marginBottom: 8, fontWeight: 500 }}>
                      Due: {formatDateCustom(task.due)} {formatTime(task.due)}
                    </div>
                  )}
                  <div style={{ fontWeight: 500, color: task.completed ? '#22c55e' : '#f59e42', marginBottom: 8 }}>
                    Status: {task.completed ? 'Completed' : 'Not Started'}
                  </div>
                  {!task.completed && (
                    <button
                      style={{
                        background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600, cursor: 'pointer', marginTop: 4
                      }}
                      onClick={async () => {
                        setLoading(true);
                        setError(null);
                        try {
                          await fetch(`https://tasks.googleapis.com/tasks/v1/lists/@default/tasks/${task.id}`,
                            {
                              method: 'PATCH',
                              headers: {
                                'Authorization': `Bearer ${googleUser.accessToken}`,
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ status: 'completed' })
                            }
                          );
                        } catch (err) {
                          setError('Failed to mark task as done');
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >Mark as Done</button>
                  )}
                </div>
              ))}
            </Carousel>
          )}
        </section>
        <section style={{ marginBottom: 0 }}>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#a5b4fc', marginBottom: 12, fontSize: 24 }}>
            Your Calendar Entries
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 18 }}>Loading calendar entries...</div>
          ) : calendarEvents.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 18 }}>No upcoming events.</div>
          ) : (
            <Carousel>
              {calendarEvents.map((event) => (
                <div key={event.id} style={{
                  background: '#23232a',
                  boxShadow: '0 2px 12px rgba(66,133,244,0.18)',
                  borderRadius: 12,
                  padding: '1.5rem 1.25rem',
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '0 0 240px',
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginRight: 16,
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#a5b4fc', marginBottom: 8 }}>{event.subject}</div>
                  <div style={{ color: '#cbd5e1', marginBottom: 8 }}>
                    {event.start ? `${formatDateCustom(event.start)} ` : ''}{formatTime(event.start)} - {event.end ? `${formatDateCustom(event.end)} ` : ''}{formatTime(event.end)}
                  </div>
                  <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{event.location}</div>
                </div>
              ))}
            </Carousel>
          )}
        </section>
        {error && <div style={{ color: '#ef4444', marginTop: 24, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
      </main>
    </div>
  );
}


function App() {
  const navigate = useNavigate();
  const [msalReady, setMsalReady] = useState(false);
  const [account, setAccount] = useState(null);
  // MSAL init and redirect logic
  useEffect(() => {
    let isMounted = true;
    async function initMsal() {
      await msalInstance.initialize();
      if (!isMounted) return;
      setMsalReady(true);
      try {
        const response = await msalInstance.handleRedirectPromise();
        if (response && response.account) {
          setAccount(response.account);
        }
      } catch (e) {
        // ignore error here
      }
      const currentAccounts = msalInstance.getAllAccounts();
      if (currentAccounts && currentAccounts.length > 0) {
        setAccount(currentAccounts[0]);
      }
    }
    initMsal();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (msalReady && account && window.location.pathname === '/') {
      navigate('/microsoft', { replace: true });
    }
  }, [msalReady, account, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/microsoft" element={<MicrosoftPage />} />
      <Route path="/google" element={<GooglePage />} />
    </Routes>
  );
}

export default App;
