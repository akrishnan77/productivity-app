// Simple landing page for the home route
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        borderRadius: 16,
        padding: '2.5rem 2rem',
        maxWidth: 400,
        width: '100%',
        textAlign: 'center',
      }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 16, color: '#6366f1' }}>Welcome to Productivity App</h1>
        <p style={{ color: '#64748b', fontSize: 18, marginBottom: 24 }}>
          Choose a provider to view your tasks and calendar events.
        </p>
        <button
          onClick={() => navigate('/microsoft')}
          style={{
            fontSize: 18,
            padding: '12px 32px',
            background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
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
            background: 'linear-gradient(90deg, #34a853 0%, #4285f4 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(52,168,83,0.08)',
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




function MicrosoftPage() {
  const [account, setAccount] = useState(null);
  const [msalReady, setMsalReady] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          navigate('/microsoft', { replace: true });
        }
      } catch (e) {}
      const currentAccounts = msalInstance.getAllAccounts();
      if (currentAccounts && currentAccounts.length > 0) {
        setAccount(currentAccounts[0]);
      }
    }
    initMsal();
    return () => { isMounted = false; };
  }, [navigate]);

  const loginMicrosoft = async () => {
    try {
      await msalInstance.initialize();
      await msalInstance.loginRedirect({ scopes: ["Tasks.ReadWrite", "Tasks.Read", "Calendars.Read"] });
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
            // Fetch tasks from the first list
            const firstListId = listsJson.value[0].id;
            const tasksRes = await fetch(`https://graph.microsoft.com/v1.0/me/todo/lists/${firstListId}/tasks?$top=2`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (tasksRes.ok) {
              const tasksJson = await tasksRes.json();
              if (Array.isArray(tasksJson.value)) {
                tasksData = tasksJson.value.slice(0, 2).map(t => ({
                  id: t.id,
                  title: t.title,
                  description: t.body?.content || "",
                  completed: t.status === "completed",
                  listId: firstListId
                }));
              }
            }
          }
        }
        // Fetch calendar entries
        const calRes = await fetch("https://graph.microsoft.com/v1.0/me/calendar/events?$orderby=start/dateTime&$top=2", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let calData = [];
        if (calRes.ok) {
          const allEvents = await calRes.json();
          calData = Array.isArray(allEvents.value) ? allEvents.value.slice(0, 2).map((event, idx) => ({
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
        setError("Failed to fetch data from Microsoft Graph API");
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
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}>
          <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 16, color: '#6366f1' }}>Microsoft Tasks & Calendar</h1>
          <button
            onClick={loginMicrosoft}
            style={{
              fontSize: 18,
              padding: '12px 32px',
              background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
              marginTop: 12,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)'}
            onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)'}
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
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      fontFamily: 'Inter, sans-serif',
      padding: '0',
    }}>
      <header style={{
        width: '100%',
        background: '#6366f1',
        color: '#fff',
        padding: '1.5rem 0',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 28,
        letterSpacing: 1,
        boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 12, padding: 0 }}>
            <svg height="36" viewBox="0 0 48 48" width="36" style={{ verticalAlign: 'middle' }}>
              <circle cx="24" cy="24" r="22" fill="#3b82f6" />
              <text x="24" y="30" textAnchor="middle" fontSize="20" fill="#fff" fontFamily="Inter, sans-serif">P</text>
            </svg>
          </button>
          <span>Microsoft Tasks & Calendar</span>
        </div>
      </header>
      <main style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '0 1rem',
      }}>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#6366f1', marginBottom: 24, fontSize: 24 }}>
            Your Top 2 Tasks
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 18 }}>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 18 }}>No tasks found.</div>
          ) : (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {tasks.map((task) => (
                <div key={task.id} style={{
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(59,130,246,0.08)',
                  borderRadius: 12,
                  padding: '1.5rem 1.25rem',
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '1 1 240px',
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#6366f1', marginBottom: 8 }}>{task.title}</div>
                  <div style={{ color: '#64748b', marginBottom: 8 }}>{task.description}</div>
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
            </div>
          )}
        </section>
        <section>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#6366f1', marginBottom: 24, fontSize: 24 }}>
            Your Next 2 Calendar Entries
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 18 }}>Loading calendar entries...</div>
          ) : calendarEvents.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 18 }}>No upcoming events.</div>
          ) : (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {calendarEvents.map((event) => (
                <div key={event.id} style={{
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
                  borderRadius: 12,
                  padding: '1.5rem 1.25rem',
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '1 1 240px',
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#6366f1', marginBottom: 8 }}>{event.subject}</div>
                  <div style={{ color: '#64748b', marginBottom: 8 }}>
                    {formatTime(event.start)} - {formatTime(event.end)}
                  </div>
                  <div style={{ color: '#64748b', marginBottom: 8 }}>{event.location}</div>
                </div>
              ))}
            </div>
          )}
        </section>
        {error && <div style={{ color: '#ef4444', marginTop: 24, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
      </main>
    </div>
  );
}


function GooglePage() {
  const [googleReady, setGoogleReady] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(false);

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
        const tasksRes = await fetch("https://tasks.googleapis.com/tasks/v1/lists/@default/tasks?maxResults=2", {
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
              completed: t.status === "completed"
            }));
          }
        }
        // Fetch Google Calendar events
        const now = new Date().toISOString();
        const calRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(now)}&maxResults=2&singleEvents=true&orderBy=startTime`, {
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
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}>
          <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 16, color: '#4285f4' }}>Google Tasks & Calendar</h1>
          <button
            onClick={loginGoogle}
            disabled={!googleReady}
            style={{
              opacity: googleReady ? 1 : 0.5,
              fontSize: 18,
              padding: '12px 32px',
              background: 'linear-gradient(90deg, #34a853 0%, #4285f4 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(52,168,83,0.08)',
              marginTop: 12,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)'}
            onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #34a853 0%, #4285f4 100%)'}
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
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      fontFamily: 'Inter, sans-serif',
      padding: '0',
    }}>
      <header style={{
        width: '100%',
        background: '#4285f4',
        color: '#fff',
        padding: '1.5rem 0',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 28,
        letterSpacing: 1,
        boxShadow: '0 2px 8px rgba(66,133,244,0.08)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 12, padding: 0 }}>
            <svg height="36" viewBox="0 0 48 48" width="36" style={{ verticalAlign: 'middle' }}>
              <circle cx="24" cy="24" r="22" fill="#4285f4" />
              <text x="24" y="30" textAnchor="middle" fontSize="20" fill="#fff" fontFamily="Inter, sans-serif">P</text>
            </svg>
          </button>
          <span>Google Tasks & Calendar</span>
        </div>
      </header>
      <main style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '0 1rem',
      }}>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#4285f4', marginBottom: 24, fontSize: 24 }}>
            Your Top 2 Tasks
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 18 }}>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 18 }}>No tasks found.</div>
          ) : (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {tasks.map((task) => (
                <div key={task.id} style={{
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(66,133,244,0.08)',
                  borderRadius: 12,
                  padding: '1.5rem 1.25rem',
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '1 1 240px',
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#4285f4', marginBottom: 8 }}>{task.title}</div>
                  <div style={{ color: '#64748b', marginBottom: 8 }}>{task.description}</div>
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
            </div>
          )}
        </section>
        <section>
          <h2 style={{ textAlign: 'center', fontWeight: 600, color: '#4285f4', marginBottom: 24, fontSize: 24 }}>
            Your Next 2 Calendar Entries
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 18 }}>Loading calendar entries...</div>
          ) : calendarEvents.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 18 }}>No upcoming events.</div>
          ) : (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {calendarEvents.map((event) => (
                <div key={event.id} style={{
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(66,133,244,0.08)',
                  borderRadius: 12,
                  padding: '1.5rem 1.25rem',
                  minWidth: 240,
                  maxWidth: 280,
                  flex: '1 1 240px',
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#4285f4', marginBottom: 8 }}>{event.subject}</div>
                  <div style={{ color: '#64748b', marginBottom: 8 }}>
                    {formatTime(event.start)} - {formatTime(event.end)}
                  </div>
                  <div style={{ color: '#64748b', marginBottom: 8 }}>{event.location}</div>
                </div>
              ))}
            </div>
          )}
        </section>
        {error && <div style={{ color: '#ef4444', marginTop: 24, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
      </main>
    </div>
  );
}


function App() {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkMsalRedirect() {
      await msalInstance.initialize();
      try {
        const response = await msalInstance.handleRedirectPromise();
        if (response && response.account) {
          navigate('/microsoft', { replace: true });
        }
      } catch (e) {}
    }
    checkMsalRedirect();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/microsoft" element={<MicrosoftPage />} />
      <Route path="/google" element={<GooglePage />} />
    </Routes>
  );
}

export default App;
