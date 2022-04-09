import {
	map, head, last, all, equals, filter, pluck,
	split, prepend, insertAll, flatten, join, is,
	or, not, includes
} from 'ramda';


/** Временные градации */
const MEASURES = {
	MS_IN_SECOND: 1000,
	MS_IN_MINUTE: 60000,
	MS_IN_HOUR: 3600000,
	MS_IN_DAY: 86400000
};
Object.freeze(MEASURES);

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
	Она не совершенна, валидны значения для слов час, день, минута,
	а также для слов, оканчивающихся на согласную букву
	@author Samir Amirseidov
*/
const VOWELS = ['а', 'я', 'у', 'и', 'ы', 'е', 'о', 'э', 'ю'];
export const getWordEnding = (number, word) => {
	const lastNum = last(number.toString());
	const lastLetter = last(word);

	switch (true) {
		case equals(lastLetter, 'а'):
			if (lastNum === '1' && number !== 11) {
				return word;
			}

			switch (lastNum) {
				case '2':
				case '3':
				case '4':
					return `${word.slice(0, word.length - 1)}ы`;

				default:
					return word.slice(0, word.length - 1);
			}

		case equals('ь', lastLetter):
			if (lastNum === '1' && number !== 11) {
				return word;
			}

			switch (lastNum) {
				case "0":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					return `${word[0] + word[2]}ей`;
				case "1":
					return word;
				case "2":
				case "3":
				case "4":
					if (number > 9) {
						return `${word[0] + word[2]}ей`;
					}
					return `${word[0] + word[2]}я`;
			}
			break;

		case number > 9 && number.toString()[number.length - 1] === '1' && not(includes(last(word), VOWELS)):
			return `${word}ов`;

		case not(includes(last(word), VOWELS)):
			switch (lastNum) {
				case "0":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					return `${word}ов`;
				case "1":
					return word;
				case "2":
				case "3":
				case "4":
					return `${word}а`;
			}
			break;

		default: return word;
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
		'SMS code does not match': 'Введённый код не совпадает с отправленным.',
		'Controller with such UID exist': 'Контроллер с таким UID уже существует.',
		'CLOSED_USER': 'Ваш кабинет заблокирован, для разблокировки напишите на почту support@ivend.pro',
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
export const prettifyPhone = (phone, countryCode) => {
	let str = split('', phone);
	let code = "+7"
	if(countryCode){
		code = "+" + countryCode
	}

	str = join('', flatten(
		prepend(code,
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
};

export const convertCriteries = (a, b, critery) => {
	return {
		firstCritery: is(String, b[critery]) ? a[critery] : or(a[critery], null),
		secondCritery: is(String, a[critery]) ? b[critery] : or(b[critery], null)
	};
};

/**
 * Функция возвращает градации по времени
 * (сколько минут, часов и дней в миллисекундах)
 * @author Samir Amirseidov
 */
export const getGradation = ms => ({
	seconds: Math.round(ms / MEASURES.MS_IN_SECOND),
	minutes: Math.round(ms / MEASURES.MS_IN_MINUTE),
	hours: Math.round(ms / MEASURES.MS_IN_HOUR),
	days: Math.round(ms / MEASURES.MS_IN_DAY)
});

/**
 * Функция возвращает строку в стилизованном tooltip для табличных полей
 * @param  {[string]} type   Тип tooltip
 * @param  {[string]} string Содержимое tooltip
 * @return {[string]} Tooltip
 * @author Samir Amirseidov
 */
export const createTooltip = (type, string) => {
	switch (type) {
		case 'alert':
			return `
				<span class="badge badge-danger">
					<i class="fas fa-times text-white mr-1"></i>
					${string}
				</span>
			`;
		case 'warning':
			return `
				<span class="badge badge-warning">
					<i class="fas fa-exclamation text-white mr-1"></i>
					${string}
				</span>
			`;
		case 'primary':
			return `
				<span class="badge badge-primary">
					<i class="fas fa-check text-white mr-1"></i>
					${string}
				</span>
			`;
		default:
			return `<span class="badge badge-gray">${string}</span>`;
	}
};
export const createInput = (type, string) => {
	switch (type) {
		case 'input':
			return `
				<span >
                    <input class="form-control" value="${string}" name="companyName"  placeholder="uid" @keydown.enter="func"/>
                                    
				</span>
			`;
		default:
			return `<span class="badge badge-gray">${string}</span>`;
	}
};
