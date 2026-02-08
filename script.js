// ==========================================
// DOM 요소
// ==========================================
const startBtn = document.getElementById('startBtn');
const submitBtn = document.getElementById('submitBtn');
const retryBtn = document.getElementById('retryBtn');
const modalClose = document.getElementById('modalClose');
const startSection = document.getElementById('startSection');
const questionSection = document.getElementById('questionSection');
const resultSection = document.getElementById('resultSection');
const strengthKeywordsContainer = document.getElementById('strengthKeywords');
const valueKeywordsContainer = document.getElementById('valueKeywords');
const strengthCountSpan = document.getElementById('strengthCount');
const valueCountSpan = document.getElementById('valueCount');
const jobList = document.getElementById('jobList');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const inputModalOverlay = document.getElementById('inputModalOverlay');
const customKeywordInput = document.getElementById('customKeywordInput');
const inputModalConfirm = document.getElementById('inputModalConfirm');
const inputModalCancel = document.getElementById('inputModalCancel');
const inputModalTitle = document.getElementById('inputModalTitle');
const inputModalDesc = document.getElementById('inputModalDesc');

// 커스텀 키워드 저장
let customStrengthKeywords = [];
let customValueKeywords = [];
let currentInputType = null; // 'strength' or 'value'

// ==========================================
// 강점 키워드 데이터 (25개 - 5x5 그리드)
// ==========================================
const strengthKeywords = [
    { id: 'communication', icon: '💬', name: '소통능력', desc: '명확하게 의사전달' },
    { id: 'analysis', icon: '🔍', name: '분석력', desc: '데이터 해석과 통찰' },
    { id: 'creativity', icon: '🎨', name: '창의력', desc: '새로운 아이디어 창출' },
    { id: 'leadership', icon: '👑', name: '리더십', desc: '팀을 이끄는 능력' },
    { id: 'problem-solving', icon: '🧩', name: '문제해결', desc: '복잡한 문제 해결' },
    { id: 'detail', icon: '🔬', name: '꼼꼼함', desc: '세밀한 작업 수행' },
    { id: 'technical', icon: '⚙️', name: '기술력', desc: '기술 이해와 활용' },
    { id: 'empathy', icon: '❤️', name: '공감능력', desc: '타인 이해와 배려' },
    { id: 'persuasion', icon: '🎯', name: '설득력', desc: '효과적인 설득' },
    { id: 'planning', icon: '📋', name: '기획력', desc: '체계적인 계획 수립' },
    { id: 'speed', icon: '⚡', name: '실행력', desc: '빠른 행동과 추진' },
    { id: 'learning', icon: '📚', name: '학습능력', desc: '빠른 습득과 적응' },
    { id: 'negotiation', icon: '🤝', name: '협상력', desc: '윈윈 협상 도출' },
    { id: 'patience', icon: '🌱', name: '인내심', desc: '끈기 있게 지속' },
    { id: 'flexibility', icon: '🎭', name: '유연성', desc: '상황에 맞게 대응' },
    { id: 'focus', icon: '🎯', name: '집중력', desc: '몰입하여 집중' },
    { id: 'strategic', icon: '♟️', name: '전략적사고', desc: '장기적 관점 수립' },
    { id: 'multitasking', icon: '🎪', name: '멀티태스킹', desc: '여러 업무 동시처리' },
    { id: 'time-management', icon: '⏰', name: '시간관리', desc: '효율적인 시간 활용' },
    { id: 'drive', icon: '🚀', name: '추진력', desc: '목표를 향한 강한 동력' },
    { id: 'listening', icon: '👂', name: '경청능력', desc: '타인 의견 경청' },
    { id: 'critical-thinking', icon: '🤔', name: '비판적사고', desc: '논리적 판단과 분석' },
    { id: 'data-literacy', icon: '📊', name: '데이터활용', desc: '정보 수집과 활용' },
    { id: 'adaptability', icon: '🦎', name: '적응력', desc: '변화에 빠른 적응' },
    { id: 'responsibility', icon: '🛡️', name: '책임감', desc: '맡은 일 완수' }
];

