var posts=["2025/02/12/2月总结（更新中）/","2025/02/12/我的原则/","2025/02/12/对高效提分的研究（更新中）/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };