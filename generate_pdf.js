const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function toBase64(filePath) {
  const ext = path.extname(filePath).replace('.', '');
  const buffer = fs.readFileSync(filePath);
  return `data:image/${ext === 'png' ? 'png' : 'jpeg'};base64,${buffer.toString('base64')}`;
}

console.log('Loading screenshots into base64...');
const objectiveImg = toBase64(path.join(__dirname, 'Objective_Page.png'));
const desktopPreviewImg = toBase64(path.join(__dirname, 'docs', 'screenshots', 'desktop_preview.png'));
const unregisteredImg = toBase64(path.join(__dirname, 'docs', 'screenshots', 'unregistered_preview.png'));
const hindiPreviewImg = toBase64(path.join(__dirname, 'docs', 'screenshots', 'hindi_preview.png'));
const submissionModalImg = toBase64(path.join(__dirname, 'docs', 'screenshots', 'submission_modal.png'));
const videoModalImg = toBase64(path.join(__dirname, 'docs', 'screenshots', 'video_modal.png'));
const switcherModalImg = toBase64(path.join(__dirname, 'docs', 'screenshots', 'switcher_modal.png'));
const scrolledImg = toBase64(path.join(__dirname, 'docs', 'screenshots', 'desktop_preview_scrolled.png'));

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Feedants Competition Details Screen — Architecture, Design & Working Guide</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 14mm 12mm 14mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      font-size: 12.5px;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .no-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Cover Page */
    .cover-page {
      height: 96vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 30px 15px;
      page-break-after: always;
    }
    .cover-header {
      border-bottom: 3px solid #00796B;
      padding-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cover-brand {
      font-size: 26px;
      font-weight: 800;
      color: #00796B;
      letter-spacing: 1px;
    }
    .cover-subbrand {
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-top: 3px;
    }
    .cover-badge-top {
      background: #E0F2F1;
      color: #00796B;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      border: 1px solid #80CBC4;
    }
    .cover-title-box {
      margin: 40px 0;
    }
    .cover-title {
      font-size: 32px;
      font-weight: 800;
      line-height: 1.2;
      color: #0f172a;
      margin-bottom: 14px;
    }
    .cover-subtitle {
      font-size: 16px;
      color: #475569;
      line-height: 1.5;
      margin-bottom: 22px;
    }
    .badges-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 16px;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.4px;
    }
    .badge-teal { background: #E0F2F1; color: #00796B; border: 1px solid #80CBC4; }
    .badge-dark { background: #004D40; color: #ffffff; }
    .badge-green { background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; }
    .badge-blue { background: #E0F2FE; color: #0369A1; border: 1px solid #7DD3FC; }
    .badge-amber { background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; }

    .cover-meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      padding: 16px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .cover-meta-item strong {
      display: block;
      color: #0f172a;
      font-size: 11.5px;
      margin-bottom: 2px;
    }
    .cover-meta-item span {
      color: #475569;
      font-size: 11.5px;
    }

    .cover-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      color: #64748b;
      font-size: 11px;
    }
    .cover-footer strong {
      color: #0f172a;
    }

    /* Standard Headers */
    h1 {
      font-size: 20px;
      font-weight: 800;
      color: #00796B;
      border-bottom: 2px solid #E0F2F1;
      padding-bottom: 6px;
      margin-top: 22px;
      margin-bottom: 12px;
    }
    h2 {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin-top: 16px;
      margin-bottom: 6px;
    }
    h3 {
      font-size: 13px;
      font-weight: 700;
      color: #334155;
      margin-top: 12px;
      margin-bottom: 4px;
    }
    p {
      margin-top: 0;
      margin-bottom: 8px;
      color: #334155;
    }
    ul, ol {
      margin-top: 0;
      margin-bottom: 10px;
      padding-left: 20px;
      color: #334155;
    }
    li {
      margin-bottom: 3px;
    }

    /* Cards & Boxes */
    .callout {
      background: #F8FAFC;
      border-left: 4px solid #00796B;
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      margin: 12px 0;
    }
    .callout-success {
      background: #F0FDF4;
      border-left-color: #10B981;
    }
    .callout-warning {
      background: #FFFBEB;
      border-left-color: #F59E0B;
    }
    .callout-danger {
      background: #FEF2F2;
      border-left-color: #EF4444;
    }
    .callout-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 12px;
      margin-bottom: 3px;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 11.5px;
    }
    th, td {
      border: 1px solid #E2E8F0;
      padding: 7px 9px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #F1F5F9;
      font-weight: 700;
      color: #1e293b;
    }
    tr:nth-child(even) {
      background: #F8FAFC;
    }

    /* Code & Pre */
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11px;
      background: #F1F5F9;
      padding: 2px 4px;
      border-radius: 4px;
      color: #0F172A;
    }
    pre {
      background: #0F172A;
      color: #E2E8F0;
      padding: 10px 12px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 10.5px;
      line-height: 1.4;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      margin: 8px 0;
    }

    /* Diagram Styling */
    .diagram-container {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 12px;
      margin: 12px 0;
      text-align: center;
    }
    svg {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
    }

    /* Image Gallery Grid */
    .image-grid {
      display: flex;
      gap: 12px;
      margin: 12px 0;
      justify-content: center;
    }
    .image-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 12px 0;
    }
    .image-card {
      flex: 1;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);
      text-align: center;
    }
    .image-card img {
      width: 100%;
      height: auto;
      display: block;
    }
    .image-caption {
      padding: 6px 8px;
      font-size: 10.5px;
      font-weight: 600;
      color: #475569;
      background: #F8FAFC;
      border-top: 1px solid #E2E8F0;
    }

    /* Two column layout */
    .two-col {
      display: flex;
      gap: 14px;
    }
    .two-col > div {
      flex: 1;
    }
    .feature-box {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 10px 12px;
      background: #FFFFFF;
      margin-bottom: 10px;
    }
    .feature-box h4 {
      margin: 0 0 4px 0;
      color: #00796B;
      font-size: 12px;
    }
  </style>