// ==========================================
// 가치관 키워드 데이터 (25개 - 5x5 그리드)
// ==========================================
const valueKeywords = [
    { id: 'growth', icon: '📈', name: '성장', desc: '지속적인 발전과 학습' },
    { id: 'stability', icon: '🏛️', name: '안정', desc: '예측 가능한 환경' },
    { id: 'freedom', icon: '🦅', name: '자유', desc: '독립적인 업무 방식' },
    { id: 'reward', icon: '💰', name: '보상', desc: '높은 금전적 보상' },
    { id: 'meaning', icon: '⭐', name: '의미', desc: '사회적 가치 창출' },
    { id: 'influence', icon: '🌍', name: '영향력', desc: '큰 임팩트 발휘' },
    { id: 'balance', icon: '⚖️', name: '워라밸', desc: '일과 삶의 균형' },
    { id: 'innovation', icon: '💡', name: '혁신', desc: '새로운 것 시도' },
    { id: 'expertise', icon: '🎓', name: '전문성', desc: '깊이 있는 전문지식' },
    { id: 'teamwork', icon: '🤝', name: '팀워크', desc: '협력과 유대감' },
    { id: 'recognition', icon: '🏆', name: '인정', desc: '성과 인정과 칭찬' },
    { id: 'challenge', icon: '🎮', name: '도전', desc: '어려운 과제 해결' },
    { id: 'creative-work', icon: '🎨', name: '창의성', desc: '창의적 작업 환경' },
    { id: 'diversity', icon: '🌈', name: '다양성', desc: '다채로운 경험' },
    { id: 'autonomy', icon: '🗝️', name: '자율성', desc: '자기주도 업무 수행' },
    { id: 'fulfillment', icon: '💝', name: '보람', desc: '일의 의미와 만족' },
    { id: 'reputation', icon: '⭐', name: '명성', desc: '브랜드와 인지도' },
    { id: 'work-flexibility', icon: '🌊', name: '유연성', desc: '시간과 장소 자유' },
    { id: 'collaboration', icon: '🤲', name: '협력', desc: '함께 만드는 가치' },
    { id: 'achievement', icon: '🎯', name: '성취감', desc: '목표 달성의 기쁨' },
    { id: 'social-impact', icon: '🌱', name: '사회공헌', desc: '더 나은 세상 만들기' },
    { id: 'global', icon: '🌏', name: '글로벌', desc: '국제적 시야와 기회' },
    { id: 'learning-opportunity', icon: '📖', name: '학습기회', desc: '지속적 교육 지원' },
    { id: 'leadership-opportunity', icon: '👔', name: '리더기회', desc: '리더십 성장 가능성' },
    { id: 'benefits', icon: '🎁', name: '복지혜택', desc: '다양한 복리후생' }
];

