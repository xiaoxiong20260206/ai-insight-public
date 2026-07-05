// ==================== 全局状态 ====================
let currentRole = 'all';
let highlightedNodes = new Set();
let currentAgentDesign = 'Chatbot';
let currentConnections = []; // 缓存当前连接线数据供resize使用

// DOM查询缓存（避免重复querySelectorAll）
let _cachedNodes = null;
let _cachedLines = null;

function getCachedNodes() {
    if (!_cachedNodes || !_cachedNodes.length) _cachedNodes = document.querySelectorAll('.graph-node');
    return _cachedNodes;
}
function getCachedLines() {
    if (!_cachedLines || !_cachedLines.length) _cachedLines = document.querySelectorAll('.connection-line');
    return _cachedLines;
}
function clearDOMCache() {
    _cachedNodes = null;
    _cachedLines = null;
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    initMainTabs();
    initRoleTabs();
    renderAgentCards();
    renderTables();
    initTooltip();
    initAgentDesignTabs();
    renderAgentDesign('Chatbot');
    initGlobalControls();
    // 延迟渲染关系图（仅在对应Tab激活时）
});

// ==================== 主Tab导航切换 ====================
function initMainTabs() {
    const tabs = document.querySelectorAll('.tab-nav .tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有active
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => p.classList.remove('active'));
            
            // 添加active
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panelId = tab.dataset.tab;
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.classList.add('active');
            }
            
            // 如果切换到岗位场景Tab，渲染关系图
            if (panelId === 'section-roles') {
                setTimeout(() => renderGraph(), 100);
            }
        });
    });
}

// ==================== 全局控制按钮 ====================
function initGlobalControls() {
    // 全屏按钮
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // 移动端预览按钮
    const mobilePreviewBtn = document.getElementById('mobilePreviewBtn');
    if (mobilePreviewBtn) {
        mobilePreviewBtn.addEventListener('click', toggleMobilePreview);
    }
    
    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', () => {
        const btn = document.getElementById('fullscreenBtn');
        if (btn) {
            if (document.fullscreenElement) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });
    
    // ESC键退出移动端预览
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('mobile-preview-mode')) {
            toggleMobilePreview();
        }
    });
}

function toggleFullscreen() {
    const btn = document.getElementById('fullscreenBtn');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            btn.classList.add('active');
        }).catch(err => {
            console.log('全屏失败:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            btn.classList.remove('active');
        });
    }
}

function toggleMobilePreview() {
    const btn = document.getElementById('mobilePreviewBtn');
    const body = document.body;
    
    if (body.classList.contains('mobile-preview-mode')) {
        body.classList.remove('mobile-preview-mode');
        btn.classList.remove('active');
    } else {
        body.classList.add('mobile-preview-mode');
        btn.classList.add('active');
    }
}

// ==================== 角色选择器 ====================
function initRoleTabs() {
    const tabs = document.querySelectorAll('.role-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentRole = tab.dataset.role;
            renderGraph();
            renderTables();
            updateStats();
        });
    });
}

// ==================== 更新统计数据 ====================
function updateStats() {
    const totalRolesEl = document.getElementById('totalRoles');
    const totalTasksEl = document.getElementById('totalTasks');
    
    if (currentRole === 'all') {
        totalRolesEl.textContent = '10';
        totalTasksEl.textContent = '180+';
    } else {
        totalRolesEl.textContent = '1';
        const role = roleData[currentRole];
        let taskCount = 0;
        Object.values(role.scenes).forEach(scene => {
            taskCount += scene.tasks.length;
        });
        totalTasksEl.textContent = taskCount;
    }
}

