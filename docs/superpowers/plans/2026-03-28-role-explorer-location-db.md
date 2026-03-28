# CREWLOG Mockup: 職組導覽 + 劇組場景庫 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 職組導覽 (Role Explorer) and 劇組場景庫 (Crew Location Database) sections to index.html as a proposal mockup for industry veterans.

**Architecture:** All changes in a single `index.html`. CSS inserted before `</style>`. HTML sections inserted at marked positions. JS inserted before closing `</script>`. No new files, no build tools, no dependencies.

**Tech Stack:** Vanilla HTML/CSS/JS. Existing patterns: `.kgrid`/`.kcard` for card grids, `openKModal()` pattern for modal, `.s-bg`/`.wrap`/`.sec` for section layout.

---

## File Map

**Modify only:** `index.html`
- CSS block (~line 11): add role + location CSS before `</style>`
- HTML: add 職組導覽 section before `<!-- LIGHTING KNOWLEDGE -->` (~line 1293)
- HTML: add 劇組場景庫 section before `<!-- COMMUNITY -->` (~line 1590) — replace the static `.map-grid` location cards block
- HTML: add role modal element before `</body>`
- JS: add `roleData`, `locationData`, `openRoleModal()`, `closeRoleModal()`, `filterLoc()` before `</script>`
- Nav: add two new links

---

## Task 1: CSS — 職組導覽

**File:** `index.html` — inside `<style>` block, before `</style>`

- [ ] **Step 1: Find insertion point**

In `index.html`, find the line `</style>` (the closing of the big inline style block, around line 1085). Insert all new CSS immediately before it.

- [ ] **Step 2: Insert role explorer CSS**

```css
/* ── ROLE EXPLORER ── */
.role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border)}
.role-card{background:var(--bg);padding:32px 28px 28px;cursor:pointer;transition:background .2s;position:relative;display:flex;flex-direction:column;gap:0}
.role-card:hover{background:rgba(240,235,227,.04)}
.role-card-icon{font-size:32px;margin-bottom:20px;display:block}
.role-card-en{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.22em;color:var(--red);text-transform:uppercase;margin-bottom:8px}
.role-card-zh{font-family:'Noto Sans TC',sans-serif;font-size:20px;font-weight:700;color:var(--white);margin-bottom:10px}
.role-card-tagline{font-family:'Noto Sans TC',sans-serif;font-size:13px;color:rgba(240,235,227,.55);line-height:1.65;margin-bottom:18px;flex:1}
.role-diff{display:flex;gap:3px;margin-bottom:16px}
.role-diff-dot{width:6px;height:6px;border-radius:50%;background:rgba(240,235,227,.15)}
.role-diff-dot.on{background:var(--red)}
.role-card-quote{border-left:2px solid rgba(200,66,42,.3);padding-left:12px;margin-top:auto}
.role-card-quote p{font-family:'Noto Sans TC',sans-serif;font-size:12px;color:rgba(240,235,227,.55);line-height:1.7;font-style:italic}
.role-card-quote small{font-family:'DM Mono',monospace;font-size:9px;color:rgba(200,66,42,.6);letter-spacing:.1em;display:block;margin-top:4px}
.role-card-arrow{position:absolute;bottom:24px;right:24px;font-size:14px;color:rgba(240,235,227,.2);transition:all .2s}
.role-card:hover .role-card-arrow{color:var(--red);transform:translateX(3px)}

/* Role Modal */
.role-modal{position:fixed;inset:0;z-index:8000;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .25s}
.role-modal.show{opacity:1;pointer-events:all}
.role-modal-bg{position:absolute;inset:0;background:rgba(10,10,10,.92);backdrop-filter:blur(6px)}
.role-modal-box{position:relative;z-index:1;background:var(--bg2);border:1px solid var(--border);max-width:680px;width:100%;max-height:85vh;overflow-y:auto;padding:48px}
.rm-header{display:flex;align-items:flex-start;gap:20px;margin-bottom:36px;padding-bottom:28px;border-bottom:1px solid var(--border)}
.rm-icon{font-size:40px;flex-shrink:0}
.rm-title-block{}
.rm-en{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.22em;color:var(--red);text-transform:uppercase;margin-bottom:6px}
.rm-zh{font-family:'Noto Sans TC',sans-serif;font-size:26px;font-weight:700;color:var(--white);margin-bottom:4px}
.rm-tagline{font-family:'Noto Sans TC',sans-serif;font-size:13px;color:rgba(240,235,227,.55)}
.rm-section{margin-bottom:32px}
.rm-section-label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;color:var(--red);text-transform:uppercase;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.rm-section-label::after{content:'';flex:1;height:1px;background:var(--border)}
.rm-desc{font-family:'Noto Sans TC',sans-serif;font-size:14px;color:rgba(240,235,227,.75);line-height:1.85}
.rm-timeline{display:flex;flex-direction:column;gap:0;border-left:1px solid var(--border);padding-left:20px}
.rm-tl-item{display:flex;gap:16px;padding:10px 0;position:relative}
.rm-tl-item::before{content:'';position:absolute;left:-24px;top:15px;width:7px;height:7px;border-radius:50%;background:var(--border);border:1px solid rgba(240,235,227,.2)}
.rm-tl-time{font-family:'DM Mono',monospace;font-size:10px;color:var(--red);width:42px;flex-shrink:0;padding-top:2px}
.rm-tl-event{font-family:'Noto Sans TC',sans-serif;font-size:13px;color:rgba(240,235,227,.7);line-height:1.6}
.rm-misconceptions{display:flex;flex-direction:column;gap:10px}
.rm-mis-item{font-family:'Noto Sans TC',sans-serif;font-size:13px;color:rgba(240,235,227,.65);padding:10px 14px;border-left:2px solid rgba(200,66,42,.3);background:rgba(200,66,42,.04);line-height:1.7}
.rm-entry-list{display:flex;flex-direction:column;gap:8px}
.rm-entry-item{font-family:'Noto Sans TC',sans-serif;font-size:13px;color:rgba(240,235,227,.7);display:flex;gap:8px;align-items:flex-start;line-height:1.6}
.rm-entry-item::before{content:'→';color:var(--red);flex-shrink:0;font-family:'DM Mono',monospace;font-size:11px;margin-top:2px}
.rm-close{position:absolute;top:20px;right:20px;background:none;border:none;color:rgba(240,235,227,.4);font-size:20px;cursor:pointer;padding:4px 8px;transition:color .2s}
.rm-close:hover{color:var(--white)}
@media(max-width:768px){
  .role-grid{grid-template-columns:1fr 1fr}
  .role-modal-box{padding:28px 20px}
  .rm-header{flex-direction:column;gap:12px}
}
@media(max-width:480px){
  .role-grid{grid-template-columns:1fr}
}
```