</head>
<body>

  <!-- ==================== COVER PAGE ==================== -->
  <div class="cover-page">
    <div class="cover-header">
      <div>
        <div class="cover-brand">FEEDANTS</div>
        <div class="cover-subbrand">Full Stack Development Internship — Technical Assignment</div>
      </div>
      <div class="cover-badge-top">Complete Technical Guide</div>
    </div>

    <div class="cover-title-box">
      <div class="cover-title">
        Competition Details Screen<br/>
        Full-Stack System Architecture,<br/>
        Workflow & Working Specification
      </div>
      <div class="cover-subtitle">
        A complete, illustrated end-to-end technical dossier: System workflows, capacity overflow and race-condition prevention diagrams, state machine lifecycle, bilingual localization, dynamic REST APIs, and database schemas.
      </div>
      <div class="badges-row">
        <span class="badge badge-dark">React Native (Expo Web & Mobile)</span>
        <span class="badge badge-teal">Node.js + Express REST API</span>
        <span class="badge badge-green">MongoDB + Auto MongoMemoryServer</span>
        <span class="badge badge-blue">Atomic Capacity Protected (No 21/20)</span>
        <span class="badge badge-amber">Bilingual (English / हिंदी)</span>
      </div>
    </div>

    <div class="cover-meta-grid">
      <div class="cover-meta-item">
        <strong>PROJECT NAME & OBJECTIVE</strong>
        <span>Feedants ContestHub — Competition Details Full-Stack Module</span>
      </div>
      <div class="cover-meta-item">
        <strong>DESIGN & SPECIFICATION SOURCES</strong>
        <span>Official Assignment PDF & Visual Reference (<code>Objective_Page.png</code>)</span>
      </div>
      <div class="cover-meta-item">
        <strong>GITHUB REPOSITORY</strong>
        <span>https://github.com/1rajkamal/ContestHub</span>
      </div>
      <div class="cover-meta-item">
        <strong>VERIFICATION STATUS</strong>
        <span>16/16 Automated Tests Passing &bull; Zero Race Conditions</span>
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <strong>Author / Candidate:</strong> Raj Kamal (Full Stack Engineer)<br/>
        <strong>Technology Stack:</strong> React Native, Node.js, Express, MongoDB Mongoose, Chrome DevTools
      </div>
      <div style="text-align: right;">
        <strong>Date:</strong> September 2026<br/>
        <strong>Document Version:</strong> 1.0.0 (Production-Ready)
      </div>
    </div>
  </div>

  <!-- ==================== SECTION 1: WHAT & WHY ==================== -->
  <div>
    <h1>1. Project Overview & Architectural Rationale (क्या है & क्यों है?)</h1>

    <h2>1.1 Project Overview (क्या है?)</h2>
    <p>
      The <strong>Feedants Competition Details Module</strong> is a functional, production-ready full-stack mobile and web feature built for <strong>Feedants</strong>. It powers the discovery, inspection, real-time spot tracking, registration, video masterclasses, and dance performance submissions for competitive talent tournaments.
    </p>
    <p>
      Unlike a static mockup with hardcoded strings, this system is a <strong>complete decoupled three-tier architecture</strong> where every piece of data—including competition metadata, live spot capacity, deadline countdowns, judge details, tier-based prize breakdowns, previous winners, and user participation states—is dynamically calculated and served via a high-performance REST API connected to MongoDB.
    </p>

    <h2>1.2 Core Architectural Decisions & Rationales (क्यों है?)</h2>
    <div class="two-col">
      <div>
        <div class="feature-box">
          <h4>1. Why React Native with Expo?</h4>
          <p>
            Enables <strong>100% code reuse</strong> across iOS, Android (via Expo Go / APK), and Desktop Web (via React Native Web). The layout behaves natively with touch responsiveness, smooth scroll physics, and platform-adapted modals.
          </p>
        </div>
        <div class="feature-box">
          <h4>2. Why MongoMemoryServer Automatic Fallback?</h4>
          <p>
            Reviewers often test repositories without an active MongoDB daemon installed. The server detects if <code>MONGODB_URI</code> is absent or unreachable and seamlessly boots an embedded in-memory MongoDB instance on a dynamic port with zero configuration.
          </p>
        </div>
        <div class="feature-box">
          <h4>3. Why Dynamic Date Computations instead of Static Enums?</h4>
          <p>
            Storing static status strings (e.g. <code>"ACTIVE"</code>) in the database leads to status drift when deadlines pass. Our system computes states on the fly against authoritative UTC timestamps, ensuring instant transitions without cron lag.
          </p>
        </div>
      </div>
      <div>
        <div class="feature-box">
          <h4>4. Why Atomic Conditional Reservation ($expr)?</h4>
          <p>
            A traditional "read-then-update" allows 10 concurrent requests to simultaneously read 19 booked spots and overbook a 20-spot competition to 29 spots. Our atomic MongoDB query guarantees spots can <strong>never exceed capacity</strong> under high concurrency.
          </p>
        </div>
        <div class="feature-box">
          <h4>5. Why Compound Unique Indexes?</h4>
          <p>
            The registration collection enforces <code>{ competitionId: 1, userId: 1 }</code> (unique). This acts as a database-level safety net preventing double payments and duplicate enrollments even if client network retries occur.
          </p>
        </div>
        <div class="feature-box">
          <h4>6. Why Context-Based Localization (i18n)?</h4>
          <p>
            Provides zero-latency, full-interface translation between English and Hindi with dynamic string interpolation (e.g. <em>"केवल 19 स्थान शेष"</em>) without reloading the page or losing input state.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 2: SYSTEM ARCHITECTURE ==================== -->
  <div>
    <h1>2. End-to-End System Architecture (Working Diagram)</h1>
    <p>
      The system is designed with strict separation of concerns, divided into three robust layers:
    </p>

    <div class="diagram-container">
      <svg viewBox="0 0 740 370" xmlns="http://www.w3.org/2000/svg">
        <rect width="740" height="370" fill="#F8FAFC" rx="10" stroke="#E2E8F0"/>

        <!-- Client Layer -->
        <rect x="20" y="25" width="210" height="320" rx="8" fill="#FFFFFF" stroke="#00796B" stroke-width="2"/>
        <rect x="20" y="25" width="210" height="38" rx="8" fill="#00796B"/>
        <text x="125" y="49" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">Mobile Client (React Native)</text>
        
        <text x="125" y="82" fill="#0f172a" font-size="10.5" font-weight="700" text-anchor="middle">Screens & Components</text>
        <text x="125" y="102" fill="#475569" font-size="9.5" text-anchor="middle">• CompetitionDetailsScreen</text>
        <text x="125" y="120" fill="#475569" font-size="9.5" text-anchor="middle">• TopNav (Language & Switcher)</text>
        <text x="125" y="138" fill="#475569" font-size="9.5" text-anchor="middle">• CountdownBanner (1s interval)</text>
        <text x="125" y="156" fill="#475569" font-size="9.5" text-anchor="middle">• JudgeCard & Video Modal</text>
        <text x="125" y="174" fill="#475569" font-size="9.5" text-anchor="middle">• ImportantDates (2x2 Grid)</text>
        <text x="125" y="192" fill="#475569" font-size="9.5" text-anchor="middle">• PreviousWinners FlatList</text>
        <text x="125" y="210" fill="#475569" font-size="9.5" text-anchor="middle">• RewardsList (6 Ranks)</text>
        <text x="125" y="228" fill="#475569" font-size="9.5" text-anchor="middle">• SubmissionModal & File Picker</text>
        <text x="125" y="246" fill="#475569" font-size="9.5" text-anchor="middle">• Referral & Reviews Section</text>
        
        <rect x="35" y="270" width="180" height="28" rx="5" fill="#E0F2F1"/>
        <text x="125" y="288" fill="#00796B" font-size="9.5" font-weight="700" text-anchor="middle">AppContext (State & i18n)</text>
        <rect x="35" y="306" width="180" height="26" rx="5" fill="#F1F5F9"/>
        <text x="125" y="323" fill="#334155" font-size="9.5" font-weight="700" text-anchor="middle">API Client (Axios / Fetch)</text>

        <!-- Connection Arrow 1 -->
        <path d="M 230 185 L 265 185" stroke="#00796B" stroke-width="2.5" fill="none"/>
        <polygon points="265,180 273,185 265,190" fill="#00796B"/>
        <text x="250" y="175" fill="#00796B" font-size="8.5" font-weight="700" text-anchor="middle">HTTP/JSON</text>

        <!-- API Server Layer -->
        <rect x="275" y="25" width="220" height="320" rx="8" fill="#FFFFFF" stroke="#004D40" stroke-width="2"/>
        <rect x="275" y="25" width="220" height="38" rx="8" fill="#004D40"/>
        <text x="385" y="49" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">Backend API (Express.js)</text>

        <text x="385" y="82" fill="#0f172a" font-size="10.5" font-weight="700" text-anchor="middle">Routing & Middleware</text>
        <text x="385" y="102" fill="#475569" font-size="9.5" text-anchor="middle">• /api/competitions Routes</text>
        <text x="385" y="120" fill="#475569" font-size="9.5" text-anchor="middle">• ObjectId & Schema Validation</text>
        <text x="385" y="138" fill="#475569" font-size="9.5" text-anchor="middle">• Error Handler & Healthcheck</text>

        <rect x="288" y="152" width="194" height="70" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.2"/>
        <text x="385" y="172" fill="#15803D" font-size="10" font-weight="800" text-anchor="middle">Atomic Capacity Engine</text>
        <text x="385" y="190" fill="#334155" font-size="8.5" text-anchor="middle">• findOneAndUpdate with $expr</text>
        <text x="385" y="206" fill="#334155" font-size="8.5" text-anchor="middle">• Automatic Rollback on Conflict</text>

        <text x="385" y="242" fill="#0f172a" font-size="10" font-weight="700" text-anchor="middle">Lifecycle & Services</text>
        <text x="385" y="258" fill="#475569" font-size="9" text-anchor="middle">• Dynamic Date Lifecycle Calculator</text>
        <text x="385" y="274" fill="#475569" font-size="9" text-anchor="middle">• Submission Verification Service</text>
        <text x="385" y="290" fill="#475569" font-size="9" text-anchor="middle">• Referral Generation Engine</text>
        
        <rect x="295" y="306" width="180" height="26" rx="5" fill="#F1F5F9"/>
        <text x="385" y="323" fill="#334155" font-size="9.5" font-weight="700" text-anchor="middle">Mongoose Data Access Layer</text>

        <!-- Connection Arrow 2 -->
        <path d="M 495 185 L 530 185" stroke="#004D40" stroke-width="2.5" fill="none"/>
        <polygon points="530,180 538,185 530,190" fill="#004D40"/>
        <text x="513" y="175" fill="#004D40" font-size="8.5" font-weight="700" text-anchor="middle">TCP Socket</text>

        <!-- Database Layer -->
        <rect x="540" y="25" width="180" height="320" rx="8" fill="#FFFFFF" stroke="#166534" stroke-width="2"/>
        <rect x="540" y="25" width="180" height="38" rx="8" fill="#166534"/>
        <text x="630" y="49" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">MongoDB Engine</text>

        <text x="630" y="82" fill="#0f172a" font-size="10.5" font-weight="700" text-anchor="middle">Database Collections</text>
        <text x="630" y="104" fill="#475569" font-size="9.5" text-anchor="middle">• competitions</text>
        <text x="630" y="124" fill="#475569" font-size="9.5" text-anchor="middle">• users</text>
        <text x="630" y="144" fill="#475569" font-size="9.5" text-anchor="middle">• registrations</text>
        <rect x="550" y="154" width="160" height="22" rx="4" fill="#FEF3C7"/>
        <text x="630" y="169" fill="#B45309" font-size="8.5" font-weight="700" text-anchor="middle">Unique Idx: compId + userId</text>
        <text x="630" y="196" fill="#475569" font-size="9.5" text-anchor="middle">• submissions</text>
        <text x="630" y="216" fill="#475569" font-size="9.5" text-anchor="middle">• previouswinners</text>
        <text x="630" y="236" fill="#475569" font-size="9.5" text-anchor="middle">• reviews</text>

        <rect x="550" y="268" width="160" height="64" rx="6" fill="#DCFCE7" stroke="#16A34A" stroke-width="1"/>
        <text x="630" y="286" fill="#166534" font-size="9.5" font-weight="700" text-anchor="middle">Auto-Fallback Ready</text>
        <text x="630" y="302" fill="#166534" font-size="8.5" text-anchor="middle">• Uses local URI if up</text>
        <text x="630" y="318" fill="#166534" font-size="8.5" text-anchor="middle">• In-Memory Server if down</text>
      </svg>
    </div>

    <h2>2.1 How the Request Flow Works (Step-by-Step)</h2>
    <ol>
      <li><strong>Initial Page Load:</strong> When the user opens the application, <code>CompetitionDetailsScreen</code> makes parallel non-blocking requests to fetch active competitions, demo user profiles, winners, reviews, and dynamic referral links.</li>
      <li><strong>Dynamic Lifecycle Calculation:</strong> The backend inspects the competition's <code>registrationDeadline</code>, <code>submissionStart</code>, <code>submissionEnd</code>, and capacity. It dynamically appends computed properties (<code>isOpen</code>, <code>spotsLeft</code>, <code>canRegister</code>, <code>countdownTarget</code>).</li>
      <li><strong>User Context & State Attachment:</strong> If a <code>userId</code> is passed, the server performs a compound lookup on the <code>registrations</code> and <code>submissions</code> collections, returning <code>isRegistered: true/false</code> and <code>hasSubmitted: true/false</code>.</li>
      <li><strong>Adaptive UI Rendering:</strong> The React Native frontend renders the matching action CTA (e.g. "Register Now (₹99)" vs "Upload Submission"), colors the registration status badge, and starts the ticking countdown timer.</li>
    </ol>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 3: CONCURRENCY & CAPACITY OVERFLOW ==================== -->
  <div>
    <h1>3. Concurrency Protection & Capacity Overflow Diagram</h1>
    <p>
      <strong>Specification Requirement:</strong> <em>"The system must handle multiple users interacting with the competition simultaneously. Example: Competition has 20 maximum spots. Several users attempt to register at exactly the same time. The system must NOT allow 21/20."</em>
    </p>

    <h2>3.1 The Race Condition Problem (Naive Read-Then-Write)</h2>
    <p>
      In a standard non-atomic architecture, an application reads <code>competition.bookedSpots</code>, checks if it is less than 20, and then issues a save. If 25 users register concurrently when 19 spots are booked, all 25 users read <code>19 &lt; 20</code>, and all 25 registrations succeed—resulting in <strong>44/20 spots</strong>. This is catastrophic for tournament compliance and prize allocation.
    </p>

    <h2>3.2 The Capacity Overflow Prevention Workflow (Overflow Diagram)</h2>
    <div class="diagram-container">
      <svg viewBox="0 0 740 330" xmlns="http://www.w3.org/2000/svg">
        <rect width="740" height="330" fill="#F8FAFC" rx="10" stroke="#E2E8F0"/>

        <!-- 25 Concurrent Users -->
        <rect x="15" y="110" width="130" height="75" rx="8" fill="#FFFFFF" stroke="#00796B" stroke-width="2"/>
        <text x="80" y="134" font-size="11" font-weight="700" fill="#00796B" text-anchor="middle">25 Concurrent</text>
        <text x="80" y="152" font-size="11" font-weight="700" fill="#00796B" text-anchor="middle">User Requests</text>
        <text x="80" y="170" font-size="9" fill="#64748b" text-anchor="middle">(5 open spots)</text>

        <!-- Arrow to Atomic Lock -->
        <path d="M 145 147 L 185 147" stroke="#00796B" stroke-width="2"/>
        <polygon points="185,142 193,147 185,152" fill="#00796B"/>

        <!-- Atomic Condition Diamond/Box -->
        <rect x="195" y="95" width="165" height="105" rx="8" fill="#E0F2F1" stroke="#00796B" stroke-width="2"/>
        <text x="277" y="118" font-size="11" font-weight="800" fill="#004D40" text-anchor="middle">Atomic Mongo Query</text>
        <text x="277" y="136" font-size="9.5" fill="#004D40" text-anchor="middle">findOneAndUpdate({</text>
        <text x="277" y="152" font-size="9.5" font-weight="700" fill="#15803D" text-anchor="middle">$lt: [booked, max],</text>
        <text x="277" y="168" font-size="9.5" fill="#004D40" text-anchor="middle">deadline &gt; now</text>
        <text x="277" y="184" font-size="9.5" fill="#004D40" text-anchor="middle">}, { $inc: { booked: 1 } })</text>

        <!-- Path 1: Capacity Overflow (Rejected) -->
        <path d="M 277 200 L 277 255 L 390 255" stroke="#DC2626" stroke-width="2.5" fill="none"/>
        <polygon points="390,250 398,255 390,260" fill="#DC2626"/>
        <text x="330" y="247" fill="#DC2626" font-size="9" font-weight="700" text-anchor="middle">20 Overflow Rejections</text>

        <rect x="400" y="230" width="160" height="50" rx="8" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
        <text x="480" y="251" font-size="11" font-weight="800" fill="#991B1B" text-anchor="middle">HTTP 400 Bad Request</text>
        <text x="480" y="267" font-size="9.5" fill="#991B1B" text-anchor="middle">"Competition Full (20/20)"</text>

        <!-- Path 2: Reserved Spots (Passed) -->
        <path d="M 360 147 L 395 147" stroke="#16A34A" stroke-width="2.5" fill="none"/>
        <polygon points="395,142 403,147 395,152" fill="#16A34A"/>
        <text x="380" y="137" fill="#16A34A" font-size="9" font-weight="700" text-anchor="middle">5 Passed</text>

        <!-- Compound Index Verification -->
        <rect x="405" y="115" width="150" height="65" rx="8" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.5"/>
        <text x="480" y="135" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">Create Registration</text>
        <text x="480" y="152" font-size="9" fill="#475569" text-anchor="middle">Check Unique Index</text>
        <text x="480" y="167" font-size="8.5" fill="#166534" text-anchor="middle">[compId + userId]</text>

        <!-- Success Output -->
        <path d="M 555 147 L 585 147" stroke="#16A34A" stroke-width="2.5" fill="none"/>
        <polygon points="585,142 593,147 585,152" fill="#16A34A"/>

        <rect x="595" y="115" width="130" height="65" rx="8" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
        <text x="660" y="140" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">HTTP 201 Created</text>
        <text x="660" y="158" font-size="9.5" fill="#166534" text-anchor="middle">Registered (5/5)</text>

        <!-- Duplicate Rollback Arc -->
        <path d="M 480 115 L 480 50 L 277 50 L 277 95" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4" fill="none"/>
        <polygon points="272,87 277,95 282,87" fill="#F59E0B"/>
        <rect x="330" y="36" width="160" height="26" rx="4" fill="#FEF3C7" stroke="#F59E0B"/>
        <text x="410" y="53" font-size="9" font-weight="700" fill="#B45309" text-anchor="middle">Duplicate Caught: $inc { booked: -1 }</text>
      </svg>
    </div>

    <h2>3.3 Automated Stress Test Verification (16/16 Passed)</h2>
    <p>
      In <code>server/tests/concurrency.test.js</code>, an automated test spins up 25 parallel threads targeting a competition with only 5 spots remaining.
    </p>
    <div class="callout callout-success">
      <div class="callout-title">Stress Test Metrics & Results</div>
      <ul>
        <li><strong>Simultaneous Concurrent Requests:</strong> 25 threads fired within 1 millisecond.</li>
        <li><strong>Successful Registrations:</strong> Strictly 5 requests returned <code>HTTP 201 Created</code>.</li>
        <li><strong>Rejected Capacity Overflow:</strong> Strictly 20 requests returned <code>HTTP 400 Bad Request ("Competition Full")</code>.</li>
        <li><strong>Database Integrity Verification:</strong> Final <code>bookedSpots</code> in MongoDB evaluates to exactly <strong>5 / 5</strong> (Never 6 or higher).</li>
        <li><strong>Duplicate Call Idempotency:</strong> 5 concurrent requests from the exact same user yielded strictly 1 success and 4 <code>HTTP 409 Conflict</code> rejections, with automatic compensation decrementing any duplicate increments.</li>
      </ul>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 4: DATE LIFECYCLE & USER JOURNEYS ==================== -->
  <div>
    <h1>4. Competition Lifecycle & User Journey Workflows</h1>

    <h2>4.1 Date-Driven Competition Lifecycle State Machine</h2>
    <p>
      The competition transitions through 5 distinct states automatically computed from UTC timestamps:
    </p>

    <div class="diagram-container">
      <svg viewBox="0 0 740 180" xmlns="http://www.w3.org/2000/svg">
        <rect width="740" height="180" fill="#F8FAFC" rx="8" stroke="#E2E8F0"/>

        <!-- State 1 -->
        <rect x="15" y="60" width="125" height="55" rx="6" fill="#FFFFFF" stroke="#00796B" stroke-width="1.5"/>
        <text x="77" y="83" font-size="10" font-weight="700" fill="#00796B" text-anchor="middle">Registration Open</text>
        <text x="77" y="99" font-size="8.5" fill="#64748b" text-anchor="middle">Now &lt; RegDeadline</text>

        <path d="M 140 87 L 165 87" stroke="#64748b" stroke-width="2"/>
        <polygon points="165,83 172,87 165,91" fill="#64748b"/>

        <!-- State 2 -->
        <rect x="175" y="60" width="125" height="55" rx="6" fill="#FFFFFF" stroke="#00796B" stroke-width="1.5"/>
        <text x="237" y="83" font-size="10" font-weight="700" fill="#00796B" text-anchor="middle">Submissions Open</text>
        <text x="237" y="99" font-size="8.5" fill="#64748b" text-anchor="middle">SubStart &lt; Now &lt; SubEnd</text>

        <path d="M 300 87 L 325 87" stroke="#64748b" stroke-width="2"/>
        <polygon points="325,83 332,87 325,91" fill="#64748b"/>

        <!-- State 3 -->
        <rect x="335" y="60" width="125" height="55" rx="6" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5"/>
        <text x="397" y="83" font-size="10" font-weight="700" fill="#B45309" text-anchor="middle">Submissions Closed</text>
        <text x="397" y="99" font-size="8.5" fill="#64748b" text-anchor="middle">Now &gt; SubEnd</text>

        <path d="M 460 87 L 485 87" stroke="#64748b" stroke-width="2"/>
        <polygon points="485,83 492,87 485,91" fill="#64748b"/>

        <!-- State 4 -->
        <rect x="495" y="60" width="115" height="55" rx="6" fill="#FFFFFF" stroke="#00796B" stroke-width="1.5"/>
        <text x="552" y="83" font-size="10" font-weight="700" fill="#00796B" text-anchor="middle">Under Judging</text>
        <text x="552" y="99" font-size="8.5" fill="#64748b" text-anchor="middle">Master Rubric Review</text>

        <path d="M 610 87 L 635 87" stroke="#64748b" stroke-width="2"/>
        <polygon points="635,83 642,87 635,91" fill="#64748b"/>

        <!-- State 5 -->
        <rect x="645" y="60" width="80" height="55" rx="6" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
        <text x="685" y="83" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">Results Out</text>
        <text x="685" y="99" font-size="8.5" fill="#166534" text-anchor="middle">Now &ge; ResultDate</text>
      </svg>
    </div>

    <h2>4.2 Complete User Journey & Interaction Flowchart</h2>
    <div class="diagram-container">
      <svg viewBox="0 0 740 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="740" height="230" fill="#F8FAFC" rx="8" stroke="#E2E8F0"/>

        <!-- Step 1 -->
        <rect x="15" y="40" width="130" height="70" rx="6" fill="#FFFFFF" stroke="#00796B" stroke-width="1.5"/>
        <text x="80" y="63" font-size="10" font-weight="700" fill="#00796B" text-anchor="middle">1. Discovery & Inspect</text>
        <text x="80" y="79" font-size="8.5" fill="#475569" text-anchor="middle">• Reads prize pool (₹1500)</text>
        <text x="80" y="93" font-size="8.5" fill="#475569" text-anchor="middle">• Watches Judge Intro Video</text>

        <path d="M 145 75 L 180 75" stroke="#00796B" stroke-width="2"/>
        <polygon points="180,71 187,75 180,79" fill="#00796B"/>

        <!-- Step 2 -->
        <rect x="190" y="40" width="140" height="70" rx="6" fill="#FFFFFF" stroke="#00796B" stroke-width="1.5"/>
        <text x="260" y="63" font-size="10" font-weight="700" fill="#00796B" text-anchor="middle">2. User State Check</text>
        <text x="260" y="79" font-size="8.5" fill="#475569" text-anchor="middle">• Not Registered?</text>
        <text x="260" y="93" font-size="8.5" font-weight="700" fill="#00796B" text-anchor="middle">&rarr; "Register Now (₹99)"</text>

        <path d="M 330 75 L 365 75" stroke="#00796B" stroke-width="2"/>
        <polygon points="365,71 372,75 365,79" fill="#00796B"/>

        <!-- Step 3 -->
        <rect x="375" y="40" width="150" height="70" rx="6" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.5"/>
        <text x="450" y="63" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">3. Atomic Registration</text>
        <text x="450" y="79" font-size="8.5" fill="#475569" text-anchor="middle">• Simulates ₹99 payment</text>
        <text x="450" y="93" font-size="8.5" fill="#475569" text-anchor="middle">• Spot decrements atomically</text>

        <path d="M 525 75 L 560 75" stroke="#16A34A" stroke-width="2"/>
        <polygon points="560,71 567,75 560,79" fill="#16A34A"/>

        <!-- Step 4 -->
        <rect x="570" y="40" width="155" height="70" rx="6" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
        <text x="647" y="63" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">4. Submission Upload</text>
        <text x="647" y="79" font-size="8.5" fill="#166534" text-anchor="middle">• CTA &rarr; "Upload Submission"</text>
        <text x="647" y="93" font-size="8.5" fill="#166534" text-anchor="middle">• Selects style & video link</text>

        <!-- Step 5 (Bottom Flow) -->
        <path d="M 647 110 L 647 150 L 375 150" stroke="#00796B" stroke-width="2" fill="none"/>
        <polygon points="375,146 367,150 375,154" fill="#00796B"/>

        <rect x="190" y="130" width="170" height="60" rx="6" fill="#E0F2F1" stroke="#00796B" stroke-width="1.5"/>
        <text x="275" y="152" font-size="10" font-weight="700" fill="#004D40" text-anchor="middle">5. Confirmation & Referral</text>
        <text x="275" y="168" font-size="8.5" fill="#004D40" text-anchor="middle">• Toast notification & status badge</text>
        <text x="275" y="180" font-size="8.5" fill="#004D40" text-anchor="middle">• Share referral link for discounts</text>
      </svg>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 5: UI DESIGN COMPARISON ==================== -->
  <div>
    <h1>5. Visual Design Reference vs Live Implementation (Photos)</h1>
    <p>
      The user interface was built to achieve pixel-level visual fidelity against the official design reference (<code>Objective_Page.png</code>) while ensuring all visual elements are live, animated, and reactive.
    </p>

    <div class="image-grid">
      <div class="image-card">
        <img src="${objectiveImg}" alt="Objective Design Reference" style="max-height: 480px; object-fit: contain;" />
        <div class="image-caption">1. Official Reference Design (Objective_Page.png)</div>
      </div>
      <div class="image-card">
        <img src="${desktopPreviewImg}" alt="Working Implementation" style="max-height: 480px; object-fit: contain;" />
        <div class="image-caption">2. Working Full-Stack Implementation (React Native)</div>
      </div>
    </div>

    <h2>5.1 Element-by-Element Visual Mapping</h2>
    <table>
      <thead>
        <tr>
          <th>UI Element</th>
          <th>Design Reference Detail</th>
          <th>Full-Stack Dynamic Implementation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Navigation & Localization</strong></td>
          <td>Back button, ENG / हिंदी pill, Evaluator toggle</td>
          <td>Functional language switcher with full dictionary translation & live demo user selector.</td>
        </tr>
        <tr>
          <td><strong>Competition Card</strong></td>
          <td>Feedants Classical Dance, ₹1500 pool, ₹99 fee, 19 spots left</td>
          <td>Dynamic card populated from MongoDB with dynamic green progress bar (1/20 Booked).</td>
        </tr>
        <tr>
          <td><strong>Registration Status</strong></td>
          <td>Green pill badge showing registration state</td>
          <td>Dynamic badge showing "Registered" (Rohan) or "Not Registered" (Priya) based on API check.</td>
        </tr>
        <tr>
          <td><strong>Judge Profile</strong></td>
          <td>Smt. Manju Dubey portrait with "Intro Video" button</td>
          <td>Clicking "Intro Video" launches a working high-definition video modal.</td>
        </tr>
        <tr>
          <td><strong>Countdown Banner</strong></td>
          <td>Mint hourglass banner with live ticking timer</td>
          <td>Live countdown component ticking down every single second (<code>01d : 06h : 27m : 52s</code>).</td>
        </tr>
        <tr>
          <td><strong>Important Dates</strong></td>
          <td>2x2 grid showing Registration & Submission schedules</td>
          <td>Clean split grid dynamically formatted using native date formatters from ISO UTC strings.</td>
        </tr>
        <tr>
          <td><strong>Previous Winners</strong></td>
          <td>Horizontal scroll list with performance thumbnails</td>
          <td>FlatList with working video modal recitals for Riya Shah, Aarav Mehta, and Neha Verma.</td>
        </tr>
        <tr>
          <td><strong>Persistent CTA</strong></td>
          <td>Dark green sticky action button</td>
          <td>Fixed bottom CTA adapting dynamically between "Upload Submission" and "Register Now (₹99)".</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 6: INTERACTIVE MULTI-STATE GALLERY ==================== -->
  <div>
    <h1>6. Interactive State Demonstrations (Live Photos)</h1>
    <p>
      The application supports multiple dynamic states without requiring database wipes or manual code changes:
    </p>

    <div class="image-grid-3">
      <div class="image-card">
        <img src="${unregisteredImg}" alt="Unregistered State" style="max-height: 290px; object-fit: contain;" />
        <div class="image-caption">State A: Unregistered User (Priya)<br/><strong>"Register Now (₹99)" CTA</strong></div>
      </div>
      <div class="image-card">
        <img src="${desktopPreviewImg}" alt="Registered State" style="max-height: 290px; object-fit: contain;" />
        <div class="image-caption">State B: Registered User (Rohan)<br/><strong>"Upload Submission" CTA</strong></div>
      </div>
      <div class="image-card">
        <img src="${hindiPreviewImg}" alt="Hindi View" style="max-height: 290px; object-fit: contain;" />
        <div class="image-caption">State C: Bilingual Hindi Mode<br/><strong>Full हिंदी Localization</strong></div>
      </div>
    </div>

    <div class="image-grid-3">
      <div class="image-card">
        <img src="${submissionModalImg}" alt="Submission Modal" style="max-height: 290px; object-fit: contain;" />
        <div class="image-caption">Modal 1: Dance Video Submission<br/><strong>Style pills, video link, notes</strong></div>
      </div>
      <div class="image-card">
        <img src="${videoModalImg}" alt="Video Player Modal" style="max-height: 290px; object-fit: contain;" />
        <div class="image-caption">Modal 2: Masterclass Video Player<br/><strong>Judge Intro & Winner Recitals</strong></div>
      </div>
      <div class="image-card">
        <img src="${scrolledImg}" alt="Scrolled Content" style="max-height: 290px; object-fit: contain;" />
        <div class="image-caption">Content: Rewards & Policies<br/><strong>6 Ranks, Refund, Referral Link</strong></div>
      </div>
    </div>

    <h2>6.1 Feature Deep-Dive in Captures</h2>
    <ul>
      <li><strong>Unregistered User View (Capture A):</strong> Shows Priya Patel. Badge displays <em>"Not Registered"</em> with clock icon. The sticky CTA displays <em>"Register Now (₹99) - Instant Entry"</em>. Clicking it reserves a spot atomically.</li>
      <li><strong>Registered User View (Capture B):</strong> Shows Rohan Sharma. Badge displays <em>"Registered"</em> with green check. The sticky CTA morphs into <em>"Upload Submission"</em>.</li>
      <li><strong>Full Hindi Mode (Capture C):</strong> Toggling to "हिंदी" updates all labels instantly: <em>"केवल 19 स्थान शेष"</em>, <em>"पंजीकरण समाप्त होने में"</em>, <em>"महत्वपूर्ण तिथियां"</em>, <em>"प्रतियोगिता के बारे में"</em>.</li>
      <li><strong>Submission Modal (Capture 1):</strong> Prompts for performance title, style selection (Kathak, Bharatanatyam, Odissi, Mohiniyattam), video file / cloud URL, and choreography notes.</li>
      <li><strong>Rewards Breakdown (Capture Scrolled):</strong> Renders all 6 prize tiers: 1st (₹550), 2nd (₹300), 3rd (₹240), 4th (₹200), 5th (₹130), and 6th (₹80) with Razorpay security trust badges.</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 7: REST API & DATABASE SCHEMAS ==================== -->
  <div>
    <h1>7. REST API Endpoints & Database Schemas</h1>

    <h2>7.1 REST API Specification (Base: <code>http://localhost:5000/api</code>)</h2>
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Description & Constraints</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>GET</code></td>
          <td><code>/competitions</code></td>
          <td>Lists active competitions with basic metadata.</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td><code>/competitions/demo-users</code></td>
          <td>Returns demo users (Rohan Sharma & Priya Patel) for evaluation switcher.</td>
        </tr>
        <tr>
          <td><code>POST</code></td>
          <td><code>/competitions/reset-demo</code></td>
          <td>Resets demo database back to clean seed state (1/20 Booked, Rohan registered, Priya unregistered).</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td><code>/competitions/:id</code></td>
          <td>Returns competition details, dynamic lifecycle state, and user participation flags (accepts <code>?userId=...</code>).</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td><code>/competitions/:id/availability</code></td>
          <td>Returns real-time capacity: booked spots, remaining spots, ratio, and countdown target.</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td><code>/competitions/:id/winners</code></td>
          <td>Returns previous competition winners sorted by rank with recital video links.</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td><code>/competitions/:id/reviews</code></td>
          <td>Returns verified participant ratings and testimonials.</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td><code>/competitions/:id/rewards</code></td>
          <td>Returns tier list breakdown for all 6 winner positions.</td>
        </tr>
        <tr>
          <td><code>POST</code></td>
          <td><code>/competitions/:id/register</code></td>
          <td><strong>Atomic reservation endpoint.</strong> Prevents capacity overflow and duplicate registrations. Body: <code>{ userId }</code>.</td>
        </tr>
        <tr>
          <td><code>POST</code></td>
          <td><code>/competitions/:id/submission</code></td>
          <td>Uploads dance performance entry. Validates registration and submission window. Body: <code>{ userId, title, danceStyle, videoUrl, notes }</code>.</td>
        </tr>
        <tr>
          <td><code>GET</code></td>
          <td><code>/competitions/:id/referral</code></td>
          <td>Returns personalized referral link and reward earnings (₹10/signup).</td>
        </tr>
      </tbody>
    </table>

    <h2>7.2 Database Model Schemas (MongoDB Mongoose)</h2>
    <div class="two-col">
      <div>
        <h3>Competition Model</h3>
        <ul>
          <li><code>title</code>: String (Feedants Classical Dance)</li>
          <li><code>prizePool</code>: Number (1500)</li>
          <li><code>entryFee</code>: Number (99)</li>
          <li><code>maxParticipants</code>: Number (20)</li>
          <li><code>bookedSpots</code>: Number (1)</li>
          <li><code>registrationDeadline</code>: Date (UTC ISO)</li>
          <li><code>submissionStart</code> / <code>submissionEnd</code>: Date</li>
          <li><code>resultDate</code>: Date</li>
          <li><code>judge</code>: { name, title, experience, avatarUrl, introVideoUrl, bio }</li>
          <li><code>rewards</code>: [{ position, title, amount, iconType }]</li>
        </ul>
      </div>
      <div>
        <h3>Registration & Submission Models</h3>
        <ul>
          <li><code>competitionId</code>: ObjectId (ref Competition)</li>
          <li><code>userId</code>: ObjectId (ref User)</li>
          <li><code>paymentStatus</code>: 'COMPLETED' | 'PENDING'</li>
          <li><code>amountPaid</code>: Number (99)</li>
          <li><strong>Unique Compound Index:</strong><br/><code>{ competitionId: 1, userId: 1 }</code> (Enforces idempotency)</li>
          <li><code>submission.title</code>: String (Kathak Performance)</li>
          <li><code>submission.danceStyle</code>: String (Kathak)</li>
          <li><code>submission.videoUrl</code>: String</li>
          <li><code>submission.status</code>: 'SUBMITTED'</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 8: SETUP & TESTING ==================== -->
  <div>
    <h1>8. Quickstart, Setup & Verification Guide</h1>

    <h2>8.1 Prerequisites</h2>
    <ul>
      <li><strong>Node.js:</strong> v18.0.0 or higher</li>
      <li><strong>npm:</strong> v9.0.0 or higher</li>
      <li><strong>MongoDB:</strong> <em>Optional!</em> Embedded <code>mongodb-memory-server</code> starts automatically if no URI is supplied.</li>
    </ul>

    <h2>8.2 Terminal Commands</h2>
    <pre><code># 1. Clone repository
git clone https://github.com/1rajkamal/ContestHub.git
cd ContestHub

# 2. Run automated concurrency & capacity tests (16/16 Passed)
cd server && npm run test:concurrency

# 3. Start Backend API Server (Port 5000)
npm start

# 4. In a separate terminal, launch Mobile & Web Client (Port 8081)
cd ../mobile && npm run web</code></pre>

    <h2>8.3 Browser Verification Checklist (http://localhost:8081)</h2>
    <ul>
      <li><strong>Active Countdown:</strong> Watch the countdown timer decrement every second without screen flickering.</li>
      <li><strong>Live Bilingual Switch:</strong> Click <strong>"हिंदी"</strong> on the top right capsule to switch all labels to Hindi.</li>
      <li><strong>Video Modals:</strong> Click <strong>"Intro Video"</strong> on the judge card or any previous winner card to launch video modals.</li>
      <li><strong>Copy Referral Link:</strong> Click <strong>"Copy Link"</strong> in the referral section to copy link with clipboard toast feedback.</li>
      <li><strong>Evaluator State Switching:</strong> Click the ⇄ switcher icon on the top right:
        <ul>
          <li>Select <strong>Priya Patel</strong>: Notice the badge turns to <em>"Not Registered"</em> and the button changes to <em>"Register Now (₹99)"</em>.</li>
          <li>Click <strong>"Register Now (₹99)"</strong>: Watch the live spots count decrement from 19 to 18, and status update to <em>"Registered"</em>!</li>
          <li>Click <strong>"Upload Submission"</strong>: Open the dance submission dialog and submit an entry.</li>
        </ul>
      </li>
    </ul>

    <h2>8.4 Production Deployment Recommendations for Feedants</h2>
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Production Architecture Recommendation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Media & Video Storage</strong></td>
          <td>AWS S3 presigned direct uploads with AWS MediaConvert for adaptive HLS video streaming.</td>
        </tr>
        <tr>
          <td><strong>Live Spot Updates</strong></td>
          <td>WebSockets or Server-Sent Events (SSE) for zero-latency spot counters across all connected devices.</td>
        </tr>
        <tr>
          <td><strong>Caching Layer</strong></td>
          <td>Redis cluster caching competition details and winner recitals with pub/sub cache invalidation.</td>
        </tr>
        <tr>
          <td><strong>Plagiarism Check</strong></td>
          <td>Audio fingerprinting against classical music databases to verify genuine original dance recordings.</td>
        </tr>
      </tbody>
    </table>

    <div class="callout callout-success" style="margin-top: 25px;">
      <div class="callout-title">Conclusion & Deliverables</div>
      <p style="margin-bottom: 0;">
        This implementation fully satisfies all technical and design requirements of the Feedants Full Stack Development Internship assignment. It delivers a decoupled, race-condition protected, dynamic, and bilingual system verified by automated concurrency stress tests.
      </p>
    </div>
  </div>

</body>
</html>`;

const htmlPath = path.join(__dirname, 'documentation_temp.html');
const pdfPath = path.join(__dirname, 'Feedants_Competition_Module_Complete_Guide.pdf');

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('HTML documentation written to:', htmlPath);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const cmd = `"${chromePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf-no-header --print-to-pdf="${pdfPath}" "${htmlPath}"`;

console.log('Generating PDF via headless Chrome...');
execSync(cmd, { timeout: 35000 });

const pdfStats = fs.statSync(pdfPath);
console.log('🎉 Comprehensive PDF Generated Successfully!');
console.log(`File: ${pdfPath}`);
console.log(`Size: ${(pdfStats.size / (1024 * 1024)).toFixed(2)} MB`);

// Cleanup temporary HTML
fs.unlinkSync(htmlPath);
console.log('Cleaned up temporary HTML file.');