// ==================== 渲染Agent卡片 ====================
function renderAgentCards() {
    const container = document.getElementById('agentsGrid');
    container.innerHTML = '';
    
    Object.entries(agentData).forEach(([key, agent]) => {
        const card = document.createElement('div');
        card.className = 'agent-card';
        card.innerHTML = `
            <div class="agent-card-header">
                <span class="agent-card-icon">${agent.icon}</span>
                <span class="agent-card-title">${agent.name}</span>
            </div>
            <div class="agent-card-coverage">
                <div class="coverage-bar">
                    <div class="coverage-fill" style="width: ${agent.coverage}%"></div>
                </div>
                <span class="coverage-text">${agent.coverage}%</span>
            </div>
            <div class="agent-card-desc">${agent.description}</div>
            <div class="agent-card-roles">
                ${agent.roles.map(role => `<span class="role-tag">${role}</span>`).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}

// ==================== 渲染表格 ====================
function renderTables() {
    const container = document.getElementById('tablesContainer');
    container.innerHTML = '';
    
    const rolesToRender = currentRole === 'all' 
        ? Object.entries(roleData) 
        : [[currentRole, roleData[currentRole]]];
    
    rolesToRender.forEach(([roleKey, role]) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'role-table-wrapper';
        
        // 表头
        const header = document.createElement('div');
        header.className = `role-table-header ${roleKey}`;
        header.innerHTML = `${role.icon} ${role.name} 工作场景（占企业${role.percentage}%）`;
        wrapper.appendChild(header);
        
        // 表格
        const table = document.createElement('table');
        table.className = 'role-table';
        
        // 表头行
        table.innerHTML = `
            <thead>
                <tr>
                    <th>工作场景</th>
                    <th>具体任务</th>
                    <th>时间占比</th>
                    <th>Agent类型</th>
                    <th>业界产品</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        
        const tbody = table.querySelector('tbody');
        
        Object.entries(role.scenes).forEach(([sceneName, scene]) => {
            scene.tasks.forEach((task, idx) => {
                const tr = document.createElement('tr');
                const timeClass = getTimeClass(task.timePercent);
                const agentClass = getAgentClass(task.agent);
                
                tr.innerHTML = `
                    <td>${idx === 0 ? `<strong>${sceneName}</strong><br><small style="color:#64748B">(${scene.timePercent}%)</small>` : ''}</td>
                    <td>${task.name}</td>
                    <td><span class="time-badge ${timeClass}">${task.timePercent}%</span></td>
                    <td><span class="agent-badge ${agentClass}">${agentData[task.agent]?.icon || ''} ${task.agent}</span></td>
                    <td>${task.products.map(p => {
                        const link = productLinks[p];
                        return link 
                            ? `<a href="${link}" target="_blank" class="product-link">${p}</a>` 
                            : p;
                    }).join(', ')}</td>
                `;
                
                if (idx === 0) {
                    tr.querySelector('td').rowSpan = scene.tasks.length;
                } else {
                    tr.querySelector('td').remove();
                }
                
                tbody.appendChild(tr);
            });
        });
        
        wrapper.appendChild(table);
        container.appendChild(wrapper);
    });
}

function getTimeClass(percent) {
    if (percent >= 10) return 'time-high';
    if (percent >= 5) return 'time-medium';
    if (percent >= 2) return 'time-low';
    return 'time-verylow';
}

function getAgentClass(agent) {
    const classMap = {
        'Coding': 'coding',
        'Chatbot': 'chatbot',
        'Workflow': 'workflow',
        'Research': 'research',
        'Design': 'design',
        'Data': 'data',
        'Background': 'background',
        'Browser': 'browser',
        'Computer': 'computer'
    };
    return classMap[agent] || '';
}

