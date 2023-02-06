import styles from '@/styles/Home.module.css'
import { trpc } from '@/utils/trcp'
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const users = trpc.users.useQuery();
  const userCreate = trpc.userCreate.useMutation({ });

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      age: Math.floor(Math.random() * 10),
    }
    await userCreate.mutate(newUser, { onSuccess: () => {
      users.refetch();
      setName('');
    }});
  }
  
  if (!users?.data?.length) {
    return (
      <div style={styles}>
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <div style={styles}>
      <form onSubmit={onSubmit}>
        <h1>Create new user</h1>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul className={styles.list}>
        {users.data?.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
