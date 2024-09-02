import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { FaSearch, FaChartBar, FaRocket, FaComments, FaAd, FaArrowRight, FaCheck, FaInfoCircle, FaBrain, FaUsers, FaPercentage, FaStar, FaClock, FaBullseye, FaGlobe, FaIndustry, FaShoppingCart, FaLaptop, FaBullhorn, FaQuestionCircle, FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronRight, FaLifeRing, FaCode, FaServer, FaShieldAlt, FaPaperPlane, FaTelegramPlane } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './App.css';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons'; // Add this import
import { FaTelegram, FaGoogle, FaSlack, FaHubspot, FaSalesforce, FaMailchimp, FaTrello } from 'react-icons/fa';
import { SiZapier } from 'react-icons/si';

const StyledSignInButton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <SignInButton mode="modal" />
  </div>
);

// Компонент анимированного счетчика
const AnimatedCounter: React.FC<{ end: number, duration: number }> = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

// Компонент FAQ
const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{question}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

// Определим тип для плана
type Plan = {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: { text: string; tooltip: string }[];
  popular: boolean;
  discount: string | null;
};

// Add this new component
const QuizModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      question: "Какая основная сфера деятельности вашего бизнеса?",
      options: [
        { text: "E-commerce", icon: FaShoppingCart },
        { text: "Услуги", icon: FaBullhorn },
        { text: "Производство", icon: FaIndustry },
        { text: "IT", icon: FaLaptop },
        { text: "Другое", icon: FaQuestionCircle }
      ]
    },
    {
      question: "Какой у вас целевой возрастной диапазон аудитории?",
      options: [
        { text: "18-24", icon: FaUsers },
        { text: "25-34", icon: FaUsers },
        { text: "35-44", icon: FaUsers },
        { text: "45-54", icon: FaUsers },
        { text: "55+", icon: FaUsers }
      ]
    },
    {
      question: "Какой у вас средний чек?",
      options: [
        { text: "До 1000 ₽", icon: FaPercentage },
        { text: "1000-5000 ₽", icon: FaPercentage },
        { text: "5000-10000 ₽", icon: FaPercentage },
        { text: "10000-50000 ₽", icon: FaPercentage },
        { text: "Более 50000 ₽", icon: FaPercentage }
      ]
    },
    {
      question: "Какие каналы продвижения вы уже используете?",
      options: [
        { text: "Социальные сети", icon: FaGlobe },
        { text: "Контекстная реклама", icon: FaAd },
        { text: "SEO", icon: FaSearch },
        { text: "Наружная реклама", icon: FaBullhorn },
        { text: "Другое", icon: FaQuestionCircle }
      ]
    },
    {
      question: "Какую основную цель вы преследуете в рекламе?",
      options: [
        { text: "Увеличение продаж", icon: FaShoppingCart },
        { text: "Повышение узнаваемости бренда", icon: FaStar },
        { text: "Лидогенерация", icon: FaUsers },
        { text: "Запуск нового продукта", icon: FaRocket },
        { text: "Другое", icon: FaQuestionCircle }
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [step]: answer });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Quiz completed:", answers);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Quiz completed:", answers);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg max-w-md w-full relative"
      >
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          &times; {/* Кнопка закрытия */}
        </button>
        <h3 className="text-2xl font-bold mb-4">Расскажите о вашем бизнесе</h3>
        <p className="mb-4">{questions[step].question}</p>
        <div className="space-y-2">
          {questions[step].options.map((option, index) => (
            <button
              key={index}
              className="btn btn-secondary w-full text-left flex items-center p-3 rounded-lg shadow-md hover:bg-blue-100 transition"
              onClick={() => handleAnswer(option.text)}
            >
              <option.icon className="mr-3 text-blue-500 text-2xl" /> {/* Иконка с цветом и размером */}
              <span className="text-gray-800 font-medium">{option.text}</span> {/* Текст с улучшенным стилем */}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="btn btn-secondary" onClick={handleBack} disabled={step === 0}>Назад</button>
          <span>{step + 1} из {questions.length}</span>
          <button className="btn btn-primary" onClick={handleSkip}>Пропустить</button>
        </div>
      </motion.div>
    </div>
  );
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const plans = [
    {
      name: 'Базовый',
      monthlyPrice: 1990,
      annualPrice: 19900,
      features: [
        { text: 'Анализ до 100 чатов в месяц', tooltip: 'Ограничение на кличество нализируемых чатов' },
        { text: 'Базовая AI-аналитика', tooltip: 'Основные метрики и инсайты' },
        { text: 'Еженедельные отчеты', tooltip: 'Отчеты, отправляемые каждую неделю' },
        { text: 'Email поддержка', tooltip: 'Поддержка через электронную почту' }
      ],
      popular: false,
      discount: null
    },
    {
      name: 'Продвинтый',
      monthlyPrice: 4990,
      annualPrice: 49900,
      features: [
        { text: 'Анализ до 500 чатов в месяц', tooltip: 'Расширенный лимит на анализ чатов' },
        { text: 'Расширенная AI-аналтика', tooltip: 'Углбленный анаи  прогнозирование' },
        { text: 'Ежедневные отчеты', tooltip: 'Отчеты, отправляемые каждый день' },
        { text: 'Приоритетная поддержка', tooltip: 'Быстрый отклик на ваши запросы' },
        { text: 'нтеграция с CRM', tooltip: 'Возможность интеграии с вашей CRM-системой' }
      ],
      popular: true,
      discount: '10% скидка при годовой оплате'
    },
    {
      name: 'Премиум',
      monthlyPrice: 9990,
      annualPrice: 99900,
      features: [
        { text: 'Безлимитный анализ чатв', tooltip: 'Анализируйте любое количество чатв' },
        { text: 'Премиум AI-аналитика', tooltip: 'Самые передовые алгоритмы анализа' },
        { text: 'Отчеты в реальном времени', tooltip: 'Мговенный доступ к актуальным данным' },
        { text: 'Персональный менеджер', tooltip: 'Выделенный специаист для вашго аккаунта' },
        { text: 'API доступ', tooltip: 'Инегрируйте наши данные в свои системы' },
        { text: 'Индивидуальная настройка', tooltip: 'Настройка под ваши уникальные потребности' }
      ],
      popular: false,
      discount: '15% скидка при годовой оплате'
    }
  ];

  const integrations = [
    { name: 'Telegram', icon: FaTelegram },
    { name: 'Google Analytics', icon: FaGoogle },
    { name: 'Zapier', icon: SiZapier },
    { name: 'Slack', icon: FaSlack },
    { name: 'HubSpot', icon: FaHubspot },
    { name: 'Salesforce', icon: FaSalesforce },
    { name: 'Mailchimp', icon: FaMailchimp },
    { name: 'Trello', icon: FaTrello },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <header className={`bg-white shadow-md sticky top-0 z-10 w-full transition-all duration-300 ${isScrolled ? 'py-2 bg-blue-600' : 'py-4 bg-white'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaBrain className="text-3xl text-blue-600" /> {/* Добавлена иконка логотипа */}
            <div className="text-3xl font-bold text-blue-600">TeleScanner</div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition duration-300">Преимущества</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition duration-300">Как это работает</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition duration-300">Тарифы</a>
            <a href="#integrations" className="text-gray-700 hover:text-blue-600 transition duration-300">Интеграции</a>
          </nav>
          <div>
            <SignedOut>
              <StyledSignInButton className="btn btn-primary" />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <div className="content-container">
        <div className="centered-content">
          <main>
            <section className="hero bg-gradient-to-b from-blue-100 via-blue-200 to-white text-gray-900 py-20 md:py-32 relative overflow-hidden">
              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <motion.div 
                    className="flex items-center justify-center space-x-2 mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <FaBrain className="text-5xl text-blue-600" />
                    <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                      TeleScanner
                    </h1>
                  </motion.div>
                  <motion.p 
                    className="text-2xl md:text-3xl mb-8 text-gray-700 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    AI-Powered Telegram Chat Scanner
                  </motion.p>
                  <motion.p 
                    className="text-lg md:text-xl mb-12 text-gray-600 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Найдите идеальные чаты для вашей рекламы с помощью искусственного интеллекта
                  </motion.p>
                  <motion.div 
                    className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center w-full sm:w-auto justify-center"
                      onClick={() => setShowQuiz(true)} // Вызов квиза при нажатии
                    >
                      <FaSearch className="mr-2" />
                      Начать умный поиск
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-secondary text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center w-full sm:w-auto justify-center"
                    >
                      <FaInfoCircle className="mr-2" />
                      Узнать больше
                      <FaArrowRight className="ml-2" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute inset-0 z-0"
              >
                {[...Array(10)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{
                      width: Math.random() * 80 + 60, // Еще больше увеличил размер иконок
                      height: Math.random() * 80 + 60,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, Math.random() * 200 - 100], // Плавное движение по вертикали
                      x: [0, Math.random() * 200 - 100], // Плавное движение по горизонтали
                      rotate: [0, 360], // Добавил вращение для более естественного движения
                    }}
                    transition={{
                      duration: Math.random() * 15 + 10, // Увеличил продолжительность анимации
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    {index % 2 === 0 ? (
                      <FaPaperPlane className="text-blue-300 opacity-70" />
                    ) : (
                      <FaTelegramPlane className="text-blue-300 opacity-70" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </section>
            
            <section id="features" className="py-24 bg-gray-50 animate-slideIn">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16">Преимущества нашего AI-сканера для поиска рекламных площадок</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  <div className="card hover:bg-blue-50 transform hover:-translate-y-2 transition-all duration-300">
                    <FaBrain className="text-blue-600 text-5xl mb-6 mx-auto" />
                    <h3 className="text-2xl font-semibold mb-4">Умнй анализ чатов</h3>
                    <p className="text-gray-600">AI анализирует активность и тематику чатов для точного таргетинга вашей рекламы</p>
                  </div>
                  <div className="card hover:bg-blue-50 transform hover:-translate-y-2 transition-all duration-300">
                    <FaSearch className="text-blue-600 text-5xl mb-6 mx-auto" />
                    <h3 className="text-2xl font-semibold mb-4">Предиктивный поиск</h3>
                    <p className="text-gray-600">ИИ предсказывает потенциальную эффективность рекламы в различных чатах</p>
                  </div>
                  <div className="card hover:bg-blue-50 transform hover:-translate-y-2 transition-all duration-300">
                    <FaChartBar className="text-blue-600 text-5xl mb-6 mx-auto" />
                    <h3 className="text-2xl font-semibold mb-4">Глубокая аналитика</h3>
                    <p className="text-gray-600">Получайте детальные инсайты о аудитории выбранных чатов</p>
                  </div>
                  <div className="card hover:bg-blue-50 transform hover:-translate-y-2 transition-all duration-300">
                    <FaRocket className="text-blue-600 text-5xl mb-6 mx-auto" />
                    <h3 className="text-2xl font-semibold mb-4">Автоматизация</h3>
                    <p className="text-gray-600">AI автоматически находит и ранжирует чаты по их рекламному потенциалу</p>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <button 
                    className="btn btn-primary text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    onClick={() => setShowQuiz(true)} // Вызов квиза при нажатии
                  >
                    <FaRocket className="mr-2" />
                    Попробовать бесплатно
                  </button>
                </div>
              </div>
            </section>
            
            <section id="how-it-works" className="py-24 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16 text-center">Как работает TeleScanner</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <FaSearch className="text-blue-600 text-4xl" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">1. Сканирование чатов</h3>
                    <p className="text-gray-600">AI-алгоритм сканирует тысячи Telegram-чатов, анализируя их контент и актиность.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <FaBrain className="text-blue-600 text-4xl" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">2. AI-анализ</h3>
                    <p className="text-gray-600">Искусственный интеллект обрабатывает данные, выявляя наиболее подходящие площадки для вашей рекламы.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <FaChartBar className="text-blue-600 text-4xl" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">3. Результаты и инсайты</h3>
                    <p className="text-gray-600">Получите детальный отчет с рекомендациями по размещению рекламы и аналитикой потенциальной аудитории.</p>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <button 
                    className="btn btn-primary text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    onClick={() => setShowQuiz(true)} // Вызов квиза при нажатии
                  >
                    <FaCheck className="mr-2" />
                    Начать бесплатный тест
                  </button>
                </div>
              </div>
            </section>

            <section id="statistics" className="py-24 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16 text-gray-800">Наша статистика</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <StatItem icon={FaComments} value={1000000} label="Проанализированных чатов" />
                  <StatItem icon={FaAd} value={500} label="Успешных рекламных кампаний" />
                  <StatItem icon={FaChartBar} value={98} label="Точность AI-анализа" suffix="%" />
                  <StatItem icon={FaUsers} value={100} label="Довольных клиентов" />
                  <StatItem icon={FaRocket} value={30} label="Средний рост ROI" suffix="%" />
                  <StatItem icon={FaClock} value={40} label="Экономия времени на поиск" suffix="%" />
                  <StatItem icon={FaBullseye} value={85} label="Точность таргетинга" suffix="%" />
                  <StatItem icon={FaGlobe} value={20} label="Стран использования" />
                  <StatItem icon={FaPercentage} value={95} label="Удовлетворенность клиентов" suffix="%" />
                </div>
              </div>
            </section>

            <section id="testimonials" className="py-24 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16 text-center">Отзывы рекламодателей</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                    <p className="mb-4 text-lg italic text-gray-700">"TeleScanner помог нам найти идеальные чаты для нашей рекламы, увеличив ROI на 40%!"</p>
                    <hr className="my-4 border-gray-300" />
                    <p className="font-semibold text-gray-800">- Анна, digital-маркетолог</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                    <p className="mb-4 text-lg italic text-gray-700">"Благодаря AI-анализу мы смогли точно определить наиболее подходящие чаты для нашего продукта."</p>
                    <hr className="my-4 border-gray-300" />
                    <p className="font-semibold text-gray-800">- Иван, владелец интернет-магазина</p>
                    <div className="flex mt-4">
                      {[...Array(4)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                    <p className="mb-4 text-lg italic text-gray-700">"Автоматизация поиска рекламных площадок в Telegram сэкономила нам огрмное количество времени и ресурсов."</p>
                    <hr className="my-4 border-gray-300" />
                    <p className="font-semibold text-gray-800">- Мария, руководитель отдела рекламы</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                    <p className="mb-4 text-lg italic text-gray-700">"С TeleScanner мы смогли значительно улучшить наши рекламные кампании, что привело к увеличению продаж на 25%!"</p>
                    <hr className="my-4 border-gray-300" />
                    <p className="font-semibold text-gray-800">- Сергей, директор по маркетингу</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                    <p className="mb-4 text-lg italic text-gray-700">"Искусственный интеллект TeleScanner помог нам найти новые рынки и расширить нашу клиентскую базу."</p>
                    <hr className="my-4 border-gray-300" />
                    <p className="font-semibold text-gray-800">- Ольга, менеджер по развитию бизнеса</p>
                    <div className="flex mt-4">
                      {[...Array(4)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                    <p className="mb-4 text-lg italic text-gray-700">"Мы были поражены точностью анализа и рекомендаций, предоставленных TeleScanner. Это действительно изменило нашу стратегию рекламы."</p>
                    <hr className="my-4 border-gray-300" />
                    <p className="font-semibold text-gray-800">- Дмитрий, владелец стартапа</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="faq" className="py-24 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16">Часто задаваемые вопросы</h2>
                <div className="max-w-2xl mx-auto">
                  <FAQItem 
                    question="Как работает AI-сканер для поиска рекламных чатов?" 
                    answer="Наш AI-сканер анализирует активность, тематику и аудиторию Telegram-чатов, используя алгоритмы машинного обучения для выявления наиболее подходящих площадок для вашей рекламы."
                  />
                  <FAQItem 
                    question="Насколько эффективна реклама в найденных чатах?" 
                    answer="По статистике наших клиентов, реклама в чатах, подобранных нашим AI, показывает в среднем на 30% более высокую конверсию по сравнению с обычным размеением."
                  />
                  <FAQItem 
                    question="Какие типы рекламы можно размещать в найденных чатах?" 
                    answer="В зависимости от правил конкретного чата, вы можете размещать текстовые объявления, баннеры, ссылки на ваши ресурсы или даже организовывать конкурсы и акции."
                  />
                </div>
              </div>
            </section>
            
            <section id="pricing" className="py-24 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-8 text-center">Выберите подходящий тариф</h2>
                
                <div className="flex justify-center mb-8">
                  <button
                    className={`px-4 py-2 rounded-l-lg ${!isAnnual ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setIsAnnual(false)}
                  >
                    Ежемесячно
                  </button>
                  <button
                    className={`px-4 py-2 rounded-r-lg ${isAnnual ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setIsAnnual(true)}
                  >
                    Ежегодно
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.map((plan, index) => (
                    <div 
                      key={index} 
                      className={`bg-white p-8 rounded-lg shadow-md flex flex-col transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${plan.popular ? 'border-2 border-blue-500' : ''}`}
                    >
                      {plan.popular && <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-sm rounded-bl">Популярный выбор</div>}
                      <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                      <div className="text-4xl font-bold mb-6">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice} ₽
                        <span className="text-xl font-normal">/{isAnnual ? 'год' : 'мес'}</span>
                      </div>
                      {plan.discount && <div className="text-green-500 mb-4">{plan.discount}</div>}
                      <ul className="mb-8 flex-grow">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center mb-2">
                            <FaCheck className="text-green-500 mr-2" />
                            <span>{feature.text}</span>
                            <FaInfoCircle 
                              className="ml-2 text-gray-400 cursor-pointer" 
                              data-tooltip-id={`tooltip-${index}-${fIndex}`}
                              data-tooltip-content={feature.tooltip}
                            />
                            <Tooltip id={`tooltip-${index}-${fIndex}`} />
                          </li>
                        ))}
                      </ul>
                      <button 
                        className="btn btn-primary w-full"
                        onClick={() => setSelectedPlan(plan as Plan)}
                      >
                        Выбрать тариф
                      </button>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <button 
                    className="btn btn-primary text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    onClick={() => setShowQuiz(true)} // Вызов квиза при нажатии
                  >
                    <FaPercentage className="mr-2" />
                    Пройти квиз и получить скидку
                  </button>
                </div>
              </div>
            </section>

            {selectedPlan && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg max-w-md">
                  <h3 className="text-2xl font-bold mb-4">Детали тарифа "{selectedPlan.name}"</h3>
                  <p>Цена: {isAnnual ? selectedPlan.annualPrice : selectedPlan.monthlyPrice} ₽ за {isAnnual ? 'год' : 'месяц'}</p>
                  <ul className="my-4">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="mb-2">{feature.text}</li>
                    ))}
                  </ul>
                  <button className="btn btn-primary mr-4" onClick={() => alert('Функция оформления подписки')}>Оформить подписку</button>
                  <button className="btn btn-secondary" onClick={() => setSelectedPlan(null)}>Закрыть</button>
                </div>
              </div>
            )}

            <section id="integrations" className="py-24 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16 text-center">Интеграции и партнеры</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {integrations.map((integration, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <integration.icon className="text-5xl mb-4 text-blue-600" />
                      <p className="text-center font-semibold">{integration.name}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <p className="text-xl mb-6">Интегрируйте TeleScanner с вашими любимыми инструментами для максимальной эффективности</p>
                  <button className="btn btn-primary">Узнать больше о интеграциях</button>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-24 animate-fadeIn">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-8">Революционизируйте вашу рекламу в Telegram с AI-powered TeleScanner</h2>
                <button 
                  className="btn btn-secondary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                  onClick={() => setShowQuiz(true)} // Вызов квиза при нажатии
                >
                  <FaRocket className="inline mr-2" />
                  Начните умный поиск рекламных площадок
                  <FaArrowRight className="inline ml-2" />
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-6">
                <FaBrain className="text-4xl text-blue-400" />
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">TeleScanner</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">Инновационное решение для поиска рекламных площадок в Telegram с использованием AI</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110">
                  <FaFacebook className="text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110">
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-blue-400">Быстрые ссылки</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaChevronRight className="mr-2 text-blue-400" />Преимущества</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaChevronRight className="mr-2 text-blue-400" />Как это работает</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaChevronRight className="mr-2 text-blue-400" />Тарифы</a></li>
                <li><a href="#integrations" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaChevronRight className="mr-2 text-blue-400" />Интеграции</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaChevronRight className="mr-2 text-blue-400" />FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-blue-400">Поддержка</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaLifeRing className="mr-2 text-blue-400" />Центр помощи</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaCode className="mr-2 text-blue-400" />Документация API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaServer className="mr-2 text-blue-400" />Статус системы</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 flex items-center"><FaShieldAlt className="mr-2 text-blue-400" />Политика конфиденциальности</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-blue-400">Свяжитесь с нами</h4>
              <p className="text-gray-400 mb-4 flex items-center">
                <FaEnvelope className="mr-3 text-blue-400" />
                <a href="mailto:info@telescanner.com" className="hover:text-white transition duration-300">info@telescanner.com</a>
              </p>
              <p className="text-gray-400 mb-4 flex items-center">
                <FaPhone className="mr-3 text-blue-400" />
                <a href="tel:+79991234567" className="hover:text-white transition duration-300">+7 (999) 123-45-67</a>
              </p>
              <p className="text-gray-400 flex items-center">
                <FaMapMarkerAlt className="mr-3 text-blue-400" />
                Москва, ул. Примерная, д. 123
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2023 TeleScanner. Все права защищены.</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition duration-300">Условия использования</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition duration-300">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </footer>

      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} />}
    </div>
  );
}

// Update the StatItem component definition
const StatItem: React.FC<{ icon: IconType; value: number; label: string; suffix?: string }> = ({ icon: Icon, value, label, suffix = '' }) => (
  <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
    <Icon className="text-5xl mb-4 mx-auto text-blue-600" />
    <div className="text-4xl font-bold mb-2 flex justify-center items-baseline text-gray-800">
      <AnimatedCounter end={value} duration={2000} />
      <span className="ml-1">{suffix}</span>
    </div>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default App;