---

## Task 2: CSS — 劇組場景庫

**File:** `index.html` — same `</style>` insertion point, after Task 1 CSS

- [ ] **Step 1: Insert location database CSS**

```css
/* ── CREW LOCATION DATABASE ── */
.cl-filters{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:32px}
.cl-filter-btn{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.18em;padding:6px 14px;border:1px solid rgba(240,235,227,.18);background:transparent;color:rgba(240,235,227,.5);cursor:pointer;text-transform:uppercase;transition:all .2s}
.cl-filter-btn:hover{border-color:var(--red);color:var(--red)}
.cl-filter-btn.on{border-color:var(--red);background:rgba(200,66,42,.1);color:var(--red)}
.cl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border)}
.cl-card{background:var(--bg);padding:28px 24px 24px;transition:background .2s;display:flex;flex-direction:column;gap:0}
.cl-card:hover{background:rgba(240,235,227,.04)}
.cl-card.hidden{display:none}
.cl-city{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;color:rgba(240,235,227,.35);text-transform:uppercase;margin-bottom:10px}
.cl-name{font-family:'Noto Sans TC',sans-serif;font-size:17px;font-weight:700;color:var(--white);margin-bottom:4px}
.cl-name-en{font-family:'Outfit',sans-serif;font-size:11px;color:rgba(240,235,227,.3);margin-bottom:14px}
.cl-vtags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:14px}
.cl-vtag{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;padding:2px 8px;border:1px solid rgba(240,235,227,.15);color:rgba(240,235,227,.5);text-transform:uppercase}
.cl-stypes{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:18px}
.cl-stype{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;padding:2px 8px;border:1px solid rgba(200,66,42,.3);color:rgba(200,66,42,.7);text-transform:uppercase}
.cl-meta-row{display:flex;flex-direction:column;gap:5px;margin-bottom:16px;padding-top:14px;border-top:1px solid var(--border)}
.cl-meta-item{display:flex;gap:8px;font-family:'DM Mono',monospace;font-size:10px;color:rgba(240,235,227,.4)}
.cl-meta-key{color:rgba(240,235,227,.2);width:52px;flex-shrink:0}
.cl-notes{font-family:'Noto Sans TC',sans-serif;font-size:12px;color:rgba(240,235,227,.5);line-height:1.7;font-style:italic;padding-top:12px;border-top:1px solid var(--border);margin-top:auto}
.cl-known{margin-top:10px}
.cl-known-label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.12em;color:rgba(200,66,42,.5);text-transform:uppercase;margin-bottom:4px}
.cl-known-item{font-family:'Noto Sans TC',sans-serif;font-size:11px;color:rgba(200,66,42,.6)}
.cl-gps-link{display:inline-flex;align-items:center;gap:4px;margin-top:14px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.14em;color:rgba(240,235,227,.25);text-decoration:none;text-transform:uppercase;transition:color .2s}
.cl-gps-link:hover{color:var(--red)}
.cl-secret{display:inline-block;font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.12em;padding:2px 7px;border:1px solid rgba(200,66,42,.3);color:rgba(200,66,42,.5);text-transform:uppercase;margin-bottom:8px}
@media(max-width:768px){
  .cl-grid{grid-template-columns:1fr 1fr}
  .cl-filters{gap:4px}
}
@media(max-width:480px){
  .cl-grid{grid-template-columns:1fr}
}
```

---

## Task 3: HTML — 職組導覽 Section

**File:** `index.html`
**Insert before:** `<!-- LIGHTING KNOWLEDGE -->` (~line 1293)

- [ ] **Step 1: Insert section HTML**

