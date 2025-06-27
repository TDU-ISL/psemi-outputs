from flask import Flask, render_template, request, redirect, session
import sqlite3
import random

app = Flask(__name__)
app.secret_key = "secret"  # セッション用（本番では強いキーを設定）

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

# トップページ（最初の動画）
@app.route("/")
def top():
    return render_template("start.html")

@app.route("/top")
def top2():
    return render_template("top.html")

@app.route("/result")
def top3():
    name="ゲスト"
    score=0
    conn = sqlite3.connect('quiz.db')
    cursor = conn.cursor()
    cursor.execute("SELECT name, score FROM user ORDER BY score DESC, id ASC")
    rankings = cursor.fetchall()
    return render_template("result.html", name=name, score=score,  rankings=rankings)

# クイズ進行
@app.route("/quiz", methods=["GET", "POST"])
def quiz():
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
        session["is_correct"] = (selected == correct)
        session["show_description"] = True
        session.modified = True
        return redirect("/quiz")

    if show_description:
        qid = ids[current]
        question = get_question_by_id(qid)
        return render_template("description.html",
                               result=session["last_result"],
                               description=session["last_description"],
                               current=current + 1,
                               total=len(ids),
                               is_correct=session.get("is_correct"),
                               correct=question["answer"])

    qid = ids[current]
    question = get_question_by_id(qid)
    return render_template("quiz.html", question=question["question"],
                           options=question["options"],
                           correct=question["answer"],
                           current=current + 1)

# 動画再生ページ（5問目や9問目の前）
@app.route("/video/<int:step>")
def show_video(step):
    return render_template("video.html", step=step)

# 次の問題へ
@app.route("/next")
def next_question():
    session["current"] += 1
    session["show_description"] = False
    current = session["current"]

    # 5問目や9問目の前に動画ページを挿入（index 0始まり）
    if current in [7, 9]:
        return redirect(f"/video/{current + 1}")

    return redirect("/quiz")

if __name__ == "__main__":
    app.run(debug=True)
