/**
 * 主交互逻辑模块
 * 处理节点点击高亮、Tooltip显示、事件委托等交互功能
 */

// ================== 工具函数 ==================

/**
 * 节流函数 - 限制函数执行频率
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} 节流后的函数
 */
function throttle(fn, delay = 16) {
    let lastTime = 0;
    let timer = null;
    
    return function(...args) {
        const now = Date.now();
        const remaining = delay - (now - lastTime);
        
        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            lastTime = now;
            fn.apply(this, args);
        } else if (!timer) {
            timer = setTimeout(() => {
                lastTime = Date.now();
                timer = null;
                fn.apply(this, args);
            }, remaining);
        }
    };
}

// ================== DOM缓存 ==================

let cachedNodes = null;
let cachedConnections = null;

function getNodes() {
    if (!cachedNodes) {
        cachedNodes = document.querySelectorAll('.graph-node');
    }
    return cachedNodes;
}

function getConnections() {
    if (!cachedConnections) {
        cachedConnections = document.querySelectorAll('.graph-connection');
    }
    return cachedConnections;
}

function clearCache() {
    cachedNodes = null;
    cachedConnections = null;
}

// ================== 高亮功能 ==================

let currentHighlightedId = null;

/**
 * 高亮相关节点和连线
 * @param {string} nodeId - 被点击节点的ID
 */
function highlightRelated(nodeId) {
    const nodes = getNodes();
    const connections = getConnections();
    
    if (nodes.length === 0) return;
    
    // 收集直接关联的节点ID
    const relatedIds = new Set([nodeId]);
    
    // 查找所有相关连接
    connections.forEach(conn => {
        const fromId = conn.getAttribute('data-from');
        const toId = conn.getAttribute('data-to');
        
        if (fromId === nodeId) {
            relatedIds.add(toId);
        }
        if (toId === nodeId) {
            relatedIds.add(fromId);
        }
    });
    
    // 递归查找间接关联（向两边各扩展一层）
    const extendedIds = new Set(relatedIds);
    connections.forEach(conn => {
        const fromId = conn.getAttribute('data-from');
        const toId = conn.getAttribute('data-to');
        
        if (relatedIds.has(fromId)) {
            extendedIds.add(toId);
        }
        if (relatedIds.has(toId)) {
            extendedIds.add(fromId);
        }
    });
    
    // 使用requestAnimationFrame批量更新样式
    requestAnimationFrame(() => {
        // 更新节点样式
        nodes.forEach(node => {
            const id = node.getAttribute('data-id');
            if (extendedIds.has(id)) {
                node.classList.remove('dimmed');
                node.classList.add('highlighted');
            } else {
                node.classList.remove('highlighted');
                node.classList.add('dimmed');
            }
        });
        
        // 更新连线样式
        connections.forEach(conn => {
            const fromId = conn.getAttribute('data-from');
            const toId = conn.getAttribute('data-to');
            
            if (extendedIds.has(fromId) && extendedIds.has(toId)) {
                conn.classList.remove('dimmed');
                conn.classList.add('highlighted');
            } else {
                conn.classList.remove('highlighted');
                conn.classList.add('dimmed');
            }
        });
    });
    
    currentHighlightedId = nodeId;
}

/**
 * 重置所有高亮状态
 */
function resetHighlight() {
    const nodes = getNodes();
    const connections = getConnections();
    
    requestAnimationFrame(() => {
        nodes.forEach(node => {
            node.classList.remove('dimmed', 'highlighted');
        });
        
        connections.forEach(conn => {
            conn.classList.remove('dimmed', 'highlighted');
        });
    });
    
    currentHighlightedId = null;
}

// ================== 折叠功能 ==================

// 存储折叠状态
const collapsedNodes = new Set();

/**
 * 切换节点的折叠状态
 * @param {string} nodeId - 节点ID
 * @param {Element} btn - 折叠按钮元素
 */
function toggleCollapse(nodeId, btn) {
    const isCollapsed = collapsedNodes.has(nodeId);
    
    if (isCollapsed) {
        // 展开
        collapsedNodes.delete(nodeId);
        expandChildren(nodeId);
        // 更新按钮图标为减号
        const icon = btn.querySelector('.collapse-icon');
        if (icon) icon.textContent = '−';
    } else {
        // 折叠
        collapsedNodes.add(nodeId);
        collapseChildren(nodeId);
        // 更新按钮图标为加号
        const icon = btn.querySelector('.collapse-icon');
        if (icon) icon.textContent = '+';
    }
}

