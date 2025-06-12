from flask import Flask, render_template, request, redirect, session
import sqlite3
import random

app = Flask(__name__)
app.secret_key = "secret"  # セッション用（本番では強いキーを）

# 初めの画面に移る
@app.route("/")
def index():
    return render_template("start.html")

# クイズID順に全IDを取得
def get_all_question_ids():
    conn = sqlite3.connect('quiz.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM quiz ORDER BY id ASC")
    ids = [row[0] for row in cursor.fetchall()]
    conn.close()
    return ids

# 単一のクイズ情報をIDから取得
def get_question_by_id(qid):
    conn = sqlite3.connect('quiz.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM quiz WHERE id = ?", (qid,))
    row = cursor.fetchone()
    conn.close()
    if row:
        qid, question, answer, opt1, opt2, opt3, description = row
        options = [answer, opt1, opt2, opt3]
        random.shuffle(options)
        return {
            "id": qid,
            "question": question,
            "answer": answer,
            "options": options,
            "description": description
        }

@app.route("/quiz", methods=["GET", "POST"])
def quiz():
    # 初回アクセス時
    if "question_ids" not in session:
        session.clear()
        session["question_ids"] = get_all_question_ids()
        session["current"] = 0
        session["score"] = 0
        session["show_description"] = False

    ids = session["question_ids"]
    current = session["current"]
    show_description = session.get("show_description", False)

    if current >= len(ids):
        if request.method == "POST":
            name = request.form["name"]
            score = session["score"]
            conn = sqlite3.connect('quiz.db')
            cursor = conn.cursor()
            cursor.execute("INSERT INTO user (name, score) VALUES (?, ?)", (name, score))
            conn.commit()
            cursor.execute("SELECT name, score FROM user ORDER BY score DESC, id ASC")
            rankings = cursor.fetchall()
            conn.close()
            session.clear()
            return render_template("result.html", name=name, score=score, total=len(ids), rankings=rankings)

        return render_template("name_input.html", total=len(ids), score=session["score"])

    # POSTで解答が送られたとき
    if request.method == "POST":
        selected = request.form["choice"]
        qid = ids[current]
        question = get_question_by_id(qid)
        correct = question["answer"]
        description = question["description"]
        result = "正解！" if selected == correct else f"不正解！正解は「{correct}」"
        if selected == correct:
            session["score"] += 1
        session["last_result"] = result
        session["last_description"] = description
        session["show_description"] = True
        session.modified = True
        return redirect("/quiz")

    # 解説ページ
    if show_description:
        return render_template("description.html",
                               result=session["last_result"],
                               description=session["last_description"],
                               current=current + 1,
                               total=len(ids))

    # クイズ出題ページ
    qid = ids[current]
    question = get_question_by_id(qid)
    return render_template("quiz.html", question=question["question"],
                           options=question["options"],
                           correct=question["answer"])

@app.route("/next")
def next_question():
    session["current"] += 1
    session["show_description"] = False
    session.modified = True
    return redirect("/quiz")

if __name__ == "__main__":
    app.run(debug=True)