```html
<!-- ROLE EXPLORER -->
<hr class="div">
<div class="wrap" id="roles">
  <div class="sec">
    <div class="s-head a-left">
      <div>
        <div class="s-label">職組導覽 · Role Explorer</div>
        <div class="s-en" style="font-family:'Noto Sans TC',sans-serif;font-size:clamp(32px,5vw,64px);font-weight:700;letter-spacing:-.01em;line-height:1.1">找到你的<br><span style="color:var(--red)">職組方向</span></div>
        <div class="s-zh">每個職組都有它的語言、節奏、和進入方式。先搞清楚自己適合哪裡。</div>
      </div>
    </div>

    <div class="role-grid a-stagger">
      <!-- 製片組 -->
      <div class="role-card" onclick="openRoleModal('producer')">
        <span class="role-card-icon">📋</span>
        <div class="role-card-en">Production</div>
        <div class="role-card-zh">製片組</div>
        <div class="role-card-tagline">把所有人和所有事拼在一起的人。沒有製片，現場就是一盤散沙。</div>
        <div class="role-diff">
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot"></div>
        </div>
        <div class="role-card-quote">
          <p>「製片沒有做好，其他人做得再好也沒用。」</p>
          <small>製片助理 · 資深 8 年</small>
        </div>
        <span class="role-card-arrow">→</span>
      </div>

      <!-- 攝影組 -->
      <div class="role-card" onclick="openRoleModal('cinematographer')">
        <span class="role-card-icon">🎥</span>
        <div class="role-card-en">Cinematography</div>
        <div class="role-card-zh">攝影組</div>
        <div class="role-card-tagline">決定觀眾「看見什麼」的人。每一格畫面都是一個選擇。</div>
        <div class="role-diff">
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot on"></div>
        </div>
        <div class="role-card-quote">
          <p>「學攝影不是學設備，是學看的方式。」</p>
          <small>攝影師 · 廣告片為主 · 6 年</small>
        </div>
        <span class="role-card-arrow">→</span>
      </div>

      <!-- 燈光組 -->
      <div class="role-card" onclick="openRoleModal('gaffer')">
        <span class="role-card-icon">💡</span>
        <div class="role-card-en">Lighting / Gaffer</div>
        <div class="role-card-zh">燈光組</div>
        <div class="role-card-tagline">畫面的情緒是光做出來的。燈光師是用光說話的工程師。</div>
        <div class="role-diff">
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot"></div>
        </div>
        <div class="role-card-quote">
          <p>「你能看出光從哪裡來、為什麼在那裡，你就入門了。」</p>
          <small>燈光師 · 10 年</small>
        </div>
        <span class="role-card-arrow">→</span>
      </div>

      <!-- 美術組 -->
      <div class="role-card" onclick="openRoleModal('artdept')">
        <span class="role-card-icon">🎨</span>
        <div class="role-card-en">Art Department</div>
        <div class="role-card-zh">美術組</div>
        <div class="role-card-tagline">打造畫面裡的整個世界。從道具到場景，美術組讓故事變真實。</div>
        <div class="role-diff">
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot on"></div><div class="role-diff-dot"></div>
          <div class="role-diff-dot"></div>
        </div>
        <div class="role-card-quote">
          <p>「美術要讓觀眾完全不注意到美術，那才叫成功。」</p>
          <small>美術指導 · 電影為主 · 12 年</small>
        </div>
        <span class="role-card-arrow">→</span>
      </div>

      <!-- 場記 -->
      <div class="role-card" onclick="openRoleModal('scriptsupervisor')">
        <span class="role-card-icon">📝</span>
        <div class="role-card-en">Script Supervisor</div>
        <div class="role-card-zh">場記</div>
        <div class="role-card-tagline">守護連戲的人。沒有場記，剪接師會發瘋，觀眾會出戲。</div>
        <div class="role-diff">
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot on"></div><div class="role-diff-dot"></div>
          <div class="role-diff-dot"></div>
        </div>
        <div class="role-card-quote">
          <p>「場記不是在記筆記，是在保護整部片的邏輯。」</p>
          <small>場記 · 8 年資歷</small>
        </div>
        <span class="role-card-arrow">→</span>
      </div>

      <!-- 後期剪接 -->
      <div class="role-card" onclick="openRoleModal('editor')">
        <span class="role-card-icon">✂️</span>
        <div class="role-card-en">Post / Editing</div>
        <div class="role-card-zh">後期剪接</div>
        <div class="role-card-tagline">片子拍完，才剛開始。剪接師是把素材變成電影的最後一個說故事的人。</div>
        <div class="role-diff">
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot on"></div><div class="role-diff-dot on"></div>
          <div class="role-diff-dot"></div>
        </div>
        <div class="role-card-quote">
          <p>「殺青才是開始——這句話是剪接師說的。」</p>
          <small>剪接師 · 電影 / OTT · 9 年</small>
        </div>
        <span class="role-card-arrow">→</span>
      </div>
    </div>

    <div class="cta-bar a-up" style="margin-top:1px">
      <div class="cta-bar-text">
        <span class="cta-en">Still not sure? That's fine.</span>
        <span class="cta-zh">很多人第一部片之後才知道自己真正想做什麼。先上去體驗再說。</span>
      </div>
      <button class="btn-r" onclick="showJoinModal()">加入候補名單</button>
    </div>
  </div>
</div>
```

---

## Task 4: HTML — 劇組場景庫 Section

**File:** `index.html`
**Insert before:** `<!-- COMMUNITY -->` (~line 1590), **replacing** the existing static `.map-grid` location cards block (the `<!-- MAP -->` section from `<hr class="div">` through its closing `</div>`)

- [ ] **Step 1: Find the MAP section to replace**

Find the block starting with `<!-- MAP -->` and ending with its closing `</div>` (after the `.map-grid` with the 5 static `.loc` cards and one `.loc-add`). Delete it entirely and replace with:

