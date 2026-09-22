import { useEffect, useState } from 'react';
import './App.css';

const copy = {
  en: { home: 'Home', signIn: 'Sign in', open: 'Open account', dashboard: 'Dashboard', support: 'Support', logout: 'Log out', settings: 'Settings', background: 'Background', language: 'Language' },
  es: { home: 'Inicio', signIn: 'Iniciar sesión', open: 'Abrir cuenta', dashboard: 'Panel', support: 'Ayuda', logout: 'Cerrar sesión', settings: 'Ajustes', background: 'Fondo', language: 'Idioma' },
  fr: { home: 'Accueil', signIn: 'Se connecter', open: 'Ouvrir un compte', dashboard: 'Tableau de bord', support: 'Assistance', logout: 'Se déconnecter', settings: 'Paramètres', background: 'Arrière-plan', language: 'Langue' },
};

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')));
  const [theme, setTheme] = useState(() => localStorage.getItem('ledgerlyTheme') || 'paper');
  const [language, setLanguage] = useState(() => localStorage.getItem('ledgerlyLanguage') || 'en');
  const [toast, setToast] = useState(null);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('ledgerlyTheme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ledgerlyLanguage', language);
  }, [language]);

  useEffect(() => {
    const moveCursor = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', moveCursor);
    return () => window.removeEventListener('pointermove', moveCursor);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const text = copy[language];
  const navigate = (nextPage) => setPage(nextPage);
  const logout = () => { setUser(null); localStorage.removeItem('currentUser'); navigate('home'); };

  return (
    <div className="app-shell">
      <div className="cursor-spot" style={{ transform: `translate3d(${cursor.x - 90}px, ${cursor.y - 90}px, 0)` }} />
      <Header page={page} text={text} user={user} onNavigate={navigate} onLogout={logout} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />
      {page === 'home' && <HomePage onNavigate={navigate} />}
      {page === 'login' && <AuthCard mode="login" onNavigate={navigate} onLogin={setUser} onToast={setToast} />}
      {page === 'register' && <AuthCard mode="register" onNavigate={navigate} onToast={setToast} />}
      {page === 'dashboard' && <Dashboard user={user} onNavigate={navigate} onLogout={logout} />}
      {page === 'support' && <Support user={user} onNavigate={navigate} onToast={setToast} />}
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}

function Header({ page, text, user, onNavigate, onLogout, theme, setTheme, language, setLanguage }) {
  return <header className="navbar">
    <button className="brand" onClick={() => onNavigate('home')}>ledger<span>ly</span></button>
    <nav>
      <button className={page === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>{text.home}</button>
      {user && <button className={page === 'dashboard' ? 'active' : ''} onClick={() => onNavigate('dashboard')}>{text.dashboard}</button>}
      {user && <button className={page === 'support' ? 'active' : ''} onClick={() => onNavigate('support')}>{text.support}</button>}
      {!user && <button className={page === 'login' ? 'active' : ''} onClick={() => onNavigate('login')}>{text.signIn}</button>}
      {!user && <button className="nav-cta" onClick={() => onNavigate('register')}>{text.open}</button>}
      {user && <button onClick={onLogout}>{text.logout}</button>}
      <SettingsPanel {...{ text, theme, setTheme, language, setLanguage }} />
    </nav>
  </header>;
}

function SettingsPanel({ text, theme, setTheme, language, setLanguage }) {
  const [open, setOpen] = useState(false);
  return <div className="settings-wrap">
    <button className="settings-toggle" onClick={() => setOpen(!open)} aria-label="Open settings" aria-expanded={open}>⚙</button>
    {open && <div className="settings-panel">
      <h3>{text.settings}</h3>
      <label>{text.background}</label>
      <div className="theme-options">{['paper', 'sunset', 'night'].map((option) => <button key={option} className={theme === option ? 'selected' : ''} onClick={() => setTheme(option)}>{option}</button>)}</div>
      <label htmlFor="language">{text.language}</label>
      <select id="language" value={language} onChange={(event) => setLanguage(event.target.value)}><option value="en">English</option><option value="es">Español</option><option value="fr">Français</option></select>
    </div>}
  </div>;
}

function HomePage({ onNavigate }) {
  return <main>
    <section className="hero"><div><div className="eyebrow">Your money, in focus</div><h1>A calmer way to manage your money.</h1><p>Ledgerly brings your everyday finances into one clear, secure workspace. Know where you stand, and make your next move with confidence.</p><div className="cta"><button onClick={() => onNavigate('register')}>Create your account</button><button className="secondary" onClick={() => onNavigate('login')}>Sign in</button></div></div><aside className="hero-panel"><div className="eyebrow">This month</div><strong>$4,280.90</strong><small>Available balance</small><div className="mini-row"><span>Spending</span><b>-$1,240.50</b></div><div className="mini-row"><span>Savings rate</span><b>+12.4%</b></div></aside></section>
    <figure className="hero-visual"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80" alt="Person reviewing finances on a laptop" /><figcaption>Tools for the decisions that matter.</figcaption></figure>
  </main>;
}

function AuthCard({ mode, onNavigate, onLogin, onToast }) {
  const isLogin = mode === 'login';
  const [form, setForm] = useState({ name: '', email: '', password: '', userType: '' });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (isLogin) {
      const found = users.find((item) => item.email === form.email.trim().toLowerCase() && item.password === form.password);
      if (!found) return onToast({ message: 'Invalid email or password.', type: 'error' });
      localStorage.setItem('currentUser', JSON.stringify(found)); onLogin(found); onToast({ message: 'Welcome back.', type: 'success' }); onNavigate('dashboard'); return;
    }
    if (!form.name || !form.email || !form.password || !form.userType) return onToast({ message: 'Please complete every field.', type: 'error' });
    const newUser = { ...form, email: form.email.trim().toLowerCase(), status: 'active' };
    if (users.some((item) => item.email === newUser.email)) return onToast({ message: 'That email is already registered.', type: 'error' });
    localStorage.setItem('users', JSON.stringify([...users, newUser])); onToast({ message: 'Account created. Sign in to continue.', type: 'success' }); onNavigate('login');
  };
  return <main className="form-container"><div className="eyebrow">{isLogin ? 'Welcome back' : 'Start fresh'}</div><h2>{isLogin ? 'Sign in to Ledgerly' : 'Open your account'}</h2><p>{isLogin ? 'Your financial overview is waiting.' : 'It takes less than two minutes to get set up.'}</p><form onSubmit={submit}>{!isLogin && <Field label="Full name" name="name" placeholder="Alex Morgan" value={form.name} onChange={update} />}<Field label="Email address" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={update} /><Field label="Password" name="password" type="password" placeholder="Choose a secure password" value={form.password} onChange={update} />{!isLogin && <><label htmlFor="userType">I am using Ledgerly as a</label><select id="userType" name="userType" value={form.userType} onChange={update}><option value="">Select a profile</option><option value="student">Student</option><option value="professional">Professional</option><option value="business">Business owner</option></select></>}<button type="submit">{isLogin ? 'Sign in' : 'Create account'}</button></form><p className="form-note">{isLogin ? 'New to Ledgerly? ' : 'Already have an account? '}<button className="text-button" onClick={() => onNavigate(isLogin ? 'register' : 'login')}>{isLogin ? 'Create an account' : 'Sign in'}</button></p></main>;
}

function Field({ label, name, type = 'text', placeholder, value, onChange }) { return <><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required /></>; }

function Dashboard({ user, onNavigate, onLogout }) {
  if (!user) return <EmptyState message="Sign in to view your dashboard." action="Sign in" onClick={() => onNavigate('login')} />;
  return <main className="dashboard"><div className="dashboard-head"><div><div className="eyebrow">Overview</div><h1>Good to see you, {user.name}.</h1><p className="dashboard-intro">Here is your latest account snapshot.</p></div><button className="outline-btn" onClick={onLogout}>Log out</button></div><div className="user-strip"><div><small>Signed in as</small><strong>{user.email}</strong></div><div className="eyebrow">Account active</div></div><div className="card-container"><Stat title="Account status" value="Active" /><Stat title="User type" value={user.userType} /><Stat title="Available balance" value="$4,280.90" /></div></main>;
}

function Stat({ title, value }) { return <article className="card"><h3>{title}</h3><p>{value}</p></article>; }

function Support({ user, onNavigate, onToast }) {
  const [ticket, setTicket] = useState({ subject: '', message: '' });
  const submit = (event) => { event.preventDefault(); if (!ticket.subject || !ticket.message) return onToast({ message: 'Please complete both fields.', type: 'error' }); const tickets = JSON.parse(localStorage.getItem('supportTickets')) || []; localStorage.setItem('supportTickets', JSON.stringify([...tickets, { ...ticket, email: user?.email, createdAt: new Date().toISOString() }])); setTicket({ subject: '', message: '' }); onToast({ message: 'Your message has been sent.', type: 'success' }); };
  if (!user) return <EmptyState message="Sign in to contact support." action="Sign in" onClick={() => onNavigate('login')} />;
  return <><figure className="support-visual"><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80" alt="Support team collaborating at a desk" /></figure><main className="form-container"><div className="eyebrow">We are here to help</div><h2>Talk to support</h2><p>Send us a note and our team will get back to you shortly.</p><form onSubmit={submit}><Field label="Subject" name="subject" placeholder="What can we help with?" value={ticket.subject} onChange={(event) => setTicket({ ...ticket, subject: event.target.value })} /><label htmlFor="message">Message</label><textarea id="message" value={ticket.message} onChange={(event) => setTicket({ ...ticket, message: event.target.value })} placeholder="Tell us a little more..." required /><button type="submit">Send message</button></form></main></>;
}

function EmptyState({ message, action, onClick }) { return <main className="empty-state"><div className="eyebrow">Ledgerly</div><h1>{message}</h1><button onClick={onClick}>{action}</button></main>; }

export default App;
