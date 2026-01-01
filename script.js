// Business Flow — script.js (EN/JA/ZH + Workspaces + Dark Mode)
// - Language selector is HARD-CODED to: en / ja / zh
// - Each language is ALSO a workspace (separate outcomes/activities/logs)
// - Dark mode toggle is preserved (html[data-theme="dark"])
// - Migrates v2 -> v3 safely, and maps old "general" -> "en"
// - ✅ FIXED: Import no longer calls load() (which overwrote imported state)

(() => {
  const STORAGE_KEY_V3 = "businessFlow_v3";
  const STORAGE_KEY_V2 = "businessFlow_v2";

  const LANGS = ["en", "ja", "zh"];

  const I18N = {
    en: {
      app_title: "Business Flow",
      app_subtitle:
        "Identity leverage triage: outcomes → activities → consistency → future.",
      ui_language: "Language",

      btn_dark_mode: "Dark mode",
      btn_light_mode: "Light mode",
      title_dark_mode: "Switch to dark mode",
      title_light_mode: "Switch to light mode",

      btn_export: "Export",
      btn_import: "Import",
      btn_reset: "Reset",

      tab_today: "Today",
      tab_outcomes: "Outcomes",
      tab_activities: "Activities",
      tab_review: "Review",

      today_title: "Today’s Log",
      today_subtitle:
        "Log progress + done for every activity. Categories = outcomes.",
      label_date: "Date",
      label_focus_mode: "Focus mode",
      mode_balanced: "Balanced (1 per outcome)",
      mode_allin: "All-in (top 3 overall)",
      btn_today: "Today",
      today_empty:
        "Add some activities first — then you can log progress + done here.",

      all_activities_title: "All activities (today)",
      all_activities_subtitle:
        "Choose a qualifier (sessions/reps/calls/etc), log quantity, and mark done.",
      focus_title: "Focus (optional)",
      focus_subtitle: "If you only do one thing today…",
      top_actions_title: "Top Actions",

      outcomes_title: "Top 3 Outcomes",
      outcomes_subtitle:
        "Define outcomes (not tasks). Keep them crisp and measurable.",
      btn_add_outcome: "Add Outcome",
      outcome_limit_note:
        "You can track up to 3 outcomes. (You can edit or delete anytime.)",

      activities_title: "Activities",
      activities_subtitle:
        "Create activities and link them to outcomes with contribution weights.",
      add_activity_title: "Add activity",

      label_activity_name: "Activity name",
      ph_activity_name: "e.g. Study Japanese with neighbor",
      label_minutes: "Minutes",
      ph_minutes: "60",
      label_qualifier: "Progress qualifier (optional)",
      ph_qualifier: "sessions, reps, calls, episodes…",
      label_daily_target: "Daily target (optional)",
      ph_daily_target: "8",
      label_step: "Step (+/−)",
      ph_step: "1",
      label_freq: "Frequency target (per week)",
      ph_freq: "4",
      label_notes: "Notes (optional)",
      ph_notes: "What makes this high leverage?",
      label_confidence: "Confidence (0–10)",
      label_compounding: "Compounding (0–10)",
      label_friction: "Friction (0–10)",
      range_low: "Low",
      range_high: "High",
      range_easy: "Easy",
      range_hard: "Hard",

      contrib_title: "Contribution to outcomes",
      contrib_subtitle: "Set 0 if it doesn’t feed that outcome.",
      btn_add_activity: "Add activity",
      btn_clear: "Clear",
      hint_scores:
        "Scores are calculated from contribution × confidence × compounding vs time + friction.",

      your_activities_title: "Your activities",
      ph_search: "Search activities…",
      sort_highest: "Highest leverage",
      sort_lowest: "Lowest leverage",
      sort_name_az: "Name A→Z",
      sort_name_za: "Name Z→A",
      activities_empty: "No activities yet. Add one above.",

      th_activity: "Activity",
      th_category: "Category",
      th_minutes: "Minutes",
      th_leverage: "Leverage",
      th_progress_today: "Progress today",
      th_done_today: "Done today",
      th_action: "Action",

      category_unlinked: "Unlinked",
      category_count: "{n} activities",

      pill_progress: "Progress: {v}",
      btn_done: "Done",
      btn_undo: "Undo",
      btn_mark_done: "Mark done",

      qualifier_off: "No qualifier (off)",
      qualifier_custom: "Custom…",
      prompt_custom_qualifier:
        "Custom qualifier (e.g. 'kanji', 'client convos', 'songs'):",
      alert_outcome_limit: "You can track up to 3 outcomes.",
      alert_activity_name: "Please enter an activity name.",
      alert_minutes_min: "Minutes must be 5 or more.",

      outcomes_empty: "No outcomes yet. Add up to 3.",
      contrib_empty: "Add outcomes first to set contributions.",
      btn_delete: "Delete",

      label_outcome: "Outcome",
      label_why: "Why it matters (optional)",
      ph_why: "What changes if this is true?",
      label_horizon: "Horizon",
      horizon_7d: "7 days",
      horizon_30d: "30 days",
      horizon_90d: "90 days",
      label_metric_name: "Metric name",
      label_target: "Target",
      label_current: "Current",

      review_title: "Review",
      review_subtitle: "See consistency and outcome feed for the last 7 days.",
      btn_refresh: "Refresh",
      stat_minutes7d: "High-leverage minutes (7d)",
      stat_actions7d: "Actions completed (7d)",
      stat_best_outcome: "Best outcome fed",
      stat_days7d: "Consistency days (7d)",
      outcome_feed_title: "Outcome feed (7d)",
      daily_log_title: "Daily log (7d)",
      stored_note:
        "Stored locally in your browser (localStorage). Export for backups.",
      footer_note: "Business Flow • Ocean mode • Stored locally",

      confirm_reset:
        "Reset Business Flow? This clears all languages/workspaces on this device.",
      import_failed: "Import failed: invalid JSON.",
      import_invalid: "Import failed: invalid file.",

      lever_meta: "Feeds: {outcome} • Leverage: {leverage} • {minutes} min",
      lever_hint_need_activities:
        "Add activities that feed outcomes to see focus suggestions.",
      lever_hint_need_outcomes: "Add outcomes to enable focus suggestions.",
      review_done_pill: "{n} done",
      review_no_actions: "No actions logged.",
      review_actions_feeding: "Actions feeding this outcome:",
    },

    ja: {
      app_title: "ビジネスフロー",
      app_subtitle:
        "アイデンティティ・レバレッジのトリアージ：成果 → 活動 → 継続 → 未来。",
      ui_language: "言語",

      btn_dark_mode: "ダーク",
      btn_light_mode: "ライト",
      title_dark_mode: "ダークモードに切り替え",
      title_light_mode: "ライトモードに切り替え",

      btn_export: "エクスポート",
      btn_import: "インポート",
      btn_reset: "リセット",

      tab_today: "今日",
      tab_outcomes: "成果",
      tab_activities: "活動",
      tab_review: "振り返り",

      today_title: "今日のログ",
      today_subtitle: "すべての活動の進捗と完了を記録。カテゴリ＝成果。",
      label_date: "日付",
      label_focus_mode: "フォーカス",
      mode_balanced: "バランス（各成果から1つ）",
      mode_allin: "全振り（全体トップ3）",
      btn_today: "今日",
      today_empty: "まず活動を追加してから、ここで進捗・完了を記録できます。",

      all_activities_title: "すべての活動（今日）",
      all_activities_subtitle:
        "単位（回数/レップ/コール等）を選び、数量を記録して完了にできます。",
      focus_title: "フォーカス（任意）",
      focus_subtitle: "今日1つだけやるなら…",
      top_actions_title: "おすすめアクション",

      outcomes_title: "上位3つの成果",
      outcomes_subtitle: "タスクではなく成果を定義。短く測定可能に。",
      btn_add_outcome: "成果を追加",
      outcome_limit_note: "最大 <b>3</b> つまで追跡できます。（編集・削除OK）",

      activities_title: "活動",
      activities_subtitle: "活動を作り、成果への寄与（重み）を紐づけます。",
      add_activity_title: "活動を追加",

      label_activity_name: "活動名",
      ph_activity_name: "例：近所の人と日本語を勉強",
      label_minutes: "分",
      ph_minutes: "60",
      label_qualifier: "進捗の単位（任意）",
      ph_qualifier: "回、レップ、コール、話数…",
      label_daily_target: "1日の目標（任意）",
      ph_daily_target: "8",
      label_step: "増減ステップ（±）",
      ph_step: "1",
      label_freq: "週の目標回数",
      ph_freq: "4",
      label_notes: "メモ（任意）",
      ph_notes: "なぜ高レバレッジ？",
      label_confidence: "確信度（0–10）",
      label_compounding: "複利性（0–10）",
      label_friction: "摩擦（0–10）",
      range_low: "低",
      range_high: "高",
      range_easy: "楽",
      range_hard: "大変",

      contrib_title: "成果への寄与",
      contrib_subtitle: "関係なければ 0。",
      btn_add_activity: "追加",
      btn_clear: "クリア",
      hint_scores: "スコア＝寄与×確信度×複利性（時間＋摩擦で割る）",

      your_activities_title: "活動一覧",
      ph_search: "活動を検索…",
      sort_highest: "レバレッジ高い順",
      sort_lowest: "レバレッジ低い順",
      sort_name_az: "名前 A→Z",
      sort_name_za: "名前 Z→A",
      activities_empty: "活動がまだありません。上で追加してください。",

      th_activity: "活動",
      th_category: "カテゴリ",
      th_minutes: "分",
      th_leverage: "レバレッジ",
      th_progress_today: "今日の進捗",
      th_done_today: "今日完了",
      th_action: "操作",

      category_unlinked: "未分類",
      category_count: "{n} 件",

      pill_progress: "進捗: {v}",
      btn_done: "完了",
      btn_undo: "戻す",
      btn_mark_done: "完了にする",

      qualifier_off: "単位なし（オフ）",
      qualifier_custom: "カスタム…",
      prompt_custom_qualifier: "カスタム単位（例：漢字、商談、曲など）：",
      alert_outcome_limit: "成果は最大3つまでです。",
      alert_activity_name: "活動名を入力してください。",
      alert_minutes_min: "分は 5 以上にしてください。",

      outcomes_empty: "成果がありません。最大3つまで追加できます。",
      contrib_empty: "寄与を設定するには先に成果を追加してください。",
      btn_delete: "削除",

      label_outcome: "成果",
      label_why: "理由（任意）",
      ph_why: "これが叶うと何が変わる？",
      label_horizon: "期間",
      horizon_7d: "7日",
      horizon_30d: "30日",
      horizon_90d: "90日",
      label_metric_name: "指標名",
      label_target: "目標",
      label_current: "現在",

      review_title: "振り返り",
      review_subtitle: "直近7日間の継続と成果への寄与を確認。",
      btn_refresh: "更新",
      stat_minutes7d: "高レバ分（7日）",
      stat_actions7d: "完了数（7日）",
      stat_best_outcome: "最も育った成果",
      stat_days7d: "継続日数（7日）",
      outcome_feed_title: "成果への寄与（7日）",
      daily_log_title: "日別ログ（7日）",
      stored_note: "ブラウザにローカル保存。バックアップはエクスポート。",
      footer_note: "ビジネスフロー • Ocean • ローカル保存",

      confirm_reset: "リセットしますか？この端末の全データを削除します。",
      import_failed: "インポート失敗：JSONが不正です。",
      import_invalid: "インポート失敗：ファイルが不正です。",

      lever_meta: "成果: {outcome} • レバレッジ: {leverage} • {minutes}分",
      lever_hint_need_activities:
        "成果に寄与する活動を追加すると、フォーカス候補が表示されます。",
      lever_hint_need_outcomes:
        "成果を追加すると、フォーカス候補が有効になります。",
      review_done_pill: "{n} 完了",
      review_no_actions: "記録はありません。",
      review_actions_feeding: "この成果に貢献した完了数：",
    },

    zh: {
      app_title: "商业流",
      app_subtitle: "身份杠杆分诊：成果 → 活动 → 坚持 → 未来。",
      ui_language: "语言",

      btn_dark_mode: "深色",
      btn_light_mode: "浅色",
      title_dark_mode: "切换到深色模式",
      title_light_mode: "切换到浅色模式",

      btn_export: "导出",
      btn_import: "导入",
      btn_reset: "重置",

      tab_today: "今天",
      tab_outcomes: "成果",
      tab_activities: "活动",
      tab_review: "回顾",

      today_title: "今日记录",
      today_subtitle: "为每个活动记录进度与完成。分类＝成果。",
      label_date: "日期",
      label_focus_mode: "聚焦模式",
      mode_balanced: "均衡（每个成果选1个）",
      mode_allin: "全力（总体前3）",
      btn_today: "今天",
      today_empty: "先添加一些活动，然后就能在这里记录进度与完成。",

      all_activities_title: "所有活动（今天）",
      all_activities_subtitle:
        "选择单位（次数/组/电话等），记录数量并标记完成。",
      focus_title: "聚焦（可选）",
      focus_subtitle: "如果今天只做一件事…",
      top_actions_title: "重点行动",

      outcomes_title: "前三个成果",
      outcomes_subtitle: "定义成果（不是任务）。尽量简洁且可衡量。",
      btn_add_outcome: "添加成果",
      outcome_limit_note: "最多跟踪 <b>3</b> 个成果。（可随时编辑或删除）",

      activities_title: "活动",
      activities_subtitle: "创建活动，并用权重连接到成果。",
      add_activity_title: "添加活动",

      label_activity_name: "活动名称",
      ph_activity_name: "例如：和邻居学习日语",
      label_minutes: "分钟",
      ph_minutes: "60",
      label_qualifier: "进度单位（可选）",
      ph_qualifier: "次数、组数、电话、集数…",
      label_daily_target: "每日目标（可选）",
      ph_daily_target: "8",
      label_step: "步进（+/-）",
      ph_step: "1",
      label_freq: "每周频率目标",
      ph_freq: "4",
      label_notes: "备注（可选）",
      ph_notes: "为什么高杠杆？",
      label_confidence: "把握度（0–10）",
      label_compounding: "复利性（0–10）",
      label_friction: "阻力（0–10）",
      range_low: "低",
      range_high: "高",
      range_easy: "易",
      range_hard: "难",

      contrib_title: "对成果的贡献",
      contrib_subtitle: "不相关就设为 0。",
      btn_add_activity: "添加",
      btn_clear: "清空",
      hint_scores: "分数 = 贡献×把握×复利（再按时间与阻力折算）",

      your_activities_title: "你的活动",
      ph_search: "搜索活动…",
      sort_highest: "杠杆最高",
      sort_lowest: "杠杆最低",
      sort_name_az: "名称 A→Z",
      sort_name_za: "名称 Z→A",
      activities_empty: "还没有活动。请在上方添加。",

      th_activity: "活动",
      th_category: "分类",
      th_minutes: "分钟",
      th_leverage: "杠杆",
      th_progress_today: "今日进度",
      th_done_today: "今日完成",
      th_action: "操作",

      category_unlinked: "未关联",
      category_count: "{n} 个活动",

      pill_progress: "进度：{v}",
      btn_done: "完成",
      btn_undo: "撤销",
      btn_mark_done: "标记完成",

      qualifier_off: "无单位（关闭）",
      qualifier_custom: "自定义…",
      prompt_custom_qualifier: "自定义单位（如：汉字、商谈、歌曲）：",
      alert_outcome_limit: "最多只能跟踪 3 个成果。",
      alert_activity_name: "请输入活动名称。",
      alert_minutes_min: "分钟必须 ≥ 5。",

      outcomes_empty: "还没有成果。最多可添加 3 个。",
      contrib_empty: "请先添加成果再设置贡献。",
      btn_delete: "删除",

      label_outcome: "成果",
      label_why: "为什么重要（可选）",
      ph_why: "如果这是真的，会改变什么？",
      label_horizon: "周期",
      horizon_7d: "7 天",
      horizon_30d: "30 天",
      horizon_90d: "90 天",
      label_metric_name: "指标名称",
      label_target: "目标",
      label_current: "当前",

      review_title: "回顾",
      review_subtitle: "查看过去 7 天的坚持与成果贡献。",
      btn_refresh: "刷新",
      stat_minutes7d: "高杠杆分钟（7天）",
      stat_actions7d: "完成次数（7天）",
      stat_best_outcome: "贡献最高的成果",
      stat_days7d: "坚持天数（7天）",
      outcome_feed_title: "成果贡献（7天）",
      daily_log_title: "每日记录（7天）",
      stored_note: "数据保存在本地浏览器（localStorage）。可导出备份。",
      footer_note: "商业流 • Ocean • 本地保存",

      confirm_reset: "确定重置？将清除本设备上的所有语言/工作区数据。",
      import_failed: "导入失败：JSON 无效。",
      import_invalid: "导入失败：文件无效。",

      lever_meta: "关联成果：{outcome} • 杠杆：{leverage} • {minutes} 分钟",
      lever_hint_need_activities:
        "添加能推动成果的活动后，这里会显示聚焦建议。",
      lever_hint_need_outcomes: "先添加成果以启用聚焦建议。",
      review_done_pill: "{n} 已完成",
      review_no_actions: "没有记录。",
      review_actions_feeding: "推动该成果的完成次数：",
    },
  };

  // NOTE: state is defined later; safe optional chaining is used.
  function t(key, vars = {}) {
    const lang = state?.settings?.uiLang || "en";
    const base = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    return String(base).replace(/\{(\w+)\}/g, (_, k) =>
      vars[k] == null ? "" : String(vars[k])
    );
  }

  // ===== DOM =====
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));

  const exportBtn = document.getElementById("exportBtn");
  const importInput = document.getElementById("importInput");
  const resetBtn = document.getElementById("resetBtn");

  const workspaceSelect = document.getElementById("workspaceSelect");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // Today
  const todayDateInput = document.getElementById("todayDateInput");
  const triageModeSelect = document.getElementById("triageModeSelect");
  const todayJumpBtn = document.getElementById("todayJumpBtn");
  const todayEmpty = document.getElementById("todayEmpty");
  const todayAllWrap = document.getElementById("todayAllWrap");
  const todayList = document.getElementById("todayList");
  const identityLever = document.getElementById("identityLever");

  // Lever controls
  const leverProgressPill = document.getElementById("leverProgressPill");
  const leverMinusBtn = document.getElementById("leverMinusBtn");
  const leverPlusBtn = document.getElementById("leverPlusBtn");
  const leverQtyInput = document.getElementById("leverQtyInput");
  const leverDoneBtn = document.getElementById("leverDoneBtn");

  // Outcomes
  const addOutcomeBtn = document.getElementById("addOutcomeBtn");
  const outcomesWrap = document.getElementById("outcomesWrap");

  // Activities form
  const activityForm = document.getElementById("activityForm");
  const actName = document.getElementById("actName");
  const actMinutes = document.getElementById("actMinutes");
  const actUnit = document.getElementById("actUnit");
  const actTarget = document.getElementById("actTarget");
  const actStep = document.getElementById("actStep");
  const actFreq = document.getElementById("actFreq");
  const actNotes = document.getElementById("actNotes");
  const actConfidence = document.getElementById("actConfidence");
  const actCompounding = document.getElementById("actCompounding");
  const actFriction = document.getElementById("actFriction");
  const confVal = document.getElementById("confVal");
  const compVal = document.getElementById("compVal");
  const fricVal = document.getElementById("fricVal");
  const contribWrap = document.getElementById("contribWrap");
  const clearActivityFormBtn = document.getElementById("clearActivityFormBtn");

  // Activities table
  const activitySearch = document.getElementById("activitySearch");
  const activitySort = document.getElementById("activitySort");
  const activitiesTbody = document.getElementById("activitiesTbody");
  const activitiesEmpty = document.getElementById("activitiesEmpty");

  // Review
  const reviewJumpBtn = document.getElementById("reviewJumpBtn");
  const reviewMinutes = document.getElementById("reviewMinutes");
  const reviewActions = document.getElementById("reviewActions");
  const reviewBestOutcome = document.getElementById("reviewBestOutcome");
  const reviewDays = document.getElementById("reviewDays");
  const outcomeFeedList = document.getElementById("outcomeFeedList");
  const dailyLogList = document.getElementById("dailyLogList");

  // ===== STATE =====
  let state = {
    workspaces: {},
    settings: {
      activeWorkspaceId: "en",
      uiLang: "en",
      triageMode: "balanced",
      theme: "", // "light" | "dark" | ""
    },
  };

  // ===== HELPERS =====
  const pad2 = (n) => String(n).padStart(2, "0");
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  function uid() {
    if (globalThis.crypto && typeof crypto.randomUUID === "function")
      return crypto.randomUUID();
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function toISODate(d) {
    const yyyy = d.getFullYear();
    const mm = pad2(d.getMonth() + 1);
    const dd = pad2(d.getDate());
    return `${yyyy}-${mm}-${dd}`;
  }

  function parseISODate(iso) {
    const [y, m, d] = String(iso).split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0);
  }

  function clamp(n, min, max) {
    const x = Number(n);
    if (!Number.isFinite(x)) return min;
    return Math.max(min, Math.min(max, x));
  }

  function fmt1(n) {
    const nf = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });
    return nf.format(Number(n) || 0);
  }

  function safeMinutes(m) {
    const x = Number(m);
    if (!Number.isFinite(x) || x <= 0) return 30;
    return Math.max(5, x);
  }

  function normUnit(u) {
    const s = String(u || "").trim();
    return s ? s.slice(0, 16) : "";
  }

  function normTarget(x) {
    const n = Number(x);
    if (!Number.isFinite(n) || n < 0) return 0;
    return Math.round(n);
  }

  function normStep(x) {
    const n = Number(x);
    if (!Number.isFinite(n) || n <= 0) return 1;
    return Math.max(1, Math.round(n));
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function ws() {
    const id = state.settings.activeWorkspaceId;
    return state.workspaces[id];
  }

  // ===== WORKSPACES =====
  function normalizeWorkspaceData(w) {
    const out = w && typeof w === "object" ? w : {};
    const outcomes = Array.isArray(out.outcomes) ? out.outcomes : [];
    const activities = Array.isArray(out.activities) ? out.activities : [];
    const logs = out.logs && typeof out.logs === "object" ? out.logs : {};

    const normOutcomes = outcomes.slice(0, 3).map((o, idx) => ({
      id: o.id || uid(),
      title: String(o.title || `Outcome ${idx + 1}`).slice(0, 80),
      why: String(o.why || "").slice(0, 140),
      horizon: o.horizon || "30d",
      metricName: String(o.metricName || "Metric").slice(0, 40),
      target: Number(o.target) || 0,
      current: Number(o.current) || 0,
      createdAt: Number(o.createdAt) || Date.now(),
    }));

    const normActivities = activities.map((a) => ({
      id: a.id || uid(),
      name: String(a.name || "Untitled activity").slice(0, 80),
      minutes: safeMinutes(a.minutes),
      freq: Number(a.freq) || 0,
      notes: String(a.notes || "").slice(0, 120),
      confidence: clamp(a.confidence ?? 7, 0, 10),
      compounding: clamp(a.compounding ?? 7, 0, 10),
      friction: clamp(a.friction ?? 4, 0, 10),
      contrib: a.contrib && typeof a.contrib === "object" ? a.contrib : {},
      unit: normUnit(a.unit || ""),
      target: normTarget(a.target ?? 0),
      step: normStep(a.step ?? 1),
      createdAt: Number(a.createdAt) || Date.now(),
    }));

    const normLogs = {};
    for (const day of Object.keys(logs)) {
      const log = logs[day];
      if (!log || typeof log !== "object") continue;
      normLogs[day] = {};
      for (const aid of Object.keys(log)) {
        const e = log[aid];
        if (!e || typeof e !== "object") continue;
        normLogs[day][aid] = {
          done: Boolean(e.done),
          minutes: safeMinutes(e.minutes),
          qty: Number.isFinite(Number(e.qty)) ? Number(e.qty) : 0,
          at: Number(e.at) || Date.now(),
        };
      }
    }

    return {
      outcomes: normOutcomes,
      activities: normActivities,
      logs: normLogs,
    };
  }

  function ensureLangWorkspaces() {
    // If old "general" exists, map to "en"
    if (state.workspaces.general && !state.workspaces.en) {
      state.workspaces.en = state.workspaces.general;
      delete state.workspaces.general;
    }

    for (const id of LANGS) {
      if (!state.workspaces[id]) {
        state.workspaces[id] = { outcomes: [], activities: [], logs: {} };
      }
      state.workspaces[id] = normalizeWorkspaceData(state.workspaces[id]);
    }

    if (!LANGS.includes(state.settings.activeWorkspaceId)) {
      state.settings.activeWorkspaceId = "en";
    }
    if (!LANGS.includes(state.settings.uiLang)) {
      state.settings.uiLang = state.settings.activeWorkspaceId || "en";
    }
  }

  // ===== I18N APPLY =====
  function applyI18n() {
    const lang = state.settings.uiLang || "en";
    document.documentElement.lang = lang;
    document.title = t("app_title");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      el.setAttribute("title", t(key));
    });

    updateThemeToggleText();
    if (workspaceSelect) workspaceSelect.value = state.settings.uiLang || "en";
  }

  // ===== THEME =====
  function defaultThemeFromSystem() {
    try {
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  }

  function updateThemeToggleText() {
    if (!themeToggleBtn) return;
    const isDark = document.documentElement.dataset.theme === "dark";
    themeToggleBtn.textContent = isDark
      ? t("btn_light_mode")
      : t("btn_dark_mode");
    themeToggleBtn.title = isDark
      ? t("title_light_mode")
      : t("title_dark_mode");
  }

  function applyTheme(theme) {
    const tval = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = tval;
    updateThemeToggleText();
  }

  // ===== STORAGE =====
  function save() {
    localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state));
  }

  // ✅ Shared normalizer: used by load() and import()
  function normalizeTopLevelState() {
    if (!state || typeof state !== "object")
      state = { workspaces: {}, settings: {} };
    if (!state.workspaces || typeof state.workspaces !== "object")
      state.workspaces = {};
    if (!state.settings || typeof state.settings !== "object")
      state.settings = {};

    if (!state.settings.triageMode) state.settings.triageMode = "balanced";
    if (!state.settings.activeWorkspaceId)
      state.settings.activeWorkspaceId = "en";
    if (!state.settings.uiLang)
      state.settings.uiLang = state.settings.activeWorkspaceId || "en";
    if (!state.settings.theme) state.settings.theme = "";

    ensureLangWorkspaces();

    if (!state.settings.theme) state.settings.theme = defaultThemeFromSystem();
  }

  // ✅ Import compatibility: accepts wrapper {state}, raw state, or v2-ish shape
  function coerceImportedState(obj) {
    if (!obj || typeof obj !== "object") return null;

    // If it's our export wrapper, peel it
    const maybe = obj.state && typeof obj.state === "object" ? obj.state : obj;

    // v3 shape
    if (
      maybe.workspaces &&
      typeof maybe.workspaces === "object" &&
      maybe.settings
    )
      return maybe;

    // v2-ish shape
    const hasV2Shape =
      Array.isArray(maybe.outcomes) ||
      Array.isArray(maybe.activities) ||
      (maybe.logs && typeof maybe.logs === "object");

    if (hasV2Shape) {
      return {
        workspaces: {
          en: {
            outcomes: Array.isArray(maybe.outcomes) ? maybe.outcomes : [],
            activities: Array.isArray(maybe.activities) ? maybe.activities : [],
            logs:
              maybe.logs && typeof maybe.logs === "object" ? maybe.logs : {},
          },
          ja: { outcomes: [], activities: [], logs: {} },
          zh: { outcomes: [], activities: [], logs: {} },
        },
        settings: {
          activeWorkspaceId: "en",
          uiLang: "en",
          triageMode:
            maybe.settings && typeof maybe.settings === "object"
              ? maybe.settings.triageMode || "balanced"
              : "balanced",
          theme:
            maybe.settings && typeof maybe.settings === "object"
              ? maybe.settings.theme || ""
              : "",
        },
      };
    }

    return null;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_V3);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") state = parsed;
      } else {
        // migrate v2
        const old = localStorage.getItem(STORAGE_KEY_V2);
        if (old) {
          const v2 = JSON.parse(old);
          if (v2 && typeof v2 === "object") {
            state = {
              workspaces: {
                en: {
                  outcomes: Array.isArray(v2.outcomes) ? v2.outcomes : [],
                  activities: Array.isArray(v2.activities) ? v2.activities : [],
                  logs: v2.logs && typeof v2.logs === "object" ? v2.logs : {},
                },
                ja: { outcomes: [], activities: [], logs: {} },
                zh: { outcomes: [], activities: [], logs: {} },
              },
              settings: {
                activeWorkspaceId: "en",
                uiLang: "en",
                triageMode:
                  v2.settings && typeof v2.settings === "object"
                    ? v2.settings.triageMode || "balanced"
                    : "balanced",
                theme: "",
              },
            };
          }
        }
      }
    } catch {
      // ignore
    }

    normalizeTopLevelState();
  }

  function setLanguage(lang) {
    const next = LANGS.includes(lang) ? lang : "en";
    state.settings.uiLang = next;
    state.settings.activeWorkspaceId = next; // language == workspace
    save();
    applyI18n();
    renderAll();
  }

  // ===== SCORING =====
  function scoreForOutcome(activity, outcomeId) {
    const contribution = clamp(activity.contrib?.[outcomeId] ?? 0, 0, 10);
    if (contribution <= 0) return 0;

    const confidence = clamp(activity.confidence, 0, 10);
    const comp = clamp(activity.compounding, 0, 10);
    const fric = clamp(activity.friction, 0, 10);

    const hours = safeMinutes(activity.minutes) / 60;
    const numerator = contribution * confidence * (1 + comp / 10);
    const denom = hours * (1 + fric / 10);
    return denom <= 0 ? 0 : numerator / denom;
  }

  function overallScore(activity) {
    const S = ws();
    if (!S.outcomes.length) return 0;
    return Math.max(...S.outcomes.map((o) => scoreForOutcome(activity, o.id)));
  }

  function primaryOutcome(activity) {
    const S = ws();
    let best = null;
    for (const o of S.outcomes) {
      const c = clamp(activity.contrib?.[o.id] ?? 0, 0, 10);
      if (c <= 0) continue;
      const s = scoreForOutcome(activity, o.id);
      if (!best || c > best.c || (c === best.c && s > best.s))
        best = { o, c, s };
    }
    return best ? best.o : null;
  }

  function formatProgress(activity, entry) {
    const unit = normUnit(activity.unit || "");
    const target = normTarget(activity.target || 0);
    const qty = Number(entry?.qty) || 0;
    if (!unit && !target) return "—";
    if (target > 0) return `${fmt1(qty)}/${fmt1(target)} ${unit || ""}`.trim();
    return `${fmt1(qty)} ${unit}`.trim();
  }

  // ===== LOGGING =====
  function getDayLog(dateISO) {
    const S = ws();
    if (!S.logs[dateISO] || typeof S.logs[dateISO] !== "object")
      S.logs[dateISO] = {};
    return S.logs[dateISO];
  }

  function ensureEntry(activityId, dateISO) {
    const S = ws();
    const day = getDayLog(dateISO);
    if (!day[activityId] || typeof day[activityId] !== "object") {
      const act = S.activities.find((a) => a.id === activityId);
      day[activityId] = {
        done: false,
        minutes: safeMinutes(act?.minutes ?? 30),
        qty: 0,
        at: Date.now(),
      };
    }
    return day[activityId];
  }

  function isDoneToday(activityId, dateISO) {
    const day = getDayLog(dateISO);
    return Boolean(day[activityId]?.done);
  }

  function toggleDone(activityId, dateISO) {
    const day = getDayLog(dateISO);
    const existing = day[activityId];

    if (existing?.done) {
      if (Number(existing.qty) > 0) {
        day[activityId] = { ...existing, done: false, at: Date.now() };
      } else {
        delete day[activityId];
      }
    } else {
      const act = ws().activities.find((a) => a.id === activityId);
      const base = existing && typeof existing === "object" ? existing : null;
      day[activityId] = {
        done: true,
        minutes: safeMinutes(act?.minutes ?? base?.minutes ?? 30),
        qty: Number(base?.qty) || 0,
        at: Date.now(),
      };
    }

    save();
    renderAll();
  }

  function setQty(activityId, dateISO, qty) {
    const S = ws();
    const act = S.activities.find((a) => a.id === activityId);
    const day = getDayLog(dateISO);
    const prev =
      day[activityId] && typeof day[activityId] === "object"
        ? day[activityId]
        : null;

    let q = Number(qty);
    if (!Number.isFinite(q)) q = 0;
    q = Math.max(0, q);

    day[activityId] = {
      done: Boolean(prev?.done),
      minutes: safeMinutes(act?.minutes ?? prev?.minutes ?? 30),
      qty: q,
      at: Date.now(),
    };

    save();
    renderAll();
  }

  function bumpQty(activityId, dateISO, delta) {
    const entry = ensureEntry(activityId, dateISO);
    const cur = Number(entry.qty) || 0;
    setQty(activityId, dateISO, Math.max(0, cur + delta));
  }

  // ===== NAV =====
  function showPanel(name) {
    panels.forEach((p) =>
      p.classList.toggle("hidden", p.dataset.panel !== name)
    );
    tabs.forEach((tbtn) =>
      tbtn.classList.toggle("is-active", tbtn.dataset.tab === name)
    );
  }

  tabs.forEach((tbtn) => {
    tbtn.addEventListener("click", () => {
      showPanel(tbtn.dataset.tab);
      renderAll();
    });
  });

  // ===== OUTCOMES UI =====
  function addOutcome() {
    const S = ws();
    if (S.outcomes.length >= 3) return alert(t("alert_outcome_limit"));
    const idx = S.outcomes.length + 1;
    S.outcomes.push({
      id: uid(),
      title: `Outcome ${idx}`,
      why: "",
      horizon: "30d",
      metricName: "Metric",
      target: 0,
      current: 0,
      createdAt: Date.now(),
    });
    save();
    renderAll();
  }

  function deleteOutcome(outcomeId) {
    const S = ws();
    S.outcomes = S.outcomes.filter((o) => o.id !== outcomeId);
    S.activities = S.activities.map((a) => {
      const c = { ...(a.contrib || {}) };
      delete c[outcomeId];
      return { ...a, contrib: c };
    });
    save();
    renderAll();
  }

  function moveOutcome(outcomeId, dir) {
    const S = ws();
    const i = S.outcomes.findIndex((o) => o.id === outcomeId);
    if (i === -1) return;
    const j = i + dir;
    if (j < 0 || j >= S.outcomes.length) return;
    const copy = S.outcomes.slice();
    const [picked] = copy.splice(i, 1);
    copy.splice(j, 0, picked);
    S.outcomes = copy;
    save();
    renderAll();
  }

  function renderContributionInputs() {
    const S = ws();
    contribWrap.innerHTML = "";

    if (!S.outcomes.length) {
      contribWrap.innerHTML = `<div class="empty">${t("contrib_empty")}</div>`;
      return;
    }

    for (const o of S.outcomes) {
      const row = document.createElement("div");
      row.className = "contrib-row";
      row.innerHTML = `
        <div class="name">${escapeHtml(o.title)}</div>
        <div>
          <input class="contrib-slider" data-oid="${
            o.id
          }" type="range" min="0" max="10" value="0" />
          <div class="range-meta"><span>0</span><b class="val">0</b><span>10</span></div>
        </div>
      `;
      const slider = row.querySelector(".contrib-slider");
      const valEl = row.querySelector(".val");
      slider.addEventListener(
        "input",
        () => (valEl.textContent = slider.value)
      );
      contribWrap.appendChild(row);
    }
  }

  function renderOutcomes() {
    const S = ws();
    outcomesWrap.innerHTML = "";

    if (!S.outcomes.length) {
      outcomesWrap.innerHTML = `<div class="empty">${t(
        "outcomes_empty"
      )}</div>`;
      renderContributionInputs();
      return;
    }

    for (let i = 0; i < S.outcomes.length; i++) {
      const o = S.outcomes[i];
      const card = document.createElement("div");
      card.className = "card outcome-card soft";

      card.innerHTML = `
        <div class="outcome-top">
          <span class="badge">${escapeHtml(t("label_outcome"))} ${i + 1}</span>
          <div class="inline">
            <button class="btn btn-ghost" data-act="up" ${
              i === 0 ? "disabled" : ""
            }>↑</button>
            <button class="btn btn-ghost" data-act="down" ${
              i === S.outcomes.length - 1 ? "disabled" : ""
            }>↓</button>
            <button class="btn btn-danger" data-act="delete">${escapeHtml(
              t("btn_delete")
            )}</button>
          </div>
        </div>

        <div class="form" style="margin-top:10px;">
          <label class="field">
            <span>${escapeHtml(t("label_outcome"))}</span>
            <input data-k="title" type="text" maxlength="80" value="${escapeHtml(
              o.title
            )}" />
          </label>

          <label class="field">
            <span>${escapeHtml(t("label_why"))}</span>
            <input data-k="why" type="text" maxlength="140" value="${escapeHtml(
              o.why
            )}"
              placeholder="${escapeHtml(t("ph_why"))}" />
          </label>

          <div class="row">
            <label class="field">
              <span>${escapeHtml(t("label_horizon"))}</span>
              <select data-k="horizon">
                <option value="7d" ${
                  o.horizon === "7d" ? "selected" : ""
                }>${escapeHtml(t("horizon_7d"))}</option>
                <option value="30d" ${
                  o.horizon === "30d" ? "selected" : ""
                }>${escapeHtml(t("horizon_30d"))}</option>
                <option value="90d" ${
                  o.horizon === "90d" ? "selected" : ""
                }>${escapeHtml(t("horizon_90d"))}</option>
              </select>
            </label>
            <label class="field">
              <span>${escapeHtml(t("label_metric_name"))}</span>
              <input data-k="metricName" type="text" maxlength="40" value="${escapeHtml(
                o.metricName
              )}" />
            </label>
          </div>

          <div class="row">
            <label class="field">
              <span>${escapeHtml(t("label_target"))}</span>
              <input data-k="target" type="number" step="1" value="${
                Number(o.target) || 0
              }" />
            </label>
            <label class="field">
              <span>${escapeHtml(t("label_current"))}</span>
              <input data-k="current" type="number" step="1" value="${
                Number(o.current) || 0
              }" />
            </label>
          </div>
        </div>
      `;

      card
        .querySelector('[data-act="delete"]')
        .addEventListener("click", () => deleteOutcome(o.id));
      card
        .querySelector('[data-act="up"]')
        .addEventListener("click", () => moveOutcome(o.id, -1));
      card
        .querySelector('[data-act="down"]')
        .addEventListener("click", () => moveOutcome(o.id, +1));

      card.querySelectorAll("[data-k]").forEach((el) => {
        el.addEventListener("change", () => {
          const key = el.getAttribute("data-k");
          const idx2 = S.outcomes.findIndex((x) => x.id === o.id);
          if (idx2 === -1) return;
          let val = el.value;
          if (key === "target" || key === "current") val = Number(val) || 0;
          S.outcomes[idx2] = { ...S.outcomes[idx2], [key]: val };
          save();
          renderAll();
        });
      });

      outcomesWrap.appendChild(card);
    }

    renderContributionInputs();
  }

  // ===== ACTIVITIES UI =====
  function clearActivityForm() {
    actName.value = "";
    actMinutes.value = "";
    actUnit.value = "";
    actTarget.value = "";
    actStep.value = "";
    actFreq.value = "";
    actNotes.value = "";
    actConfidence.value = "7";
    actCompounding.value = "7";
    actFriction.value = "4";
    confVal.textContent = "7";
    compVal.textContent = "7";
    fricVal.textContent = "4";

    contribWrap.querySelectorAll(".contrib-slider").forEach((s) => {
      s.value = "0";
      const v = s.parentElement.querySelector(".val");
      if (v) v.textContent = "0";
    });

    actName.focus();
  }

  function addActivityFromForm(e) {
    e.preventDefault();

    const S = ws();
    if (!String(actName.value).trim()) return alert(t("alert_activity_name"));
    const minutes = Number(actMinutes.value);
    if (!Number.isFinite(minutes) || minutes < 5)
      return alert(t("alert_minutes_min"));

    const contrib = {};
    contribWrap.querySelectorAll(".contrib-slider").forEach((s) => {
      const oid = s.getAttribute("data-oid");
      const v = clamp(Number(s.value), 0, 10);
      if (oid) contrib[oid] = v;
    });

    const a = {
      id: uid(),
      name: String(actName.value).trim().slice(0, 80),
      minutes: safeMinutes(minutes),
      unit: normUnit(actUnit.value),
      target: normTarget(actTarget.value),
      step: normStep(actStep.value || 1),
      freq: Number(actFreq.value) || 0,
      notes: String(actNotes.value || "")
        .trim()
        .slice(0, 120),
      confidence: clamp(Number(actConfidence.value), 0, 10),
      compounding: clamp(Number(actCompounding.value), 0, 10),
      friction: clamp(Number(actFriction.value), 0, 10),
      contrib,
      createdAt: Date.now(),
    };

    if (a.target > 0 && !a.unit) a.unit = "sessions";

    S.activities.push(a);
    save();
    clearActivityForm();
    renderAll();
  }

  function deleteActivity(activityId) {
    const S = ws();
    S.activities = S.activities.filter((a) => a.id !== activityId);
    for (const day of Object.keys(S.logs)) {
      if (S.logs?.[day]?.[activityId]) delete S.logs[day][activityId];
    }
    save();
    renderAll();
  }

  // ===== Qualifier selector =====
  const QUALIFIERS = [
    "",
    "sessions",
    "reps",
    "sales calls",
    "outreach messages",
    "anime episodes",
    "pages",
    "minutes",
    "hours",
    "videos",
    "posts",
    "lessons",
    "games",
    "pushups",
    "glasses of water",
  ];

  function buildQualifierSelect(activity) {
    const sel = document.createElement("select");
    sel.className = "unit-select";

    const current = normUnit(activity.unit);
    const options = QUALIFIERS.includes(current)
      ? QUALIFIERS
      : [...QUALIFIERS, current];

    for (const v of options) {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v === "" ? t("qualifier_off") : v;
      if (v === current) opt.selected = true;
      sel.appendChild(opt);
    }

    const custom = document.createElement("option");
    custom.value = "__custom__";
    custom.textContent = t("qualifier_custom");
    sel.appendChild(custom);

    sel.addEventListener("change", () => {
      let next = sel.value;
      if (next === "__custom__") {
        const typed = prompt(t("prompt_custom_qualifier"), current || "");
        if (typed == null) {
          sel.value = current;
          return;
        }
        next = normUnit(typed);
        if (!next) next = "";
      }

      const S = ws();
      const i = S.activities.findIndex((a) => a.id === activity.id);
      if (i === -1) return;

      const patch = { unit: next };
      if (!next) patch.target = 0;

      S.activities[i] = { ...S.activities[i], ...patch };
      save();
      renderAll();
    });

    return sel;
  }

  // ===== Activities table =====
  function makeCell(label, contentOrNode, extraClass = "") {
    const td = document.createElement("td");
    if (extraClass) td.className = extraClass;
    td.setAttribute("data-label", label);
    if (contentOrNode instanceof Node) td.appendChild(contentOrNode);
    else td.innerHTML = String(contentOrNode);
    return td;
  }

  function renderActivities() {
    const S = ws();
    const q = (activitySearch.value || "").trim().toLowerCase();
    const sort = activitySort.value;
    const dateISO = todayDateInput.value || toISODate(new Date());

    let list = S.activities.slice();
    if (q)
      list = list.filter((a) =>
        (a.name + " " + (a.notes || "")).toLowerCase().includes(q)
      );

    list.sort((a, b) => {
      const sa = overallScore(a);
      const sb = overallScore(b);
      switch (sort) {
        case "scoreAsc":
          return sa - sb;
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "scoreDesc":
        default:
          return sb - sa;
      }
    });

    activitiesTbody.innerHTML = "";
    activitiesEmpty.style.display = list.length ? "none" : "block";

    for (const a of list) {
      const tr = document.createElement("tr");
      const score = overallScore(a);
      const cat = primaryOutcome(a);
      const categoryLabel = cat ? cat.title : t("category_unlinked");

      const log = getDayLog(dateISO);
      const entry = log[a.id];

      tr.appendChild(makeCell(t("th_activity"), escapeHtml(a.name)));
      tr.appendChild(makeCell(t("th_category"), escapeHtml(categoryLabel)));
      tr.appendChild(
        makeCell(t("th_minutes"), String(safeMinutes(a.minutes)), "right")
      );
      tr.appendChild(makeCell(t("th_leverage"), fmt1(score), "right"));

      // Progress today
      const progressCell = document.createElement("div");
      progressCell.className = "progress-cell";

      const qsel = buildQualifierSelect(a);

      const pill = document.createElement("span");
      pill.className = "pill blue";
      pill.textContent = formatProgress(a, entry);

      const qtyWrap = document.createElement("div");
      qtyWrap.className = "qty";
      const step = normStep(a.step || 1);

      const minus = document.createElement("button");
      minus.className = "icon-btn";
      minus.type = "button";
      minus.textContent = "−";
      minus.addEventListener("click", () => bumpQty(a.id, dateISO, -step));

      const inp = document.createElement("input");
      inp.type = "number";
      inp.min = "0";
      inp.step = "1";
      inp.inputMode = "numeric";
      inp.value = String(Number(entry?.qty) || 0);
      inp.addEventListener("change", () => setQty(a.id, dateISO, inp.value));

      const plus = document.createElement("button");
      plus.className = "icon-btn";
      plus.type = "button";
      plus.textContent = "+";
      plus.addEventListener("click", () => bumpQty(a.id, dateISO, +step));

      qtyWrap.appendChild(minus);
      qtyWrap.appendChild(inp);
      qtyWrap.appendChild(plus);

      progressCell.appendChild(qsel);
      progressCell.appendChild(pill);
      progressCell.appendChild(qtyWrap);

      tr.appendChild(makeCell(t("th_progress_today"), progressCell, "right"));

      // Done today
      const done = isDoneToday(a.id, dateISO);
      const doneBtn = document.createElement("button");
      doneBtn.className = `btn ${done ? "btn-primary" : "btn-ghost"}`;
      doneBtn.type = "button";
      doneBtn.textContent = done ? t("btn_done") : t("btn_mark_done");
      doneBtn.addEventListener("click", () => toggleDone(a.id, dateISO));
      tr.appendChild(makeCell(t("th_done_today"), doneBtn, "right"));

      // Action
      const actions = document.createElement("div");
      actions.className = "inline";
      const del = document.createElement("button");
      del.className = "btn btn-danger";
      del.type = "button";
      del.textContent = t("btn_delete");
      del.addEventListener("click", () => deleteActivity(a.id));
      actions.appendChild(del);
      tr.appendChild(makeCell(t("th_action"), actions, "right"));

      activitiesTbody.appendChild(tr);
    }
  }

  // ===== TODAY (grouped list + focus) =====
  function renderTodayAll() {
    const S = ws();
    const dateISO = todayDateInput.value || toISODate(new Date());
    todayAllWrap.innerHTML = "";
    if (!S.activities.length) return;

    const groups = new Map();
    for (const o of S.outcomes) groups.set(o.id, { title: o.title, items: [] });
    groups.set("__unlinked__", { title: t("category_unlinked"), items: [] });

    for (const a of S.activities) {
      const cat = primaryOutcome(a);
      const key = cat ? cat.id : "__unlinked__";
      groups.get(key).items.push(a);
    }

    const orderedKeys = [...S.outcomes.map((o) => o.id), "__unlinked__"];

    for (const key of orderedKeys) {
      const g = groups.get(key);
      if (!g || !g.items.length) continue;

      g.items.sort((a, b) => overallScore(b) - overallScore(a));

      const block = document.createElement("div");
      block.className = "category-block";

      const head = document.createElement("div");
      head.className = "category-head";
      head.innerHTML = `
        <div class="category-title">${escapeHtml(g.title)}</div>
        <div class="category-count">${escapeHtml(
          t("category_count", { n: g.items.length })
        )}</div>
      `;
      block.appendChild(head);

      for (const a of g.items) {
        const row = document.createElement("div");
        row.className = "today-row";

        const log = getDayLog(dateISO);
        const entry = log[a.id];
        const done = Boolean(entry?.done);

        const left = document.createElement("div");
        left.innerHTML = `
          <div class="today-row-title">${escapeHtml(a.name)}</div>
          <div class="today-row-meta">
            ${safeMinutes(a.minutes)} min • Leverage <b>${fmt1(
          overallScore(a)
        )}</b>
            ${a.notes ? `<br/>${escapeHtml(a.notes)}` : ""}
          </div>
        `;

        const controls = document.createElement("div");
        controls.className = "today-controls";

        const qualifierSelect = buildQualifierSelect(a);
        controls.appendChild(qualifierSelect);

        const pill = document.createElement("span");
        pill.className = "pill blue";
        pill.textContent = formatProgress(a, entry);
        controls.appendChild(pill);

        const qtyWrap = document.createElement("div");
        qtyWrap.className = "qty";
        const step = normStep(a.step || 1);

        const minus = document.createElement("button");
        minus.className = "icon-btn";
        minus.type = "button";
        minus.textContent = "−";
        minus.addEventListener("click", () => bumpQty(a.id, dateISO, -step));

        const inp = document.createElement("input");
        inp.type = "number";
        inp.min = "0";
        inp.step = "1";
        inp.inputMode = "numeric";
        inp.value = String(Number(entry?.qty) || 0);
        inp.addEventListener("change", () => setQty(a.id, dateISO, inp.value));

        const plus = document.createElement("button");
        plus.className = "icon-btn";
        plus.type = "button";
        plus.textContent = "+";
        plus.addEventListener("click", () => bumpQty(a.id, dateISO, +step));

        qtyWrap.appendChild(minus);
        qtyWrap.appendChild(inp);
        qtyWrap.appendChild(plus);
        controls.appendChild(qtyWrap);

        const doneBtn = document.createElement("button");
        doneBtn.className = `btn ${done ? "btn-primary" : "btn-ghost"}`;
        doneBtn.type = "button";
        doneBtn.textContent = done ? t("btn_done") : t("btn_mark_done");
        doneBtn.addEventListener("click", () => toggleDone(a.id, dateISO));
        controls.appendChild(doneBtn);

        row.appendChild(left);
        row.appendChild(controls);
        block.appendChild(row);
      }

      todayAllWrap.appendChild(block);
    }
  }

  function getCandidatesForOutcome(outcomeId) {
    const S = ws();
    return S.activities
      .map((a) => ({ a, s: scoreForOutcome(a, outcomeId) }))
      .filter((x) => x.s > 0)
      .sort((x, y) => y.s - x.s);
  }

  function pickBestOutcomeLink(activity, dateISO, preScore = null) {
    const S = ws();
    let best = null;
    for (const o of S.outcomes) {
      const s = scoreForOutcome(activity, o.id);
      if (!best || s > best.s) best = { o, s };
    }
    return {
      activity,
      score: preScore != null ? preScore : best ? best.s : 0,
      outcome: best ? best.o : null,
      done: isDoneToday(activity.id, dateISO),
    };
  }

  function triage(dateISO, mode) {
    const S = ws();
    const outs = S.outcomes;
    if (!outs.length || !S.activities.length) return [];

    if (mode === "allin") {
      return S.activities
        .map((a) => ({ a, s: overallScore(a) }))
        .filter((x) => x.s > 0)
        .sort((x, y) => y.s - x.s)
        .slice(0, 3)
        .map((x) => pickBestOutcomeLink(x.a, dateISO, x.s));
    }

    const picked = [];
    const used = new Set();

    for (const o of outs) {
      const cand = getCandidatesForOutcome(o.id);
      let chosen = null;

      for (const c of cand) {
        if (!used.has(c.a.id)) {
          chosen = { activity: c.a, score: c.s, outcome: o };
          break;
        }
      }
      if (!chosen && cand.length)
        chosen = { activity: cand[0].a, score: cand[0].s, outcome: o };

      if (chosen) {
        used.add(chosen.activity.id);
        picked.push({
          activity: chosen.activity,
          score: chosen.score,
          outcome: chosen.outcome,
          done: isDoneToday(chosen.activity.id, dateISO),
        });
      }
    }

    if (picked.length < 3) {
      const scored = S.activities
        .map((a) => ({ a, s: overallScore(a) }))
        .filter((x) => x.s > 0)
        .sort((x, y) => y.s - x.s);

      for (const x of scored) {
        if (picked.length >= 3) break;
        if (picked.some((p) => p.activity.id === x.a.id)) continue;
        picked.push(pickBestOutcomeLink(x.a, dateISO, x.s));
      }
    }

    return picked;
  }

  let currentLeverActivityId = null;

  function renderTodayFocus() {
    const S = ws();
    const dateISO = todayDateInput.value || toISODate(new Date());
    const mode = triageModeSelect.value || "balanced";

    todayList.innerHTML = "";
    const list = triage(dateISO, mode);

    const leverItem = list
      .slice()
      .sort((a, b) => (b.score || 0) - (a.score || 0))[0];

    if (leverItem) {
      currentLeverActivityId = leverItem.activity.id;

      identityLever.querySelector(".lever-title").textContent =
        leverItem.activity.name;

      const oName = leverItem.outcome ? leverItem.outcome.title : "—";

      identityLever.querySelector(".lever-meta").textContent = t("lever_meta", {
        outcome: oName,
        leverage: fmt1(leverItem.score),
        minutes: safeMinutes(leverItem.activity.minutes),
      });

      const entry = getDayLog(dateISO)[leverItem.activity.id];
      const step = normStep(leverItem.activity.step || 1);

      leverProgressPill.textContent = t("pill_progress", {
        v: formatProgress(leverItem.activity, entry),
      });

      leverQtyInput.disabled = false;
      leverQtyInput.value = String(Number(entry?.qty) || 0);
      leverQtyInput.onchange = () =>
        setQty(currentLeverActivityId, dateISO, leverQtyInput.value);

      leverMinusBtn.disabled = false;
      leverMinusBtn.onclick = () =>
        bumpQty(currentLeverActivityId, dateISO, -step);

      leverPlusBtn.disabled = false;
      leverPlusBtn.onclick = () =>
        bumpQty(currentLeverActivityId, dateISO, +step);

      const done = isDoneToday(leverItem.activity.id, dateISO);
      leverDoneBtn.disabled = false;
      leverDoneBtn.textContent = done ? t("btn_undo") : t("btn_done");
      leverDoneBtn.onclick = () => toggleDone(currentLeverActivityId, dateISO);
    } else {
      currentLeverActivityId = null;
      identityLever.querySelector(".lever-title").textContent = "—";
      identityLever.querySelector(".lever-meta").textContent = S.outcomes.length
        ? t("lever_hint_need_activities")
        : t("lever_hint_need_outcomes");

      leverProgressPill.textContent = t("pill_progress", { v: "—" });
      leverQtyInput.value = "";
      leverQtyInput.disabled = true;
      leverMinusBtn.disabled = true;
      leverPlusBtn.disabled = true;
      leverDoneBtn.disabled = true;
      leverDoneBtn.textContent = t("btn_done");
    }
  }

  function renderToday() {
    const S = ws();
    const hasActivities = S.activities.length > 0;

    todayEmpty.style.display = hasActivities ? "none" : "block";
    if (hasActivities) {
      renderTodayAll();
      renderTodayFocus();
    } else {
      if (todayAllWrap) todayAllWrap.innerHTML = "";
      todayList.innerHTML = "";
    }
  }

  // ===== REVIEW =====
  function lastNDates(n, fromISO) {
    const base = parseISODate(fromISO);
    const out = [];
    for (let i = 0; i < n; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() - i);
      out.push(toISODate(d));
    }
    return out;
  }

  function renderReview() {
    const S = ws();
    const todayISO = toISODate(new Date());
    const days = lastNDates(7, todayISO);

    let totalMinutes = 0;
    let totalActions = 0;
    let activeDays = 0;

    const outcomeTotals = {};
    S.outcomes.forEach((o) => {
      outcomeTotals[o.id] = { minutes: 0, actions: 0, title: o.title };
    });

    dailyLogList.innerHTML = "";
    outcomeFeedList.innerHTML = "";

    for (const day of days.slice().reverse()) {
      const log = S.logs[day] || {};
      const ids = Object.keys(log);

      const dayActive = ids.some(
        (id) => Boolean(log[id]?.done) || Number(log[id]?.qty) > 0
      );
      if (dayActive) activeDays++;

      const dayMinutes = sum(ids.map((id) => Number(log[id]?.minutes) || 0));
      totalMinutes += dayMinutes;

      const doneCount = ids.filter((id) => Boolean(log[id]?.done)).length;
      totalActions += doneCount;

      for (const id of ids) {
        const entry = log[id];
        if (!entry?.done) continue;

        const act = S.activities.find((a) => a.id === id);
        if (!act) continue;

        const mins = Number(entry?.minutes) || safeMinutes(act.minutes);

        const weights = S.outcomes.map((o) =>
          clamp(act.contrib?.[o.id] ?? 0, 0, 10)
        );
        const totalW = sum(weights);

        if (totalW > 0) {
          S.outcomes.forEach((o, idx) => {
            const w = weights[idx];
            if (w <= 0) return;
            outcomeTotals[o.id].minutes += mins * (w / totalW);
            outcomeTotals[o.id].actions += 1;
          });
        }
      }

      const box = document.createElement("div");
      box.className = "feed-item";
      box.innerHTML = `
        <div class="inline" style="justify-content:space-between;">
          <b>${day}</b>
          <span class="pill blue">${escapeHtml(
            t("review_done_pill", { n: doneCount })
          )}</span>
        </div>
        <div class="small muted" style="margin-top:8px;">
          ${
            ids.length
              ? ids
                  .map((id) => {
                    const act = S.activities.find((a) => a.id === id);
                    const e = log[id];
                    if (!act) return "";
                    const qtyTxt =
                      normUnit(act.unit) || normTarget(act.target)
                        ? ` • ${fmt1(Number(e?.qty) || 0)}${
                            normUnit(act.unit)
                              ? " " + escapeHtml(normUnit(act.unit))
                              : ""
                          }`
                        : "";
                    const doneTxt = e?.done ? "✓ " : "";
                    return `• ${doneTxt}${escapeHtml(act.name)} (${safeMinutes(
                      act.minutes
                    )}m${qtyTxt})`;
                  })
                  .filter(Boolean)
                  .join("<br/>")
              : escapeHtml(t("review_no_actions"))
          }
        </div>
      `;
      dailyLogList.appendChild(box);
    }

    reviewMinutes.textContent = fmt1(totalMinutes);
    reviewActions.textContent = String(totalActions);
    reviewDays.textContent = String(activeDays);

    let best = null;
    for (const o of S.outcomes) {
      const t0 = outcomeTotals[o.id];
      if (!best || t0.minutes > best.minutes) best = { ...t0, id: o.id };
    }
    reviewBestOutcome.textContent = best ? best.title : "—";

    if (!S.outcomes.length) {
      outcomeFeedList.innerHTML = `<div class="empty">${t(
        "contrib_empty"
      )}</div>`;
      return;
    }

    const sorted = S.outcomes
      .map((o) => ({
        id: o.id,
        title: o.title,
        minutes: outcomeTotals[o.id]?.minutes || 0,
        actions: outcomeTotals[o.id]?.actions || 0,
      }))
      .sort((a, b) => b.minutes - a.minutes);

    for (const o of sorted) {
      const box = document.createElement("div");
      box.className = "feed-item";
      box.innerHTML = `
        <div class="inline" style="justify-content:space-between;">
          <b>${escapeHtml(o.title)}</b>
          <span class="pill blue">${fmt1(o.minutes)} min</span>
        </div>
        <div class="small muted" style="margin-top:8px;">
          ${escapeHtml(t("review_actions_feeding"))} <b>${o.actions}</b>
        </div>
      `;
      outcomeFeedList.appendChild(box);
    }
  }

  // ===== EXPORT/IMPORT/RESET =====
  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function exportData() {
    const payload = {
      app: "Business Flow",
      schema: "BusinessFlowSave",
      version: 3,
      exportedAt: new Date().toISOString(),
      state,
    };
    downloadText(
      `business-flow-${toISODate(new Date())}.json`,
      JSON.stringify(payload, null, 2)
    );
  }

  // ✅ FIXED IMPORT: no load() call (load() reads localStorage and overwrites imported state)
  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result || ""));
        const incomingState = coerceImportedState(obj);

        if (!incomingState || typeof incomingState !== "object") {
          alert(t("import_invalid"));
          importInput.value = "";
          return;
        }

        state = incomingState;

        // normalize without re-reading localStorage
        normalizeTopLevelState();

        save();

        applyI18n();
        applyTheme(state.settings.theme);
        renderAll();
      } catch {
        alert(t("import_failed"));
      } finally {
        // allow re-selecting same file later
        importInput.value = "";
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    const ok = confirm(t("confirm_reset"));
    if (!ok) return;

    state = {
      workspaces: {
        en: { outcomes: [], activities: [], logs: {} },
        ja: { outcomes: [], activities: [], logs: {} },
        zh: { outcomes: [], activities: [], logs: {} },
      },
      settings: {
        activeWorkspaceId: state.settings.activeWorkspaceId || "en",
        uiLang: state.settings.uiLang || "en",
        triageMode: "balanced",
        theme: defaultThemeFromSystem(),
      },
    };

    save();
    applyI18n();
    applyTheme(state.settings.theme);
    showPanel("today");
    renderAll();
  }

  // ===== RENDER =====
  function renderAll() {
    renderOutcomes();
    renderActivities();
    renderToday();
    renderReview();
  }

  // ===== WIRING =====
  addOutcomeBtn.addEventListener("click", addOutcome);
  activityForm.addEventListener("submit", addActivityFromForm);
  clearActivityFormBtn.addEventListener("click", clearActivityForm);

  actConfidence.addEventListener(
    "input",
    () => (confVal.textContent = actConfidence.value)
  );
  actCompounding.addEventListener(
    "input",
    () => (compVal.textContent = actCompounding.value)
  );
  actFriction.addEventListener(
    "input",
    () => (fricVal.textContent = actFriction.value)
  );

  activitySearch.addEventListener("input", () => renderActivities());
  activitySort.addEventListener("change", () => renderActivities());

  todayJumpBtn.addEventListener("click", () => {
    todayDateInput.value = toISODate(new Date());
    renderAll();
  });

  triageModeSelect.addEventListener("change", () => {
    state.settings.triageMode = triageModeSelect.value;
    save();
    renderAll();
  });

  todayDateInput.addEventListener("change", () => renderAll());
  reviewJumpBtn.addEventListener("click", () => renderReview());

  exportBtn.addEventListener("click", exportData);
  importInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) importData(file);
  });
  resetBtn.addEventListener("click", resetAll);

  // Language selector (hardcoded)
  workspaceSelect.addEventListener("change", () => {
    setLanguage(workspaceSelect.value);
  });

  // Theme toggle (kept)
  themeToggleBtn.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    state.settings.theme = next;
    save();
    applyTheme(next);
  });

  // ===== INIT =====
  function init() {
    load();

    todayDateInput.value = toISODate(new Date());
    triageModeSelect.value = state.settings?.triageMode || "balanced";

    workspaceSelect.value = state.settings.uiLang || "en";
    applyI18n();

    applyTheme(state.settings.theme);
    renderContributionInputs();

    showPanel("today");
    renderAll();
  }

  init();
})();