```html
<!-- CREW LOCATION DATABASE -->
<hr class="div">
<div class="wrap" id="map">
  <div class="sec">
    <div class="s-head a-left">
      <div>
        <div class="s-label">劇組場景庫 · Crew Location Database</div>
        <div class="s-en" style="font-family:'Noto Sans TC',sans-serif;font-size:clamp(32px,5vw,64px);font-weight:700;letter-spacing:-.01em;line-height:1.1">朝陽秘籍<br><span style="color:var(--red)">數位版</span></div>
        <div class="s-zh">劇組人才知道的場景。不是打卡地圖，是真的要拍片用的。</div>
      </div>
      <a href="#" class="s-more" onclick="return false" style="opacity:.4;cursor:default">投稿場景 → 即將開放</a>
    </div>

    <!-- Filters -->
    <div class="cl-filters a-up">
      <button class="cl-filter-btn on" onclick="filterLoc('all',this)">全部</button>
      <button class="cl-filter-btn" onclick="filterLoc('霓虹感',this)">霓虹感</button>
      <button class="cl-filter-btn" onclick="filterLoc('工業廢墟',this)">工業廢墟</button>
      <button class="cl-filter-btn" onclick="filterLoc('自然空曠',this)">自然空曠</button>
      <button class="cl-filter-btn" onclick="filterLoc('宗教氛圍',this)">宗教氛圍</button>
      <button class="cl-filter-btn" onclick="filterLoc('復古懷舊',this)">復古懷舊</button>
      <button class="cl-filter-btn" onclick="filterLoc('建築感',this)">建築感</button>
      <button class="cl-filter-btn" onclick="filterLoc('台中',this)">台中</button>
      <button class="cl-filter-btn" onclick="filterLoc('南投',this)">南投</button>
    </div>

    <div class="cl-grid a-stagger" id="clGrid">

      <!-- 1. 虹揚橋 -->
      <div class="cl-card" data-tags="霓虹感 城市感 美式 台中 電影 MV 廣告">
        <div class="cl-city">台中 · 西屯區</div>
        <div class="cl-name">虹揚橋</div>
        <div class="cl-name-en">Honyang Bridge</div>
        <div class="cl-vtags">
          <span class="cl-vtag">霓虹感</span>
          <span class="cl-vtag">城市感</span>
          <span class="cl-vtag">美式</span>
        </div>
        <div class="cl-stypes">
          <span class="cl-stype">電影</span>
          <span class="cl-stype">MV</span>
          <span class="cl-stype">廣告</span>
        </div>
        <div class="cl-meta-row">
          <div class="cl-meta-item"><span class="cl-meta-key">開放時間</span>全天</div>
          <div class="cl-meta-item"><span class="cl-meta-key">停車</span>方便</div>
          <div class="cl-meta-item"><span class="cl-meta-key">申請</span>不需要</div>
        </div>
        <div class="cl-known">
          <div class="cl-known-label">已知拍攝</div>
          <div class="cl-known-item">《中部管轄區》Cipher 場景</div>
        </div>
        <div class="cl-notes">夜景七期大景，霓虹反射感強，城市美式氛圍。適合夜景街頭場景。</div>
        <a class="cl-gps-link" href="https://maps.app.goo.gl/DTD85WUJLBVkyF5u5" target="_blank">↗ Google Maps</a>
      </div>

      <!-- 2. 小叮噹玩具城 -->
      <div class="cl-card" data-tags="玩具 色彩 台中 廣告 MV">
        <div class="cl-city">台中</div>
        <div class="cl-name">小叮噹玩具城</div>
        <div class="cl-name-en">Xiao Ding Dang Toy City</div>
        <div class="cl-vtags">
          <span class="cl-vtag">色彩雜亂</span>
          <span class="cl-vtag">童趣</span>
        </div>
        <div class="cl-stypes">
          <span class="cl-stype">廣告</span>
          <span class="cl-stype">MV</span>
          <span class="cl-stype">短片</span>
        </div>
        <div class="cl-meta-row">
          <div class="cl-meta-item"><span class="cl-meta-key">開放時間</span>需確認營業時間</div>
          <div class="cl-meta-item"><span class="cl-meta-key">停車</span>附近路邊</div>
          <div class="cl-meta-item"><span class="cl-meta-key">申請</span>需洽店家</div>
        </div>
        <div class="cl-notes">拍娃娃店場景首選。色彩密集，視覺衝擊強。需提前與店家溝通拍攝時段。</div>
        <a class="cl-gps-link" href="https://maps.app.goo.gl/SWr1pcruDGyPu2rM7" target="_blank">↗ Google Maps</a>
      </div>

      <!-- 3. 亞芳茶行 -->
      <div class="cl-card" data-tags="復古懷舊 台式 台中 電影 廣告">
        <div class="cl-city">台中 · 西區</div>
        <div class="cl-name">亞芳茶行</div>
        <div class="cl-name-en">Yafang Tea House</div>
        <div class="cl-vtags">
          <span class="cl-vtag">復古懷舊</span>
          <span class="cl-vtag">台式</span>
          <span class="cl-vtag">騎樓</span>
        </div>
        <div class="cl-stypes">
          <span class="cl-stype">電影</span>
          <span class="cl-stype">廣告</span>
          <span class="cl-stype">短片</span>
        </div>
        <div class="cl-meta-row">
          <div class="cl-meta-item"><span class="cl-meta-key">開放時間</span>11:00–20:30</div>
          <div class="cl-meta-item"><span class="cl-meta-key">停車</span>需找路邊</div>
          <div class="cl-meta-item"><span class="cl-meta-key">申請</span>需洽店家</div>
        </div>
        <div class="cl-notes">老派台中騎樓茶行，泡沫紅茶文化縮影。懷舊台式場景首選，顧客流量中等。</div>
        <a class="cl-gps-link" href="https://maps.app.goo.gl/guVFYZhnqiBCxMGm8" target="_blank">↗ Google Maps</a>
      </div>

      <!-- 4. 樂田公園 -->
      <div class="cl-card" data-tags="自然空曠 草地 台中 電影 MV 廣告">
        <div class="cl-city">台中 · 南屯區</div>
        <div class="cl-name">樂田公園</div>
        <div class="cl-name-en">Letian Park</div>
        <div class="cl-vtags">
          <span class="cl-vtag">自然空曠</span>
          <span class="cl-vtag">大草地</span>
        </div>
        <div class="cl-stypes">
          <span class="cl-stype">電影</span>
          <span class="cl-stype">MV</span>
          <span class="cl-stype">廣告</span>
        </div>
        <div class="cl-meta-row">
          <div class="cl-meta-item"><span class="cl-meta-key">開放時間</span>24 小時</div>
          <div class="cl-meta-item"><span class="cl-meta-key">停車</span>方便，附近停車場</div>
          <div class="cl-meta-item"><span class="cl-meta-key">申請</span>不需要（公有地）</div>
        </div>
        <div class="cl-notes">廣闊草皮、人少。適合需要開闊感的場景，白天遮蔭少需注意強光，24小時可進。</div>
        <a class="cl-gps-link" href="https://maps.app.goo.gl/waZZvgpbTNBS4Agg8" target="_blank">↗ Google Maps</a>
      </div>

      <!-- 5. 無名廢棄場地 -->
      <div class="cl-card" data-tags="工業廢墟 末日感 台中 電影 MV">
        <div class="cl-city">台中（無正式名稱）</div>
        <span class="cl-secret">SECRET SPOT</span>
        <div class="cl-name">廢棄鐵皮廠區</div>
        <div class="cl-name-en">Unnamed Industrial Site</div>
        <div class="cl-vtags">
          <span class="cl-vtag">工業廢墟</span>
          <span class="cl-vtag">末日感</span>
          <span class="cl-vtag">紅色鐵皮</span>
        </div>
        <div class="cl-stypes">
          <span class="cl-stype">電影</span>
          <span class="cl-stype">MV</span>
        </div>
        <div class="cl-meta-row">
          <div class="cl-meta-item"><span class="cl-meta-key">開放時間</span>未知，需實勘</div>
          <div class="cl-meta-item"><span class="cl-meta-key">停車</span>未知</div>
          <div class="cl-meta-item"><span class="cl-meta-key">申請</span>未知，需確認所有權</div>
        </div>
        <div class="cl-notes">大量廢棄鐵櫃與紅色鐵皮屋，工業末日氛圍強烈。僅 GPS 座標，建議先實勘確認狀況。</div>
        <a class="cl-gps-link" href="https://www.google.com/maps?q=24.103016,120.6732434" target="_blank">↗ GPS 座標</a>
      </div>

      <!-- 6. 石龍宮 -->
      <div class="cl-card" data-tags="宗教氛圍 道教 南投 電影 紀錄片">
        <div class="cl-city">南投 · 中寮鄉</div>
        <div class="cl-name">石龍宮</div>
        <div class="cl-name-en">Shi Long Temple</div>
        <div class="cl-vtags">
          <span class="cl-vtag">宗教氛圍</span>
          <span class="cl-vtag">道教廟宇</span>
          <span class="cl-vtag">深山河谷</span>
        </div>
        <div class="cl-stypes">
          <span class="cl-stype">電影</span>
          <span class="cl-stype">紀錄片</span>
          <span class="cl-stype">MV</span>
        </div>
        <div class="cl-meta-row">
          <div class="cl-meta-item"><span class="cl-meta-key">開放時間</span>24 小時</div>
          <div class="cl-meta-item"><span class="cl-meta-key">停車</span>有停車場，假日繁忙</div>
          <div class="cl-meta-item"><span class="cl-meta-key">申請</span>需洽廟方</div>
        </div>
        <div class="cl-notes">半夜香火未斷，泡麵文化獨特。偏門廟宇氛圍，凌晨人潮特殊，場面超問號。南投山區，需留意交通時間。</div>
        <a class="cl-gps-link" href="https://maps.app.goo.gl/szWMYppowuxWcGk39" target="_blank">↗ Google Maps</a>
      </div>

      <!-- 7. 中央公園北側停車場 -->
      <div class="cl-card" data-tags="建築感 橋樑 城市感 台中 電影 廣告 MV">
        <div class="cl-city">台中 · 西屯區</div>
        <div class="cl-name">中央公園北側停車場</div>
        <div class="cl-name-en">Central Park North Parking / Bridge</div>
        <div class="cl-vtags">
          <span class="cl-vtag">建築感</span>
          <span class="cl-vtag">橋樑</span>
          <span class="cl-vtag">城市感</span>
        </div>
        <div class="cl-stypes">
          <span class="cl-stype">電影</span>
          <span class="cl-stype">廣告</span>
          <span class="cl-stype">MV</span>
        </div>
        <div class="cl-meta-row">
          <div class="cl-meta-item"><span class="cl-meta-key">開放時間</span>06:00–22:00</div>
          <div class="cl-meta-item"><span class="cl-meta-key">停車</span>就是停車場，直接停</div>
          <div class="cl-meta-item"><span class="cl-meta-key">申請</span>公有，需向台中市府申請</div>
        </div>
        <div class="cl-notes">橋樑結構感強，夜間路燈偏暗有電影感。可拍車景，人煙稀少。官方記錄有拍攝組到訪。</div>
        <a class="cl-gps-link" href="https://maps.app.goo.gl/841eYbj184Xtnm8z5" target="_blank">↗ Google Maps</a>
      </div>

      <!-- 8. Purr 泡泡後大樓 -->
      <div class="cl-card" data-tags="建築感 台中 電影 廣告 MV">
        <div class="cl-city">台中（無正式名稱）</div>
        <span class="cl-secret">SECRET SPOT</span>
        <div class="cl-name">Purr 泡泡後方大樓</div>
        <div class="cl-name-en">Building Behind Purr Café</div>
        <div class="cl-vtags">
          <span class="cl-vtag">建築感</span>
          <span class="cl-vtag">超酷</span>
        </div>
        <div class="cl-stypes">
          <span class="cl-stype">電影</span>
          <span class="cl-stype">廣告</span>
          <span class="cl-stype">MV</span>
        </div>
        <div class="cl-meta-row">
          <div class="cl-meta-item"><span class="cl-meta-key">開放時間</span>未知，需實勘</div>
          <div class="cl-meta-item"><span class="cl-meta-key">停車</span>未知</div>
          <div class="cl-meta-item"><span class="cl-meta-key">申請</span>未知</div>
        </div>
        <div class="cl-notes">Purr 泡泡咖啡館後方建築，視覺衝擊強。以 GPS 座標定位，需實勘確認可及性。</div>
        <a class="cl-gps-link" href="https://www.google.com/maps?q=24.1555191,120.6681918" target="_blank">↗ GPS 座標</a>
      </div>

    </div><!-- /cl-grid -->

    <div class="cta-bar a-up" style="margin-top:1px">
      <div class="cta-bar-text">
        <span class="cta-en">You know a spot? Share it.</span>
        <span class="cta-zh">你踩過的那個場景，可能是別人找了兩個月沒找到的地方。</span>
      </div>
      <button class="btn-r" onclick="alert('投稿功能即將開放，先加入候補名單')">投稿場景 — 即將開放</button>
    </div>
  </div>
</div>
```

