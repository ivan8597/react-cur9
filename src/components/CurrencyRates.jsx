import React, { useEffect, useState } from 'react';
import './style.css';

const CurrencyRates = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    if (!data) {
        return <div>Загрузка...</div>;
    }

    const { Valute } = data;

    return (
        <div>
            <h1>Курсы валют на {data.Date}</h1>
            <div className="grid-container">
                <div className="grid-header">Название</div>
                <div className="grid-header">Код</div>
                <div className="grid-header">Значение</div>
                <div className="grid-header">Предыдущее значение</div>
                {Object.keys(Valute).map(key => (
                    <React.Fragment key={key}>
                        <div className="grid-item">{Valute[key].Name}</div>
                        <div className="grid-item">{Valute[key].CharCode}</div>
                        <div className="grid-item">{Valute[key].Value}</div>
                        <div className="grid-item">{Valute[key].Previous}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CurrencyRates;
