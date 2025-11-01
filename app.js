const group = document.getElementById("group");

let names = [
  "عمر أسامة عفارة",
  "مصطفى أحمد بهلول",
  "يحيى سامر خضر مدبوح",
  "عبدالرحمن خالد كروم",
  "وليد هيثم قره محمد",
  "المعتصم بالله فيصل العبدالله",
  "أحمد زياد الأحمد",
  "محمد عبدالمالك طعان",
  "حمزة عبدالله الخالد",
  "جاد أحمد الخلف",
  "صهيب فيصل العبدالله",
  "يوسف عبدالرزاق السيد",
  "زكريا عامر عفارة",
  "محمد خير عبداللطيف بطل",
  "يوسف مرزوق عبدالجواد",
  "محمد عبدالسلام حمادة",
  "محمد حسان حلاق",
  "محمد ديب محمد أمين افحيل",
  "أمير سالم زرير",
  "خالد أحمد طباع",
  "سراج محمد صطوف",
  "محمد عبدالحميد عرجا",
  "أحمد نديم برهوم",
  "أحمد شادي جولاق",
  "جادالله بسام طلاع",
  "محمود مصطفى اليبرودي",
  "حمزة عامر السعيد",
  "عبدالله ماهر شيخ محمد",
  "رياض محمد عيد شريف",
  "شادي مازن جاروخ",
  "عبيدة عبدالله جولاق",
  "عمر محمد خير زيداني",
  "محمد وحيد اليبرودي",
  "محمد حسين الأحمد",
  "حسن حسين الأحمد",
  "محمد أحمد سيد عيسى",
  "محمد منذر الدريس",
  "عبدالحي التركستاني",
  "إبراهيم ماهر العلي",
  "حسن ماهر العلي",
  "أيهم محمد الرفاعي",
  "حسين أسامة حبول",
  "كرم إياد سرميني",
  "تيم عبدالحميد عرجا",
  "اسلام زكريا شيخ محمد",
  "عبدالحي وحيد اليبرودي",
  "نبيل عامر السعيد",
  "عبدالرحمن العبدالله الخالد",
  "علي الزين",
  "عماد مصطفى اليبرودي",
  "زيد عامر السعيد",
  "حسام أحمد طباع",
  "مصطفى أحمد سرحان",
  "محمود عوض",
  "علي مناف سيف الدين",
  "إسماعيل أمجد جيكو",
];

// إنشاء بطاقات المشاركين
names.forEach((name) => {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = name;
  const img = document.createElement("img");
  img.src = "images/students.png";
  img.alt = name;
  card.appendChild(img);
  group.appendChild(card);
});

const buttonStart = document.getElementById("start");
const modalbox = document.getElementById("modal");
const retryBtn = document.getElementById("retry-btn");
const checkboxStop = document.getElementById("stopescape");
const winnerNameElement = document.getElementById("name-winner");

let winners = [];
let escapeEnabled = true; // لتفعيل أو إيقاف الهروب

// تشغيل القرعة
function startshowwinner() {
  retryBtn.classList.add("ds-none");
  winnerNameElement.style.color = "#075993";

  const audioStart = new Audio("sounds/sping.mp3");
  const audioSuccess = new Audio("sounds/sucsess.wav");

  audioStart.play();
  modalbox.classList.remove("ds-none");
  buttonStart.disabled = true;

  let intervalTime = 50;
  const totalDuration = 10000;
  const startTime = Date.now();
  let selectedName = "";

  function updateName() {
    if (names.length === 0) {
      winnerNameElement.textContent = "انتهت جميع الأسماء!";
      return;
    }

    const randomIndex = Math.floor(Math.random() * names.length);
    selectedName = names[randomIndex];
    winnerNameElement.textContent = selectedName;

    const elapsed = Date.now() - startTime;
    intervalTime = 50 + (elapsed / totalDuration) * 950;

    if (elapsed < totalDuration) {
      setTimeout(updateName, intervalTime);
    } else {
      winnerNameElement.style.color = "#FFD447";
      winnerNameElement.textContent = "🏆 " + selectedName + " 🏆";

      winners.push(selectedName);
      names = names.filter((name) => name !== selectedName);

      retryBtn.classList.remove("ds-none");
      audioSuccess.play();
      createConfetti();
      speakName(selectedName);
    }
  }

  updateName();
}

buttonStart.addEventListener("click", startshowwinner);
retryBtn.addEventListener("click", startshowwinner);

// نطق الاسم
function speakName(name) {
  const utterance = new SpeechSynthesisUtterance(name + " فاز!");
  utterance.lang = "ar-SA";
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

// التحكم في checkbox
checkboxStop.addEventListener("change", () => {
  escapeEnabled = !checkboxStop.checked;

 if (checkboxStop.checked) {
        // عند التفعيل: ثبّت الزر بأسفل الشاشة تمامًا
        buttonStart.style.position = 'fixed';
        buttonStart.style.left = '50%';
        buttonStart.style.bottom = '0px';
        buttonStart.style.top = 'auto';
        buttonStart.style.transform = 'translateX(-50%)'; // يوسّط الزر أفقياً
    } else {
        // عند الإلغاء: أعد الوضع الافتراضي (يمكنه الهروب)
        buttonStart.style.position = 'absolute';
        buttonStart.style.transform = 'none';
    }
});

// تحريك الزر عند مرور الماوس
buttonStart.addEventListener("mouseover", () => {
  if (!escapeEnabled) return;
  const x = Math.random() * (window.innerWidth - buttonStart.offsetWidth);
  const y =
    Math.random() * (window.innerHeight - buttonStart.offsetHeight - 20);
  buttonStart.style.left = x + "px";
  buttonStart.style.top = y + "px";
  buttonStart.style.bottom = "";
});

// فقاعات الاحتفال
function createConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = [
    "#ff0a54",
    "#ff477e",
    "#ff7096",
    "#ff85a1",
    "#fbb1b1",
    "#f9bec7",
    "#9b5de5",
    "#f15bb5",
    "#fee440",
    "#00bbf9",
  ];

  for (let i = 0; i < 300; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.width = 5 + Math.random() * 12 + "px";
    confetti.style.height = confetti.style.width;
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    container.appendChild(confetti);
    confetti.addEventListener("animationend", () => confetti.remove());
  }
}
