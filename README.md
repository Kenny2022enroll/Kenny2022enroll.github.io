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
            color: #333;
            margin: 0;
            padding: 0;
            background-image: url('https://s1.imagehub.cc/images/2025/02/09/650632c5ed30c771379da4a18f6022a2.jpeg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        header {
            background: rgba(51, 51, 51, 0.4); /* 半透明背景 */
            color: #fff;
            padding-top: 30px;
            min-height: 70px;
            border-bottom: #77aaff 3px solid;
            backdrop-filter: blur(70px); /* 毛玻璃效果 */
        }
        header h1 {
            text-align: center;
            margin: 0;
            padding-bottom: 10px;
        }
        nav {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 10px;
        }
        nav a {
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background 0.3s ease;
        }
        nav a:hover {
            background: rgba(119, 170, 255, 0.4); /* 半透明背景 */
            backdrop-filter: blur(70px); /* 毛玻璃效果 */
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
            width: 150px; /* 增加宽度以适应文本 */
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
            background: rgba(51, 51, 51, 0.4); /* 半透明背景 */
            color: #fff;
            text-align: center;
            padding: 10px;
            margin-top: 20px;
            backdrop-filter: blur(70px); /* 毛玻璃效果 */
        }
        .tools {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }
        .tool {
            background: rgba(226, 226, 226, 0.4); /* 半透明背景 */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            backdrop-filter: blur(70px); /* 毛玻璃效果 */
            width: 250px;
        }
        .tool:hover {
            background: rgba(119, 170, 255, 0.4); /* 半透明背景 */
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }
        .tool input[type="text"], .tool textarea {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.4); /* 半透明背景 */
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
        .hidden {
            display: none;
        }
    </style>
</head>

