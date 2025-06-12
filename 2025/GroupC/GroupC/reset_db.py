import sqlite3
import os

DB_FILE = 'quiz.db'

# 既存DBを削除
if os.path.exists(DB_FILE):
    os.remove(DB_FILE)
    print("🗑️ 既存の quiz.db を削除しました。")
else:
    print("⚠️ quiz.db が存在しません。新しく作成します。")

# 再作成（init_db.py 相当の処理をここに含める）
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# quiz テーブル作成
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

# user テーブル作成
cursor.execute('''
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL
)
''')

conn.commit()
conn.close()
print("✅ 新しい quiz.db を作成しました（quiz, user テーブル含む）")
