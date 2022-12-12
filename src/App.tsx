import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { storeAnnotation } from 'mobx/dist/internal';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

function App() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [me, setMe] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser[]>([]);
  const [userId, setId] = useState<string>('');
  
  useEffect(() => {
      if (localStorage.getItem('token')) {
        store.checkAuth()
      }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneUser(userId: string) {
    try {
      const response = await UserService.fetchOneUser(userId);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getMeInfo(id: string) {
    try {
      const response = await UserService.fetchMeInfo(id);
      setMe(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if(store.isLoading) {
    return <div>Загрузка...</div>
  }

  if(!store.isAuth) {
    return (
      <div>
        <LoginForm/>
      </div>
    )
  }

  return (
    <div>
      <h1>{store.isAuth ? 'Пользоваетль авторизован' : 'АВТОРИЗУЙТЕСЬ'}</h1>
        <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={() => getMeInfo(store.user.id)}>Получить информацию обо мне</button>
      </div>
      {me.map(user => 
        <div key={user.email}>{`Вы авторизованы как ${user.email}`}</div>  
      )}
      <div>
        <button onClick={getUsers}>Получить список пользователей</button>
      </div>
      {users.map(user => 
        <div key={user.email}>{user.email}</div>
      )}
      <input
                onChange={e => setId(e.target.value)}
                value={userId}
                type="text"
                placeholder='ID'

            />
      <div>
        <button onClick={() => getOneUser(userId)}>Получить информацию о пользователе</button>
      </div>
      {user.map(user => 
        <div key={user.email}>{`Пользователь ${user.email} существует`}</div>  
      )}
    </div>
  );
}

export default observer(App);