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
    return {
        NO_FISCAL: "Нефискальный",
        UNAPPROVED: "Фискальный",
        APPROVED: "APPROVED(устарел)"
    }[mode]
}

export const getTerminal = (status) => {

    switch (status) {
        case 'NO_BANK_TERMINAL':
            return 'Без терминала';
        case 'd200i_v':
            return 'PAX D200 Инпас Vend';
        case 'd200s_v':
            return 'PAX D200 Сбер Vend';
        case 'd200i_t':
            return 'PAX D200 Инпас Trade';
        case 'd200s_t':
            return 'PAX D200 Сбер Trade';
        case 'otiu_v':
            return 'OTI UNO Vend';
        case 'otiu_t':
            return 'OTI UNO Trade';
        case 'otit_v':
            return 'OTI TRIO Vend';
        case 'otit_t':
            return 'OTI TRIO Trade';
    }
}
export const getMode = (mode) => {

    switch (mode) {
        case 'mdb':
            return 'MDB';
        case 'mdb1':
            return 'MDB1';
        case 'mdb2':
            return 'MDB2';
        case 'exe':
            return 'EXE';
        case 'cashless':
            return 'CASHLESS';
        case 'cashless2':
            return 'CASHLESS2';
        case 'cashless_free':
            return 'CASHLESS3';
        case 'ps_m_D':
            return 'PULSE';
        case 'ps_m_2':
            return 'PULSE2';
        case 'ps_m_3':
            return 'PULSE3';
        case 'ps_p':
            return 'PULSE4';
        case 'rs232':
            return 'RS232';
    }
}

