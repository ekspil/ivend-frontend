export const controllerHeaders = {
    number: "Номер контроллера",
    state: "Состояние контроллера",
    mode: "Режим контроллера",
    statMode: "Режим считывания статистики",
    terminalMode: "Режим терминала",
    fiscalMode: "Режим фискализации",
    version: "Версия контроллера",
    printer: "Номер принтера",
    sim: "Номер сим терминала",
    controllerSim: "Номер сим контроллера",
    imsi: "IMSI сим контроллера"
}


export const controllerStates = [
    {name: "Работает", value: "ENABLED"},
    {name: "Не работает", value: "DISABLED"},
    {name: "Отладка", value: "DEBUG"},
]

export const controllerFiscalType = [
    {name: "Нефискальный", value: "NO_FISCAL"},
    {name: "Фискальный", value: "UNAPPROVED"}
]
export const controllerStatType = [
    {name: "Монетник", value: "COINBOX"},
    {name: "Автомат", value: "MACHINE"},
    {name: "Монетник+автомат", value: "COINBOX_MACHINE"},
]
export const controllerType = [
    {name: "MDB", value: "mdb"},
    {name: "MDB1", value: "mdb1"},
    {name: "MDB2", value: "mdb2"},
    {name: "EXE", value: "exe"},
    {name: "CASHLESS", value: "cashless"},
    {name: "CASHLESS2", value: "cashless2"},
    {name: "CASHLESS3", value: "cashless_free"},
    {name: "PULSE", value: "ps_m_D"},
    {name: "PULSE2", value: "ps_m_2"},
    {name: "PULSE3", value: "ps_m_3"},
    {name: "PULSE4", value: "ps_p"},
    {name: "RS232", value: "rs232"},
]
export const controllerTerminal = [
    {name: "Без терминала", value: "NO_BANK_TERMINAL"},
    {name: "PAX D200 Инпас Vend", value: "d200i_v"},
    {name: "PAX D200 Инпас Trade", value: "d200i_t"},
    {name: "PAX D200 Сбер Vend", value: "d200s_v"},
    {name: "PAX D200 Сбер Trade", value: "d200s_t"},
    {name: "OTI UNO Vend", value: "otiu_v"},
    {name: "OTI UNO Trade", value: "otiu_t"},
    {name: "OTI TRIO Vend", value: "otit_v"},
    {name: "OTI TRIO Trade", value: "otit_t"},
    {name: "Vendotek V3 Vend", value: "vdk3_v"},
    {name: "Vendotek V3 Trade", value: "vdk3_t"},
    {name: "Vendotek V3 Pulse", value: "vdk3_p"},
    {name: "PAX D200 Инпас", value: "d200i"},
    {name: "PAX D200 Сбер", value: "d200s"},
    {name: "Vendista V1", value: "vda1"},
    {name: "Vendotek VL", value: "vdkl"},
    {name: "Vendotek VX", value: "vdkx"},
]






export const getStatus = status => {
    switch (status) {
        case 'ENABLED':
            return '<span class="status-icon bg-success"></span> Работает';
        case 'DISABLED':
            return '<span class="status-icon bg-danger"></span> Не работает';
        case 'PAUSED':
            return '<span class="status-icon bg-secondary"></span> Приостановлен';
        case 'DEBUG':
            return '<span class="status-icon bg-yellow"></span> Отладка';
        case 'TRAINING':
            return '<span class="status-icon bg-info"></span> Обучение';
    }
};


export const mapFiscalizationMode = (mode) => {

    const data = controllerFiscalType.find((item) => item.value === mode)
    if(data){
        return data.name
    }
    else {
        return "Неверный тип"
    }
}

export const getTerminal = (status) => {
    const data = controllerTerminal.find((item) => item.value === status)
    if(data){
        return data.name
    }
    else {
        return "Неверный тип"
    }

}
export const getMode = (mode) => {

    const data = controllerType.find((item) => item.value === mode)
    if(data){
        return data.name
    }
    else {
        return "Неверный тип"
    }
}