/**
 * 折叠子节点
 * @param {string} parentId - 父节点ID
 */
function collapseChildren(parentId) {
    const nodes = getNodes();
    const connections = getConnections();
    
    // 获取所有需要隐藏的子节点ID
    const childIds = getDescendantIds(parentId);
    
    requestAnimationFrame(() => {
        // 隐藏子节点
        nodes.forEach(node => {
            const nodeId = node.getAttribute('data-id');
            if (childIds.has(nodeId)) {
                node.style.display = 'none';
            }
        });
        
        // 隐藏相关连线
        connections.forEach(conn => {
            const fromId = conn.getAttribute('data-from');
            const toId = conn.getAttribute('data-to');
            
            // 如果连线的起点或终点在子节点中，或者连线起点是当前节点
            if (childIds.has(fromId) || childIds.has(toId) || fromId === parentId) {
                conn.style.display = 'none';
            }
        });
    });
}

/**
 * 展开子节点
 * @param {string} parentId - 父节点ID
 */
function expandChildren(parentId) {
    const nodes = getNodes();
    const connections = getConnections();
    
    // 获取所有需要显示的子节点ID（不包括其他已折叠节点的子节点）
    const childIds = getDescendantIds(parentId);
    
    requestAnimationFrame(() => {
        // 显示子节点（除非它们的父节点也是折叠的）
        nodes.forEach(node => {
            const nodeId = node.getAttribute('data-id');
            const nodeParent = node.getAttribute('data-parent');
            
            if (childIds.has(nodeId)) {
                // 检查是否有其他已折叠的祖先
                if (!hasCollapsedAncestor(nodeId)) {
                    node.style.display = '';
                }
            }
        });
        
        // 显示相关连线
        connections.forEach(conn => {
            const fromId = conn.getAttribute('data-from');
            const toId = conn.getAttribute('data-to');
            
            // 如果连线的起点或终点在子节点中，或者连线起点是当前节点
            if (childIds.has(fromId) || childIds.has(toId) || fromId === parentId) {
                // 检查两端节点是否都可见
                if (!hasCollapsedAncestor(fromId) && !hasCollapsedAncestor(toId)) {
                    conn.style.display = '';
                }
            }
        });
    });
}

/**
 * 获取节点的所有后代ID
 * @param {string} parentId - 父节点ID
 * @returns {Set} 后代节点ID集合
 */
function getDescendantIds(parentId) {
    const nodes = getNodes();
    const connections = getConnections();
    const descendants = new Set();
    const toProcess = [parentId];
    
    while (toProcess.length > 0) {
        const currentId = toProcess.pop();
        
        // 查找从当前节点出发的所有连线
        connections.forEach(conn => {
            const fromId = conn.getAttribute('data-from');
            const toId = conn.getAttribute('data-to');
            
            if (fromId === currentId && !descendants.has(toId)) {
                descendants.add(toId);
                toProcess.push(toId);
            }
        });
    }
    
    return descendants;
}

/**
 * 检查节点是否有已折叠的祖先
 * @param {string} nodeId - 节点ID
 * @returns {boolean}
 */
function hasCollapsedAncestor(nodeId) {
    const nodes = getNodes();
    const node = Array.from(nodes).find(n => n.getAttribute('data-id') === nodeId);
    if (!node) return false;
    
    let parentId = node.getAttribute('data-parent');
    
    while (parentId) {
        if (collapsedNodes.has(parentId)) {
            return true;
        }
        
        // 查找父节点的父节点
        const parentNode = Array.from(nodes).find(n => n.getAttribute('data-id') === parentId);
        if (parentNode) {
            parentId = parentNode.getAttribute('data-parent');
        } else {
            break;
        }
    }
    
    return false;
}

// ================== Tooltip功能 ==================

const tooltip = document.getElementById('tooltip');

/**
 * 获取任务详情数据
 */
function getTaskDetails(taskId) {
    const { taskData } = window.graphData || {};
    if (!taskData) return null;
    
    for (const scene of Object.values(taskData)) {
        for (const [subcatName, subcat] of Object.entries(scene.subcategories)) {
            const task = subcat.tasks.find(t => t.id === taskId);
            if (task) {
                return {
                    ...task,
                    scene: scene.name,
                    subcat: subcatName
                };
            }
        }
    }
    return null;
}

