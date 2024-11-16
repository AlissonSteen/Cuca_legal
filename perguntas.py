import random
import json

# Carregar perguntas e respostas do arquivo JSON
with open("perguntas.json", "r", encoding="utf-8") as f:
    perguntas_respostas = json.load(f)

# Dicionário para armazenar a fila de perguntas embaralhadas para cada tema e nível
fila_perguntas = {tema: {} for tema in perguntas_respostas}

def obter_pergunta(tema, nivel, numero=None):
    if tema not in perguntas_respostas:
        return None

    if nivel == "Racha Cuca":
        if numero is None or str(numero) not in perguntas_respostas["Racha Cuca"]:
            return None
        if not fila_perguntas["Racha Cuca"].get(numero):
            perguntas_nivel = perguntas_respostas["Racha Cuca"][str(numero)]
            fila_perguntas["Racha Cuca"][numero] = random.sample(perguntas_nivel, len(perguntas_nivel))
        return fila_perguntas["Racha Cuca"][numero].pop() if fila_perguntas["Racha Cuca"][numero] else None

    if nivel not in fila_perguntas[tema] or not fila_perguntas[tema][nivel]:
        perguntas_nivel = [p for p in perguntas_respostas[tema] if p["nivel"] == nivel]
        if not perguntas_nivel:
            return None
        fila_perguntas[tema][nivel] = random.sample(perguntas_nivel, len(perguntas_nivel))

    return fila_perguntas[tema][nivel].pop() if fila_perguntas[tema][nivel] else None
