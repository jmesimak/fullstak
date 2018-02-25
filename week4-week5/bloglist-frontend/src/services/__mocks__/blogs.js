let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "myster",
    url: "https://fullstack-hy.github.io/",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "whodis",
      name: "Mystery Mayne"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    content: "JS on helppoa",
    author: "myster",
    url: "https://fullstack-hy.github.io/",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "whodis",
      name: "Mystery Mayne"
    }
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }