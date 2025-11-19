// interaction logic.js

document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatBody = document.querySelector('.div-body');
    
    // 获取当前时间并格式化为 HH:MM
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // 创建右侧消息（自己发送的消息）
    function createRightMessage(content) {
        const messageTime = getCurrentTime();
        
        const rightMsgDiv = document.createElement('div');
        rightMsgDiv.className = 'right-msg';
        
        rightMsgDiv.innerHTML = `
            <div class="header-picture-r">
                <img class="profile-picture-r" src="/profile picture/wechat-header.webp" alt="头像">
            </div>
            <div class="msg-and-time-r">
                <div class="msg-time">${messageTime}</div>
                <div class="msg-r">${content}</div>
            </div>
        `;
        
        return rightMsgDiv;
    }
    
    // 创建左侧消息（对方消息）- 用于模拟回复（可选功能）
    function createLeftMessage(content) {
        const messageTime = getCurrentTime();
        
        const leftMsgDiv = document.createElement('div');
        leftMsgDiv.className = 'left-msg';
        
        leftMsgDiv.innerHTML = `
            <div class="header-picture-l">
                <img class="profile-picture-l" src="/profile picture/wechat-default2.0.png" alt="对方头像">
            </div>
            <div class="msg-and-time-l">
                <div class="msg-time">${messageTime}</div>
                <div class="msg-l"><span>${content}</span></div>
            </div>
        `;
        
        return leftMsgDiv;
    }
    
    // 发送消息的主要函数
    function sendMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            return; // 如果消息为空，不执行任何操作
        }
        
        // 创建并添加右侧消息（自己发送的消息）
        const newMessage = createRightMessage(message);
        chatBody.appendChild(newMessage);
        
        // 清空输入框
        messageInput.value = '';
        
        // 自动滚动到底部
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // 可选：模拟对方回复（延迟2-3秒后自动回复）
        simulateReply(message);
    }
    
    // 模拟对方回复功能（可选）
    function simulateReply(userMessage) {
        const replies = {
            '你好': '你好！很高兴和你聊天！',
            '在吗': '在的，有什么可以帮你的吗？',
            '谢谢': '不客气！',
            'hello': 'Hello! How are you?',
            '晚上好':'晚上好，今天过得怎么样:)',
            '你的名字叫什么':'你好，我的名字是扶苏，你的私人学习助手',
            '你好啊': '我很好，谢谢！你呢？'
        };
        
        // 检查是否有预设回复
        let reply = replies[userMessage] || '收到你的消息了！';
        
        // 如果消息较长，使用通用回复
        if (userMessage.length > 10) {
            reply = '很有意思的观点！';
        }
        
        // 2-3秒后自动回复
        setTimeout(() => {
            const leftMessage = createLeftMessage(reply);
            chatBody.appendChild(leftMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 2000 + Math.random() * 1000);
    }
    
    // 事件监听器：点击发送按钮[1](@ref)
    sendBtn.addEventListener('click', sendMessage);
    
    // 事件监听器：按Enter键发送，按Shift+Enter换行[4](@ref)
    messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                event.preventDefault(); // 阻止默认的换行行为
                sendMessage();
            }
            // 如果按Shift+Enter，允许换行（默认行为）
        }
    });
    
    // 增强用户体验：输入框获得焦点时自动调整高度[1](@ref)
    messageInput.addEventListener('focus', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // 输入框输入时自动调整高度
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // 增强功能：防止重复快速点击[1](@ref)
    let isSending = false;
    const originalSendHandler = sendBtn.onclick;
    
    sendBtn.addEventListener('click', function() {
        if (isSending) return;
        
        isSending = true;
        sendBtn.disabled = true;
        sendBtn.textContent = '发送中...';
        
        // 恢复按钮状态（使用finally确保执行）[1](@ref)
        setTimeout(() => {
            sendBtn.disabled = false;
            sendBtn.textContent = '发送';
            isSending = false;
        }, 1000);
    });
    
    // 页面加载时自动聚焦到输入框
    messageInput.focus();
    
    console.log('微信聊天界面JavaScript加载完成');
});