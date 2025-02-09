<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="网页导览，快捷">
    <meta name="description" content="网页快捷导览">
    <meta name="author" content="Kenny">
    <title>网页快捷导览</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        header {
            background: #333;
            color: #fff;
            padding-top: 30px;
            min-height: 70px;
            border-bottom: #77aaff 3px solid;
        }
        header h1 {
            text-align: center;
            margin: 0;
            padding-bottom: 10px;
        }
        .content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin-top: 20px;
        }
        .content a {
            text-decoration: none;
            color: #333;
            background: #e2e2e2;
            padding: 20px;
            margin: 10px;
            width: 100px;
            text-align: center;
            border-radius: 10px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .content a:hover {
            background: #77aaff;
            color: #fff;
            transform: translateY(-10px) rotateX(20deg);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        footer {
            background: #333;
            color: #fff;
            text-align: center;
            padding: 10px;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <header>
        <div class="container">
            <h1>网页快捷导览</h1>
        </div>
    </header>

    <div class="container content">
        <a href="https://baidu.com/">百度</a>
        <a href="https://sz-api.ai-study.net/index.html">学习助手</a>
        <a href="https://basic.sh.smartedu.cn/airclassroom/">上海微校</a>
        <a href="https://www.kdocs.cn/">金山文档</a>
        <a href="https://chat18.aichatos.xyz/">AI 聊天</a>
        <a href="https://www.douyin.com/">抖音</a>
        <a href="https://www.bilibili.com/">哔哩哔哩</a>
    </div>

</body>

</html>