// ==========================================
// 직업 데이터베이스
// ==========================================
const jobDatabase = [
    {
        id: 'software-engineer',
        icon: '💻',
        name: '소프트웨어 엔지니어',
        description: '코드를 작성하고 시스템을 설계하여 혁신적인 소프트웨어를 개발합니다.',
        strengths: ['technical', 'problem-solving', 'analysis', 'detail', 'learning'],
        values: ['growth', 'expertise', 'challenge', 'reward', 'innovation'],
        salary: '연봉 4,500~9,000만원',
        satisfaction: '93%',
        growth: '매우 높음',
        skills: ['프로그래밍', '알고리즘', '시스템 설계', '협업 도구', '문제 해결'],
        reason: '논리적 사고와 기술력을 바탕으로 끊임없이 성장할 수 있는 직업입니다.',
        relatedJobs: ['백엔드 개발자', '풀스택 개발자', '시스템 아키텍트', 'DevOps 엔지니어']
    },
    {
        id: 'data-scientist',
        icon: '📊',
        name: '데이터 사이언티스트',
        description: '방대한 데이터를 분석하고 인사이트를 도출하여 비즈니스 의사결정을 돕습니다.',
        strengths: ['analysis', 'technical', 'problem-solving', 'detail', 'learning'],
        values: ['growth', 'expertise', 'reward', 'challenge', 'innovation'],
        salary: '연봉 5,000~10,000만원',
        satisfaction: '94%',
        growth: '매우 높음',
        skills: ['Python/R', '통계학', '머신러닝', '데이터 시각화', '비즈니스 분석'],
        reason: '데이터로 미래를 예측하고 가치를 창출하는 21세기 핵심 직업입니다.',
        relatedJobs: ['데이터 분석가', 'ML 엔지니어', '퀀트 애널리스트', 'AI 연구원']
    },
    {
        id: 'ux-designer',
        icon: '🎨',
        name: 'UX/UI 디자이너',
        description: '사용자 경험을 연구하고 직관적이고 아름다운 인터페이스를 디자인합니다.',
        strengths: ['creativity', 'empathy', 'analysis', 'detail', 'communication'],
        values: ['innovation', 'meaning', 'growth', 'teamwork', 'recognition'],
        salary: '연봉 4,500~7,500만원',
        satisfaction: '91%',
        growth: '매우 높음',
        skills: ['UI/UX 디자인', 'Figma/Sketch', '사용자 리서치', '프로토타이핑', '감성 디자인'],
        reason: '사용자를 이해하고 아름다운 경험을 만드는 창의적인 직업입니다.',
        relatedJobs: ['제품 디자이너', 'GUI 디자이너', '인터랙션 디자이너', '서비스 디자이너']
    },
    {
        id: 'project-manager',
        icon: '💼',
        name: 'IT 프로젝트 매니저',
        description: '프로젝트를 기획하고 팀을 이끌어 목표를 달성하는 리더십 직무입니다.',
        strengths: ['leadership', 'planning', 'communication', 'problem-solving', 'speed'],
        values: ['influence', 'growth', 'teamwork', 'challenge', 'recognition'],
        salary: '연봉 5,500~9,000만원',
        satisfaction: '90%',
        growth: '높음',
        skills: ['프로젝트 관리', '리더십', '데이터 분석', 'Agile/Scrum', '의사소통'],
        reason: '팀을 이끌고 프로젝트를 성공으로 이끄는 리더십을 발휘할 수 있습니다.',
        relatedJobs: ['제품 관리자(PM)', '스크럼 마스터', '비즈니스 분석가', 'IT 컨설턴트']
    },
    {
        id: 'marketing-manager',
        icon: '📢',
        name: '마케팅 매니저',
        description: '브랜드 전략을 수립하고 창의적인 캠페인으로 고객을 사로잡습니다.',
        strengths: ['creativity', 'communication', 'analysis', 'persuasion', 'planning'],
        values: ['innovation', 'influence', 'recognition', 'teamwork', 'growth'],
        salary: '연봉 4,500~7,500만원',
        satisfaction: '88%',
        growth: '높음',
        skills: ['마케팅 전략', '브랜딩', '소셜 미디어', '데이터 분석', '콘텐츠 기획'],
        reason: '창의적인 아이디어로 브랜드를 성장시키고 시장에 영향을 미칩니다.',
        relatedJobs: ['브랜드 매니저', 'SNS 마케터', 'PR 매니저', '콘텐츠 마케터']
    },
    {
        id: 'content-creator',
        icon: '🎬',
        name: '콘텐츠 크리에이터',
        description: '독창적인 콘텐츠를 기획하고 제작하여 대중과 소통합니다.',
        strengths: ['creativity', 'communication', 'planning', 'speed', 'learning'],
        values: ['freedom', 'innovation', 'recognition', 'meaning', 'balance'],
        salary: '연봉 3,000~10,000만원+',
        satisfaction: '88%',
        growth: '매우 높음',
        skills: ['영상 제작', '콘텐츠 기획', '편집', 'SNS 마케팅', '스토리텔링'],
        reason: '자유롭게 창작하며 자신만의 브랜드를 구축할 수 있습니다.',
        relatedJobs: ['유튜버', '인플루언서', '영상 PD', '1인 미디어 크리에이터']
    },
    {
        id: 'consultant',
        icon: '📈',
        name: '경영 컨설턴트',
        description: '기업의 문제를 분석하고 전략적 솔루션을 제시합니다.',
        strengths: ['analysis', 'problem-solving', 'communication', 'persuasion', 'planning'],
        values: ['reward', 'growth', 'expertise', 'influence', 'challenge'],
        salary: '연봉 6,000~12,000만원',
        satisfaction: '85%',
        growth: '높음',
        skills: ['전략 수립', '데이터 분석', '문제 해결', 'MBA 지식', '프레젠테이션'],
        reason: '기업의 성장을 돕고 높은 보상을 받을 수 있는 전문직입니다.',
        relatedJobs: ['전략 컨설턴트', '재무 분석가', '리스크 매니저', '투자 분석가']
    },
    {
        id: 'teacher',
        icon: '👨‍🏫',
        name: '교육자 / 강사',
        description: '지식과 경험을 나누며 학생들의 성장을 돕습니다.',
        strengths: ['communication', 'empathy', 'planning', 'patience', 'leadership'],
        values: ['meaning', 'stability', 'balance', 'recognition', 'teamwork'],
        salary: '연봉 3,500~6,000만원',
        satisfaction: '86%',
        growth: '중간',
        skills: ['교수법', '커리큘럼 설계', '소통', '피드백', '교육 기술'],
        reason: '학생들의 성장을 돕고 사회에 의미 있는 기여를 할 수 있습니다.',
        relatedJobs: ['학원 강사', '온라인 강사', '기업 교육 강사', '교육 컨설턴트']
    },
    {
        id: 'nurse',
        icon: '⚕️',
        name: '간호사',
        description: '환자를 돌보고 의료팀과 협력하여 건강을 회복시킵니다.',
        strengths: ['empathy', 'detail', 'communication', 'speed', 'problem-solving'],
        values: ['meaning', 'stability', 'teamwork', 'recognition', 'balance'],
        salary: '연봉 3,800~6,500만원',
        satisfaction: '82%',
        growth: '중간',
        skills: ['의료 지식', '환자 케어', '응급 처치', '의료 기기', '팀워크'],
        reason: '생명을 구하고 사회에 큰 의미를 제공하는 보람찬 직업입니다.',
        relatedJobs: ['전문 간호사', '수술실 간호사', '응급실 간호사', '보건 교사']
    },
    {
        id: 'writer',
        icon: '✍️',
        name: '작가 / 콘텐츠 라이터',
        description: '글로 이야기를 전하고 독자들에게 영감을 줍니다.',
        strengths: ['creativity', 'communication', 'empathy', 'detail', 'learning'],
        values: ['freedom', 'meaning', 'innovation', 'balance', 'recognition'],
        salary: '연봉 2,500~7,000만원+',
        satisfaction: '87%',
        growth: '중간',
        skills: ['글쓰기', '스토리텔링', '리서치', '편집', 'SEO'],
        reason: '자유롭게 창작하며 독자들에게 감동과 영감을 줄 수 있습니다.',
        relatedJobs: ['소설가', '시나리오 작가', '웹소설 작가', '기술 문서 작성자']
    },
    {
        id: 'graphic-designer',
        icon: '🖌️',
        name: '그래픽 디자이너',
        description: '시각적 디자인으로 브랜드와 메시지를 표현합니다.',
        strengths: ['creativity', 'detail', 'communication', 'technical', 'planning'],
        values: ['innovation', 'recognition', 'freedom', 'growth', 'balance'],
        salary: '연봉 3,500~6,500만원',
        satisfaction: '85%',
        growth: '중간',
        skills: ['Adobe Creative', '브랜딩', '타이포그래피', '컬러 이론', '레이아웃'],
        reason: '창의적인 비주얼로 브랜드 가치를 높이는 예술적 직업입니다.',
        relatedJobs: ['브랜드 디자이너', '일러스트레이터', '모션 그래픽', '웹 디자이너']
    },
    {
        id: 'sales',
        icon: '🤝',
        name: '영업 / 세일즈',
        description: '고객과 소통하며 제품/서비스의 가치를 전달합니다.',
        strengths: ['communication', 'persuasion', 'empathy', 'speed', 'problem-solving'],
        values: ['reward', 'recognition', 'growth', 'challenge', 'influence'],
        salary: '연봉 3,000~8,000만원+ (인센티브)',
        satisfaction: '78%',
        growth: '높음',
        skills: ['고객 관리', '협상', '프레젠테이션', '관계 구축', '제품 지식'],
        reason: '성과에 따른 높은 보상과 인정을 받을 수 있습니다.',
        relatedJobs: ['영업 관리자', 'B2B 영업', '기술 영업', '부동산 중개인']
    }
];