/**
 * 获取子类详情数据
 */
function getSubcatDetails(subcatId) {
    const { taskData } = window.graphData || {};
    if (!taskData) return null;
    
    for (const scene of Object.values(taskData)) {
        for (const [subcatName, subcat] of Object.entries(scene.subcategories)) {
            if (subcat.id === subcatId) {
                return {
                    name: subcatName,
                    scene: scene.name,
                    timePercent: subcat.timePercent,
                    taskCount: subcat.tasks.length
                };
            }
        }
    }
    return null;
}

/**
 * 获取场景详情数据
 */
function getSceneDetails(sceneId) {
    const { taskData } = window.graphData || {};
    if (!taskData) return null;
    
    for (const scene of Object.values(taskData)) {
        if (scene.id === sceneId) {
            const subcatCount = Object.keys(scene.subcategories).length;
            let taskCount = 0;
            Object.values(scene.subcategories).forEach(subcat => {
                taskCount += subcat.tasks.length;
            });
            
            return {
                name: scene.name,
                timePercent: scene.timePercent,
                subcatCount,
                taskCount
            };
        }
    }
    return null;
}

/**
 * 获取Agent详情数据
 */
function getAgentDetails(agentKey) {
    const { agentData } = window.graphData || {};
    if (!agentData) return null;
    
    // 从agent id中提取key
    const key = agentKey.replace('agent-', '');
    const keyMap = {
        'coding': 'Coding',
        'chatbot': 'Chatbot',
        'workflow': 'Workflow',
        'design': 'Design',
        'data': 'Data',
        'research': 'Research',
        'background': 'Background',
        'browser': 'Browser',
        'computer': 'Computer'
    };
    
    const agentName = keyMap[key];
    if (agentName && agentData[agentName]) {
        return agentData[agentName];
    }
    return null;
}

/**
 * 显示任务Tooltip
 */
function showTaskTooltip(taskId, x, y) {
    const task = getTaskDetails(taskId);
    if (!task) return;
    
    const html = `
        <div class="tooltip-title">${task.name}</div>
        <div class="tooltip-content">
            <div class="tooltip-item"><strong>时长占比：</strong>${task.timePercent}%</div>
            <div class="tooltip-item"><strong>所属场景：</strong>${task.scene} - ${task.subcat}</div>
            <div class="tooltip-item"><strong>Agent类型：</strong>${task.agent}</div>
            <div class="tooltip-item"><strong>任务示例：</strong>${task.example}</div>
            ${task.products.length > 0 ? `<div class="tooltip-item"><strong>业界产品：</strong>${task.products.join(', ')}</div>` : ''}
        </div>
    `;
    
    showTooltipAt(html, x, y);
}

/**
 * 显示子类Tooltip
 */
function showSubcatTooltip(subcatId, x, y) {
    const subcat = getSubcatDetails(subcatId);
    if (!subcat) return;
    
    const html = `
        <div class="tooltip-title">${subcat.name}</div>
        <div class="tooltip-content">
            <div class="tooltip-item"><strong>时长占比：</strong>${subcat.timePercent}%</div>
            <div class="tooltip-item"><strong>所属场景：</strong>${subcat.scene}</div>
            <div class="tooltip-item"><strong>任务数量：</strong>${subcat.taskCount}个</div>
        </div>
    `;
    
    showTooltipAt(html, x, y);
}

/**
 * 显示场景Tooltip
 */
function showSceneTooltip(sceneId, x, y) {
    const scene = getSceneDetails(sceneId);
    if (!scene) return;
    
    const html = `
        <div class="tooltip-title">${scene.name}</div>
        <div class="tooltip-content">
            <div class="tooltip-item"><strong>时长占比：</strong>${scene.timePercent}%</div>
            <div class="tooltip-item"><strong>子类数量：</strong>${scene.subcatCount}个</div>
            <div class="tooltip-item"><strong>任务数量：</strong>${scene.taskCount}个</div>
        </div>
    `;
    
    showTooltipAt(html, x, y);
}

/**
 * 显示Agent Tooltip
 */
function showAgentTooltip(agentId, x, y) {
    const agent = getAgentDetails(agentId);
    if (!agent) return;
    
    const html = `
        <div class="tooltip-title">${agent.icon} ${agent.name}</div>
        <div class="tooltip-content">
            <div class="tooltip-item"><strong>覆盖时长：</strong>${agent.coverage}%</div>
            <div class="tooltip-item"><strong>核心技术：</strong>${agent.techs.join(', ')}</div>
        </div>
    `;
    
    showTooltipAt(html, x, y);
}

