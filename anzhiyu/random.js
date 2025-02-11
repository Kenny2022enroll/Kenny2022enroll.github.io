var posts=["1970/01/01/hello-world/","2025/02/10/my-first-blog/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };