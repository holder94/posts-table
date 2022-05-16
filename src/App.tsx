import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Input from './components/input/Input';
import Table from './components/table/Table';

import './App.css';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[] | null>(null);

  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = parseInt(page!);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then((data: IPost[]) => {
        setPosts(data);
      });
  }, []);

  const onSearchStringChange = (str: string) => {
    navigate('/1');

    if (str === '') {
      setFilteredPosts(null);
      return;
    }

    setFilteredPosts(
      posts.filter(
        ({ id, title, body }) =>
          id.toString().includes(str) ||
          title.includes(str) ||
          body.includes(str)
      )
    );
  };

  if (posts.length === 0) {
    return null;
  }

  if (isNaN(currentPage)) {
    return <h1>Invalid page number</h1>;
  }

  return (
    <>
      <div className='App'>
        <Input onSearchStringChange={onSearchStringChange} />
        <Table posts={filteredPosts === null ? posts : filteredPosts} />
      </div>
    </>
  );
}

export default App;