// ==================== 渲染关系图 ====================
function renderGraph() {
    const container = document.getElementById('graphColumns');
    const svg = document.getElementById('connectionsSvg');
    if (!container || !svg) return; // 防止DOM元素不存在时崩溃
    container.innerHTML = '';
    svg.innerHTML = '';
    
    // 5列：角色、场景、任务、Agent、产品
    const columns = {
        roles: [],
        scenes: [],
        tasks: [],
        agents: [],
        products: []
    };
    
    // 收集数据
    const rolesToRender = currentRole === 'all' 
        ? Object.entries(roleData).slice(0, 5) // 限制显示5个角色避免过于拥挤
        : [[currentRole, roleData[currentRole]]];
    
    const usedAgents = new Set();
    const usedProducts = new Set();
    const connections = [];
    
    rolesToRender.forEach(([roleKey, role]) => {
        const roleId = `role-${roleKey}`;
        columns.roles.push({
            id: roleId,
            name: `${role.icon} ${role.name}`,
            type: 'role',
            roleKey: roleKey
        });
        
        // 限制场景数量
        const sceneEntries = Object.entries(role.scenes).slice(0, 3);
        sceneEntries.forEach(([sceneName, scene]) => {
            const sceneId = `scene-${roleKey}-${scene.id}`;
            columns.scenes.push({
                id: sceneId,
                name: sceneName,
                type: 'scene',
                roleKey: roleKey
            });
            connections.push({ from: roleId, to: sceneId });
            
            // 限制任务数量
            const taskSlice = scene.tasks.slice(0, 2);
            taskSlice.forEach(task => {
                const taskId = `task-${task.id}`;
                columns.tasks.push({
                    id: taskId,
                    name: task.name,
                    type: 'task',
                    roleKey: roleKey,
                    agent: task.agent,
                    products: task.products
                });
                connections.push({ from: sceneId, to: taskId });
                
                // Agent
                const agentId = `agent-${task.agent}`;
                usedAgents.add(task.agent);
                connections.push({ from: taskId, to: agentId });
                
                // 产品（限制数量）
                task.products.slice(0, 2).forEach(product => {
                    const productId = `product-${product.replace(/\s+/g, '-')}`;
                    usedProducts.add(product);
                    connections.push({ from: taskId, to: productId });
                });
            });
        });
    });
    
    // 添加Agent节点
    usedAgents.forEach(agentKey => {
        const agent = agentData[agentKey];
        if (agent) {
            columns.agents.push({
                id: `agent-${agentKey}`,
                name: `${agent.icon} ${agent.name}`,
                type: 'agent'
            });
        }
    });
    
    // 添加产品节点
    usedProducts.forEach(product => {
        columns.products.push({
            id: `product-${product.replace(/\s+/g, '-')}`,
            name: product,
            type: 'product',
            link: productLinks[product]
        });
    });
    
    // 创建列容器
    const columnOrder = ['roles', 'scenes', 'tasks', 'agents', 'products'];
    columnOrder.forEach(colKey => {
        const colDiv = document.createElement('div');
        colDiv.className = 'graph-column';
        colDiv.id = `col-${colKey}`;
        
        columns[colKey].forEach(node => {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = `graph-node node-${node.type}`;
            nodeDiv.id = node.id;
            nodeDiv.textContent = node.name;
            
            if (node.roleKey) {
                nodeDiv.dataset.role = node.roleKey;
            }
            
            // 所有节点都支持点击高亮
            nodeDiv.addEventListener('click', (e) => {
                // 如果是产品节点且按住Ctrl/Cmd键，则跳转
                if (node.type === 'product' && node.link && (e.ctrlKey || e.metaKey)) {
                    window.open(node.link, '_blank');
                } else {
                    handleNodeClick(node.id, connections);
                }
                e.stopPropagation();
            });
            
            // 产品节点双击跳转
            if (node.type === 'product' && node.link) {
                nodeDiv.style.cursor = 'pointer';
                nodeDiv.addEventListener('dblclick', (e) => {
                    window.open(node.link, '_blank');
                    e.stopPropagation();
                });
            }
            
            // Tooltip
            nodeDiv.addEventListener('mouseenter', (e) => showTooltip(e, node));
            nodeDiv.addEventListener('mouseleave', hideTooltip);
            
            colDiv.appendChild(nodeDiv);
        });
        
        container.appendChild(colDiv);
    });
    
    // 缓存连接线数据并绘制（延迟执行以确保DOM已渲染）
    currentConnections = connections;
    clearDOMCache();
    setTimeout(() => {
        drawConnections(connections, svg);
    }, 100);
    
    // 点击空白取消高亮（事件委托，避免重复绑定）
    const canvas = document.querySelector('.graph-canvas');
    if (canvas && !canvas._bindCleared) {
        canvas.addEventListener('click', (e) => {
            if (e.target.classList.contains('graph-canvas') || e.target.id === 'connectionsSvg') {
                clearHighlight();
            }
        });
        canvas._bindCleared = true;
    }
}