/**
 * 在指定位置显示Tooltip
 */
function showTooltipAt(html, x, y) {
    if (!tooltip) return;
    
    tooltip.innerHTML = html;
    tooltip.classList.add('visible');
    
    positionTooltip(x, y);
}

/**
 * 定位Tooltip
 */
function positionTooltip(x, y) {
    if (!tooltip) return;
    
    const padding = 15;
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = x + padding;
    let top = y + padding;
    
    // 防止超出右边界
    if (left + tooltipRect.width > viewportWidth - padding) {
        left = x - tooltipRect.width - padding;
    }
    
    // 防止超出下边界
    if (top + tooltipRect.height > viewportHeight - padding) {
        top = y - tooltipRect.height - padding;
    }
    
    // 防止超出左边界
    if (left < padding) {
        left = padding;
    }
    
    // 防止超出上边界
    if (top < padding) {
        top = padding;
    }
    
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

/**
 * 隐藏Tooltip
 */
function hideTooltip() {
    if (tooltip) {
        tooltip.classList.remove('visible');
    }
}

/**
 * 移动Tooltip（节流处理）
 */
const moveTooltip = throttle((x, y) => {
    positionTooltip(x, y);
}, 16);

// ================== 事件处理 ==================

/**
 * 初始化事件监听
 */
function initEventListeners() {
    const container = document.getElementById('network-container');
    if (!container) return;
    
    // 使用事件委托处理点击
    container.addEventListener('click', (e) => {
        // 检查是否点击了折叠按钮
        const collapseBtn = e.target.closest('.collapse-btn');
        if (collapseBtn) {
            e.preventDefault();
            e.stopPropagation();
            const targetId = collapseBtn.getAttribute('data-target');
            toggleCollapse(targetId, collapseBtn);
            return;
        }
        
        // 检查是否点击了产品链接区域（文字部分）
        const linkArea = e.target.closest('.product-link-area') || e.target.closest('.node-text-link');
        if (linkArea) {
            // 点击文字部分，让<a>标签自然处理跳转，不阻止
            return;
        }
        
        const node = e.target.closest('.graph-node');
        
        if (node) {
            const nodeId = node.getAttribute('data-id');
            const nodeType = node.getAttribute('data-type');
            
            // 如果是产品节点但点击的是背景区域，执行高亮（展示关联关系）
            if (nodeType === 'product') {
                e.preventDefault();
                e.stopPropagation();
                // 切换高亮状态
                if (currentHighlightedId === nodeId) {
                    resetHighlight();
                } else {
                    highlightRelated(nodeId);
                }
                return;
            }
            
            // 其他节点：如果点击同一个节点，取消高亮
            if (currentHighlightedId === nodeId) {
                resetHighlight();
            } else {
                highlightRelated(nodeId);
            }
        } else {
            // 点击空白区域，取消高亮
            resetHighlight();
        }
    });
    
    // 鼠标悬浮显示Tooltip
    container.addEventListener('mouseover', (e) => {
        const node = e.target.closest('.graph-node');
        
        if (node) {
            const nodeId = node.getAttribute('data-id');
            const nodeType = node.getAttribute('data-type');
            const nodeUrl = node.getAttribute('data-url');
            const rect = node.getBoundingClientRect();
            const x = rect.right;
            const y = rect.top;
            
            switch (nodeType) {
                case 'scene':
                    showSceneTooltip(nodeId, x, y);
                    break;
                case 'subcat':
                    showSubcatTooltip(nodeId, x, y);
                    break;
                case 'task':
                    showTaskTooltip(nodeId, x, y);
                    break;
                case 'agent':
                    showAgentTooltip(nodeId, x, y);
                    break;
                case 'product':
                    showProductTooltip(nodeId, nodeUrl, x, y);
                    break;
                default:
                    break;
            }
        }
    });
    
    // 鼠标移动更新Tooltip位置
    container.addEventListener('mousemove', (e) => {
        if (tooltip && tooltip.classList.contains('visible')) {
            moveTooltip(e.clientX, e.clientY);
        }
    });
    
    // 鼠标离开隐藏Tooltip
    container.addEventListener('mouseout', (e) => {
        const node = e.target.closest('.graph-node');
        const relatedTarget = e.relatedTarget;
        
        // 如果离开的是节点，且没有进入另一个节点
        if (node && (!relatedTarget || !relatedTarget.closest('.graph-node'))) {
            hideTooltip();
        }
    });
}

/**
 * 显示产品Tooltip - 增强版，显示关联的任务和Agent
 */
function showProductTooltip(productId, url, x, y) {
    const productName = productId.replace('product-', '').replace(/-/g, ' ');
    const { taskData } = window.graphData || {};
    
    // 查找使用该产品的任务
    const relatedTasks = [];
    const relatedAgents = new Set();
    
    if (taskData) {
        for (const scene of Object.values(taskData)) {
            for (const [subcatName, subcat] of Object.entries(scene.subcategories)) {
                for (const task of subcat.tasks) {
                    // 检查产品名是否在任务的products数组中
                    const productInTask = task.products.some(p => 
                        p.toLowerCase().replace(/\s+/g, '') === productName.toLowerCase().replace(/\s+/g, '') ||
                        p.toLowerCase().includes(productName.toLowerCase()) ||
                        productName.toLowerCase().includes(p.toLowerCase())
                    );
                    
                    if (productInTask) {
                        relatedTasks.push({
                            name: task.name,
                            scene: scene.name,
                            subcat: subcatName
                        });
                        relatedAgents.add(task.agent);
                    }
                }
            }
        }
    }
    
    const agentList = Array.from(relatedAgents).join(', ') || '未知';
    const taskList = relatedTasks.length > 0 
        ? relatedTasks.slice(0, 5).map(t => t.name).join(', ') + (relatedTasks.length > 5 ? '...' : '')
        : '未知';
    
    const html = `
        <div class="tooltip-title">🔗 ${productName}</div>
        <div class="tooltip-content">
            <div class="tooltip-item"><strong>点击文字：</strong>跳转产品官网</div>
            <div class="tooltip-item"><strong>点击背景：</strong>显示关联关系</div>
            <div class="tooltip-item" style="margin-top: 8px;"><strong>关联Agent：</strong>${agentList}</div>
            <div class="tooltip-item"><strong>关联任务：</strong>${taskList}</div>
            ${url ? `<div class="tooltip-item tooltip-url" style="margin-top: 6px;">${url}</div>` : ''}
        </div>
    `;
    
    showTooltipAt(html, x, y);
}

// ================== MutationObserver ==================

/**
 * 监听SVG变化，清除缓存
 */
function initMutationObserver() {
    const container = document.getElementById('network-container');
    if (!container) return;
    
    const observer = new MutationObserver((mutations) => {
        clearCache();
    });
    
    observer.observe(container, {
        childList: true,
        subtree: true
    });
}

// ================== 页面滚动动画 ==================

/**
 * 初始化滚动动画
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察统计卡片
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // 观察优先级卡片
    document.querySelectorAll('.priority-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // 观察Agent卡片
    document.querySelectorAll('.agent-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(card);
    });
}

// ================== 初始化 ==================

document.addEventListener('DOMContentLoaded', () => {
    // 等待SVG渲染完成后初始化事件
    setTimeout(() => {
        initEventListeners();
        initMutationObserver();
        initScrollAnimations();
        initProductLinks();  // 初始化表格中的产品链接
    }, 100);
});

// 窗口大小改变时清除缓存
window.addEventListener('resize', throttle(() => {
    clearCache();
}, 250));

/**
 * 初始化表格中的产品链接
 * 将纯文本产品名替换为可点击的超链接
 */
function initProductLinks() {
    const { productLinks } = window.graphData || {};
    if (!productLinks) return;
    
    // 查找所有表格中的产品单元格（最后一列）
    const tables = document.querySelectorAll('.data-table tbody');
    
    tables.forEach(tbody => {
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                // 产品列是最后一个td
                const productCell = cells[cells.length - 1];
                const text = productCell.textContent.trim();
                
                // 解析产品名称（逗号分隔）
                const products = text.split(',').map(p => p.trim()).filter(p => p);
                
                if (products.length > 0) {
                    const linkedProducts = products.map(product => {
                        const url = productLinks[product];
                        if (url) {
                            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="product-link">${product}</a>`;
                        }
                        return product;
                    });
                    
                    productCell.innerHTML = linkedProducts.join(', ');
                }
            }
        });
    });
}