<body>
    <header>
        <div class="container">
            <h1>网页快捷导览</h1>
            <nav>
                <a href="#" onclick="showCategory('all')">全部</a>
                <a href="#" onclick="showCategory('blog')">博客</a>
                <a href="#" onclick="showCategory('community')">社区</a>
                <a href="#" onclick="showCategory('tools')">工具</a>
            </nav>
        </div>
    </header>
    <div class="container content">
        <!-- 博客类链接 -->
        <div class="category blog">
            <a href="https://foreverblog.cn/go.html">十年之约</a>
            <a href="https://zhblogs.ohyee.cc/go">中文博客</a>
            <a href="https://bokelu.suijiboke.gs/">博客录</a>
            <a href="https://blogscn.fun/random.html">笔墨迹</a>
        </div>
        <!-- 社区类链接 -->
        <div class="category community">
            <a href="https://www.boyouquan.com/planet-shuttle">博友圈</a>
            <a href="https://www.travellings.cn/go.html">开往</a>
        </div>
        <!-- 工具类链接 -->
        <div class="category tools">
            <a href="https://storeweb.cn/s/1656">个站商店</a>
            <a href="https://baidu.com/">百度</a>
            <a href="https://sz-api.ai-study.net/index.html">学习助手</a>
            <a href="https://basic.sh.smartedu.cn/airclassroom/">上海微校</a>
            <a href="https://www.kdocs.cn/">金山文档</a>
            <a href="https://chat18.aichatos.xyz/">AI 聊天</a>
            <a href="https://www.bilibili.com/">哔哩哔哩</a>
        </div>
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

        <div class="tool">
            <h3>随机密码生成</h3>
            <input type="text" id="passwordLength" placeholder="输入密码长度...">
            <button onclick="generatePassword()">生成</button>
            <input type="text" id="generatedPassword" placeholder="生成的密码..." readonly>
        </div>

        <div class="tool">
            <h3>日期计算</h3>
            <input type="date" id="startDate">
            <input type="date" id="endDate">
            <button onclick="calculateDate()">计算</button>
            <input type="text" id="dateResult" placeholder="相差天数..." readonly>
        </div>

        <div class="tool">
            <h3>BMI计算</h3>
            <input type="text" id="weight" placeholder="体重(kg)...">
            <input type="text" id="height" placeholder="身高(m)...">
            <button onclick="calculateBMI()">计算</button>
            <input type="text" id="bmiResult" placeholder="BMI结果..." readonly>
        </div>

        <div class="tool">
            <h3>货币换算</h3>
            <input type="text" id="currencyValue" placeholder="输入金额...">
            <select id="currencyFrom">
                <option value="USD">美元</option>
                <option value="CNY">人民币</option>
                <option value="EUR">欧元</option>
            </select>
            <select id="currencyTo">
                <option value="USD">美元</option>
                <option value="CNY">人民币</option>
                <option value="EUR">欧元</option>
            </select>
            <button onclick="convertCurrency()">换算</button>
            <input type="text" id="currencyResult" placeholder="换算结果..." readonly>
        </div>

        <div class="tool">
            <h3>IP查询</h3>
            <button onclick="getIP()">查询</button>
            <input type="text" id="ipResult" placeholder="IP地址..." readonly>
        </div>

        <div class="tool">
            <h3>二维码生成</h3>
            <input type="text" id="qrText" placeholder="输入文本...">
            <button onclick="generateQR()">生成</button>
            <div id="qrCode"></div>
        </div>

        <div class="tool">
            <h3>颜色选择器</h3>
            <input type="color" id="colorPicker">
            <input type="text" id="colorValue" placeholder="颜色值..." readonly>
        </div>

        <div class="tool">
            <h3>文本统计</h3>
            <textarea id="textStats" placeholder="输入文本..."></textarea>
            <button onclick="countText()">统计</button>
            <input type="text" id="textCount" placeholder="字符数..." readonly>
        </div>

        <div class="tool">
            <h3>时间戳转换</h3>
            <input type="text" id="timestamp" placeholder="输入时间戳...">
            <button onclick="convertTimestamp()">转换</button>
            <input type="text" id="timestampResult" placeholder="转换结果..." readonly>
        </div>

        <div class="tool">
            <h3>URL编码/解码</h3>
            <textarea id="urlText" placeholder="输入URL..."></textarea>
            <button onclick="encodeURL()">编码</button>
            <button onclick="decodeURL()">解码</button>
            <textarea id="urlResult" placeholder="结果..." readonly></textarea>
        </div>

        <div class="tool">
            <h3>MD5哈希</h3>
            <textarea id="md5Text" placeholder="输入文本..."></textarea>
            <button onclick="generateMD5()">生成</button>
            <input type="text" id="md5Result" placeholder="MD5哈希值..." readonly>
        </div>

        <div class="tool">
            <h3>Base64编码/解码</h3>
            <textarea id="base64Text" placeholder="输入文本..."></textarea>
            <button onclick="encodeBase64()">编码</button>
            <button onclick="decodeBase64()">解码</button>
            <textarea id="base64Result" placeholder="结果..." readonly></textarea>
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

        function generatePassword() {
            const length = document.getElementById('passwordLength').value;
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
            let password = "";
            for (let i = 0; i < length; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            document.getElementById('generatedPassword').value = password;
        }

        function calculateDate() {
            const startDate = new Date(document.getElementById('startDate').value);
            const endDate = new Date(document.getElementById('endDate').value);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            document.getElementById('dateResult').value = diffDays;
        }

        function calculateBMI() {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const bmi = (weight / (height * height)).toFixed(2);
            document.getElementById('bmiResult').value = bmi;
        }

        function convertCurrency() {
            const value = parseFloat(document.getElementById('currencyValue').value);
            const from = document.getElementById('currencyFrom').value;
            const to = document.getElementById('currencyTo').value;
            // 这里只是一个示例，实际货币换算需要调用API
            const rates = { USD: 1, CNY: 6.5, EUR: 0.85 };
            const result = (value * rates[to] / rates[from]).toFixed(2);
            document.getElementById('currencyResult').value = result;
        }

        function getIP() {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('ipResult').value = data.ip;
                });
        }

        function generateQR() {
            const text = document.getElementById('qrText').value;
            const qrCode = document.getElementById('qrCode');
            qrCode.innerHTML = '';
            new QRCode(qrCode, {
                text: text,
                width: 128,
                height: 128
            });
        }

        function countText() {
            const text = document.getElementById('textStats').value;
            document.getElementById('textCount').value = text.length;
        }

        function convertTimestamp() {
            const timestamp = document.getElementById('timestamp').value;
            const date = new Date(parseInt(timestamp) * 1000);
            document.getElementById('timestampResult').value = date.toLocaleString();
        }

        function encodeURL() {
            const text = document.getElementById('urlText').value;
            document.getElementById('urlResult').value = encodeURIComponent(text);
        }

        function decodeURL() {
            const text = document.getElementById('urlText').value;
            document.getElementById('urlResult').value = decodeURIComponent(text);
        }

        function generateMD5() {
            const text = document.getElementById('md5Text').value;
            const md5 = CryptoJS.MD5(text).toString();
            document.getElementById('md5Result').value = md5;
        }

        function encodeBase64() {
            const text = document.getElementById('base64Text').value;
            document.getElementById('base64Result').value = btoa(text);
        }

        function decodeBase64() {
            const text = document.getElementById('base64Text').value;
            document.getElementById('base64Result').value = atob(text);
        }

        // 分类显示逻辑
        function showCategory(category) {
            const allCategories = document.querySelectorAll('.category');
            allCategories.forEach(cat => {
                if (category === 'all' || cat.classList.contains(category)) {
                    cat.style.display = 'flex';
                } else {
                    cat.style.display = 'none';
                }
            });
        }

        // 默认显示
