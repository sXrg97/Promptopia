"use client"

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { headers } from '@next.config';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='prompt_layout mt-16'>
      {data.map((post) => <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />)}
    </div>
  )
}

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt', {cache: 'no-cache'});
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search...' value={searchText} onChange={handleSearchChange} required className='search_input peer'/>
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed