from flask import Flask, request
import requests
import json

app = Flask(__name__)

# Ваш Discord вебхук
discord_webhook_url = 'https://discord.com/api/webhooks/1195613205993623585/fo9V3nGs8qJLlDPHSn8hDQaLOAh5SaScesAHE3B_gOXBo0HHyoHQHz2SB4p1CHQOGiXK'

@app.route('/submit-form', methods=['POST'])
def submit_form():
    try:
        data = request.get_json()

        platform = data.get('platform')
        name = data.get('name')
        nickname = data.get('nickname')
        budget = data.get('budget')
        currency = data.get('currency')

        message = f"**Новый заказ Roblox!**\n\nПлатформа: {platform}\nИмя: {name}\nНик: {nickname}\nБюджет: {budget} {currency}"

        payload = {
            'content': message
        }

        headers = {
            'Content-Type': 'application/json'
        }

        # Отправка сообщения в Discord
        response = requests.post(discord_webhook_url, data=json.dumps(payload), headers=headers)

        if response.status_code == 204:
            return 'Success', 200
        else:
            return 'Error', 500

    except Exception as e:
        print(str(e))
        return 'Error', 500

if __name__ == '__main__':
    app.run(port=5000)