import sqlite3
import json

# JSONファイルを読み込む
with open('questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# DBに接続
conn = sqlite3.connect('quiz.db')
cursor = conn.cursor()

# クイズをDBに挿入
for q in questions:
    cursor.execute('''
        INSERT INTO quiz (question, answer, option1, option2, option3, description)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (q['question'], q['answer'], q['option1'], q['option2'], q['option3'], q['description']))

conn.commit()
conn.close()
print("✅ questions.json からクイズをDBに挿入しました")
