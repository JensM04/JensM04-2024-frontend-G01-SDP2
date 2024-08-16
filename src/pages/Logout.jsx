import { useEffect } from 'react';
import { useAuth } from '../contexts/Auth.context';
import useSWRMutation from 'swr/mutation';
import { update } from '../api';

export default function Logout() {
  const { isAuthed, logout } = useAuth();
  const {trigger: updateNotificaties} = useSWRMutation('notificaties', update);

  useEffect(() => {
    updateNotificaties();
    logout();
  }, [logout, updateNotificaties]);

  if (isAuthed) {
    return (
      <div >
        <div className='row'>
          <div className='col-12'>
            <h1>Logging out...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div >
      <div className='row'>
        <div className='col-12'>
          <h1>You were successfully logged out</h1>
        </div>
      </div>
    </div>
  );
}