---

## Task 5: HTML — Role Modal Element

**File:** `index.html`
**Insert before:** `</body>`

- [ ] **Step 1: Insert role modal**

```html
<!-- ROLE MODAL -->
<div class="role-modal" id="roleModal" onclick="if(event.target===this)closeRoleModal()">
  <div class="role-modal-bg"></div>
  <div class="role-modal-box">
    <button class="rm-close" onclick="closeRoleModal()">✕</button>
    <div class="rm-header">
      <div class="rm-icon" id="rm-icon">📋</div>
      <div class="rm-title-block">
        <div class="rm-en" id="rm-en">Production</div>
        <div class="rm-zh" id="rm-zh">製片組</div>
        <div class="rm-tagline" id="rm-tagline">把所有人和所有事拼在一起的人</div>
      </div>
    </div>
    <div class="rm-section">
      <div class="rm-section-label">這個職組在做什麼</div>
      <div class="rm-desc" id="rm-desc"></div>
    </div>
    <div class="rm-section">
      <div class="rm-section-label">一天的現場時間軸</div>
      <div class="rm-timeline" id="rm-timeline"></div>
    </div>
    <div class="rm-section">
      <div class="rm-section-label">最常見的誤解</div>
      <div class="rm-misconceptions" id="rm-misconceptions"></div>
    </div>
    <div class="rm-section">
      <div class="rm-section-label">怎麼入行</div>
      <div class="rm-entry-list" id="rm-entry"></div>
    </div>
  </div>
</div>
```

