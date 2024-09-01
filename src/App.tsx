import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { FaSearch, FaRobot, FaChartBar, FaRocket, FaComments, FaAd, FaArrowRight, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './App.css';

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

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: 'Базовый',
      monthlyPrice: 1990,
      annualPrice: 19900,
      features: [
        { text: 'Анализ до 100 чатов в месяц', tooltip: 'Ограничение на количество анализируемых чатов' },
        { text: 'Базовая AI-аналитика', tooltip: 'Основные метрики и инсайты' },
        { text: 'Еженедельные отчеты', tooltip: 'Отчеты, отправляемые каждую неделю' },
        { text: 'Email поддержка', tooltip: 'Поддержка через электронную почту' }
      ],
      popular: false,
      discount: null
    },
    {
      name: 'Продвинутый',
      monthlyPrice: 4990,
      annualPrice: 49900,
      features: [
        { text: 'Анализ до 500 чатов в месяц', tooltip: 'Расширенный лимит на анализ чатов' },
        { text: 'Расширенная AI-аналитика', tooltip: 'Углубленный анализ и прогнозирование' },
        { text: 'Ежедневные отчеты', tooltip: 'Отчеты, отправляемые каждый день' },
        { text: 'Приоритетная поддержка', tooltip: 'Быстрый отклик на ваши запросы' },
        { text: 'Интеграция с CRM', tooltip: 'Возможность интеграции с вашей CRM-системой' }
      ],
      popular: true,
      discount: '10% скидка при годовой оплате'
    },
    {
      name: 'Премиум',
      monthlyPrice: 9990,
      annualPrice: 99900,
      features: [
        { text: 'Безлимитный анализ чатов', tooltip: 'Анализируйте любое количество чатов' },
        { text: 'Премиум AI-аналитика', tooltip: 'Самые передовые алгоритмы анализа' },
        { text: 'Отчеты в реальном времени', tooltip: 'Мгновенный доступ к актуальным данным' },
        { text: 'Персональный менеджер', tooltip: 'Выделенный специалист для вашего аккаунта' },
        { text: 'API доступ', tooltip: 'Интегрируйте наши данные в свои системы' },
        { text: 'Индивидуальная настройка', tooltip: 'Настройка под ваши уникальные потребности' }
      ],
      popular: false,
      discount: '15% скидка при годовой оплате'
    }
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
          <div className="text-3xl font-bold text-blue-600">TeleScanner</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition duration-300">Преимущества</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition duration-300">Как это работает</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition duration-300">Тарифы</a>
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
            <section className="hero bg-gradient-to-r from-blue-600 to-blue-400 text-white py-32 animate-fadeIn">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">AI-Powered Telegram Chat Scanner</h1>
                <p className="text-2xl mb-12">Найдите идеальные чаты для вашей рекламы с помощью искусственного интеллекта</p>
                <button className="btn btn-secondary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <FaSearch className="inline mr-2" />
                  Начать умный поиск чатов
                </button>
              </div>
            </section>
            
            <section id="features" className="py-24 bg-gray-50 animate-slideIn">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16">Преимущества нашего AI-сканера для поиска рекламных площадок</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  <div className="card hover:bg-blue-50 transform hover:-translate-y-2 transition-all duration-300">
                    <FaRobot className="text-blue-600 text-5xl mb-6 mx-auto" />
                    <h3 className="text-2xl font-semibold mb-4">Умный анализ чатов</h3>
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
              </div>
            </section>
            
            <section id="statistics" className="py-24 bg-blue-600 text-white">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16">Наша статистика</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center">
                    <FaComments className="text-5xl mb-4 mx-auto" />
                    <div className="text-5xl font-bold mb-2">
                      <AnimatedCounter end={1000000} duration={2000} />+
                    </div>
                    <p>Проанализированных чатов</p>
                  </div>
                  <div className="text-center">
                    <FaAd className="text-5xl mb-4 mx-auto" />
                    <div className="text-5xl font-bold mb-2">
                      <AnimatedCounter end={50000} duration={2000} />+
                    </div>
                    <p>Успешных рекламных кампаний</p>
                  </div>
                  <div className="text-center">
                    <FaChartBar className="text-5xl mb-4 mx-auto" />
                    <div className="text-5xl font-bold mb-2">
                      <AnimatedCounter end={98} duration={2000} />%
                    </div>
                    <p>Точность AI-анализа</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="testimonials" className="py-24">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-4xl mb-16">Отзывы рекламодателей</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="mb-4">"TeleScanner помог нам найти идеальные чаты для нашей рекламы, увеличив ROI на 40%!"</p>
                    <p className="font-semibold">- Анна, digital-маркетолог</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="mb-4">"Благодаря AI-анализу мы смогли точно определить наиболее подходящие чаты для нашего продукта."</p>
                    <p className="font-semibold">- Иван, владелец интернет-магазина</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="mb-4">"Автоматизация поиска рекламных площадок в Telegram сэкономила нам огромное количество времени и ресурсов."</p>
                    <p className="font-semibold">- Мария, руководитель отдела рекламы</p>
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
                    answer="По статистке наших клиентов, реклама в чатах, подобранных нашим AI, показывает в среднем на 30% более высокую конверсию по сравнению с обычным размещением."
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
                        onClick={() => setSelectedPlan(plan)}
                      >
                        Выбрать тариф
                      </button>
                    </div>
                  ))}
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

            <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-24 animate-fadeIn">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-8">Революционизируйте вашу рекламу в Telegram с AI-powered TeleScanner</h2>
                <button className="btn btn-secondary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <FaRocket className="inline mr-2" />
                  Начните умный поиск рекламных площадок
                  <FaArrowRight className="inline ml-2" />
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-16 w-full">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">TeleScanner</h3>
            <p className="text-gray-400">Инновационное решение для поиска рекламных площадок в Telegram с использованием AI</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition duration-300">Преимущества</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition duration-300">Как это работает</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition duration-300">Тарифы</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Свяжитесь с нами</h4>
            <p className="text-gray-400">Email: info@telescanner.com</p>
            <p className="text-gray-400">Телефон: +7 (999) 123-45-67</p>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-400">
          © 2023 TeleScanner. Все права защищены.
        </div>
      </footer>
    </div>
  );
}

export default App;