// ==========================================
// 초기화
// ==========================================
function init() {
    renderKeywords();
    attachEventListeners();
}

// ==========================================
// 키워드 렌더링
// ==========================================
function renderKeywords() {
    // 강점 키워드
    const strengthHTML = strengthKeywords.map(kw => `
        <div class="keyword-item">
            <input type="checkbox" id="strength-${kw.id}" value="${kw.id}" data-type="strength">
            <label class="keyword-label" for="strength-${kw.id}">
                <span class="keyword-icon">${kw.icon}</span>
                <span class="keyword-name">${kw.name}</span>
                <span class="keyword-desc">${kw.desc}</span>
            </label>
        </div>
    `).join('');

    // 커스텀 강점 키워드
    const customStrengthHTML = customStrengthKeywords.map((kw, idx) => `
        <div class="keyword-item">
            <input type="checkbox" id="strength-custom-${idx}" value="${kw}" data-type="strength" data-custom="true" checked>
            <label class="keyword-label custom-keyword-tag" for="strength-custom-${idx}">
                <span class="keyword-icon">✨</span>
                <span class="keyword-name">${kw}</span>
                <span class="keyword-desc">직접 입력</span>
            </label>
        </div>
    `).join('');

    strengthKeywordsContainer.innerHTML = `
        <div class="keyword-grid">
            ${strengthHTML}
        </div>
        ${customStrengthHTML}
        <button class="custom-input-btn" id="addStrengthBtn">
            <span>➕</span>
            강점 직접 입력하기
        </button>
    `;

    // 가치관 키워드
    const valueHTML = valueKeywords.map(kw => `
        <div class="keyword-item">
            <input type="checkbox" id="value-${kw.id}" value="${kw.id}" data-type="value">
            <label class="keyword-label" for="value-${kw.id}">
                <span class="keyword-icon">${kw.icon}</span>
                <span class="keyword-name">${kw.name}</span>
                <span class="keyword-desc">${kw.desc}</span>
            </label>
        </div>
    `).join('');

    // 커스텀 가치관 키워드
    const customValueHTML = customValueKeywords.map((kw, idx) => `
        <div class="keyword-item">
            <input type="checkbox" id="value-custom-${idx}" value="${kw}" data-type="value" data-custom="true" checked>
            <label class="keyword-label custom-keyword-tag" for="value-custom-${idx}">
                <span class="keyword-icon">✨</span>
                <span class="keyword-name">${kw}</span>
                <span class="keyword-desc">직접 입력</span>
            </label>
        </div>
    `).join('');

    valueKeywordsContainer.innerHTML = `
        <div class="keyword-grid">
            ${valueHTML}
        </div>
        ${customValueHTML}
        <button class="custom-input-btn" id="addValueBtn">
            <span>➕</span>
            가치관 직접 입력하기
        </button>
    `;

    // 다시 이벤트 리스너 연결
    attachKeywordEventListeners();
}

