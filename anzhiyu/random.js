var posts=["2025/05/25/博文栏目说明/","2025/06/01/镜里镜外：自知与他知/","2025/06/05/To Persist or to Give Up/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };