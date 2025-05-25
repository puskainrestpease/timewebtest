class SharagaApp {
    constructor() {
        this.token = null;
        this.user = null;
        this.init();
    }

    async init() {
        try {
            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.ready();
                window.Telegram.WebApp.expand();
            }
            this.token = new URLSearchParams(window.location.search).get('token');
            if (!this.token) {
                this.showAccessDenied();
                return;
            }
            await this.loadUserInfo();
            this.initInterface();
            await this.loadHomework();
            await this.loadDutySchedule();

        } catch (error) {
            console.error('Ошибка инициализации:', error);
            this.showAccessDenied();
        }
    }

    async loadUserInfo() {
        try {
            const response = await fetch(`/api/user?token=${this.token}`);
            
            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            
            this.user = await response.json();
            this.displayUserInfo();
            this.hideLoading();
            
        } catch (error) {
            this.showAccessDenied();
        }
    }

    displayUserInfo() {
        const avatar = document.getElementById('user-avatar');
        const username = document.getElementById('username');
        const stats = document.getElementById('user-stats');
        const firstLetter = this.user.first_name?.charAt(0) || this.user.username?.charAt(0) || '?';
        avatar.textContent = firstLetter.toUpperCase();
        const displayName = this.user.username || 'Пользователь';
        const fullName = this.user.first_name ? ` (${this.user.first_name})` : '';
        username.textContent = displayName + fullName;
        const adminBadge = this.user.is_admin ? ' 👑' : '';
        stats.textContent = `Команд выполнено: ${this.user.command_count}${adminBadge}`;
    }

    initInterface() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });
        const sendBtn = document.getElementById('send-gpt');
        const input = document.getElementById('gpt-input');
        sendBtn.addEventListener('click', () => this.sendGPTMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendGPTMessage();
            }
        });

        document.getElementById('main-app').classList.remove('hidden');
    }

    switchPage(pageName) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`${pageName}-page`).classList.add('active');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    }

    async loadHomework() {
        try {
            const response = await fetch(`/api/homework?token=${this.token}`);
            const data = await response.json();
            
            this.displayHomework(data);
        } catch (error) {
            console.error('Ошибка загрузки домашних заданий:', error);
            document.getElementById('homework-content').innerHTML = 
                '<div class="loading-placeholder">❌ Ошибка загрузки заданий</div>';
        }
    }

    displayHomework(data) {
        const container = document.getElementById('homework-content');
        
        if (!data.subjects || Object.keys(data.subjects).length === 0) {
            container.innerHTML = `
                <div class="subject-card">
                    <div class="subject-title">🎉 Заданий нет!</div>
                    <p>Сегодня можно отдохнуть</p>
                </div>
            `;
            return;
        }

        let html = '';
        for (const [subject, tasks] of Object.entries(data.subjects)) {
            html += `
                <div class="subject-card">
                    <div class="subject-title">${subject}</div>
                    <ul class="task-list">
                        ${tasks.map(task => `<li class="task-item">• ${task}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    async sendGPTMessage() {
        const input = document.getElementById('gpt-input');
        const messagesContainer = document.getElementById('chat-messages');
        const prompt = input.value.trim();
        if (!prompt) return;
        this.addMessage(prompt, 'user');
        input.value = '';
        const loadingMsg = this.addMessage('Думаю...', 'assistant');
        try {
            const response = await fetch('/api/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    token: this.token
                })
            });
            const data = await response.json();
            loadingMsg.textContent = data.response;
        } catch (error) {
            loadingMsg.textContent = '❌ Ошибка получения ответа';
            loadingMsg.style.color = '#e74c3c';
        }
    }
    addMessage(text, type) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return messageDiv;
    }
    async loadDutySchedule() {
        try {
            const response = await fetch(`/api/duty?token=${this.token}`);
            const data = await response.json();
            
            this.displayDutySchedule(data);
        } catch (error) {
            console.error('Ошибка загрузки дежурных:', error);
        }
    }
    displayDutySchedule(data) {
        const container = document.getElementById('duty-content');
        
        let html = `
            <div class="duty-section">
                <h3>👥 Дежурные сегодня</h3>
                <ul class="duty-list">
        `;
        
        if (data.today && data.today.length > 0) {
            data.today.forEach(name => {
                html += `<li class="duty-item"><span>${name}</span></li>`;
            });
        } else {
            html += `<li class="duty-item"><span>Нет данных</span></li>`;
        }
        
        html += `
                </ul>
            </div>
            <div class="duty-section">
                <h3>📅 Следующие дежурства</h3>
                <ul class="duty-list">
        `;
        
        if (data.upcoming && data.upcoming.length > 0) {
            data.upcoming.forEach(duty => {
                html += `
                    <li class="duty-item">
                        <span>${duty.name}</span>
                        <span>${duty.day} число</span>
                    </li>
                `;
            });
        } else {
            html += `<li class="duty-item"><span>Нет данных</span></li>`;
        }
        
        html += `
                </ul>
            </div>
        `;
        
        container.innerHTML = html;
    }
    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }
    showAccessDenied() {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('access-denied').classList.remove('hidden');
    }
}
window.loadHomework = async function() {
    if (window.app) {
        await window.app.loadHomework();
    }
};
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SharagaApp();
});
