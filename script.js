/**
 * Пример реализации "фильтра Блума"
 */
class BloomFilter{
    /**
     * @param size Размер битового массива для хранения адресов
     * @param funcCount Количество функций для хеширования входной строки
     */
    constructor(size, funcCount){
        this.size = size;
        this.funcCount = funcCount;
        this.bitArray = new Array(size);
        this.initiateArray();
    }
 
    /**
     * Создает битовый массив и предзаполняет его нулями
     */
    initiateArray(){
        for(let i = 0; i < this.bitArray.length; i++){
            this.bitArray[i] = 0;
        }
    }

    /**
     * Реализация универсальной функции хеширования,
     * которая отличается в зависимости от номера вызова
     * @param input Входная строка
     * @param functionNumber Номер вызова
     * @returns Результат хеширования типа Number
     */
    hashString(input, functionNumber){
        let hash = 0;
        let chr;
        if (input.length === 0) return hash;
        input = functionNumber + input; //Подставляем перед исходным текстом номер вызова
        for (let i = 0; i < input.length; i++){
            chr = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return Math.abs(hash % this.size); //Определяет адрес в битовом массиве
    }
 
    /**
     * Регистрирует элемент исходной последовательности в фильтре
     * @param item Элемент исходной последовательности
     */
        addItem(item){
        for (let i = 0; i < this.funcCount; i++){
            let index = this.hashString(item, i);
            this.bitArray[index] = 1;
        }
    }
    /**
     * Проверяет наличие искомого элемента в последовательности
     * @param item Искомый элемент
     * @returns true - "Возможно присутствует" false - "Отсутствует"
     */
    checkItemNotPresented(item){
        for (let i = 0; i < this.funcCount; i++){
            let index = this.hashString(item, i);
            if (this.bitArray[index] === 0) return true;
        }
        return false;
    }
}
