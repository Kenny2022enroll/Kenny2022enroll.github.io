gsap.registerPlugin(ScrollTrigger);

// 保留优化后的英雄区文字动画（删除重复的旧动画）
const heroText = gsap.timeline({ delay: 0.3 });
heroText.from('#hero .text', {
  y: 180,
  opacity: 0,
  duration: 1.5,
  ease: 'power1.out'
})
.from('#hero .text h1', {
  textShadow: '0 0 15px rgba(0,168,232,0)',
  duration: 0.8,
  ease: 'power1.inOut',
  stagger: 0.1,
  onUpdate: function() {
    const progress = this.progress();
    const hue = 190 + progress * 30;
    this.targets()[0].style.textShadow = `0 0 ${15 * progress}px rgba(${hue}, 255, 255, ${progress * 0.8})`;
  }
});

// 保留优化后的卡片动画（删除重复的旧卡片动画）
gsap.from('.card', {
  y: 300,
  opacity: 0,
  scale: 0.85,
  rotationX: 15,
  stagger: {
    amount: 0.5,
    from: 'random'
  },
  duration: 1.4,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#cards',
    start: 'top 85%'
  }
});

// Parallax 星空
// 星空视差优化（模拟航天器轨道运动）
gsap.to('#starfield', {
  yPercent: -40,          // 垂直视差（降低速度更自然）
  rotationY: 15,          // 沿Y轴旋转（模拟侧向轨道运动）
  rotationX: 5,           // 沿X轴微旋转（增强空间感）
  ease: 'none',           // 完全匀速运动
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom top',
    scrub: 2              // 更高scrub值使运动更平滑跟随滚动
  }
});

// 增强滚动动画效果
// 1. 英雄区文字更具冲击力的入场动画
gsap.from('#hero .text', {
  y: 150,
  opacity: 0,
  duration: 1.5,
  ease: 'power4.out',
  delay: 0.3
});

// 2. 卡片入场动画修改为"发射"效果
gsap.from('.card', {
  y: 200,
  opacity: 0,
  scale: 0.95,  // 初始缩小
  stagger: 0.15,
  duration: 0.8,
  ease: 'back.out(1.2)',  // 回弹效果
  scrollTrigger: {
    trigger: '#cards',
    start: 'top 85%'
  }
});

// 3. 添加滚动时的导航栏变化效果
// 导航栏滚动动画（科技界面激活效果）
gsap.to('header', {
  padding: '0.7rem 3rem',
  background: 'rgba(0,0,0,0.98)',  // 更接近纯黑（模拟OLED屏幕）
  boxShadow: '0 0 20px rgba(0,168,232,0.15)',  // 蓝色辉光边框
  duration: 0.6,
  ease: 'power1.inOut',
  scrollTrigger: {
    trigger: 'body',
    start: 'top 5%',
    end: 'top -10%',
    scrub: true,
    onEnter: () => gsap.to('header', { boxShadow: '0 0 30px rgba(0,168,232,0.2)', duration: 0.5 })  // 滚动时增强辉光
  }
});

// 星空视差优化（添加量子波动效果）
gsap.to('#starfield', {
  yPercent: -40,
  rotationY: 20,          // 增加Y轴旋转角度（更明显的侧向轨道）
  rotationX: 8,           // 增加X轴旋转（增强空间扭曲感）
  rotationZ: () => Math.random() * 3,  // 随机Z轴旋转（模拟量子不确定性）
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom top',
    scrub: 3              // 更高scrub值（更平滑的跟随感）
  }
});

// 添加科技感扫描线效果（模拟雷达/全息扫描）
const scanline = gsap.timeline({ repeat: -1 });
scanline.to('#hero', {
  backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0,168,232,0.03) 51%, transparent 52%)',
  backgroundSize: '100% 4px',
  duration: 4,
  ease: 'linear'
});
