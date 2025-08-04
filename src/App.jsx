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
  const gap = 24;

  const handleLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };
  const handleRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        onClick={handleLeft}
        style={{
          position: 'absolute',
          left: -16,
          zIndex: 2,
          background: '#23232a',
          color: '#a5b4fc',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          fontSize: 24,
          cursor: 'pointer',
          opacity: 0.8,
        }}
      >&lt;</button>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: `${gap}px`,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          padding: '8px 0',
          width: '100%',
          scrollbarWidth: 'none', // for Firefox
        }}
      >
        {React.Children.map(children, (child, idx) => (
          <div key={idx} style={{ flex: `0 0 ${cardWidth}px`, maxWidth: cardWidth }}>
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={handleRight}
        style={{
          position: 'absolute',
          right: -16,
          zIndex: 2,
          background: '#23232a',
          color: '#a5b4fc',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          fontSize: 24,
          cursor: 'pointer',
          opacity: 0.8,
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

  // Manual due date and category state
  const [manualDueDate, setManualDueDate] = useState("");
  const [manualCategory, setManualCategory] = useState("Work");
  // Standard Microsoft task creation with due date and category
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
      if (!listsRes.ok) throw new Error("Failed to fetch task lists");
      const listsJson = await listsRes.json();
      if (!Array.isArray(listsJson.value) || listsJson.value.length === 0) throw new Error("No task lists found");
      const firstListId = listsJson.value[0].id;
      // Build body
      const body = { title };
      if (manualDueDate) {
        body.dueDateTime = {
          dateTime: manualDueDate + "T09:00:00.000Z",
          timeZone: "UTC"
        };
      }
      // Add category to notes/body
      body.body = {
        contentType: "text",
        content: `Category: ${manualCategory}`
      };
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
      setManualCategory("Work");
      await speakConfirmation();
    } catch (err) {
      setError("Failed to create task");
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
      let nlpCategory = null;
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
        // Use first non-DATE entity as title and use its type as category
        const titleEntity = nlpJson.entities.find(e => e.type !== "DATE");
        if (titleEntity) {
          title = titleEntity.name;
          nlpCategory = titleEntity.type;
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
      // Always include NLP category in body content
      // Only include the category value in notes (not 'Category: ...')
      let bodyContent = nlpCategory ? nlpCategory : "";
      if (notes) bodyContent += notes ? `\n${notes}` : "";
      body.body = { content: bodyContent, contentType: "text" };
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
    // Remove all accounts from msalInstance to clear local session
    if (msalInstance && msalInstance.getAllAccounts) {
      const allAccounts = msalInstance.getAllAccounts();
      if (allAccounts && allAccounts.length > 0) {
        allAccounts.forEach(acc => {
          msalInstance.logoutPopup({ account: acc, postLogoutRedirectUri: '/' });
        });
      }
    }
    setAccount(null);
    setTasks([]);
    setCalendarEvents([]);
    window.location.replace('/');
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
        width: '100%',
        margin: '0 auto',
        padding: '0 2rem',
        boxSizing: 'border-box',
      }}>
        {/* NLP Task Input */}
        <form onSubmit={handleNlpTask} style={{ display: 'flex', gap: 8, marginBottom: 16, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
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
          <button type="submit" style={{ background: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 600, cursor: 'pointer', fontSize: 18 }} disabled={nlpLoading || loading}>
            {nlpLoading ? 'Processing...' : 'Add (NLP)'}
          </button>
        </form>
        {/* NLP JSON Response Debug Output removed */}
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
              {tasks.map((task, idx) => {
                // Extract category from description/notes if present
                let category = null;
                let description = task.description || "";
                // If the first line is a known category value, treat it as category
                const lines = description.split(/\r?\n/);
                if (lines.length > 0 && lines[0].match(/^[A-Z_]+$/i)) {
                  category = lines[0];
                  description = lines.slice(1).join('\n').trim();
                }
                return (
                  <div key={task.id} style={{
                    background: task.completed ? 'linear-gradient(90deg, #334155 0%, #475569 100%)' : '#23232a',
                    boxShadow: task.completed ? '0 2px 12px rgba(59,130,246,0.10)' : '0 2px 12px rgba(59,130,246,0.18)',
                    borderRadius: 12,
                    padding: '1.25rem 1rem',
                    minWidth: 180,
                    maxWidth: 200,
                    flex: '0 0 180px',
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginRight: idx === tasks.length - 1 ? 0 : 16,
                    border: 'none',
                    opacity: task.completed ? 0.95 : 1,
                    transition: 'background 0.2s',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 20, color: '#a5b4fc', marginBottom: 8 }}>{task.title}</div>
                    {category && (
                      <div style={{
                        color: '#3b82f6',
                        fontWeight: 700,
                        marginBottom: 6,
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-all',
                      }}>{category}</div>
                    )}
                    {description && (
                      <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{description}</div>
                    )}
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
                );
              })}
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
              {calendarEvents.map((event) => {
                // Parse start time and date
                const startDate = event.start ? new Date(event.start) : null;
                const endDate = event.end ? new Date(event.end) : null;
                const timeStr = startDate ? startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                const dateStr = startDate ? startDate.toLocaleString('default', { month: 'long', day: 'numeric' }) : '';
                // Duration calculation
                let durationStr = '';
                if (startDate && endDate) {
                  const ms = endDate - startDate;
                  const mins = Math.round(ms / 60000);
                  if (mins > 0) durationStr = `${mins} min`;
                }
                // Meeting type detection (simple)
                let meetingType = '';
                if (event.location && event.location.toLowerCase().includes('teams')) {
                  meetingType = 'Microsoft Teams Meeting';
                } else if (event.location && event.location.toLowerCase().includes('zoom')) {
                  meetingType = 'Zoom Meeting';
                } else if (event.location && event.location.toLowerCase().includes('google meet')) {
                  meetingType = 'Google Meet';
                }
                return (
                  <div key={event.id} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    background: '#23232a',
                    boxShadow: '0 2px 12px rgba(99,102,241,0.18)',
                    borderRadius: 12,
                    minWidth: 240,
                    maxWidth: 320,
                    marginBottom: 8,
                    marginRight: 16,
                    padding: 0,
                  }}>
                    {/* Accent bar */}
                    <div style={{
                      width: 6,
                      background: 'linear-gradient(180deg, #6366f1 0%, #3b82f6 100%)',
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                    }} />
                    {/* Card content */}
                    <div style={{
                      padding: '1.25rem 1rem',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 22, color: '#fff' }}>{timeStr}</span>
                        <span style={{ fontSize: 14, color: '#a5b4fc', fontWeight: 500 }}>{dateStr}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>{event.subject}</div>
                      <div style={{ color: '#cbd5e1', fontSize: 15, marginBottom: 2 }}>
                        {durationStr}
                        {meetingType ? ` · ${meetingType}` : ''}
                      </div>
                      {event.location && !meetingType && (
                        <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 2 }}>{event.location}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </Carousel>
          )}
        </section>
        {error && <div style={{ color: '#ef4444', marginTop: 24, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
      </main>
    </div>
  );
}


function GooglePage() {
  // All state declarations must come first
  const [aiOpen, setAiOpen] = React.useState(false);
  const [aiMessages, setAiMessages] = React.useState([
    { role: 'system', content: 'You are a helpful productivity assistant. You can answer questions about Google Tasks and Calendar, suggest productivity tips, and help the user manage their time.' }
  ]);
  const [aiInput, setAiInput] = React.useState("");
  const [aiLoading, setAiLoading] = React.useState(false);
  const [googleReady, setGoogleReady] = React.useState(false);
  const [googleUser, setGoogleUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [calendarEvents, setCalendarEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // Prevent multiple concurrent Google login requests
  const [googleLoginInProgress, setGoogleLoginInProgress] = React.useState(false);
  // NLP-powered Google task creation
  const [nlpInput, setNlpInput] = React.useState("");
  const [nlpLoading, setNlpLoading] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const mediaRecorderRef = React.useRef(null);
  // Vision API image upload
  const fileInputRef = React.useRef(null);
  const [visionLoading, setVisionLoading] = React.useState(false);
  // Standard task creation with category
  const [manualCategory, setManualCategory] = React.useState("Work");
  const [manualDueDate, setManualDueDate] = React.useState("");

  // AI-powered suggestions (basic, local)
  const today = new Date();
  const tasksDueToday = tasks.filter(t => t.due && new Date(t.due).toDateString() === today.toDateString());
  const overdueTasks = tasks.filter(t => t.due && new Date(t.due) < today && !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);
  const eventsToday = calendarEvents.filter(e => {
    if (!e.start) return false;
    const d = new Date(e.start);
    return d.toDateString() === today.toDateString();
  });
  const eventsThisWeek = calendarEvents.filter(e => {
    if (!e.start) return false;
    const d = new Date(e.start);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    return d >= weekStart && d < weekEnd;
  });

  // AI chat handler (Gemini API, requires your API key)
  async function handleAiSend(e) {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setAiLoading(true);
    const newMessages = [...aiMessages, { role: 'user', content: aiInput }];
    setAiMessages(newMessages);
    setAiInput("");
    try {
      // Replace with your Gemini API key
      const apiKey = "AIzaSyBOY2dhOF13OF9ie-DMv1nD32epoBIZ5-I";
      // Gemini API expects a different format
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" + apiKey,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              ...newMessages.slice(1).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
              })),
              { role: 'user', parts: [{ text: aiInput }] }
            ]
          })
        }
      );
      if (!res.ok) throw new Error('Gemini API error');
      const data = await res.json();
      // Gemini's response structure
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't answer that.";
      setAiMessages([...newMessages, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      setAiMessages([...newMessages, { role: 'assistant', content: "AI error: " + err.message }]);
    } finally {
      setAiLoading(false);
    }
  }
  const navigate = useNavigate();
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
  // ...existing code...

  // Handle image upload and OCR
  const handleImageUpload = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setVisionLoading(true);
    setError(null);
    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(',')[1];
        // Call Google Vision API
        const apiKey = "AIzaSyCQGLCYuj8Ff3tDamBmjVMnLkT87cDvQKE";
        const visionRes = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              requests: [
                {
                  image: { content: base64 },
                  features: [{ type: 'TEXT_DETECTION' }]
                }
              ]
            })
          }
        );
        if (!visionRes.ok) throw new Error('Vision API error');
        const visionJson = await visionRes.json();
        const text = visionJson.responses?.[0]?.fullTextAnnotation?.text || '';
        if (text) setNlpInput(text.trim());
        else setError('No text detected in image');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Image OCR failed');
    } finally {
      setVisionLoading(false);
      // Reset file input value so same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  // Standard task creation with category
  // ...existing code...
  const handleCreateTask = async (title) => {
    if (!googleUser) return;
    setLoading(true);
    setError(null);
    try {
      const accessToken = googleUser.accessToken;
      const body = { title };
      if (manualDueDate) body.due = manualDueDate + "T09:00:00.000Z";
      // Add category to notes
      body.notes = `Category: ${manualCategory}`;
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
      setManualDueDate("");
      setManualCategory("Work");
      await speakConfirmation();
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };
  // NLP-powered task creation
  const handleNlpTask = async (e) => {
    e.preventDefault();
    if (!nlpInput.trim() || !googleUser) return;
    setNlpLoading(true);
    setError(null);
    try {
      // Call Google Cloud NLP API
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
      // Extract title, category (type), and date/time from entities
      let title = nlpInput;
      let notes = "";
      let due = "";
      let nlpCategory = null;
      if (nlpJson.entities) {
        // Find a DATE entity
        const dateEntity = nlpJson.entities.find(e => e.type === "DATE");
        if (dateEntity) {
          let parsedDate = null;
          let cleanDate = dateEntity.name.replace(/(\d+)(st|nd|rd|th)/gi, '$1');
          let d = new Date(cleanDate);
          if (!isNaN(d.getTime())) {
            d.setUTCHours(9, 0, 0, 0);
            parsedDate = d.toISOString();
          }
          if (parsedDate) {
            due = parsedDate;
          } else {
            due = null;
          }
        }
        // Use first non-DATE entity as title and get its type as category
        const titleEntity = nlpJson.entities.find(e => e.type !== "DATE");
        if (titleEntity) {
          title = titleEntity.name;
          nlpCategory = titleEntity.type;
        }
        notes = nlpInput;
      }
      // Create Google Task with extracted info
      const accessToken = googleUser.accessToken;
      const body = { title };
      // Only include the category value in notes (not 'Category: ...')
      let notesContent = nlpCategory ? nlpCategory : "";
      if (notes) notesContent += notes ? `\n${notes}` : "";
      body.notes = notesContent;
      if (due) body.due = due;
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

  // Mark Google task as done
  const handleMarkAsDone = async (task) => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = googleUser.accessToken;
      const patchRes = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/@default/tasks/${task.id}`,
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
    async function initGoogle() {
      // Wait for Google Identity Services script to load
      loadGISScript(async () => {
        if (!isMounted) return;
        setGoogleReady(true);
        try {
          // Check if already signed in
          const currentUser = window.google?.accounts?.user?.get();
          if (currentUser) {
            setGoogleUser(currentUser);
          }
        } catch (e) {
          console.error('Google login error:', e);
          setError('Google login failed: ' + (e && e.message ? e.message : 'Unknown error'));
        }
      });
    }
    initGoogle();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (googleReady && googleUser) {
      navigate('/google', { replace: true });
    }
  }, [googleReady, googleUser, navigate]);

  // Google OAuth2 Token Client for access tokens
  const tokenClientRef = React.useRef(null);
  const [oauthLoading, setOauthLoading] = useState(false);

  React.useEffect(() => {
    if (!googleReady) return;
    if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) return;
    tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: GOOGLE_SCOPES,
      callback: (response) => {
        setOauthLoading(false);
        if (response && response.access_token) {
          setGoogleUser({ accessToken: response.access_token });
        } else {
          setError('Google login failed: No access token returned');
        }
      },
    });
  }, [googleReady]);

  // Logout
  const handleLogout = async () => {
    setError(null);
    try {
      setGoogleUser(null);
      setTasks([]);
      setCalendarEvents([]);
      navigate('/');
    } catch (e) {
      setError('Logout failed: ' + (e && e.message ? e.message : 'Unknown error'));
    }
  };

  useEffect(() => {
    async function fetchData() {
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
          if (Array.isArray(tasksJson.items) && tasksJson.items.length > 0) {
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
        const calRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=20&orderBy=startTime&singleEvents=true&timeMin=${encodeURIComponent(now)}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let calData = [];
        if (calRes.ok) {
          const calJson = await calRes.json();
          if (Array.isArray(calJson.items) && calJson.items.length > 0) {
            calData = calJson.items.map((event, idx) => ({
              id: event.id || idx + 1,
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
        let errorMsg = "Failed to fetch data from Google API";
        if (err && err.message) {
          errorMsg += ": " + err.message;
        }
        if (err && err.response) {
          errorMsg += ` (status: ${err.response.status})`;
        }
        console.error("Google API error:", err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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
            onClick={() => {
              setOauthLoading(true);
              if (tokenClientRef.current) {
                tokenClientRef.current.requestAccessToken();
              } else {
                setError('Google OAuth client not ready');
                setOauthLoading(false);
              }
            }}
            style={{
              fontSize: 18,
              padding: '12px 32px',
              background: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: oauthLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(52,168,83,0.18)',
              marginTop: 12,
              transition: 'background 0.2s',
              opacity: oauthLoading ? 0.6 : 1
            }}
            disabled={oauthLoading}
          >
            {oauthLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
          {error && <div style={{ color: '#ef4444', marginTop: 16, fontWeight: 500 }}>{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating AI Assistant Button & Widget */}
      <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
        <button onClick={() => setAiOpen(v => !v)} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '50%', width: 60, height: 60, fontSize: 32, boxShadow: '0 2px 12px rgba(99,102,241,0.18)', cursor: 'pointer' }} title="Ask AI">
          🤖
        </button>
        {aiOpen && (
          <div style={{ position: 'absolute', bottom: 70, right: 0, width: 340, background: '#23232a', color: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.32)', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontWeight: 700, color: '#a5b4fc', fontSize: 18, marginBottom: 4 }}>AI Assistant</div>
            <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 8, fontSize: 15, background: '#18181b', borderRadius: 8, padding: 8 }}>
              {aiMessages.slice(1).map((m, i) => (
                <div key={i} style={{ marginBottom: 6, color: m.role === 'assistant' ? '#a5b4fc' : '#fff', textAlign: m.role === 'assistant' ? 'left' : 'right' }}>
                  <span style={{ fontWeight: m.role === 'assistant' ? 600 : 400 }}>{m.role === 'assistant' ? 'AI: ' : 'You: '}</span>{m.content}
                </div>
              ))}
              {aiLoading && <div style={{ color: '#a5b4fc' }}>AI is typing...</div>}
            </div>
            <form onSubmit={handleAiSend} style={{ display: 'flex', gap: 6 }}>
              <input type="text" value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="Ask anything..." style={{ flex: 1, borderRadius: 8, border: '1px solid #6366f1', padding: '8px 10px', background: '#18181b', color: '#fff', fontSize: 15 }} disabled={aiLoading} />
              <button type="submit" style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', fontWeight: 600, fontSize: 16, cursor: aiLoading ? 'not-allowed' : 'pointer', opacity: aiLoading ? 0.7 : 1 }} disabled={aiLoading}>Send</button>
            </form>
          </div>
        )}
      </div>
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
          <span>Google Tasks & Calendar</span>
          {googleUser && (
            <button onClick={handleLogout} style={{ marginLeft: 24, background: 'none', border: '1px solid #6366f1', color: '#a5b4fc', borderRadius: 8, padding: '6px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'background 0.2s' }}>Sign out</button>
          )}
        </div>
      </header>
      <main style={{
        width: '100%',
        margin: '0 auto',
        padding: '0 2rem',
        boxSizing: 'border-box',
      }}>
        {/* AI-powered Suggestions/Analytics */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#a5b4fc', marginBottom: 8, fontSize: 22 }}>AI Suggestions & Analytics</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, fontSize: 16 }}>
            <div style={{ background: '#23232a', color: '#cbd5e1', borderRadius: 10, padding: '1rem 1.5rem', minWidth: 180, maxWidth: 220, boxShadow: '0 2px 8px rgba(99,102,241,0.10)', textAlign: 'center', fontWeight: 500 }}>
              <div style={{ fontWeight: 700, color: '#a5b4fc', fontSize: 18, marginBottom: 4 }}>Tasks</div>
              <div>Total: {tasks.length}</div>
              <div>Completed: {completedTasks.length}</div>
              <div>Pending: {pendingTasks.length}</div>
              <div>Due Today: {tasksDueToday.length}</div>
              <div>Overdue: {overdueTasks.length}</div>
            </div>
            <div style={{ background: '#23232a', color: '#cbd5e1', borderRadius: 10, padding: '1rem 1.5rem', minWidth: 180, maxWidth: 220, boxShadow: '0 2px 8px rgba(99,102,241,0.10)', textAlign: 'center', fontWeight: 500 }}>
              <div style={{ fontWeight: 700, color: '#a5b4fc', fontSize: 18, marginBottom: 4 }}>Calendar</div>
              <div>Events Today: {eventsToday.length}</div>
              <div>Events This Week: {eventsThisWeek.length}</div>
              <div>Total Events: {calendarEvents.length}</div>
            </div>
          </div>
          {/* Simple suggestions */}
          <div style={{ marginTop: 16, color: '#cbd5e1', textAlign: 'center', fontSize: 16 }}>
            {overdueTasks.length > 0 && <div>⚠️ You have {overdueTasks.length} overdue task(s). Consider completing them soon!</div>}
            {tasksDueToday.length > 0 && <div>📅 {tasksDueToday.length} task(s) are due today.</div>}
            {eventsToday.length > 3 && <div>🕒 You have a busy day with {eventsToday.length} events today.</div>}
            {pendingTasks.length === 0 && <div>🎉 All tasks are completed! Great job!</div>}
          </div>
        </section>
        {/* NLP Task Input */}
        <form onSubmit={handleNlpTask} style={{ display: 'flex', gap: 8, marginBottom: 16, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
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
          {/* Image upload for Google Vision OCR */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            disabled={visionLoading || nlpLoading || loading}
          />
          <button
            type="button"
            style={{ background: '#34a853', color: '#fff', border: 'none', borderRadius: 8, padding: '0 12px', fontWeight: 600, cursor: visionLoading ? 'not-allowed' : 'pointer', fontSize: 18, minWidth: 40, minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={visionLoading || nlpLoading || loading}
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
            title="Extract text from image (Google Vision)"
          >
            {visionLoading ? '...' : <span role="img" aria-label="camera">📷</span>}
          </button>
          <button type="submit" style={{ background: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 600, cursor: 'pointer', fontSize: 18 }} disabled={nlpLoading || loading}>
            {nlpLoading ? 'Processing...' : 'Add (NLP)'}
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
              {tasks.map((task, idx) => {
                // Extract category from description/notes if present
                let category = null;
                let description = task.description || "";
                // If the first line is a known category value, treat it as category
                const lines = description.split(/\r?\n/);
                if (lines.length > 0 && lines[0].match(/^[A-Z_]+$/i)) {
                  category = lines[0];
                  description = lines.slice(1).join('\n').trim();
                }
                return (
                  <div key={task.id} style={{
                    background: task.completed ? 'linear-gradient(90deg, #334155 0%, #475569 100%)' : '#23232a',
                    boxShadow: task.completed ? '0 2px 12px rgba(59,130,246,0.10)' : '0 2px 12px rgba(59,130,246,0.18)',
                    borderRadius: 12,
                    padding: '1.25rem 1rem',
                    minWidth: 180,
                    maxWidth: 200,
                    flex: '0 0 180px',
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginRight: idx === tasks.length - 1 ? 0 : 16,
                    border: 'none',
                    opacity: task.completed ? 0.95 : 1,
                    transition: 'background 0.2s',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 20, color: '#a5b4fc', marginBottom: 8 }}>{task.title}</div>
                    {category && (
                      <div style={{
                        color: '#3b82f6',
                        fontWeight: 700,
                        marginBottom: 6,
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-all',
                      }}>{category}</div>
                    )}
                    {description && (
                      <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{description}</div>
                    )}
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
                );
              })}
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
              {calendarEvents.map((event) => {
                // Parse start time and date
                const startDate = event.start ? new Date(event.start) : null;
                const endDate = event.end ? new Date(event.end) : null;
                const timeStr = startDate ? startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                const dateStr = startDate ? startDate.toLocaleString('default', { month: 'long', day: 'numeric' }) : '';
                // Duration calculation
                let durationStr = '';
                if (startDate && endDate) {
                  const ms = endDate - startDate;
                  const mins = Math.round(ms / 60000);
                  if (mins > 0) durationStr = `${mins} min`;
                }
                // Meeting type detection (simple)
                let meetingType = '';
                if (event.location && event.location.toLowerCase().includes('teams')) {
                  meetingType = 'Microsoft Teams Meeting';
                } else if (event.location && event.location.toLowerCase().includes('zoom')) {
                  meetingType = 'Zoom Meeting';
                } else if (event.location && event.location.toLowerCase().includes('google meet')) {
                  meetingType = 'Google Meet';
                }
                return (
                  <div key={event.id} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    background: '#23232a',
                    boxShadow: '0 2px 12px rgba(99,102,241,0.18)',
                    borderRadius: 12,
                    minWidth: 240,
                    maxWidth: 320,
                    marginBottom: 8,
                    marginRight: 16,
                    padding: 0,
                  }}>
                    {/* Accent bar */}
                    <div style={{
                      width: 6,
                      background: 'linear-gradient(180deg, #6366f1 0%, #3b82f6 100%)',
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                    }} />
                    {/* Card content */}
                    <div style={{
                      padding: '1.25rem 1rem',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 22, color: '#fff' }}>{timeStr}</span>
                        <span style={{ fontSize: 14, color: '#a5b4fc', fontWeight: 500 }}>{dateStr}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>{event.subject}</div>
                      <div style={{ color: '#cbd5e1', fontSize: 15, marginBottom: 2 }}>
                        {durationStr}
                        {meetingType ? ` · ${meetingType}` : ''}
                      </div>
                      {event.location && !meetingType && (
                        <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 2 }}>{event.location}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </Carousel>
          )}
        </section>
        {error && <div style={{ color: '#ef4444', marginTop: 24, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
      </main>
    </div>
    </>
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