---

## Task 6: JavaScript — Data + Functions

**File:** `index.html`
**Insert before:** `</script>` (closing of the main script block at the bottom)

- [ ] **Step 1: Insert role data and functions**

```javascript
// ── ROLE EXPLORER ──────────────────────────────────────
const roleData = {
  producer: {
    icon:'📋', en:'Production', zh:'製片組',
    tagline:'把所有人和所有事拼在一起的人',
    desc:'製片組負責整部片的行政、預算規劃、拍攝計畫與現場協調。從最早期的場勘、選角到殺青後的收尾，製片組貫穿整個製作流程。他們不直接拍攝，但確保所有能拍攝的條件都到位。一個優秀的製片是讓整個機器無聲運轉的那個人。',
    timeline:[
      {time:'06:00',event:'確認今日拍攝場地及人員是否到位，跟場地確認最後細節'},
      {time:'07:30',event:'早班車或場地整備，跟導演過當日重點場次、預計時程'},
      {time:'09:00',event:'正式開拍，全程緊盯進度，協調任何突發狀況'},
      {time:'13:00',event:'午餐安排，確認外燴、素食人數（這個最常忘）'},
      {time:'15:00',event:'盤點下午場次，提前通知夜景場地或下一天行程'},
      {time:'21:00',event:'若有夜景持續作業；收工前確認明日所有準備'},
      {time:'23:00',event:'殺青，整理當日工作報告、回報預算使用'},
    ],
    misconceptions:[
      '製片就是在打雜、跑腿——實際上製片在協調整個拍攝機器的運轉，一個判斷錯誤可能讓整天行程崩潰',
      '只要個性好就可以做製片——需要系統性的細心、熟悉法規、有談判能力，熱情只是入場券',
      '製片不需要懂拍攝技術——你不需要會操作攝影機，但你要知道每個職組需要多少時間做什麼',
    ],
    entry:[
      '通常從製片助理（PA）或場務開始累積經驗',
      '相關科系（廣電、戲劇）有幫助但完全非必要',
      '最重要的能力：細心、抗壓、溝通、快速做決定',
      '推薦路徑：學生製作 → PA → 製片助理 → 執行製片 → 製片',
    ],
  },
  cinematographer: {
    icon:'🎥', en:'Cinematography', zh:'攝影組',
    tagline:'決定觀眾看見什麼的人',
    desc:'攝影組負責拍攝所有畫面，從攝影機的選擇、鏡頭的運動到曝光和構圖，攝影指導（DP）是導演視覺語言的執行者。攝影組通常包含攝影大助、二助、跟焦員等分工，大型製作還有 DIT（數字影像技師）。',
    timeline:[
      {time:'07:00',event:'抵達場地，與燈光組確認打光方案，走一遍鏡位'},
      {time:'08:30',event:'機器架設完成，跟演員做 blocking 確認走位'},
      {time:'09:00',event:'開拍，每個鏡次都要確認對焦、曝光、運鏡是否到位'},
      {time:'13:00',event:'午休，同時 DIT 備份素材，攝影確認下午機位'},
      {time:'14:00',event:'繼續拍攝，若有移機或換景需要重新架設'},
      {time:'18:00',event:'如有黃金時段或夜景，這時開始最後準備'},
      {time:'22:00',event:'收機，確認所有素材備份完成'},
    ],
    misconceptions:[
      '買最貴的攝影機就能拍出好畫面——光線、構圖、運動才是核心，設備是工具不是魔法',
      '攝影師一個人決定所有畫面——攝影指導要跟導演高度協作，執行的是導演的視覺概念',
      '學攝影就是學拍照——電影攝影重視時間軸上的畫面連續性，跟靜態攝影是不同的思維',
    ],
    entry:[
      '通常從攝影助理開始，幫忙搬器材、整理線材是基本功',
      '自己拍短片、MV 累積作品集是最快的方式',
      '最重要的能力：對光線的敏感度、構圖美感、對機器的熟悉度',
      '推薦路徑：自拍短片 → 攝影助理 → 攝影大助 → 攝影師 → DP',
    ],
  },
  gaffer: {
    icon:'💡', en:'Lighting / Gaffer', zh:'燈光組',
    tagline:'用光說話的工程師',
    desc:'燈光組負責根據攝影指導的需求，架設、調整、操作所有燈光設備。首席燈光師（Gaffer）是燈光組的領隊，負責把 DP 的光線構想轉化為現場的實際架設方案。這個職組同時需要藝術感知和電氣安全知識。',
    timeline:[
      {time:'06:30',event:'比攝影組更早到，開始架設主要燈光'},
      {time:'08:00',event:'等待 DP 確認光線方向，根據 DP 指示調整'},
      {time:'09:00',event:'正式開拍，隨每個鏡次調整燈光細節'},
      {time:'13:00',event:'午休期間確認下午場次燈光需求'},
      {time:'14:00',event:'移機時配合拆裝燈具，效率是關鍵'},
      {time:'20:00',event:'夜景燈光架設，戶外夜景通常是最複雜的任務'},
      {time:'23:00',event:'收燈，整理所有器材，確認無損壞'},
    ],
    misconceptions:[
      '燈光就是把燈打亮——燈光的目的是塑造空間感、情緒感，有時候「打暗」比打亮更難',
      '燈光師都很兇、很難相處——這個印象來自幾個特例，多數燈光師是很重視教學傳承的',
      '有燈就好，不用管電——用電安全是燈光組最重要的基本功，這塊沒做好是會出人命的',
    ],
    entry:[
      '從燈光助理（跟燈）開始，從搬燈學起',
      '需要學習基礎電學和安全用電知識',
      '最重要的能力：對光線的感知、體力、安全意識、跟 DP 溝通的能力',
      '推薦路徑：燈光助理 → 大助 → Best Boy → Gaffer',
    ],
  },
  artdept: {
    icon:'🎨', en:'Art Department', zh:'美術組',
    tagline:'打造畫面裡的整個世界',
    desc:'美術組負責所有視覺上看得到的「人為物件」——從場景佈置、道具設計、到服裝、化妝的整體視覺統一。美術指導（Production Designer）是視覺風格的總設計師，他的決定決定了整部片的視覺語言。',
    timeline:[
      {time:'前製期',event:'與導演討論視覺風格，製作場景設計圖與道具清單'},
      {time:'拍攝前 2 天',event:'佈置場景，採購或製作道具，確認所有視覺元素到位'},
      {time:'拍攝當天',event:'比開拍更早到場，確認所有佈置狀態'},
      {time:'拍攝中',event:'隨時在場待命，修補損壞道具，確保連戲'},
      {time:'殺青後',event:'歸還租借道具，拆除佈景，整理資產清單'},
    ],
    misconceptions:[
      '美術就是把場景佈置得漂亮——美術的目標是讓觀眾完全忘記有人佈置過這個場景',
      '美術不需要懂拍攝——美術必須知道攝影機的角度和鏡頭，才能知道什麼地方要做、什麼地方不用',
      '小製作不需要美術——任何有場景的拍攝都需要美術，只是規模不同',
    ],
    entry:[
      '通常從道具助理或美術助理開始',
      '設計相關科系（室設、建築、工業設計）背景很有幫助',
      '最重要的能力：空間感、對細節的執著、快速手作能力、預算控制',
      '推薦路徑：美術助理 → 道具師 → 陳設師 → 美術指導',
    ],
  },
  scriptsupervisor: {
    icon:'📝', en:'Script Supervisor', zh:'場記',
    tagline:'守護連戲的人',
    desc:'場記（Script Supervisor）在拍攝現場負責記錄每一個鏡次的所有細節——演員的位置、道具的擺放、服裝的狀態、對白的準確——確保當不同時間拍的鏡頭剪在一起時，所有細節能夠連貫。',
    timeline:[
      {time:'前製期',event:'仔細閱讀劇本，標注所有可能的連戲問題'},
      {time:'拍攝開始',event:'站在導演旁邊，觀察每一個鏡次的所有細節'},
      {time:'每個 Take',event:'記錄導演的感受、技術問題、演員走位、道具狀態'},
      {time:'換景時',event:'提醒美術組、造型組保持連戲'},
      {time:'後期',event:'提供詳細的場記報告給剪接師，協助剪輯決策'},
    ],
    misconceptions:[
      '場記就是在打字記筆記——場記要同時用眼睛看、耳朵聽、腦袋判斷，是現場最高度專注的職位之一',
      '場記是輕鬆的工作——場記如果出錯，問題在剪接室才會爆發，而且已經無法補救',
      '只有大製作才需要場記——任何需要剪接的拍攝都需要場記，學生製作更需要',
    ],
    entry:[
      '可以從學生製作直接擔任場記開始練習',
      '需要快速閱讀劇本和強大的記憶力與觀察力',
      '最重要的能力：細心、多工處理、對連戲的直覺敏感度',
      '推薦路徑：學生製作場記 → 助理場記 → 場記',
    ],
  },
  editor: {
    icon:'✂️', en:'Post / Editing', zh:'後期剪接',
    tagline:'把素材變成電影的人',
    desc:'剪接師在後期製作階段將所有拍攝素材組合成最終影片。剪接不只是挑好的 Take 接在一起，而是在時間軸上重新說故事——調整節奏、決定情緒起伏、處理敘事邏輯。一部片的最終樣貌，很大程度由剪接決定。',
    timeline:[
      {time:'前製期',event:'閱讀劇本，了解導演意圖和故事節奏'},
      {time:'拍攝期',event:'每日收到素材後開始粗剪（Assembly Cut）'},
      {time:'粗剪完成',event:'與導演反覆討論，進行多輪精剪'},
      {time:'鎖圖（Picture Lock）',event:'畫面確定後，開始聲音設計和調光流程'},
      {time:'後期收尾',event:'視覺特效整合、字幕、DCP 製作'},
    ],
    misconceptions:[
      '剪接就是把好的 Take 接在一起——剪接的核心是節奏和情緒，有時候技術上不完美的 Take 才是對的選擇',
      '剪接師只在後期工作——好的剪接師在前製就要參與，了解拍攝計畫才能在後期做出正確判斷',
      '現在有 AI 剪接了——AI 可以做粗剪，但對故事節奏的判斷仍然需要人類的情感直覺',
    ],
    entry:[
      '可以從自己拍短片並自己剪接開始練習',
      '熟悉主流剪接軟體（Premiere、Final Cut、DaVinci）是基本門檻',
      '最重要的能力：對敘事的直覺、耐心、跟導演溝通的能力',
      '推薦路徑：自學剪接 → 剪接助理 → 剪接師',
    ],
  },
};

function openRoleModal(id) {
  const d = roleData[id]; if (!d) return;
  document.getElementById('rm-icon').textContent = d.icon;
  document.getElementById('rm-en').textContent = d.en;
  document.getElementById('rm-zh').textContent = d.zh;
  document.getElementById('rm-tagline').textContent = d.tagline;
  document.getElementById('rm-desc').textContent = d.desc;
  // Timeline
  const tl = document.getElementById('rm-timeline');
  tl.innerHTML = d.timeline.map(t =>
    `<div class="rm-tl-item"><div class="rm-tl-time">${t.time}</div><div class="rm-tl-event">${t.event}</div></div>`
  ).join('');
  // Misconceptions
  document.getElementById('rm-misconceptions').innerHTML = d.misconceptions.map(m =>
    `<div class="rm-mis-item">${m}</div>`
  ).join('');
  // Entry
  document.getElementById('rm-entry').innerHTML = d.entry.map(e =>
    `<div class="rm-entry-item">${e}</div>`
  ).join('');
  const modal = document.getElementById('roleModal');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.role-modal-box').scrollTop = 0;
}

function closeRoleModal() {
  document.getElementById('roleModal').classList.remove('show');
  document.body.style.overflow = '';
}

// ── LOCATION FILTER ──────────────────────────────────────
function filterLoc(tag, btn) {
  document.querySelectorAll('.cl-filter-btn').forEach(b => b.classList.remove('on'));
  if (btn) btn.classList.add('on');
  document.querySelectorAll('#clGrid .cl-card').forEach(card => {
    if (tag === 'all') {
      card.classList.remove('hidden');
    } else {
      const tags = card.dataset.tags || '';
      card.classList.toggle('hidden', !tags.includes(tag));
    }
  });
}
```

