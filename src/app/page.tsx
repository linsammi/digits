/** Digits landing page. */
export default function Home() {
  return (
    <main style={{
      minHeight: '85vh',
      backgroundColor: '#f5f7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px'
    }}>
      <div>
        <h1 style={{ color: '#080080', fontSize: '3.5rem', fontWeight: 'bold' }}>
          Welcome to Digits
        </h1>
        <p style={{ fontSize: '1.4rem', marginTop: '20px' }}>
          Your Personal Contact Manager
        </p>
        <p style={{ color: '#666', marginBottom: '35px' }}>
          Organize contacts, manage information, and keep important notes in one place.
        </p>
        <a href="/auth/signup" className="btn btn-primary btn-lg me-3">
          Get Started
        </a>
        <a href="/auth/signin" className="btn btn-outline-primary btn-lg">
          Sign In
        </a>
      </div>
    </main>
  );
}
