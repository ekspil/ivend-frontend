import {
	map, head, last, all, equals, filter, pluck,
	split, prepend, insertAll, flatten, join, is,
	or
} from 'ramda';

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
		'Such buttonId already bound to this ItemMatrix': 'Введённый ID товара уже привязан к этой матрице.',
		default: 'Неизвестная ошибка сервера.'
	}

	for (let key in messages) {
		if (error.includes(key)) {
			return messages[key];
		}
	}

	return messages.default;
};

/**
	Конвертировать в число свойство каждого объекта в массиве
	@author Samir Amirseidov
*/
export const numberify = (propName, array) => {
	return map(obj => ({ ...obj, [propName]: Number(obj[propName]) }), array);
};

/**
	Проверить, повторяется ли какое-нибудь свойство хоть раз
	@author Samir Amirseidov
*/
export const checkForRepeat = (propName, array) => {
	for (let i = 0; i < array.length; i++) {
		const temp = array[i];
		for (let j = i + 1; j < array.length; j++) {
			if (equals(temp[propName], array[j][propName])) {
				return true;
			}
		}
	}

	return false;
};

/**
	Преобразовать в удобочитаемый вид телефонный номер вида 999 999 99-99
	@author Samir Amirseidov
*/
export const prettifyPhone = phone => {
	let str = split('', phone);

	str = join('', flatten(
		prepend('+7',
			prepend([' ', '('],
				insertAll(3, [')', ' '],
					insertAll(6, [' '], split('', phone))
				)
			)
		)
	));

	return str;
};

/**
	Преобразовать timestamp в удобочитаемую дату
	@author Samir Amirseidov
*/
export const getTimestamp = time => {
	if (time) {
		const date = new Date(time);
		return `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`;
	}

	return '-';
}

export const convertCriteries = (a, b, critery) => {
	return {
		firstCritery: is(String, b[critery]) ? a[critery] : or(a[critery], null),
		secondCritery: is(String, a[critery]) ? b[critery] : or(b[critery], null)
	};
}
