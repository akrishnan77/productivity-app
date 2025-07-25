import { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";

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

function App() {
  const [account, setAccount] = useState(null);
  const [msalReady, setMsalReady] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function initMsal() {
      await msalInstance.initialize();
      if (!isMounted) return;
      setMsalReady(true);
      // Handle redirect login
      try {
        const response = await msalInstance.handleRedirectPromise();
        if (response && response.account) {
          setAccount(response.account);
        }
      } catch (e) {}
      // Check for cached account
      const currentAccounts = msalInstance.getAllAccounts();
      if (currentAccounts && currentAccounts.length > 0) {
        setAccount(currentAccounts[0]);
      }
    }
    initMsal();
    return () => { isMounted = false; };
    // eslint-disable-next-line
  }, []);

  const login = async () => {
    try {
      await msalInstance.initialize();
      await msalInstance.loginRedirect({ scopes: ["Tasks.Read", "Calendars.Read"] });
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch 2 tasks and 2 calendar entries directly from Microsoft Graph API
  useEffect(() => {
    async function fetchData() {
      if (!account) return;
      setLoading(true);
      setError(null);
      try {
        // Get access token
        const tokenResponse = await msalInstance.acquireTokenSilent({
          scopes: ["Tasks.Read", "Calendars.Read"],
          account,
        });
        const accessToken = tokenResponse.accessToken;

        // Fetch tasks directly from Graph API
        const tasksRes = await fetch("https://graph.microsoft.com/v1.0/me/todo/lists/tasks/tasks", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let tasksData = [];
        if (tasksRes.ok) {
          const allTasks = await tasksRes.json();
          tasksData = Array.isArray(allTasks.value) ? allTasks.value.slice(0, 2).map(t => ({
            id: t.id,
            title: t.title,
            description: t.body?.content || "",
            completed: t.status === "completed"
                    })) : [];
        }

        // Fetch calendar entries directly from Graph API
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
      <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "sans-serif", textAlign: "center" }}>
        {!msalReady ? (
          <div>Loading authentication...</div>
        ) : (
          <>
            <h1>Welcome</h1>
            <button onClick={login} style={{ fontSize: 18, padding: "10px 24px" }}>Sign in with Microsoft</button>
            {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Your Top 2 Tasks</h2>
      {loading ? (
        <div>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div>No tasks found.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: 16, background: "#f9f9f9", padding: 16, borderRadius: 8 }}>
              <strong>{task.title}</strong>
              <div>{task.description}</div>
              <div>Status: {task.completed ? "Completed" : "Not Started"}</div>
            </li>
          ))}
        </ul>
      )}
      <h2 style={{ textAlign: "center", marginTop: 32 }}>Your Next 2 Calendar Entries</h2>
      {loading ? (
        <div>Loading calendar entries...</div>
      ) : calendarEvents.length === 0 ? (
        <div>No upcoming events.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {calendarEvents.map((event) => (
            <li key={event.id} style={{ marginBottom: 16, background: "#f9f9f9", padding: 16, borderRadius: 8 }}>
              <strong>{event.subject}</strong>
              <div>{event.start} - {event.end}</div>
              <div>{event.location}</div>
            </li>
          ))}
        </ul>
      )}
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
    </div>
  );
}

export default App;
