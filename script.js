const API_KEY = '3b68a0041f64019817b5a6a12fcfc882';
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const KINOBOX_API = 'https://api.kinobox.tv/api/players';
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1888;
const MIN_RATING = 0;
const MAX_RATING = 10;
const RATING_STEP = 0.1;
const PAGE_SIZE = 20;
const CATALOG_PAGE_SIZE = 40;
const TMDB_MAX_FETCH_PAGE = 500;
const LOGICAL_PAGE_FETCH_BATCH_SIZE = 2;
const GOOGLE_CALENDAR_BASE_URL = 'https://calendar.google.com/calendar/render';
const EPISODE_CALENDAR_CONCURRENCY = 4;
const EPISODE_CALENDAR_MAX_ITEMS = 24;
const OPENROUTER_API_KEY = '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';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'openai/gpt-oss-120b:free';
const AI_SEARCH_REASONING_MAX_LINES = 22;
const AI_SEARCH_ROASTS_FILE = 'ai_roasts.txt';
const KSAWER_EASTER_PHRASES_FILE = 'ksawer_phrases.txt';
const KINOWALL_STORAGE_KEY = 'rmpKinoWallProfile';
const KINOWALL_VERSION = 1;
const KINOWALL_SHARE_HASH_PREFIX = 'wall=';
const KSAWER_EASTER_FALLBACK_PHRASES = [
  "Ты умеешь делать обычный день подозрительно красивым.",
  "С тобой даже пауза в переписке звучит как интрига.",
  "У тебя улыбка, которую хочется представить вживую.",
  "Ты появляешься в мыслях слишком аккуратно, но слишком часто.",
  "Кажется, твои сообщения знают короткую дорогу к моему настроению.",
  "Между нами километры, но вайб упрямо сидит рядом.",
  "Ты слишком интересная, чтобы быть просто случайным знакомством.",
  "Твой голос в голове звучит мягче любого саундтрека.",
  "Если бы флирт был искусством, ты бы опасно нарушала технику безопасности.",
  "Ты как хорошая сцена после титров: неожиданно и очень вовремя.",
  "С тобой хочется отвечать не быстро, а красиво.",
  "Ты умеешь быть нежной даже через экран.",
  "В тебе есть то самое тепло, которое не просит разрешения.",
  "Ты слишком милая для моей самодисциплины.",
  "Каждое твоё сообщение выглядит как маленькая победа вечера.",
  "Ты не рядом, но почему-то умеешь быть ближе многих.",
  "С тобой расстояние ведёт себя неприлично плохо.",
  "Ты заставляешь экран казаться не таким холодным.",
  "У тебя есть редкий талант быть и милой, и опасной одновременно.",
  "Твои слова умеют задерживаться дольше, чем положено.",
  "Ты как плейлист, который включаешь и случайно остаёшься до утра.",
  "Мне нравится, как легко с тобой становится чуть теплее.",
  "Ты умеешь делать флирт похожим на красивую игру без правил.",
  "С тобой даже обычное «как дела» звучит подозрительно мило.",
  "Кажется, ты случайно украшаешь всё, к чему прикасаешься словами.",
  "Ты как хороший кадр: вроде простой, а взгляд не отпускает.",
  "С тобой хочется спорить только для того, чтобы дольше разговаривать.",
  "Ты слишком хорошо умеешь быть в голове без приглашения.",
  "В тебе есть магия, которая не кричит, а тихо светится.",
  "Твои сообщения — маленькие искры на чёрном экране.",
  "Ты опасно уютная для человека на расстоянии.",
  "С тобой даже ночь звучит мягче.",
  "Ты как редкая находка, которую не хочется никому показывать.",
  "У тебя вайб человека, ради которого хочется подбирать слова лучше.",
  "Ты умеешь быть причиной улыбки и делать вид, что ничего не произошло.",
  "Если бы расстояние умело ревновать, оно бы уже злилось.",
  "Ты слишком красиво оставляешь след в мыслях.",
  "С тобой флирт не заканчивается точкой, он ставит многоточие.",
  "Ты как тёплый свет из окна, когда вокруг город уже спит.",
  "Мне нравится, что с тобой хочется быть чуть смелее.",
  "Ты делаешь молчание не неловким, а почти кинематографичным.",
  "Твой характер звучит как искра, завёрнутая в нежность.",
  "Ты не похожа на «просто переписку».",
  "С тобой хочется пересматривать даже случайные моменты.",
  "Ты как сообщение, которое перечитывают не потому, что не поняли.",
  "В тебе есть спокойствие, рядом с которым хочется задержаться.",
  "Ты умеешь быть красивой даже между строк.",
  "С тобой любое расстояние выглядит как временная ошибка карты.",
  "Ты слишком настоящая для обычного совпадения.",
  "Кажется, у твоего имени есть собственное тепло.",
  "Ты умеешь улыбаться словами.",
  "С тобой даже ожидание ответа становится частью игры.",
  "Ты как тайный уровень, который случайно оказался лучшим.",
  "В тебе есть что-то, от чего хочется говорить честнее.",
  "Ты слишком хорошо попадаешь в настроение.",
  "С тобой хочется быть не идеальным, а живым.",
  "Ты как мягкий glitch в реальности: странно, красиво, невозможно игнорировать.",
  "Твои фразы иногда звучат так, будто мир специально стал тише.",
  "Ты умеешь оставлять после себя свет, даже если просто написала пару слов.",
  "С тобой флирт выглядит не как игра, а как химия с хорошим вкусом.",
  "Ты очень красиво портишь планы быть спокойным.",
  "Мне нравится эта наша странная, тёплая, опасная дистанция.",
  "Ты как маленькая буря в самом красивом смысле.",
  "Твои сообщения имеют подозрительно высокий уровень урона по скуке.",
  "Ты умеешь быть нежностью с характером.",
  "С тобой хочется не торопить момент, а растянуть его красиво.",
  "Ты как песня, которую не отправляют всем подряд.",
  "В тебе есть редкая смесь мягкости и искры.",
  "Ты делаешь флирт тонким, но очень заметным.",
  "Если бы я выбирал случайный повод улыбнуться, он всё равно был бы про тебя.",
  "Ты слишком хорошо смотришься даже в моих мыслях.",
  "С тобой хочется оставлять недосказанность, потому что она красиво горит.",
  "Ты как красивый секрет, который сложно держать внутри.",
  "Твои сообщения иногда звучат ближе, чем география разрешает.",
  "Ты умеешь быть причиной хорошего настроения без официального заявления.",
  "С тобой даже простые слова получают второе дно.",
  "Ты опасно мило влияешь на мой пульс.",
  "Мне нравится, как между нами всё вроде легко, но совсем не пусто.",
  "Ты как светлая мысль, которая приходит слишком поздно ночью.",
  "С тобой расстояние выглядит не стеной, а сценой.",
  "Ты умеешь делать ожидание сладким, а ответ — ещё слаще.",
  "В тебе есть искра, из-за которой хочется придумывать новые поводы написать.",
  "Ты как кадр из фильма, где всё только начинается.",
  "Твои слова иногда обнимают лучше, чем должны уметь слова.",
  "С тобой хочется быть аккуратно дерзким.",
  "Ты слишком красиво нарушаешь тишину.",
  "В тебе есть такой вайб, что даже экран кажется ближе.",
  "Ты как загадка, которую не хочется решать до конца.",
  "Мне нравится, что рядом с тобой даже мысли начинают улыбаться.",
  "Ты умеешь быть нежной ловушкой.",
  "С тобой разговоры не заканчиваются, они просто прячутся до следующего сообщения.",
  "Ты как рассвет, который решил появиться в переписке.",
  "Твой стиль общения — отдельная причина задержаться.",
  "Ты слишком тонко чувствуешь момент, и это нечестно красиво.",
  "С тобой хочется писать не «привет», а что-то достойнее.",
  "Ты как маленький космос с очень красивой гравитацией.",
  "В тебе есть мягкая наглость, которая мне слишком нравится.",
  "Ты умеешь делать расстояние смешным и почти бесполезным.",
  "С тобой даже обычный экран становится местом встречи.",
  "Ты как хорошая тайна: чем меньше объяснений, тем сильнее притяжение.",
  "Твои сообщения иногда звучат как случайность, которая всё поняла заранее.",
  "Ты очень красиво умеешь быть не рядом.",
  "С тобой хочется выбирать слова так, будто они могут дотронуться.",
  "Ты как тёплый шум города после полуночи.",
  "В тебе есть что-то, что хочется беречь даже на расстоянии.",
  "Ты умеешь быть лёгкой, но оставаться в голове надолго.",
  "С тобой даже маленький флирт выглядит большим событием.",
  "Ты как мягкая провокация, от которой невозможно злиться.",
  "Твои слова умеют подходить ближе, чем я ожидал.",
  "Ты опасно хороша в том, чтобы быть собой.",
  "С тобой хочется случайно задержаться ещё на одно сообщение.",
  "Ты как редкий цвет, который невозможно нормально назвать.",
  "В тебе есть нежность, которая улыбается с хитринкой.",
  "Ты делаешь этот маленький цифровой мир гораздо красивее.",
  "С тобой любое «потом» хочется превратить в «ещё немного сейчас».",
  "Ты как пароль от настроения, который я будто знал заранее.",
  "Твои сообщения умеют тихо включать весну.",
  "Ты слишком красиво существуешь где-то далеко.",
  "С тобой хочется верить, что расстояние просто плохо старается.",
  "Ты как красивое совпадение, которое подозрительно повторяется.",
  "Мне нравится, как ты заставляешь обычные минуты выглядеть важнее.",
  "Ты умеешь быть той самой мыслью, которая возвращается сама."
];
const KSAWER_EASTER_QUERY_PATTERN = /^(ksawer|ксавер)$/i;
const KSAWER_EASTER_INPUT_DEBOUNCE_MS = 420;
const DECISION_PROMPT_DELAY_MS = 180000;
const ROULETTE_RANDOM_PAGE_CAP = 500;
const ROULETTE_FETCH_ROUNDS = 7;
const ROULETTE_VISIBLE_CARDS = 38;
const ROULETTE_WINNER_INDEX = 31;
const AI_SEARCH_DEFAULT_ROASTS = [
  'Запрос уже на столе. Снимаю отпечатки с жанров.',
  'Проверяю, не притворяется ли этот вайб нормальным человеком.',
  'Ищу кино аккуратно: мусор вынесу, мясо оставлю.',
  'Сверяю запах запроса с тем, что TMDb способен пережить.',
  'Каталог нервничает, но продолжает сотрудничать.',
  'Пока всё выглядит как культурное преступление.',
  'Развожу сатиру и бардак по разным мешкам.',
  'Сейчас посмотрим, кто тут реально подходит по вайбу.',
  'Алгоритм кашлянул, но к работе вернулся.',
  'Если найду шедевр, считай это ошибкой судебной системы.'
];
const TMDB_TV_STATUS_CODES = {
  returning: '0',
  planned: '1',
  inProduction: '2',
  ended: '3',
  cancelled: '4',
  pilot: '5'
};

const tvCalendarMetaCache = new Map();
const tvEpisodeScheduleCache = new Map();
const itemDetailsCache = new Map();
const EMPTY_IMAGE_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

let countryLabelIntl = null;
try {
  if (typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function') {
    countryLabelIntl = new Intl.DisplayNames(['ru', 'en'], { type: 'region' });
  }
} catch (error) {
  countryLabelIntl = null;
}


const REGION_DEFINITIONS = [
  { key: 'region-1', label: 'Белая элита', countryCodes: ['US', 'CA', 'AU', 'NZ', 'GB', 'DE', 'FR', 'IT', 'ES', 'PT', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'IE', 'IS', 'GR', 'LU', 'AD', 'MC', 'SM', 'VA'] },
  { key: 'region-2', label: 'Славянский отстой', countryCodes: ['RU', 'UA', 'BY', 'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'RS', 'HR', 'BA', 'ME', 'MK', 'AL', 'SI', 'XK', 'MD', 'LV', 'LT', 'EE'] },
  { key: 'region-3', label: 'Желтая орда', countryCodes: ['CN', 'JP', 'KR', 'KP', 'TW', 'MN', 'VN', 'LA', 'KH', 'TH', 'MM', 'MY', 'SG', 'ID', 'PH', 'BN', 'TL'] },
  { key: 'region-4', label: 'Индийский говносвал', countryCodes: ['IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV', 'AF'] },
  { key: 'region-5', label: 'Среднеазиатские ишаки', countryCodes: ['KZ', 'UZ', 'TM', 'KG', 'TJ'] },
  { key: 'region-6', label: 'Кавказский ножедром', countryCodes: ['GE', 'AM', 'AZ'] },
  { key: 'region-7', label: 'Турецкая кебабная', countryCodes: ['TR', 'CY'] },
  { key: 'region-8', label: 'Арабские нефтесосы', countryCodes: ['SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'YE', 'IQ', 'SY', 'LB', 'JO', 'PS', 'IL', 'IR', 'EG', 'LY', 'TN', 'DZ', 'MA', 'SD', 'MR', 'SO', 'DJ', 'ER'] },
  { key: 'region-9', label: 'Африканский обезьянник', countryCodes: ['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CD', 'CG', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'] },
  { key: 'region-10', label: 'Латинская нарко-жопа', countryCodes: ['MX', 'BR', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY', 'GY', 'SR', 'BZ', 'GT', 'SV', 'HN', 'NI', 'CR', 'PA', 'CU', 'DO', 'HT', 'JM', 'TT', 'BS', 'BB', 'AG', 'KN', 'LC', 'VC', 'GD', 'DM'] },
  { key: 'region-11', label: 'Океанийские каннибалы', countryCodes: ['FJ', 'PG', 'SB', 'VU', 'WS', 'TO', 'KI', 'FM', 'MH', 'NR', 'TV', 'PW', 'CK', 'NU'] }
];

const REGION_TOOLTIP_TEXTS = new Map([
  ['region-1', `США, Канада, Австралия, Новая Зеландия, Великобритания, Германия, Франция, Италия, Испания, Португалия, Нидерланды, Бельгия, Швейцария, Австрия, Швеция, Норвегия, Дания, Финляндия, Ирландия, Исландия, Греция, Люксембург, Андорра, Монако, Сан-Марино, Ватикан`],
  ['region-2', `Россия, Украина, Беларусь, Польша, Чехия, Словакия, Венгрия, Румыния, Болгария, Сербия, Хорватия, Босния и Герцеговина, Черногория, Северная Македония, Албания, Словения, Косово, Молдова, Латвия, Литва, Эстония`],
  ['region-3', `Китай, Япония, Южная Корея, Северная Корея, Тайвань, Монголия, Вьетнам, Лаос, Камбоджа, Таиланд, Мьянма, Малайзия, Сингапур, Индонезия, Филиппины, Бруней, Восточный Тимор`],
  ['region-4', `Индия, Пакистан, Бангладеш, Шри-Ланка, Непал, Бутан, Мальдивы, Афганистан`],
  ['region-5', `Казахстан, Узбекистан, Туркменистан, Кыргызстан, Таджикистан`],
  ['region-6', `Грузия, Армения, Азербайджан`],
  ['region-7', `Турция, Кипр`],
  ['region-8', `Саудовская Аравия, ОАЭ, Катар, Кувейт, Бахрейн, Оман, Йемен, Ирак, Сирия, Ливан, Иордания, Палестина, Израиль, Иран, Египет, Ливия, Тунис, Алжир, Марокко, Судан, Мавритания, Сомали, Джибути, Эритрея`],
  ['region-9', `Нигерия, ЮАР, Кения, Эфиопия, Танзания, Уганда, Гана, Ангола, Мозамбик, Кот-д'Ивуар, Камерун, Конго, Демократическая Республика Конго, Замбия, Зимбабве, Мадагаскар, Сенегал, Мали, Буркина-Фасо, Чад, Нигер, Гвинея, Руанда, Бурунди, Того, Сьерра-Леоне, Либерия, Центральноафриканская Республика, Габон, Экваториальная Гвинея, Кабо-Верде, Коморы, Маврикий, Сейшелы, Южный Судан и все остальные страны Африки`],
  ['region-10', `Мексика, Бразилия, Аргентина, Колумбия, Чили, Перу, Венесуэла, Эквадор, Боливия, Парагвай, Уругвай, Гайана, Суринам и все страны Центральной Америки и Карибского бассейна`],
  ['region-11', `Фиджи, Папуа-Новая Гвинея, Соломоновы Острова, Вануату, Самоа, Тонга, Кирибати, Микронезия, Маршалловы Острова, Науру, Тувалу, Палау и все остальные тихоокеанские государства`]
]);

const GENRE_LABEL_OVERRIDES = new Map([
  [12, 'Приключения'],
  [14, 'Фэнтези'],
  [16, 'Анимация'],
  [18, 'Драма'],
  [27, 'Ужасы'],
  [28, 'Боевик'],
  [35, 'Комедия'],
  [36, 'История'],
  [37, 'Вестерн'],
  [53, 'Триллер'],
  [80, 'Криминал'],
  [99, 'Документальный'],
  [878, 'Фантастика'],
  [9648, 'Детектив'],
  [10402, 'Музыка'],
  [10749, 'Мелодрама'],
  [10751, 'Семейный'],
  [10752, 'Военный'],
  [10759, 'Боевик и приключения'],
  [10762, 'Для детей'],
  [10763, 'Новости'],
  [10764, 'Реалити-шоу'],
  [10765, 'Фантастика и фэнтези'],
  [10766, 'Мыльная опера'],
  [10767, 'Ток-шоу'],
  [10768, 'Война и политика'],
  [10770, 'Телефильм']
]);

const GENRE_LABEL_FALLBACKS = new Map([
  ['action', 'Боевик'],
  ['adventure', 'Приключения'],
  ['animation', 'Анимация'],
  ['comedy', 'Комедия'],
  ['crime', 'Криминал'],
  ['documentary', 'Документальный'],
  ['drama', 'Драма'],
  ['family', 'Семейный'],
  ['fantasy', 'Фэнтези'],
  ['history', 'История'],
  ['horror', 'Ужасы'],
  ['music', 'Музыка'],
  ['mystery', 'Детектив'],
  ['romance', 'Мелодрама'],
  ['science fiction', 'Фантастика'],
  ['sci-fi & fantasy', 'Фантастика и фэнтези'],
  ['tv movie', 'Телефильм'],
  ['thriller', 'Триллер'],
  ['war', 'Военный'],
  ['western', 'Вестерн'],
  ['action & adventure', 'Боевик и приключения'],
  ['kids', 'Для детей'],
  ['news', 'Новости'],
  ['reality', 'Реалити-шоу'],
  ['soap', 'Мыльная опера'],
  ['talk', 'Ток-шоу'],
  ['war & politics', 'Война и политика']
]);

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const aiSearchToggle = document.getElementById('aiSearchToggle');
const aiSearchPanel = document.getElementById('aiSearchPanel');
const aiSearchModeLabel = document.getElementById('aiSearchModeLabel');
const aiSearchSummary = document.getElementById('aiSearchSummary');
const aiSearchPlanChips = document.getElementById('aiSearchPlanChips');
const aiSearchLog = document.getElementById('aiSearchLog');
const aiSearchStatusPill = document.getElementById('aiSearchStatusPill');
const aiSearchClear = document.getElementById('aiSearchClear');
const genreMultiSelect = document.getElementById('genreMultiSelect');
const countryExcludeMultiSelect = document.getElementById('countryExcludeMultiSelect');
const excludeModeToggle = document.getElementById('excludeModeToggle');
const regionConfirmOverlay = document.getElementById('regionConfirmOverlay');
const regionConfirmYes = document.getElementById('regionConfirmYes');
const regionConfirmNo = document.getElementById('regionConfirmNo');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');
const resultsStatus = document.getElementById('resultsStatus');
const paginationBlock = document.getElementById('paginationBlock');
const overlay = document.getElementById('myNav');
const overlayContent = document.getElementById('overlay-content');
const overlayCloseBtn = document.getElementById('overlayCloseBtn');
const scrollBtn = document.getElementById('scrollTopBtn');
const decisionPrompt = document.getElementById('decisionPrompt');
const decisionPromptClose = document.getElementById('decisionPromptClose');
const decisionPromptAccept = document.getElementById('decisionPromptAccept');
const decisionPromptDecline = document.getElementById('decisionPromptDecline');
const movieRouletteOverlay = document.getElementById('movieRouletteOverlay');
const movieRouletteClose = document.getElementById('movieRouletteClose');
const movieRouletteSubtitle = document.getElementById('movieRouletteSubtitle');
const movieRouletteTrack = document.getElementById('movieRouletteTrack');
const movieRouletteResult = document.getElementById('movieRouletteResult');
const movieRouletteLoading = document.getElementById('movieRouletteLoading');
const movieRouletteActions = document.getElementById('movieRouletteActions');
const movieRouletteWatch = document.getElementById('movieRouletteWatch');
const movieRouletteAgain = document.getElementById('movieRouletteAgain');
const themeToggle = document.getElementById('themeToggleCheckbox');
const favoriteToggle = document.getElementById('favoriteToggle');
const typeButtons = document.getElementById('typeButtons');
const applyExtraFiltersBtn = document.getElementById('applyExtraFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const filtersDirtyBadge = document.getElementById('filtersDirtyBadge');
const yearFromInput = document.getElementById('yearFromInput');
const yearToInput = document.getElementById('yearToInput');
const yearFromRange = document.getElementById('yearFromRange');
const yearToRange = document.getElementById('yearToRange');
const yearSliderRange = document.getElementById('yearSliderRange');
const ratingFromInput = document.getElementById('ratingFromInput');
const ratingToInput = document.getElementById('ratingToInput');
const ratingFromRange = document.getElementById('ratingFromRange');
const ratingToRange = document.getElementById('ratingToRange');
const ratingSliderRange = document.getElementById('ratingSliderRange');
const paletteEditorToggle = document.getElementById('paletteEditorToggle');
const paletteEditorOverlay = document.getElementById('paletteEditorOverlay');
const paletteEditorClose = document.getElementById('paletteEditorClose');
const paletteNameInput = document.getElementById('paletteNameInput');
const paletteSavedSelect = document.getElementById('paletteSavedSelect');
const paletteCustomEnabled = document.getElementById('paletteCustomEnabled');
const paletteAutoMode = document.getElementById('paletteAutoMode');
const paletteBaseColor = document.getElementById('paletteBaseColor');
const paletteToneSelect = document.getElementById('paletteToneSelect');
const paletteManualControls = document.getElementById('paletteManualControls');
const paletteSaveBtn = document.getElementById('paletteSaveBtn');
const paletteSaveAsBtn = document.getElementById('paletteSaveAsBtn');
const paletteDeleteBtn = document.getElementById('paletteDeleteBtn');
const paletteDisableBtn = document.getElementById('paletteDisableBtn');
const kinoWallToggle = document.getElementById('kinoWallToggle');
const kinoWallOverlay = document.getElementById('kinoWallOverlay');
const kinoWallClose = document.getElementById('kinoWallClose');
const kinoWallContent = document.getElementById('kinoWallContent');

const PALETTE_STORAGE_KEYS = {
  enabled: 'rmpCustomPaletteEnabled',
  activeId: 'rmpActiveCustomPaletteId',
  palettes: 'rmpCustomPalettes'
};

const PALETTE_COLOR_FIELDS = [
  { key: 'bg-color', label: 'Фон страницы' },
  { key: 'header-bg', label: 'Шапка и боковая панель' },
  { key: 'card-bg', label: 'Карточки и панели' },
  { key: 'input-bg', label: 'Поля ввода и списки' },
  { key: 'text-color', label: 'Основной текст' },
  { key: 'muted-text', label: 'Приглушённый текст', alpha: 0.68 },
  { key: 'button-bg', label: 'Основные кнопки' },
  { key: 'secondary-button-bg', label: 'Акцент и наведение' },
  { key: 'button-text', label: 'Текст на кнопках' },
  { key: 'tag-bg', label: 'Жанры и чипы' },
  { key: 'tag-hover-bg', label: 'Жанры при наведении' },
  { key: 'rating-text-bg', label: 'Фон рейтинга' },
  { key: 'border-color', label: 'Границы элементов', alpha: 0.13 },
  { key: 'shadow-color', label: 'Тени', alpha: 0.22 },
  { key: 'slider-track', label: 'Трек слайдера', alpha: 0.20 },
  { key: 'slider-range', label: 'Активный слайдер' },
  { key: 'calendar-accent', label: 'Календарь: кнопка и акцент' },
  { key: 'calendar-surface', label: 'Календарь: окно', alpha: 0.96 },
  { key: 'calendar-item-bg', label: 'Календарь: карточки серий', alpha: 0.10 },
  { key: 'calendar-add-bg', label: 'Календарь: кнопка Google' },
  { key: 'calendar-add-text', label: 'Календарь: текст кнопки Google' },
  { key: 'scrollbar-track', label: 'Прокрутка: фон дорожки', alpha: 0.14 },
  { key: 'scrollbar-thumb', label: 'Прокрутка: ползунок' },
  { key: 'scrollbar-thumb-hover', label: 'Прокрутка: наведение' },
  { key: 'star-bg', label: 'Фон звёздочки', alpha: 0.16 },
  { key: 'favorite-accent', label: 'Цвет избранного' },
  { key: 'favorite-active-text', label: 'Текст на избранном' },
  { key: 'rating-green', label: 'Рейтинг: зелёный' },
  { key: 'rating-orange', label: 'Рейтинг: оранжевый' },
  { key: 'rating-red', label: 'Рейтинг: красный' },
  { key: 'special-gradient-a', label: 'AI/рулетка: цвет 1' },
  { key: 'special-gradient-b', label: 'AI/рулетка: цвет 2' },
  { key: 'special-gradient-c', label: 'AI/рулетка: цвет 3' },
  { key: 'overlay-bg', label: 'Фон модальных окон', alpha: 0.78 },
  { key: 'overlay-card-bg', label: 'Карточка модального окна', alpha: 0.96 }
];

const PALETTE_CSS_VARIABLE_KEYS = [...new Set([
  ...PALETTE_COLOR_FIELDS.map((field) => field.key),
  'soft-surface',
  'glass-surface'
])];

const paletteEditorState = {
  palettes: [],
  activeId: '',
  enabled: false,
  draft: null,
  initialized: false
};

function createDefaultFilters() {
  return {
    type: 'all',
    yearFrom: MIN_YEAR,
    yearTo: CURRENT_YEAR,
    ratingFrom: MIN_RATING,
    ratingTo: MAX_RATING,
    genres: [],
    excludeMode: 'countries',
    excludedCountries: [],
    excludedRegions: []
  };
}

function cloneFilters(filters) {
  return {
    type: filters.type,
    yearFrom: filters.yearFrom,
    yearTo: filters.yearTo,
    ratingFrom: clampRating(filters.ratingFrom ?? MIN_RATING),
    ratingTo: clampRating(filters.ratingTo ?? MAX_RATING),
    genres: [...(filters.genres || [])].sort(),
    excludeMode: filters.excludeMode === 'regions' ? 'regions' : 'countries',
    excludedCountries: [...(filters.excludedCountries || [])].sort(),
    excludedRegions: [...(filters.excludedRegions || [])].sort()
  };
}

const INITIAL_PLAYER_ROUTE_HASH = isPlayerRouteHash(window.location.hash) || isKinoWallShareHash(window.location.hash);

const state = {
  currentPage: 1,
  totalPages: 1,
  query: '',
  showFavoritesOnly: false,
  catalogLoading: false,
  catalogLoadSeq: 0,
  catalogPageCache: null,
  imageBaseUrl: DEFAULT_IMAGE_BASE_URL,
  imageBackdropBaseUrl: 'https://image.tmdb.org/t/p/original',
  genres: [],
  genresByKey: new Map(),
  countries: [],
  countriesByCode: new Map(),
  regions: [],
  regionsByKey: new Map(),
  appliedFilters: createDefaultFilters(),
  pendingFilters: createDefaultFilters(),
  pendingExcludeModeSwitch: null,
  decisionAssistant: {
    timer: null,
    timerStartedAt: 0,
    disabledByInitialRoute: INITIAL_PLAYER_ROUTE_HASH,
    promptShown: false,
    promptDismissed: false,
    userMadeChoice: false,
    lastWinnerKey: '',
    currentWinner: null,
    spinning: false
  },
  aiSearch: {
    enabled: false,
    prompt: '',
    plan: null,
    lastRawResponse: '',
    lastReasoning: [],
    usedWebSearch: false,
    lastPlanGeneratedAt: 0
  }
};

let activeSlide = 0;
let totalVideos = 0;
let aiSearchAbortController = null;
let aiSearchFallbackTimer = null;
let aiSearchFallbackIndex = 0;
let aiSearchRoastLines = [...AI_SEARCH_DEFAULT_ROASTS];
let aiSearchRoastDeck = [];
let aiSearchLastRoast = '';
let ksawerEasterState = null;
let ksawerEasterInputTimer = null;

init();

window.addEventListener('beforeunload', () => {
  resetCatalogRuntimeState();
});

window.addEventListener('focus', checkDecisionPromptCountdown);
window.addEventListener('pageshow', checkDecisionPromptCountdown);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    checkDecisionPromptCountdown();
  }
});

async function init() {
  initTheme();
  initYearControls();
  initRatingControls();
  bindEvents();
  startDecisionPromptCountdown();
  renderLoading('Подключаемся к TMDB...');

  try {
    await Promise.all([initImageConfig(), loadGenres(), loadCountries(), preloadAiSearchRoasts()]);
    loadRegions();
    syncFilterUiFromPending();
    syncAiSearchUi();
    await loadContent(1);
    await openKinoWallFromHashIfNeeded();
  } catch (error) {
    console.error('[init]', error);
    renderError('Не удалось инициализировать каталог. Попробуй обновить страницу чуть позже.');
    updateResultsStatus('Ошибка инициализации каталога.');
  }
}

function bindEvents() {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nextQuery = search.value.trim();

    if (isKsawerEasterQuery(nextQuery)) {
      search.blur();
      await startKsawerEasterEgg();
      return;
    }

    if (state.aiSearch.enabled && nextQuery !== state.aiSearch.prompt) {
      resetAiSearchPlanState();
    }

    state.query = nextQuery;
    syncAiSearchUi();
    await loadContent(1);
  });

  search.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    if (event.shiftKey && state.aiSearch.enabled) return;
    event.preventDefault();
    form.requestSubmit();
  });

  search.addEventListener('input', () => {
    if (state.aiSearch.enabled) return;
    if (!/\r?\n/.test(search.value)) return;
    const caret = search.selectionStart;
    search.value = search.value.replace(/\s*\r?\n+\s*/g, ' ').replace(/\s{2,}/g, ' ');
    const safeCaret = Math.min(caret, search.value.length);
    search.setSelectionRange(safeCaret, safeCaret);
  });

  search.addEventListener('input', () => {
    if (ksawerEasterInputTimer) {
      window.clearTimeout(ksawerEasterInputTimer);
      ksawerEasterInputTimer = null;
    }
    if (!isKsawerEasterQuery(search.value)) return;
    ksawerEasterInputTimer = window.setTimeout(async () => {
      ksawerEasterInputTimer = null;
      if (!isKsawerEasterQuery(search.value)) return;
      search.blur();
      await startKsawerEasterEgg();
    }, KSAWER_EASTER_INPUT_DEBOUNCE_MS);
  });

  aiSearchToggle.addEventListener('click', () => {
    state.aiSearch.enabled = !state.aiSearch.enabled;
    if (!state.aiSearch.enabled) {
      resetAiSearchPlanState();
    }
    syncAiSearchUi();
  });

  aiSearchClear.addEventListener('click', () => {
    resetAiSearchPlanState();
    state.aiSearch.enabled = false;
    syncAiSearchUi();
  });

  prev.addEventListener('click', async () => {
    if (state.catalogLoading) return;
    if (state.currentPage > 1) {
      scrollToCatalogTopInstant();
      await loadContent(state.currentPage - 1);
    }
  });

  next.addEventListener('click', async () => {
    if (state.catalogLoading) return;
    if (state.currentPage < state.totalPages) {
      scrollToCatalogTopInstant();
      await loadContent(state.currentPage + 1);
    }
  });

  favoriteToggle.addEventListener('click', async () => {
    state.showFavoritesOnly = !state.showFavoritesOnly;
    favoriteToggle.textContent = state.showFavoritesOnly ? 'Показать всё' : 'Показать избранное';
    await loadContent(1);
  });

  typeButtons.addEventListener('click', (event) => {
    const button = event.target.closest('.type-btn');
    if (!button) return;
    state.pendingFilters.type = button.dataset.type;
    markFiltersDirty();
    syncTypeButtons();
  });

  applyExtraFiltersBtn.addEventListener('click', async () => {
    state.appliedFilters = cloneFilters(state.pendingFilters);
    updateFilterApplyState();
    await loadContent(1);
  });

  resetFiltersBtn.addEventListener('click', async () => {
    state.pendingFilters = createDefaultFilters();
    state.appliedFilters = createDefaultFilters();
    syncFilterUiFromPending();
    updateFilterApplyState();
    await loadContent(1);
  });

  excludeModeToggle.addEventListener('click', () => {
    const currentMode = state.pendingFilters.excludeMode === 'regions' ? 'regions' : 'countries';
    const nextMode = currentMode === 'countries' ? 'regions' : 'countries';

    if (nextMode === 'regions') {
      showRegionModeConfirmation(() => {
        applyExcludeModeChange('regions');
      }, () => {
        syncExcludeModeToggleUi();
      });
      return;
    }

    applyExcludeModeChange('countries');
  });

  regionConfirmYes.addEventListener('click', () => {
    const pendingCallback = state.pendingExcludeModeSwitch;
    closeRegionModeConfirmation();
    if (typeof pendingCallback === 'function') {
      pendingCallback();
    }
  });

  regionConfirmNo.addEventListener('click', () => {
    closeRegionModeConfirmation();
    syncExcludeModeToggleUi();
  });

  overlayCloseBtn.addEventListener('click', closeNav);
  window.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeNav();
    }
  });

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  main.addEventListener('pointermove', noteCatalogBrowsingActivity, { passive: true });
  main.addEventListener('wheel', noteCatalogBrowsingActivity, { passive: true });
  main.addEventListener('touchstart', noteCatalogBrowsingActivity, { passive: true });

  decisionPromptClose?.addEventListener('click', dismissDecisionPromptForSession);
  decisionPromptDecline?.addEventListener('click', dismissDecisionPromptForSession);
  decisionPromptAccept?.addEventListener('click', () => {
    hideDecisionPrompt();
    state.decisionAssistant.promptDismissed = true;
    void openMovieRoulette();
  });

  movieRouletteClose?.addEventListener('click', closeMovieRoulette);
  movieRouletteAgain?.addEventListener('click', () => {
    void startRouletteSpin({ reroll: true });
  });
  movieRouletteWatch?.addEventListener('click', () => {
    void watchRouletteWinner();
  });
  movieRouletteOverlay?.addEventListener('click', (event) => {
    if (event.target === movieRouletteOverlay) {
      closeMovieRoulette();
      closePaletteEditor();
    }
  });

  kinoWallToggle?.addEventListener('click', () => {
    void openKinoWall();
  });
  kinoWallClose?.addEventListener('click', closeKinoWall);
  kinoWallOverlay?.addEventListener('click', (event) => {
    if (event.target === kinoWallOverlay) closeKinoWall();
  });

  document.addEventListener('click', async (event) => {
    const calendarToggleButton = event.target.closest('.episode-calendar-btn');
    if (calendarToggleButton) {
      event.preventDefault();
      event.stopPropagation();
      const wrapper = calendarToggleButton.closest('.episode-calendar-wrapper');
      if (!wrapper) return;

      const isPinnedOpen = wrapper.classList.contains('popover-open');
      if (isPinnedOpen) {
        wrapper.classList.remove('popover-open');
        wrapper.classList.add('popover-force-closed');
        scheduleEpisodeCalendarLayerDeactivate(wrapper);
        calendarToggleButton.blur();
        return;
      }

      closeEpisodeCalendarPopovers(wrapper);
      wrapper.classList.remove('popover-force-closed');
      wrapper.classList.add('popover-open');
      setEpisodeCalendarLayerState(wrapper, true);
      positionEpisodeCalendarPopover(wrapper);
      await ensureEpisodeCalendarLoaded(wrapper);
      return;
    }

    const watchButton = event.target.closest('.watch-online');
    if (watchButton) {
      markUserMadeCatalogChoice();
      const id = Number(watchButton.dataset.id);
      const mediaType = watchButton.dataset.mediaType;
      if (!id || !mediaType) return;

      try {
        const payload = await buildPlayerPayloadFromId(id, mediaType);
        window.location.hash = `${mediaType}-${id}`;
        await openKinoBox(payload);
      } catch (error) {
        console.error('[watch-online]', error);
        openPlayerError('Не удалось подготовить плеер. Попробуй ещё раз чуть позже.');
      }
      return;
    }

    const wallButton = event.target.closest('.kinowall-card-btn');
    if (wallButton) {
      event.preventDefault();
      event.stopPropagation();
      const id = Number(wallButton.dataset.id);
      const mediaType = wallButton.dataset.mediaType;
      if (!id || !mediaType) return;
      toggleKinoWallShowcase({ id, mediaType });
      wallButton.classList.toggle('wall-active', isInKinoWallShowcase(id, mediaType));
      wallButton.title = isInKinoWallShowcase(id, mediaType) ? 'Убрать с киностены' : 'Добавить на киностену';
      return;
    }

    const infoButton = event.target.closest('.know-more');
    if (infoButton) {
      const id = Number(infoButton.dataset.id);
      const mediaType = infoButton.dataset.mediaType;
      if (!id || !mediaType) return;
      const item = {
        id,
        mediaType,
        title: infoButton.dataset.title || '',
        originalTitle: infoButton.dataset.originalTitle || '',
        overview: infoButton.dataset.overview || '',
        releaseDate: infoButton.dataset.releaseDate || ''
      };
      openNav(item);
      return;
    }

    const favoriteButton = event.target.closest('.fav-btn');
    if (favoriteButton) {
      const id = Number(favoriteButton.dataset.id);
      const mediaType = favoriteButton.dataset.mediaType;
      if (!id || !mediaType) return;
      toggleFavorite({ id, mediaType });
      favoriteButton.classList.toggle('fav-active', isFavorite(id, mediaType));
      favoriteButton.style.backgroundColor = '';
      favoriteButton.style.color = '';

      if (state.showFavoritesOnly) {
        await loadContent(1);
      }
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.episode-calendar-wrapper')) {
      closeEpisodeCalendarPopovers();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.episode-calendar-wrapper')) {
      closeEpisodeCalendarPopovers();
    }

    if (!event.target.closest('.multi-select')) {
      closeAllMultiSelects();
    }
  });

  regionConfirmOverlay.addEventListener('click', (event) => {
    if (event.target === regionConfirmOverlay) {
      closeRegionModeConfirmation();
      syncExcludeModeToggleUi();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllMultiSelects();
      closeRegionModeConfirmation();
      closeMovieRoulette();
      closeKinoWall();
    }
  });

  document.addEventListener('mouseleave', (event) => {
    const wrapper = event.target?.closest?.('.episode-calendar-wrapper');
    if (wrapper) {
      wrapper.classList.remove('popover-force-closed');
    }
  }, true);

  document.addEventListener('mouseover', (event) => {
    const wrapper = event.target.closest('.episode-calendar-wrapper');
    if (wrapper) {
      setEpisodeCalendarLayerState(wrapper, true);
      positionEpisodeCalendarPopover(wrapper);
      void ensureEpisodeCalendarLoaded(wrapper);
    }
  });

  document.addEventListener('mouseout', (event) => {
    const wrapper = event.target?.closest?.('.episode-calendar-wrapper');
    if (wrapper) {
      scheduleEpisodeCalendarLayerDeactivate(wrapper);
    }
  }, true);

  document.addEventListener('focusin', (event) => {
    const wrapper = event.target.closest('.episode-calendar-wrapper');
    if (wrapper) {
      setEpisodeCalendarLayerState(wrapper, true);
      positionEpisodeCalendarPopover(wrapper);
      void ensureEpisodeCalendarLoaded(wrapper);
    }
  });

  document.addEventListener('focusout', (event) => {
    const wrapper = event.target?.closest?.('.episode-calendar-wrapper');
    if (wrapper) {
      scheduleEpisodeCalendarLayerDeactivate(wrapper);
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeEpisodeCalendarPopovers();
    }
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.episode-calendar-wrapper.popover-open, .episode-calendar-wrapper:hover').forEach((wrapper) => {
      positionEpisodeCalendarPopover(wrapper);
    });
  });

  window.addEventListener('scroll', () => {
    document.querySelectorAll('.episode-calendar-wrapper.popover-open, .episode-calendar-wrapper:hover').forEach((wrapper) => {
      positionEpisodeCalendarPopover(wrapper);
    });
  }, { passive: true });

  window.addEventListener('hashchange', async () => {
    const rawHash = window.location.hash.substring(1);
    if (!rawHash) return;
    if (isKinoWallShareHash(rawHash)) {
      await openKinoWallFromHashIfNeeded();
      return;
    }
    if (!isPlayerRouteHash(rawHash)) return;
    markUserMadeCatalogChoice();
    try {
      const payload = await buildPlayerPayloadFromHash(rawHash);
      await openKinoBox(payload);
    } catch (error) {
      console.error('[hashchange]', error);
    }
  });
}

function initTheme() {
  const htmlEl = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'dark';
  htmlEl.setAttribute('data-theme', currentTheme);
  if (themeToggle) {
    themeToggle.checked = currentTheme === 'dark';
    themeToggle.addEventListener('change', () => {
      const nextTheme = themeToggle.checked ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      if (!paletteEditorState.enabled) {
        clearCustomPaletteStyle();
      }
    });
  }

  initPaletteEditor();
}

function initPaletteEditor() {
  if (paletteEditorState.initialized || !paletteEditorToggle || !paletteEditorOverlay) return;
  paletteEditorState.initialized = true;
  paletteEditorState.palettes = readStoredPalettes();
  paletteEditorState.activeId = localStorage.getItem(PALETTE_STORAGE_KEYS.activeId) || '';
  paletteEditorState.enabled = localStorage.getItem(PALETTE_STORAGE_KEYS.enabled) === 'true';

  const activePalette = getActiveStoredPalette();
  if (paletteEditorState.enabled && activePalette) {
    paletteEditorState.draft = clonePalette(activePalette);
    applyCustomPalette(activePalette);
  } else {
    paletteEditorState.enabled = false;
    localStorage.setItem(PALETTE_STORAGE_KEYS.enabled, 'false');
    paletteEditorState.draft = createDefaultPaletteDraft();
    clearCustomPaletteStyle();
  }

  renderPaletteManualControls();
  syncPaletteEditorUi();
  updatePaletteToggleState();
  syncThemeSwitchVisibility();

  paletteEditorToggle.addEventListener('click', openPaletteEditor);
  paletteEditorClose?.addEventListener('click', closePaletteEditor);
  paletteEditorOverlay.addEventListener('click', (event) => {
    if (event.target === paletteEditorOverlay) closePaletteEditor();
  });

  paletteSavedSelect?.addEventListener('change', () => {
    const selectedId = paletteSavedSelect.value;
    const selectedPalette = paletteEditorState.palettes.find((palette) => palette.id === selectedId);
    if (!selectedPalette) return;
    paletteEditorState.draft = clonePalette(selectedPalette);
    paletteEditorState.activeId = selectedPalette.id;
    localStorage.setItem(PALETTE_STORAGE_KEYS.activeId, selectedPalette.id);
    if (paletteEditorState.enabled) applyCustomPalette(paletteEditorState.draft);
    syncPaletteEditorUi();
  });

  paletteNameInput?.addEventListener('input', () => {
    ensurePaletteDraft();
    paletteEditorState.draft.name = sanitizePaletteName(paletteNameInput.value);
  });

  paletteCustomEnabled?.addEventListener('change', () => {
    setCustomPaletteEnabled(Boolean(paletteCustomEnabled.checked));
  });

  paletteAutoMode?.addEventListener('change', () => {
    ensurePaletteDraft();
    paletteEditorState.draft.auto = Boolean(paletteAutoMode.checked);
    if (paletteEditorState.draft.auto) {
      paletteEditorState.draft.colors = generateAutoPaletteColors(paletteEditorState.draft.baseColor, paletteEditorState.draft.tone);
    }
    enableCustomPaletteForPreview();
    liveApplyDraftPalette();
    syncPaletteEditorUi();
  });

  paletteBaseColor?.addEventListener('input', () => {
    ensurePaletteDraft();
    paletteEditorState.draft.baseColor = normalizeHexColor(paletteBaseColor.value, '#5f9cff');
    if (paletteEditorState.draft.auto) {
      paletteEditorState.draft.colors = generateAutoPaletteColors(paletteEditorState.draft.baseColor, paletteEditorState.draft.tone);
    }
    enableCustomPaletteForPreview();
    liveApplyDraftPalette();
    syncPaletteEditorUi({ preserveFocus: true });
  });

  paletteToneSelect?.addEventListener('change', () => {
    ensurePaletteDraft();
    paletteEditorState.draft.tone = paletteToneSelect.value === 'light' ? 'light' : 'dark';
    if (paletteEditorState.draft.auto) {
      paletteEditorState.draft.colors = generateAutoPaletteColors(paletteEditorState.draft.baseColor, paletteEditorState.draft.tone);
    }
    enableCustomPaletteForPreview();
    liveApplyDraftPalette();
    syncPaletteEditorUi();
  });

  paletteManualControls?.addEventListener('input', (event) => {
    const input = event.target.closest('input[type="color"][data-palette-key]');
    if (!input) return;
    ensurePaletteDraft();
    paletteEditorState.draft.auto = false;
    paletteEditorState.draft.colors[input.dataset.paletteKey] = normalizeHexColor(input.value, '#5f9cff');
    enableCustomPaletteForPreview();
    liveApplyDraftPalette();
    syncPaletteEditorUi({ preserveFocus: true });
  });

  paletteSaveBtn?.addEventListener('click', () => saveDraftPalette(false));
  paletteSaveAsBtn?.addEventListener('click', () => saveDraftPalette(true));
  paletteDeleteBtn?.addEventListener('click', deleteSelectedPalette);
  paletteDisableBtn?.addEventListener('click', () => setCustomPaletteEnabled(false));
}

function openPaletteEditor() {
  ensurePaletteDraft();
  syncPaletteEditorUi();
  paletteEditorOverlay.classList.remove('hidden');
  paletteEditorOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('palette-editor-open');
}

function closePaletteEditor() {
  paletteEditorOverlay?.classList.add('hidden');
  paletteEditorOverlay?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('palette-editor-open');
}

function updatePaletteToggleState() {
  paletteEditorToggle?.classList.toggle('active', paletteEditorState.enabled);
  paletteEditorToggle?.setAttribute('aria-pressed', paletteEditorState.enabled ? 'true' : 'false');
}

function setCustomPaletteEnabled(enabled) {
  paletteEditorState.enabled = enabled;
  localStorage.setItem(PALETTE_STORAGE_KEYS.enabled, enabled ? 'true' : 'false');
  if (enabled) {
    ensurePaletteDraft();
    if (!paletteEditorState.draft.id) {
      paletteEditorState.draft.id = createPaletteId();
    }
    paletteEditorState.activeId = paletteEditorState.draft.id;
    localStorage.setItem(PALETTE_STORAGE_KEYS.activeId, paletteEditorState.activeId);
    applyCustomPalette(paletteEditorState.draft);
  } else {
    clearCustomPaletteStyle();
  }
  syncPaletteEditorUi();
  updatePaletteToggleState();
}

function enableCustomPaletteForPreview() {
  ensurePaletteDraft();
  if (paletteEditorState.enabled) return;
  paletteEditorState.enabled = true;
  paletteEditorState.activeId = paletteEditorState.draft.id;
  localStorage.setItem(PALETTE_STORAGE_KEYS.enabled, 'true');
  localStorage.setItem(PALETTE_STORAGE_KEYS.activeId, paletteEditorState.activeId);
  updatePaletteToggleState();
}

function liveApplyDraftPalette() {
  ensurePaletteDraft();
  if (paletteEditorState.enabled) {
    applyCustomPalette(paletteEditorState.draft);
  }
}

function saveDraftPalette(forceNew) {
  ensurePaletteDraft();
  const draft = clonePalette(paletteEditorState.draft);
  draft.name = sanitizePaletteName(paletteNameInput?.value || draft.name) || 'Моя палитра';
  if (draft.auto) {
    draft.colors = generateAutoPaletteColors(draft.baseColor, draft.tone);
  }

  if (forceNew || !paletteEditorState.palettes.some((palette) => palette.id === draft.id)) {
    draft.id = createPaletteId();
    draft.name = makeUniquePaletteName(draft.name, paletteEditorState.palettes);
    paletteEditorState.palettes.push(draft);
  } else {
    paletteEditorState.palettes = paletteEditorState.palettes.map((palette) => palette.id === draft.id ? draft : palette);
  }

  paletteEditorState.draft = clonePalette(draft);
  paletteEditorState.activeId = draft.id;
  paletteEditorState.enabled = true;
  writeStoredPalettes(paletteEditorState.palettes);
  localStorage.setItem(PALETTE_STORAGE_KEYS.activeId, draft.id);
  localStorage.setItem(PALETTE_STORAGE_KEYS.enabled, 'true');
  applyCustomPalette(draft);
  syncPaletteEditorUi();
  updatePaletteToggleState();
}

function deleteSelectedPalette() {
  ensurePaletteDraft();
  const id = paletteEditorState.draft.id;
  const beforeCount = paletteEditorState.palettes.length;
  paletteEditorState.palettes = paletteEditorState.palettes.filter((palette) => palette.id !== id);
  if (paletteEditorState.palettes.length === beforeCount) return;

  writeStoredPalettes(paletteEditorState.palettes);
  const nextPalette = paletteEditorState.palettes[0] || createDefaultPaletteDraft();
  paletteEditorState.draft = clonePalette(nextPalette);
  paletteEditorState.activeId = paletteEditorState.palettes[0]?.id || '';
  localStorage.setItem(PALETTE_STORAGE_KEYS.activeId, paletteEditorState.activeId);

  if (paletteEditorState.enabled && paletteEditorState.activeId) {
    applyCustomPalette(paletteEditorState.draft);
  } else {
    setCustomPaletteEnabled(false);
  }
  syncPaletteEditorUi();
  updatePaletteToggleState();
}

function renderPaletteManualControls() {
  if (!paletteManualControls) return;
  paletteManualControls.innerHTML = PALETTE_COLOR_FIELDS.map((field) => `
    <label class="palette-color-control">
      <input type="color" data-palette-key="${field.key}" value="#5f9cff" />
      <span>
        <span class="palette-color-control-title">${escapeHtml(field.label)}</span>
        <span class="palette-color-control-var">--${escapeHtml(field.key)}</span>
      </span>
    </label>
  `).join('');
}

function syncPaletteEditorUi(options = {}) {
  ensurePaletteDraft();
  const draft = paletteEditorState.draft;

  if (!options.preserveFocus && paletteNameInput) paletteNameInput.value = draft.name || 'Моя палитра';
  if (paletteCustomEnabled) paletteCustomEnabled.checked = paletteEditorState.enabled;
  if (paletteAutoMode) paletteAutoMode.checked = Boolean(draft.auto);
  if (!options.preserveFocus && paletteBaseColor) paletteBaseColor.value = normalizeHexColor(draft.baseColor, '#5f9cff');
  if (paletteToneSelect) paletteToneSelect.value = draft.tone === 'light' ? 'light' : 'dark';

  renderPaletteSavedOptions();

  const colors = draft.auto
    ? generateAutoPaletteColors(draft.baseColor, draft.tone)
    : normalizePaletteColors(draft.colors, draft.baseColor, draft.tone);

  paletteManualControls?.querySelectorAll('input[type="color"][data-palette-key]').forEach((input) => {
    const key = input.dataset.paletteKey;
    if (!options.preserveFocus || document.activeElement !== input) {
      input.value = normalizeHexColor(colors[key], '#5f9cff');
    }
    input.disabled = Boolean(draft.auto);
  });

  paletteEditorOverlay?.classList.toggle('palette-auto-active', Boolean(draft.auto));
}

function renderPaletteSavedOptions() {
  if (!paletteSavedSelect) return;
  const currentId = paletteEditorState.draft?.id || '';
  if (!paletteEditorState.palettes.length) {
    paletteSavedSelect.innerHTML = '<option value="">Нет сохранённых палитр</option>';
    paletteSavedSelect.value = '';
    return;
  }
  paletteSavedSelect.innerHTML = paletteEditorState.palettes.map((palette) => {
    const selected = palette.id === currentId ? ' selected' : '';
    return `<option value="${escapeHtml(palette.id)}"${selected}>${escapeHtml(palette.name || 'Без названия')}</option>`;
  }).join('');
  if (paletteEditorState.palettes.some((palette) => palette.id === currentId)) {
    paletteSavedSelect.value = currentId;
  }
}

function ensurePaletteDraft() {
  if (paletteEditorState.draft) return;
  const active = getActiveStoredPalette();
  paletteEditorState.draft = active ? clonePalette(active) : createDefaultPaletteDraft();
}

function getActiveStoredPalette() {
  return paletteEditorState.palettes.find((palette) => palette.id === paletteEditorState.activeId) || null;
}

function createDefaultPaletteDraft() {
  const tone = themeToggle?.checked ? 'dark' : (localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  const baseColor = tone === 'dark' ? '#5f9cff' : '#4f8fd4';
  return {
    id: createPaletteId(),
    name: 'Моя палитра',
    auto: true,
    tone,
    baseColor,
    colors: generateAutoPaletteColors(baseColor, tone)
  };
}

function clonePalette(palette) {
  const safe = palette || createDefaultPaletteDraft();
  return {
    id: String(safe.id || createPaletteId()),
    name: sanitizePaletteName(safe.name || 'Моя палитра'),
    auto: safe.auto !== false,
    tone: safe.tone === 'light' ? 'light' : 'dark',
    baseColor: normalizeHexColor(safe.baseColor, '#5f9cff'),
    colors: normalizePaletteColors(safe.colors || {}, safe.baseColor || '#5f9cff', safe.tone === 'light' ? 'light' : 'dark')
  };
}

function readStoredPalettes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PALETTE_STORAGE_KEYS.palettes) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, 40).map(clonePalette);
  } catch (error) {
    console.warn('[palette] failed to read palettes', error);
    return [];
  }
}

function writeStoredPalettes(palettes) {
  localStorage.setItem(PALETTE_STORAGE_KEYS.palettes, JSON.stringify(palettes.map(clonePalette)));
}

function applyCustomPalette(palette) {
  const safe = clonePalette(palette);
  const colors = safe.auto ? generateAutoPaletteColors(safe.baseColor, safe.tone) : normalizePaletteColors(safe.colors, safe.baseColor, safe.tone);
  const vars = buildCssVarsFromPaletteColors(colors);
  const rootStyle = document.documentElement.style;
  Object.entries(vars).forEach(([key, value]) => {
    rootStyle.setProperty(`--${key}`, value);
  });
  document.documentElement.setAttribute('data-custom-theme', 'true');
  syncThemeSwitchVisibility();
}

function clearCustomPaletteStyle() {
  const rootStyle = document.documentElement.style;
  PALETTE_CSS_VARIABLE_KEYS.forEach((key) => rootStyle.removeProperty(`--${key}`));
  document.documentElement.removeAttribute('data-custom-theme');
  syncThemeSwitchVisibility();
}

function syncThemeSwitchVisibility() {
  const switchEl = themeToggle?.closest?.('.theme-switch');
  if (!switchEl) return;
  const hidden = document.documentElement.getAttribute('data-custom-theme') === 'true';
  switchEl.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  switchEl.tabIndex = hidden ? -1 : 0;
}

function buildCssVarsFromPaletteColors(colors) {
  const normalized = normalizePaletteColors(colors, colors['button-bg'] || '#5f9cff', 'dark');
  const vars = {};
  PALETTE_COLOR_FIELDS.forEach((field) => {
    const hex = normalizeHexColor(normalized[field.key], '#5f9cff');
    vars[field.key] = typeof field.alpha === 'number' ? hexToRgba(hex, field.alpha) : hex;
  });
  vars['soft-surface'] = hexToRgba(normalized['card-bg'], normalized['bg-color'] && isLightHex(normalized['bg-color']) ? 0.66 : 0.06);
  vars['glass-surface'] = hexToRgba(normalized['card-bg'], normalized['bg-color'] && isLightHex(normalized['bg-color']) ? 0.76 : 0.72);
  return vars;
}

function normalizePaletteColors(colors = {}, baseColor = '#5f9cff', tone = 'dark') {
  const generated = generateAutoPaletteColors(baseColor, tone);
  const normalized = { ...generated };
  PALETTE_COLOR_FIELDS.forEach((field) => {
    normalized[field.key] = normalizeHexColor(colors[field.key], generated[field.key] || '#5f9cff');
  });
  return normalized;
}

function generateAutoPaletteColors(baseColor = '#5f9cff', tone = 'dark') {
  const base = hexToHsl(normalizeHexColor(baseColor, '#5f9cff'));
  const s = clampNumber(base.s, 42, 88);
  const vivid = clampNumber(Math.max(s, 56), 56, 88);
  const accentLightness = tone === 'light' ? 48 : 63;
  const secondaryHue = wrapHue(base.h + 42);
  const triadHue = wrapHue(base.h + 290);
  const warmHue = wrapHue(base.h + 32);
  const coolHue = wrapHue(base.h + 205);

  if (tone === 'light') {
    const bg = hslToHex(base.h, clampNumber(s * 0.34, 14, 30), 96);
    const header = hslToHex(base.h, clampNumber(s * 0.36, 16, 32), 93);
    const card = hslToHex(base.h, clampNumber(s * 0.16, 8, 20), 100);
    const input = hslToHex(base.h, clampNumber(s * 0.16, 8, 20), 100);
    const accent = hslToHex(base.h, vivid, accentLightness);
    const secondary = hslToHex(secondaryHue, clampNumber(vivid * 0.92, 52, 84), 55);
    return {
      'bg-color': bg,
      'header-bg': header,
      'card-bg': card,
      'input-bg': input,
      'text-color': hslToHex(base.h, 28, 16),
      'muted-text': hslToHex(base.h, 18, 34),
      'button-bg': accent,
      'secondary-button-bg': secondary,
      'button-text': pickReadableText(accent),
      'tag-bg': hslToHex(base.h, clampNumber(s * 0.42, 18, 36), 88),
      'tag-hover-bg': hslToHex(secondaryHue, clampNumber(s * 0.38, 18, 36), 84),
      'rating-text-bg': hslToHex(base.h, 18, 92),
      'border-color': hslToHex(base.h, 18, 50),
      'shadow-color': '#121a2a',
      'slider-track': hslToHex(base.h, 12, 70),
      'slider-range': accent,
      'calendar-accent': hslToHex(coolHue, clampNumber(vivid * 0.85, 50, 82), 47),
      'calendar-surface': hslToHex(base.h, 24, 12),
      'calendar-item-bg': hslToHex(coolHue, 28, 24),
      'calendar-add-bg': hslToHex(coolHue, 28, 96),
      'calendar-add-text': hslToHex(coolHue, 36, 14),
      'scrollbar-track': hslToHex(base.h, 16, 86),
      'scrollbar-thumb': hslToHex(base.h, clampNumber(vivid * 0.62, 38, 70), 64),
      'scrollbar-thumb-hover': accent,
      'star-bg': '#111827',
      'favorite-accent': '#f6c90e',
      'favorite-active-text': '#1b1b1b',
      'rating-green': '#248a4b',
      'rating-orange': hslToHex(warmHue, 70, 43),
      'rating-red': '#c63d3d',
      'special-gradient-a': accent,
      'special-gradient-b': secondary,
      'special-gradient-c': hslToHex(triadHue, clampNumber(vivid * 0.9, 54, 84), 58),
      'overlay-bg': '#0c0f17',
      'overlay-card-bg': hslToHex(base.h, 24, 12)
    };
  }

  const accent = hslToHex(base.h, vivid, accentLightness);
  const secondary = hslToHex(secondaryHue, clampNumber(vivid * 0.94, 54, 86), 62);
  return {
    'bg-color': hslToHex(base.h, clampNumber(s * 0.30, 14, 28), 7),
    'header-bg': hslToHex(base.h, clampNumber(s * 0.26, 12, 26), 12),
    'card-bg': hslToHex(base.h, clampNumber(s * 0.22, 10, 24), 15),
    'input-bg': hslToHex(base.h, clampNumber(s * 0.24, 10, 24), 10),
    'text-color': hslToHex(base.h, 32, 94),
    'muted-text': hslToHex(base.h, 18, 78),
    'button-bg': accent,
    'secondary-button-bg': secondary,
    'button-text': pickReadableText(accent),
    'tag-bg': hslToHex(base.h, clampNumber(s * 0.48, 20, 44), 24),
    'tag-hover-bg': hslToHex(secondaryHue, clampNumber(s * 0.48, 20, 44), 29),
    'rating-text-bg': hslToHex(base.h, 18, 21),
    'border-color': hslToHex(base.h, 18, 70),
    'shadow-color': '#000000',
    'slider-track': hslToHex(base.h, 12, 72),
    'slider-range': accent,
    'calendar-accent': hslToHex(coolHue, clampNumber(vivid * 0.82, 50, 82), 58),
    'calendar-surface': hslToHex(base.h, 24, 10),
    'calendar-item-bg': hslToHex(coolHue, 26, 20),
    'calendar-add-bg': hslToHex(coolHue, 24, 94),
    'calendar-add-text': hslToHex(coolHue, 34, 12),
    'scrollbar-track': hslToHex(base.h, 16, 22),
    'scrollbar-thumb': hslToHex(base.h, clampNumber(vivid * 0.60, 36, 72), 52),
    'scrollbar-thumb-hover': accent,
    'star-bg': '#ffffff',
    'favorite-accent': '#f6c90e',
    'favorite-active-text': '#1b1b1b',
    'rating-green': '#80d69a',
    'rating-orange': hslToHex(warmHue, 80, 68),
    'rating-red': '#ff8c8c',
    'special-gradient-a': accent,
    'special-gradient-b': secondary,
    'special-gradient-c': hslToHex(triadHue, clampNumber(vivid * 0.88, 54, 86), 66),
    'overlay-bg': '#000000',
    'overlay-card-bg': hslToHex(base.h, 24, 10)
  };
}

function makeUniquePaletteName(name, palettes) {
  const cleanName = sanitizePaletteName(name) || 'Моя палитра';
  const names = new Set(palettes.map((palette) => (palette.name || '').trim().toLowerCase()));
  if (!names.has(cleanName.toLowerCase())) return cleanName;
  let index = 2;
  while (names.has(`${cleanName} ${index}`.toLowerCase())) index += 1;
  return `${cleanName} ${index}`;
}

function sanitizePaletteName(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 40);
}

function createPaletteId() {
  return `palette-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeHexColor(value, fallback = '#5f9cff') {
  const raw = String(value || '').trim();
  if (/^#[0-9a-f]{6}$/i.test(raw)) return raw.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(raw)) {
    return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`.toLowerCase();
  }
  const rgbMatch = raw.match(/^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})/i);
  if (rgbMatch) {
    return rgbToHex(Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3]));
  }
  const hslMatch = raw.match(/^hsl\(([-\d.]+),\s*([-\d.]+)%?,\s*([-\d.]+)%?/i);
  if (hslMatch) {
    return hslToHex(Number(hslMatch[1]), Number(hslMatch[2]), Number(hslMatch[3]));
  }
  return /^#[0-9a-f]{6}$/i.test(fallback) ? fallback.toLowerCase() : '#5f9cff';
}

function hexToRgb(hex) {
  const safe = normalizeHexColor(hex, '#5f9cff').slice(1);
  return {
    r: parseInt(safe.slice(0, 2), 16),
    g: parseInt(safe.slice(2, 4), 16),
    b: parseInt(safe.slice(4, 6), 16)
  };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => clampNumber(Math.round(value), 0, 255).toString(16).padStart(2, '0')).join('')}`;
}

function hexToRgba(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clampNumber(alpha, 0, 1)})`;
}

function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0));
        break;
      case gn:
        h = ((bn - rn) / d + 2);
        break;
      default:
        h = ((rn - gn) / d + 4);
        break;
    }
    h *= 60;
  }
  return { h: wrapHue(h), s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  const hue = wrapHue(h) / 360;
  const sat = clampNumber(s, 0, 100) / 100;
  const light = clampNumber(l, 0, 100) / 100;
  if (sat === 0) {
    const value = Math.round(light * 255);
    return rgbToHex(value, value, value);
  }
  const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
  const p = 2 * light - q;
  const toRgb = (tValue) => {
    let t = tValue;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return rgbToHex(toRgb(hue + 1 / 3) * 255, toRgb(hue) * 255, toRgb(hue - 1 / 3) * 255);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const values = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function pickReadableText(backgroundHex) {
  return relativeLuminance(backgroundHex) > 0.52 ? '#111111' : '#ffffff';
}

function isLightHex(hex) {
  return relativeLuminance(hex) > 0.55;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function wrapHue(value) {
  return ((Number(value) % 360) + 360) % 360;
}

function initYearControls() {
  [yearFromInput, yearToInput, yearFromRange, yearToRange].forEach((input) => {
    input.min = String(MIN_YEAR);
    input.max = String(CURRENT_YEAR);
  });

  yearFromInput.value = String(state.pendingFilters.yearFrom);
  yearToInput.value = String(state.pendingFilters.yearTo);
  yearFromRange.value = String(state.pendingFilters.yearFrom);
  yearToRange.value = String(state.pendingFilters.yearTo);

  yearFromRange.addEventListener('input', () => {
    const nextValue = clampYear(Number(yearFromRange.value));
    state.pendingFilters.yearFrom = Math.min(nextValue, state.pendingFilters.yearTo);
    if (state.pendingFilters.yearFrom > state.pendingFilters.yearTo) {
      state.pendingFilters.yearTo = state.pendingFilters.yearFrom;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  yearToRange.addEventListener('input', () => {
    const nextValue = clampYear(Number(yearToRange.value));
    state.pendingFilters.yearTo = Math.max(nextValue, state.pendingFilters.yearFrom);
    if (state.pendingFilters.yearTo < state.pendingFilters.yearFrom) {
      state.pendingFilters.yearFrom = state.pendingFilters.yearTo;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  yearFromInput.addEventListener('input', () => {
    const nextValue = clampYear(Number(yearFromInput.value || MIN_YEAR));
    state.pendingFilters.yearFrom = nextValue;
    if (state.pendingFilters.yearFrom > state.pendingFilters.yearTo) {
      state.pendingFilters.yearTo = state.pendingFilters.yearFrom;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  yearToInput.addEventListener('input', () => {
    const nextValue = clampYear(Number(yearToInput.value || CURRENT_YEAR));
    state.pendingFilters.yearTo = nextValue;
    if (state.pendingFilters.yearTo < state.pendingFilters.yearFrom) {
      state.pendingFilters.yearFrom = state.pendingFilters.yearTo;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });
}

function initRatingControls() {
  [ratingFromInput, ratingToInput, ratingFromRange, ratingToRange].forEach((input) => {
    input.min = String(MIN_RATING);
    input.max = String(MAX_RATING);
    input.step = String(RATING_STEP);
  });

  ratingFromInput.value = formatRatingControlValue(state.pendingFilters.ratingFrom);
  ratingToInput.value = formatRatingControlValue(state.pendingFilters.ratingTo);
  ratingFromRange.value = formatRatingControlValue(state.pendingFilters.ratingFrom);
  ratingToRange.value = formatRatingControlValue(state.pendingFilters.ratingTo);

  ratingFromRange.addEventListener('input', () => {
    const nextValue = clampRating(Number(ratingFromRange.value));
    state.pendingFilters.ratingFrom = Math.min(nextValue, state.pendingFilters.ratingTo);
    if (state.pendingFilters.ratingFrom > state.pendingFilters.ratingTo) {
      state.pendingFilters.ratingTo = state.pendingFilters.ratingFrom;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  ratingToRange.addEventListener('input', () => {
    const nextValue = clampRating(Number(ratingToRange.value));
    state.pendingFilters.ratingTo = Math.max(nextValue, state.pendingFilters.ratingFrom);
    if (state.pendingFilters.ratingTo < state.pendingFilters.ratingFrom) {
      state.pendingFilters.ratingFrom = state.pendingFilters.ratingTo;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  ratingFromInput.addEventListener('input', () => {
    const nextValue = clampRating(Number(String(ratingFromInput.value).replace(',', '.') || MIN_RATING));
    state.pendingFilters.ratingFrom = nextValue;
    if (state.pendingFilters.ratingFrom > state.pendingFilters.ratingTo) {
      state.pendingFilters.ratingTo = state.pendingFilters.ratingFrom;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  ratingToInput.addEventListener('input', () => {
    const nextValue = clampRating(Number(String(ratingToInput.value).replace(',', '.') || MAX_RATING));
    state.pendingFilters.ratingTo = nextValue;
    if (state.pendingFilters.ratingTo < state.pendingFilters.ratingFrom) {
      state.pendingFilters.ratingFrom = state.pendingFilters.ratingTo;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });
}

function syncFilterUiFromPending() {
  syncTypeButtons();
  syncExcludeModeToggleUi();
  renderGenreTags();
  renderCountryMultiSelect();

  yearFromInput.value = String(state.pendingFilters.yearFrom);
  yearToInput.value = String(state.pendingFilters.yearTo);
  yearFromRange.value = String(state.pendingFilters.yearFrom);
  yearToRange.value = String(state.pendingFilters.yearTo);

  const range = CURRENT_YEAR - MIN_YEAR;
  const fromPercent = ((state.pendingFilters.yearFrom - MIN_YEAR) / range) * 100;
  const toPercent = ((state.pendingFilters.yearTo - MIN_YEAR) / range) * 100;
  yearSliderRange.style.left = `${fromPercent}%`;
  yearSliderRange.style.width = `${Math.max(0, toPercent - fromPercent)}%`;

  ratingFromInput.value = formatRatingControlValue(state.pendingFilters.ratingFrom);
  ratingToInput.value = formatRatingControlValue(state.pendingFilters.ratingTo);
  ratingFromRange.value = formatRatingControlValue(state.pendingFilters.ratingFrom);
  ratingToRange.value = formatRatingControlValue(state.pendingFilters.ratingTo);

  const ratingRange = MAX_RATING - MIN_RATING;
  const ratingFromPercent = ((state.pendingFilters.ratingFrom - MIN_RATING) / ratingRange) * 100;
  const ratingToPercent = ((state.pendingFilters.ratingTo - MIN_RATING) / ratingRange) * 100;
  ratingSliderRange.style.left = `${ratingFromPercent}%`;
  ratingSliderRange.style.width = `${Math.max(0, ratingToPercent - ratingFromPercent)}%`;
}

function syncTypeButtons() {
  document.querySelectorAll('.type-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.type === state.pendingFilters.type);
  });
}

function markFiltersDirty() {
  updateFilterApplyState();
}

function updateFilterApplyState() {
  const dirty = isFilterDirty();
  applyExtraFiltersBtn.disabled = !dirty;
  filtersDirtyBadge.classList.toggle('hidden', !dirty);
}

function isFilterDirty() {
  return serializeFilters(state.appliedFilters) !== serializeFilters(state.pendingFilters);
}

function serializeFilters(filters) {
  return JSON.stringify(cloneFilters(filters));
}

async function initImageConfig() {
  try {
    const config = await apiFetch('/configuration');
    const secureBaseUrl = config?.images?.secure_base_url;
    const posterSizes = config?.images?.poster_sizes || [];
    const backdropSizes = config?.images?.backdrop_sizes || [];

    if (secureBaseUrl) {
      state.imageBaseUrl = secureBaseUrl + (posterSizes.includes('w500') ? 'w500' : (posterSizes[posterSizes.length - 1] || 'original'));
      state.imageBackdropBaseUrl = secureBaseUrl + (backdropSizes.includes('w780') ? 'w780' : (backdropSizes[backdropSizes.length - 1] || 'original'));
    }
  } catch (error) {
    console.warn('[initImageConfig] fallback to default image base url', error);
  }
}

async function loadGenres() {
  const [movieGenresData, tvGenresData] = await Promise.all([
    apiFetch('/genre/movie/list', { language: 'ru' }),
    apiFetch('/genre/tv/list', { language: 'ru' })
  ]);

  const genreMap = new Map();

  for (const genre of movieGenresData.genres || []) {
    const label = normalizeGenreLabel(genre);
    const key = makeGenreKey(label);
    if (!genreMap.has(key)) {
      genreMap.set(key, { key, label, movieIds: [], tvIds: [] });
    }
    const target = genreMap.get(key);
    if (!target.movieIds.includes(genre.id)) {
      target.movieIds.push(genre.id);
    }
  }

  for (const genre of tvGenresData.genres || []) {
    const label = normalizeGenreLabel(genre);
    const key = makeGenreKey(label);
    if (!genreMap.has(key)) {
      genreMap.set(key, { key, label, movieIds: [], tvIds: [] });
    }
    const target = genreMap.get(key);
    if (!target.tvIds.includes(genre.id)) {
      target.tvIds.push(genre.id);
    }
  }

  state.genres = Array.from(genreMap.values()).sort((a, b) => a.label.localeCompare(b.label, 'ru'));
  state.genresByKey = new Map(state.genres.map((genre) => [genre.key, genre]));
}

async function loadCountries() {
  const countriesData = await apiFetch('/configuration/countries');
  const countryMap = new Map();

  for (const entry of countriesData || []) {
    const code = String(entry?.iso_3166_1 || '').trim().toUpperCase();
    if (!code) continue;
    const label = resolveCountryLabel(code, entry?.native_name || entry?.english_name || code);
    if (!countryMap.has(code)) {
      countryMap.set(code, { code, label });
    }
  }

  state.countries = Array.from(countryMap.values()).sort((a, b) => a.label.localeCompare(b.label, 'ru'));
  state.countriesByCode = new Map(state.countries.map((country) => [country.code, country]));
}


function loadRegions() {
  state.regions = REGION_DEFINITIONS.map((region) => ({
    key: region.key,
    label: region.label,
    countryCodes: [...region.countryCodes]
  }));
  state.regionsByKey = new Map(state.regions.map((region) => [region.key, region]));
}

function syncExcludeModeToggleUi() {
  const isRegionsMode = state.pendingFilters.excludeMode === 'regions';
  if (excludeModeToggle) {
    excludeModeToggle.classList.toggle('is-regions', isRegionsMode);
    excludeModeToggle.setAttribute('aria-checked', String(isRegionsMode));
  }

  document.querySelectorAll('.exclude-mode-text').forEach((label) => {
    const isActive = label.classList.contains('exclude-mode-text-regions') ? isRegionsMode : !isRegionsMode;
    label.classList.toggle('active', isActive);
  });
}

function applyExcludeModeChange(nextMode) {
  state.pendingFilters.excludeMode = nextMode === 'regions' ? 'regions' : 'countries';
  state.pendingFilters.excludedCountries = [];
  state.pendingFilters.excludedRegions = [];
  closeAllMultiSelects();
  syncFilterUiFromPending();
  markFiltersDirty();
}

function showRegionModeConfirmation(onConfirm, onCancel) {
  state.pendingExcludeModeSwitch = typeof onConfirm === 'function' ? onConfirm : null;
  regionConfirmOverlay.classList.remove('hidden');
  regionConfirmOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('region-modal-open');
  regionConfirmOverlay.dataset.cancelAction = typeof onCancel === 'function' ? 'sync' : '';
}

function closeRegionModeConfirmation() {
  state.pendingExcludeModeSwitch = null;
  regionConfirmOverlay.classList.add('hidden');
  regionConfirmOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('region-modal-open');
}

function getActiveExcludeField(filters = state.pendingFilters) {
  return filters.excludeMode === 'regions' ? 'excludedRegions' : 'excludedCountries';
}

function getActiveExcludedValues(filters = state.appliedFilters) {
  const field = getActiveExcludeField(filters);
  return Array.isArray(filters[field]) ? filters[field] : [];
}

function hasActiveExclusions(filters = state.appliedFilters) {
  return getActiveExcludedValues(filters).length > 0;
}

function getExcludedCountryCodeSet(filters = state.appliedFilters) {
  const result = new Set();
  if (filters.excludeMode === 'regions') {
    for (const regionKey of filters.excludedRegions || []) {
      const region = state.regionsByKey.get(regionKey);
      if (!region) continue;
      for (const code of region.countryCodes || []) {
        result.add(code);
      }
    }
    return result;
  }

  for (const code of filters.excludedCountries || []) {
    result.add(code);
  }
  return result;
}

function renderGenreTags() {
  renderMultiSelect({
    host: genreMultiSelect,
    key: 'genres',
    placeholder: 'Жанры не выбраны',
    emptyText: 'Жанры пока не загружены.',
    options: state.genres.map((genre) => ({ value: genre.key, label: genre.label })),
    selectedValues: state.pendingFilters.genres,
    onToggle: (value) => togglePendingMultiValue('genres', value),
    onClear: () => clearPendingMultiValue('genres')
  });
}

function renderCountryMultiSelect() {
  const regionsMode = state.pendingFilters.excludeMode === 'regions';
  const selectedField = regionsMode ? 'excludedRegions' : 'excludedCountries';
  const options = regionsMode
    ? state.regions.map((region) => ({
        value: region.key,
        label: region.label,
        tooltip: REGION_TOOLTIP_TEXTS.get(region.key) || ''
      }))
    : state.countries.map((country) => ({ value: country.code, label: country.label }));

  renderMultiSelect({
    host: countryExcludeMultiSelect,
    key: regionsMode ? 'regions' : 'countries',
    placeholder: regionsMode ? 'Регионы не исключаются' : 'Страны не исключаются',
    emptyText: regionsMode ? 'Список регионов пока не загружен.' : 'Список стран пока не загружен.',
    options,
    selectedValues: state.pendingFilters[selectedField],
    onToggle: (value) => togglePendingMultiValue(selectedField, value),
    onClear: () => clearPendingMultiValue(selectedField)
  });
}

function renderMultiSelect({ host, key, placeholder, emptyText, options, selectedValues, onToggle, onClear }) {
  if (!host) return;

  const wasOpen = host.querySelector('.multi-select')?.classList.contains('is-open') === true;
  const selectedSet = new Set(selectedValues || []);
  const selectedOptions = options.filter((option) => selectedSet.has(option.value));
  const summaryMarkup = selectedOptions.length
    ? selectedOptions.map((option) => `<span class="multi-select-chip">${escapeHtml(option.label)}</span>`).join('')
    : `<span class="multi-select-placeholder">${escapeHtml(placeholder)}</span>`;

  const countMarkup = selectedOptions.length
    ? `<span class="multi-select-count">${selectedOptions.length}</span>`
    : '';

  const optionsMarkup = options.length
    ? options.map((option) => {
        const selected = selectedSet.has(option.value);
        const tooltipAttr = option.tooltip ? ` title="${escapeHtml(option.tooltip)}"` : '';
        return `
          <button type="button" class="multi-option${selected ? ' selected' : ''}" data-value="${escapeHtml(option.value)}" aria-pressed="${selected ? 'true' : 'false'}"${tooltipAttr}>
            <span class="multi-option-check">${selected ? '✓' : ''}</span>
            <span class="multi-option-label">${escapeHtml(option.label)}</span>
          </button>
        `;
      }).join('')
    : `<div class="multi-select-empty">${escapeHtml(emptyText)}</div>`;

  host.innerHTML = `
    <div class="multi-select${wasOpen ? ' is-open' : ''}" data-key="${escapeHtml(key)}">
      <button type="button" class="multi-select-trigger" aria-expanded="${wasOpen ? 'true' : 'false'}">
        <span class="multi-select-summary">${summaryMarkup}</span>
        <span class="multi-select-meta">
          ${countMarkup}
          <span class="multi-select-chevron">▾</span>
        </span>
      </button>
      <div class="multi-select-dropdown">
        <div class="multi-select-options">${optionsMarkup}</div>
        <div class="multi-select-footer">
          <button type="button" class="multi-select-clear-btn">Сбросить</button>
        </div>
      </div>
    </div>
  `;

  const root = host.querySelector('.multi-select');
  const trigger = host.querySelector('.multi-select-trigger');
  const optionButtons = host.querySelectorAll('.multi-option');
  const clearButton = host.querySelector('.multi-select-clear-btn');

  if (trigger && root) {
    trigger.addEventListener('click', () => {
      const isOpen = root.classList.contains('is-open');
      closeAllMultiSelects(root);
      root.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  optionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.value;
      if (!value) return;
      onToggle(value);
    });
  });

  if (clearButton) {
    clearButton.disabled = !selectedOptions.length;
    clearButton.addEventListener('click', () => {
      if (!selectedOptions.length) return;
      onClear();
    });
  }
}

function closeAllMultiSelects(exceptRoot = null) {
  document.querySelectorAll('.multi-select.is-open').forEach((root) => {
    if (exceptRoot && root === exceptRoot) return;
    root.classList.remove('is-open');
    const trigger = root.querySelector('.multi-select-trigger');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

function togglePendingMultiValue(field, value) {
  const currentValues = new Set(state.pendingFilters[field] || []);
  if (currentValues.has(value)) {
    currentValues.delete(value);
  } else {
    currentValues.add(value);
  }
  state.pendingFilters[field] = Array.from(currentValues).sort();
  syncFilterUiFromPending();
  markFiltersDirty();
}

function clearPendingMultiValue(field) {
  state.pendingFilters[field] = [];
  syncFilterUiFromPending();
  markFiltersDirty();
}

function normalizeGenreLabel(genre) {
  const genreId = Number(genre?.id);
  const rawLabel = String(genre?.name || '').trim();

  if (GENRE_LABEL_OVERRIDES.has(genreId)) {
    return GENRE_LABEL_OVERRIDES.get(genreId);
  }

  const normalizedRawKey = normalizeGenreLabelKey(rawLabel);
  if (GENRE_LABEL_FALLBACKS.has(normalizedRawKey)) {
    return GENRE_LABEL_FALLBACKS.get(normalizedRawKey);
  }

  return capitalizeFirstLetter(rawLabel);
}

function normalizeGenreLabelKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/\s*&\s*/g, ' & ')
    .replace(/\s+/g, ' ');
}

function capitalizeFirstLetter(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('ru-RU') + text.slice(1);
}



async function preloadAiSearchRoasts() {
  try {
    const response = await fetch(`${AI_SEARCH_ROASTS_FILE}?v=3`, { cache: 'no-store' });
    if (!response.ok) return;
    const text = await response.text();
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length) {
      aiSearchRoastLines = lines;
      aiSearchRoastDeck = [];
    }
  } catch (error) {
    console.warn('[preloadAiSearchRoasts]', error);
  }
}

function getRandomAiRoastLine() {
  const pool = Array.isArray(aiSearchRoastLines) && aiSearchRoastLines.length ? aiSearchRoastLines : AI_SEARCH_DEFAULT_ROASTS;
  if (!aiSearchRoastDeck.length) {
    aiSearchRoastDeck = [...pool];
    for (let i = aiSearchRoastDeck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [aiSearchRoastDeck[i], aiSearchRoastDeck[j]] = [aiSearchRoastDeck[j], aiSearchRoastDeck[i]];
    }
    if (aiSearchRoastDeck[0] === aiSearchLastRoast && aiSearchRoastDeck.length > 1) {
      [aiSearchRoastDeck[0], aiSearchRoastDeck[1]] = [aiSearchRoastDeck[1], aiSearchRoastDeck[0]];
    }
  }
  const nextLine = aiSearchRoastDeck.shift() || pool[0];
  aiSearchLastRoast = nextLine;
  return nextLine;
}

function isAiSearchEnabled() {
  return state.aiSearch.enabled && !!state.query.trim();
}

function resetAiSearchPlanState() {
  if (aiSearchAbortController) {
    aiSearchAbortController.abort();
    aiSearchAbortController = null;
  }
  stopAiSearchFallbackLog();
  state.aiSearch.prompt = '';
  state.aiSearch.plan = null;
  state.aiSearch.lastRawResponse = '';
  state.aiSearch.lastReasoning = [];
  state.aiSearch.usedWebSearch = false;
  state.aiSearch.lastPlanGeneratedAt = 0;
  aiSearchPlanChips.innerHTML = '';
  aiSearchModeLabel.textContent = 'vibe mode';
  aiSearchLog.textContent = 'Пока тихо. ИИ-поиск ещё не запускался.';
  aiSearchSummary.textContent = 'Включи AI-режим, опиши настроение или сюжет — и поиск соберёт план под TMDb.';
  setAiSearchStatus('ожидание', 'idle');
}

function shouldShowAiSearchPanel() {
  if (!state.aiSearch.enabled) return false;
  return Boolean(state.aiSearch.prompt || state.aiSearch.plan);
}

function syncAiSearchUi() {
  const enabled = state.aiSearch.enabled;
  aiSearchToggle.classList.toggle('active', enabled);
  aiSearchToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  search.placeholder = enabled
    ? 'Опиши сюжет, вайб или настроение. Например: грязный сатирический сериал про ублюдочных супергероев'
    : 'Поиск по названию';
  if (!enabled && /\r?\n/.test(search.value)) {
    search.value = search.value.replace(/\s*\r?\n+\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
  }
  search.classList.toggle('ai-multiline', enabled);
  search.rows = enabled ? 3 : 1;
  search.style.height = enabled ? '88px' : '42px';
  search.scrollTop = 0;
  aiSearchPanel.classList.toggle('hidden', !shouldShowAiSearchPanel());
}

function setAiSearchStatus(label, tone = 'idle') {
  aiSearchStatusPill.textContent = label;
  aiSearchStatusPill.dataset.tone = tone;
}

function appendAiSearchLog(line, { replace = false } = {}) {
  const safeLine = String(line || '').trim();
  if (!safeLine) return;

  const lines = replace
    ? [safeLine]
    : aiSearchLog.textContent
        .split('\n')
        .map((entry) => entry.trim())
        .filter(Boolean)
        .concat(safeLine);

  aiSearchLog.textContent = lines.slice(-AI_SEARCH_REASONING_MAX_LINES).join('\n');
  aiSearchLog.scrollTop = aiSearchLog.scrollHeight;
}

function stopAiSearchFallbackLog() {
  if (aiSearchFallbackTimer) {
    clearInterval(aiSearchFallbackTimer);
    aiSearchFallbackTimer = null;
  }
}

function startAiSearchFallbackLog() {
  stopAiSearchFallbackLog();
  aiSearchFallbackIndex = 0;
  aiSearchFallbackTimer = setInterval(() => {
    if (!state.aiSearch.enabled) {
      stopAiSearchFallbackLog();
      return;
    }
    const line = getRandomAiRoastLine();
    aiSearchFallbackIndex += 1;
    appendAiSearchLog(`• ${line}`);
  }, 1700);
}

function buildAiGenreReferenceText() {
  const movieLines = [];
  const tvLines = [];

  for (const genre of state.genres) {
    for (const id of genre.movieIds || []) {
      movieLines.push(`${id}: ${genre.label}`);
    }
    for (const id of genre.tvIds || []) {
      tvLines.push(`${id}: ${genre.label}`);
    }
  }

  return [
    `Movie genre IDs: ${Array.from(new Set(movieLines)).join(', ')}`,
    `TV genre IDs: ${Array.from(new Set(tvLines)).join(', ')}`
  ].join('\n');
}

function buildAiHardConstraintText() {
  const bits = [];
  if (state.appliedFilters.type !== 'all') {
    bits.push(`UI media type is fixed to ${state.appliedFilters.type}.`);
  }
  if (state.appliedFilters.yearFrom !== MIN_YEAR || state.appliedFilters.yearTo !== CURRENT_YEAR) {
    bits.push(`UI year range is ${state.appliedFilters.yearFrom}-${state.appliedFilters.yearTo}.`);
  }
  if (state.appliedFilters.ratingFrom !== MIN_RATING || state.appliedFilters.ratingTo !== MAX_RATING) {
    bits.push(`UI rating range is ${formatRatingControlValue(state.appliedFilters.ratingFrom)}-${formatRatingControlValue(state.appliedFilters.ratingTo)}.`);
  }
  if (state.appliedFilters.genres.length) {
    const labels = state.appliedFilters.genres
      .map((key) => state.genresByKey.get(key)?.label)
      .filter(Boolean)
      .join(', ');
    if (labels) bits.push(`UI selected genres: ${labels}.`);
  }
  return bits.join(' ') || 'No extra UI hard filters selected.';
}

function buildAiSearchSystemPrompt() {
  return [
    'You are RMP AI Search Planner.',
    'Convert the user\'s free-text movie/TV request into strict JSON for TMDb search and discover.',
    'Return ONLY valid JSON. No markdown, no prose outside JSON, no code fences.',
    'Prefer precision over variety. Avoid childish, family, or animation results when the request is clearly adult, violent, cynical, satirical, gritty, erotic, or dark unless the user explicitly asks for those genres.',
    'Use only genre IDs from the provided reference. If unsure, leave arrays empty instead of inventing IDs.',
    'Schema:',
    '{',
    '  "media_type": "movie" | "tv" | "all",',
    '  "search_strategy": "title-first" | "hybrid" | "discover-only",',
    '  "text_query": string,',
    '  "title_hints": string[],',
    '  "include_genre_ids": number[],',
    '  "exclude_genre_ids": number[],',
    '  "primary_year_from": number | null,',
    '  "primary_year_to": number | null,',
    '  "vote_average_gte": number | null,',
    '  "vote_count_gte": number | null,',
    '  "original_languages": string[],',
    '  "sort_by": string,',
    '  "must_match_terms": string[],',
    '  "avoid_terms": string[],',
    '  "explanation": string,',
    '  "confidence": number,',
    '  "for_tv": { "only_currently_airing": boolean }',
    '}',
    'If the user describes a known title, put it in text_query/title_hints and prefer title-first or hybrid.',
    'If the user describes only vibe or plot fragments, prefer hybrid or discover-only and keep text_query concise.',
    'Do not include impossible years, fake languages, fake genre IDs, or commentary.'
  ].join('\n');
}

function buildAiSearchUserPrompt(rawQuery) {
  return [
    `User request: ${rawQuery}`,
    buildAiHardConstraintText(),
    buildAiGenreReferenceText(),
    'No external tools are required. Focus on producing the most accurate TMDb retrieval plan from the user request and the provided genre reference.'
  ].join('\n\n');
}

function normalizeAiSearchPlan(rawPlan) {
  const source = rawPlan && typeof rawPlan === 'object' ? rawPlan : {};
  const mediaType = ['movie', 'tv', 'all'].includes(source.media_type) ? source.media_type : 'all';
  const strategy = ['title-first', 'hybrid', 'discover-only'].includes(source.search_strategy) ? source.search_strategy : 'hybrid';
  const includeGenres = normalizeNumericIdArray(source.include_genre_ids);
  const excludeGenres = normalizeNumericIdArray(source.exclude_genre_ids).filter((id) => !includeGenres.includes(id));
  const titleHints = normalizeStringArray(source.title_hints, 5);
  const textQuery = String(source.text_query || '').trim();
  const mustMatchTerms = normalizeStringArray(source.must_match_terms, 8);
  const avoidTerms = normalizeStringArray(source.avoid_terms, 8);
  const yearFrom = normalizeOptionalYear(source.primary_year_from);
  const yearTo = normalizeOptionalYear(source.primary_year_to);
  const normalizedYearFrom = yearFrom !== null && yearTo !== null ? Math.min(yearFrom, yearTo) : yearFrom;
  const normalizedYearTo = yearFrom !== null && yearTo !== null ? Math.max(yearFrom, yearTo) : yearTo;
  const voteAverage = normalizeOptionalNumber(source.vote_average_gte, 0, 10, 1);
  const voteCount = normalizeOptionalInteger(source.vote_count_gte, 0, 10000000);
  const originalLanguages = normalizeLanguageCodes(source.original_languages, 3);
  const confidence = normalizeOptionalNumber(source.confidence, 0, 1, 2) ?? 0.72;
  const onlyCurrentlyAiring = Boolean(source?.for_tv?.only_currently_airing);

  return {
    mediaType,
    searchStrategy: strategy,
    textQuery,
    titleHints,
    includeGenreIds: includeGenres,
    excludeGenreIds: excludeGenres,
    primaryYearFrom: normalizedYearFrom,
    primaryYearTo: normalizedYearTo,
    voteAverageGte: voteAverage,
    voteCountGte: voteCount,
    originalLanguages,
    sortBy: normalizeAiSortBy(source.sort_by, mediaType),
    mustMatchTerms,
    avoidTerms,
    explanation: String(source.explanation || '').trim(),
    confidence,
    forTv: {
      onlyCurrentlyAiring
    }
  };
}

function normalizeNumericIdArray(value) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value
    .map((entry) => Number(entry))
    .filter((entry) => Number.isInteger(entry) && entry > 0)));
}

function normalizeStringArray(value, limit = 6) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value
    .map((entry) => String(entry || '').trim())
    .filter(Boolean))).slice(0, limit);
}

function normalizeOptionalYear(value) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return clampYear(numeric);
}

function normalizeOptionalInteger(value, min = 0, max = Number.MAX_SAFE_INTEGER) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return Math.max(min, Math.min(max, Math.round(numeric)));
}

function normalizeOptionalNumber(value, min = 0, max = Number.MAX_SAFE_INTEGER, precision = 1) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  const clamped = Math.max(min, Math.min(max, numeric));
  const factor = 10 ** precision;
  return Math.round(clamped * factor) / factor;
}

function normalizeLanguageCodes(value, limit = 4) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value
    .map((entry) => String(entry || '').trim().toLowerCase())
    .filter((entry) => /^[a-z]{2,3}$/.test(entry)))).slice(0, limit);
}

function normalizeAiSortBy(value, mediaType = 'all') {
  const raw = String(value || '').trim();
  const common = ['popularity.desc', 'popularity.asc', 'vote_average.desc', 'vote_average.asc', 'vote_count.desc', 'vote_count.asc'];
  const movieOnly = ['primary_release_date.desc', 'primary_release_date.asc'];
  const tvOnly = ['first_air_date.desc', 'first_air_date.asc'];
  const allowed = new Set([
    ...common,
    ...(mediaType === 'movie' ? movieOnly : []),
    ...(mediaType === 'tv' ? tvOnly : []),
    ...(mediaType === 'all' ? [...movieOnly, ...tvOnly] : [])
  ]);
  if (allowed.has(raw)) return raw;
  return mediaType === 'tv' ? 'popularity.desc' : 'popularity.desc';
}

async function ensureAiSearchPlan() {
  const query = state.query.trim();
  if (!state.aiSearch.enabled || !query) return null;

  if (state.aiSearch.plan && state.aiSearch.prompt === query) {
    return state.aiSearch.plan;
  }

  return requestAiSearchPlan(query);
}

async function requestAiSearchPlan(query) {
  if (!query) return null;

  if (aiSearchAbortController) {
    aiSearchAbortController.abort();
  }

  aiSearchAbortController = new AbortController();
  state.aiSearch.prompt = query;
  state.aiSearch.plan = null;
  state.aiSearch.lastRawResponse = '';
  state.aiSearch.lastReasoning = [];
  state.aiSearch.usedWebSearch = false;
  syncAiSearchUi();
  aiSearchSummary.textContent = `Разбираю запрос: «${query}». Сейчас ИИ переведёт его в TMDb-фильтры и план поиска.`;
  aiSearchPlanChips.innerHTML = '';
  aiSearchLog.textContent = '• Запускаю ИИ-поиск';
  setAiSearchStatus('анализ', 'thinking');
  startAiSearchFallbackLog();

  const payload = {
    model: OPENROUTER_MODEL,
    messages: [
      { role: 'system', content: buildAiSearchSystemPrompt() },
      { role: 'user', content: buildAiSearchUserPrompt(query) }
    ],
    temperature: 0.2,
    max_completion_tokens: 900,
    stream: true
  };

  const headers = {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'X-OpenRouter-Title': 'RMP AI Search'
  };

  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    headers['HTTP-Referer'] = window.location.origin;
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: aiSearchAbortController.signal
    });

    if (!response.ok) {
      stopAiSearchFallbackLog();
      const errorText = await response.text().catch(() => '');
      appendAiSearchLog(`• OpenRouter вернул ${response.status}. ${errorText.slice(0, 260)}`);
      aiSearchSummary.textContent = 'ИИ не смог собрать план поиска. Проверь консоль и попробуй ещё раз.';
      setAiSearchStatus('ошибка', 'error');
      throw new Error(`OpenRouter request failed: ${response.status}`);
    }

    let rawContent = '';

    if (response.body && typeof response.body.getReader === 'function') {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true }).replace(/\r/g, '');
      const chunks = buffer.split('\n\n');
      buffer = chunks.pop() || '';

      for (const chunk of chunks) {
        const dataLines = chunk
          .split('\n')
          .filter((line) => line.startsWith('data:'))
          .map((line) => line.slice(5).trim())
          .filter(Boolean);

        for (const dataLine of dataLines) {
          if (dataLine === '[DONE]') continue;

          let parsed;
          try {
            parsed = JSON.parse(dataLine);
          } catch (error) {
            continue;
          }

          const choice = parsed?.choices?.[0];
          const delta = choice?.delta || {};

          if (Array.isArray(delta.tool_calls) && delta.tool_calls.length) {
            state.aiSearch.usedWebSearch = true;
          }

          const deltaContent = typeof delta.content === 'string'
            ? delta.content
            : Array.isArray(delta.content)
              ? delta.content.map((entry) => entry?.text || '').join('')
              : '';

          if (deltaContent) {
            rawContent += deltaContent;
          }
        }
      }
    }
  } else {
    rawContent = await response.text();
  }

    stopAiSearchFallbackLog();
    const parsedPlan = parseAiPlanPayload(rawContent);
    const plan = normalizeAiSearchPlan(parsedPlan);

    state.aiSearch.plan = plan;
    state.aiSearch.lastRawResponse = rawContent;
    state.aiSearch.lastReasoning = [];
    state.aiSearch.lastPlanGeneratedAt = Date.now();

    setAiSearchStatus('готово', 'ready');
    updateAiPlanPresentation(plan);
    return plan;
  } finally {
    stopAiSearchFallbackLog();
    aiSearchAbortController = null;
  }
}

function parseAiPlanPayload(rawText) {
  const cleaned = String(rawText || '').trim();
  if (!cleaned) {
    throw new Error('AI search planner returned an empty response.');
  }

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw error;
  }
}

function updateAiPlanPresentation(plan) {
  const parts = [];
  if (plan.explanation) {
    parts.push(plan.explanation);
  }
  parts.push(`Стратегия: ${resolveAiStrategyLabel(plan.searchStrategy)}.`);
  if (state.aiSearch.usedWebSearch) {
    parts.push('Модель подтягивала веб-контекст для уточнения запроса.');
  }
  aiSearchSummary.textContent = parts.join(' ');
  aiSearchModeLabel.textContent = `${resolveAiMediaTypeLabel(plan.mediaType)} • ${resolveAiStrategyLabel(plan.searchStrategy)}`;
  aiSearchPlanChips.innerHTML = buildAiPlanChipsMarkup(plan);
}

function resolveAiMediaTypeLabel(mediaType) {
  if (mediaType === 'movie') return 'кино-фокус';
  if (mediaType === 'tv') return 'сериальный фокус';
  return 'смешанный фокус';
}

function resolveAiStrategyLabel(strategy) {
  if (strategy === 'title-first') return 'точное опознание тайтла';
  if (strategy === 'discover-only') return 'чистый vibe-discover';
  return 'гибридный поиск';
}

function buildAiPlanChipsMarkup(plan) {
  const chips = [];
  chips.push(renderAiPlanChip(resolveAiMediaTypeLabel(plan.mediaType), 'accent'));
  chips.push(renderAiPlanChip(resolveAiStrategyLabel(plan.searchStrategy), 'muted'));

  if (plan.textQuery) {
    chips.push(renderAiPlanChip(`поисковая фраза: ${plan.textQuery}`, 'muted'));
  }

  const includedGenres = resolveAiGenreLabels(plan.mediaType, plan.includeGenreIds);
  const excludedGenres = resolveAiGenreLabels(plan.mediaType, plan.excludeGenreIds);

  for (const genre of includedGenres) {
    chips.push(renderAiPlanChip(genre, 'success'));
  }
  for (const genre of excludedGenres) {
    chips.push(renderAiPlanChip(`без ${genre}`, 'danger'));
  }

  if (plan.primaryYearFrom !== null || plan.primaryYearTo !== null) {
    const from = plan.primaryYearFrom ?? '—';
    const to = plan.primaryYearTo ?? '—';
    chips.push(renderAiPlanChip(`годы: ${from}–${to}`, 'muted'));
  }

  if (plan.voteAverageGte !== null) {
    chips.push(renderAiPlanChip(`рейтинг от ${plan.voteAverageGte}`, 'muted'));
  }

  if (plan.voteCountGte !== null) {
    chips.push(renderAiPlanChip(`голосов от ${plan.voteCountGte}`, 'muted'));
  }

  if (plan.originalLanguages.length) {
    chips.push(renderAiPlanChip(`языки: ${plan.originalLanguages.join(', ')}`, 'muted'));
  }

  if (plan.forTv.onlyCurrentlyAiring) {
    chips.push(renderAiPlanChip('только онгоинги', 'accent'));
  }

  return chips.join('');
}

function renderAiPlanChip(text, tone = 'muted') {
  return `<span class="ai-search-chip" data-tone="${escapeHtml(tone)}">${escapeHtml(text)}</span>`;
}

function resolveAiGenreLabels(mediaType, ids = []) {
  if (!Array.isArray(ids) || !ids.length) return [];
  const labels = [];
  for (const id of ids) {
    const found = state.genres.find((genre) => {
      const pool = mediaType === 'movie' ? genre.movieIds : mediaType === 'tv' ? genre.tvIds : [...genre.movieIds, ...genre.tvIds];
      return pool.includes(Number(id));
    });
    labels.push(found?.label || `#${id}`);
  }
  return Array.from(new Set(labels));
}

async function fetchAiSearchContent(page) {
  try {
    const plan = await ensureAiSearchPlan();
    if (!plan) {
      return fetchSearchContent(page);
    }

    setAiSearchStatus('ищем', 'working');

    const payload = await executeAiSearchPlan(plan, page);
    setAiSearchStatus('готово', 'ready');
    aiSearchLog.textContent = '• ИИ-поиск завершен';

    return {
      items: payload.items,
      totalPages: payload.totalPages,
      statusText: buildAiStatusText(payload.items.length, plan)
    };
  } catch (error) {
    console.error('[fetchAiSearchContent]', error);
    appendAiSearchLog('• AI-поиск остановился с ошибкой. Обычный поиск специально не подмешиваю.');
    aiSearchSummary.textContent = 'ИИ-поиск не смог собрать рабочий план. Отключи AI-кнопку для обычного поиска по названию.';
    setAiSearchStatus('ошибка', 'error');
    return {
      items: [],
      totalPages: 1,
      statusText: 'AI-поиск завершился ошибкой. Обычный поиск не запускался.'
    };
  }
}

function buildAiStatusText(count, plan) {
  const base = count ? `AI-поиск нашёл ${count} ${count === 1 ? 'тайтл' : count < 5 ? 'тайтла' : 'тайтлов'}.` : 'AI-поиск ничего не нашёл.';
  const extras = [];
  if (plan.textQuery) extras.push(`TMDb query: ${plan.textQuery}`);
  if (plan.includeGenreIds.length) extras.push(`жанры: ${resolveAiGenreLabels(plan.mediaType, plan.includeGenreIds).join(', ')}`);
  if (plan.forTv.onlyCurrentlyAiring) extras.push('онгоинги');
  return [base, extras.join(' • ')].filter(Boolean).join(' ');
}

async function executeAiSearchPlan(plan, page) {
  const mediaTargets = resolveAiMediaTargets(plan);
  const effectiveTextQuery = plan.textQuery || plan.titleHints[0] || (plan.searchStrategy === 'title-first' ? state.query.trim() : '');

  return collectFilteredCatalogPage(page, async (rawPage) => {
    const tasks = [];

    for (const mediaType of mediaTargets) {
      if (effectiveTextQuery) {
        const endpoint = mediaType === 'movie' ? '/search/movie' : '/search/tv';
        tasks.push(apiFetch(endpoint, buildAiSearchParams(mediaType, rawPage, effectiveTextQuery, plan))
          .then((response) => ({ source: 'search', mediaType, response })));
      }

      if (plan.searchStrategy !== 'title-first' || rawPage === 1 || !effectiveTextQuery) {
        const endpoint = mediaType === 'movie' ? '/discover/movie' : '/discover/tv';
        tasks.push(apiFetch(endpoint, buildAiDiscoverParams(mediaType, rawPage, plan))
          .then((response) => ({ source: 'discover', mediaType, response })));
      }
    }

    if (!tasks.length) {
      return {
        items: [],
        totalPages: 1
      };
    }

    const settled = await Promise.allSettled(tasks);
    const collected = [];
    let totalPages = 1;

    for (const item of settled) {
      if (item.status !== 'fulfilled') continue;
      const response = item.value.response || {};
      totalPages = Math.max(totalPages, Number(response.total_pages || 1));
      const normalized = (response.results || []).map((entry) => normalizeItem(entry, item.value.mediaType));
      collected.push(...normalized);
    }

    return {
      items: collected,
      totalPages
    };
  }, {
    extraFilter: (item) => matchesAiPlanFilters(item, plan),
    sorter: (a, b) => scoreAiCandidate(b, plan, effectiveTextQuery) - scoreAiCandidate(a, plan, effectiveTextQuery) || sortByPopularity(a, b),
    cacheKey: buildCatalogCollectionKey('ai-search', { plan: summarizeAiPlanForCache(plan), textQuery: effectiveTextQuery })
  });
}

function resolveAiMediaTargets(plan) {
  const forcedType = state.appliedFilters.type;
  if (forcedType === 'movie' || forcedType === 'tv') {
    return [forcedType];
  }
  if (plan.mediaType === 'movie' || plan.mediaType === 'tv') {
    return [plan.mediaType];
  }
  return ['movie', 'tv'];
}

function buildAiSearchParams(mediaType, page, query, plan) {
  const params = {
    api_key: API_KEY,
    language: 'ru-RU',
    include_adult: 'false',
    page: String(page),
    query
  };

  const exactYear = resolveAiYearExact(plan);
  if (mediaType === 'movie' && exactYear !== null) {
    params.year = String(exactYear);
  }
  if (mediaType === 'tv' && exactYear !== null) {
    params.first_air_date_year = String(exactYear);
  }

  return params;
}

function resolveAiYearExact(plan) {
  if (state.appliedFilters.yearFrom === state.appliedFilters.yearTo) {
    return state.appliedFilters.yearFrom;
  }
  if (plan.primaryYearFrom !== null && plan.primaryYearTo !== null && plan.primaryYearFrom === plan.primaryYearTo) {
    return plan.primaryYearFrom;
  }
  return null;
}

function buildAiDiscoverParams(mediaType, page, plan) {
  const params = buildDiscoverParams(mediaType, page);

  if (!state.appliedFilters.genres.length && plan.includeGenreIds.length) {
    params.with_genres = plan.includeGenreIds.join('|');
  }

  if (plan.excludeGenreIds.length) {
    params.without_genres = plan.excludeGenreIds.join('|');
  }

  if ((state.appliedFilters.yearFrom === MIN_YEAR && state.appliedFilters.yearTo === CURRENT_YEAR) && (plan.primaryYearFrom !== null || plan.primaryYearTo !== null)) {
    const from = plan.primaryYearFrom ?? MIN_YEAR;
    const to = plan.primaryYearTo ?? CURRENT_YEAR;
    if (mediaType === 'movie') {
      params['primary_release_date.gte'] = `${from}-01-01`;
      params['primary_release_date.lte'] = `${to}-12-31`;
      delete params.year;
    } else {
      params['first_air_date.gte'] = `${from}-01-01`;
      params['first_air_date.lte'] = `${to}-12-31`;
      delete params.first_air_date_year;
    }
  }

  if (plan.voteAverageGte !== null) {
    params['vote_average.gte'] = String(plan.voteAverageGte);
  }
  if (plan.voteCountGte !== null) {
    params['vote_count.gte'] = String(plan.voteCountGte);
  }
  if (plan.originalLanguages.length) {
    params.with_original_language = plan.originalLanguages.join('|');
  }

  if (mediaType === 'tv' && plan.forTv.onlyCurrentlyAiring) {
    params.with_status = `${TMDB_TV_STATUS_CODES.returning}|${TMDB_TV_STATUS_CODES.inProduction}`;
    params['air_date.gte'] = getLocalDateString();
    params.sort_by = 'popularity.desc';
  } else {
    params.sort_by = coerceAiSortByForMediaType(plan.sortBy, mediaType);
  }

  return params;
}

function coerceAiSortByForMediaType(sortBy, mediaType) {
  const value = String(sortBy || '').trim();
  if (mediaType === 'movie' && value.startsWith('first_air_date')) return 'popularity.desc';
  if (mediaType === 'tv' && value.startsWith('primary_release_date')) return 'popularity.desc';
  return value || 'popularity.desc';
}

function dedupeItemsByMediaAndId(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = `${item.mediaType}:${item.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function matchesAiPlanFilters(item, plan) {
  if (!item) return false;

  if (plan.mediaType !== 'all' && item.mediaType !== plan.mediaType && state.appliedFilters.type === 'all') {
    return false;
  }

  if (plan.includeGenreIds.length && !item.genreIds.some((id) => plan.includeGenreIds.includes(Number(id)))) {
    return false;
  }

  if (plan.excludeGenreIds.length && item.genreIds.some((id) => plan.excludeGenreIds.includes(Number(id)))) {
    return false;
  }

  const year = getItemYear(item.releaseDate);
  if (year !== null) {
    if (plan.primaryYearFrom !== null && year < plan.primaryYearFrom) return false;
    if (plan.primaryYearTo !== null && year > plan.primaryYearTo) return false;
  }

  if (plan.voteAverageGte !== null && Number(item.voteAverage || 0) + 0.2 < plan.voteAverageGte) {
    return false;
  }

  return true;
}

function scoreAiCandidate(item, plan, effectiveTextQuery = '') {
  let score = Number(item.popularity || 0) * 0.02 + Number(item.voteAverage || 0) * 4;
  const titleText = normalizeSearchText(`${item.title} ${item.originalTitle}`);
  const overviewText = normalizeSearchText(item.overview || '');
  const queryText = normalizeSearchText(effectiveTextQuery || state.query);

  if (plan.mediaType !== 'all' && item.mediaType === plan.mediaType) {
    score += 70;
  }

  if (plan.includeGenreIds.length) {
    const overlap = item.genreIds.filter((id) => plan.includeGenreIds.includes(Number(id))).length;
    score += overlap * 38;
  }

  if (plan.excludeGenreIds.length) {
    const excludedOverlap = item.genreIds.filter((id) => plan.excludeGenreIds.includes(Number(id))).length;
    score -= excludedOverlap * 120;
  }

  if (queryText) {
    if (titleText.includes(queryText)) score += 220;
    else if (overviewText.includes(queryText)) score += 70;
  }

  for (const hint of plan.titleHints) {
    const normalizedHint = normalizeSearchText(hint);
    if (!normalizedHint) continue;
    if (titleText.includes(normalizedHint)) score += 190;
    else if (overviewText.includes(normalizedHint)) score += 55;
  }

  for (const term of plan.mustMatchTerms) {
    const normalizedTerm = normalizeSearchText(term);
    if (!normalizedTerm) continue;
    if (titleText.includes(normalizedTerm)) score += 48;
    else if (overviewText.includes(normalizedTerm)) score += 22;
  }

  for (const term of plan.avoidTerms) {
    const normalizedTerm = normalizeSearchText(term);
    if (!normalizedTerm) continue;
    if (titleText.includes(normalizedTerm) || overviewText.includes(normalizedTerm)) {
      score -= 60;
    }
  }

  const year = getItemYear(item.releaseDate);
  if (year !== null && plan.primaryYearFrom !== null && plan.primaryYearTo !== null) {
    if (year >= plan.primaryYearFrom && year <= plan.primaryYearTo) {
      score += 18;
    }
  }

  return score;
}

function normalizeSearchText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9\s]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}


function clearTmdbRuntimeCaches() {
  itemDetailsCache.clear();
  tvCalendarMetaCache.clear();
  tvEpisodeScheduleCache.clear();
}

function disposeCatalogMediaResources(container = main) {
  if (!container || typeof container.querySelectorAll !== 'function') return;

  container.querySelectorAll('img').forEach((image) => {
    image.removeAttribute('srcset');
    image.removeAttribute('sizes');
    if (image.getAttribute('src')) {
      image.setAttribute('src', EMPTY_IMAGE_PLACEHOLDER);
    }
  });
}


function isPlayerRouteHash(hashValue = window.location.hash) {
  const rawHash = String(hashValue || '').replace(/^#/, '').trim().toLowerCase();
  return /^(movie|tv)-\d+$/.test(rawHash) || /^tm\d+$/.test(rawHash) || /^tt\d+/.test(rawHash);
}

function shouldBlockDecisionPromptTimer() {
  return state.decisionAssistant.disabledByInitialRoute
    || state.decisionAssistant.userMadeChoice
    || state.decisionAssistant.promptShown
    || state.decisionAssistant.promptDismissed;
}

function startDecisionPromptCountdown() {
  if (!decisionPrompt || !movieRouletteOverlay) return;
  if (shouldBlockDecisionPromptTimer()) return;

  if (!state.decisionAssistant.timerStartedAt) {
    state.decisionAssistant.timerStartedAt = Date.now();
  }

  armDecisionPromptTimer();
}

function armDecisionPromptTimer() {
  if (shouldBlockDecisionPromptTimer()) return;
  if (state.decisionAssistant.timer) return;

  const startedAt = state.decisionAssistant.timerStartedAt || Date.now();
  state.decisionAssistant.timerStartedAt = startedAt;
  const elapsed = Date.now() - startedAt;
  const remaining = Math.max(0, DECISION_PROMPT_DELAY_MS - elapsed);

  state.decisionAssistant.timer = window.setTimeout(() => {
    state.decisionAssistant.timer = null;
    showDecisionPrompt();
  }, remaining);
}

function checkDecisionPromptCountdown() {
  if (!decisionPrompt || !movieRouletteOverlay) return;
  if (shouldBlockDecisionPromptTimer()) return;

  if (!state.decisionAssistant.timerStartedAt) {
    startDecisionPromptCountdown();
    return;
  }

  if (Date.now() - state.decisionAssistant.timerStartedAt >= DECISION_PROMPT_DELAY_MS) {
    showDecisionPrompt();
    return;
  }

  armDecisionPromptTimer();
}

function clearDecisionPromptTimer() {
  if (state.decisionAssistant.timer) {
    window.clearTimeout(state.decisionAssistant.timer);
    state.decisionAssistant.timer = null;
  }
}

function noteCatalogBrowsingActivity() {
  checkDecisionPromptCountdown();
}

function showDecisionPrompt() {
  clearDecisionPromptTimer();
  if (!decisionPrompt || shouldBlockDecisionPromptTimer()) return;

  state.decisionAssistant.promptShown = true;
  decisionPrompt.classList.remove('hidden');
}

function hideDecisionPrompt() {
  decisionPrompt?.classList.add('hidden');
}

function dismissDecisionPromptForSession() {
  state.decisionAssistant.promptDismissed = true;
  clearDecisionPromptTimer();
  hideDecisionPrompt();
}

function markUserMadeCatalogChoice() {
  state.decisionAssistant.userMadeChoice = true;
  clearDecisionPromptTimer();
  hideDecisionPrompt();
}

async function openMovieRoulette() {
  if (!movieRouletteOverlay) return;
  closeEpisodeCalendarPopovers();
  closeAllMultiSelects();
  movieRouletteOverlay.classList.remove('hidden');
  movieRouletteOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('movie-roulette-open');
  await startRouletteSpin({ reroll: false });
}

function closeMovieRoulette() {
  if (!movieRouletteOverlay || movieRouletteOverlay.classList.contains('hidden')) return;
  movieRouletteOverlay.classList.add('hidden');
  movieRouletteOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('movie-roulette-open');
  state.decisionAssistant.spinning = false;
}

async function startRouletteSpin({ reroll = false } = {}) {
  if (!movieRouletteTrack || !movieRouletteResult || !movieRouletteActions || !movieRouletteLoading) return;
  if (state.decisionAssistant.spinning) return;

  state.decisionAssistant.spinning = true;
  state.decisionAssistant.currentWinner = null;
  movieRouletteTrack.style.transition = 'none';
  movieRouletteTrack.style.transform = 'translateX(0px)';
  movieRouletteTrack.innerHTML = '';
  movieRouletteResult.classList.add('hidden');
  movieRouletteResult.innerHTML = '';
  movieRouletteActions.classList.add('hidden');
  movieRouletteLoading.classList.remove('hidden');
  movieRouletteSubtitle.textContent = reroll
    ? 'Перемешиваем варианты ещё раз, без повторения предыдущего победителя, если есть альтернатива.'
    : 'Собираем варианты под текущий каталог и крутим барабан.';

  try {
    const candidates = await fetchRouletteCandidates();
    if (!candidates.length) {
      throw new Error('No roulette candidates');
    }

    const prepared = prepareRouletteItems(candidates);
    const winner = prepared.winner;
    state.decisionAssistant.currentWinner = winner;
    movieRouletteLoading.classList.add('hidden');
    renderRouletteTrack(prepared.items, prepared.winnerIndex);

    await runRouletteAnimation(prepared.winnerIndex);
    state.decisionAssistant.lastWinnerKey = getRouletteItemKey(winner);
    revealRouletteResult(winner);
  } catch (error) {
    console.error('[startRouletteSpin]', error);
    movieRouletteLoading.classList.add('hidden');
    movieRouletteResult.innerHTML = `
      <div class="movie-roulette-result-title">Не смог подобрать тайтлы</div>
      <div class="movie-roulette-result-meta">Попробуй сбросить часть фильтров или обновить каталог — выборка сейчас слишком узкая.</div>
    `;
    movieRouletteResult.classList.remove('hidden');
    movieRouletteActions.classList.remove('hidden');
    movieRouletteWatch.disabled = true;
  } finally {
    state.decisionAssistant.spinning = false;
  }
}

async function fetchRouletteCandidates() {
  if (state.showFavoritesOnly) {
    const payload = await fetchFavoritesContent();
    return payload.items || [];
  }

  if (isAiSearchEnabled()) {
    const plan = await ensureAiSearchPlan();
    if (plan) {
      return fetchRouletteCandidatesFromAiPlan(plan);
    }
  }

  if (state.query.trim()) {
    return fetchRouletteCandidatesFromSearch();
  }

  return fetchRouletteCandidatesFromDiscover();
}

async function fetchRouletteCandidatesFromAiPlan(plan) {
  const pageCap = getRoulettePageCap();
  const pages = getRandomPageSet(pageCap, ROULETTE_FETCH_ROUNDS);
  const settled = await Promise.allSettled(pages.map((page) => executeAiSearchPlan(plan, page)));
  const items = settled
    .filter((entry) => entry.status === 'fulfilled')
    .flatMap((entry) => entry.value?.items || []);
  return finalizeRouletteCandidates(items);
}

async function fetchRouletteCandidatesFromSearch() {
  const { type } = state.appliedFilters;
  const pageCap = getRoulettePageCap();
  const pages = getRandomPageSet(pageCap, ROULETTE_FETCH_ROUNDS);
  const tasks = [];

  if (type === 'movie') {
    pages.forEach((page) => tasks.push(apiFetch('/search/movie', buildSearchParams('movie', page)).then((response) => ({ response, mediaType: 'movie' }))));
  } else if (type === 'tv') {
    pages.forEach((page) => tasks.push(apiFetch('/search/tv', buildSearchParams('tv', page)).then((response) => ({ response, mediaType: 'tv' }))));
  } else {
    pages.forEach((page) => tasks.push(apiFetch('/search/multi', buildSearchParams('all', page)).then((response) => ({ response, mediaType: 'multi' }))));
  }

  const settled = await Promise.allSettled(tasks);
  const rawItems = [];
  for (const entry of settled) {
    if (entry.status !== 'fulfilled') continue;
    const { response, mediaType } = entry.value;
    const normalized = (response?.results || [])
      .filter((item) => mediaType !== 'multi' || item.media_type === 'movie' || item.media_type === 'tv')
      .map((item) => normalizeItem(item, mediaType === 'multi' ? item.media_type : mediaType));
    rawItems.push(...normalized);
  }

  const hydrated = await hydrateItemsForClientFilters(dedupeItemsByMediaAndId(rawItems));
  return finalizeRouletteCandidates(hydrated.filter(matchesClientSideFilters));
}

async function fetchRouletteCandidatesFromDiscover() {
  const { type } = state.appliedFilters;
  const mediaTargets = type === 'movie' || type === 'tv' ? [type] : ['movie', 'tv'];
  const pageCap = getRoulettePageCap();
  const pages = getRandomPageSet(pageCap, Math.max(3, ROULETTE_FETCH_ROUNDS));
  const tasks = [];

  for (const mediaType of mediaTargets) {
    if (hasImpossibleGenreCombination(mediaType)) continue;
    pages.forEach((page) => {
      const endpoint = mediaType === 'movie' ? '/discover/movie' : '/discover/tv';
      tasks.push(apiFetch(endpoint, buildDiscoverParams(mediaType, page)).then((response) => ({ response, mediaType })));
    });
  }

  const settled = await Promise.allSettled(tasks);
  const rawItems = [];
  for (const entry of settled) {
    if (entry.status !== 'fulfilled') continue;
    const { response, mediaType } = entry.value;
    rawItems.push(...(response?.results || []).map((item) => normalizeItem(item, mediaType)));
  }

  const hydrated = await hydrateItemsForClientFilters(dedupeItemsByMediaAndId(rawItems));
  return finalizeRouletteCandidates(hydrated.filter(matchesClientSideFilters).sort(sortByPopularity));
}

function finalizeRouletteCandidates(items) {
  const deduped = dedupeItemsByMediaAndId(items || [])
    .filter((item) => item?.id && item?.mediaType)
    .filter((item) => item.posterUrl || item.title);

  const lastWinnerKey = state.decisionAssistant.lastWinnerKey;
  const withoutLastWinner = lastWinnerKey && deduped.length > 1
    ? deduped.filter((item) => getRouletteItemKey(item) !== lastWinnerKey)
    : deduped;

  return shuffleArray(withoutLastWinner.length ? withoutLastWinner : deduped);
}

function getRoulettePageCap() {
  const total = Number(state.totalPages || 1);
  if (!Number.isFinite(total) || total < 1) return 1;
  return Math.max(1, Math.min(ROULETTE_RANDOM_PAGE_CAP, Math.floor(total)));
}

function getRandomPageSet(maxPage, count) {
  const safeMax = Math.max(1, Math.floor(Number(maxPage) || 1));
  const result = new Set([Math.min(safeMax, Math.max(1, Number(state.currentPage) || 1))]);
  while (result.size < Math.min(count, safeMax)) {
    result.add(1 + Math.floor(Math.random() * safeMax));
  }
  return Array.from(result);
}

function prepareRouletteItems(candidates) {
  const shuffled = shuffleArray(candidates);
  const winner = shuffled[0];
  const fillerSource = shuffled.length > 1 ? shuffled.slice(1) : shuffled;
  const items = [];

  for (let i = 0; i < ROULETTE_VISIBLE_CARDS; i += 1) {
    const source = fillerSource[i % fillerSource.length] || winner;
    items.push(source);
  }

  const winnerIndex = Math.min(ROULETTE_WINNER_INDEX, items.length - 3);
  items[winnerIndex] = winner;

  return { items, winner, winnerIndex };
}

function renderRouletteTrack(items, winnerIndex) {
  movieRouletteTrack.innerHTML = items.map((item, index) => {
    const safeTitle = escapeHtml(item.title || 'Без названия');
    const poster = item.posterUrl
      ? `<img src="${escapeHtml(item.posterUrl)}" alt="${safeTitle}" loading="eager" />`
      : `<div class="movie-roulette-poster-placeholder">${safeTitle}</div>`;
    return `
      <article class="movie-roulette-card${index === winnerIndex ? ' is-target' : ''}" data-roulette-index="${index}">
        ${poster}
        <div class="movie-roulette-card-title">${safeTitle}</div>
      </article>
    `;
  }).join('');
}

function runRouletteAnimation(winnerIndex) {
  return new Promise((resolve) => {
    const winnerCard = movieRouletteTrack.querySelector(`[data-roulette-index="${winnerIndex}"]`);
    if (!winnerCard) {
      resolve();
      return;
    }

    movieRouletteTrack.getBoundingClientRect();
    window.requestAnimationFrame(() => {
      const stageRect = movieRouletteTrack.parentElement.getBoundingClientRect();
      const winnerRect = winnerCard.getBoundingClientRect();
      const currentTrackX = movieRouletteTrack.getBoundingClientRect().left;
      const winnerCenterWithinTrack = (winnerRect.left - currentTrackX) + (winnerRect.width / 2);
      const targetTranslate = (stageRect.width / 2) - winnerCenterWithinTrack;
      const randomNudge = Math.round((Math.random() - 0.5) * Math.min(28, winnerRect.width * 0.12));

      movieRouletteTrack.style.transition = 'transform 4.8s cubic-bezier(0.12, 0.78, 0.12, 1)';
      movieRouletteTrack.style.transform = `translateX(${targetTranslate + randomNudge}px)`;

      const finish = () => {
        winnerCard.classList.add('is-winner');
        movieRouletteTrack.removeEventListener('transitionend', finish);
        resolve();
      };

      movieRouletteTrack.addEventListener('transitionend', finish, { once: true });
      window.setTimeout(finish, 5400);
    });
  });
}

function revealRouletteResult(winner) {
  if (!winner) return;
  const meta = [
    winner.mediaType === 'tv' ? 'Сериал' : 'Фильм',
    formatFullDate(winner.releaseDate),
    winner.voteAverage ? `Рейтинг: ${formatVote(winner.voteAverage)}` : ''
  ].filter(Boolean).join(' • ');

  movieRouletteResult.innerHTML = `
    <div class="movie-roulette-result-title">${escapeHtml(winner.title || 'Без названия')}</div>
    <div class="movie-roulette-result-meta">${escapeHtml(meta)}</div>
  `;
  movieRouletteResult.classList.remove('hidden');
  movieRouletteWatch.disabled = false;
  movieRouletteActions.classList.remove('hidden');
  movieRouletteSubtitle.textContent = 'Рулетка остановилась. Можно смотреть победителя или крутануть ещё раз.';
}

async function watchRouletteWinner() {
  const winner = state.decisionAssistant.currentWinner;
  if (!winner?.id || !winner?.mediaType) return;
  markUserMadeCatalogChoice();
  closeMovieRoulette();

  try {
    const payload = await buildPlayerPayloadFromId(winner.id, winner.mediaType);
    window.location.hash = `${winner.mediaType}-${winner.id}`;
    await openKinoBox(payload);
  } catch (error) {
    console.error('[watchRouletteWinner]', error);
    openPlayerError('Не удалось подготовить плеер для выбранного тайтла. Попробуй крутануть рулетку ещё раз.');
  }
}

function getRouletteItemKey(item) {
  return `${item?.mediaType || 'movie'}:${Number(item?.id || 0)}`;
}

function shuffleArray(input) {
  const array = [...(input || [])];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resetCatalogRuntimeState() {
  closeEpisodeCalendarPopovers();
  disposeCatalogMediaResources(main);
  clearTmdbRuntimeCaches();
}

function scrollToCatalogTopInstant() {
  const target = resultsToolbar || main;
  if (!target) {
    window.scrollTo(0, 0);
    return;
  }

  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - 12);
  window.scrollTo({ top, behavior: 'auto' });
}

function resolveCountryLabel(code, fallback = '') {
  if (countryLabelIntl) {
    try {
      const label = countryLabelIntl.of(code);
      if (label) return label;
    } catch (error) {
      // ignore and fall back below
    }
  }

  return fallback || code;
}

async function loadContent(page = 1) {
  const requestedPage = normalizeCatalogPageNumber(page);
  const loadSeq = state.catalogLoadSeq + 1;
  state.catalogLoadSeq = loadSeq;
  state.catalogLoading = true;
  state.currentPage = requestedPage;
  resetCatalogRuntimeState();
  renderLoading('Загружаем каталог...');
  updatePagination({ forceDisabled: true });

  try {
    const payload = state.showFavoritesOnly ? await fetchFavoritesContent() : (state.query ? (isAiSearchEnabled() ? await fetchAiSearchContent(requestedPage) : await fetchSearchContent(requestedPage)) : await fetchDiscoverContent(requestedPage));

    if (loadSeq !== state.catalogLoadSeq) return;

    state.totalPages = Math.max(1, payload.totalPages || 1);
    state.currentPage = Math.min(requestedPage, state.totalPages);
    state.catalogLoading = false;

    if (!payload.items.length) {
      renderNoResults();
    } else {
      renderMovies(payload.items);
      queueEpisodeCalendarAvailability(payload.items);
    }

    updatePagination();
    updateResultsStatus(payload.statusText || buildStatusText(payload.items.length));
    checkDecisionPromptCountdown();
  } catch (error) {
    if (loadSeq !== state.catalogLoadSeq) return;
    state.catalogLoading = false;
    console.error('[loadContent]', error);
    renderError('Ошибка сети или запроса к TMDB. Попробуй ещё раз чуть позже.');
    updatePagination({ forceDisabled: true });
    updateResultsStatus('Не удалось загрузить данные.');
  }
}

function normalizeCatalogPageNumber(page) {
  const value = Number(page);
  return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;
}

function getCatalogSliceRange(page, pageSize = CATALOG_PAGE_SIZE) {
  const safePage = normalizeCatalogPageNumber(page);
  const start = (safePage - 1) * pageSize;
  return {
    start,
    end: start + pageSize
  };
}

function normalizeSourceTotalPages(value) {
  const total = Number(value || 1);
  if (!Number.isFinite(total) || total < 1) return 1;
  return Math.min(TMDB_MAX_FETCH_PAGE, Math.floor(total));
}

function buildCatalogCollectionKey(mode, extra = {}) {
  return JSON.stringify({
    mode,
    query: state.query || '',
    aiEnabled: isAiSearchEnabled(),
    filters: cloneFilters(state.appliedFilters),
    extra
  });
}

function summarizeAiPlanForCache(plan) {
  if (!plan || typeof plan !== 'object') return null;
  return {
    strategy: plan.strategy || '',
    query: plan.query || '',
    mediaType: plan.mediaType || plan.type || '',
    genres: Array.isArray(plan.genres) ? [...plan.genres].sort() : [],
    keywords: Array.isArray(plan.keywords) ? [...plan.keywords].sort() : [],
    years: plan.years || plan.yearRange || null,
    rating: plan.rating || plan.ratingRange || null
  };
}

function createCatalogPageCache(key, pageSize) {
  return {
    key,
    pageSize,
    seen: new Set(),
    items: [],
    nextRawPage: 1,
    maxRawPages: TMDB_MAX_FETCH_PAGE,
    reachedEnd: false
  };
}

function getCatalogPageCache(cacheKey, pageSize) {
  if (!cacheKey) {
    return createCatalogPageCache('', pageSize);
  }

  const cache = state.catalogPageCache;
  if (!cache || cache.key !== cacheKey || cache.pageSize !== pageSize) {
    state.catalogPageCache = createCatalogPageCache(cacheKey, pageSize);
  }

  return state.catalogPageCache;
}

async function collectFilteredCatalogPage(page, fetchRawPage, options = {}) {
  const safePage = normalizeCatalogPageNumber(page);
  const pageSize = Number(options.pageSize || CATALOG_PAGE_SIZE);
  const { start, end } = getCatalogSliceRange(safePage, pageSize);
  const extraFilter = typeof options.extraFilter === 'function' ? options.extraFilter : null;
  const sorter = typeof options.sorter === 'function' ? options.sorter : null;
  const cache = getCatalogPageCache(options.cacheKey || '', pageSize);

  while (!cache.reachedEnd && cache.items.length < end && cache.nextRawPage <= cache.maxRawPages && cache.nextRawPage <= TMDB_MAX_FETCH_PAGE) {
    const batchPages = [];
    for (let offset = 0; offset < LOGICAL_PAGE_FETCH_BATCH_SIZE; offset += 1) {
      const rawPage = cache.nextRawPage + offset;
      if (rawPage > cache.maxRawPages || rawPage > TMDB_MAX_FETCH_PAGE) break;
      batchPages.push(rawPage);
    }

    if (!batchPages.length) {
      cache.reachedEnd = true;
      break;
    }

    const settled = await Promise.allSettled(batchPages.map((rawPage) => fetchRawPage(rawPage)));
    let fulfilledCount = 0;
    const incoming = [];

    settled.forEach((item) => {
      if (item.status !== 'fulfilled' || !item.value) return;
      fulfilledCount += 1;
      cache.maxRawPages = Math.min(cache.maxRawPages, normalizeSourceTotalPages(item.value.totalPages));

      if (!Array.isArray(item.value.items) || !item.value.items.length) return;
      for (const rawItem of item.value.items) {
        if (!rawItem?.id || !rawItem?.mediaType) continue;
        const key = `${rawItem.mediaType}:${rawItem.id}`;
        if (cache.seen.has(key)) continue;
        cache.seen.add(key);
        incoming.push(rawItem);
      }
    });

    if (!fulfilledCount) {
      cache.reachedEnd = true;
      break;
    }

    if (incoming.length) {
      const hydrated = await hydrateItemsForClientFilters(incoming);
      let batchFiltered = hydrated.filter(matchesClientSideFilters);
      if (extraFilter) {
        batchFiltered = batchFiltered.filter(extraFilter);
      }
      if (sorter) {
        batchFiltered = batchFiltered.sort(sorter);
      }
      cache.items.push(...batchFiltered);
    }

    const lastFetchedPage = batchPages[batchPages.length - 1];
    if (lastFetchedPage >= cache.maxRawPages || lastFetchedPage >= TMDB_MAX_FETCH_PAGE) {
      cache.reachedEnd = true;
      break;
    }

    cache.nextRawPage = lastFetchedPage + 1;
  }

  const items = cache.items.slice(start, end);
  const knownLogicalPages = Math.max(1, Math.ceil(cache.items.length / pageSize));
  const totalPages = cache.reachedEnd ? knownLogicalPages : Math.max(knownLogicalPages, safePage + 1);

  return {
    items,
    totalPages
  };
}

async function fetchDiscoverContent(page) {
  const { type } = state.appliedFilters;

  if (type === 'movie' || type === 'tv') {
    const endpoint = type === 'movie' ? '/discover/movie' : '/discover/tv';
    const payload = await collectFilteredCatalogPage(page, async (rawPage) => {
      const response = await apiFetch(endpoint, buildDiscoverParams(type, rawPage));
      return {
        items: (response.results || []).map((item) => normalizeItem(item, type)),
        totalPages: response.total_pages || 1
      };
    }, {
      cacheKey: buildCatalogCollectionKey('discover', { type })
    });

    return {
      ...payload,
      statusText: buildStatusText(payload.items.length)
    };
  }

  const movieImpossible = hasImpossibleGenreCombination('movie');
  const tvImpossible = hasImpossibleGenreCombination('tv');

  if (movieImpossible && tvImpossible) {
    return {
      items: [],
      totalPages: 1,
      statusText: buildStatusText(0)
    };
  }

  const payload = await collectFilteredCatalogPage(page, async (rawPage) => {
    const [movieResponse, tvResponse] = await Promise.all([
      movieImpossible ? Promise.resolve({ results: [], total_pages: 1 }) : apiFetch('/discover/movie', buildDiscoverParams('movie', rawPage)),
      tvImpossible ? Promise.resolve({ results: [], total_pages: 1 }) : apiFetch('/discover/tv', buildDiscoverParams('tv', rawPage))
    ]);

    return {
      items: [
        ...(movieResponse.results || []).map((item) => normalizeItem(item, 'movie')),
        ...(tvResponse.results || []).map((item) => normalizeItem(item, 'tv'))
      ],
      totalPages: Math.max(movieResponse.total_pages || 1, tvResponse.total_pages || 1)
    };
  }, {
    sorter: sortByPopularity,
    cacheKey: buildCatalogCollectionKey('discover', { type: 'all' })
  });

  return {
    ...payload,
    statusText: buildStatusText(payload.items.length)
  };
}

async function fetchSearchContent(page) {
  const { type } = state.appliedFilters;

  if (type === 'movie' || type === 'tv') {
    const endpoint = type === 'movie' ? '/search/movie' : '/search/tv';
    const payload = await collectFilteredCatalogPage(page, async (rawPage) => {
      const response = await apiFetch(endpoint, buildSearchParams(type, rawPage));
      return {
        items: (response.results || []).map((item) => normalizeItem(item, type)),
        totalPages: response.total_pages || 1
      };
    }, {
      cacheKey: buildCatalogCollectionKey('search', { type })
    });

    return {
      ...payload,
      statusText: buildStatusText(payload.items.length, true)
    };
  }

  const payload = await collectFilteredCatalogPage(page, async (rawPage) => {
    const response = await apiFetch('/search/multi', buildSearchParams('all', rawPage));
    return {
      items: (response.results || [])
        .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
        .map((item) => normalizeItem(item, item.media_type)),
      totalPages: response.total_pages || 1
    };
  }, {
    cacheKey: buildCatalogCollectionKey('search', { type: 'all' })
  });

  return {
    ...payload,
    statusText: buildStatusText(payload.items.length, true)
  };
}

async function fetchFavoritesContent() {
  const favorites = getFavorites();
  if (!favorites.length) {
    return {
      items: [],
      totalPages: 1,
      statusText: 'Избранное пусто.'
    };
  }

  const details = await Promise.all(
    favorites.map(async (entry) => {
      try {
        const endpoint = entry.mediaType === 'tv' ? '/tv/' : '/movie/';
        const data = await apiFetch(`${endpoint}${entry.id}`, { language: 'ru-RU' });
        return normalizeItem(data, entry.mediaType);
      } catch (error) {
        console.warn('[fetchFavoritesContent] failed for', entry, error);
        return null;
      }
    })
  );

  const hydratedItems = await hydrateItemsForClientFilters(details.filter(Boolean));
  const items = hydratedItems.filter(matchesClientSideFilters).sort(sortByPopularity);

  return {
    items,
    totalPages: 1,
    statusText: items.length ? `Показано ${items.length} из избранного.` : 'По текущим фильтрам в избранном ничего не нашлось.'
  };
}

function buildDiscoverParams(mediaType, page) {
  const params = {
    api_key: API_KEY,
    language: 'ru-RU',
    include_adult: 'false',
    sort_by: 'popularity.desc',
    page: String(page)
  };

  const genreIds = getSelectedGenreIdsForType(mediaType);
  if (genreIds.impossible) {
    return params;
  }
  if (genreIds.value) {
    params.with_genres = genreIds.value;
  }

  const { yearFrom, yearTo } = state.appliedFilters;
  if (mediaType === 'movie') {
    if (yearFrom === yearTo) {
      params.year = String(yearFrom);
    } else {
      params['primary_release_date.gte'] = `${yearFrom}-01-01`;
      params['primary_release_date.lte'] = `${yearTo}-12-31`;
    }
  } else {
    if (yearFrom === yearTo) {
      params.first_air_date_year = String(yearFrom);
    } else {
      params['first_air_date.gte'] = `${yearFrom}-01-01`;
      params['first_air_date.lte'] = `${yearTo}-12-31`;
    }
  }

  addRatingParams(params);

  return params;
}

function buildSearchParams(type, page) {
  const params = {
    api_key: API_KEY,
    language: 'ru-RU',
    include_adult: 'false',
    page: String(page),
    query: state.query
  };

  const { yearFrom, yearTo } = state.appliedFilters;
  if (type === 'movie' && yearFrom === yearTo) {
    params.year = String(yearFrom);
  }
  if (type === 'tv' && yearFrom === yearTo) {
    params.first_air_date_year = String(yearFrom);
  }

  return params;
}

function getSelectedGenreIdsForType(mediaType) {
  if (!state.appliedFilters.genres.length) {
    return { impossible: false, value: '' };
  }

  const ids = [];
  for (const selectedKey of state.appliedFilters.genres) {
    const option = state.genresByKey.get(selectedKey);
    if (!option) continue;
    const relevantIds = mediaType === 'movie' ? option.movieIds : option.tvIds;
    if (!relevantIds.length) {
      return { impossible: true, value: '' };
    }
    ids.push(...relevantIds);
  }

  return { impossible: false, value: ids.join(',') };
}

function hasImpossibleGenreCombination(mediaType) {
  return getSelectedGenreIdsForType(mediaType).impossible;
}

function matchesClientSideFilters(item) {
  if (!item) return false;

  const { type, yearFrom, yearTo, genres } = state.appliedFilters;
  if (type !== 'all' && item.mediaType !== type) {
    return false;
  }

  const year = getItemYear(item.releaseDate);
  if (year && (year < yearFrom || year > yearTo)) {
    return false;
  }

  const voteAverage = Number(item.voteAverage || 0);
  if (voteAverage < state.appliedFilters.ratingFrom || voteAverage > state.appliedFilters.ratingTo) {
    return false;
  }

  if (genres.length) {
    for (const selectedKey of genres) {
      const option = state.genresByKey.get(selectedKey);
      if (!option) continue;
      const relevantIds = item.mediaType === 'movie' ? option.movieIds : option.tvIds;
      if (!relevantIds.length) {
        return false;
      }
      if (!relevantIds.some((id) => item.genreIds.includes(id))) {
        return false;
      }
    }
  }

  const activeExcludedCodes = getExcludedCountryCodeSet(state.appliedFilters);
  if (activeExcludedCodes.size) {
    const countryCodes = Array.isArray(item.countryCodes) ? item.countryCodes : [];
    if (countryCodes.some((code) => activeExcludedCodes.has(code))) {
      return false;
    }
  }

  return true;
}

async function hydrateItemsForClientFilters(items) {
  const sanitized = items.filter(Boolean);
  if (!hasActiveExclusions(state.appliedFilters)) {
    return sanitized;
  }

  const hydratedItems = [...sanitized];
  await runTasksWithConcurrency(hydratedItems, 4, async (item) => {
    const enriched = await enrichItemWithCountryData(item);
    Object.assign(item, enriched);
  });

  return hydratedItems;
}

async function enrichItemWithCountryData(item) {
  if (!item?.id || !item?.mediaType) return item;
  if (Array.isArray(item.countryCodes) && item.countryCodes.length) {
    return item;
  }

  const cacheKey = `${item.mediaType}:${item.id}`;
  if (!itemDetailsCache.has(cacheKey)) {
    itemDetailsCache.set(cacheKey, (async () => {
      const details = await apiFetch(`/${item.mediaType}/${item.id}`, { language: 'ru-RU' });
      return {
        countryCodes: extractCountryCodes(details)
      };
    })().catch((error) => {
      itemDetailsCache.delete(cacheKey);
      throw error;
    }));
  }

  try {
    const cachedDetails = await itemDetailsCache.get(cacheKey);
    item.countryCodes = Array.isArray(cachedDetails?.countryCodes) ? cachedDetails.countryCodes : [];
  } catch (error) {
    console.warn('[enrichItemWithCountryData]', item.id, error);
    item.countryCodes = Array.isArray(item.countryCodes) ? item.countryCodes : [];
  }

  return item;
}

function extractCountryCodes(item) {
  const result = new Set();

  if (Array.isArray(item?.production_countries)) {
    item.production_countries.forEach((country) => {
      const code = String(country?.iso_3166_1 || '').trim().toUpperCase();
      if (code) result.add(code);
    });
  }

  if (Array.isArray(item?.origin_country)) {
    item.origin_country.forEach((countryCode) => {
      const code = String(countryCode || '').trim().toUpperCase();
      if (code) result.add(code);
    });
  }

  return Array.from(result);
}

function renderMovies(items) {
  main.innerHTML = '';

  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'movie';
    card.dataset.id = String(item.id);
    card.dataset.mediaType = item.mediaType;

    const safeTitle = escapeHtml(item.title);
    const safeOriginalTitle = escapeHtml(item.originalTitle || item.title);
    const safeOverview = escapeHtml(item.overview || 'Описание отсутствует.');
    const poster = item.posterUrl ? `<img src="${item.posterUrl}" alt="${safeTitle}" loading="lazy" />` : `<div class="movie-poster-placeholder">${safeTitle}</div>`;
    const calendarMarkup = item.mediaType === 'tv' ? `
      <div class="episode-calendar-wrapper hidden" data-tv-id="${item.id}" data-title="${safeTitle}">
        <button class="episode-calendar-btn" type="button" aria-label="Будущие серии" title="Будущие серии">
          ${getCalendarIconSvg()}
        </button>
        <div class="episode-calendar-popover" role="dialog" aria-label="Будущие серии">
          <div class="episode-calendar-popover-inner">
            <div class="episode-calendar-loading">Проверяем даты выхода...</div>
          </div>
        </div>
      </div>
    ` : '';

    card.innerHTML = `
      <div class="movie-poster-wrap">
        ${poster}
        ${calendarMarkup}
        <button class="kinowall-card-btn" data-id="${item.id}" data-media-type="${item.mediaType}" title="Добавить на киностену" aria-label="Добавить на киностену">👤</button>
        <button class="fav-btn" data-id="${item.id}" data-media-type="${item.mediaType}" title="Добавить в избранное">★</button>
      </div>
      <div class="movie-body">
        <div class="movie-info">
          <h3>${safeTitle}</h3>
          <span class="${getColor(item.voteAverage)}">${formatVote(item.voteAverage)}</span>
        </div>
        <div class="movie-meta">
          <div class="movie-meta-line">${item.mediaType === 'tv' ? 'Сериал' : 'Фильм'}</div>
          <div class="movie-meta-line">${escapeHtml(formatFullDate(item.releaseDate))}</div>
        </div>
        <div class="buttons">
          <button class="know-more" data-id="${item.id}" data-media-type="${item.mediaType}" data-title="${safeTitle}" data-original-title="${safeOriginalTitle}" data-overview="${safeOverview}" data-release-date="${escapeHtml(item.releaseDate)}">Подробнее</button>
          <button class="watch-online" data-id="${item.id}" data-media-type="${item.mediaType}">Смотреть</button>
        </div>
      </div>
    `;

    const favBtn = card.querySelector('.fav-btn');
    if (isFavorite(item.id, item.mediaType)) {
      favBtn.classList.add('fav-active');
    }

    const wallBtn = card.querySelector('.kinowall-card-btn');
    if (wallBtn && isInKinoWallShowcase(item.id, item.mediaType)) {
      wallBtn.classList.add('wall-active');
      wallBtn.title = 'Убрать с киностены';
    }

    main.appendChild(card);
  }
}

function renderNoResults() {
  main.innerHTML = `
    <div class="no-results">
      <h2>Ничего не найдено</h2>
      <p style="margin-top:0.65rem;color:var(--muted-text);line-height:1.6;">Попробуй изменить запрос, жанры или диапазон лет.</p>
    </div>
  `;
}

function renderError(message) {
  main.innerHTML = `
    <div class="error-box">
      <h2>Ошибка загрузки</h2>
      <p style="margin-top:0.65rem;color:var(--muted-text);line-height:1.6;">${escapeHtml(message)}</p>
    </div>
  `;
}

function renderLoading(message) {
  main.innerHTML = `
    <div class="loading-box">
      <div class="loading-spinner"></div>
      <h2>Загрузка</h2>
      <p style="margin-top:0.65rem;color:var(--muted-text);line-height:1.6;">${escapeHtml(message)}</p>
    </div>
  `;
}

function updatePagination(options = {}) {
  const forceDisabled = options.forceDisabled === true || state.catalogLoading;
  const singlePage = state.showFavoritesOnly || state.totalPages <= 1;

  paginationBlock.style.display = state.showFavoritesOnly ? 'none' : 'flex';
  current.textContent = String(state.currentPage);

  prev.classList.toggle('disabled', forceDisabled || singlePage || state.currentPage <= 1);
  next.classList.toggle('disabled', forceDisabled || singlePage || state.currentPage >= state.totalPages);
}

function updateResultsStatus(text) {
  resultsStatus.textContent = text;
}

function queueEpisodeCalendarAvailability(items) {
  const tvItems = items.filter((item) => item?.mediaType === 'tv' && item?.id);
  if (!tvItems.length) return;

  void runTasksWithConcurrency(tvItems, EPISODE_CALENDAR_CONCURRENCY, async (item) => {
    try {
      const meta = await getTvCalendarMeta(item.id);
      if (meta?.eligible) {
        activateEpisodeCalendarButton(item.id, meta);
      }
    } catch (error) {
      console.warn('[queueEpisodeCalendarAvailability]', item?.id, error);
    }
  });
}

function activateEpisodeCalendarButton(tvId, meta = {}) {
  const wrapper = document.querySelector(`.episode-calendar-wrapper[data-tv-id="${tvId}"]`);
  if (!wrapper) return;

  wrapper.classList.remove('hidden');
  wrapper.dataset.ready = '1';
  wrapper.dataset.title = meta.showTitle || wrapper.dataset.title || '';

  const inner = wrapper.querySelector('.episode-calendar-popover-inner');
  if (inner && !wrapper.dataset.loaded) {
    const nextEpisodeLine = meta.nextEpisode?.airDate
      ? `<div class="episode-calendar-preview">Следующая серия: ${escapeHtml(formatFullDate(meta.nextEpisode.airDate))}</div>`
      : '<div class="episode-calendar-preview">Будущие серии доступны</div>';

    inner.innerHTML = `
      <div class="episode-calendar-popover-head">
        <div class="episode-calendar-popover-title">Будущие серии</div>
        ${nextEpisodeLine}
      </div>
      <div class="episode-calendar-loading">Наведи курсор или нажми, чтобы загрузить расписание.</div>
    `;
  }
}

async function ensureEpisodeCalendarLoaded(wrapper) {
  if (!wrapper || wrapper.dataset.loaded === '1' || wrapper.dataset.loading === '1') return;

  const tvId = Number(wrapper.dataset.tvId);
  if (!tvId) return;

  wrapper.dataset.loading = '1';
  const inner = wrapper.querySelector('.episode-calendar-popover-inner');
  if (inner) {
    inner.innerHTML = `
      <div class="episode-calendar-popover-head">
        <div class="episode-calendar-popover-title">Будущие серии</div>
        <div class="episode-calendar-loading">Загружаем расписание...</div>
      </div>
    `;
  }

  try {
    const schedule = await getUpcomingEpisodeSchedule(tvId, wrapper.dataset.title || 'Сериал');
    renderEpisodeCalendarPopover(wrapper, schedule);
    wrapper.dataset.loaded = '1';
  } catch (error) {
    console.error('[ensureEpisodeCalendarLoaded]', tvId, error);
    if (inner) {
      inner.innerHTML = `
        <div class="episode-calendar-popover-head">
          <div class="episode-calendar-popover-title">Будущие серии</div>
        </div>
        <div class="episode-calendar-error">Не удалось загрузить расписание серий.</div>
      `;
    }
  } finally {
    wrapper.dataset.loading = '0';
  }
}

function renderEpisodeCalendarPopover(wrapper, schedule) {
  const inner = wrapper.querySelector('.episode-calendar-popover-inner');
  if (!inner) return;

  wrapper.__episodeCalendarSchedule = schedule || null;

  if (!schedule?.episodes?.length) {
    inner.innerHTML = `
      <div class="episode-calendar-popover-head">
        <div class="episode-calendar-popover-title">Будущие серии</div>
        <div class="episode-calendar-preview">${escapeHtml(schedule?.showTitle || wrapper.dataset.title || 'Сериал')}</div>
      </div>
      <div class="episode-calendar-empty">TMDb не вернул даты следующих серий.</div>
    `;
    return;
  }

  const rows = schedule.episodes.map((episode) => {
    const code = formatEpisodeCode(episode.seasonNumber, episode.episodeNumber);
    return `
      <div class="episode-calendar-item">
        <div class="episode-calendar-item-main">
          <div class="episode-calendar-item-code">${escapeHtml(code)}</div>
          <div class="episode-calendar-item-title">${escapeHtml(resolveEpisodeName(episode.name, '', episode.episodeNumber))}</div>
          <div class="episode-calendar-item-date">${escapeHtml(formatFullDate(episode.airDate))}</div>
        </div>
        <a class="episode-calendar-add-btn" href="${buildGoogleCalendarUrl(schedule.showTitle, episode, { tvId: schedule.tvId, mediaType: 'tv' })}" target="_blank" rel="noopener noreferrer">Добавить в Google Календарь</a>
      </div>
    `;
  }).join('');

  const footer = schedule.totalUpcomingCount > schedule.episodes.length
    ? `<div class="episode-calendar-footer">Показано ${schedule.episodes.length} из ${schedule.totalUpcomingCount} будущих серий.</div>`
    : '';

  inner.innerHTML = `
    <div class="episode-calendar-popover-head">
      <div class="episode-calendar-popover-title">Будущие серии</div>
      <div class="episode-calendar-preview">${escapeHtml(schedule.showTitle || wrapper.dataset.title || 'Сериал')}</div>    </div>
    <div class="episode-calendar-list">${rows}</div>
    ${footer}
  `;
}



function setEpisodeCalendarLayerState(wrapper, active) {
  const card = wrapper?.closest('.movie');
  if (!card) return;

  if (card.__episodeCalendarLayerTimer) {
    clearTimeout(card.__episodeCalendarLayerTimer);
    card.__episodeCalendarLayerTimer = null;
  }

  if (active) {
    card.classList.add('calendar-layer-active');
  } else {
    card.classList.remove('calendar-layer-active');
  }
}

function scheduleEpisodeCalendarLayerDeactivate(wrapper) {
  const card = wrapper?.closest('.movie');
  if (!card) return;

  if (card.__episodeCalendarLayerTimer) {
    clearTimeout(card.__episodeCalendarLayerTimer);
  }

  card.__episodeCalendarLayerTimer = setTimeout(() => {
    const shouldStayActive = wrapper.matches(':hover') || wrapper.classList.contains('popover-open') || wrapper.contains(document.activeElement);
    if (!shouldStayActive) {
      card.classList.remove('calendar-layer-active');
    }
    card.__episodeCalendarLayerTimer = null;
  }, 180);
}

function positionEpisodeCalendarPopover(wrapper) {
  const popover = wrapper?.querySelector('.episode-calendar-popover');
  if (!popover) return;

  popover.style.left = '0';
  popover.style.right = 'auto';

  const rect = popover.getBoundingClientRect();
  if (rect.right > window.innerWidth - 12) {
    popover.style.left = 'auto';
    popover.style.right = '0';
  }

  const adjustedRect = popover.getBoundingClientRect();
  if (adjustedRect.left < 12) {
    popover.style.left = `${12 - wrapper.getBoundingClientRect().left}px`;
    popover.style.right = 'auto';
  }
}

function closeEpisodeCalendarPopovers(exceptWrapper = null) {
  document.querySelectorAll('.episode-calendar-wrapper.popover-open').forEach((wrapper) => {
    if (exceptWrapper && wrapper === exceptWrapper) return;
    wrapper.classList.remove('popover-open');
    scheduleEpisodeCalendarLayerDeactivate(wrapper);
  });
}

function isTerminalTvStatus(status) {
  const normalized = String(status || '').trim().toLowerCase();
  return normalized === 'ended' || normalized === 'canceled' || normalized === 'cancelled';
}

function normalizeUpcomingEpisode(rawEpisode, fallbackSeasonNumber = 0) {
  const airDate = String(rawEpisode?.air_date || '').trim();
  if (!airDate) return null;

  return {
    airDate,
    seasonNumber: Number(rawEpisode?.season_number || fallbackSeasonNumber || 0),
    episodeNumber: Number(rawEpisode?.episode_number || 0),
    name: resolveEpisodeName(rawEpisode?.name, rawEpisode?.fallback_name, rawEpisode?.episode_number)
  };
}

function getRelevantUpcomingSeasonNumbers(details, preferredSeasonNumber = 0) {
  const seasons = Array.isArray(details?.seasons) ? details.seasons : [];
  const fallbackSeasonNumber = Number(details?.last_episode_to_air?.season_number || 0);
  const minSeasonNumber = Math.max(1, Number(preferredSeasonNumber || 0), fallbackSeasonNumber || 1);

  const seasonNumbers = seasons
    .map((season) => Number(season?.season_number || 0))
    .filter((seasonNumber) => Number.isFinite(seasonNumber) && seasonNumber >= minSeasonNumber)
    .sort((a, b) => a - b);

  if (seasonNumbers.length) {
    return Array.from(new Set(seasonNumbers));
  }

  return minSeasonNumber > 0 ? [minSeasonNumber] : [];
}

async function buildUpcomingEpisodeScheduleFromDetails(tvId, details, seasonNumbers, fallbackTitle = '', today = getLocalDateString()) {
  const settled = await Promise.allSettled(
    seasonNumbers.map((seasonNumber) => fetchSeasonWithFallbackNames(tvId, seasonNumber))
  );

  const upcoming = [];

  for (const result of settled) {
    if (result.status !== 'fulfilled') continue;

    for (const episode of result.value?.episodes || []) {
      const normalizedEpisode = normalizeUpcomingEpisode(episode, result.value?.season_number || 0);
      if (!normalizedEpisode?.airDate || normalizedEpisode.airDate <= today) continue;
      upcoming.push(normalizedEpisode);
    }
  }

  upcoming.sort((a, b) => {
    if (a.airDate !== b.airDate) return a.airDate.localeCompare(b.airDate);
    if (a.seasonNumber !== b.seasonNumber) return a.seasonNumber - b.seasonNumber;
    return a.episodeNumber - b.episodeNumber;
  });

  const uniqueEpisodes = dedupeUpcomingEpisodes(upcoming);

  return {
    tvId,
    showTitle: details?.name || details?.original_name || fallbackTitle || 'Сериал',
    totalUpcomingCount: uniqueEpisodes.length,
    allEpisodes: uniqueEpisodes,
    episodes: uniqueEpisodes.slice(0, EPISODE_CALENDAR_MAX_ITEMS)
  };
}

async function getTvCalendarMeta(tvId) {
  if (tvCalendarMetaCache.has(tvId)) {
    return tvCalendarMetaCache.get(tvId);
  }

  const promise = (async () => {
    const details = await apiFetch(`/tv/${tvId}`, { language: 'ru-RU' });
    const today = getLocalDateString();
    const showTitle = details?.name || details?.original_name || '';
    const terminalStatus = isTerminalTvStatus(details?.status);
    const directNextEpisode = normalizeUpcomingEpisode(details?.next_episode_to_air);
    let eligible = Boolean(!terminalStatus && directNextEpisode?.airDate && directNextEpisode.airDate > today);
    let nextEpisode = directNextEpisode;

    if (!eligible && !terminalStatus) {
      const seasonNumbers = getRelevantUpcomingSeasonNumbers(details, directNextEpisode?.seasonNumber || 0);
      if (seasonNumbers.length) {
        const probedSchedule = await buildUpcomingEpisodeScheduleFromDetails(tvId, details, seasonNumbers, showTitle, today);
        if (probedSchedule.totalUpcomingCount > 0) {
          eligible = true;
          nextEpisode = probedSchedule.allEpisodes[0] || probedSchedule.episodes[0] || nextEpisode;
          tvEpisodeScheduleCache.set(tvId, Promise.resolve(probedSchedule));
        }
      }
    }

    return {
      eligible,
      tvId,
      details,
      showTitle,
      nextEpisode
    };
  })();

  tvCalendarMetaCache.set(tvId, promise);
  return promise;
}

async function getUpcomingEpisodeSchedule(tvId, fallbackTitle = '') {
  if (tvEpisodeScheduleCache.has(tvId)) {
    return tvEpisodeScheduleCache.get(tvId);
  }

  const promise = (async () => {
    const meta = await getTvCalendarMeta(tvId);
    const details = meta?.details || await apiFetch(`/tv/${tvId}`, { language: 'ru-RU' });
    const seasonNumbers = getRelevantUpcomingSeasonNumbers(details, meta?.nextEpisode?.seasonNumber || 0);

    return buildUpcomingEpisodeScheduleFromDetails(
      tvId,
      details,
      seasonNumbers,
      meta?.showTitle || fallbackTitle,
      getLocalDateString()
    );
  })();

  tvEpisodeScheduleCache.set(tvId, promise);
  return promise;
}

function dedupeUpcomingEpisodes(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.airDate}-${item.seasonNumber}-${item.episodeNumber}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatEpisodeCode(seasonNumber, episodeNumber) {
  const season = String(Math.max(0, Number(seasonNumber || 0))).padStart(2, '0');
  const episode = String(Math.max(0, Number(episodeNumber || 0))).padStart(2, '0');
  return `S${season}E${episode}`;
}

function isGenericEpisodeName(name, episodeNumber = 0) {
  const normalized = String(name || '').trim();
  if (!normalized) return true;

  const genericPatterns = [
    /^эпизод\s+\d+$/i,
    /^серия\s+\d+$/i,
    /^episode\s+\d+$/i,
    /^episodio\s+\d+$/i,
    /^cap[ií]tulo\s+\d+$/i,
    /^قسمت\s+\d+$/i
  ];

  if (genericPatterns.some((pattern) => pattern.test(normalized))) {
    return true;
  }

  if (episodeNumber) {
    const number = String(Number(episodeNumber));
    const lowered = normalized.toLowerCase();
    if (lowered === `эпизод ${number}` || lowered === `серия ${number}` || lowered === `episode ${number}`) {
      return true;
    }
  }

  return false;
}

function resolveEpisodeName(primaryName, fallbackName = '', episodeNumber = 0) {
  const primary = String(primaryName || '').trim();
  if (primary && !isGenericEpisodeName(primary, episodeNumber)) {
    return primary;
  }

  const fallback = String(fallbackName || '').trim();
  if (fallback && !isGenericEpisodeName(fallback, episodeNumber)) {
    return fallback;
  }

  return `Серия ${episodeNumber || ''}`.trim();
}

async function fetchSeasonWithFallbackNames(tvId, seasonNumber) {
  const [localizedResult, fallbackResult] = await Promise.allSettled([
    apiFetch(`/tv/${tvId}/season/${seasonNumber}`, { language: 'ru-RU' }),
    apiFetch(`/tv/${tvId}/season/${seasonNumber}`)
  ]);

  const localized = localizedResult.status === 'fulfilled' ? localizedResult.value : null;
  const fallback = fallbackResult.status === 'fulfilled' ? fallbackResult.value : null;

  if (!localized && !fallback) {
    throw new Error(`Failed to load season ${seasonNumber}`);
  }

  const localizedEpisodes = Array.isArray(localized?.episodes) ? localized.episodes : [];
  const fallbackEpisodes = Array.isArray(fallback?.episodes) ? fallback.episodes : [];
  const fallbackByEpisodeNumber = new Map(
    fallbackEpisodes.map((episode) => [String(episode?.episode_number || ''), episode])
  );

  const baseEpisodes = localizedEpisodes.length ? localizedEpisodes : fallbackEpisodes;
  const mergedEpisodes = baseEpisodes.map((episode) => {
    const fallbackEpisode = fallbackByEpisodeNumber.get(String(episode?.episode_number || '')) || null;
    return {
      ...(fallbackEpisode || {}),
      ...episode,
      fallback_name: fallbackEpisode?.name || '',
      name: resolveEpisodeName(episode?.name, fallbackEpisode?.name, episode?.episode_number || fallbackEpisode?.episode_number || 0),
      season_number: episode?.season_number || fallbackEpisode?.season_number || seasonNumber
    };
  });

  return {
    ...(localized || fallback),
    season_number: localized?.season_number || fallback?.season_number || seasonNumber,
    episodes: mergedEpisodes
  };
}

function buildWatchUrl(id, mediaType = 'movie') {
  const numericId = Number(id);
  const normalizedType = mediaType === 'tv' ? 'tv' : 'movie';
  const url = new URL(window.location.href);
  if (numericId) {
    url.hash = `${normalizedType}-${numericId}`;
  }
  return url.toString();
}

function buildGoogleCalendarUrl(showTitle, episode, options = {}) {
  const start = episode?.airDate || '';
  const end = getNextDateString(start);
  const episodeCode = formatEpisodeCode(episode?.seasonNumber, episode?.episodeNumber);
  const title = `${showTitle} — ${episodeCode}`;
  const watchUrl = buildWatchUrl(options?.tvId || options?.id || 0, options?.mediaType || 'tv');
  const details = `${showTitle}
${episodeCode}
Дата выхода: ${formatFullDate(start)}
Смотреть: ${watchUrl}`;
  const url = new URL(GOOGLE_CALENDAR_BASE_URL);
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('dates', `${start.replaceAll('-', '')}/${end.replaceAll('-', '')}`);
  url.searchParams.set('details', details);
  return url.toString();
}

function getNextDateString(dateString) {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return '';
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  date.setDate(date.getDate() + 1);
  return getLocalDateString(date);
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function runTasksWithConcurrency(items, limit, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) {
      const currentItem = queue.shift();
      if (!currentItem) return;
      await worker(currentItem);
    }
  });

  await Promise.allSettled(runners);
}

function getCalendarIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm12 8H5v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8ZM7 12h3v3H7v-3Z" fill="currentColor"></path>
    </svg>
  `;
}

function buildStatusText(count, searchMode = false) {
  const parts = [];
  if (state.showFavoritesOnly) {
    parts.push(`Избранное: ${count}`);
  } else if (searchMode) {
    parts.push(`Найдено на странице: ${count}`);
  } else {
    parts.push(`Показано: ${count}`);
  }

  if (state.query) {
    parts.push(`запрос: «${state.query}»`);
  }

  const typeLabel = state.appliedFilters.type === 'movie' ? 'только фильмы' : state.appliedFilters.type === 'tv' ? 'только сериалы' : 'фильмы и сериалы';
  parts.push(typeLabel);

  if (state.appliedFilters.yearFrom === state.appliedFilters.yearTo) {
    parts.push(`год: ${state.appliedFilters.yearFrom}`);
  } else {
    parts.push(`годы: ${state.appliedFilters.yearFrom}–${state.appliedFilters.yearTo}`);
  }

  if (state.appliedFilters.ratingFrom !== MIN_RATING || state.appliedFilters.ratingTo !== MAX_RATING) {
    parts.push(`рейтинг: ${formatRatingControlValue(state.appliedFilters.ratingFrom)}–${formatRatingControlValue(state.appliedFilters.ratingTo)}`);
  }

  if (state.appliedFilters.genres.length) {
    const labels = state.appliedFilters.genres
      .map((key) => state.genresByKey.get(key)?.label)
      .filter(Boolean)
      .join(', ');
    if (labels) {
      parts.push(`жанры: ${labels}`);
    }
  }

  const activeExcludedValues = getActiveExcludedValues(state.appliedFilters);
  if (activeExcludedValues.length) {
    const labels = state.appliedFilters.excludeMode === 'regions'
      ? activeExcludedValues.map((key) => state.regionsByKey.get(key)?.label || key).filter(Boolean).join(', ')
      : activeExcludedValues.map((code) => state.countriesByCode.get(code)?.label || code).filter(Boolean).join(', ');

    if (labels) {
      parts.push(state.appliedFilters.excludeMode === 'regions' ? `исключены регионы: ${labels}` : `исключены страны: ${labels}`);
    }
  }

  return parts.join(' • ');
}

function resolveGenreLabelsForItem(mediaType, detailsGenres = [], fallbackGenreIds = []) {
  if (Array.isArray(detailsGenres) && detailsGenres.length) {
    return Array.from(new Set(detailsGenres
      .map((genre) => normalizeGenreLabel(genre))
      .filter(Boolean)));
  }

  if (!Array.isArray(fallbackGenreIds) || !fallbackGenreIds.length) {
    return [];
  }

  const ids = fallbackGenreIds.map((id) => Number(id));
  const labels = state.genres
    .filter((genre) => {
      const relevantIds = mediaType === 'tv' ? genre.tvIds : genre.movieIds;
      return relevantIds.some((id) => ids.includes(Number(id)));
    })
    .map((genre) => genre.label)
    .filter(Boolean);

  return Array.from(new Set(labels));
}

function buildOverlayGenresMarkup(mediaType, detailsGenres = [], fallbackGenreIds = []) {
  const labels = resolveGenreLabelsForItem(mediaType, detailsGenres, fallbackGenreIds);
  if (!labels.length) return '';

  const tags = labels
    .map((label) => `<span class="overlay-genre-chip">${escapeHtml(label)}</span>`)
    .join('');

  return `
    <div class="overlay-genres" aria-label="Жанры">
      ${tags}
    </div>
  `;
}

async function openNav(item) {
  try {
    const details = await apiFetch(`/${item.mediaType}/${item.id}`, {
      language: 'ru-RU',
      append_to_response: 'videos',
      include_video_language: 'ru-RU,ru,en-US,en,null'
    });

    const fallbackVideos = !details?.videos?.results?.length
      ? await apiFetch(`/${item.mediaType}/${item.id}/videos`, {
          include_video_language: 'ru-RU,ru,en-US,en,null'
        }).catch(() => ({ results: [] }))
      : null;

    const videos = prioritizeVideos((details?.videos?.results || fallbackVideos?.results || []).filter((video) => {
      return video.site === 'YouTube' && video.key;
    }));

    overlay.style.width = '100%';
    overlay.setAttribute('aria-hidden', 'false');

    const title = item.originalTitle || item.title || details.original_title || details.original_name || details.title || details.name;
    const resolvedOverview = item.overview || details.overview || 'Описание отсутствует.';
    const resolvedDate = item.releaseDate || details.release_date || details.first_air_date || '';
    const subtitle = `${item.mediaType === 'tv' ? 'Сериал' : 'Фильм'} • ${formatFullDate(resolvedDate)}`;
    const genresMarkup = buildOverlayGenresMarkup(item.mediaType, details?.genres, item.genreIds);

    if (videos.length) {
      const isLocalFile = window.location.protocol === 'file:';
      const embed = videos.map((video) => {
        const safeTitle = escapeHtml(video.name || title);
        if (isLocalFile) {
          return `
            <div class="embed embed-fallback hide">
              <img class="embed-fallback-thumb" src="https://img.youtube.com/vi/${video.key}/hqdefault.jpg" alt="${safeTitle}" />
              <div class="embed-fallback-body">
                <div class="embed-fallback-title">${safeTitle}</div>
                <div class="embed-fallback-text">Локально через file:// YouTube-встраивание может не работать. Открой сайт через http/https или запусти ролик прямо на YouTube.</div>
                <a class="embed-fallback-link" href="https://www.youtube.com/watch?v=${video.key}" target="_blank" rel="noopener noreferrer">Открыть на YouTube</a>
              </div>
            </div>
          `;
        }
        return `
          <iframe
            src="${buildYouTubeEmbedUrl(video.key)}"
            class="embed hide"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            title="${safeTitle}"
          ></iframe>
        `;
      });
      const dots = videos.map((_, index) => `<span class="dot">${index + 1}</span>`);

      overlayContent.innerHTML = `
        <div class="overlay-headline">
          <div class="overlay-title">${escapeHtml(title)}</div>
          <div class="overlay-subtitle">${escapeHtml(subtitle)}</div>
          ${genresMarkup}
        </div>
        ${embed.join('')}
        <div class="dots">${dots.join('')}</div>
        <div class="overlay-overview">
          <h3 style="margin-bottom:0.65rem;">Описание</h3>
          ${escapeHtml(resolvedOverview)}
        </div>
      `;

      activeSlide = 0;
      showVideos();
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
          activeSlide = index;
          showVideos();
        });
      });
    } else {
      overlayContent.innerHTML = `
        <div class="overlay-headline">
          <div class="overlay-title">${escapeHtml(title)}</div>
          <div class="overlay-subtitle">${escapeHtml(subtitle)}</div>
          ${genresMarkup}
        </div>
        <div class="overlay-overview">
          <h3 style="margin-bottom:0.65rem;">Трейлеры не найдены</h3>
          ${escapeHtml(resolvedOverview)}
        </div>
      `;
    }
  } catch (error) {
    console.error('[openNav]', error);
    overlay.style.width = '100%';
    overlay.setAttribute('aria-hidden', 'false');
    overlayContent.innerHTML = '<h1 class="no-results">Не удалось загрузить информацию о трейлере</h1>';
  }
}


function buildYouTubeEmbedUrl(videoKey) {
  const params = new URLSearchParams({
    rel: '0',
    playsinline: '1',
    enablejsapi: '1'
  });

  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    params.set('origin', window.location.origin);
  }

  return `https://www.youtube.com/embed/${videoKey}?${params.toString()}`;
}

function prioritizeVideos(videos) {
  return [...videos].sort((a, b) => {
    const scoreA = getVideoPriority(a);
    const scoreB = getVideoPriority(b);
    if (scoreA !== scoreB) return scoreB - scoreA;
    const dateA = Date.parse(a.published_at || '') || 0;
    const dateB = Date.parse(b.published_at || '') || 0;
    return dateB - dateA;
  });
}

function getVideoPriority(video) {
  let score = 0;
  const type = String(video?.type || '').toLowerCase();
  const language = String(video?.iso_639_1 || '').toLowerCase();

  if (video?.official) score += 1000;
  if (type === 'trailer') score += 500;
  else if (type === 'teaser') score += 300;
  else if (type === 'clip') score += 200;
  else if (type === 'behind the scenes') score += 100;

  if (language === 'ru') score += 50;
  else if (language === 'en') score += 25;
  else if (!language || language === 'null') score += 10;

  return score;
}

function closeNav() {
  overlay.style.width = '0%';
  overlay.setAttribute('aria-hidden', 'true');
}

function showVideos() {
  const embeds = document.querySelectorAll('.embed');
  const dots = document.querySelectorAll('.dot');
  totalVideos = embeds.length;

  embeds.forEach((embed, index) => {
    embed.classList.toggle('show', index === activeSlide);
    embed.classList.toggle('hide', index !== activeSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeSlide);
  });
}

function normalizeItem(item, mediaTypeHint = 'movie') {
  const mediaType = item.media_type || mediaTypeHint;
  const genreIds = Array.isArray(item.genre_ids)
    ? item.genre_ids.slice()
    : Array.isArray(item.genres)
      ? item.genres.map((genre) => genre.id)
      : [];

  const title = item.title || item.name || item.original_title || item.original_name || 'Без названия';
  const originalTitle = item.original_title || item.original_name || title;
  const releaseDate = item.release_date || item.first_air_date || '';
  const posterPath = item.poster_path || item.backdrop_path || '';

  return {
    id: Number(item.id),
    mediaType,
    title,
    originalTitle,
    overview: item.overview || '',
    releaseDate,
    voteAverage: Number(item.vote_average || 0),
    popularity: Number(item.popularity || 0),
    genreIds,
    countryCodes: extractCountryCodes(item),
    posterUrl: posterPath ? buildImageUrl(posterPath) : ''
  };
}

function buildImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${state.imageBaseUrl}${path}`;
}

function sortByPopularity(a, b) {
  return Number(b.popularity || 0) - Number(a.popularity || 0);
}

async function apiFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  const preparedParams = { ...params };
  if (!preparedParams.api_key) {
    preparedParams.api_key = API_KEY;
  }

  Object.entries(preparedParams).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }
  return response.json();
}

function clampRating(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return MIN_RATING;
  const rounded = Math.round(number * 10) / 10;
  return Math.max(MIN_RATING, Math.min(MAX_RATING, rounded));
}

function formatRatingControlValue(value) {
  const rating = clampRating(value);
  return Number.isInteger(rating) ? String(rating) : rating.toFixed(1);
}

function addRatingParams(params) {
  const from = clampRating(state.appliedFilters.ratingFrom);
  const to = clampRating(state.appliedFilters.ratingTo);
  if (from > MIN_RATING) {
    params['vote_average.gte'] = formatRatingControlValue(from);
  }
  if (to < MAX_RATING) {
    params['vote_average.lte'] = formatRatingControlValue(to);
  }
}

function clampYear(year) {
  if (!Number.isFinite(year)) return MIN_YEAR;
  return Math.max(MIN_YEAR, Math.min(CURRENT_YEAR, Math.round(year)));
}

function getItemYear(dateString) {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return null;
  return Number(dateString.slice(0, 4));
}

function formatVote(vote) {
  if (!vote) return '—';
  return Number(vote).toFixed(1);
}

function getColor(vote) {
  if (vote >= 8) return 'green';
  if (vote >= 5) return 'orange';
  return 'red';
}

function formatFullDate(dateString) {
  if (!dateString) return 'Дата неизвестна';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'Дата неизвестна';
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function makeGenreKey(label) {
  return String(label || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zа-яё0-9-]/gi, '');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getFavorites() {
  const raw = JSON.parse(localStorage.getItem('favMovies') || '[]');
  return raw
    .map((entry) => {
      if (typeof entry === 'number') {
        return { id: entry, mediaType: 'movie' };
      }
      if (entry && typeof entry.id !== 'undefined') {
        return {
          id: Number(entry.id),
          mediaType: entry.mediaType === 'tv' ? 'tv' : 'movie'
        };
      }
      return null;
    })
    .filter((entry) => entry && entry.id);
}

function saveFavorites(items) {
  localStorage.setItem('favMovies', JSON.stringify(items));
}

function isFavorite(id, mediaType) {
  return getFavorites().some((entry) => entry.id === Number(id) && entry.mediaType === mediaType);
}

function toggleFavorite(item) {
  const favorites = getFavorites();
  const index = favorites.findIndex((entry) => entry.id === Number(item.id) && entry.mediaType === item.mediaType);
  if (index === -1) {
    favorites.push({ id: Number(item.id), mediaType: item.mediaType });
  } else {
    favorites.splice(index, 1);
  }
  saveFavorites(favorites);
}

async function buildPlayerPayloadFromId(id, mediaType) {
  const endpointPrefix = mediaType === 'tv' ? '/tv/' : '/movie/';
  const [details, externalIds] = await Promise.all([
    apiFetch(`${endpointPrefix}${id}`, { language: 'ru-RU' }),
    apiFetch(`${endpointPrefix}${id}/external_ids`)
  ]);

  const title = details.title || details.name || details.original_title || details.original_name || (mediaType === 'tv' ? 'Сериал' : 'Фильм');
  document.title = title;

  return sanitizeMovieData({
    tmdb: String(id),
    imdb: externalIds.imdb_id || '',
    title,
    year: (details.release_date || details.first_air_date || '').slice(0, 4),
    poster: details.poster_path ? buildImageUrl(details.poster_path) : '',
    originalTitle: details.original_title || details.original_name || '',
    overview: details.overview || '',
    mediaType
  });
}

async function buildPlayerPayloadFromHash(hashVal) {
  if (!hashVal) throw new Error('Empty hash');

  if (hashVal.startsWith('movie-')) {
    return buildPlayerPayloadFromId(hashVal.substring(6), 'movie');
  }

  if (hashVal.startsWith('tv-')) {
    return buildPlayerPayloadFromId(hashVal.substring(3), 'tv');
  }

  if (hashVal.startsWith('tm')) {
    return buildPlayerPayloadFromId(hashVal.substring(2), 'movie');
  }

  if (hashVal.startsWith('tt')) {
    const imdbId = hashVal.toLowerCase();
    const findRes = await apiFetch(`/find/${imdbId}`, { language: 'ru-RU', external_source: 'imdb_id' });
    const movie = findRes?.movie_results?.[0] || findRes?.tv_results?.[0] || null;
    return sanitizeMovieData({
      imdb: imdbId,
      tmdb: movie?.id ? String(movie.id) : '',
      title: movie?.title || movie?.name || movie?.original_title || movie?.original_name || imdbId,
      year: (movie?.release_date || movie?.first_air_date || '').slice(0, 4),
      poster: movie?.poster_path ? buildImageUrl(movie.poster_path) : '',
      originalTitle: movie?.original_title || movie?.original_name || '',
      overview: movie?.overview || '',
      mediaType: movie?.media_type === 'tv' ? 'tv' : 'movie'
    });
  }

  const normalizedKp = hashVal.startsWith('kp') ? hashVal.substring(2) : hashVal;
  return sanitizeMovieData({ kinopoisk: normalizedKp, title: 'RMP Player' });
}

function sanitizeMovieData(input = {}) {
  const payload = {
    tmdb: input.tmdb ? String(input.tmdb).trim() : '',
    imdb: input.imdb ? String(input.imdb).trim() : '',
    kinopoisk: input.kinopoisk ? String(input.kinopoisk).trim() : '',
    title: input.title ? String(input.title).trim() : '',
    year: input.year ? String(input.year).trim() : '',
    poster: input.poster ? String(input.poster).trim() : '',
    originalTitle: input.originalTitle ? String(input.originalTitle).trim() : '',
    overview: input.overview ? String(input.overview).trim() : '',
    mediaType: input.mediaType === 'tv' ? 'tv' : 'movie'
  };

  if (!payload.tmdb && !payload.imdb && !payload.kinopoisk && !payload.title) {
    throw new Error('Movie payload is empty');
  }

  return payload;
}

async function fetchKinoboxSources(movieData) {
  const apiURL = new URL(KINOBOX_API);
  ['imdb', 'tmdb', 'kinopoisk', 'title'].forEach((key) => {
    if (movieData[key]) {
      apiURL.searchParams.set(key, movieData[key]);
    }
  });

  const request = await fetch(apiURL.toString(), { method: 'GET' });
  if (!request.ok || request.status !== 200) {
    throw new Error(`Request failed with status ${request.status}`);
  }

  const response = await request.json();
  if (typeof response !== 'object' || response === null || !Array.isArray(response.data)) {
    throw new Error('Invalid response format');
  }

  const playersData = response.data.filter((player) => player?.iframeUrl && player?.type);
  const turboIndex = playersData.findIndex((player) => String(player.type).toLowerCase() === 'turbo');
  if (turboIndex !== -1) {
    playersData.push(playersData.splice(turboIndex, 1)[0]);
  }
  return playersData;
}

function renderPlayerShell(meta = {}) {
  const safeTitle = escapeHtml(meta.title || meta.originalTitle || 'Онлайн-просмотр');
  const safeSubtitle = [
    meta.mediaType === 'tv' ? 'Сериал' : (meta.mediaType ? 'Фильм' : ''),
    meta.year,
    meta.imdb ? `IMDb: ${escapeHtml(meta.imdb)}` : '',
    meta.kinopoisk ? `KP: ${escapeHtml(meta.kinopoisk)}` : '',
    meta.tmdb ? `TMDB: ${escapeHtml(meta.tmdb)}` : ''
  ].filter(Boolean).join(' • ');

  document.body.innerHTML = `
    <div id="rmp-player-shell" style="position:fixed;inset:0;background:#0b0b0f;color:#fff;z-index:99999;display:flex;flex-direction:column;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.45);backdrop-filter:blur(10px);">
        <div style="display:flex;flex-direction:column;gap:4px;min-width:0;">
          <div style="font-size:20px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safeTitle}</div>
          <div style="font-size:12px;color:rgba(255,255,255,.65);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safeSubtitle || 'Подбираем доступные источники...'}</div>
        </div>
        <button id="rmp-home-button" style="flex:0 0 auto;background:#fff;color:#111;font-size:14px;font-weight:700;border:0;border-radius:999px;padding:10px 16px;cursor:pointer;">← На главную</button>
      </div>
      <div style="flex:1;display:flex;align-items:stretch;justify-content:center;padding:18px;overflow:auto;">
        <div style="width:min(1480px,100%);display:flex;flex-direction:column;gap:14px;">
          <div id="rmp-sources" style="display:flex;flex-wrap:wrap;gap:10px;"></div>
          <div id="rmp-player-content" style="width:100%;min-height:min(78vh,900px);border-radius:18px;overflow:hidden;background:#111;box-shadow:0 25px 80px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;"></div>
          <div id="rmp-player-status" style="font-size:12px;color:rgba(255,255,255,.6);text-align:center;line-height:1.5;">Подключаемся к Kinobox API...</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('rmp-home-button').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

function setPlayerStatus(message) {
  const statusEl = document.getElementById('rmp-player-status');
  if (statusEl) {
    statusEl.textContent = message;
  }
}

function showPlayerPlaceholder(message) {
  const contentEl = document.getElementById('rmp-player-content');
  if (!contentEl) return;
  contentEl.innerHTML = `<div style="padding:24px;text-align:center;color:rgba(255,255,255,.7);font-size:18px;line-height:1.6;max-width:720px;">${escapeHtml(message)}</div>`;
}

function selectKinoboxSource(sourceData) {
  const contentEl = document.getElementById('rmp-player-content');
  if (!contentEl) return;

  const iframe = document.createElement('iframe');
  iframe.src = sourceData.iframeUrl;
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'origin';
  iframe.style.width = '100%';
  iframe.style.height = 'min(78vh, 900px)';
  iframe.style.border = '0';
  iframe.style.background = '#111';

  contentEl.innerHTML = '';
  contentEl.appendChild(iframe);
  setPlayerStatus(`Источник: ${sourceData.type}. Если плеер пустой, попробуй другой источник или включи VPN.`);
}

function renderKinoboxSources(sourcesData) {
  const sourcesEl = document.getElementById('rmp-sources');
  if (!sourcesEl) return;

  sourcesEl.innerHTML = '';
  const preferredSource = localStorage.getItem('preferred-source');
  let preferredIndex = sourcesData.findIndex((source) => source.type === preferredSource);
  if (preferredIndex === -1) preferredIndex = 0;

  sourcesData.forEach((source, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = source.type;
    button.style.background = index === preferredIndex ? '#ffffff' : 'rgba(255,255,255,.08)';
    button.style.color = index === preferredIndex ? '#111111' : '#ffffff';
    button.style.border = '1px solid rgba(255,255,255,.12)';
    button.style.borderRadius = '999px';
    button.style.padding = '10px 14px';
    button.style.cursor = 'pointer';
    button.style.fontWeight = '700';
    button.style.transition = 'transform .15s ease, background .15s ease';

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-1px)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', () => {
      sourcesEl.querySelectorAll('button').forEach((el) => {
        el.style.background = 'rgba(255,255,255,.08)';
        el.style.color = '#ffffff';
      });
      button.style.background = '#ffffff';
      button.style.color = '#111111';
      localStorage.setItem('preferred-source', source.type);
      selectKinoboxSource(source);
    });

    sourcesEl.appendChild(button);
  });

  selectKinoboxSource(sourcesData[preferredIndex]);
}

async function openKinoBox(meta) {
  markUserMadeCatalogChoice();
  recordKinoWallWatched(meta);
  renderPlayerShell(meta);
  showPlayerPlaceholder('Подбираем доступные источники...');

  try {
    const sources = await fetchKinoboxSources(meta);
    if (!sources.length) {
      showPlayerPlaceholder('Источники не найдены. Попробуй другой фильм, открой страницу позже или проверь VPN/доступность сервиса в твоей сети.');
      setPlayerStatus('Kinobox API ответил, но источники для этого запроса не нашлись.');
      return;
    }
    renderKinoboxSources(sources);
  } catch (error) {
    console.error('[openKinoBox]', error);
    showPlayerPlaceholder('Не удалось получить данные от Kinobox API. Проверь, доступен ли сервис из твоей сети, и попробуй включить VPN.');
    setPlayerStatus(`Ошибка загрузки источников: ${error.message}`);
  }
}

function openPlayerError(message) {
  document.body.innerHTML = `
    <div style="position:fixed;inset:0;background:#0b0b0f;color:#fff;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;">
      <div style="max-width:720px;width:100%;background:#14141b;border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:28px;box-shadow:0 20px 60px rgba(0,0,0,.4);text-align:center;">
        <h1 style="margin:0 0 12px;font-size:28px;">Не удалось открыть плеер</h1>
        <p style="margin:0 0 20px;color:rgba(255,255,255,.72);line-height:1.6;">${escapeHtml(message)}</p>
        <button onclick="window.location.href='index.html'" style="background:#fff;color:#111;border:0;border-radius:999px;padding:12px 18px;font-size:15px;font-weight:700;cursor:pointer;">← Вернуться на главную</button>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.hash) return;
  const rawHash = window.location.hash.substring(1);
  if (isKinoWallShareHash(rawHash)) {
    await openKinoWallFromHashIfNeeded();
    return;
  }
  if (!isPlayerRouteHash(rawHash)) return;
  markUserMadeCatalogChoice();
  try {
    const payload = await buildPlayerPayloadFromHash(rawHash);
    await openKinoBox(payload);
  } catch (error) {
    console.error('[DOMContentLoaded hash open]', error);
    openPlayerError('Не удалось открыть фильм по ссылке. Ссылка могла устареть или источник сейчас недоступен.');
  }
});




function isKinoWallShareHash(hashValue = window.location.hash) {
  const rawHash = String(hashValue || '').replace(/^#/, '').trim();
  return rawHash.startsWith(KINOWALL_SHARE_HASH_PREFIX);
}

function createDefaultKinoWallProfile() {
  return {
    version: KINOWALL_VERSION,
    name: 'Киноман',
    handle: 'rmp-user',
    status: 'выбираю кино по вайбу, а не по совести',
    bio: 'Моя личная киностена: любимые тайтлы, сцены, саундтреки и статистика просмотров.',
    vibe: 'ночной кинотеатр, неон и “ещё одну серию”',
    avatarUrl: '',
    bannerUrl: '',
    accentColor: '#5f9cff',
    showcase: [],
    watched: [],
    favorites: [],
    actors: [
      { name: 'Любимый актёр', note: 'сюда можно вписать своих людей кино', imageUrl: '' }
    ],
    scenes: [
      { title: 'Сцена, которую хочется пересматривать', note: 'коротко опиши момент или вставь ссылку на кадр', imageUrl: '' }
    ],
    soundtracks: [
      { title: 'Тот самый саундтрек', artist: 'исполнитель / фильм', url: '' }
    ],
    updatedAt: new Date().toISOString()
  };
}

function normalizeKinoWallProfile(profile = {}) {
  const fallback = createDefaultKinoWallProfile();
  const normalized = {
    ...fallback,
    ...profile,
    name: sanitizeKinoWallText(profile.name || fallback.name, 42),
    handle: sanitizeKinoWallHandle(profile.handle || fallback.handle),
    status: sanitizeKinoWallText(profile.status || fallback.status, 90),
    bio: sanitizeKinoWallText(profile.bio || fallback.bio, 420),
    vibe: sanitizeKinoWallText(profile.vibe || fallback.vibe, 120),
    avatarUrl: sanitizeKinoWallUrl(profile.avatarUrl || ''),
    bannerUrl: sanitizeKinoWallUrl(profile.bannerUrl || ''),
    accentColor: normalizeHexColor(profile.accentColor || fallback.accentColor, fallback.accentColor),
    showcase: normalizeKinoWallEntries(profile.showcase || []),
    watched: normalizeKinoWallEntries(profile.watched || []),
    favorites: normalizeKinoWallEntries(profile.favorites || []),
    actors: normalizeKinoWallPeople(profile.actors || []),
    scenes: normalizeKinoWallTextCards(profile.scenes || []),
    soundtracks: normalizeKinoWallSoundtracks(profile.soundtracks || []),
    updatedAt: profile.updatedAt || fallback.updatedAt
  };
  return normalized;
}

function sanitizeKinoWallText(value, maxLength = 240) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function sanitizeKinoWallLongText(value, maxLength = 1200) {
  return String(value || '').replace(/\r\n/g, '\n').trim().slice(0, maxLength);
}

function sanitizeKinoWallHandle(value) {
  const handle = String(value || '').trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32);
  return handle || 'rmp-user';
}

function sanitizeKinoWallUrl(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  if (/^(https?:\/\/|data:image\/)/i.test(url)) return url.slice(0, 900);
  return '';
}

function normalizeKinoWallEntries(entries = []) {
  const seen = new Set();
  const result = [];
  entries.forEach((entry) => {
    const id = Number(entry?.id || entry?.tmdb || 0);
    const mediaType = entry?.mediaType === 'tv' ? 'tv' : 'movie';
    if (!id) return;
    const key = `${mediaType}:${id}`;
    if (seen.has(key)) return;
    seen.add(key);
    result.push({
      id,
      mediaType,
      addedAt: entry?.addedAt || new Date().toISOString(),
      note: sanitizeKinoWallText(entry?.note || '', 140)
    });
  });
  return result;
}

function normalizeKinoWallPeople(items = []) {
  return items
    .map((item) => ({
      name: sanitizeKinoWallText(item?.name || '', 60),
      note: sanitizeKinoWallText(item?.note || '', 160),
      imageUrl: sanitizeKinoWallUrl(item?.imageUrl || '')
    }))
    .filter((item) => item.name || item.note || item.imageUrl)
    .slice(0, 40);
}

function normalizeKinoWallTextCards(items = []) {
  return items
    .map((item) => ({
      title: sanitizeKinoWallText(item?.title || '', 80),
      note: sanitizeKinoWallText(item?.note || '', 220),
      imageUrl: sanitizeKinoWallUrl(item?.imageUrl || '')
    }))
    .filter((item) => item.title || item.note || item.imageUrl)
    .slice(0, 60);
}

function normalizeKinoWallSoundtracks(items = []) {
  return items
    .map((item) => ({
      title: sanitizeKinoWallText(item?.title || '', 90),
      artist: sanitizeKinoWallText(item?.artist || '', 90),
      url: sanitizeKinoWallUrl(item?.url || '')
    }))
    .filter((item) => item.title || item.artist || item.url)
    .slice(0, 80);
}

function readKinoWallProfile() {
  try {
    const raw = localStorage.getItem(KINOWALL_STORAGE_KEY);
    if (!raw) return createDefaultKinoWallProfile();
    return normalizeKinoWallProfile(JSON.parse(raw));
  } catch (error) {
    console.warn('[kinowall] profile read failed', error);
    return createDefaultKinoWallProfile();
  }
}

function saveKinoWallProfile(profile) {
  const normalized = normalizeKinoWallProfile({ ...profile, updatedAt: new Date().toISOString() });
  localStorage.setItem(KINOWALL_STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

function isSameKinoWallEntry(a, b) {
  return Number(a?.id) === Number(b?.id) && (a?.mediaType === 'tv' ? 'tv' : 'movie') === (b?.mediaType === 'tv' ? 'tv' : 'movie');
}

function isInKinoWallShowcase(id, mediaType) {
  const profile = readKinoWallProfile();
  return profile.showcase.some((entry) => isSameKinoWallEntry(entry, { id, mediaType }));
}

function toggleKinoWallShowcase(entry) {
  const profile = readKinoWallProfile();
  const index = profile.showcase.findIndex((item) => isSameKinoWallEntry(item, entry));
  if (index === -1) {
    profile.showcase.unshift({ id: Number(entry.id), mediaType: entry.mediaType === 'tv' ? 'tv' : 'movie', addedAt: new Date().toISOString() });
  } else {
    profile.showcase.splice(index, 1);
  }
  saveKinoWallProfile(profile);
}

function recordKinoWallWatched(meta = {}) {
  const id = Number(meta.tmdb || meta.id || 0);
  const mediaType = meta.mediaType === 'tv' ? 'tv' : 'movie';
  if (!id) return;
  const profile = readKinoWallProfile();
  const existingIndex = profile.watched.findIndex((entry) => isSameKinoWallEntry(entry, { id, mediaType }));
  const nextEntry = { id, mediaType, addedAt: new Date().toISOString() };
  if (existingIndex !== -1) {
    profile.watched.splice(existingIndex, 1);
  }
  profile.watched.unshift(nextEntry);
  saveKinoWallProfile(profile);
}

function closeKinoWall() {
  if (!kinoWallOverlay) return;
  kinoWallOverlay.classList.add('hidden');
  kinoWallOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('kinowall-open');
}

async function openKinoWall(options = {}) {
  if (!kinoWallOverlay || !kinoWallContent) return;
  state.decisionAssistant.promptDismissed = true;
  hideDecisionPrompt();
  const profile = options.profile ? normalizeKinoWallProfile(options.profile) : readKinoWallProfile();
  const readOnly = Boolean(options.readOnly);
  kinoWallOverlay.classList.remove('hidden');
  kinoWallOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('kinowall-open');
  renderKinoWallLoading(profile, readOnly);

  try {
    const data = await buildKinoWallRenderData(profile, readOnly);
    renderKinoWall(data);
  } catch (error) {
    console.error('[kinowall] render failed', error);
    kinoWallContent.innerHTML = `
      <div class="kinowall-error">
        <h2>Киностена споткнулась</h2>
        <p>Не удалось собрать данные TMDB. Локальный профиль цел, попробуй открыть ещё раз.</p>
        <button type="button" class="kw-btn kw-primary" data-kw-action="overview">Повторить</button>
      </div>
    `;
  }
}

function renderKinoWallLoading(profile, readOnly = false) {
  const initial = escapeHtml((profile.name || 'К').slice(0, 1).toUpperCase());
  kinoWallContent.innerHTML = `
    <section class="kinowall-hero is-loading" style="--kw-accent:${escapeHtml(profile.accentColor)};${profile.bannerUrl ? `--kw-banner-image:url('${escapeHtml(profile.bannerUrl)}');` : ''}">
      <div class="kinowall-hero-bg"></div>
      <div class="kinowall-avatar">${profile.avatarUrl ? `<img src="${escapeHtml(profile.avatarUrl)}" alt="">` : `<span>${initial}</span>`}</div>
      <div class="kinowall-hero-text">
        <div class="kinowall-kicker">${readOnly ? 'shared kinowall' : 'local kinowall'}</div>
        <h1>${escapeHtml(profile.name)}</h1>
        <p>Собираю тайтлы, статистику и достижения...</p>
      </div>
    </section>
    <div class="kinowall-loading-card"><span class="loader"></span><b>Загрузка киностены</b></div>
  `;
}

async function buildKinoWallRenderData(profile, readOnly = false) {
  const favorites = readOnly ? normalizeKinoWallEntries(profile.favorites || []) : getFavorites();
  const allEntries = dedupeKinoWallEntries([
    ...profile.showcase,
    ...profile.watched,
    ...favorites
  ]);

  const details = await fetchKinoWallDetailsBatch(allEntries);
  const detailsByKey = new Map(details.map((item) => [buildKinoWallEntryKey(item), item]));
  const showcase = profile.showcase.map((entry) => detailsByKey.get(buildKinoWallEntryKey(entry))).filter(Boolean);
  const watched = profile.watched.map((entry) => detailsByKey.get(buildKinoWallEntryKey(entry))).filter(Boolean);
  const favoriteItems = favorites.map((entry) => detailsByKey.get(buildKinoWallEntryKey(entry))).filter(Boolean);
  const stats = buildKinoWallStats(profile, { showcase, watched, favorites: favoriteItems, all: details });
  const achievements = buildKinoWallAchievements(stats, details);

  return { profile, readOnly, showcase, watched, favorites: favoriteItems, stats, achievements, allDetails: details };
}

function buildKinoWallEntryKey(entry) {
  return `${entry?.mediaType === 'tv' ? 'tv' : 'movie'}:${Number(entry?.id || 0)}`;
}

function dedupeKinoWallEntries(entries = []) {
  const map = new Map();
  entries.forEach((entry) => {
    const id = Number(entry?.id || 0);
    const mediaType = entry?.mediaType === 'tv' ? 'tv' : 'movie';
    if (!id) return;
    const key = `${mediaType}:${id}`;
    if (!map.has(key)) {
      map.set(key, { id, mediaType, addedAt: entry.addedAt || new Date().toISOString() });
    }
  });
  return Array.from(map.values());
}

async function fetchKinoWallDetailsBatch(entries = []) {
  const result = [];
  await runTasksWithConcurrency(entries.slice(0, 160), 6, async (entry) => {
    const details = await fetchKinoWallEntryDetails(entry).catch((error) => {
      console.warn('[kinowall] details failed', entry, error);
      return null;
    });
    if (details) result.push(details);
  });
  return result;
}

async function fetchKinoWallEntryDetails(entry) {
  const id = Number(entry?.id || 0);
  const mediaType = entry?.mediaType === 'tv' ? 'tv' : 'movie';
  if (!id) return null;
  const cacheKey = `kw:${mediaType}:${id}`;
  if (!itemDetailsCache.has(cacheKey)) {
    itemDetailsCache.set(cacheKey, (async () => {
      const details = await apiFetch(`/${mediaType}/${id}`, { language: 'ru-RU' });
      const title = details.title || details.name || details.original_title || details.original_name || (mediaType === 'tv' ? 'Сериал' : 'Фильм');
      const releaseDate = details.release_date || details.first_air_date || '';
      return {
        id,
        mediaType,
        title,
        originalTitle: details.original_title || details.original_name || title,
        overview: details.overview || '',
        releaseDate,
        year: getItemYear(releaseDate) || '',
        voteAverage: Number(details.vote_average || 0),
        voteCount: Number(details.vote_count || 0),
        popularity: Number(details.popularity || 0),
        posterUrl: details.poster_path ? buildImageUrl(details.poster_path) : '',
        backdropUrl: details.backdrop_path ? `${state.imageBackdropBaseUrl}${details.backdrop_path}` : '',
        genres: resolveGenreLabelsForItem(mediaType, details.genres || [], []),
        genreIds: Array.isArray(details.genres) ? details.genres.map((genre) => Number(genre.id)).filter(Boolean) : [],
        runtime: mediaType === 'tv' ? Number(details.number_of_episodes || 0) : Number(details.runtime || 0),
        collection: details.belongs_to_collection?.name || '',
        status: details.status || ''
      };
    })().catch((error) => {
      itemDetailsCache.delete(cacheKey);
      throw error;
    }));
  }
  const cached = await itemDetailsCache.get(cacheKey);
  return { ...cached, addedAt: entry.addedAt || '' };
}

function buildKinoWallStats(profile, lists) {
  const watched = lists.watched || [];
  const favorites = lists.favorites || [];
  const all = dedupeKinoWallDetails([...(lists.all || []), ...watched, ...favorites]);
  const genreCounts = new Map();
  const yearCounts = new Map();
  const collectionCounts = new Map();
  let movieCount = 0;
  let tvCount = 0;
  let totalRating = 0;
  let ratedCount = 0;

  watched.forEach((item) => {
    if (item.mediaType === 'tv') tvCount += 1;
    else movieCount += 1;
    if (item.voteAverage) {
      totalRating += item.voteAverage;
      ratedCount += 1;
    }
    item.genres.forEach((genre) => genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1));
    if (item.year) yearCounts.set(String(item.year), (yearCounts.get(String(item.year)) || 0) + 1);
    if (item.collection) collectionCounts.set(item.collection, (collectionCounts.get(item.collection) || 0) + 1);
  });

  const topGenres = Array.from(genreCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const years = Array.from(yearCounts.entries()).sort((a, b) => Number(a[0]) - Number(b[0]));
  const avgRating = ratedCount ? totalRating / ratedCount : 0;
  const collectionMax = Math.max(0, ...Array.from(collectionCounts.values()));

  return {
    watchedTotal: watched.length,
    favoriteTotal: favorites.length,
    showcaseTotal: profile.showcase.length,
    movieCount,
    tvCount,
    avgRating,
    topGenres,
    years,
    collectionMax,
    actorsTotal: profile.actors.length,
    scenesTotal: profile.scenes.length,
    soundtracksTotal: profile.soundtracks.length,
    all
  };
}

function dedupeKinoWallDetails(items = []) {
  const map = new Map();
  items.forEach((item) => {
    if (item?.id) map.set(buildKinoWallEntryKey(item), item);
  });
  return Array.from(map.values());
}

function buildKinoWallAchievements(stats, allDetails = []) {
  const countGenre = (needle) => stats.topGenres.reduce((sum, [genre, count]) => sum + (genre.toLowerCase().includes(needle) ? count : 0), 0);
  const movie = allDetails.find((item) => item.mediaType === 'movie');
  const tv = allDetails.find((item) => item.mediaType === 'tv');
  const highRated = allDetails.find((item) => item.voteAverage >= 8);
  const posterFrom = (item) => item?.backdropUrl || item?.posterUrl || '';
  const defs = [
    { id: 'first-watch', title: 'Первый сеанс', level: 'Общее', target: 1, value: stats.watchedTotal, text: 'На киностене появился первый просмотр. Дальше хуже: каталог уже знает дорогу.', image: posterFrom(movie || tv) },
    { id: 'ten-watch', title: 'Уже не случайность', level: 'Общее', target: 10, value: stats.watchedTotal, text: '10 просмотренных тайтлов. Это уже не фон, это стиль жизни.', image: posterFrom(highRated || movie || tv) },
    { id: 'fifty-watch', title: 'Киноман честной судьбы', level: 'Общее', target: 50, value: stats.watchedTotal, text: '50 тайтлов в истории. Пульт можно выдавать как официальный документ.', image: posterFrom(highRated || movie || tv) },
    { id: 'hundred-watch', title: 'Архивариус ночных сеансов', level: 'Общее', target: 100, value: stats.watchedTotal, text: '100 просмотренных тайтлов. Сон пытался, но проиграл.', image: posterFrom(highRated || movie || tv) },
    { id: 'serial-hostage', title: 'Сериальный заложник', level: 'Формат', target: 10, value: stats.tvCount, text: 'Сериалы уже не смотрятся — они держат в плену сезонами.', image: posterFrom(tv) },
    { id: 'movie-core', title: 'Фильм вместо ужина', level: 'Формат', target: 20, value: stats.movieCount, text: 'Фильмы стали надёжным планом на вечер, даже если плана не было.', image: posterFrom(movie) },
    { id: 'comedy', title: 'Смеховой иммунитет', level: 'Жанровые', target: 10, value: countGenre('комед'), text: 'Комедия прокачана. Сарказм теперь идёт в комплекте.', image: posterFrom(stats.all.find((item) => item.genres.join(' ').toLowerCase().includes('комед'))) },
    { id: 'horror', title: 'Ночной хоррорщик', level: 'Жанровые', target: 10, value: countGenre('ужас') + countGenre('хоррор'), text: 'Страшное больше не пугает. Максимум — просит рекомендацию.', image: posterFrom(stats.all.find((item) => item.genres.join(' ').toLowerCase().includes('ужас'))) },
    { id: 'drama', title: 'Грустно, вкусно, больно', level: 'Жанровые', target: 10, value: countGenre('драм'), text: 'Драма прокачана. Душа получила субтитры.', image: posterFrom(stats.all.find((item) => item.genres.join(' ').toLowerCase().includes('драм'))) },
    { id: 'fantasy', title: 'Портал открыт', level: 'Жанровые', target: 8, value: countGenre('фэнтези') + countGenre('фантаст'), text: 'Фантастика и фэнтези уже подозрительно похожи на домашний адрес.', image: posterFrom(stats.all.find((item) => /фэнтези|фантаст/i.test(item.genres.join(' ')))) },
    { id: 'collector', title: 'Франшизный псих', level: 'Франшизы', target: 4, value: stats.collectionMax, text: 'Несколько частей одной франшизы подряд. Назад дороги уже нет.', image: posterFrom(stats.all.find((item) => item.collection)) },
    { id: 'favorites', title: 'Полка любимого', level: 'Профиль', target: 12, value: stats.favoriteTotal, text: 'Избранное перестало быть списком. Это уже личный музей.', image: posterFrom(stats.all[0]) },
    { id: 'showcase', title: 'Витрина вкуса', level: 'Профиль', target: 8, value: stats.showcaseTotal, text: 'Киностена оформлена тайтлами, за которые не стыдно спорить.', image: posterFrom(stats.all[1] || stats.all[0]) },
    { id: 'soundtracks', title: 'Саундтрек в крови', level: 'Профиль', target: 5, value: stats.soundtracksTotal, text: 'Музыка на стене есть. Значит, у профиля появился пульс.', image: '' },
    { id: 'scenes', title: 'Кадр, который остался', level: 'Профиль', target: 5, value: stats.scenesTotal, text: 'Любимые сцены собраны. Теперь память работает в формате widescreen.', image: '' }
  ];

  return defs.map((achievement) => ({
    ...achievement,
    value: Math.max(0, Number(achievement.value || 0)),
    target: Math.max(1, Number(achievement.target || 1)),
    progress: Math.max(0, Math.min(100, Math.round((Number(achievement.value || 0) / Math.max(1, Number(achievement.target || 1))) * 100))),
    unlocked: Number(achievement.value || 0) >= Number(achievement.target || 1)
  }));
}

function renderKinoWall(data, activeTab = 'overview') {
  const { profile, readOnly, stats } = data;
  const heroStyle = `--kw-accent:${escapeHtml(profile.accentColor)};${profile.bannerUrl ? `--kw-banner-image:url('${escapeHtml(profile.bannerUrl)}');` : ''}`;
  const initial = escapeHtml((profile.name || 'К').slice(0, 1).toUpperCase());
  kinoWallContent.dataset.kwMode = readOnly ? 'shared' : 'local';
  kinoWallContent.innerHTML = `
    <section class="kinowall-hero" style="${heroStyle}">
      <div class="kinowall-hero-bg"></div>
      <div class="kinowall-avatar">${profile.avatarUrl ? `<img src="${escapeHtml(profile.avatarUrl)}" alt="${escapeHtml(profile.name)}">` : `<span>${initial}</span>`}</div>
      <div class="kinowall-hero-text">
        <div class="kinowall-kicker">${readOnly ? 'shared kinowall' : 'local kinowall'}</div>
        <h1 id="kinoWallTitle">${escapeHtml(profile.name)}</h1>
        <p>${escapeHtml(profile.status)}</p>
        <div class="kinowall-vibe">${escapeHtml(profile.vibe)}</div>
      </div>
      <div class="kinowall-hero-actions">
        ${readOnly ? '<button type="button" class="kw-btn kw-secondary" data-kw-action="save-shared">Сохранить себе</button>' : '<button type="button" class="kw-btn kw-primary" data-kw-action="edit">Редактировать</button>'}
        <button type="button" class="kw-btn kw-secondary" data-kw-action="share">Поделиться</button>
      </div>
    </section>

    <nav class="kinowall-tabs" aria-label="Разделы киностены">
      <button type="button" class="kinowall-tab ${activeTab === 'overview' ? 'active' : ''}" data-kw-tab="overview">Обзор</button>
      <button type="button" class="kinowall-tab ${activeTab === 'achievements' ? 'active' : ''}" data-kw-tab="achievements">Достижения</button>
      ${readOnly ? '' : `<button type="button" class="kinowall-tab ${activeTab === 'edit' ? 'active' : ''}" data-kw-tab="edit">Редактор</button>`}
      <button type="button" class="kinowall-tab ${activeTab === 'share' ? 'active' : ''}" data-kw-tab="share">Шаринг</button>
    </nav>

    <div class="kinowall-tab-body" id="kinoWallTabBody"></div>
  `;
  bindKinoWallShellEvents(data);
  renderKinoWallTab(data, activeTab);
}

function bindKinoWallShellEvents(data) {
  kinoWallContent.querySelectorAll('[data-kw-tab]').forEach((button) => {
    button.addEventListener('click', () => renderKinoWall(data, button.dataset.kwTab));
  });
  kinoWallContent.querySelectorAll('[data-kw-action]').forEach((button) => {
    button.addEventListener('click', async () => {
      const action = button.dataset.kwAction;
      if (action === 'edit') renderKinoWall(data, 'edit');
      if (action === 'share') renderKinoWall(data, 'share');
      if (action === 'save-shared') {
        saveKinoWallProfile(data.profile);
        button.textContent = 'Сохранено локально';
        button.disabled = true;
      }
    });
  });
}

function renderKinoWallTab(data, tab) {
  const body = document.getElementById('kinoWallTabBody');
  if (!body) return;
  if (tab === 'achievements') {
    body.innerHTML = renderKinoWallAchievementsTab(data);
  } else if (tab === 'edit' && !data.readOnly) {
    body.innerHTML = renderKinoWallEditorTab(data);
    bindKinoWallEditorEvents(data);
  } else if (tab === 'share') {
    body.innerHTML = renderKinoWallShareTab(data);
    bindKinoWallShareEvents(data);
  } else {
    body.innerHTML = renderKinoWallOverviewTab(data);
    bindKinoWallOverviewEvents(data);
  }
}

function renderKinoWallOverviewTab(data) {
  const { profile, stats, showcase, watched, favorites } = data;
  return `
    <section class="kinowall-grid-top">
      <div class="kinowall-about-card">
        <div class="kinowall-section-title">Обо мне</div>
        <p>${escapeHtml(profile.bio)}</p>
        <div class="kinowall-mini-stats">
          ${renderKinoWallMetric('Просмотрено', stats.watchedTotal)}
          ${renderKinoWallMetric('Избранное', stats.favoriteTotal)}
          ${renderKinoWallMetric('На стене', stats.showcaseTotal)}
          ${renderKinoWallMetric('Средний рейтинг', stats.avgRating ? stats.avgRating.toFixed(1) : '—')}
        </div>
      </div>
      <div class="kinowall-chart-card">
        <div class="kinowall-section-title">Активность просмотров</div>
        ${renderKinoWallYearChart(stats.years)}
      </div>
    </section>

    ${renderKinoWallTitleRail('Витрина вкуса', showcase, 'showcase', data.readOnly)}
    ${renderKinoWallTitleRail('История просмотров', watched.slice(0, 18), 'watched', data.readOnly)}
    ${renderKinoWallTitleRail('Избранное из каталога', favorites.slice(0, 18), 'favorites', data.readOnly)}

    <section class="kinowall-columns">
      <div class="kinowall-panel">
        <div class="kinowall-section-title">Любимые актёры / люди кино</div>
        <div class="kinowall-people-grid">${profile.actors.length ? profile.actors.map(renderKinoWallPerson).join('') : renderKinoWallEmpty('Добавь актёров в редакторе.')}</div>
      </div>
      <div class="kinowall-panel">
        <div class="kinowall-section-title">Саундтреки</div>
        <div class="kinowall-soundtrack-list">${profile.soundtracks.length ? profile.soundtracks.map(renderKinoWallSoundtrack).join('') : renderKinoWallEmpty('Сюда можно добавить треки, которые держат вайб.')}</div>
      </div>
    </section>

    <section class="kinowall-panel">
      <div class="kinowall-section-title">Любимые сцены и кадры</div>
      <div class="kinowall-scene-grid">${profile.scenes.length ? profile.scenes.map(renderKinoWallScene).join('') : renderKinoWallEmpty('Добавь сцены, кадры или моменты в редакторе.')}</div>
    </section>
  `;
}

function renderKinoWallMetric(label, value) {
  return `<div class="kinowall-metric"><b>${escapeHtml(String(value))}</b><span>${escapeHtml(label)}</span></div>`;
}

function renderKinoWallYearChart(years = []) {
  if (!years.length) return '<div class="kinowall-empty-small">История появится после нажатия «Смотреть».</div>';
  const max = Math.max(1, ...years.map(([, count]) => Number(count || 0)));
  return `<div class="kinowall-year-chart">${years.map(([year, count]) => {
    const height = Math.max(16, Math.round((Number(count || 0) / max) * 96));
    return `<div class="kinowall-year-bar" title="${escapeHtml(year)}: ${count}" style="height:${height}px"><span>${escapeHtml(year)}</span></div>`;
  }).join('')}</div>`;
}

function renderKinoWallTitleRail(title, items = [], listType = '', readOnly = false) {
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-head-row">
        <div class="kinowall-section-title">${escapeHtml(title)}</div>
        <span>${items.length}</span>
      </div>
      ${items.length ? `<div class="kinowall-title-rail">${items.map((item) => renderKinoWallTitleCard(item, listType, readOnly)).join('')}</div>` : renderKinoWallEmpty(listType === 'showcase' ? 'Нажми 👤 на карточке тайтла, чтобы добавить его сюда.' : 'Пока пусто.')}
    </section>
  `;
}

function renderKinoWallTitleCard(item, listType = '', readOnly = false) {
  const poster = item.posterUrl ? `<img src="${escapeHtml(item.posterUrl)}" alt="${escapeHtml(item.title)}" loading="lazy">` : `<div class="kinowall-poster-fallback">${escapeHtml(item.title)}</div>`;
  return `
    <article class="kinowall-title-card" data-id="${item.id}" data-media-type="${item.mediaType}">
      <div class="kinowall-title-poster">${poster}</div>
      <div class="kinowall-title-info">
        <b>${escapeHtml(item.title)}</b>
        <span>${item.mediaType === 'tv' ? 'Сериал' : 'Фильм'}${item.year ? ` • ${escapeHtml(String(item.year))}` : ''}${item.voteAverage ? ` • ${formatVote(item.voteAverage)}` : ''}</span>
      </div>
      <div class="kinowall-title-actions">
        <button type="button" class="kw-mini-btn" data-kw-watch="${item.id}" data-media-type="${item.mediaType}">Смотреть</button>
        ${!readOnly && listType === 'showcase' ? `<button type="button" class="kw-mini-btn danger" data-kw-remove-showcase="${item.id}" data-media-type="${item.mediaType}">Убрать</button>` : ''}
      </div>
    </article>
  `;
}

function renderKinoWallPerson(item) {
  const avatar = item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}">` : `<span>${escapeHtml((item.name || '?').slice(0, 1).toUpperCase())}</span>`;
  return `<article class="kinowall-person"><div>${avatar}</div><b>${escapeHtml(item.name || 'Без имени')}</b><span>${escapeHtml(item.note || '')}</span></article>`;
}

function renderKinoWallScene(item) {
  const visual = item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}">` : '<div class="kinowall-scene-gradient"></div>';
  return `<article class="kinowall-scene"><div class="kinowall-scene-image">${visual}</div><div><b>${escapeHtml(item.title || 'Сцена')}</b><p>${escapeHtml(item.note || '')}</p></div></article>`;
}

function renderKinoWallSoundtrack(item) {
  const content = `<b>${escapeHtml(item.title || 'Саундтрек')}</b><span>${escapeHtml(item.artist || '')}</span>`;
  return item.url
    ? `<a class="kinowall-soundtrack" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${content}</a>`
    : `<div class="kinowall-soundtrack">${content}</div>`;
}

function renderKinoWallEmpty(text) {
  return `<div class="kinowall-empty-small">${escapeHtml(text)}</div>`;
}

function bindKinoWallOverviewEvents(data) {
  kinoWallContent.querySelectorAll('[data-kw-watch]').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = Number(button.dataset.kwWatch);
      const mediaType = button.dataset.mediaType === 'tv' ? 'tv' : 'movie';
      const payload = await buildPlayerPayloadFromId(id, mediaType);
      window.location.hash = `${mediaType}-${id}`;
      await openKinoBox(payload);
    });
  });
  kinoWallContent.querySelectorAll('[data-kw-remove-showcase]').forEach((button) => {
    button.addEventListener('click', async () => {
      const profile = readKinoWallProfile();
      const id = Number(button.dataset.kwRemoveShowcase);
      const mediaType = button.dataset.mediaType === 'tv' ? 'tv' : 'movie';
      profile.showcase = profile.showcase.filter((entry) => !isSameKinoWallEntry(entry, { id, mediaType }));
      saveKinoWallProfile(profile);
      await openKinoWall();
      await loadContent(state.currentPage).catch(() => {});
    });
  });
}

function renderKinoWallAchievementsTab(data) {
  const unlocked = data.achievements.filter((item) => item.unlocked).length;
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-head-row">
        <div>
          <div class="kinowall-section-title">Достижения</div>
          <p class="kinowall-muted">Открыто ${unlocked} из ${data.achievements.length}. Прогресс считается локально по просмотрам, избранному и оформлению профиля.</p>
        </div>
        <div class="kinowall-achievement-score">${unlocked}/${data.achievements.length}</div>
      </div>
      <div class="kinowall-achievement-grid">
        ${data.achievements.map(renderKinoWallAchievement).join('')}
      </div>
    </section>
  `;
}

function renderKinoWallAchievement(item) {
  const image = item.image ? `style="--kw-achievement-image:url('${escapeHtml(item.image)}')"` : '';
  return `
    <article class="kinowall-achievement ${item.unlocked ? 'unlocked' : 'locked'}" ${image}>
      <div class="kinowall-achievement-image"></div>
      <div class="kinowall-achievement-body">
        <div class="kinowall-achievement-level">${escapeHtml(item.level)} • ${item.progress}%</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
        <div class="kinowall-progress"><span style="width:${item.progress}%"></span></div>
        <small>${item.value}/${item.target}</small>
      </div>
    </article>
  `;
}

function renderKinoWallEditorTab(data) {
  const profile = data.profile;
  return `
    <form id="kinoWallEditorForm" class="kinowall-editor-form">
      <section class="kinowall-panel">
        <div class="kinowall-section-title">Профиль</div>
        <div class="kinowall-form-grid">
          ${renderKinoWallInput('name', 'Имя на стене', profile.name, 42)}
          ${renderKinoWallInput('handle', 'Короткий ник для шаринга', profile.handle, 32)}
          ${renderKinoWallInput('status', 'Статус', profile.status, 90)}
          ${renderKinoWallInput('vibe', 'Любимый вайб', profile.vibe, 120)}
          ${renderKinoWallInput('avatarUrl', 'URL аватара', profile.avatarUrl, 900)}
          ${renderKinoWallInput('bannerUrl', 'URL баннера', profile.bannerUrl, 900)}
          <label class="kinowall-field"><span>Акцент профиля</span><input name="accentColor" type="color" value="${escapeHtml(profile.accentColor)}"></label>
        </div>
        <label class="kinowall-field wide"><span>Обо мне</span><textarea name="bio" rows="4" maxlength="420">${escapeHtml(profile.bio)}</textarea></label>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Витрина тайтлов</div>
        <p class="kinowall-muted">Нажимай кнопку 👤 на карточках каталога, чтобы добавлять/убирать тайтлы. Здесь можно быстро убрать лишнее.</p>
        <div class="kinowall-title-rail editor">${data.showcase.length ? data.showcase.map((item) => renderKinoWallTitleCard(item, 'showcase', false)).join('') : renderKinoWallEmpty('Пока пусто. Добавь тайтлы кнопкой 👤 в каталоге.')}</div>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Любимые актёры / люди кино</div>
        <p class="kinowall-muted">Формат строки: Имя | короткая заметка | URL картинки. Картинка необязательна.</p>
        <textarea name="actorsRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallPeople(profile.actors))}</textarea>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Любимые сцены / кадры</div>
        <p class="kinowall-muted">Формат строки: Название сцены | описание | URL кадра. Можно добавлять свои ссылки на изображения.</p>
        <textarea name="scenesRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallCards(profile.scenes))}</textarea>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Саундтреки</div>
        <p class="kinowall-muted">Формат строки: Название | исполнитель/фильм | ссылка.</p>
        <textarea name="soundtracksRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallSoundtracks(profile.soundtracks))}</textarea>
      </section>

      <div class="kinowall-editor-actions">
        <button type="submit" class="kw-btn kw-primary">Сохранить киностену</button>
        <button type="button" class="kw-btn kw-secondary" data-kw-editor-action="reset-demo">Вернуть демо-блоки</button>
      </div>
    </form>
  `;
}

function renderKinoWallInput(name, label, value, maxLength) {
  return `<label class="kinowall-field"><span>${escapeHtml(label)}</span><input name="${escapeHtml(name)}" type="text" maxlength="${maxLength}" value="${escapeHtml(value || '')}"></label>`;
}

function serializeKinoWallPeople(items = []) {
  return items.map((item) => [item.name, item.note, item.imageUrl].filter((value, index) => index < 2 || value).join(' | ')).join('\n');
}

function serializeKinoWallCards(items = []) {
  return items.map((item) => [item.title, item.note, item.imageUrl].filter((value, index) => index < 2 || value).join(' | ')).join('\n');
}

function serializeKinoWallSoundtracks(items = []) {
  return items.map((item) => [item.title, item.artist, item.url].filter((value, index) => index < 2 || value).join(' | ')).join('\n');
}

function parsePipeList(raw, mapper) {
  return String(raw || '').split(/\r?\n/g).map((line) => line.trim()).filter(Boolean).map((line) => mapper(line.split('|').map((part) => part.trim()))).filter(Boolean);
}

function bindKinoWallEditorEvents(data) {
  bindKinoWallOverviewEvents(data);
  const formEl = document.getElementById('kinoWallEditorForm');
  formEl?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const current = readKinoWallProfile();
    const nextProfile = saveKinoWallProfile({
      ...current,
      name: formData.get('name'),
      handle: formData.get('handle'),
      status: formData.get('status'),
      vibe: formData.get('vibe'),
      avatarUrl: formData.get('avatarUrl'),
      bannerUrl: formData.get('bannerUrl'),
      accentColor: formData.get('accentColor'),
      bio: sanitizeKinoWallLongText(formData.get('bio'), 420),
      actors: parsePipeList(formData.get('actorsRaw'), ([name, note, imageUrl]) => ({ name, note, imageUrl })),
      scenes: parsePipeList(formData.get('scenesRaw'), ([title, note, imageUrl]) => ({ title, note, imageUrl })),
      soundtracks: parsePipeList(formData.get('soundtracksRaw'), ([title, artist, url]) => ({ title, artist, url }))
    });
    await openKinoWall({ profile: nextProfile });
  });

  kinoWallContent.querySelector('[data-kw-editor-action="reset-demo"]')?.addEventListener('click', async () => {
    const profile = readKinoWallProfile();
    const demo = createDefaultKinoWallProfile();
    profile.actors = demo.actors;
    profile.scenes = demo.scenes;
    profile.soundtracks = demo.soundtracks;
    saveKinoWallProfile(profile);
    await openKinoWall();
  });
}

function renderKinoWallShareTab(data) {
  const shareText = data.readOnly ? 'Это профиль, открытый по ссылке. Его можно сохранить себе или скопировать дальше.' : 'Ссылка хранит только лёгкие данные профиля: ID тайтлов, текстовые блоки и оформление. Картинки тайтлов подтянутся через TMDB.';
  const link = buildKinoWallShareLink(data.profile);
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-title">Красивый шаринг</div>
      <p class="kinowall-muted">${escapeHtml(shareText)}</p>
      <div class="kinowall-share-box">
        <textarea id="kinoWallShareLink" readonly rows="4">${escapeHtml(link)}</textarea>
        <div class="kinowall-share-actions">
          <button type="button" class="kw-btn kw-primary" data-kw-share-action="copy">Скопировать ссылку</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="export">Экспорт JSON</button>
          ${data.readOnly ? '' : '<label class="kw-btn kw-secondary kw-file-label">Импорт JSON<input id="kinoWallImportFile" type="file" accept="application/json,.json" hidden></label>'}
        </div>
        <div id="kinoWallShareStatus" class="kinowall-share-status"></div>
      </div>
    </section>
  `;
}

function bindKinoWallShareEvents(data) {
  const status = document.getElementById('kinoWallShareStatus');
  const shareField = document.getElementById('kinoWallShareLink');
  kinoWallContent.querySelector('[data-kw-share-action="copy"]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareField.value);
      if (status) status.textContent = 'Ссылка скопирована.';
    } catch (error) {
      shareField.select();
      if (status) status.textContent = 'Не удалось скопировать автоматически. Ссылка выделена — скопируй вручную.';
    }
  });

  kinoWallContent.querySelector('[data-kw-share-action="export"]')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data.profile, null, 2)], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `rmp-kinowall-${sanitizeKinoWallHandle(data.profile.handle)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  document.getElementById('kinoWallImportFile')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const profile = saveKinoWallProfile(JSON.parse(text));
      if (status) status.textContent = 'Профиль импортирован.';
      await openKinoWall({ profile });
    } catch (error) {
      if (status) status.textContent = 'Не удалось импортировать JSON.';
    }
  });
}

function buildKinoWallShareLink(profile) {
  const payload = minimizeKinoWallProfile(profile);
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const url = new URL(window.location.href);
  url.hash = `${KINOWALL_SHARE_HASH_PREFIX}${encoded}`;
  return url.toString();
}

function minimizeKinoWallProfile(profile) {
  const normalized = normalizeKinoWallProfile(profile);
  return {
    version: KINOWALL_VERSION,
    name: normalized.name,
    handle: normalized.handle,
    status: normalized.status,
    bio: normalized.bio,
    vibe: normalized.vibe,
    avatarUrl: normalized.avatarUrl,
    bannerUrl: normalized.bannerUrl,
    accentColor: normalized.accentColor,
    showcase: normalized.showcase.slice(0, 60),
    watched: normalized.watched.slice(0, 120),
    favorites: getFavorites().slice(0, 120),
    actors: normalized.actors,
    scenes: normalized.scenes,
    soundtracks: normalized.soundtracks,
    updatedAt: normalized.updatedAt
  };
}

function base64UrlEncode(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(text) {
  const normalized = String(text || '').replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function parseKinoWallProfileFromHash(hashValue = window.location.hash) {
  const rawHash = String(hashValue || '').replace(/^#/, '').trim();
  if (!rawHash.startsWith(KINOWALL_SHARE_HASH_PREFIX)) return null;
  const encoded = rawHash.slice(KINOWALL_SHARE_HASH_PREFIX.length);
  if (!encoded) return null;
  return normalizeKinoWallProfile(JSON.parse(base64UrlDecode(encoded)));
}

async function openKinoWallFromHashIfNeeded() {
  if (!isKinoWallShareHash(window.location.hash)) return false;
  try {
    const profile = parseKinoWallProfileFromHash(window.location.hash);
    if (!profile) return false;
    await openKinoWall({ profile, readOnly: true });
    return true;
  } catch (error) {
    console.error('[kinowall share]', error);
    return false;
  }
}

function isKsawerEasterQuery(value) {
  return KSAWER_EASTER_QUERY_PATTERN.test(String(value || '').trim());
}

async function startKsawerEasterEgg() {
  if (ksawerEasterState?.active) return;

  const overlayEl = createKsawerEasterOverlay();
  const canvas = overlayEl.querySelector('#ksawerHeartCanvas');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  if (typeof hideDecisionPrompt === 'function') {
    hideDecisionPrompt();
  }
  if (typeof closeMovieRoulette === 'function') {
    closeMovieRoulette();
  }

  const phrases = await loadKsawerEasterPhrases();
  const stateObj = {
    active: true,
    overlayEl,
    canvas,
    ctx,
    ratio: 1,
    width: window.innerWidth,
    height: window.innerHeight,
    hearts: [],
    phrases,
    phraseIndex: 0,
    spawnTimer: null,
    animationFrame: null,
    resizeHandler: null,
    keyHandler: null,
    startedAt: performance.now(),
    lastFrameAt: performance.now(),
    finishedSpawning: false,
    ending: false
  };
  ksawerEasterState = stateObj;

  stateObj.resizeHandler = () => {
    resizeKsawerCanvas(stateObj);
    fitKsawerEasterTitle(stateObj.overlayEl);
  };
  stateObj.keyHandler = (event) => {
    if (event.key === 'Escape') {
      finishKsawerEasterEgg(true);
    }
  };

  window.addEventListener('resize', stateObj.resizeHandler);
  document.addEventListener('keydown', stateObj.keyHandler);
  resizeKsawerCanvas(stateObj);
  fitKsawerEasterTitle(stateObj.overlayEl);
  window.requestAnimationFrame(() => fitKsawerEasterTitle(stateObj.overlayEl));
  window.setTimeout(() => fitKsawerEasterTitle(stateObj.overlayEl), 180);

  window.setTimeout(() => {
    if (!ksawerEasterState?.active || ksawerEasterState !== stateObj) return;
    spawnNextKsawerHeart(stateObj);
    stateObj.spawnTimer = window.setInterval(() => spawnNextKsawerHeart(stateObj), 980);
  }, 650);

  stateObj.animationFrame = window.requestAnimationFrame((timestamp) => animateKsawerEaster(stateObj, timestamp));
}

function createKsawerEasterOverlay() {
  const oldOverlay = document.getElementById('ksawerEasterOverlay');
  if (oldOverlay) {
    oldOverlay.remove();
  }

  const overlayEl = document.createElement('div');
  overlayEl.id = 'ksawerEasterOverlay';
  overlayEl.className = 'ksawer-easter-overlay';
  overlayEl.setAttribute('aria-live', 'polite');
  overlayEl.setAttribute('aria-label', 'Романтическая пасхалка');
  overlayEl.innerHTML = `
    <canvas id="ksawerHeartCanvas" class="ksawer-heart-canvas"></canvas>
    <div class="ksawer-easter-aurora" aria-hidden="true"></div>
    <div class="ksawer-easter-stars" aria-hidden="true"></div>
    <div class="ksawer-easter-title" aria-label="Я люблю тебя!">
      <span>Я люблю тебя!</span>
    </div>
  `;
  document.body.appendChild(overlayEl);
  return overlayEl;
}

function fitKsawerEasterTitle(overlayEl) {
  const title = overlayEl?.querySelector?.('.ksawer-easter-title');
  const titleText = title?.querySelector?.('span');
  if (!title || !titleText) return;

  const viewportWidth = Math.max(320, window.innerWidth || document.documentElement.clientWidth || 320);
  const viewportHeight = Math.max(420, window.innerHeight || document.documentElement.clientHeight || 420);
  const sidePadding = Math.min(104, Math.max(30, viewportWidth * 0.07));
  const safeWidth = Math.max(260, viewportWidth - sidePadding * 2);
  const maxFontSize = Math.min(viewportHeight * 0.22, Math.max(68, viewportWidth * 0.118));
  const minFontSize = Math.max(42, Math.min(66, viewportWidth * 0.13));

  title.style.width = `${safeWidth}px`;
  titleText.style.fontSize = `${maxFontSize}px`;
  titleText.style.whiteSpace = 'nowrap';

  const rect = titleText.getBoundingClientRect();
  if (rect.width > safeWidth) {
    const fittedSize = Math.max(minFontSize, maxFontSize * (safeWidth / rect.width) * 0.92);
    titleText.style.fontSize = `${fittedSize}px`;
  }

  const finalRect = titleText.getBoundingClientRect();
  const overflowLeft = Math.max(0, sidePadding - finalRect.left);
  const overflowRight = Math.max(0, finalRect.right - (viewportWidth - sidePadding));
  if (overflowLeft || overflowRight) {
    const currentSize = parseFloat(titleText.style.fontSize) || maxFontSize;
    const widthToKeep = Math.max(220, safeWidth - overflowLeft - overflowRight - 18);
    const saferSize = Math.max(minFontSize * 0.88, currentSize * (widthToKeep / Math.max(1, finalRect.width)));
    titleText.style.fontSize = `${saferSize}px`;
  }
}

async function loadKsawerEasterPhrases() {
  try {
    const response = await fetch(KSAWER_EASTER_PHRASES_FILE, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const phrases = text
      .split(/\r?\n/g)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
    if (phrases.length) {
      return phrases;
    }
  } catch (error) {
    console.warn('[ksawer easter] cannot read phrase file, using fallback', error);
  }
  return [...KSAWER_EASTER_FALLBACK_PHRASES];
}

function resizeKsawerCanvas(stateObj) {
  if (!stateObj?.canvas || !stateObj.ctx) return;
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  stateObj.ratio = ratio;
  stateObj.width = Math.max(1, window.innerWidth);
  stateObj.height = Math.max(1, window.innerHeight);
  stateObj.canvas.width = Math.floor(stateObj.width * ratio);
  stateObj.canvas.height = Math.floor(stateObj.height * ratio);
  stateObj.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function spawnNextKsawerHeart(stateObj) {
  if (!stateObj?.active || stateObj.ending) return;

  if (stateObj.phraseIndex >= stateObj.phrases.length) {
    stateObj.finishedSpawning = true;
    if (stateObj.spawnTimer) {
      window.clearInterval(stateObj.spawnTimer);
      stateObj.spawnTimer = null;
    }
    return;
  }

  const phrase = stateObj.phrases[stateObj.phraseIndex];
  const heart = createKsawerHeartParticle(phrase, stateObj);
  if (!heart) {
    return;
  }

  stateObj.phraseIndex += 1;
  stateObj.hearts.push(heart);
}

function createKsawerHeartParticle(phrase, stateObj) {
  const width = Math.max(320, stateObj.width || window.innerWidth);
  const height = Math.max(480, stateObj.height || window.innerHeight);
  const sizeFloor = width < 560 ? 182 : 218;
  const sizeCeiling = Math.min(width < 560 ? 260 : 352, Math.max(236, width * 0.225));
  const attempts = width < 560 ? 46 : 64;
  const palette = getKsawerHeartPalette();
  let bestCandidate = null;
  let bestClearance = -Infinity;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const sizeBase = sizeFloor + Math.random() * Math.max(1, sizeCeiling - sizeFloor);
    const size = Math.round(sizeBase);
    const margin = Math.max(44, size * 0.58);
    const x = pickKsawerHeartX(width, margin, attempt, size);
    const y = height + size * (0.88 + Math.random() * 0.28);
    const candidate = buildKsawerHeartParticle(phrase, x, y, size, palette);
    const clearance = getKsawerHeartSpawnClearance(candidate, stateObj.hearts, height);

    if (clearance > bestClearance) {
      bestClearance = clearance;
      bestCandidate = candidate;
    }
    if (clearance >= 0) {
      return candidate;
    }
  }

  return bestClearance > Math.max(24, (bestCandidate?.size || sizeFloor) * 0.08) ? bestCandidate : null;
}

function pickKsawerHeartX(width, margin, attempt, size) {
  const usableWidth = Math.max(1, width - margin * 2);
  if (attempt < 10) {
    const laneStep = Math.max(size * 1.36, 220);
    const laneCount = Math.max(1, Math.floor(usableWidth / laneStep));
    const laneGap = usableWidth / laneCount;
    const laneIndex = (attempt + Math.floor(Math.random() * laneCount)) % laneCount;
    const laneCenter = margin + laneGap * (laneIndex + 0.5);
    const jitter = (Math.random() - 0.5) * Math.min(laneGap * 0.24, size * 0.28);
    return Math.min(width - margin, Math.max(margin, laneCenter + jitter));
  }
  return margin + Math.random() * usableWidth;
}

function buildKsawerHeartParticle(phrase, x, y, size, palette) {
  return {
    phrase,
    x,
    y,
    size,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -(0.70 + Math.random() * 0.28),
    boost: 0.00045 + Math.random() * 0.00065,
    sway: 0.28 + Math.random() * 0.58,
    swayPhase: Math.random() * Math.PI * 2,
    rotation: (Math.random() - 0.5) * 0.14,
    rotationSpeed: (Math.random() - 0.5) * 0.0007,
    bornAt: performance.now(),
    opacity: 0,
    life: 0,
    colors: palette
  };
}

function getKsawerHeartBounds(heart, extraPadding = 0) {
  const halfWidth = heart.size * 0.62 + extraPadding;
  const top = heart.y - heart.size * 0.68 - extraPadding;
  const bottom = heart.y + heart.size * 0.64 + extraPadding;
  return {
    left: heart.x - halfWidth,
    right: heart.x + halfWidth,
    top,
    bottom,
    width: halfWidth * 2,
    height: bottom - top
  };
}

function doKsawerBoundsOverlap(first, second) {
  return !(
    first.right <= second.left ||
    first.left >= second.right ||
    first.bottom <= second.top ||
    first.top >= second.bottom
  );
}

function getKsawerHeartSpawnClearance(candidate, hearts, viewportHeight) {
  const candidateBounds = getKsawerHeartBounds(candidate, Math.max(18, candidate.size * 0.08));
  let minClearance = Infinity;

  for (const heart of hearts) {
    if (!heart || heart.opacity <= 0.03) continue;
    const heartBounds = getKsawerHeartBounds(heart, Math.max(18, heart.size * 0.08));
    const overlapX = Math.min(candidateBounds.right, heartBounds.right) - Math.max(candidateBounds.left, heartBounds.left);
    const overlapY = Math.min(candidateBounds.bottom, heartBounds.bottom) - Math.max(candidateBounds.top, heartBounds.top);

    if (overlapX > 0 && overlapY > 0) {
      return -Math.max(overlapX, overlapY);
    }

    const horizontalGap = Math.max(0, Math.max(heartBounds.left - candidateBounds.right, candidateBounds.left - heartBounds.right));
    const verticalGap = Math.max(0, Math.max(heartBounds.top - candidateBounds.bottom, candidateBounds.top - heartBounds.bottom));
    const gap = horizontalGap || verticalGap ? Math.sqrt(horizontalGap * horizontalGap + verticalGap * verticalGap) : 0;
    minClearance = Math.min(minClearance, gap);
  }

  const bottomClearance = Math.max(0, candidateBounds.top - viewportHeight);
  return Math.min(minClearance, bottomClearance || Infinity);
}

function resolveKsawerHeartCollisions(hearts, width) {
  if (!Array.isArray(hearts) || hearts.length < 2) return;

  for (let pass = 0; pass < 2; pass += 1) {
    for (let i = 0; i < hearts.length; i += 1) {
      const first = hearts[i];
      if (!first || first.opacity <= 0.02) continue;

      for (let j = i + 1; j < hearts.length; j += 1) {
        const second = hearts[j];
        if (!second || second.opacity <= 0.02) continue;

        const firstBounds = getKsawerHeartBounds(first, 10);
        const secondBounds = getKsawerHeartBounds(second, 10);
        if (!doKsawerBoundsOverlap(firstBounds, secondBounds)) continue;

        const overlapX = Math.min(firstBounds.right, secondBounds.right) - Math.max(firstBounds.left, secondBounds.left);
        const overlapY = Math.min(firstBounds.bottom, secondBounds.bottom) - Math.max(firstBounds.top, secondBounds.top);

        if (overlapX < overlapY) {
          const shift = Math.min(14, overlapX / 2 + 2);
          const direction = first.x <= second.x ? -1 : 1;
          first.x = Math.max(first.size * 0.58, Math.min(width - first.size * 0.58, first.x + direction * shift));
          second.x = Math.max(second.size * 0.58, Math.min(width - second.size * 0.58, second.x - direction * shift));
          first.vx *= 0.35;
          second.vx *= 0.35;
        } else {
          const shift = Math.min(11, overlapY / 2 + 1.5);
          if (first.y < second.y) {
            first.y -= shift;
            second.y += shift;
          } else {
            first.y += shift;
            second.y -= shift;
          }
        }
      }
    }
  }
}

function getKsawerHeartPalette() {
  const palettes = [
    ['#ff7fcf', '#a86bff', '#5ee7df'],
    ['#ffd1e8', '#ff6fae', '#7b61ff'],
    ['#fef3c7', '#fb7185', '#c084fc'],
    ['#ffb3c7', '#ff5e9c', '#60a5fa'],
    ['#d8b4fe', '#f472b6', '#f9a8d4'],
    ['#c4b5fd', '#38bdf8', '#f0abfc'],
    ['#ffe4e6', '#fb7185', '#f97316']
  ];
  return palettes[Math.floor(Math.random() * palettes.length)];
}

function animateKsawerEaster(stateObj, timestamp) {
  if (!stateObj?.active || stateObj.ending) return;
  const ctx = stateObj.ctx;
  const delta = Math.min(2.2, Math.max(0.4, (timestamp - stateObj.lastFrameAt) / 16.6667));
  stateObj.lastFrameAt = timestamp;

  ctx.clearRect(0, 0, stateObj.width, stateObj.height);
  drawKsawerAmbientGlow(ctx, stateObj, timestamp);

  for (let index = stateObj.hearts.length - 1; index >= 0; index -= 1) {
    const heart = stateObj.hearts[index];
    updateKsawerHeartParticle(heart, delta, timestamp);
  }

  resolveKsawerHeartCollisions(stateObj.hearts, stateObj.width);

  for (let index = stateObj.hearts.length - 1; index >= 0; index -= 1) {
    const heart = stateObj.hearts[index];
    drawKsawerHeart(ctx, heart);

    const heartAgeMs = timestamp - heart.bornAt;
    const passedTop = heart.y < -heart.size * 1.35;
    const fadedAfterLife = heartAgeMs > 1500 && heart.opacity <= 0.01;
    if (passedTop || fadedAfterLife) {
      stateObj.hearts.splice(index, 1);
    }
  }

  if (stateObj.finishedSpawning && stateObj.hearts.length === 0) {
    finishKsawerEasterEgg(false);
    return;
  }

  stateObj.animationFrame = window.requestAnimationFrame((nextTimestamp) => animateKsawerEaster(stateObj, nextTimestamp));
}

function updateKsawerHeartParticle(heart, delta, timestamp) {
  heart.life += delta;
  heart.vy -= heart.boost * delta;
  heart.vx *= Math.pow(0.996, delta);
  heart.x += (heart.vx + Math.sin((timestamp / 1450) + heart.swayPhase) * heart.sway * 0.09) * delta;
  heart.y += heart.vy * delta;
  heart.rotation += heart.rotationSpeed * delta * 16;

  const ageMs = timestamp - heart.bornAt;
  const fadeIn = Math.min(1, ageMs / 1400);
  const nearTopFade = heart.y < heart.size * 0.35 ? Math.max(0, heart.y / Math.max(1, heart.size * 0.35)) : 1;
  heart.opacity = Math.min(0.96, fadeIn) * nearTopFade;
}

function drawKsawerAmbientGlow(ctx, stateObj, timestamp) {
  const t = timestamp / 1000;
  const spots = [
    { x: stateObj.width * (0.22 + Math.sin(t * 0.22) * 0.04), y: stateObj.height * 0.86, r: stateObj.width * 0.42, c: 'rgba(255, 88, 164, 0.085)' },
    { x: stateObj.width * (0.78 + Math.cos(t * 0.18) * 0.04), y: stateObj.height * 0.78, r: stateObj.width * 0.36, c: 'rgba(117, 96, 255, 0.075)' },
    { x: stateObj.width * 0.50, y: stateObj.height * (0.16 + Math.sin(t * 0.14) * 0.03), r: stateObj.width * 0.34, c: 'rgba(255, 228, 242, 0.045)' }
  ];

  spots.forEach((spot) => {
    const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r);
    gradient.addColorStop(0, spot.c);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, stateObj.width, stateObj.height);
  });
}

function drawKsawerHeart(ctx, heart) {
  ctx.save();
  ctx.globalAlpha = heart.opacity;
  ctx.translate(heart.x, heart.y);
  ctx.rotate(heart.rotation);

  const scale = heart.size / 34;
  const path = buildKsawerHeartPath(scale);
  const gradient = ctx.createLinearGradient(-heart.size * 0.58, -heart.size * 0.56, heart.size * 0.58, heart.size * 0.58);
  gradient.addColorStop(0, heart.colors[0]);
  gradient.addColorStop(0.54, heart.colors[1]);
  gradient.addColorStop(1, heart.colors[2]);

  ctx.shadowColor = heart.colors[1];
  ctx.shadowBlur = Math.max(18, heart.size * 0.14);
  ctx.fillStyle = gradient;
  ctx.fill(path);

  ctx.shadowBlur = 0;
  ctx.lineWidth = Math.max(1, heart.size * 0.008);
  ctx.strokeStyle = 'rgba(255,255,255,0.42)';
  ctx.stroke(path);
  ctx.restore();

  drawKsawerHeartText(ctx, heart);
}

function buildKsawerHeartPath(scale) {
  const path = new Path2D();
  const steps = 144;
  for (let i = 0; i <= steps; i += 1) {
    const t = (Math.PI * 2 * i) / steps;
    const x = 16 * Math.pow(Math.sin(t), 3) * scale;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
    const shiftedY = y + scale * 1.15;
    if (i === 0) {
      path.moveTo(x, shiftedY);
    } else {
      path.lineTo(x, shiftedY);
    }
  }
  path.closePath();
  return path;
}

function drawKsawerHeartText(ctx, heart) {
  ctx.save();
  ctx.globalAlpha = Math.min(1, heart.opacity * 1.08);
  ctx.translate(heart.x, heart.y + heart.size * 0.045);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,0.97)';
  ctx.shadowColor = 'rgba(50,0,34,0.62)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 2;
  drawKsawerFittedHeartText(ctx, heart.phrase, heart.size);
  ctx.restore();
}

function getKsawerWrappedLines(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
      if (ctx.measureText(line).width > maxWidth) {
        const chars = [...line];
        let part = '';
        line = '';
        chars.forEach((char) => {
          const testPart = `${part}${char}`;
          if (ctx.measureText(testPart).width > maxWidth && part) {
            lines.push(part);
            part = char;
          } else {
            part = testPart;
          }
        });
        line = part;
      }
    } else {
      line = testLine;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function drawKsawerFittedHeartText(ctx, text, heartSize) {
  const maxWidth = heartSize * 0.74;
  const maxHeight = heartSize * 0.54;
  const maxFontSize = Math.max(18, Math.min(27, heartSize * 0.086));
  const minFontSize = Math.max(9.5, Math.min(13, heartSize * 0.041));
  let best = null;

  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 0.75) {
    ctx.font = `850 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    const lineHeight = fontSize * 1.17;
    const lines = getKsawerWrappedLines(ctx, text, maxWidth);
    if (lines.length * lineHeight <= maxHeight) {
      best = { fontSize, lineHeight, lines };
      break;
    }
    best = { fontSize, lineHeight, lines };
  }

  if (!best) return;
  ctx.font = `850 ${best.fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  const totalHeight = best.lines.length * best.lineHeight;
  let startY = -totalHeight / 2 + best.lineHeight / 2;
  if (best.lines.length > 7) {
    ctx.font = `800 ${Math.max(8, minFontSize * 0.92)}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    best.lineHeight = Math.max(10.5, minFontSize * 1.08);
    startY = -(best.lines.length * best.lineHeight) / 2 + best.lineHeight / 2;
  }

  best.lines.forEach((lineText, index) => {
    ctx.fillText(lineText, 0, startY + index * best.lineHeight);
  });
}

function finishKsawerEasterEgg(force = false) {
  const stateObj = ksawerEasterState;
  if (!stateObj || stateObj.ending) return;
  stateObj.ending = true;
  stateObj.finishedSpawning = true;

  if (stateObj.spawnTimer) {
    window.clearInterval(stateObj.spawnTimer);
    stateObj.spawnTimer = null;
  }
  if (stateObj.animationFrame) {
    window.cancelAnimationFrame(stateObj.animationFrame);
    stateObj.animationFrame = null;
  }
  if (stateObj.resizeHandler) {
    window.removeEventListener('resize', stateObj.resizeHandler);
  }
  if (stateObj.keyHandler) {
    document.removeEventListener('keydown', stateObj.keyHandler);
  }

  stateObj.overlayEl.classList.add(force ? 'is-ending-fast' : 'is-ending');
  window.setTimeout(() => {
    stateObj.overlayEl.remove();
    if (ksawerEasterState === stateObj) {
      ksawerEasterState = null;
    }
  }, force ? 420 : 1350);
}

function initializePopcornEasterEgg() {
  const existingCanvas = document.getElementById('popcornCanvas');
  if (existingCanvas) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'popcornCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const popcornSources = ['popcorn.png', 'popcorn2.png', 'popcorn3.png', 'popcorn4.png', 'popcorn5.png'];
  const popcornImages = popcornSources.map((src) => {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    return image;
  });
  const popcornParticles = [];

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function spawnPopcorn(amount = 50) {
    const availableImages = popcornImages.filter((image) => image.complete && image.naturalWidth > 0);
    for (let i = 0; i < amount; i += 1) {
      const image = availableImages.length
        ? availableImages[Math.floor(Math.random() * availableImages.length)]
        : null;

      popcornParticles.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 40,
        size: Math.floor(Math.random() * 41) + 40,
        rotation: (Math.random() - 0.5) * 0.7,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.12,
        image,
        velocity: {
          x: (Math.random() - 0.5) * 5,
          y: -(Math.random() * 8 + 5),
        },
      });
    }
  }

  function drawFallbackPopcorn(particle) {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.angle);
    ctx.fillStyle = '#fff8dd';
    ctx.beginPath();
    ctx.ellipse(0, 0, particle.size * 0.26, particle.size * 0.2, 0, 0, Math.PI * 2);
    ctx.ellipse(-particle.size * 0.16, -particle.size * 0.05, particle.size * 0.18, particle.size * 0.14, -0.4, 0, Math.PI * 2);
    ctx.ellipse(particle.size * 0.12, -particle.size * 0.08, particle.size * 0.16, particle.size * 0.14, 0.35, 0, Math.PI * 2);
    ctx.ellipse(0, particle.size * 0.12, particle.size * 0.16, particle.size * 0.12, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animatePopcorn() {
    requestAnimationFrame(animatePopcorn);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = popcornParticles.length - 1; i >= 0; i -= 1) {
      const particle = popcornParticles[i];
      particle.velocity.y += 0.2;
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.angle += particle.spin;

      if (particle.image && particle.image.complete && particle.image.naturalWidth > 0) {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        ctx.drawImage(particle.image, -particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      } else {
        drawFallbackPopcorn(particle);
      }

      if (particle.y > window.innerHeight + particle.size * 2) {
        popcornParticles.splice(i, 1);
      }
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const key = String(event.key || '').toLowerCase();
    if (key === 'p' || key === 'з') {
      spawnPopcorn(50);
    }
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animatePopcorn();
}

window.addEventListener('DOMContentLoaded', initializePopcornEasterEgg);

/* ===== RMP patch: kinowall actors, reviews, compact share, details redesign ===== */

function getKinoWallTimestampLabel(isoValue) {
  const date = new Date(isoValue || '');
  if (Number.isNaN(date.getTime())) return 'дата неизвестна';
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function compactKinoWallProfile(profile) {
  const normalized = normalizeKinoWallProfile(profile);
  const compactEntry = (entry) => [entry.mediaType === 'tv' ? 't' : 'm', Number(entry.id || 0), entry.addedAt || ''];
  return {
    v: KINOWALL_VERSION,
    n: normalized.name,
    h: normalized.handle,
    s: normalized.status,
    b: normalized.bio,
    vb: normalized.vibe,
    av: normalized.avatarUrl,
    bn: normalized.bannerUrl,
    ac: normalized.accentColor,
    sh: normalized.showcase.slice(0, 60).map(compactEntry),
    w: normalized.watched.slice(0, 140).map(compactEntry),
    f: getFavorites().slice(0, 140).map(compactEntry),
    a: normalized.actors.map((person) => [person.tmdbId || 0, person.name || '', person.note || '', person.imageUrl || '']),
    sc: normalized.scenes.map((scene) => [scene.title || '', scene.note || '', scene.imageUrl || '']),
    st: normalized.soundtracks.map((track) => [track.title || '', track.artist || '', track.url || '']),
    r: normalized.reviews.map((review) => [review.mediaType === 'tv' ? 't' : 'm', Number(review.id || 0), Number(review.rating || 0), review.text || '', review.addedAt || '']),
    u: normalized.updatedAt || new Date().toISOString()
  };
}

function expandCompactKinoWallProfile(payload = {}) {
  if (payload.name || payload.showcase || payload.watched) return payload;
  const expandEntry = (entry) => ({
    mediaType: entry?.[0] === 't' ? 'tv' : 'movie',
    id: Number(entry?.[1] || 0),
    addedAt: entry?.[2] || new Date().toISOString()
  });
  return {
    version: payload.v || KINOWALL_VERSION,
    name: payload.n || '',
    handle: payload.h || '',
    status: payload.s || '',
    bio: payload.b || '',
    vibe: payload.vb || '',
    avatarUrl: payload.av || '',
    bannerUrl: payload.bn || '',
    accentColor: payload.ac || '',
    showcase: Array.isArray(payload.sh) ? payload.sh.map(expandEntry) : [],
    watched: Array.isArray(payload.w) ? payload.w.map(expandEntry) : [],
    favorites: Array.isArray(payload.f) ? payload.f.map(expandEntry) : [],
    actors: Array.isArray(payload.a) ? payload.a.map((item) => ({ tmdbId: Number(item?.[0] || 0), name: item?.[1] || '', note: item?.[2] || '', imageUrl: item?.[3] || '' })) : [],
    scenes: Array.isArray(payload.sc) ? payload.sc.map((item) => ({ title: item?.[0] || '', note: item?.[1] || '', imageUrl: item?.[2] || '' })) : [],
    soundtracks: Array.isArray(payload.st) ? payload.st.map((item) => ({ title: item?.[0] || '', artist: item?.[1] || '', url: item?.[2] || '' })) : [],
    reviews: Array.isArray(payload.r) ? payload.r.map((item) => ({ mediaType: item?.[0] === 't' ? 'tv' : 'movie', id: Number(item?.[1] || 0), rating: Number(item?.[2] || 0), text: item?.[3] || '', addedAt: item?.[4] || new Date().toISOString() })) : [],
    updatedAt: payload.u || new Date().toISOString()
  };
}

function createDefaultKinoWallProfile() {
  return {
    version: KINOWALL_VERSION,
    name: 'Киноман',
    handle: 'rmp-user',
    status: 'выбираю кино по вайбу, а не по совести',
    bio: 'Моя личная киностена: любимые тайтлы, сцены, саундтреки и статистика просмотров.',
    vibe: 'ночной кинотеатр, неон и “ещё одну серию”',
    avatarUrl: '',
    bannerUrl: '',
    accentColor: '#5f9cff',
    showcase: [],
    watched: [],
    favorites: [],
    reviews: [],
    actors: [
      { tmdbId: 0, name: 'Любимый актёр', note: 'сюда можно вписать своих людей кино', imageUrl: '' }
    ],
    scenes: [
      { title: 'Сцена, которую хочется пересматривать', note: 'коротко опиши момент или вставь ссылку на кадр', imageUrl: '' }
    ],
    soundtracks: [
      { title: 'Тот самый саундтрек', artist: 'исполнитель / фильм', url: '' }
    ],
    updatedAt: new Date().toISOString()
  };
}

function normalizeKinoWallProfile(profile = {}) {
  const expanded = expandCompactKinoWallProfile(profile || {});
  const fallback = createDefaultKinoWallProfile();
  return {
    ...fallback,
    ...expanded,
    name: sanitizeKinoWallText(expanded.name || fallback.name, 42),
    handle: sanitizeKinoWallHandle(expanded.handle || fallback.handle),
    status: sanitizeKinoWallText(expanded.status || fallback.status, 90),
    bio: sanitizeKinoWallText(expanded.bio || fallback.bio, 420),
    vibe: sanitizeKinoWallText(expanded.vibe || fallback.vibe, 120),
    avatarUrl: sanitizeKinoWallUrl(expanded.avatarUrl || ''),
    bannerUrl: sanitizeKinoWallUrl(expanded.bannerUrl || ''),
    accentColor: normalizeHexColor(expanded.accentColor || fallback.accentColor, fallback.accentColor),
    showcase: normalizeKinoWallEntries(expanded.showcase || []),
    watched: normalizeKinoWallEntries(expanded.watched || []),
    favorites: normalizeKinoWallEntries(expanded.favorites || []),
    reviews: normalizeKinoWallReviews(expanded.reviews || []),
    actors: normalizeKinoWallPeople(expanded.actors || []),
    scenes: normalizeKinoWallTextCards(expanded.scenes || []),
    soundtracks: normalizeKinoWallSoundtracks(expanded.soundtracks || []),
    updatedAt: expanded.updatedAt || fallback.updatedAt
  };
}

function normalizeKinoWallPeople(items = []) {
  const seen = new Set();
  const result = [];
  items.forEach((item) => {
    const tmdbId = Number(item?.tmdbId || item?.id || item?.personId || 0);
    const name = sanitizeKinoWallText(item?.name || '', 70);
    const note = sanitizeKinoWallText(item?.note || item?.knownFor || '', 180);
    const imageUrl = sanitizeKinoWallUrl(item?.imageUrl || item?.profileUrl || '');
    if (!name && !note && !imageUrl) return;
    const key = tmdbId ? `id:${tmdbId}` : `name:${name.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    result.push({ tmdbId, name, note, imageUrl });
  });
  return result.slice(0, 80);
}

function normalizeKinoWallReviews(items = []) {
  const seen = new Set();
  const result = [];
  items.forEach((item) => {
    const id = Number(item?.id || item?.tmdb || 0);
    const mediaType = item?.mediaType === 'tv' ? 'tv' : 'movie';
    if (!id) return;
    const key = `${mediaType}:${id}`;
    if (seen.has(key)) return;
    seen.add(key);
    result.push({
      id,
      mediaType,
      rating: clampKinoWallUserRating(item?.rating),
      text: sanitizeKinoWallLongText(item?.text || '', 700),
      addedAt: item?.addedAt || new Date().toISOString()
    });
  });
  return result.slice(0, 240);
}

function clampKinoWallUserRating(value) {
  const numeric = Number(String(value ?? '').replace(',', '.'));
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(10, Math.round(numeric * 10) / 10));
}

function getKinoWallReviewFor(id, mediaType, profile = readKinoWallProfile()) {
  return profile.reviews.find((review) => isSameKinoWallEntry(review, { id: Number(id), mediaType })) || null;
}

function saveKinoWallReview(review) {
  const id = Number(review?.id || 0);
  const mediaType = review?.mediaType === 'tv' ? 'tv' : 'movie';
  if (!id) return { ok: false, reason: 'no-id' };
  const profile = readKinoWallProfile();
  if (getKinoWallReviewFor(id, mediaType, profile)) return { ok: false, reason: 'exists', profile };
  profile.reviews.unshift({
    id,
    mediaType,
    rating: clampKinoWallUserRating(review.rating),
    text: sanitizeKinoWallLongText(review.text || '', 700),
    addedAt: new Date().toISOString()
  });
  saveKinoWallProfile(profile);
  return { ok: true, profile };
}

function removeKinoWallReview(id, mediaType) {
  const profile = readKinoWallProfile();
  profile.reviews = profile.reviews.filter((review) => !isSameKinoWallEntry(review, { id: Number(id), mediaType }));
  saveKinoWallProfile(profile);
  return profile;
}

function toggleKinoWallActor(person = {}) {
  const tmdbId = Number(person.tmdbId || person.id || 0);
  const name = sanitizeKinoWallText(person.name || '', 70);
  if (!tmdbId && !name) return false;
  const profile = readKinoWallProfile();
  const index = profile.actors.findIndex((actor) => (tmdbId && Number(actor.tmdbId || 0) === tmdbId) || (!tmdbId && actor.name.toLowerCase() === name.toLowerCase()));
  if (index === -1) {
    profile.actors.unshift({
      tmdbId,
      name,
      note: sanitizeKinoWallText(person.note || person.character || '', 180),
      imageUrl: sanitizeKinoWallUrl(person.imageUrl || '')
    });
    saveKinoWallProfile(profile);
    return true;
  }
  profile.actors.splice(index, 1);
  saveKinoWallProfile(profile);
  return false;
}

function isInKinoWallActors(personId, name = '') {
  const profile = readKinoWallProfile();
  const id = Number(personId || 0);
  const lowered = String(name || '').toLowerCase();
  return profile.actors.some((actor) => (id && Number(actor.tmdbId || 0) === id) || (!id && lowered && actor.name.toLowerCase() === lowered));
}

async function openNav(item) {
  try {
    const details = await apiFetch(`/${item.mediaType}/${item.id}`, {
      language: 'ru-RU',
      append_to_response: 'videos,credits',
      include_video_language: 'ru-RU,ru,en-US,en,null'
    });

    const fallbackVideos = !details?.videos?.results?.length
      ? await apiFetch(`/${item.mediaType}/${item.id}/videos`, {
          include_video_language: 'ru-RU,ru,en-US,en,null'
        }).catch(() => ({ results: [] }))
      : null;

    const videos = prioritizeVideos((details?.videos?.results || fallbackVideos?.results || []).filter((video) => video.site === 'YouTube' && video.key));
    const cast = Array.isArray(details?.credits?.cast) ? details.credits.cast.slice(0, 14) : [];

    overlay.style.width = '100%';
    overlay.setAttribute('aria-hidden', 'false');

    const title = item.originalTitle || item.title || details.original_title || details.original_name || details.title || details.name;
    const resolvedOverview = item.overview || details.overview || 'Описание отсутствует.';
    const resolvedDate = item.releaseDate || details.release_date || details.first_air_date || '';
    const subtitle = `${item.mediaType === 'tv' ? 'Сериал' : 'Фильм'} • ${formatFullDate(resolvedDate)}`;
    const genresMarkup = buildOverlayGenresMarkup(item.mediaType, details?.genres, item.genreIds);
    const backdrop = details.backdrop_path ? `${state.imageBackdropBaseUrl}${details.backdrop_path}` : '';
    const trailerMarkup = buildDetailsTrailerMarkup(videos, title);

    overlayContent.innerHTML = `
      <div class="rmp-details-shell" ${backdrop ? `style="--details-backdrop:url('${escapeHtml(backdrop)}')"` : ''}>
        <div class="rmp-details-hero">
          <div class="rmp-details-hero-bg"></div>
          <div class="overlay-headline rmp-details-headline">
            <div class="rmp-details-kicker">${escapeHtml(item.mediaType === 'tv' ? 'сериал' : 'фильм')} • подробности</div>
            <div class="overlay-title">${escapeHtml(title)}</div>
            <div class="overlay-subtitle">${escapeHtml(subtitle)}</div>
            ${genresMarkup}
          </div>
        </div>

        <div class="rmp-details-grid">
          <div class="rmp-details-main">
            ${trailerMarkup}
            <div class="overlay-overview rmp-details-overview">
              <h3>Описание</h3>
              <p>${escapeHtml(resolvedOverview)}</p>
            </div>
          </div>
          <aside class="rmp-details-side">
            <div class="rmp-details-fact"><span>Рейтинг TMDB</span><b>${formatVote(details.vote_average)}</b></div>
            <div class="rmp-details-fact"><span>Голосов</span><b>${escapeHtml(String(details.vote_count || '—'))}</b></div>
            ${details.runtime ? `<div class="rmp-details-fact"><span>Длительность</span><b>${details.runtime} мин.</b></div>` : ''}
            ${details.number_of_seasons ? `<div class="rmp-details-fact"><span>Сезонов</span><b>${details.number_of_seasons}</b></div>` : ''}
            ${details.status ? `<div class="rmp-details-fact"><span>Статус</span><b>${escapeHtml(details.status)}</b></div>` : ''}
          </aside>
        </div>

        ${cast.length ? `
          <section class="rmp-details-cast-section">
            <div class="rmp-details-section-title">В главных ролях</div>
            <div class="rmp-details-cast-grid">
              ${cast.map(renderDetailsActorCard).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    `;

    activeSlide = 0;
    showVideos();
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        activeSlide = index;
        showVideos();
      });
    });
    bindDetailsActorEvents();
  } catch (error) {
    console.error('[openNav patched]', error);
    overlay.style.width = '100%';
    overlay.setAttribute('aria-hidden', 'false');
    overlayContent.innerHTML = '<h1 class="no-results">Не удалось загрузить подробности</h1>';
  }
}

function buildDetailsTrailerMarkup(videos, title) {
  if (!videos.length) {
    return `<div class="rmp-details-video-empty"><b>Трейлеры не найдены</b><span>Но описание и актёры доступны ниже.</span></div>`;
  }
  const isLocalFile = window.location.protocol === 'file:';
  const embed = videos.map((video) => {
    const safeTitle = escapeHtml(video.name || title);
    if (isLocalFile) {
      return `
        <div class="embed embed-fallback hide">
          <img class="embed-fallback-thumb" src="https://img.youtube.com/vi/${video.key}/hqdefault.jpg" alt="${safeTitle}" />
          <div class="embed-fallback-body">
            <div class="embed-fallback-title">${safeTitle}</div>
            <div class="embed-fallback-text">Локально через file:// YouTube-встраивание может не работать. Открой сайт через http/https или запусти ролик прямо на YouTube.</div>
            <a class="embed-fallback-link" href="https://www.youtube.com/watch?v=${video.key}" target="_blank" rel="noopener noreferrer">Открыть на YouTube</a>
          </div>
        </div>`;
    }
    return `
      <iframe
        src="${buildYouTubeEmbedUrl(video.key)}"
        class="embed hide"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        title="${safeTitle}"
      ></iframe>`;
  });
  const dots = videos.map((_, index) => `<span class="dot">${index + 1}</span>`).join('');
  return `<div class="rmp-details-video-card">${embed.join('')}<div class="dots">${dots}</div></div>`;
}

function renderDetailsActorCard(actor) {
  const imageUrl = actor.profile_path ? buildImageUrl(actor.profile_path) : '';
  const active = isInKinoWallActors(actor.id, actor.name);
  const character = actor.character ? `Роль: ${actor.character}` : (actor.known_for_department || '');
  return `
    <article class="details-actor-card" data-person-id="${Number(actor.id || 0)}" data-person-name="${escapeHtml(actor.name || '')}" data-person-character="${escapeHtml(character || '')}" data-person-image="${escapeHtml(imageUrl)}">
      <div class="details-actor-photo">${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(actor.name || '')}" loading="lazy">` : '<span>👤</span>'}</div>
      <div class="details-actor-body">
        <b>${escapeHtml(actor.name || 'Без имени')}</b>
        ${character ? `<span>${escapeHtml(character)}</span>` : ''}
      </div>
      <div class="details-actor-actions">
        <button type="button" class="details-actor-fav ${active ? 'active' : ''}" title="${active ? 'Убрать из любимых актёров' : 'Добавить в любимые актёры'}">${active ? '✓ На стене' : '+ На стену'}</button>
        <button type="button" class="details-actor-more">Подробнее</button>
      </div>
    </article>`;
}

function bindDetailsActorEvents() {
  overlayContent.querySelectorAll('.details-actor-fav').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.details-actor-card');
      const isActive = toggleKinoWallActor({
        tmdbId: Number(card?.dataset.personId || 0),
        name: card?.dataset.personName || '',
        note: card?.dataset.personCharacter || '',
        imageUrl: card?.dataset.personImage || ''
      });
      button.classList.toggle('active', isActive);
      button.textContent = isActive ? '✓ На стене' : '+ На стену';
      button.title = isActive ? 'Убрать из любимых актёров' : 'Добавить в любимые актёры';
    });
  });
  overlayContent.querySelectorAll('.details-actor-more').forEach((button) => {
    button.addEventListener('click', async () => {
      const card = button.closest('.details-actor-card');
      const personId = Number(card?.dataset.personId || 0);
      if (personId) await openDetailsPersonModal(personId);
    });
  });
}

async function openDetailsPersonModal(personId) {
  let modal = document.getElementById('detailsPersonModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'detailsPersonModal';
    modal.className = 'details-person-modal hidden';
    document.body.appendChild(modal);
  }
  modal.classList.remove('hidden');
  modal.innerHTML = `<div class="details-person-dialog"><button class="details-person-close" type="button">&times;</button><div class="details-person-loading"><span class="loader"></span><b>Загрузка биографии...</b></div></div>`;
  modal.querySelector('.details-person-close')?.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.add('hidden');
  }, { once: true });

  try {
    const person = await apiFetch(`/person/${personId}`, {
      language: 'ru-RU',
      append_to_response: 'combined_credits,external_ids'
    });
    modal.innerHTML = renderDetailsPersonModal(person);
    modal.querySelector('.details-person-close')?.addEventListener('click', () => modal.classList.add('hidden'));
    modal.querySelector('.details-person-fav')?.addEventListener('click', (event) => {
      const imageUrl = person.profile_path ? buildImageUrl(person.profile_path) : '';
      const isActive = toggleKinoWallActor({ tmdbId: person.id, name: person.name, note: person.known_for_department || '', imageUrl });
      event.currentTarget.classList.toggle('active', isActive);
      event.currentTarget.textContent = isActive ? '✓ В любимых актёрах' : '+ В любимые актёры';
    });
  } catch (error) {
    modal.innerHTML = `<div class="details-person-dialog"><button class="details-person-close" type="button">&times;</button><h2>Не удалось загрузить данные</h2><p>TMDB не ответил по этому актёру.</p></div>`;
    modal.querySelector('.details-person-close')?.addEventListener('click', () => modal.classList.add('hidden'));
  }
}

function renderDetailsPersonModal(person) {
  const imageUrl = person.profile_path ? buildImageUrl(person.profile_path) : '';
  const active = isInKinoWallActors(person.id, person.name);
  const facts = [];
  const gender = person.gender === 1 ? 'Женский' : person.gender === 2 ? 'Мужской' : person.gender === 3 ? 'Небинарный' : '';
  if (gender) facts.push(['Пол', gender]);
  if (person.birthday) facts.push(['Дата рождения', formatFullDate(person.birthday)]);
  if (person.deathday) facts.push(['Дата смерти', formatFullDate(person.deathday)]);
  if (person.place_of_birth) facts.push(['Место рождения', person.place_of_birth]);
  if (person.known_for_department) facts.push(['Сфера', person.known_for_department]);
  const knownProjects = buildPersonKnownProjects(person);
  const socials = buildPersonSocialLinks(person.external_ids || {});
  return `
    <div class="details-person-dialog">
      <button class="details-person-close" type="button" aria-label="Закрыть">&times;</button>
      <div class="details-person-head">
        <div class="details-person-photo">${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(person.name || '')}">` : '<span>👤</span>'}</div>
        <div>
          <h2>${escapeHtml(person.name || 'Без имени')}</h2>
          ${person.also_known_as?.length ? `<p>${escapeHtml(person.also_known_as.slice(0, 4).join(' • '))}</p>` : ''}
          <button type="button" class="details-person-fav ${active ? 'active' : ''}">${active ? '✓ В любимых актёрах' : '+ В любимые актёры'}</button>
        </div>
      </div>
      ${facts.length ? `<div class="details-person-facts">${facts.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join('')}</div>` : ''}
      ${person.biography ? `<section><h3>Биография</h3><p>${escapeHtml(person.biography)}</p></section>` : ''}
      ${knownProjects.length ? `<section><h3>Известность</h3><div class="details-person-projects">${knownProjects.map((project) => `<span>${escapeHtml(project)}</span>`).join('')}</div></section>` : ''}
      ${socials.length ? `<section><h3>Соцсети и страницы</h3><div class="details-person-socials">${socials.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join('')}</div></section>` : ''}
    </div>`;
}

function buildPersonKnownProjects(person) {
  const cast = Array.isArray(person?.combined_credits?.cast) ? person.combined_credits.cast : [];
  const crew = Array.isArray(person?.combined_credits?.crew) ? person.combined_credits.crew : [];
  const seen = new Set();
  return [...cast, ...crew]
    .filter((item) => item && (item.title || item.name))
    .sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0))
    .map((item) => item.title || item.name)
    .filter((title) => {
      const key = String(title).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
}

function buildPersonSocialLinks(ids = {}) {
  const links = [];
  if (ids.imdb_id) links.push({ label: 'IMDb', url: `https://www.imdb.com/name/${ids.imdb_id}/` });
  if (ids.instagram_id) links.push({ label: 'Instagram', url: `https://www.instagram.com/${ids.instagram_id}/` });
  if (ids.twitter_id) links.push({ label: 'X / Twitter', url: `https://x.com/${ids.twitter_id}` });
  if (ids.facebook_id) links.push({ label: 'Facebook', url: `https://www.facebook.com/${ids.facebook_id}` });
  if (ids.tiktok_id) links.push({ label: 'TikTok', url: `https://www.tiktok.com/@${ids.tiktok_id}` });
  if (ids.youtube_id) links.push({ label: 'YouTube', url: `https://www.youtube.com/${ids.youtube_id}` });
  if (ids.wikidata_id) links.push({ label: 'Wikidata', url: `https://www.wikidata.org/wiki/${ids.wikidata_id}` });
  return links;
}

function renderPlayerShell(meta = {}) {
  const safeTitle = escapeHtml(meta.title || meta.originalTitle || 'Онлайн-просмотр');
  const safeSubtitle = [
    meta.mediaType === 'tv' ? 'Сериал' : (meta.mediaType ? 'Фильм' : ''),
    meta.year,
    meta.imdb ? `IMDb: ${escapeHtml(meta.imdb)}` : '',
    meta.kinopoisk ? `KP: ${escapeHtml(meta.kinopoisk)}` : '',
    meta.tmdb ? `TMDB: ${escapeHtml(meta.tmdb)}` : ''
  ].filter(Boolean).join(' • ');

  document.body.innerHTML = `
    <div id="rmp-player-shell" class="rmp-player-shell">
      <div class="rmp-player-topbar">
        <div class="rmp-player-title-box">
          <div class="rmp-player-title">${safeTitle}</div>
          <div class="rmp-player-subtitle">${safeSubtitle || 'Подбираем доступные источники...'}</div>
        </div>
        <button id="rmp-home-button" class="rmp-player-home">← На главную</button>
      </div>
      <div class="rmp-player-page">
        <div class="rmp-player-inner">
          <div id="rmp-sources" class="rmp-player-sources"></div>
          <div id="rmp-player-content" class="rmp-player-content"></div>
          <div id="rmp-player-status" class="rmp-player-status">Подключаемся к Kinobox API...</div>
          ${renderKinoWallPlayerReviewBox(meta)}
        </div>
      </div>
    </div>
  `;

  document.getElementById('rmp-home-button').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  bindKinoWallPlayerReviewEvents(meta);
}

function selectKinoboxSource(sourceData) {
  const contentEl = document.getElementById('rmp-player-content');
  if (!contentEl) return;
  const iframe = document.createElement('iframe');
  iframe.src = sourceData.iframeUrl;
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'origin';
  iframe.className = 'rmp-player-iframe';
  contentEl.innerHTML = '';
  contentEl.appendChild(iframe);
  setPlayerStatus(`Источник: ${sourceData.type}. Если плеер пустой, попробуй другой источник или включи VPN.`);
}

function renderKinoboxSources(sourcesData) {
  const sourcesEl = document.getElementById('rmp-sources');
  if (!sourcesEl) return;
  sourcesEl.innerHTML = '';
  const preferredSource = localStorage.getItem('preferred-source');
  let preferredIndex = sourcesData.findIndex((source) => source.type === preferredSource);
  if (preferredIndex === -1) preferredIndex = 0;
  sourcesData.forEach((source, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = source.type;
    button.className = `rmp-player-source ${index === preferredIndex ? 'active' : ''}`;
    button.addEventListener('click', () => {
      sourcesEl.querySelectorAll('button').forEach((el) => el.classList.remove('active'));
      button.classList.add('active');
      localStorage.setItem('preferred-source', source.type);
      selectKinoboxSource(source);
    });
    sourcesEl.appendChild(button);
  });
  selectKinoboxSource(sourcesData[preferredIndex]);
}

function showPlayerPlaceholder(message) {
  const contentEl = document.getElementById('rmp-player-content');
  if (!contentEl) return;
  contentEl.innerHTML = `<div class="rmp-player-placeholder">${escapeHtml(message)}</div>`;
}

function renderKinoWallPlayerReviewBox(meta) {
  const id = Number(meta.tmdb || meta.id || 0);
  const mediaType = meta.mediaType === 'tv' ? 'tv' : 'movie';
  if (!id) return '';
  const review = getKinoWallReviewFor(id, mediaType);
  if (review) {
    return `
      <section class="rmp-player-review" data-review-id="${id}" data-review-media="${mediaType}">
        <div class="rmp-player-review-head">
          <div>
            <h2>Твой локальный отзыв</h2>
            <p>Оценка и отзыв уже сохранены на киностене. Повторно оставить нельзя, пока не удалишь старую запись.</p>
          </div>
          <div class="rmp-review-badge">${review.rating.toFixed(1)}/10</div>
        </div>
        <div class="rmp-review-existing-text">${escapeHtml(review.text || 'Без текстового отзыва.')}</div>
        <div class="rmp-player-review-actions">
          <button type="button" class="rmp-review-delete">Удалить отзыв с киностены</button>
        </div>
      </section>`;
  }
  return `
    <section class="rmp-player-review" data-review-id="${id}" data-review-media="${mediaType}">
      <div class="rmp-player-review-head">
        <div>
          <h2>Личная оценка и отзыв</h2>
          <p>Это сохраняется только локально на твоей киностене и не влияет на общий рейтинг TMDB/RMP.</p>
        </div>
      </div>
      <div class="rmp-review-rating-row">
        <div class="rmp-review-stars" aria-label="Личная оценка по десятибалльной шкале">
          ${Array.from({ length: 10 }, (_, index) => index + 1).map((star) => `<button type="button" class="rmp-review-star" data-star="${star}" style="--fill:0%" title="${star}/10"><span>★</span></button>`).join('')}
        </div>
        <label class="rmp-review-number"><span>Оценка</span><input type="number" min="0" max="10" step="0.1" value="0"></label>
      </div>
      <textarea class="rmp-review-text" rows="4" maxlength="700" placeholder="Коротко: что зацепило, кому советуешь, какой вайб оставил тайтл..."></textarea>
      <div class="rmp-player-review-actions">
        <button type="button" class="rmp-review-save">Сохранить на киностену</button>
        <span class="rmp-review-status"></span>
      </div>
    </section>`;
}

function bindKinoWallPlayerReviewEvents(meta) {
  const box = document.querySelector('.rmp-player-review');
  if (!box) return;
  const id = Number(box.dataset.reviewId || meta.tmdb || 0);
  const mediaType = box.dataset.reviewMedia === 'tv' ? 'tv' : 'movie';
  const input = box.querySelector('.rmp-review-number input');
  const stars = Array.from(box.querySelectorAll('.rmp-review-star'));
  const status = box.querySelector('.rmp-review-status');

  const setRating = (value) => {
    const rating = clampKinoWallUserRating(value);
    if (input) input.value = rating.toFixed(1).replace('.0', '');
    updateKinoWallStars(stars, rating);
  };

  stars.forEach((starButton) => {
    starButton.addEventListener('click', (event) => {
      const rect = starButton.getBoundingClientRect();
      const local = rect.width ? Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) : 1;
      const starIndex = Number(starButton.dataset.star || 1) - 1;
      setRating(Math.round((starIndex + local) * 10) / 10);
    });
  });
  input?.addEventListener('input', () => setRating(input.value));
  setRating(input?.value || 0);

  box.querySelector('.rmp-review-save')?.addEventListener('click', () => {
    const result = saveKinoWallReview({
      id,
      mediaType,
      rating: input?.value || 0,
      text: box.querySelector('.rmp-review-text')?.value || ''
    });
    if (!result.ok) {
      if (status) status.textContent = result.reason === 'exists' ? 'Отзыв уже есть на киностене.' : 'Не удалось сохранить отзыв.';
      return;
    }
    box.outerHTML = renderKinoWallPlayerReviewBox({ ...meta, tmdb: id, mediaType });
    bindKinoWallPlayerReviewEvents({ ...meta, tmdb: id, mediaType });
  });

  box.querySelector('.rmp-review-delete')?.addEventListener('click', () => {
    removeKinoWallReview(id, mediaType);
    box.outerHTML = renderKinoWallPlayerReviewBox({ ...meta, tmdb: id, mediaType });
    bindKinoWallPlayerReviewEvents({ ...meta, tmdb: id, mediaType });
  });
}

function updateKinoWallStars(stars, rating) {
  const starRating = clampKinoWallUserRating(rating);
  stars.forEach((starButton, index) => {
    const fill = Math.max(0, Math.min(1, starRating - index)) * 100;
    starButton.style.setProperty('--fill', `${fill}%`);
  });
}

async function buildKinoWallRenderData(profile, readOnly = false) {
  const normalizedProfile = normalizeKinoWallProfile(profile);
  const favorites = readOnly ? normalizeKinoWallEntries(normalizedProfile.favorites || []) : getFavorites();
  const reviewEntries = normalizeKinoWallReviews(normalizedProfile.reviews || []).map((review) => ({ id: review.id, mediaType: review.mediaType, addedAt: review.addedAt }));
  const allEntries = dedupeKinoWallEntries([
    ...normalizedProfile.showcase,
    ...normalizedProfile.watched,
    ...favorites,
    ...reviewEntries
  ]);

  const details = await fetchKinoWallDetailsBatch(allEntries);
  const detailsByKey = new Map(details.map((item) => [buildKinoWallEntryKey(item), item]));
  const showcase = normalizedProfile.showcase.map((entry) => detailsByKey.get(buildKinoWallEntryKey(entry))).filter(Boolean);
  const watched = normalizedProfile.watched.map((entry) => detailsByKey.get(buildKinoWallEntryKey(entry))).filter(Boolean);
  const favoriteItems = favorites.map((entry) => detailsByKey.get(buildKinoWallEntryKey(entry))).filter(Boolean);
  const reviewed = normalizedProfile.reviews.map((review) => {
    const detail = detailsByKey.get(buildKinoWallEntryKey(review));
    return detail ? { ...detail, userRating: review.rating, userReview: review.text, reviewedAt: review.addedAt } : null;
  }).filter(Boolean);
  const stats = buildKinoWallStats(normalizedProfile, { showcase, watched, favorites: favoriteItems, reviewed, all: details });
  const achievements = buildKinoWallAchievements(stats, details);
  return { profile: normalizedProfile, readOnly, showcase, watched, favorites: favoriteItems, reviewed, stats, achievements, allDetails: details };
}

function buildKinoWallStats(profile, lists) {
  const watched = lists.watched || [];
  const favorites = lists.favorites || [];
  const reviewed = lists.reviewed || [];
  const all = dedupeKinoWallDetails([...(lists.all || []), ...watched, ...favorites, ...reviewed]);
  const genreCounts = new Map();
  const yearCounts = new Map();
  const collectionCounts = new Map();
  let movieCount = 0;
  let tvCount = 0;
  let totalRating = 0;
  let ratedCount = 0;
  let totalRuntime = 0;

  watched.forEach((item) => {
    if (item.mediaType === 'tv') tvCount += 1;
    else movieCount += 1;
    if (item.voteAverage) {
      totalRating += item.voteAverage;
      ratedCount += 1;
    }
    totalRuntime += Number(item.runtime || 0);
    item.genres.forEach((genre) => genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1));
    if (item.year) yearCounts.set(String(item.year), (yearCounts.get(String(item.year)) || 0) + 1);
    if (item.collection) collectionCounts.set(item.collection, (collectionCounts.get(item.collection) || 0) + 1);
  });

  const userRated = normalizeKinoWallReviews(profile.reviews || []);
  const userAvgRating = userRated.length ? userRated.reduce((sum, item) => sum + Number(item.rating || 0), 0) / userRated.length : 0;
  const topGenres = Array.from(genreCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);
  const years = Array.from(yearCounts.entries()).sort((a, b) => Number(a[0]) - Number(b[0]));
  const avgRating = ratedCount ? totalRating / ratedCount : 0;
  const collectionMax = Math.max(0, ...Array.from(collectionCounts.values()));
  const oldestYear = Math.min(...watched.map((item) => Number(item.year)).filter(Boolean));
  const newestYear = Math.max(...watched.map((item) => Number(item.year)).filter(Boolean));

  return {
    watchedTotal: watched.length,
    favoriteTotal: favorites.length,
    showcaseTotal: profile.showcase.length,
    movieCount,
    tvCount,
    avgRating,
    userAvgRating,
    reviewsTotal: userRated.length,
    topGenres,
    years,
    collectionMax,
    actorsTotal: profile.actors.length,
    scenesTotal: profile.scenes.length,
    soundtracksTotal: profile.soundtracks.length,
    totalRuntime,
    oldestYear: Number.isFinite(oldestYear) ? oldestYear : 0,
    newestYear: Number.isFinite(newestYear) ? newestYear : 0,
    all,
    reviewed
  };
}

function buildKinoWallAchievements(stats, allDetails = []) {
  const countGenre = (needle) => stats.topGenres.reduce((sum, [genre, count]) => sum + (genre.toLowerCase().includes(needle) ? count : 0), 0);
  const countGenres = (needles) => needles.reduce((sum, needle) => sum + countGenre(needle), 0);
  const movie = allDetails.find((item) => item.mediaType === 'movie');
  const tv = allDetails.find((item) => item.mediaType === 'tv');
  const highRated = allDetails.find((item) => item.voteAverage >= 8);
  const lowRated = allDetails.find((item) => item.voteAverage && item.voteAverage < 6);
  const posterFrom = (item) => item?.backdropUrl || item?.posterUrl || '';
  const anyWithGenre = (pattern) => stats.all.find((item) => pattern.test(item.genres.join(' ')));
  const releaseSpread = stats.oldestYear && stats.newestYear ? Math.max(0, stats.newestYear - stats.oldestYear) : 0;
  const defs = [
    { id: 'first-watch', title: 'Первый сеанс', level: 'Общее', target: 1, value: stats.watchedTotal, text: 'На киностене появился первый просмотр. Каталог уже знает дорогу.', image: posterFrom(movie || tv) },
    { id: 'five-watch', title: 'Разогрев перед марафоном', level: 'Общее', target: 5, value: stats.watchedTotal, text: 'Пять тайтлов — уже не случайный клик, а маленькая привычка.', image: posterFrom(movie || tv) },
    { id: 'ten-watch', title: 'Уже не случайность', level: 'Общее', target: 10, value: stats.watchedTotal, text: '10 просмотренных тайтлов. Это уже не фон, это стиль жизни.', image: posterFrom(highRated || movie || tv) },
    { id: 'twenty-five-watch', title: 'Список становится биографией', level: 'Общее', target: 25, value: stats.watchedTotal, text: '25 просмотров — вкус уже начинает оставлять отпечатки.', image: posterFrom(highRated || movie || tv) },
    { id: 'fifty-watch', title: 'Киноман честной судьбы', level: 'Общее', target: 50, value: stats.watchedTotal, text: '50 тайтлов в истории. Пульт можно выдавать как официальный документ.', image: posterFrom(highRated || movie || tv) },
    { id: 'hundred-watch', title: 'Архивариус ночных сеансов', level: 'Общее', target: 100, value: stats.watchedTotal, text: '100 просмотренных тайтлов. Сон пытался, но проиграл.', image: posterFrom(highRated || movie || tv) },
    { id: 'two-hundred-watch', title: 'Живой каталог', level: 'Общее', target: 200, value: stats.watchedTotal, text: '200 тайтлов. Теперь рекомендации должны спрашивать совета у тебя.', image: posterFrom(highRated || movie || tv) },
    { id: 'serial-hostage', title: 'Сериальный заложник', level: 'Формат', target: 10, value: stats.tvCount, text: 'Сериалы уже не смотрятся — они держат в плену сезонами.', image: posterFrom(tv) },
    { id: 'seasonal-citizen', title: 'Гражданин сезонов', level: 'Формат', target: 25, value: stats.tvCount, text: 'Сериалы стали отдельным государством, и у тебя там прописка.', image: posterFrom(tv) },
    { id: 'movie-core', title: 'Фильм вместо ужина', level: 'Формат', target: 20, value: stats.movieCount, text: 'Фильмы стали надёжным планом на вечер, даже если плана не было.', image: posterFrom(movie) },
    { id: 'cinema-diet', title: 'Полнометражная диета', level: 'Формат', target: 60, value: stats.movieCount, text: '60 фильмов. Ужин может подождать, финал — нет.', image: posterFrom(movie) },
    { id: 'comedy', title: 'Смеховой иммунитет', level: 'Жанровые', target: 10, value: countGenre('комед'), text: 'Комедия прокачана. Сарказм теперь идёт в комплекте.', image: posterFrom(anyWithGenre(/комед/i)) },
    { id: 'comedy-master', title: 'Доктор ха-ха', level: 'Жанровые', target: 25, value: countGenre('комед'), text: 'Комедии уже лечат настроение без рецепта.', image: posterFrom(anyWithGenre(/комед/i)) },
    { id: 'horror', title: 'Ночной хоррорщик', level: 'Жанровые', target: 10, value: countGenres(['ужас', 'хоррор']), text: 'Страшное больше не пугает. Максимум — просит рекомендацию.', image: posterFrom(anyWithGenre(/ужас|хоррор/i)) },
    { id: 'horror-priest', title: 'Священник скримеров', level: 'Жанровые', target: 25, value: countGenres(['ужас', 'хоррор']), text: 'Хоррор видел тебя и сам выключил свет.', image: posterFrom(anyWithGenre(/ужас|хоррор/i)) },
    { id: 'drama', title: 'Грустно, вкусно, больно', level: 'Жанровые', target: 10, value: countGenre('драм'), text: 'Драма прокачана. Душа получила субтитры.', image: posterFrom(anyWithGenre(/драм/i)) },
    { id: 'drama-cryproof', title: 'Слёзы в IMAX', level: 'Жанровые', target: 25, value: countGenre('драм'), text: 'После такого количества драм даже титры выглядят личными.', image: posterFrom(anyWithGenre(/драм/i)) },
    { id: 'fantasy', title: 'Портал открыт', level: 'Жанровые', target: 8, value: countGenres(['фэнтези', 'фантаст']), text: 'Фантастика и фэнтези подозрительно похожи на домашний адрес.', image: posterFrom(anyWithGenre(/фэнтези|фантаст/i)) },
    { id: 'space-key', title: 'Ключ от другой реальности', level: 'Жанровые', target: 20, value: countGenres(['фэнтези', 'фантаст']), text: 'Реальность теперь просто один из вариантов сеттинга.', image: posterFrom(anyWithGenre(/фэнтези|фантаст/i)) },
    { id: 'action', title: 'Взрывы вместо кофе', level: 'Жанровые', target: 12, value: countGenre('боев'), text: 'Экшен зашёл так уверенно, что монтаж стал быстрее пульса.', image: posterFrom(anyWithGenre(/боев/i)) },
    { id: 'thriller', title: 'Паранойя с попкорном', level: 'Жанровые', target: 12, value: countGenre('триллер'), text: 'Триллеры научили не доверять даже тихой музыке.', image: posterFrom(anyWithGenre(/триллер/i)) },
    { id: 'romance', title: 'Конфетно-букетный период', level: 'Жанровые', target: 10, value: countGenre('мелодрам') + countGenre('роман'), text: 'Романтика на стене есть. Сердце делает вид, что это случайно.', image: posterFrom(anyWithGenre(/мелодрам|роман/i)) },
    { id: 'documentary', title: 'Факты вместо магии', level: 'Жанровые', target: 8, value: countGenre('документ'), text: 'Документалки доказывают: реальность иногда пишет сценарий жёстче.', image: posterFrom(anyWithGenre(/документ/i)) },
    { id: 'animation', title: 'Мульт, но серьёзно', level: 'Жанровые', target: 10, value: countGenre('мульт') + countGenre('анимац'), text: 'Анимация давно выросла. Просто делает вид, что всё ещё играет.', image: posterFrom(anyWithGenre(/мульт|анимац/i)) },
    { id: 'crime', title: 'Дело раскрыто диваном', level: 'Жанровые', target: 10, value: countGenre('кримин'), text: 'Криминальные истории смотрятся так, будто у тебя уже есть доска с нитками.', image: posterFrom(anyWithGenre(/кримин/i)) },
    { id: 'family', title: 'Семейный пакет', level: 'Жанровые', target: 8, value: countGenre('семей'), text: 'Семейное кино: вроде мягко, а иногда пробивает сильнее драмы.', image: posterFrom(anyWithGenre(/семей/i)) },
    { id: 'collector', title: 'Франшизный псих', level: 'Франшизы', target: 4, value: stats.collectionMax, text: 'Несколько частей одной франшизы подряд. Назад дороги уже нет.', image: posterFrom(stats.all.find((item) => item.collection)) },
    { id: 'franchise-saga', title: 'Сага съела выходные', level: 'Франшизы', target: 7, value: stats.collectionMax, text: 'Семь частей одной истории. Титры уже узнают тебя в лицо.', image: posterFrom(stats.all.find((item) => item.collection)) },
    { id: 'favorites', title: 'Полка любимого', level: 'Профиль', target: 12, value: stats.favoriteTotal, text: 'Избранное перестало быть списком. Это уже личный музей.', image: posterFrom(stats.all[0]) },
    { id: 'favorite-museum', title: 'Музей вкуса', level: 'Профиль', target: 40, value: stats.favoriteTotal, text: '40 избранных тайтлов. Экскурсии начинаются с фразы “смотри обязательно”.', image: posterFrom(stats.all[0]) },
    { id: 'showcase', title: 'Витрина вкуса', level: 'Профиль', target: 8, value: stats.showcaseTotal, text: 'Киностена оформлена тайтлами, за которые не стыдно спорить.', image: posterFrom(stats.all[1] || stats.all[0]) },
    { id: 'showcase-curator', title: 'Куратор личного зала', level: 'Профиль', target: 20, value: stats.showcaseTotal, text: 'На витрине уже двадцать причин понять твой кинохарактер.', image: posterFrom(stats.all[1] || stats.all[0]) },
    { id: 'actor-shelf', title: 'Любимые лица', level: 'Профиль', target: 5, value: stats.actorsTotal, text: 'Актёры на стене появились. Теперь у вкуса есть лица.', image: '' },
    { id: 'casting-director', title: 'Личный кастинг-директор', level: 'Профиль', target: 15, value: stats.actorsTotal, text: '15 людей кино в любимых. Роли распределены сердцем.', image: '' },
    { id: 'soundtracks', title: 'Саундтрек в крови', level: 'Профиль', target: 5, value: stats.soundtracksTotal, text: 'Музыка на стене есть. Значит, у профиля появился пульс.', image: '' },
    { id: 'playlist-soul', title: 'Плейлист вместо паспорта', level: 'Профиль', target: 15, value: stats.soundtracksTotal, text: 'Саундтреки уже рассказывают о тебе больше, чем анкета.', image: '' },
    { id: 'scenes', title: 'Кадр, который остался', level: 'Профиль', target: 5, value: stats.scenesTotal, text: 'Любимые сцены собраны. Теперь память работает в widescreen.', image: '' },
    { id: 'frame-hunter', title: 'Охотник за кадрами', level: 'Профиль', target: 15, value: stats.scenesTotal, text: '15 сцен на стене. Моменты уже не теряются после титров.', image: '' },
    { id: 'review-first', title: 'Сказал как отрезал', level: 'Отзывы', target: 1, value: stats.reviewsTotal, text: 'Первый личный отзыв сохранён. Теперь тайтлы отвечают перед тобой.', image: posterFrom(stats.reviewed?.[0] || highRated || movie || tv) },
    { id: 'review-critic', title: 'Критик без бейджа', level: 'Отзывы', target: 10, value: stats.reviewsTotal, text: '10 отзывов. Рецензии уже смотрят на тебя с уважением.', image: posterFrom(stats.reviewed?.[0] || highRated || movie || tv) },
    { id: 'review-columnist', title: 'Колонка в голове', level: 'Отзывы', target: 30, value: stats.reviewsTotal, text: '30 отзывов. Можно открывать рубрику “я же говорил”.', image: posterFrom(stats.reviewed?.[0] || highRated || movie || tv) },
    { id: 'strict-judge', title: 'Строгий судья', level: 'Отзывы', target: 1, value: stats.reviewsTotal && stats.userAvgRating <= 6 ? 1 : 0, text: 'Средняя личная оценка ниже 6.0. Попкорн был, пощады не было.', image: posterFrom(lowRated || stats.reviewed?.[0]) },
    { id: 'kind-judge', title: 'Добрый зритель', level: 'Отзывы', target: 1, value: stats.reviewsTotal >= 3 && stats.userAvgRating >= 8 ? 1 : 0, text: 'Средняя личная оценка 8+. Кино нашло к тебе мягкий подход.', image: posterFrom(highRated || stats.reviewed?.[0]) },
    { id: 'time-traveller', title: 'Путешественник по эпохам', level: 'Годы', target: 30, value: releaseSpread, text: 'Разница между годами релиза уже похожа на машину времени.', image: posterFrom(stats.all.find((item) => item.year === stats.oldestYear) || stats.all[0]) },
    { id: 'century-pass', title: 'Вековой абонемент', level: 'Годы', target: 70, value: releaseSpread, text: 'Кино разных эпох лежит на одной стене. История одобряет.', image: posterFrom(stats.all.find((item) => item.year === stats.oldestYear) || stats.all[0]) },
    { id: 'long-night', title: 'Длинная ночь', level: 'Время', target: 600, value: stats.totalRuntime, text: '600 минут контента. Это уже не вечер, это маленький отпуск.', image: posterFrom(highRated || movie || tv) },
    { id: 'runtime-beast', title: 'Хронометражный зверь', level: 'Время', target: 2400, value: stats.totalRuntime, text: '2400 минут. Пауза стала мифом.', image: posterFrom(highRated || movie || tv) }
  ];

  return defs.map((achievement) => ({
    ...achievement,
    value: Math.max(0, Number(achievement.value || 0)),
    target: Math.max(1, Number(achievement.target || 1)),
    progress: Math.max(0, Math.min(100, Math.round((Number(achievement.value || 0) / Math.max(1, Number(achievement.target || 1))) * 100))),
    unlocked: Number(achievement.value || 0) >= Number(achievement.target || 1)
  }));
}

function renderKinoWall(data, activeTab = 'overview') {
  const { profile, readOnly } = data;
  const heroStyle = `--kw-accent:${escapeHtml(profile.accentColor)};${profile.bannerUrl ? `--kw-banner-image:url('${escapeHtml(profile.bannerUrl)}');` : ''}`;
  const initial = escapeHtml((profile.name || 'К').slice(0, 1).toUpperCase());
  const freshness = readOnly ? `<div class="kinowall-freshness">Актуальность киностены: ${escapeHtml(getKinoWallTimestampLabel(profile.updatedAt))}. Чтобы получить свежие данные, попросите владельца отправить ссылку повторно.</div>` : '';
  kinoWallContent.dataset.kwMode = readOnly ? 'shared' : 'local';
  kinoWallContent.innerHTML = `
    <section class="kinowall-hero" style="${heroStyle}">
      <div class="kinowall-hero-bg"></div>
      <div class="kinowall-avatar">${profile.avatarUrl ? `<img src="${escapeHtml(profile.avatarUrl)}" alt="${escapeHtml(profile.name)}">` : `<span>${initial}</span>`}</div>
      <div class="kinowall-hero-text">
        <div class="kinowall-kicker">${readOnly ? 'shared kinowall' : 'local kinowall'}</div>
        <h1 id="kinoWallTitle">${escapeHtml(profile.name)}</h1>
        <p>${escapeHtml(profile.status)}</p>
        <div class="kinowall-vibe">${escapeHtml(profile.vibe)}</div>
        ${freshness}
      </div>
      <div class="kinowall-hero-actions">
        ${readOnly ? '<button type="button" class="kw-btn kw-secondary" data-kw-action="save-shared">Сохранить себе</button>' : '<button type="button" class="kw-btn kw-primary" data-kw-action="edit">Редактировать</button>'}
        <button type="button" class="kw-btn kw-secondary" data-kw-action="share">Поделиться</button>
      </div>
    </section>

    <nav class="kinowall-tabs" aria-label="Разделы киностены">
      <button type="button" class="kinowall-tab ${activeTab === 'overview' ? 'active' : ''}" data-kw-tab="overview">Обзор</button>
      <button type="button" class="kinowall-tab ${activeTab === 'achievements' ? 'active' : ''}" data-kw-tab="achievements">Достижения</button>
      ${readOnly ? '' : `<button type="button" class="kinowall-tab ${activeTab === 'edit' ? 'active' : ''}" data-kw-tab="edit">Редактор</button>`}
      <button type="button" class="kinowall-tab ${activeTab === 'share' ? 'active' : ''}" data-kw-tab="share">Шаринг</button>
    </nav>

    <div class="kinowall-tab-body" id="kinoWallTabBody"></div>
  `;
  bindKinoWallShellEvents(data);
  renderKinoWallTab(data, activeTab);
}

function renderKinoWallOverviewTab(data) {
  const { profile, stats, showcase, watched, favorites, reviewed } = data;
  return `
    <section class="kinowall-grid-top">
      <div class="kinowall-about-card">
        <div class="kinowall-section-title">Обо мне</div>
        <p>${escapeHtml(profile.bio)}</p>
        <div class="kinowall-mini-stats">
          ${renderKinoWallMetric('Просмотрено', stats.watchedTotal)}
          ${renderKinoWallMetric('Отзывы', stats.reviewsTotal)}
          ${renderKinoWallMetric('На стене', stats.showcaseTotal)}
          ${renderKinoWallMetric('Моя средняя', stats.userAvgRating ? stats.userAvgRating.toFixed(1) : '—')}
        </div>
      </div>
      <div class="kinowall-chart-card">
        <div class="kinowall-section-title">Годы релизов в просмотрах</div>
        <p class="kinowall-muted">Показывает, фильмы и сериалы каких годов встречаются в истории просмотров чаще всего.</p>
        ${renderKinoWallYearChart(stats.years)}
      </div>
    </section>

    ${renderKinoWallTitleRail('Витрина вкуса', showcase, 'showcase', data.readOnly)}
    ${renderKinoWallTitleRail('История просмотров', watched.slice(0, 18), 'watched', data.readOnly)}
    ${renderKinoWallReviewsRail(reviewed || [], data.readOnly)}
    ${renderKinoWallTitleRail('Избранное из каталога', favorites.slice(0, 18), 'favorites', data.readOnly)}

    <section class="kinowall-columns">
      <div class="kinowall-panel">
        <div class="kinowall-section-title">Любимые актёры / люди кино</div>
        <div class="kinowall-people-grid">${profile.actors.length ? profile.actors.map(renderKinoWallPerson).join('') : renderKinoWallEmpty('Добавь актёров из раздела «Подробнее» или в редакторе.')}</div>
      </div>
      <div class="kinowall-panel">
        <div class="kinowall-section-title">Саундтреки</div>
        <div class="kinowall-soundtrack-list">${profile.soundtracks.length ? profile.soundtracks.map(renderKinoWallSoundtrack).join('') : renderKinoWallEmpty('Сюда можно добавить треки, которые держат вайб.')}</div>
      </div>
    </section>

    <section class="kinowall-panel">
      <div class="kinowall-section-title">Любимые сцены и кадры</div>
      <div class="kinowall-scene-grid">${profile.scenes.length ? profile.scenes.map(renderKinoWallScene).join('') : renderKinoWallEmpty('Добавь сцены, кадры или моменты в редакторе.')}</div>
    </section>`;
}

function renderKinoWallReviewsRail(items = [], readOnly = false) {
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-head-row">
        <div class="kinowall-section-title">Отзывы и личные оценки</div>
        <span>${items.length}</span>
      </div>
      ${items.length ? `<div class="kinowall-review-grid">${items.map((item) => renderKinoWallReviewCard(item, readOnly)).join('')}</div>` : renderKinoWallEmpty('После просмотра можно оставить локальную оценку и отзыв под плеером.')}
    </section>`;
}

function renderKinoWallReviewCard(item, readOnly = false) {
  const poster = item.posterUrl ? `<img src="${escapeHtml(item.posterUrl)}" alt="${escapeHtml(item.title)}" loading="lazy">` : `<div class="kinowall-poster-fallback">${escapeHtml(item.title)}</div>`;
  return `
    <article class="kinowall-review-card" data-id="${item.id}" data-media-type="${item.mediaType}">
      <div class="kinowall-review-poster">${poster}</div>
      <div class="kinowall-review-body">
        <div class="kinowall-review-top"><b>${escapeHtml(item.title)}</b><span>${Number(item.userRating || 0).toFixed(1)}/10</span></div>
        <p>${escapeHtml(item.userReview || 'Без текстового отзыва.')}</p>
        <small>${escapeHtml(item.reviewedAt ? getKinoWallTimestampLabel(item.reviewedAt) : '')}</small>
        <div class="kinowall-title-actions">
          <button type="button" class="kw-mini-btn" data-kw-watch="${item.id}" data-media-type="${item.mediaType}">Смотреть</button>
          ${readOnly ? '' : `<button type="button" class="kw-mini-btn danger" data-kw-remove-review="${item.id}" data-media-type="${item.mediaType}">Удалить отзыв</button>`}
        </div>
      </div>
    </article>`;
}

function renderKinoWallPerson(item) {
  const avatar = item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" loading="lazy">` : `<span>${escapeHtml((item.name || '?').slice(0, 1).toUpperCase())}</span>`;
  return `<article class="kinowall-person" ${item.tmdbId ? `data-person-id="${Number(item.tmdbId)}"` : ''}><div>${avatar}</div><b>${escapeHtml(item.name || 'Без имени')}</b><span>${escapeHtml(item.note || '')}</span></article>`;
}

function bindKinoWallOverviewEvents(data) {
  kinoWallContent.querySelectorAll('[data-kw-watch]').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = Number(button.dataset.kwWatch);
      const mediaType = button.dataset.mediaType === 'tv' ? 'tv' : 'movie';
      const payload = await buildPlayerPayloadFromId(id, mediaType);
      window.location.hash = `${mediaType}-${id}`;
      await openKinoBox(payload);
    });
  });
  kinoWallContent.querySelectorAll('[data-kw-remove-showcase]').forEach((button) => {
    button.addEventListener('click', async () => {
      const profile = readKinoWallProfile();
      const id = Number(button.dataset.kwRemoveShowcase);
      const mediaType = button.dataset.mediaType === 'tv' ? 'tv' : 'movie';
      profile.showcase = profile.showcase.filter((entry) => !isSameKinoWallEntry(entry, { id, mediaType }));
      saveKinoWallProfile(profile);
      await openKinoWall();
      await loadContent(state.currentPage).catch(() => {});
    });
  });
  kinoWallContent.querySelectorAll('[data-kw-remove-review]').forEach((button) => {
    button.addEventListener('click', async () => {
      removeKinoWallReview(Number(button.dataset.kwRemoveReview || 0), button.dataset.mediaType === 'tv' ? 'tv' : 'movie');
      await openKinoWall();
    });
  });
  kinoWallContent.querySelectorAll('.kinowall-person[data-person-id]').forEach((card) => {
    card.addEventListener('click', () => openDetailsPersonModal(Number(card.dataset.personId || 0)));
  });
}

function serializeKinoWallPeople(items = []) {
  return items.map((item) => [item.tmdbId || '', item.name, item.note, item.imageUrl].filter((value, index) => index < 3 || value).join(' | ')).join('\n');
}

function bindKinoWallEditorEvents(data) {
  bindKinoWallOverviewEvents(data);
  const formEl = document.getElementById('kinoWallEditorForm');
  formEl?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const current = readKinoWallProfile();
    const nextProfile = saveKinoWallProfile({
      ...current,
      name: formData.get('name'),
      handle: formData.get('handle'),
      status: formData.get('status'),
      vibe: formData.get('vibe'),
      avatarUrl: formData.get('avatarUrl'),
      bannerUrl: formData.get('bannerUrl'),
      accentColor: formData.get('accentColor'),
      bio: sanitizeKinoWallLongText(formData.get('bio'), 420),
      actors: parsePipeList(formData.get('actorsRaw'), ([tmdbIdOrName, nameOrNote, noteOrImage, imageMaybe]) => {
        const maybeId = Number(tmdbIdOrName || 0);
        if (Number.isFinite(maybeId) && maybeId > 0) return { tmdbId: maybeId, name: nameOrNote, note: noteOrImage, imageUrl: imageMaybe };
        return { tmdbId: 0, name: tmdbIdOrName, note: nameOrNote, imageUrl: noteOrImage };
      }),
      scenes: parsePipeList(formData.get('scenesRaw'), ([title, note, imageUrl]) => ({ title, note, imageUrl })),
      soundtracks: parsePipeList(formData.get('soundtracksRaw'), ([title, artist, url]) => ({ title, artist, url }))
    });
    await openKinoWall({ profile: nextProfile });
  });

  kinoWallContent.querySelector('[data-kw-editor-action="reset-demo"]')?.addEventListener('click', async () => {
    const profile = readKinoWallProfile();
    const demo = createDefaultKinoWallProfile();
    profile.actors = demo.actors;
    profile.scenes = demo.scenes;
    profile.soundtracks = demo.soundtracks;
    saveKinoWallProfile(profile);
    await openKinoWall();
  });
}

function renderKinoWallShareTab(data) {
  const link = buildKinoWallShareLink(data.profile);
  const shareText = data.readOnly
    ? `Это профиль, открытый по ссылке. Актуальность: ${getKinoWallTimestampLabel(data.profile.updatedAt)}. Чтобы увидеть свежую версию, попросите владельца отправить ссылку повторно.`
    : 'RMP делает компактную ссылку без серверов: внутри только ID тайтлов, текст, оформление, отзывы и дата актуальности. Можно дополнительно попробовать внешний short-link.';
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-title">Красивый шаринг</div>
      <p class="kinowall-muted">${escapeHtml(shareText)}</p>
      <div class="kinowall-share-box">
        <textarea id="kinoWallShareLink" readonly rows="4">${escapeHtml(link)}</textarea>
        <div class="kinowall-share-actions">
          <button type="button" class="kw-btn kw-primary" data-kw-share-action="copy">Скопировать ссылку</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="shorten">Сделать внешне короткой</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="export">Экспорт JSON</button>
          ${data.readOnly ? '' : '<label class="kw-btn kw-secondary kw-file-label">Импорт JSON<input id="kinoWallImportFile" type="file" accept="application/json,.json" hidden></label>'}
        </div>
        <div id="kinoWallShareStatus" class="kinowall-share-status"></div>
      </div>
    </section>`;
}

function bindKinoWallShareEvents(data) {
  const status = document.getElementById('kinoWallShareStatus');
  const shareField = document.getElementById('kinoWallShareLink');
  kinoWallContent.querySelector('[data-kw-share-action="copy"]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareField.value);
      if (status) status.textContent = 'Ссылка скопирована.';
    } catch (error) {
      shareField.select();
      if (status) status.textContent = 'Не удалось скопировать автоматически. Ссылка выделена — скопируй вручную.';
    }
  });

  kinoWallContent.querySelector('[data-kw-share-action="shorten"]')?.addEventListener('click', async () => {
    if (status) status.textContent = 'Пробую внешний short-link. Если сервис заблокирует CORS — оставлю компактную RMP-ссылку.';
    try {
      const request = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(shareField.value)}`);
      if (!request.ok) throw new Error(`HTTP ${request.status}`);
      const shortLink = (await request.text()).trim();
      if (!/^https?:\/\//i.test(shortLink)) throw new Error('Bad response');
      shareField.value = shortLink;
      await navigator.clipboard.writeText(shortLink).catch(() => {});
      if (status) status.textContent = 'Короткая ссылка создана и скопирована. Если она перестанет работать, используй экспорт JSON.';
    } catch (error) {
      if (status) status.textContent = 'Внешний сервис не ответил из браузера. Компактная RMP-ссылка выше полностью рабочая и бесплатная.';
    }
  });

  kinoWallContent.querySelector('[data-kw-share-action="export"]')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data.profile, null, 2)], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `rmp-kinowall-${sanitizeKinoWallHandle(data.profile.handle)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  document.getElementById('kinoWallImportFile')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const profile = saveKinoWallProfile(JSON.parse(text));
      if (status) status.textContent = 'Профиль импортирован.';
      await openKinoWall({ profile });
    } catch (error) {
      if (status) status.textContent = 'Не удалось импортировать JSON.';
    }
  });
}

function buildKinoWallShareLink(profile) {
  const payload = compactKinoWallProfile(profile);
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const url = new URL(window.location.href);
  url.hash = `${KINOWALL_SHARE_HASH_PREFIX}${encoded}`;
  return url.toString();
}

function minimizeKinoWallProfile(profile) {
  return compactKinoWallProfile(profile);
}

function parseKinoWallProfileFromHash(hashValue = window.location.hash) {
  const rawHash = String(hashValue || '').replace(/^#/, '').trim();
  if (!rawHash.startsWith(KINOWALL_SHARE_HASH_PREFIX)) return null;
  const encoded = rawHash.slice(KINOWALL_SHARE_HASH_PREFIX.length);
  if (!encoded) return null;
  const payload = JSON.parse(base64UrlDecode(encoded));
  return normalizeKinoWallProfile(expandCompactKinoWallProfile(payload));
}

function renderKinoWallEditorTab(data) {
  const profile = data.profile;
  return `
    <form id="kinoWallEditorForm" class="kinowall-editor-form">
      <section class="kinowall-panel">
        <div class="kinowall-section-title">Профиль</div>
        <div class="kinowall-form-grid">
          ${renderKinoWallInput('name', 'Имя на стене', profile.name, 42)}
          ${renderKinoWallInput('handle', 'Короткий ник для шаринга', profile.handle, 32)}
          ${renderKinoWallInput('status', 'Статус', profile.status, 90)}
          ${renderKinoWallInput('vibe', 'Любимый вайб', profile.vibe, 120)}
          ${renderKinoWallInput('avatarUrl', 'URL аватара', profile.avatarUrl, 900)}
          ${renderKinoWallInput('bannerUrl', 'URL баннера', profile.bannerUrl, 900)}
          <label class="kinowall-field"><span>Акцент профиля</span><input name="accentColor" type="color" value="${escapeHtml(profile.accentColor)}"></label>
        </div>
        <label class="kinowall-field wide"><span>Обо мне</span><textarea name="bio" rows="4" maxlength="420">${escapeHtml(profile.bio)}</textarea></label>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Витрина тайтлов</div>
        <p class="kinowall-muted">Нажимай кнопку 👤 на карточках каталога, чтобы добавлять/убирать тайтлы. Здесь можно быстро убрать лишнее.</p>
        <div class="kinowall-title-rail editor">${data.showcase.length ? data.showcase.map((item) => renderKinoWallTitleCard(item, 'showcase', false)).join('') : renderKinoWallEmpty('Пока пусто. Добавь тайтлы кнопкой 👤 в каталоге.')}</div>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Любимые актёры / люди кино</div>
        <p class="kinowall-muted">Формат строки: TMDB ID | Имя | заметка | URL картинки. ID и картинка необязательны. Из «Подробнее» актёры добавляются автоматически.</p>
        <textarea name="actorsRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallPeople(profile.actors))}</textarea>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Любимые сцены / кадры</div>
        <p class="kinowall-muted">Формат строки: Название сцены | описание | URL кадра. Можно добавлять свои ссылки на изображения.</p>
        <textarea name="scenesRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallCards(profile.scenes))}</textarea>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Саундтреки</div>
        <p class="kinowall-muted">Формат строки: Название | исполнитель/фильм | ссылка.</p>
        <textarea name="soundtracksRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallSoundtracks(profile.soundtracks))}</textarea>
      </section>

      <div class="kinowall-editor-actions">
        <button type="submit" class="kw-btn kw-primary">Сохранить киностену</button>
        <button type="button" class="kw-btn kw-secondary" data-kw-editor-action="reset-demo">Вернуть демо-блоки</button>
      </div>
    </form>`;
}

function serializeKinoWallPeople(items = []) {
  return items.map((item) => {
    const hasId = Number(item.tmdbId || 0) > 0;
    const parts = hasId
      ? [item.tmdbId, item.name, item.note, item.imageUrl]
      : [item.name, item.note, item.imageUrl];
    return parts.filter((value, index) => index < (hasId ? 3 : 2) || value).join(' | ');
  }).join('\n');
}

/* ===== RMP patch: shared kinowall image persistence + overwrite confirm ===== */
function sanitizeKinoWallUrl(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  if (/^data:image\/(?:png|jpe?g|webp|gif|avif);base64,/i.test(url)) return url.slice(0, 650000);
  if (/^https?:\/\//i.test(url)) return url.slice(0, 2200);
  return '';
}

function escapeKinoWallCssUrl(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/[\r\n]/g, '');
}

function renderKinoWallAvatar(profile, initial) {
  const src = sanitizeKinoWallUrl(profile.avatarUrl || '');
  if (!src) return `<div class="kinowall-avatar" data-fallback="${escapeHtml(initial)}"></div>`;
  return `<div class="kinowall-avatar" data-fallback="${escapeHtml(initial)}"><img src="${escapeHtml(src)}" alt="${escapeHtml(profile.name || '')}" loading="eager" decoding="async" onerror="this.remove();"></div>`;
}

function renderKinoWall(data, activeTab = 'overview') {
  const { profile, readOnly } = data;
  const bannerUrl = sanitizeKinoWallUrl(profile.bannerUrl || '');
  const heroStyle = `--kw-accent:${escapeHtml(profile.accentColor)};${bannerUrl ? `--kw-banner-image:url('${escapeKinoWallCssUrl(bannerUrl)}');` : ''}`;
  const initial = escapeHtml((profile.name || 'К').slice(0, 1).toUpperCase());
  const freshness = readOnly ? `<div class="kinowall-freshness">Актуальность киностены: ${escapeHtml(getKinoWallTimestampLabel(profile.updatedAt))}. Чтобы получить свежие данные, попросите владельца отправить ссылку повторно.</div>` : '';
  kinoWallContent.dataset.kwMode = readOnly ? 'shared' : 'local';
  kinoWallContent.innerHTML = `
    <section class="kinowall-hero" style="${heroStyle}">
      <div class="kinowall-hero-bg"></div>
      ${renderKinoWallAvatar(profile, initial)}
      <div class="kinowall-hero-text">
        <div class="kinowall-kicker">${readOnly ? 'shared kinowall' : 'local kinowall'}</div>
        <h1 id="kinoWallTitle">${escapeHtml(profile.name)}</h1>
        <p>${escapeHtml(profile.status)}</p>
        <div class="kinowall-vibe">${escapeHtml(profile.vibe)}</div>
        ${freshness}
      </div>
      <div class="kinowall-hero-actions">
        ${readOnly ? '<button type="button" class="kw-btn kw-secondary" data-kw-action="save-shared">Сохранить себе</button>' : '<button type="button" class="kw-btn kw-primary" data-kw-action="edit">Редактировать</button>'}
        <button type="button" class="kw-btn kw-secondary" data-kw-action="share">Поделиться</button>
      </div>
    </section>

    <nav class="kinowall-tabs" aria-label="Разделы киностены">
      <button type="button" class="kinowall-tab ${activeTab === 'overview' ? 'active' : ''}" data-kw-tab="overview">Обзор</button>
      <button type="button" class="kinowall-tab ${activeTab === 'achievements' ? 'active' : ''}" data-kw-tab="achievements">Достижения</button>
      ${readOnly ? '' : `<button type="button" class="kinowall-tab ${activeTab === 'edit' ? 'active' : ''}" data-kw-tab="edit">Редактор</button>`}
      <button type="button" class="kinowall-tab ${activeTab === 'share' ? 'active' : ''}" data-kw-tab="share">Шаринг</button>
    </nav>

    <div class="kinowall-tab-body" id="kinoWallTabBody"></div>
  `;
  bindKinoWallShellEvents(data);
  renderKinoWallTab(data, activeTab);
}

function bindKinoWallShellEvents(data) {
  kinoWallContent.querySelectorAll('[data-kw-tab]').forEach((button) => {
    button.addEventListener('click', () => renderKinoWall(data, button.dataset.kwTab));
  });
  kinoWallContent.querySelectorAll('[data-kw-action]').forEach((button) => {
    button.addEventListener('click', async () => {
      const action = button.dataset.kwAction;
      if (action === 'edit') renderKinoWall(data, 'edit');
      if (action === 'share') renderKinoWall(data, 'share');
      if (action === 'save-shared') {
        openKinoWallOverwriteConfirm(async () => {
          saveKinoWallProfile(data.profile);
          button.textContent = 'Сохранено локально';
          button.disabled = true;
          const status = document.createElement('div');
          status.className = 'kinowall-save-shared-note';
          status.textContent = 'Киностена записана на это устройство.';
          button.closest('.kinowall-hero-actions')?.appendChild(status);
        });
      }
    });
  });
}

function openKinoWallOverwriteConfirm(onConfirm) {
  const old = document.querySelector('.kw-confirm-backdrop');
  if (old) old.remove();
  const modal = document.createElement('div');
  modal.className = 'kw-confirm-backdrop';
  modal.innerHTML = `
    <div class="kw-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="kwOverwriteTitle">
      <div class="kw-confirm-icon">👤</div>
      <h3 id="kwOverwriteTitle">Сохранить эту киностену себе?</h3>
      <p>Данные открытой киностены будут записаны поверх киностены, которая сейчас хранится на этом устройстве. Старый локальный профиль, витрина, актёры, отзывы и оформление будут заменены.</p>
      <div class="kw-confirm-actions">
        <button type="button" class="kw-btn kw-secondary" data-kw-confirm="cancel">Отмена</button>
        <button type="button" class="kw-btn kw-primary" data-kw-confirm="continue">Продолжить</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const close = () => modal.remove();
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-kw-confirm="cancel"]')) close();
    if (event.target.closest('[data-kw-confirm="continue"]')) {
      Promise.resolve(onConfirm?.()).finally(close);
    }
  });
  const escHandler = (event) => {
    if (event.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function renderKinoWallImageField(name, label, value, kind) {
  const previewClass = value ? 'has-image' : '';
  const preview = value
    ? `<div class="kinowall-image-field-preview ${kind === 'banner' ? 'banner' : 'avatar'} ${previewClass}"><img src="${escapeHtml(value)}" alt="" onerror="this.closest('.kinowall-image-field-preview').classList.remove('has-image');this.remove();"></div>`
    : `<div class="kinowall-image-field-preview ${kind === 'banner' ? 'banner' : 'avatar'}"><span>${kind === 'banner' ? 'Баннер' : 'Аватар'}</span></div>`;
  return `
    <div class="kinowall-image-field wide" data-kw-image-field="${escapeHtml(name)}">
      <div>
        <span>${escapeHtml(label)}</span>
        <p>Можно вставить URL или загрузить файл. Загруженный файл сжимается и встраивается в ссылку киностены, поэтому аватар/баннер нормально откроются на другом устройстве.</p>
      </div>
      <div class="kinowall-image-field-body">
        ${preview}
        <label class="kinowall-field"><span>URL</span><input name="${escapeHtml(name)}" type="text" maxlength="650000" value="${escapeHtml(value || '')}"></label>
        <label class="kw-btn kw-secondary kw-file-label">Загрузить файл<input name="${escapeHtml(name)}File" type="file" accept="image/png,image/jpeg,image/webp,image/avif" hidden></label>
      </div>
    </div>`;
}

function renderKinoWallEditorTab(data) {
  const profile = data.profile;
  return `
    <form id="kinoWallEditorForm" class="kinowall-editor-form">
      <section class="kinowall-panel">
        <div class="kinowall-section-title">Профиль</div>
        <div class="kinowall-form-grid">
          ${renderKinoWallInput('name', 'Имя на стене', profile.name, 42)}
          ${renderKinoWallInput('handle', 'Короткий ник для шаринга', profile.handle, 32)}
          ${renderKinoWallInput('status', 'Статус', profile.status, 90)}
          ${renderKinoWallInput('vibe', 'Любимый вайб', profile.vibe, 120)}
          <label class="kinowall-field"><span>Акцент профиля</span><input name="accentColor" type="color" value="${escapeHtml(profile.accentColor)}"></label>
        </div>
        <div class="kinowall-form-grid kinowall-image-form-grid">
          ${renderKinoWallImageField('avatarUrl', 'Аватар киностены', profile.avatarUrl, 'avatar')}
          ${renderKinoWallImageField('bannerUrl', 'Баннер киностены', profile.bannerUrl, 'banner')}
        </div>
        <label class="kinowall-field wide"><span>Обо мне</span><textarea name="bio" rows="4" maxlength="420">${escapeHtml(profile.bio)}</textarea></label>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Витрина тайтлов</div>
        <p class="kinowall-muted">Нажимай кнопку 👤 на карточках каталога, чтобы добавлять/убирать тайтлы. Здесь можно быстро убрать лишнее.</p>
        <div class="kinowall-title-rail editor">${data.showcase.length ? data.showcase.map((item) => renderKinoWallTitleCard(item, 'showcase', false)).join('') : renderKinoWallEmpty('Пока пусто. Добавь тайтлы кнопкой 👤 в каталоге.')}</div>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Любимые актёры / люди кино</div>
        <p class="kinowall-muted">Формат строки: TMDB ID | Имя | заметка | URL картинки. ID и картинка необязательны. Из «Подробнее» актёры добавляются автоматически.</p>
        <textarea name="actorsRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallPeople(profile.actors))}</textarea>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Любимые сцены / кадры</div>
        <p class="kinowall-muted">Формат строки: Название сцены | описание | URL кадра. Можно добавлять свои ссылки на изображения.</p>
        <textarea name="scenesRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallCards(profile.scenes))}</textarea>
      </section>

      <section class="kinowall-panel">
        <div class="kinowall-section-title">Саундтреки</div>
        <p class="kinowall-muted">Формат строки: Название | исполнитель/фильм | ссылка.</p>
        <textarea name="soundtracksRaw" rows="7" class="kinowall-raw-list">${escapeHtml(serializeKinoWallSoundtracks(profile.soundtracks))}</textarea>
      </section>

      <div class="kinowall-editor-actions">
        <button type="submit" class="kw-btn kw-primary">Сохранить киностену</button>
        <button type="button" class="kw-btn kw-secondary" data-kw-editor-action="reset-demo">Вернуть демо-блоки</button>
      </div>
    </form>`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

async function compressKinoWallImageFile(file, options = {}) {
  if (!file || !/^image\//i.test(file.type || '')) return '';
  const maxWidth = Number(options.maxWidth || 1200);
  const maxHeight = Number(options.maxHeight || 600);
  const quality = Number(options.quality || 0.78);
  const rawDataUrl = await readFileAsDataUrl(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = rawDataUrl;
    });
    const ratio = Math.min(1, maxWidth / Math.max(1, img.naturalWidth || img.width), maxHeight / Math.max(1, img.naturalHeight || img.height));
    const width = Math.max(1, Math.round((img.naturalWidth || img.width) * ratio));
    const height = Math.max(1, Math.round((img.naturalHeight || img.height) * ratio));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, height);
    let dataUrl = canvas.toDataURL('image/webp', quality);
    if (!/^data:image\/webp/i.test(dataUrl) || dataUrl.length > 620000) dataUrl = canvas.toDataURL('image/jpeg', Math.min(0.86, quality + 0.04));
    return sanitizeKinoWallUrl(dataUrl) || rawDataUrl;
  } catch (error) {
    console.warn('[kinowall image compress failed]', error);
    return sanitizeKinoWallUrl(rawDataUrl);
  }
}

function updateKinoWallImageFieldPreview(fieldName, dataUrl) {
  const root = document.querySelector(`[data-kw-image-field="${fieldName}"]`);
  if (!root) return;
  const input = root.querySelector(`input[name="${fieldName}"]`);
  if (input) input.value = dataUrl;
  const preview = root.querySelector('.kinowall-image-field-preview');
  if (preview) {
    preview.classList.add('has-image');
    preview.innerHTML = `<img src="${escapeHtml(dataUrl)}" alt="">`;
  }
}

function bindKinoWallEditorEvents(data) {
  bindKinoWallOverviewEvents(data);
  const formEl = document.getElementById('kinoWallEditorForm');
  formEl?.querySelectorAll('input[type="file"][name$="File"]').forEach((input) => {
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      input.closest('.kw-file-label')?.classList.add('is-loading');
      try {
        const isBanner = input.name === 'bannerUrlFile';
        const dataUrl = await compressKinoWallImageFile(file, isBanner
          ? { maxWidth: 1500, maxHeight: 520, quality: 0.74 }
          : { maxWidth: 420, maxHeight: 420, quality: 0.82 });
        updateKinoWallImageFieldPreview(isBanner ? 'bannerUrl' : 'avatarUrl', dataUrl);
      } finally {
        input.closest('.kw-file-label')?.classList.remove('is-loading');
      }
    });
  });

  formEl?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const current = readKinoWallProfile();
    const avatarFile = formEl.querySelector('input[name="avatarUrlFile"]')?.files?.[0];
    const bannerFile = formEl.querySelector('input[name="bannerUrlFile"]')?.files?.[0];
    const submitButton = formEl.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Сохраняю...';
    }
    try {
      const avatarUrl = avatarFile
        ? await compressKinoWallImageFile(avatarFile, { maxWidth: 420, maxHeight: 420, quality: 0.82 })
        : formData.get('avatarUrl');
      const bannerUrl = bannerFile
        ? await compressKinoWallImageFile(bannerFile, { maxWidth: 1500, maxHeight: 520, quality: 0.74 })
        : formData.get('bannerUrl');
      const nextProfile = saveKinoWallProfile({
        ...current,
        name: formData.get('name'),
        handle: formData.get('handle'),
        status: formData.get('status'),
        vibe: formData.get('vibe'),
        avatarUrl,
        bannerUrl,
        accentColor: formData.get('accentColor'),
        bio: sanitizeKinoWallLongText(formData.get('bio'), 420),
        actors: parsePipeList(formData.get('actorsRaw'), ([tmdbIdOrName, nameOrNote, noteOrImage, imageMaybe]) => {
          const maybeId = Number(tmdbIdOrName || 0);
          if (Number.isFinite(maybeId) && maybeId > 0) return { tmdbId: maybeId, name: nameOrNote, note: noteOrImage, imageUrl: imageMaybe };
          return { tmdbId: 0, name: tmdbIdOrName, note: nameOrNote, imageUrl: noteOrImage };
        }),
        scenes: parsePipeList(formData.get('scenesRaw'), ([title, note, imageUrl]) => ({ title, note, imageUrl })),
        soundtracks: parsePipeList(formData.get('soundtracksRaw'), ([title, artist, url]) => ({ title, artist, url }))
      });
      await openKinoWall({ profile: nextProfile });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Сохранить киностену';
      }
    }
  });

  kinoWallContent.querySelector('[data-kw-editor-action="reset-demo"]')?.addEventListener('click', async () => {
    const profile = readKinoWallProfile();
    const demo = createDefaultKinoWallProfile();
    profile.actors = demo.actors;
    profile.scenes = demo.scenes;
    profile.soundtracks = demo.soundtracks;
    saveKinoWallProfile(profile);
    await openKinoWall();
  });
}

function renderKinoWallShareTab(data) {
  const link = buildKinoWallShareLink(data.profile);
  const hasEmbeddedImages = /^data:image\//i.test(data.profile.avatarUrl || '') || /^data:image\//i.test(data.profile.bannerUrl || '');
  const shareText = data.readOnly
    ? `Это профиль, открытый по ссылке. Актуальность: ${getKinoWallTimestampLabel(data.profile.updatedAt)}. Чтобы увидеть свежую версию, попросите владельца отправить ссылку повторно.`
    : `RMP делает компактную ссылку без серверов: внутри ID тайтлов, текст, оформление, отзывы, дата актуальности${hasEmbeddedImages ? ' и встроенные аватар/баннер' : ''}. Для надёжного шаринга между устройствами лучше загрузить аватар и баннер файлом в редакторе.`;
  const lengthNote = link.length > 12000
    ? '<p class="kinowall-share-warning">Ссылка получилась длинной из-за встроенных изображений. Она рабочая, но некоторые мессенджеры могут её обрезать. На всякий случай можно ещё сделать экспорт JSON.</p>'
    : '';
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-title">Красивый шаринг</div>
      <p class="kinowall-muted">${escapeHtml(shareText)}</p>
      ${lengthNote}
      <div class="kinowall-share-box">
        <textarea id="kinoWallShareLink" readonly rows="4">${escapeHtml(link)}</textarea>
        <div class="kinowall-share-actions">
          <button type="button" class="kw-btn kw-primary" data-kw-share-action="copy">Скопировать ссылку</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="shorten">Сделать внешне короткой</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="export">Экспорт JSON</button>
          ${data.readOnly ? '' : '<label class="kw-btn kw-secondary kw-file-label">Импорт JSON<input id="kinoWallImportFile" type="file" accept="application/json,.json" hidden></label>'}
        </div>
        <div id="kinoWallShareStatus" class="kinowall-share-status"></div>
      </div>
    </section>`;
}

/* ===== RMP patch: URL-only kinowall images + automatic short sharing ===== */
function sanitizeKinoWallUrl(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url.slice(0, 2200);
  return '';
}

function compactKinoWallProfile(profile) {
  const normalized = normalizeKinoWallProfile(profile);
  const compactEntry = (entry) => [entry.mediaType === 'tv' ? 't' : 'm', Number(entry.id || 0), entry.addedAt || ''];
  return {
    v: KINOWALL_VERSION,
    n: normalized.name,
    h: normalized.handle,
    s: normalized.status,
    b: normalized.bio,
    vb: normalized.vibe,
    av: sanitizeKinoWallUrl(normalized.avatarUrl),
    bn: sanitizeKinoWallUrl(normalized.bannerUrl),
    ac: normalized.accentColor,
    sh: normalized.showcase.slice(0, 60).map(compactEntry),
    w: normalized.watched.slice(0, 140).map(compactEntry),
    f: getFavorites().slice(0, 140).map(compactEntry),
    a: normalized.actors.map((person) => [person.tmdbId || 0, person.name || '', person.note || '', sanitizeKinoWallUrl(person.imageUrl || '')]),
    sc: normalized.scenes.map((scene) => [scene.title || '', scene.note || '', sanitizeKinoWallUrl(scene.imageUrl || '')]),
    st: normalized.soundtracks.map((track) => [track.title || '', track.artist || '', track.url || '']),
    r: normalized.reviews.map((review) => [review.mediaType === 'tv' ? 't' : 'm', Number(review.id || 0), Number(review.rating || 0), review.text || '', review.addedAt || '']),
    u: normalized.updatedAt || new Date().toISOString()
  };
}

function renderKinoWallImageField(name, label, value, kind) {
  const safeValue = sanitizeKinoWallUrl(value || '');
  const preview = safeValue
    ? `<div class="kinowall-image-field-preview ${kind === 'banner' ? 'banner' : 'avatar'} has-image"><img src="${escapeHtml(safeValue)}" alt="" onerror="this.closest('.kinowall-image-field-preview').classList.remove('has-image');this.remove();"></div>`
    : `<div class="kinowall-image-field-preview ${kind === 'banner' ? 'banner' : 'avatar'}"><span>${kind === 'banner' ? 'Баннер' : 'Аватар'}</span></div>`;
  return `
    <div class="kinowall-image-field wide" data-kw-image-field="${escapeHtml(name)}">
      <div>
        <span>${escapeHtml(label)}</span>
        <p>Вставь прямой URL картинки. Файлы намеренно не встраиваются в киностену, чтобы ссылка нормально сокращалась и открывалась на других устройствах.</p>
      </div>
      <div class="kinowall-image-field-body url-only">
        ${preview}
        <label class="kinowall-field"><span>URL картинки</span><input name="${escapeHtml(name)}" type="url" maxlength="2200" placeholder="https://..." value="${escapeHtml(safeValue)}"></label>
      </div>
    </div>`;
}

function updateKinoWallImageFieldPreviewFromUrl(input) {
  const root = input?.closest?.('.kinowall-image-field');
  if (!root) return;
  const preview = root.querySelector('.kinowall-image-field-preview');
  const url = sanitizeKinoWallUrl(input.value || '');
  if (!preview) return;
  if (url) {
    preview.classList.add('has-image');
    preview.innerHTML = `<img src="${escapeHtml(url)}" alt="" onerror="this.closest('.kinowall-image-field-preview').classList.remove('has-image');this.remove();">`;
  } else {
    const isBanner = preview.classList.contains('banner');
    preview.classList.remove('has-image');
    preview.innerHTML = `<span>${isBanner ? 'Баннер' : 'Аватар'}</span>`;
  }
}

function bindKinoWallEditorEvents(data) {
  bindKinoWallOverviewEvents(data);
  const formEl = document.getElementById('kinoWallEditorForm');

  formEl?.querySelectorAll('.kinowall-image-field input[type="url"]').forEach((input) => {
    input.addEventListener('input', () => updateKinoWallImageFieldPreviewFromUrl(input));
    input.addEventListener('change', () => updateKinoWallImageFieldPreviewFromUrl(input));
  });

  formEl?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const current = readKinoWallProfile();
    const submitButton = formEl.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Сохраняю...';
    }
    try {
      const nextProfile = saveKinoWallProfile({
        ...current,
        name: formData.get('name'),
        handle: formData.get('handle'),
        status: formData.get('status'),
        vibe: formData.get('vibe'),
        avatarUrl: sanitizeKinoWallUrl(formData.get('avatarUrl')),
        bannerUrl: sanitizeKinoWallUrl(formData.get('bannerUrl')),
        accentColor: formData.get('accentColor'),
        bio: sanitizeKinoWallLongText(formData.get('bio'), 420),
        actors: parsePipeList(formData.get('actorsRaw'), ([tmdbIdOrName, nameOrNote, noteOrImage, imageMaybe]) => {
          const maybeId = Number(tmdbIdOrName || 0);
          if (Number.isFinite(maybeId) && maybeId > 0) return { tmdbId: maybeId, name: nameOrNote, note: noteOrImage, imageUrl: sanitizeKinoWallUrl(imageMaybe) };
          return { tmdbId: 0, name: tmdbIdOrName, note: nameOrNote, imageUrl: sanitizeKinoWallUrl(noteOrImage) };
        }),
        scenes: parsePipeList(formData.get('scenesRaw'), ([title, note, imageUrl]) => ({ title, note, imageUrl: sanitizeKinoWallUrl(imageUrl) })),
        soundtracks: parsePipeList(formData.get('soundtracksRaw'), ([title, artist, url]) => ({ title, artist, url }))
      });
      await openKinoWall({ profile: nextProfile });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Сохранить киностену';
      }
    }
  });

  kinoWallContent.querySelector('[data-kw-editor-action="reset-demo"]')?.addEventListener('click', async () => {
    const profile = readKinoWallProfile();
    const demo = createDefaultKinoWallProfile();
    profile.actors = demo.actors;
    profile.scenes = demo.scenes;
    profile.soundtracks = demo.soundtracks;
    saveKinoWallProfile(profile);
    await openKinoWall();
  });
}

function renderKinoWallShareTab(data) {
  const longLink = buildKinoWallShareLink(data.profile);
  const shareText = data.readOnly
    ? `Это профиль, открытый по ссылке. Актуальность: ${getKinoWallTimestampLabel(data.profile.updatedAt)}. Чтобы увидеть свежую версию, попросите владельца отправить ссылку повторно.`
    : 'RMP автоматически создаст короткую ссылку для шаринга. Внутри киностены хранятся только текст, ID тайтлов, отзывы, оформление и URL картинок.';
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-title">Красивый шаринг</div>
      <p class="kinowall-muted">${escapeHtml(shareText)}</p>
      <div class="kinowall-share-box" data-kw-long-link="${escapeHtml(longLink)}">
        <label class="kinowall-field wide kinowall-short-link-field">
          <span>Ссылка на киностену</span>
          <input id="kinoWallShareLink" readonly value="Готовлю ссылку...">
        </label>
        <div class="kinowall-share-actions">
          <button type="button" class="kw-btn kw-primary" data-kw-share-action="copy" disabled>Скопировать ссылку</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="export">Экспорт JSON</button>
          ${data.readOnly ? '' : '<label class="kw-btn kw-secondary kw-file-label">Импорт JSON<input id="kinoWallImportFile" type="file" accept="application/json,.json" hidden></label>'}
        </div>
        <div id="kinoWallShareStatus" class="kinowall-share-status">Готовлю ссылку для копирования...</div>
      </div>
    </section>`;
}

async function fetchKinoWallShortEndpoint(endpoint, timeoutMs = 4500) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(endpoint, { cache: 'no-store', signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = (await response.text()).trim();
    if (/^https?:\/\//i.test(text)) return text;
    throw new Error('Bad short-link response');
  } finally {
    window.clearTimeout(timer);
  }
}

async function createKinoWallShortLink(longLink) {
  const endpoints = [
    `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longLink)}`,
    `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longLink)}`
  ];
  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      return await fetchKinoWallShortEndpoint(endpoint);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('Short-link service unavailable');
}

function bindKinoWallShareEvents(data) {
  const status = document.getElementById('kinoWallShareStatus');
  const shareField = document.getElementById('kinoWallShareLink');
  const copyButton = kinoWallContent.querySelector('[data-kw-share-action="copy"]');
  const box = kinoWallContent.querySelector('.kinowall-share-box');
  const fallbackLink = box?.dataset.kwLongLink || buildKinoWallShareLink(data.profile);
  let latestShareLink = fallbackLink;

  const setShareValue = (value, message, isFallback = false) => {
    latestShareLink = value || fallbackLink;
    if (shareField) shareField.value = latestShareLink;
    if (copyButton) copyButton.disabled = !latestShareLink;
    if (status) {
      status.textContent = message;
      status.classList.toggle('warning', Boolean(isFallback));
    }
  };

  setShareValue(fallbackLink, 'Компактная RMP-ссылка уже готова. Параллельно пробую получить внешнюю короткую ссылку…', false);

  if (shareField) {
    createKinoWallShortLink(fallbackLink)
      .then((shortLink) => {
        if (shortLink && /^https?:\/\//i.test(shortLink)) {
          setShareValue(shortLink, 'Короткая внешняя ссылка готова. Она ведёт на актуальный снимок киностены.');
        }
      })
      .catch(() => {
        setShareValue(fallbackLink, 'Внешний сокращатель не ответил или заблокирован браузером. Оставлена рабочая компактная RMP-ссылка.', true);
      });
  }

  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(latestShareLink);
      if (status) status.textContent = 'Ссылка скопирована.';
    } catch (error) {
      if (shareField) shareField.select();
      if (status) status.textContent = 'Не удалось скопировать автоматически. Ссылка выделена — скопируй вручную.';
    }
  });

  kinoWallContent.querySelector('[data-kw-share-action="export"]')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data.profile, null, 2)], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `rmp-kinowall-${sanitizeKinoWallHandle(data.profile.handle)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  document.getElementById('kinoWallImportFile')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const profile = saveKinoWallProfile(JSON.parse(text));
      if (status) status.textContent = 'Профиль импортирован.';
      await openKinoWall({ profile });
    } catch (error) {
      if (status) status.textContent = 'Не удалось импортировать JSON.';
    }
  });
}

/* ===== RMP patch: robust kinowall sharing fallback + better shortener chain ===== */
function renderKinoWallShareTab(data) {
  const longLink = buildKinoWallShareLink(data.profile);
  const shareText = data.readOnly
    ? `Это профиль, открытый по ссылке. Актуальность: ${getKinoWallTimestampLabel(data.profile.updatedAt)}. Чтобы увидеть свежую версию, попросите владельца отправить ссылку повторно.`
    : 'RMP сначала попробует создать короткую внешнюю ссылку. Если сокращатель не ответит или стена слишком большая, будет доступна длинная RMP-ссылка и .txt-файл с ней.';
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-title">Красивый шаринг</div>
      <p class="kinowall-muted">${escapeHtml(shareText)}</p>
      <div class="kinowall-share-box" data-kw-long-link="${escapeHtml(longLink)}">
        <label class="kinowall-field wide kinowall-short-link-field">
          <span id="kinoWallShareLabel">Ссылка на киностену</span>
          <input id="kinoWallShareLink" readonly value="Пробую создать короткую ссылку...">
        </label>
        <div class="kinowall-share-actions">
          <button type="button" class="kw-btn kw-primary" data-kw-share-action="copy" disabled>Скопировать ссылку</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="download-txt" hidden>Скачать .txt с RMP-ссылкой</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="export">Экспорт JSON</button>
          ${data.readOnly ? '' : '<label class="kw-btn kw-secondary kw-file-label">Импорт JSON<input id="kinoWallImportFile" type="file" accept="application/json,.json" hidden></label>'}
        </div>
        <div id="kinoWallShareStatus" class="kinowall-share-status">Пробую создать короткую ссылку...</div>
      </div>
    </section>`;
}

function withKinoWallTimeout(promise, timeoutMs, label = 'timeout') {
  const controller = { done: false };
  const timer = new Promise((_, reject) => {
    window.setTimeout(() => {
      if (!controller.done) reject(new Error(label));
    }, timeoutMs);
  });
  return Promise.race([promise.finally(() => { controller.done = true; }), timer]);
}

async function fetchKinoWallShortText(url, timeoutMs = 5200, options = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { cache: 'no-store', signal: controller.signal, ...options });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.text()).trim();
  } finally {
    window.clearTimeout(timer);
  }
}

async function fetchKinoWallShortJson(url, timeoutMs = 5200, options = {}) {
  const text = await fetchKinoWallShortText(url, timeoutMs, options);
  return JSON.parse(text);
}

function normalizeShortUrl(value) {
  const text = String(value || '').trim();
  if (/^https?:\/\//i.test(text)) return text;
  return '';
}

function firstResolvedKinoWallShortener(tasks, totalTimeoutMs = 8500) {
  return new Promise((resolve, reject) => {
    let finished = false;
    let failed = 0;
    let lastError = null;
    const total = tasks.length;
    const totalTimer = window.setTimeout(() => {
      if (!finished) {
        finished = true;
        reject(new Error('shortener-total-timeout'));
      }
    }, totalTimeoutMs);

    tasks.forEach((task) => {
      Promise.resolve()
        .then(task)
        .then((result) => {
          const shortUrl = normalizeShortUrl(result);
          if (!finished && shortUrl) {
            finished = true;
            window.clearTimeout(totalTimer);
            resolve(shortUrl);
          } else {
            throw new Error('empty-short-url');
          }
        })
        .catch((error) => {
          lastError = error;
          failed += 1;
          if (!finished && failed >= total) {
            finished = true;
            window.clearTimeout(totalTimer);
            reject(lastError || new Error('shortener-unavailable'));
          }
        });
    });
  });
}

async function createKinoWallShortLink(longLink) {
  const encoded = encodeURIComponent(longLink);
  const tasks = [];

  tasks.push(async () => {
    const data = await fetchKinoWallShortJson('https://cleanuri.com/api/v1/shorten', 5600, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: `url=${encoded}`
    });
    return data?.result_url;
  });

  tasks.push(async () => {
    const data = await fetchKinoWallShortJson('https://ulvis.net/api/v1/shorten', 5600, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: longLink })
    });
    return data?.shortUrl || data?.short_url || data?.url;
  });

  if (longLink.length < 3600) {
    tasks.push(async () => {
      const data = await fetchKinoWallShortJson(`https://api.1pt.co/addURL?long=${encoded}`, 5200);
      return data?.short ? `https://1pt.co/${data.short}` : '';
    });

    tasks.push(async () => {
      const data = await fetchKinoWallShortJson(`https://is.gd/create.php?format=json&url=${encoded}`, 5200);
      return data?.shorturl;
    });

    tasks.push(async () => fetchKinoWallShortText(`https://tinyurl.com/api-create.php?url=${encoded}`, 5200));
  }

  return firstResolvedKinoWallShortener(tasks, 9000);
}

function downloadKinoWallRmpLinkTxt(link, profile) {
  const stamp = new Date(profile?.updatedAt || Date.now()).toLocaleString('ru-RU');
  const text = [
    'RMP — ссылка на киностену',
    `Актуальность снимка: ${stamp}`,
    '',
    'Чтобы получить свежие данные, попросите владельца киностены отправить ссылку повторно.',
    '',
    link
  ].join('\n');
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `rmp-kinowall-link-${sanitizeKinoWallHandle(profile?.handle || 'profile')}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(a.href), 1200);
}

function bindKinoWallShareEvents(data) {
  const status = document.getElementById('kinoWallShareStatus');
  const shareField = document.getElementById('kinoWallShareLink');
  const shareLabel = document.getElementById('kinoWallShareLabel');
  const copyButton = kinoWallContent.querySelector('[data-kw-share-action="copy"]');
  const downloadTxtButton = kinoWallContent.querySelector('[data-kw-share-action="download-txt"]');
  const box = kinoWallContent.querySelector('.kinowall-share-box');
  const rmpLink = box?.dataset.kwLongLink || buildKinoWallShareLink(data.profile);
  let latestShareLink = '';
  let fallbackMode = false;

  const setShortLink = (shortLink) => {
    latestShareLink = shortLink;
    fallbackMode = false;
    if (shareLabel) shareLabel.textContent = 'Короткая ссылка на киностену';
    if (shareField) shareField.value = shortLink;
    if (copyButton) {
      copyButton.disabled = false;
      copyButton.textContent = 'Скопировать ссылку';
    }
    if (downloadTxtButton) downloadTxtButton.hidden = true;
    if (status) {
      status.textContent = 'Короткая ссылка готова. Она ведёт на текущий снимок киностены.';
      status.classList.remove('warning');
    }
  };

  const setRmpFallback = () => {
    latestShareLink = rmpLink;
    fallbackMode = true;
    if (shareLabel) shareLabel.textContent = 'Длинная RMP-ссылка';
    if (shareField) shareField.value = rmpLink;
    if (copyButton) {
      copyButton.disabled = false;
      copyButton.textContent = 'Скопировать RMP-ссылку';
    }
    if (downloadTxtButton) downloadTxtButton.hidden = false;
    if (status) {
      status.textContent = 'Ваша стена заполнена большим количеством контента. Доступна только длинная RMP-ссылка.';
      status.classList.add('warning');
    }
  };

  if (shareField) shareField.value = 'Пробую создать короткую ссылку...';
  if (copyButton) copyButton.disabled = true;
  if (downloadTxtButton) downloadTxtButton.hidden = true;

  createKinoWallShortLink(rmpLink)
    .then((shortLink) => {
      if (shortLink) setShortLink(shortLink);
      else setRmpFallback();
    })
    .catch(() => setRmpFallback());

  copyButton?.addEventListener('click', async () => {
    if (!latestShareLink) return;
    try {
      await navigator.clipboard.writeText(latestShareLink);
      if (status) status.textContent = fallbackMode ? 'Длинная RMP-ссылка скопирована.' : 'Короткая ссылка скопирована.';
    } catch (error) {
      if (shareField) shareField.select();
      if (status) status.textContent = 'Не удалось скопировать автоматически. Ссылка выделена — скопируй вручную.';
    }
  });

  downloadTxtButton?.addEventListener('click', () => downloadKinoWallRmpLinkTxt(rmpLink, data.profile));

  kinoWallContent.querySelector('[data-kw-share-action="export"]')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data.profile, null, 2)], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `rmp-kinowall-${sanitizeKinoWallHandle(data.profile.handle)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  document.getElementById('kinoWallImportFile')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const profile = saveKinoWallProfile(JSON.parse(text));
      if (status) status.textContent = 'Профиль импортирован.';
      await openKinoWall({ profile });
    } catch (error) {
      if (status) status.textContent = 'Не удалось импортировать JSON.';
    }
  });
}

/* ===== RMP patch: kinowall URL + embedded file images restored ===== */
function sanitizeKinoWallUrl(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  if (/^data:image\/(?:png|jpe?g|webp|gif|avif);base64,/i.test(url)) return url.slice(0, 750000);
  if (/^https?:\/\//i.test(url)) return url.slice(0, 2200);
  return '';
}

function compactKinoWallProfile(profile) {
  const normalized = normalizeKinoWallProfile(profile);
  const compactEntry = (entry) => [entry.mediaType === 'tv' ? 't' : 'm', Number(entry.id || 0), entry.addedAt || ''];
  return {
    v: KINOWALL_VERSION,
    n: normalized.name,
    h: normalized.handle,
    s: normalized.status,
    b: normalized.bio,
    vb: normalized.vibe,
    av: sanitizeKinoWallUrl(normalized.avatarUrl),
    bn: sanitizeKinoWallUrl(normalized.bannerUrl),
    ac: normalized.accentColor,
    sh: normalized.showcase.slice(0, 60).map(compactEntry),
    w: normalized.watched.slice(0, 140).map(compactEntry),
    f: getFavorites().slice(0, 140).map(compactEntry),
    a: normalized.actors.map((person) => [person.tmdbId || 0, person.name || '', person.note || '', sanitizeKinoWallUrl(person.imageUrl || '')]),
    sc: normalized.scenes.map((scene) => [scene.title || '', scene.note || '', sanitizeKinoWallUrl(scene.imageUrl || '')]),
    st: normalized.soundtracks.map((track) => [track.title || '', track.artist || '', track.url || '']),
    r: normalized.reviews.map((review) => [review.mediaType === 'tv' ? 't' : 'm', Number(review.id || 0), Number(review.rating || 0), review.text || '', review.addedAt || '']),
    u: normalized.updatedAt || new Date().toISOString()
  };
}

function getKinoWallImagePlaceholder(kind) {
  return kind === 'banner' ? 'Баннер' : 'Аватар';
}

function renderKinoWallImageField(name, label, value, kind) {
  const safeValue = sanitizeKinoWallUrl(value || '');
  const preview = safeValue
    ? `<div class="kinowall-image-field-preview ${kind === 'banner' ? 'banner' : 'avatar'} has-image"><img src="${escapeHtml(safeValue)}" alt="" onerror="this.closest('.kinowall-image-field-preview').classList.remove('has-image');this.remove();"></div>`
    : `<div class="kinowall-image-field-preview ${kind === 'banner' ? 'banner' : 'avatar'}"><span>${getKinoWallImagePlaceholder(kind)}</span></div>`;
  return `
    <div class="kinowall-image-field wide" data-kw-image-field="${escapeHtml(name)}" data-kw-image-kind="${escapeHtml(kind)}">
      <div>
        <span>${escapeHtml(label)}</span>
        <p>Можно вставить URL или загрузить файл. Файл сразу сжимается, превращается в base64 и записывается прямо в ссылку киностены, чтобы картинка точно открылась на другом устройстве.</p>
      </div>
      <div class="kinowall-image-field-body file-enabled">
        ${preview}
        <label class="kinowall-field"><span>URL / base64</span><input name="${escapeHtml(name)}" type="text" maxlength="750000" placeholder="https://... или загруженный base64" value="${escapeHtml(safeValue)}"></label>
        <label class="kw-btn kw-secondary kw-file-label">Загрузить файл<input name="${escapeHtml(name)}File" type="file" accept="image/png,image/jpeg,image/webp,image/avif" hidden></label>
        <button type="button" class="kw-btn kw-secondary kw-image-clear" data-kw-image-clear="${escapeHtml(name)}">Очистить</button>
      </div>
    </div>`;
}

function updateKinoWallImageFieldPreviewFromValue(input) {
  const root = input?.closest?.('.kinowall-image-field');
  if (!root) return;
  const kind = root.dataset.kwImageKind || (root.querySelector('.kinowall-image-field-preview')?.classList.contains('banner') ? 'banner' : 'avatar');
  const preview = root.querySelector('.kinowall-image-field-preview');
  const value = sanitizeKinoWallUrl(input.value || '');
  if (!preview) return;
  if (value) {
    preview.classList.add('has-image');
    preview.innerHTML = `<img src="${escapeHtml(value)}" alt="" onerror="this.closest('.kinowall-image-field-preview').classList.remove('has-image');this.remove();">`;
  } else {
    preview.classList.remove('has-image');
    preview.innerHTML = `<span>${getKinoWallImagePlaceholder(kind)}</span>`;
  }
}

function setKinoWallImageFieldValue(fieldName, value) {
  const root = document.querySelector(`[data-kw-image-field="${fieldName}"]`);
  if (!root) return;
  const input = root.querySelector(`input[name="${fieldName}"]`);
  const fileInput = root.querySelector(`input[name="${fieldName}File"]`);
  if (input) {
    input.value = sanitizeKinoWallUrl(value || '');
    updateKinoWallImageFieldPreviewFromValue(input);
  }
  if (fileInput) fileInput.value = '';
}

function bindKinoWallEditorEvents(data) {
  bindKinoWallOverviewEvents(data);
  const formEl = document.getElementById('kinoWallEditorForm');
  if (!formEl) return;

  formEl.querySelectorAll('.kinowall-image-field input[type="text"][name$="Url"]').forEach((input) => {
    input.addEventListener('input', () => updateKinoWallImageFieldPreviewFromValue(input));
    input.addEventListener('change', () => updateKinoWallImageFieldPreviewFromValue(input));
  });

  formEl.querySelectorAll('.kinowall-image-field input[type="file"][name$="File"]').forEach((input) => {
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      const fieldName = input.name.replace(/File$/, '');
      const root = input.closest('.kinowall-image-field');
      const label = root?.querySelector('.kw-file-label');
      if (label) label.classList.add('is-loading');
      try {
        const isBanner = fieldName === 'bannerUrl';
        const dataUrl = await compressKinoWallImageFile(file, isBanner
          ? { maxWidth: 1500, maxHeight: 520, quality: 0.74 }
          : { maxWidth: 420, maxHeight: 420, quality: 0.82 });
        setKinoWallImageFieldValue(fieldName, dataUrl);
      } catch (error) {
        console.warn('[kinowall image upload]', error);
      } finally {
        input.value = '';
        if (label) label.classList.remove('is-loading');
      }
    });
  });

  formEl.querySelectorAll('[data-kw-image-clear]').forEach((button) => {
    button.addEventListener('click', () => setKinoWallImageFieldValue(button.dataset.kwImageClear, ''));
  });

  formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const current = readKinoWallProfile();
    const submitButton = formEl.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Сохраняю...';
    }
    try {
      const nextProfile = saveKinoWallProfile({
        ...current,
        name: formData.get('name'),
        handle: formData.get('handle'),
        status: formData.get('status'),
        vibe: formData.get('vibe'),
        avatarUrl: sanitizeKinoWallUrl(formData.get('avatarUrl')),
        bannerUrl: sanitizeKinoWallUrl(formData.get('bannerUrl')),
        accentColor: formData.get('accentColor'),
        bio: sanitizeKinoWallLongText(formData.get('bio'), 420),
        actors: parsePipeList(formData.get('actorsRaw'), ([tmdbIdOrName, nameOrNote, noteOrImage, imageMaybe]) => {
          const maybeId = Number(tmdbIdOrName || 0);
          if (Number.isFinite(maybeId) && maybeId > 0) return { tmdbId: maybeId, name: nameOrNote, note: noteOrImage, imageUrl: sanitizeKinoWallUrl(imageMaybe) };
          return { tmdbId: 0, name: tmdbIdOrName, note: nameOrNote, imageUrl: sanitizeKinoWallUrl(noteOrImage) };
        }),
        scenes: parsePipeList(formData.get('scenesRaw'), ([title, note, imageUrl]) => ({ title, note, imageUrl: sanitizeKinoWallUrl(imageUrl) })),
        soundtracks: parsePipeList(formData.get('soundtracksRaw'), ([title, artist, url]) => ({ title, artist, url }))
      });
      await openKinoWall({ profile: nextProfile });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Сохранить киностену';
      }
    }
  });

  kinoWallContent.querySelector('[data-kw-editor-action="reset-demo"]')?.addEventListener('click', async () => {
    const profile = readKinoWallProfile();
    const demo = createDefaultKinoWallProfile();
    profile.actors = demo.actors;
    profile.scenes = demo.scenes;
    profile.soundtracks = demo.soundtracks;
    saveKinoWallProfile(profile);
    await openKinoWall();
  });
}

function renderKinoWallShareTab(data) {
  const longLink = buildKinoWallShareLink(data.profile);
  const hasEmbeddedImages = /^data:image\//i.test(data.profile.avatarUrl || '') || /^data:image\//i.test(data.profile.bannerUrl || '');
  const shareText = data.readOnly
    ? `Это профиль, открытый по ссылке. Актуальность: ${getKinoWallTimestampLabel(data.profile.updatedAt)}. Чтобы увидеть свежую версию, попросите владельца отправить ссылку повторно.`
    : `RMP сначала попробует создать короткую внешнюю ссылку. Если сокращатель не ответит или стена слишком большая${hasEmbeddedImages ? ' из-за встроенных изображений' : ''}, будет доступна длинная RMP-ссылка и .txt-файл с ней.`;
  const embeddedWarning = hasEmbeddedImages && !data.readOnly
    ? '<p class="kinowall-share-warning">В аватаре или баннере есть встроенный base64. Это надёжнее для открытия на другом устройстве, но ссылка становится длиннее, поэтому сокращатель может отказаться её принимать.</p>'
    : '';
  return `
    <section class="kinowall-panel">
      <div class="kinowall-section-title">Красивый шаринг</div>
      <p class="kinowall-muted">${escapeHtml(shareText)}</p>
      ${embeddedWarning}
      <div class="kinowall-share-box" data-kw-long-link="${escapeHtml(longLink)}">
        <label class="kinowall-field wide kinowall-short-link-field">
          <span id="kinoWallShareLabel">Ссылка на киностену</span>
          <input id="kinoWallShareLink" readonly value="Пробую создать короткую ссылку...">
        </label>
        <div class="kinowall-share-actions">
          <button type="button" class="kw-btn kw-primary" data-kw-share-action="copy" disabled>Скопировать ссылку</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="download-txt" hidden>Скачать .txt с RMP-ссылкой</button>
          <button type="button" class="kw-btn kw-secondary" data-kw-share-action="export">Экспорт JSON</button>
          ${data.readOnly ? '' : '<label class="kw-btn kw-secondary kw-file-label">Импорт JSON<input id="kinoWallImportFile" type="file" accept="application/json,.json" hidden></label>'}
        </div>
        <div id="kinoWallShareStatus" class="kinowall-share-status">Пробую создать короткую ссылку...</div>
      </div>
    </section>`;
}
