import sqlite3

# DBに接続（なければ作成）
conn = sqlite3.connect('quiz.db')
cursor = conn.cursor()

# クイズ問題テーブル（解説付き）
cursor.execute('''
CREATE TABLE IF NOT EXISTS quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT NOT NULL,
    description TEXT NOT NULL
)
''')

# ユーザスコアテーブル
cursor.execute('''
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL
)
''')

conn.commit()
conn.close()
print("✅ quiz.db を初期化しました（quiz + user テーブル）")