// ==========================================
// 이벤트 리스너
// ==========================================
function attachEventListeners() {
    // 시작 버튼
    startBtn.addEventListener('click', () => {
        startSection.style.display = 'none';
        questionSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 제출 버튼
    submitBtn.addEventListener('click', handleSubmit);

    // 다시 하기 버튼
    retryBtn.addEventListener('click', () => {
        resultSection.style.display = 'none';
        startSection.style.display = 'block';
        customStrengthKeywords = [];
        customValueKeywords = [];
        renderKeywords();
        strengthCountSpan.textContent = '0';
        valueCountSpan.textContent = '0';
        submitBtn.disabled = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 모달 닫기
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // 주관식 입력 모달 이벤트
    inputModalCancel.addEventListener('click', closeInputModal);
    inputModalOverlay.addEventListener('click', (e) => {
        if (e.target === inputModalOverlay) closeInputModal();
    });

    inputModalConfirm.addEventListener('click', handleCustomKeywordAdd);

    customKeywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCustomKeywordAdd();
        }
    });
}

// 키워드 이벤트 리스너 (렌더링 후 다시 연결)
function attachKeywordEventListeners() {
    // 체크박스 이벤트
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    // 강점 직접 입력 버튼
    const addStrengthBtn = document.getElementById('addStrengthBtn');
    if (addStrengthBtn) {
        addStrengthBtn.addEventListener('click', () => openInputModal('strength'));
    }

    // 가치관 직접 입력 버튼
    const addValueBtn = document.getElementById('addValueBtn');
    if (addValueBtn) {
        addValueBtn.addEventListener('click', () => openInputModal('value'));
    }
}

// ==========================================
// 체크박스 변경 핸들러
// ==========================================
function handleCheckboxChange(e) {
    const type = e.target.dataset.type;
    const checked = document.querySelectorAll(`input[data-type="${type}"]:checked`);
    const count = checked.length;

    // 5개 제한
    if (count > 5) {
        e.target.checked = false;
        alert('최대 5개까지만 선택할 수 있습니다!');
        return;
    }

    // 카운터 업데이트
    updateCounter();
}

// ==========================================
// 제출 핸들러
// ==========================================
function handleSubmit() {
    // 선택된 키워드 수집
    const selectedStrengths = Array.from(document.querySelectorAll('input[data-type="strength"]:checked'))
        .map(cb => cb.value);
    const selectedValues = Array.from(document.querySelectorAll('input[data-type="value"]:checked'))
        .map(cb => cb.value);

    // 로딩 애니메이션
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    submitBtn.disabled = true;

    // 2초 후 결과 표시
    setTimeout(() => {
        const recommendations = calculateRecommendations(selectedStrengths, selectedValues);
        displayRecommendations(recommendations);

        questionSection.style.display = 'none';
        resultSection.style.display = 'block';

        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

// ==========================================
// 추천 계산 알고리즘
// ==========================================
function calculateRecommendations(userStrengths, userValues) {
    const scores = jobDatabase.map(job => {
        // 강점 매칭 점수 (각 5점, 최대 25점)
        const strengthScore = job.strengths.filter(s => userStrengths.includes(s)).length * 5;

        // 가치관 매칭 점수 (각 5점, 최대 25점)
        const valueScore = job.values.filter(v => userValues.includes(v)).length * 5;

        // 총점 (최대 50점)
        const totalScore = strengthScore + valueScore;

        // 매칭률 계산
        const matchRate = Math.round((totalScore / 50) * 100);

        return {
            job,
            score: totalScore,
            matchRate,
            strengthMatches: job.strengths.filter(s => userStrengths.includes(s)),
            valueMatches: job.values.filter(v => userValues.includes(v))
        };
    });

    // 점수 순으로 정렬하고 상위 5개 반환
    return scores.sort((a, b) => b.score - a.score).slice(0, 5);
}

// ==========================================
// 추천 결과 표시
// ==========================================
function displayRecommendations(recommendations) {
    jobList.innerHTML = recommendations.map((rec, index) => {
        const { job, matchRate, strengthMatches, valueMatches } = rec;
        const allMatches = [...strengthMatches, ...valueMatches];

        return `
            <div class="job-card" data-job-id="${job.id}">
                <div class="job-rank">${index + 1}</div>
                <div class="job-card-header">
                    <div class="job-card-icon">${job.icon}</div>
                    <div class="job-card-title">
                        <div class="job-card-name">${job.name}</div>
                        <div class="job-card-match">매칭률 ${matchRate}%</div>
                    </div>
                </div>
                <p class="job-card-desc">${job.description}</p>
                <div class="job-card-tags">
                    ${allMatches.slice(0, 6).map(match => {
                        const kw = [...strengthKeywords, ...valueKeywords].find(k => k.id === match);
                        return `<span class="tag">${kw ? kw.name : match}</span>`;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');

    // 카드 클릭 이벤트
    document.querySelectorAll('.job-card').forEach(card => {
        card.addEventListener('click', () => {
            const jobId = card.dataset.jobId;
            const job = jobDatabase.find(j => j.id === jobId);
            const rec = recommendations.find(r => r.job.id === jobId);
            showJobDetail(job, rec.matchRate);
        });
    });
}

// ==========================================
// 직업 상세 정보 표시
// ==========================================
function showJobDetail(job, matchRate) {
    modalContent.innerHTML = `
        <button class="modal-close" id="modalCloseInner">✕</button>
        <div class="modal-header">
            <div class="modal-icon">${job.icon}</div>
            <div class="modal-title">
                <h3>${job.name}</h3>
                <div class="modal-match">매칭률 ${matchRate}%</div>
            </div>
        </div>

        <p class="modal-desc">${job.description}</p>

        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">예상 연봉</div>
                <div class="info-value">${job.salary}</div>
            </div>
            <div class="info-item">
                <div class="info-label">만족도</div>
                <div class="info-value">${job.satisfaction}</div>
            </div>
            <div class="info-item">
                <div class="info-label">성장 가능성</div>
                <div class="info-value">${job.growth}</div>
            </div>
        </div>

        <h4 class="section-title">필요한 핵심 스킬</h4>
        <div class="skills-list">
            ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>

        <h4 class="section-title">💡 추천 이유</h4>
        <p style="color: var(--text-medium); line-height: 1.8;">${job.reason}</p>

        <h4 class="section-title">관련 직업</h4>
        <div class="related-job-list">
            ${job.relatedJobs.map(rj => `<div class="related-job-item">• ${rj}</div>`).join('')}
        </div>
    `;

    modalOverlay.style.display = 'flex';

    // 모달 내부 닫기 버튼
    document.getElementById('modalCloseInner').addEventListener('click', closeModal);
}

// ==========================================
// 모달 닫기
// ==========================================
function closeModal() {
    modalOverlay.style.display = 'none';
}

// ==========================================
// 주관식 입력 모달 열기
// ==========================================
function openInputModal(type) {
    currentInputType = type;
    customKeywordInput.value = '';

    if (type === 'strength') {
        inputModalTitle.textContent = '강점 직접 입력';
        inputModalDesc.textContent = '나만의 강점 키워드를 입력해주세요';
        customKeywordInput.placeholder = '예: 창의력, 끈기, 열정 등';
    } else {
        inputModalTitle.textContent = '가치관 직접 입력';
        inputModalDesc.textContent = '중요하게 생각하는 가치를 입력해주세요';
        customKeywordInput.placeholder = '예: 자율성, 보람, 안정성 등';
    }

    inputModalOverlay.style.display = 'flex';
    customKeywordInput.focus();
}

// ==========================================
// 주관식 입력 모달 닫기
// ==========================================
function closeInputModal() {
    inputModalOverlay.style.display = 'none';
    customKeywordInput.value = '';
}

// ==========================================
// 커스텀 키워드 추가
// ==========================================
function handleCustomKeywordAdd() {
    const value = customKeywordInput.value.trim();

    if (!value) {
        alert('키워드를 입력해주세요!');
        return;
    }

    if (value.length > 20) {
        alert('키워드는 20자 이내로 입력해주세요!');
        return;
    }

    // 현재 선택된 개수 확인
    const currentCount = document.querySelectorAll(`input[data-type="${currentInputType}"]:checked`).length;

    if (currentCount >= 5) {
        alert('최대 5개까지만 선택할 수 있습니다!');
        return;
    }

    // 커스텀 키워드 추가
    if (currentInputType === 'strength') {
        if (!customStrengthKeywords.includes(value)) {
            customStrengthKeywords.push(value);
        }
    } else {
        if (!customValueKeywords.includes(value)) {
            customValueKeywords.push(value);
        }
    }

    // 다시 렌더링
    renderKeywords();

    // 카운터 업데이트
    updateCounter();

    closeInputModal();
}

// ==========================================
// 카운터 업데이트
// ==========================================
function updateCounter() {
    const strengthCount = document.querySelectorAll('input[data-type="strength"]:checked').length;
    const valueCount = document.querySelectorAll('input[data-type="value"]:checked').length;

    strengthCountSpan.textContent = strengthCount;
    valueCountSpan.textContent = valueCount;

    // 제출 버튼 활성화
    submitBtn.disabled = !(strengthCount === 5 && valueCount === 5);
}

// ==========================================
// 실행
// ==========================================
init();
console.log('✨ Career Finder v3.0 - 키워드 기반 매칭 시스템');
console.log('📊 직업 데이터:', jobDatabase.length + '개');
console.log('💪 강점 키워드:', strengthKeywords.length + '개');
console.log('❤️ 가치관 키워드:', valueKeywords.length + '개');
