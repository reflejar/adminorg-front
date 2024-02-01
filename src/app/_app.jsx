// /pages/_app.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { connect } from 'react-redux'
import SpinnerComponent from '@/components/spinner/spinner';

// Verifica la autenticación del usuario al cargar la aplicación
function App({ currentUser, children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const isAuthenticated = currentUser !== undefined

    if (router.pathname && !router.pathname.includes('auth') && !isAuthenticated) {
      router.push('/auth/login');
    }
    setLoading(false)
  }, [router.pathname, currentUser]);

  if (loading) return <SpinnerComponent />

  return <>{children}</>;
}

const mapStateToProps = (state) => ({
    currentUser: state.user.auth,
 });
 
export default connect(mapStateToProps, null)(App);