import sqlite3

conn = sqlite3.connect('quiz.db')
cursor = conn.cursor()

# クイズ一覧表示
print("【クイズ一覧】")
cursor.execute("SELECT * FROM quiz")
for row in cursor.fetchall():
    print(f"Q{row[0]}: {row[1]} / 答え: {row[2]} / 解説: {row[6]}")

print("\n【ユーザー成績】")
cursor.execute("SELECT * FROM user ORDER BY score DESC, id ASC")
for row in cursor.fetchall():
    print(f"{row[0]}: {row[1]} → {row[2]}点")

conn.close()
