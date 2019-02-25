import { map, head, last, all, equals, filter, pluck, forEachObjIndexed } from 'ramda';

/**
	Вытащить пару ключ/значение из массива от Object.entries
	@author Samir Amirseidov
*/
export const constructEntry = entry => [head(entry), last(entry)];

/**
	Проверка на null каждого значения от Object.entries
	@author Samir Amirseidov
*/
export const areKeysNull = obj => {
	return all(equals(null))(map(entry => {
		return last(entry);
	}, Object.entries(obj)));
};

/**
	Отфильтровать валидаторы, возвратившие сообщение ошибки от валидаторов, возвративших сообщение об успешной валидации (null)
	@author Samir Amirseidov
*/
export const purgeSuccessValidators = arr => filter(val => val !== null, pluck('error')(arr));

/**
	Функция возвращает окончание для существительных при числительных
	@author Samir Amirseidov
*/
export const getWordEnding = number => {
	const lastNum = last(number.toString());
	switch (lastNum) {
		case "0":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return 'ов';
		case "1":
			return "";
		case "2":
		case "3":
		case "4":
			return "а";
	}
};

/**
	Узнать месяц по номеру, начиная с 0
	@author Samir Amirseidov
*/
export const getMonthName = month => {
	switch (month) {
		case 0: return 'Января';
		case 1: return 'Февраля';
		case 2: return 'Марта';
		case 3: return 'Апреля';
		case 4: return 'Мая';
		case 5: return 'Июня';
		case 6: return 'Июля';
		case 7: return 'Августа';
		case 8: return 'Сентября';
		case 9: return 'Октября';
		case 10: return 'Ноября';
		case 11: return 'Декабря';
	}
};

/**
	Конвертировать ошибку GraphQL в читаемый вид
	@author Samir Amirseidov
*/
export const convertServerError = error => {
	const messages = {
		'User with such email or phone already exists': 'Пользователь с такими данными уже существует.',
		'Phone and password does not match': 'Логин и пароль не совпадают.',
		'Another deposit already in process': 'Завершите существующий депозит.',
		default: 'Неизвестная ошибка сервера.'
	}

	for (let key in messages) {
		if (error.includes(key)) {
			return messages[key];
		}
	}

	return messages.default;
};
