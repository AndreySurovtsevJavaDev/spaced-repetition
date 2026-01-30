function makeEvent() {
  // данные для создания / удления / перемещения карточки в календаре
  const title = "your_title"; // Название модуля
  const url = "https://quizlet.com/ru/"; // Ссылка на карточку для изучения
  const startDateStr = "2026-02-09";          // ДАТА НАЧАЛА (ГГГГ-ММ-ДД)

  // функция для создания карточек в календаре
  generateSrsPlan(title, url, startDateStr);
  
  // функция для удаления карточек в календаре по их title
  // deleteSrsPlan(title);

  // функция для смещения карточек в календаре, если, например, пропустили повторение
  // shiftFutureEvents(1, title)
}
// Настройка интеграции с календарём
// айдишник календаря, подставить свой
const CALENDAR_ID = 'c@group.calendar.google.com';
// Календарь выходных и праздников(нужен чтобы при формировании карточек для повторения пропускались выходные)
const HOLIDAY_CAL_ID = 'ru.russian#holiday@group.v.calendar.google.com';

// График повторений (интервалы)
const STAGES = [
  { days: 0,  label: "1-й повтор", color: CalendarApp.EventColor.YELLOW },
  { days: 2,  label: "2-й повтор", color: CalendarApp.EventColor.CYAN },
  { days: 7,  label: "3-й повтор", color: CalendarApp.EventColor.GREEN },
  { days: 14, label: "4-й повтор", color: CalendarApp.EventColor.MAUVE },
  { days: 35, label: "Финальный check", color: CalendarApp.EventColor.RED },
  { days: 100, label: "Дополнительная проверка", color: CalendarApp.EventColor.GRAY }
];

// Вспомогательная функция. исключает выходные и прадничные дни
function adjustToWorkDay(date) {
  const holidayCal = CalendarApp.getCalendarById(HOLIDAY_CAL_ID);
  let newDate = new Date(date);
  
  while (true) {
    const dayOfWeek = newDate.getDay(); // 0 = Воскресенье, 6 = Суббота
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    
    // Проверка на праздники (ищем события в календаре праздников на этот день)
    const holidays = holidayCal ? holidayCal.getEventsForDay(newDate) : [];
    const isHoliday = holidays.length > 0;

    if (isWeekend || isHoliday) {
      // Если выходной или праздник — прибавляем 1 день и проверяем снова
      newDate.setDate(newDate.getDate() + 1);
    } else {
      // Нашли рабочий день
      break;
    }
  }
  return newDate;
}

// Основная функция, которая генерит события в календаре
function generateSrsPlan(title, url, startDateStr) {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  if (!calendar) return;

  const baseDate = startDateStr ? new Date(startDateStr) : new Date();
  baseDate.setHours(0, 0, 0, 0);

  STAGES.forEach(stage => {
    let targetDate = new Date(baseDate);
    targetDate.setDate(baseDate.getDate() + stage.days);

    // 2. Корректируем дату (пропускаем Сб, Вс и праздники)
    targetDate = adjustToWorkDay(targetDate);
    
    const eventTitle = `${stage.label}: ${title}`;
    
    // Строгая проверка на дубликат
    const isDuplicate = calendar.getEventsForDay(targetDate).some(e => e.getTitle() === eventTitle);
    
    if (!isDuplicate) {
      const event = calendar.createAllDayEvent(eventTitle, targetDate);
      event.setDescription(`Ссылка на Quizlet: ${url}`);
      event.setColor(stage.color);
      console.log(`✅ Создано: ${eventTitle}`);
    } else {
      console.warn(`--- Пропущено (дубликат): ${eventTitle}`);
    }
  });
    console.log("🚀 Готово!");
}

function deleteSrsPlan(title) {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  
  if (!calendar) {
    console.error("Календарь не найден!");
    return;
  }

  // Определяем диапазон поиска (от сегодня на год назад и на год вперед)
  const now = new Date();
  const startTime = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000); 
  const endTime = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  // Ищем события, содержащие название модуля
  const events = calendar.getEvents(startTime, endTime, {search: title});
  
  if (events.length === 0) {
    console.log(`События с названием "${title}" не найдены.`);
    return;
  }

  console.log(`Найдено событий для удаления: ${events.length}`);
  
  events.forEach(event => {
    // Дополнительная проверка, чтобы не удалить лишнее (проверяем, что это SRS событие)
    if (event.getTitle().includes("повтор") || event.getTitle().includes("чек")) {
      console.log(`Удаляю: ${event.getTitle()} (${event.getAllDayStartDate().toLocaleDateString()})`);
      event.deleteEvent();
    }
  });

  console.log("🚀 Удаление завершено!");
}

// ПЕРЕДВИНУТЬ Карточки
// Сдвигает будущие события конкретного модуля на N дней вперед.
// Прошедшие события не меняются.
function shiftFutureEvents(daysToShift, title) {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Начало сегодняшнего дня

  const future = new Date();
  future.setFullYear(now.getFullYear() + 1); 
  
  // Получаем события от текущего момента и в будущее
  const events = calendar.getEvents(now, future, {search: title});
  
  let count = 0;

  events.forEach(event => {
    const eventTitle = event.getTitle();
    const eventDate = event.getAllDayStartDate();

    // Проверяем:
    // 1. Это событие на весь день
    // 2. Название СТРОГО содержит наш title (чтобы не сдвинуть лишнее)
    // 3. Дата события — сегодня или в будущем
    if (event.isAllDayEvent() && eventTitle.includes(title) && eventDate >= now) {
      const newDate = new Date(eventDate);
      newDate.setDate(eventDate.getDate() + daysToShift);
      
      event.setAllDayDate(newDate);
      console.log(`↔️ Сдвинуто: "${eventTitle}" на ${newDate.toLocaleDateString()}`);
      count++;
    }
  });

  if (count === 0) {
    console.warn(`Будущих событий для модуля "${title}" не найдено.`);
  } else {
    console.log(`✅ Успешно перенесено событий: ${count}`);
  }
}