---

## Task 7: Update Navigation

**File:** `index.html`
**Find:** the `<ul>` inside `#navLinks` with existing `<li>` nav items

- [ ] **Step 1: Add two new nav items**

After the existing `<li><a href="#knowledge" ...>知識庫</a></li>` line, add:

```html
<li><a href="#roles" onclick="closeNav()">職組導覽</a></li>
<li><a href="#map" onclick="closeNav()">場景庫</a></li>
```

Also update the hero feature cards section: find the `feat-card` that currently links to `#knowledge` and add a new one or update it to link to `#roles`.

---

## Task 8: Verify + Commit

- [ ] **Step 1: Open in browser**

```bash
open /Users/minehoooo/Desktop/接案/2026CREWLOG影視平台,創業整合/.claude/worktrees/sweet-nightingale/index.html
```

- [ ] **Step 2: Check 職組導覽**
  - 6 role cards visible in 3-column grid
  - Click any card → modal opens with timeline, misconceptions, entry info
  - Click ✕ or outside modal → modal closes
  - Mobile (resize to 768px): 2-column, modal still readable

- [ ] **Step 3: Check 劇組場景庫**
  - 8 location cards visible in 3-column grid
  - Click filter buttons → cards show/hide correctly
  - "全部" resets to all 8 cards
  - SECRET SPOT badge visible on cards 5 and 8
  - GPS links open Google Maps

