const totalLikes = blogs => blogs.reduce((sum, blog) => sum += blog.likes, 0);

const favoriteBlog = blogs => blogs.length > 0
  ? blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav, blogs[0])
  : undefined;

const mostBlogs = blogs => {
  if (blogs.length === 0) return undefined;
  const authorsRanked = blogs.reduce((ranking, blog) => {
    if (!ranking[blog.author]) ranking[blog.author] = 0;
    ranking[blog.author]++;
    if (ranking[blog.author] > ranking[ranking._most]) ranking._most = blog.author;
    return ranking;
  }, { _most: blogs[0].author });
  return { author: authorsRanked._most, blogs: authorsRanked[authorsRanked._most] };
}

const mostLikes = blogs => {
  if (blogs.length === 0) return undefined;
  return blogs
    .reduce((likeBlogs, blog) => {
      if (!likeBlogs.find(b => b.author === blog.author)) likeBlogs.push({ author: blog.author, likes: 0});
      likeBlogs.find(b => b.author === blog.author).likes += blog.likes;
      return likeBlogs;
    }, [])
    .reduce((winning, author) => author.likes > winning.likes ? author : winning ,{ author: '', likes: -1 })
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
