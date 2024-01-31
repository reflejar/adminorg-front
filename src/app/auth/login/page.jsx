'use client'
'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import { userActions } from '@/redux/actions/user';
import Spinner from '@/components/spinner/spinner';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [state, setState] = useState({
    username: '',
    password: '',
    error: '',
    isChecked: true,
    loading: false,
  });


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const logginUser = async () => {
    setState({ ...state, loading: true });

    const { username, password } = state;

    if (username && password) {
      const user = await dispatch(userActions.login(username, password));
      if (user) {
        if (user.user.group === 'administrativo') {
          router.push('/cuentas-a-cobrar');
        } else {
          router.push('/deudas');
        }
      } else {
        setState({ ...state, error: 'Usuario o contraseña incorrecta' });
      }
    }

    setState({ ...state, loading: false });
  };

  return (
      <div className="bg-gradient vh-100 d-flex align-items-center justify-content-center">
        <div className="col-md-6 col-lg-3">
          <div className="card py-5 px-3">
            <div className="card-body text-center">
              {state.loading ? <Spinner /> : <>
                <Image src='/img/logo.png' width={0} height={0} style={{ width: '55%', height: '10vh' }} alt="Logo de AdminSmart" className='mb-4' />
                <input
                    type="text"
                    className="form-control my-3"
                    name="username"
                    id="username"
                    placeholder="Usuario"
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="form-control my-3"
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    required
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn btn-secondary my-3"
                    onClick={logginUser}
                    style={{ width: '100%' }}
                >
                    Ingresar
                </button>
                {state.error && <p className="text-danger">{state.error}</p>}
              </>}
              
            </div>
          </div>

        </div>
      </div>
  );
};

export default Login;