// ==================== 绘制连接线 ====================
function drawConnections(connections, svg) {
    const canvas = document.querySelector('.graph-canvas');
    const canvasRect = canvas.getBoundingClientRect();
    
    svg.setAttribute('width', canvas.scrollWidth);
    svg.setAttribute('height', canvas.scrollHeight);
    
    connections.forEach(conn => {
        const fromEl = document.getElementById(conn.from);
        const toEl = document.getElementById(conn.to);
        
        if (!fromEl || !toEl) return;
        
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        
        const scrollLeft = canvas.scrollLeft;
        const scrollTop = canvas.scrollTop;
        
        const x1 = fromRect.right - canvasRect.left + scrollLeft;
        const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top + scrollTop;
        const x2 = toRect.left - canvasRect.left + scrollLeft;
        const y2 = toRect.top + toRect.height / 2 - canvasRect.top + scrollTop;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const midX = (x1 + x2) / 2;
        path.setAttribute('d', `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`);
        path.setAttribute('class', 'connection-line');
        path.dataset.from = conn.from;
        path.dataset.to = conn.to;
        
        svg.appendChild(path);
    });
}

// ==================== 节点点击高亮 ====================
function handleNodeClick(nodeId, connections) {
    clearHighlight();
    
    // 找到所有直接关联的节点（只查找直接连线的节点）
    const directlyConnected = new Set([nodeId]);
    
    // 第一层：找直接连接的节点
    connections.forEach((conn) => {
        if (conn.from === nodeId) {
            directlyConnected.add(conn.to);
        }
        if (conn.to === nodeId) {
            directlyConnected.add(conn.from);
        }
    });
    
    // 第二层：从直接连接的节点继续向两侧扩展
    const secondLevel = new Set();
    directlyConnected.forEach(connectedId => {
        if (connectedId === nodeId) return;
        connections.forEach((conn) => {
            if (conn.from === connectedId && !directlyConnected.has(conn.to)) {
                secondLevel.add(conn.to);
            }
            if (conn.to === connectedId && !directlyConnected.has(conn.from)) {
                secondLevel.add(conn.from);
            }
        });
    });
    
    // 合并所有需要高亮的节点
    const allHighlighted = new Set([...directlyConnected, ...secondLevel]);
    
    // 高亮节点（使用缓存）
    getCachedNodes().forEach(node => {
        if (allHighlighted.has(node.id)) {
            node.classList.add('highlighted');
        } else {
            node.classList.add('dimmed');
        }
    });
    
    // 高亮连接线 - 只高亮实际连接的线（使用缓存）
    getCachedLines().forEach((line) => {
        const fromId = line.dataset.from;
        const toId = line.dataset.to;
        // 连接线两端的节点都需要在高亮集合中才高亮这条线
        if (allHighlighted.has(fromId) && allHighlighted.has(toId)) {
            line.classList.add('highlighted');
        } else {
            line.classList.add('dimmed');
        }
    });
    
    highlightedNodes = allHighlighted;
}

function clearHighlight() {
    getCachedNodes().forEach(node => {
        node.classList.remove('highlighted', 'dimmed');
    });
    getCachedLines().forEach(line => {
        line.classList.remove('highlighted', 'dimmed');
    });
    highlightedNodes.clear();
}

// ==================== Tooltip ====================
function initTooltip() {
    // Tooltip已在HTML中定义，无需初始化
}

