import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [invites, setInvites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [succes, setSucces] = React.useState(false)

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(json => {
      setUsers(json.data)
    })
    .catch(err => {
      console.warn(err)
      alert("Ошибка при получении пользователей")
    })
    .finally(() => setIsLoading(false))
  }, [])

  const onChangeSearchValue = (event) =>{
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    }else{
      setInvites(prev => [...prev, id])
    }
  }

  const onClickSendInvites = () => {
    setSucces(true)
  }

  return (
    <div className="App">
      {succes ? (
        <Success count={invites.length} /> 
      ) : (
      <Users
      searchValue={searchValue}
      onChangeSearchValue={onChangeSearchValue}
      items={users}
      onClickInvite={onClickInvite}
      invites={invites}
      isLoading={isLoading}
      onClickSendInvites={onClickSendInvites}/> )}
    </div>
  );
}

export default App;
