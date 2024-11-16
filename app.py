from flask import Flask, jsonify, render_template
from flask_cors import CORS
from perguntas import obter_pergunta  # Importa a função de perguntas.py

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pergunta/<tema>/<nivel>', defaults={'numero': None})
@app.route('/pergunta/<tema>/<nivel>/<int:numero>')
def get_pergunta(tema, nivel, numero):
    print(f"Rota chamada: Tema: {tema}, Nível: {nivel}, Número: {numero}")  # Log
    pergunta_info = obter_pergunta(tema, nivel, numero)
    
    if pergunta_info:
        print(f"Pergunta encontrada.")
        return jsonify({"pergunta": pergunta_info["pergunta"], "resposta": pergunta_info["resposta"]})
    
    print("Nenhuma pergunta encontrada.")  # Log
    return jsonify({"error": "Nenhuma pergunta encontrada"}), 404

if __name__ == '__main__':
    print("Iniciando o servidor Flask...")
    app.run(debug=True, host='0.0.0.0', port=5001)
