function submitForm() {
    var platform = document.getElementById('platform').value;
    var name = document.getElementById('name').value;
    var nickname = document.getElementById('nickname').value;
    var budget = document.getElementById('budget').value;
    var currency = document.getElementById('currency').value;

    // Валидация бюджета
    var budgetInput = document.getElementById('budget');
    var budgetError = document.getElementById('budget-error');
    if (isNaN(budget) || budget < 0) {
        budgetError.textContent = "Бюджет должен быть положительным числом.";
        budgetInput.classList.add('error');
        return;
    } else {
        budgetError.textContent = "";
        budgetInput.classList.remove('error');
    }

    // Проверка заполнения всех обязательных полей
    if (!platform || !name || !nickname || !budget || !currency) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return;
    }

    // Отправка данных на сервер Flask
    fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            platform: platform,
            name: name,
            nickname: nickname,
            budget: budget,
            currency: currency
        })
    })
    .then(response => {
        if (response.ok) {
            // Успешно отправлено
            // Отображение анимации загрузки
            var loadingDiv = document.getElementById('loading');
            loadingDiv.style.display = 'block';

            // Симуляция задержки в 2 секунды перед отображением сообщения "Готово"
            setTimeout(function() {
                // Скрытие анимации загрузки
                loadingDiv.style.display = 'none';

                // Вместо этого вы можете выполнить дополнительные действия в зависимости от введенных данных

                // Просто для примера, выводим в консоль
                console.log("Платформа: " + platform);
                console.log("Имя: " + name);
                console.log("Ник: " + nickname);
                console.log("Бюджет: " + budget);
                console.log("Валюта: " + currency);

                // Вывод сообщения "Готово"
                alert("Готово");
            }, 2000);
        } else {
            // Ошибка при отправке
            alert("Произошла ошибка при отправке данных.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Произошла ошибка при отправке данных.");
    });
}