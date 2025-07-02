var posts=["2025/06/05/To Persist or to Give Up/","2025/06/01/镜里镜外：自知与他知/","2025/05/25/博文栏目说明/","2025/07/02/阿德勒解梦——《自卑与超越》中关于“梦”的解释/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };