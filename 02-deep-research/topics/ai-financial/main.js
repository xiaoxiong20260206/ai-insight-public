// ===== 主入口 =====
document.addEventListener('DOMContentLoaded', function() {
    initStats();
    initPriorityCards();
    initTables();
    initAgentCards();
    renderNetworkGraph();
    
    // 窗口resize时重绘关系图
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            renderNetworkGraph();
        }, 300);
    });
});

// ===== 初始化统计数据 =====
function initStats() {
    let totalTasks = 0;
    let researchTasks = 0;
    let operationTasks = 0;
    
    // 统计投研场景任务
    Object.values(taskData.research.subcategories).forEach(subcat => {
        researchTasks += subcat.tasks.length;
    });
    
    // 统计运营合规场景任务
    Object.values(taskData.operation.subcategories).forEach(subcat => {
        operationTasks += subcat.tasks.length;
    });
    
    totalTasks = researchTasks + operationTasks;
    
    // 动画更新数字
    animateNumber('total-tasks', totalTasks);
    animateNumber('research-tasks', researchTasks);
    animateNumber('operation-tasks', operationTasks);
}

// ===== 数字动画 =====
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeProgress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ===== 初始化优先级卡片 =====
function initPriorityCards() {
    const container = document.getElementById('priority-cards');
    
    priorityData.forEach(priority => {
        const card = document.createElement('div');
        card.className = `priority-card ${priority.level.toLowerCase()}`;
        
        const agentBadges = priority.agents.map(agent => {
            const agentInfo = agentData[agent];
            return `<span class="agent-badge ${agentInfo.cssClass} mini">${agentInfo.icon} ${agent}</span>`;
        }).join('');
        
        card.innerHTML = `
            <div class="priority-header">
                <span class="priority-badge ${priority.level.toLowerCase()}">${priority.level}</span>
                <span class="priority-title">${priority.title}</span>
            </div>
            <div class="priority-coverage">${priority.coverage}</div>
            <div class="priority-agents">${agentBadges}</div>
        `;
        
        container.appendChild(card);
    });
}

// ===== 初始化表格 =====
function initTables() {
    renderTable('research-table', taskData.research);
    renderTable('operation-table', taskData.operation);
}

function renderTable(tableId, sceneData) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';
    
    Object.entries(sceneData.subcategories).forEach(([subcatName, subcat], subcatIndex) => {
        subcat.tasks.forEach((task, taskIndex) => {
            const row = document.createElement('tr');
            
            // 时间占比样式
            let timeClass = 'time-verylow';
            if (task.timePercent >= 10) {
                timeClass = 'time-high';
            } else if (task.timePercent >= 3) {
                timeClass = 'time-medium';
            } else if (task.timePercent >= 1) {
                timeClass = 'time-low';
            }
            
            // 产品链接
            const productLinksHtml = task.products.map(product => {
                const url = productLinks[product];
                if (url) {
                    return `<a href="${url}" target="_blank" class="product-link">${product}</a>`;
                }
                return product;
            }).join(', ');
            
            // Agent徽章
            const agentInfo = agentData[task.agent];
            const agentBadge = agentInfo 
                ? `<span class="agent-badge ${agentInfo.cssClass} mini">${agentInfo.icon} ${task.agent}</span>`
                : task.agent;
            
            // 子类单元格（只在第一个任务时显示）
            const subcatCell = taskIndex === 0 
                ? `<td class="subcat-cell first" rowspan="${subcat.tasks.length}">${subcatName}<br><small style="color:#64748B">${subcat.timePercent}%</small></td>`
                : '';
            
            row.innerHTML = `
                ${subcatCell}
                <td>${task.name}</td>
                <td class="${timeClass}">${task.timePercent}%</td>
                <td>${agentBadge}</td>
                <td>${task.tech}</td>
                <td>${productLinksHtml}</td>
                <td style="font-size:0.85em;color:#64748B">${task.example}</td>
            `;
            
            tbody.appendChild(row);
        });
    });
}

// ===== 初始化Agent卡片 =====
function initAgentCards() {
    const container = document.getElementById('agents-cards');
    
    Object.entries(agentData).forEach(([agentKey, agent]) => {
        const card = document.createElement('div');
        card.className = `agent-card ${agent.cssClass}`;
        
        const techTags = agent.techs.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="agent-card-header">
                <div class="agent-card-icon">${agent.icon}</div>
                <div>
                    <div class="agent-card-title">${agent.name}</div>
                    <div class="agent-card-coverage">覆盖率 <span>${agent.coverage}%</span></div>
                </div>
            </div>
            <div class="agent-card-desc">${agent.description}</div>
            <div class="agent-card-techs">${techTags}</div>
        `;
        
        container.appendChild(card);
    });
}

// ===== 工具函数 =====
function getTimeClass(percent) {
    if (percent >= 10) return 'time-high';
    if (percent >= 3) return 'time-medium';
    if (percent >= 1) return 'time-low';
    return 'time-verylow';
}
