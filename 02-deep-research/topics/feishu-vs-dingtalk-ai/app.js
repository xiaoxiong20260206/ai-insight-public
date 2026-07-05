/* ============================================================
   飞书 vs 钉钉 深度对比报告 — 长页面交互逻辑 v2.0
   功能：
   1. 平滑锚点滚动（含 header offset 补偿）
   2. Scroll Spy — 滚动时高亮左侧目录
   3. 阅读进度条
   4. 回到顶部按钮
   5. 侧边栏折叠/展开
   6. 入场动画（IntersectionObserver，含降级）
   7. 进度条动画启动（首次进入视口时触发 width）
   ============================================================ */

(function () {
    "use strict";

    /* ---- 常量 ---- */
    const HEADER_OFFSET      = 72;   // 顶部保留高度（px）
    const SPY_OFFSET         = 110;  // Scroll Spy 触发偏移
    const SCROLL_TOP_THRESH  = 280;

    /* ---- DOM 引用 ---- */
    const sidebar      = document.getElementById("sidebar");
    const collapseBtn  = document.getElementById("collapseBtn");
    const scrollTopBtn = document.getElementById("scrollToTop");
    const progressBar  = document.getElementById("readingProgress");

    const tocLinks = Array.from(document.querySelectorAll(".toc-link"));
    const anchorIds = tocLinks
        .map(a => a.getAttribute("href"))
        .filter(h => h && h.startsWith("#"))
        .map(h => h.slice(1));
    const anchorEls = anchorIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    /* ===========================================================
       1. 平滑锚点滚动
    =========================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const targetId = link.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    /* ===========================================================
       2. Scroll Spy
    =========================================================== */
    function getActiveId() {
        const scrollY = window.scrollY + SPY_OFFSET;
        let activeId = anchorIds[0];
        for (const el of anchorEls) {
            if (el.offsetTop <= scrollY) {
                activeId = el.id;
            } else {
                break;
            }
        }
        return activeId;
    }

    function updateTocHighlight() {
        const activeId = getActiveId();
        tocLinks.forEach(link => {
            const href = link.getAttribute("href");
            const isActive = href === "#" + activeId;
            link.classList.toggle("toc-active", isActive);
            if (isActive) ensureVisible(link);
        });
    }

    function ensureVisible(el) {
        if (!sidebar) return;
        const elTop    = el.offsetTop;
        const elBottom = elTop + el.offsetHeight;
        const sTop     = sidebar.scrollTop;
        const sBottom  = sTop + sidebar.clientHeight;
        if (elTop < sTop + 60) {
            sidebar.scrollTo({ top: elTop - 60, behavior: "smooth" });
        } else if (elBottom > sBottom - 80) {
            sidebar.scrollTo({ top: elBottom - sidebar.clientHeight + 80, behavior: "smooth" });
        }
    }

    /* ===========================================================
       3. 阅读进度条
    =========================================================== */
    function updateProgress() {
        if (!progressBar) return;
        const scrolled = window.scrollY;
        const total    = document.documentElement.scrollHeight - window.innerHeight;
        const pct      = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
        progressBar.style.width = pct.toFixed(1) + "%";
    }

    /* ===========================================================
       4. 回到顶部按钮
    =========================================================== */
    function updateScrollTopBtn() {
        if (!scrollTopBtn) return;
        scrollTopBtn.classList.toggle("visible", window.scrollY > SCROLL_TOP_THRESH);
    }

    scrollTopBtn && scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ===========================================================
       5. 侧边栏折叠/展开
    =========================================================== */
    collapseBtn && collapseBtn.addEventListener("click", () => {
        const isCollapsed = sidebar.classList.toggle("sidebar-collapsed");
        collapseBtn.textContent    = isCollapsed ? "»" : "«";
        collapseBtn.title          = isCollapsed ? "展开导航" : "折叠导航";
        collapseBtn.setAttribute("aria-label", isCollapsed ? "展开导航" : "折叠导航");
        collapseBtn.classList.toggle("collapsed-pos", isCollapsed);
    });

    /* ===========================================================
       6. 入场动画
       降级：若 IntersectionObserver 不支持，直接显示所有元素
    =========================================================== */
    const animEls = document.querySelectorAll(".animate-on-scroll");

    if (!("IntersectionObserver" in window)) {
        // 降级：立即全部显示
        animEls.forEach(el => el.classList.add("visible"));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.06, rootMargin: "0px 0px -30px 0px" });

        animEls.forEach(el => observer.observe(el));
    }

    /* ===========================================================
       7. 进度条 width 动画（初次进视口时触发）
       让 .bar-fill 的 width 从 0 → 目标值，产生动效
    =========================================================== */
    const barFills = document.querySelectorAll(".bar-fill");
    if ("IntersectionObserver" in window && barFills.length) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 从 style 的 data-width 恢复（若存在），否则用当前 style.width
                    const el = entry.target;
                    const w  = el.dataset.targetWidth || el.style.width || "0%";
                    // 先归零，再延时触发，产生动画
                    el.style.width = "0%";
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => { el.style.width = w; });
                    });
                    barObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        barFills.forEach(el => {
            // 存储目标宽度
            el.dataset.targetWidth = el.style.width || "0%";
            el.style.width = "0%"; // 初始归零
            barObserver.observe(el);
        });
    }

    /* ===========================================================
       8. 统一 scroll 监听（rAF 节流）
    =========================================================== */
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateTocHighlight();
                updateProgress();
                updateScrollTopBtn();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* ---- 初始化 ---- */
    updateTocHighlight();
    updateProgress();
    updateScrollTopBtn();

})();