- [ ] **Step 4: Check nav**
  - "職組導覽" and "場景庫" links in nav scroll to correct sections

- [ ] **Step 5: Commit**

```bash
cd /Users/minehoooo/Desktop/接案/2026CREWLOG影視平台,創業整合/.claude/worktrees/sweet-nightingale
git add index.html
git commit -m "$(cat <<'EOF'
feat: add 職組導覽 + 劇組場景庫 sections as proposal mockup

- Role Explorer: 6 職組 cards with modal detail view (timeline, misconceptions, entry guide)
- Crew Location Database: 8 real seed locations with visual tag filtering
- Replaces thin knowledge base and static location cards with real content

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

**Spec coverage:**
- ✅ 6 role cards with icon, description, difficulty, quote
- ✅ Modal with full description, day timeline, misconceptions, entry requirements
- ✅ 8 real seed locations from design doc
- ✅ Filter buttons by visual style and region
- ✅ Location cards with all required fields (name, tags, shoot types, access, parking, notes)
- ✅ Existing design language maintained (same CSS patterns, colors, fonts)
- ✅ All existing sections preserved

**Placeholder scan:** No TBD or TODO in code blocks. All role data is complete with real content.

**Type consistency:** `openRoleModal(id)` called in onclick matches function definition. `filterLoc(tag, btn)` called with `this` as second arg matches parameter. `roleData` keys match onclick calls (`'producer'`, `'cinematographer'`, `'gaffer'`, `'artdept'`, `'scriptsupervisor'`, `'editor'`).
