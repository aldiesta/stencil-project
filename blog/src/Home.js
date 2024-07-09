import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
	const [blogs, setBlogs] = useState(null);
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			fetch('http://locahost:8000/blogs')
			.then(res => {
				return res.json();
			})
			.then((data) => {
				setBlogs(data);
				setIsPending(false);
			});
		}, 1000);
	}, []);

	return ( 
		// checks to see if Blogs is true first, if not, doesn't output bloglist
		<div className="home">
			{ isPending && <div>Loading...</div> }
			{blogs && <BlogList blogs={blogs} title="All Blogs!" />}
		</div>
	);
}
 
export default Home;