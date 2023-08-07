import { logout } from 'features/auth/authSlice';
import { util as projectApiUtils } from 'features/project/projectApiSlice';
import { useAppDispatch } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { firebaseSignOut } from '@/firebase/firebaseConfig';

export default function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    dispatch(projectApiUtils.resetApiState());
    firebaseSignOut();
    navigate('/login');
  }, []);

  return <div></div>;
}
