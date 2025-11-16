# Control Tower - Complete HTML Structure

## Status: IN PROGRESS ✅ CSS & JavaScript Complete

### ✅ COMPLETED:
1. **All CSS Styling** - 1000+ lines of comprehensive styling
2. **All JavaScript Functions** - Tab switching, AI chat, customer messages
3. **Tab Navigation System** - Dashboard/Tasks/Timeline tabs
4. **Dashboard Metrics** - 4 green gradient cards
5. **Alerts & Priority Actions** - Original dashboard cards

### 🚧 NEXT STEPS - Add HTML for:

## 1. Tab Navigation (Insert after metrics, before dashboard grid)

```html
<!-- Tab Navigation -->
<div class="tower-tabs">
  <button class="tower-tab active" onclick="switchTowerTab('dashboard')">
    Dashboard
    <span class="tower-tab-badge">12</span>
  </button>
  <button class="tower-tab" onclick="switchTowerTab('tasks')">Tasks</button>
  <button class="tower-tab" onclick="switchTowerTab('timeline')">Timeline</button>
</div>
```

## 2. Wrap Existing Dashboard in Tab Content

```html
<!-- Dashboard Tab -->
<div id="tower-tab-dashboard" class="tower-tab-content active">
  <!-- EXISTING tower-grid with Alerts & Priority Actions goes here -->
</div>
```

## 3. Tasks Tab (Complete Table)

```html
<!-- Tasks Tab -->
<div id="tower-tab-tasks" class="tower-tab-content">
  <div class="tower-table-container">
    <div class="tower-table-header">
      <h3 class="tower-table-title">All Tasks</h3>
      <div class="tower-table-actions">
        <button class="tower-btn tower-btn-yellow"><i class="fas fa-filter"></i> Filter</button>
        <button class="tower-btn tower-btn-blue"><i class="fas fa-plus"></i> New Task</button>
      </div>
    </div>
    <div class="tower-table-scroll">
      <table class="tower-table">
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Status</th>
            <th>Scheduled</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>#PX-377903</strong></td>
            <td>Ines Broncano</td>
            <td>Bathroom Install</td>
            <td><span class="tower-status-badge scheduled">Scheduled</span></td>
            <td>Tomorrow 9:00 AM</td>
            <td><strong>€3,850</strong></td>
            <td>
              <div class="tower-action-icons">
                <i class="fas fa-phone tower-action-icon blue" title="Call" onclick="openAIChat('Call Ines Broncano')"></i>
                <i class="fas fa-user-plus tower-action-icon green" title="Assign Pro"></i>
                <i class="fas fa-calendar tower-action-icon purple" title="Reschedule"></i>
              </div>
            </td>
          </tr>
          <!-- Add 5 more rows similar to CPC demo -->
        </tbody>
      </table>
    </div>
  </div>
</div>
```

## 4. Timeline Tab (14-Day Gantt Chart)

```html
<!-- Timeline Tab -->
<div id="tower-tab-timeline" class="tower-tab-content">
  <div class="tower-timeline-container">
    <div class="tower-timeline-header">
      <h3 class="tower-table-title">14-Day Project Timeline</h3>
      <div class="tower-table-actions">
        <button class="tower-btn tower-btn-yellow"><i class="fas fa-filter"></i> Filter Status</button>
        <button class="tower-btn tower-btn-blue"><i class="fas fa-download"></i> Export</button>
      </div>
    </div>

    <div class="tower-legend">
      <div class="tower-legend-item">
        <div class="tower-legend-box" style="background: linear-gradient(135deg, #ef4444, #dc2626);"></div>
        <span>Critical - Urgent Action</span>
      </div>
      <div class="tower-legend-item">
        <div class="tower-legend-box" style="background: linear-gradient(135deg, #f59e0b, #d97706);"></div>
        <span>Warning - Attention Needed</span>
      </div>
      <div class="tower-legend-item">
        <div class="tower-legend-box" style="background: linear-gradient(135deg, #3b82f6, #2563eb);"></div>
        <span>Active - On Track</span>
      </div>
      <div class="tower-legend-item">
        <div class="tower-legend-box" style="background: linear-gradient(135deg, #10b981, #059669);"></div>
        <span>Success - Completed</span>
      </div>
    </div>

    <div class="tower-calendar-wrapper">
      <div class="tower-calendar-scroll">
        <div class="tower-calendar-grid">
          <!-- Header Row: 1 project column + 14 day columns -->
          <!-- 5 Project Rows with timeline bars -->
          <!-- See CPC demo for complete structure -->
        </div>
      </div>
    </div>
  </div>
</div>
```

## 5. AI Chat Widget (Fixed Position)

```html
<!-- AI Chat Widget -->
<div class="tower-chat-widget hidden" id="towerChatWidget">
  <button class="tower-chat-button" id="towerChatButton" onclick="toggleTowerChat()">
    <i class="fas fa-robot"></i>
  </button>

  <div class="tower-chat-window hidden" id="towerChatWindow">
    <div class="tower-chat-header">
      <div class="tower-chat-header-left">
        <div class="tower-chat-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="tower-chat-header-info">
          <div class="tower-chat-header-title">YellowGrid AI</div>
          <div class="tower-chat-header-subtitle">AI + Human Support</div>
        </div>
      </div>
      <button class="tower-chat-close" onclick="toggleTowerChat()">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="tower-chat-messages" id="towerChatMessages">
      <!-- Initial AI greeting message -->
    </div>

    <div class="tower-chat-quick-actions">
      <!-- 4 quick action buttons: Contracts, Assign Pros, Daily Summary, WCF Status -->
    </div>

    <div class="tower-chat-input-area">
      <!-- Input field + send button -->
    </div>
  </div>
</div>
```

## 6. Customer Messages Panel (Fixed Position)

```html
<!-- Customer Messages Panel -->
<div class="tower-messages-panel hidden" id="towerMessagesPanel">
  <div class="tower-messages-header">
    <!-- Green gradient header with conversations icon -->
  </div>

  <div class="tower-conversations-list">
    <!-- 5 conversation items with unread counts -->
    <!-- Maria Santos, Fernando Checa, Ines Broncano, Jose Leon, Antonio Diaz -->
  </div>
</div>
```

## Implementation Priority:

1. ✅ **CSS & JavaScript** - DONE (1037 lines committed)
2. **Tab Navigation HTML** - Add above existing dashboard grid
3. **Tasks Table HTML** - Full 6-row table with action icons
4. **Timeline Gantt HTML** - 14-day grid with 5 project bars
5. **AI Chat Widget HTML** - Fixed bottom-right, yellow theme
6. **Customer Messages Panel HTML** - Fixed bottom-right, green theme

## Key Integration Points:

- Tab buttons call `switchTowerTab(tabName)`
- Action icons call `openAIChat(message)` or `openCustomerMessages()`
- Quick action buttons call `sendTowerQuickMessage(text)`
- Widgets show/hide based on `updateControlTowerWidgets()`
- All styled with YellowGrid dark theme + yellow/green accents

## File Location:
`/Users/20015403/Documents/PROJECTS/personal/YellowGrid-Pitch/index.html`

Lines 2967-3120: Control Tower section
Need to expand with tabs, tasks, timeline, and widgets (inside the section before closing tag)
