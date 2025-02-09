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
        .tools {
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
        .tool {
            background: #e2e2e2;
            padding: 10px 20px;
            margin: 0 10px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .tool:hover {
            background: #77aaff;
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }
        .tool input[type="text"], .tool textarea {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .tool button {
            padding: 10px 20px;
            margin-top: 10px;
            background: #77aaff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .tool button:hover {
            background: #5588ff;
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

    <div class="container tools">
        <div class="tool">
            <h3>文本加密</h3>
            <textarea id="encryptText" placeholder="输入需要加密的文本..."></textarea>
            <button onclick="encrypt()">加密</button>
            <textarea id="encryptedResult" placeholder="加密结果..." readonly></textarea>
        </div>

        <div class="tool">
            <h3>文本翻译</h3>
            <input type="text" id="translateText" placeholder="输入需要翻译的文本...">
            <button onclick="translate()">翻译</button>
            <input type="text" id="translatedResult" placeholder="翻译结果..." readonly>
        </div>

        <div class="tool">
            <h3>单位换算</h3>
            <input type="text" id="convertValue" placeholder="输入数值...">
            <select id="convertFrom">
                <option value="cm">厘米</option>
                <option value="m">米</option>
                <option value="km">千米</option>
            </select>
            <select id="convertTo">
                <option value="cm">厘米</option>
                <option value="m">米</option>
                <option value="km">千米</option>
            </select>
            <button onclick="convert()">换算</button>
            <input type="text" id="convertResult" placeholder="换算结果..." readonly>
        </div>
    </div>

    <footer>
        <div class="container">
            <p>&copy; 2025 Kenny. All Rights Reserved.</p>
        </div>
    </footer>

    <script>
        function encrypt() {
            const text = document.getElementById('encryptText').value;
            const encrypted = btoa(text); // 使用Base64加密
            document.getElementById('encryptedResult').value = encrypted;
        }

        function translate() {
            const text = document.getElementById('translateText').value;
            // 这里只是一个示例，实际翻译需要调用翻译API
            const translated = text.split('').reverse().join(''); // 示例：反转字符串
            document.getElementById('translatedResult').value = translated;
        }

        function convert() {
            const value = parseFloat(document.getElementById('convertValue').value);
            const from = document.getElementById('convertFrom').value;
            const to = document.getElementById('convertTo').value;

            let result;
            if (from === 'cm' && to === 'm') {
                result = value / 100;
            } else if (from === 'cm' && to === 'km') {
                result = value / 100000;
            } else if (from === 'm' && to === 'cm') {
                result = value * 100;
            } else if (from === 'm' && to === 'km') {
                result = value / 1000;
            } else if (from === 'km' && to === 'cm') {
                result = value * 100000;
            } else if (from === 'km' && to === 'm') {
                result = value * 1000;
            } else {
                result = value; // 同单位
            }

            document.getElementById('convertResult').value = result.toFixed(2);
        }
    </script>
</body>

</html>