function showTooltip(e, node) {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return; // 防御性检查
    let content = '';
    
    if (node.type === 'role') {
        const role = roleData[node.roleKey];
        content = `
            <strong>${node.name}</strong><br>
            占企业比例: ${role.percentage}%<br>
            工作场景: ${Object.keys(role.scenes).length}个
        `;
    } else if (node.type === 'scene') {
        content = `
            <strong>${node.name}</strong><br>
            类型: 工作场景
        `;
    } else if (node.type === 'task') {
        content = `
            <strong>${node.name}</strong><br>
            Agent: ${node.agent}<br>
            产品: ${node.products?.slice(0, 3).join(', ') || '-'}
        `;
    } else if (node.type === 'agent') {
        const agentKey = node.id.replace('agent-', '');
        const agent = agentData[agentKey];
        if (agent) {
            content = `
                <strong>${agent.name}</strong><br>
                覆盖率: ${agent.coverage}%<br>
                ${agent.description}
            `;
        }
    } else if (node.type === 'product') {
        content = `
            <strong>🔗 ${node.name}</strong><br>
            点击跳转官网
        `;
    }
    
    tooltip.innerHTML = content;
    tooltip.classList.add('show');
    
    // 定位
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.right + 10 + 'px';
    tooltip.style.top = rect.top + 'px';
    
    // 边界检查
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
        tooltip.style.left = rect.left - tooltipRect.width - 10 + 'px';
    }
    if (tooltipRect.bottom > window.innerHeight) {
        tooltip.style.top = window.innerHeight - tooltipRect.height - 10 + 'px';
    }
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) tooltip.classList.remove('show');
}

// ==================== 窗口resize时重绘连接线 ====================
// resize时只重绘连接线，不重建DOM
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        clearDOMCache();
        const svg = document.getElementById('connectionsSvg');
        if (svg) {
            svg.innerHTML = '';
            drawConnections(currentConnections || [], svg);
        }
    }, 250);
});

// ==================== Agent设计方案Tab ====================
function initAgentDesignTabs() {
    const tabs = document.querySelectorAll('.agent-design-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const agentType = tab.dataset.agent;
            currentAgentDesign = agentType;
            renderAgentDesign(agentType);
        });
    });
    
    // 架构图中Agent项点击
    const agentItems = document.querySelectorAll('.agent-item');
    agentItems.forEach(item => {
        item.addEventListener('click', () => {
            const agentType = item.dataset.agent;
            // 切换到设计方案Tab
            const designTabBtn = document.querySelector('.tab-btn[data-tab="section-design"]');
            if (designTabBtn) {
                designTabBtn.click();
            }
            // 切换Agent设计Tab
            setTimeout(() => {
                document.querySelectorAll('.agent-design-tab').forEach(t => t.classList.remove('active'));
                document.querySelector(`.agent-design-tab[data-agent="${agentType}"]`)?.classList.add('active');
                renderAgentDesign(agentType);
            }, 300);
        });
    });
}

// ==================== 渲染Agent设计方案 ====================
function renderAgentDesign(agentType) {
    const container = document.getElementById('agentDesignContent');
    if (!container) return; // 防止DOM元素不存在时崩溃
    const agent = agentData[agentType];
    const design = agentDesignData[agentType];
    
    if (!agent || !design) {
        container.innerHTML = '<p>设计方案加载中...</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="agent-design-header">
            <div class="agent-design-icon">${agent.icon}</div>
            <div class="agent-design-title">
                <h3>${design.productName}</h3>
                <p>${design.productDesc}</p>
            </div>
            <div class="agent-design-coverage">覆盖率 ${agent.coverage}%</div>
        </div>
        <div class="agent-design-body">
            <div class="design-card">
                <h4>🧩 功能模块</h4>
                <div class="module-grid">
                    ${design.modules.map(m => `<div class="module-item">${m}</div>`).join('')}
                </div>
            </div>
            <div class="design-card">
                <h4>📋 支撑工作场景</h4>
                <ul>
                    ${design.scenes.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
            <div class="design-card">
                <h4>🔧 技术栈</h4>
                <ul>
                    ${design.techStack.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
            <div class="design-card">
                <h4>✨ 核心特性</h4>
                <ul>
                    ${design.keyFeatures.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}
