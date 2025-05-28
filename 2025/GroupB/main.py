from flask import Flask, render_template, request
import re
import os
app = Flask(
    __name__,
    static_folder='./static',
    template_folder='./templates'
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/osint')
def osint():
    return render_template('OSINT.html')

@app.route('/result1', methods=['POST'])
def result1():
    user_answer = int(request.form.get('answer'))
    correct_answer = 2  # 富士急ハイランドが正解
    is_correct = (user_answer == correct_answer)
    
    # 選択された答えの説明を設定
    answer_text = {
        1: "よみうりランド",
        2: "富士急ハイランド",
        3: "サンリオピューロランド"
    }.get(user_answer, "不明")
    
    return render_template('result1.html', 
                         is_correct=is_correct,
                         user_answer=answer_text,
                         correct_answer="富士急ハイランド")

@app.route('/result2', methods=['POST'])
def result2():
    user_answer = request.form.get('answer')
    # 正規表現で「群馬県」と「利根郡片品村」が含まれているかチェック
    pattern = r'群馬県.*利根郡片品村|利根郡片品村.*群馬県'
    is_correct = bool(re.search(pattern, user_answer))
    return render_template('result2.html',
                         is_correct=is_correct,
                         user_answer=user_answer,
                         correct_answer="群馬県利根郡片品村")

@app.route('/result3', methods=['POST'])
def result3():
    user_answer = int(request.form.get('answer'))
    correct_answer = 3  # 正解の値
    is_correct = (user_answer == correct_answer)
    
    # 選択された答えの説明を設定
    answer_text = {
        1: "画面は操作せず，記載されているサポートに電話をかける",
        2: "画面に表示されている詳細を確認する",
        3: "ボタンを押してブラウザを閉じる"
    }.get(user_answer, "不明")
    
    return render_template('result3.html', 
                         is_correct=is_correct,
                         user_answer=answer_text,
                         correct_answer="ボタンを押してブラウザを閉じる")

@app.route('/result4', methods=['POST'])
def result4():
    user_answer = request.form.get('answer').strip()
    pattern = r'^(url|URL)$|(?=.*(url|URL))(?=.*(異なる|違う|ない|同じでない|同じではない)).*'
    #r'(?=.*url|URL)(?=.*(異なる|違う|ない|)).*'
    # 正規表現で「url」と「異なる」または「違う」が含まれているかチェック
    is_correct = bool(re.search(pattern, user_answer))
    return render_template('result4.html', 
                         is_correct=is_correct,
                         user_answer=user_answer,
                         correct_answer="urlが異なる")

@app.route('/result5', methods=['POST'])
def result5():
    user_answer = int(request.form.get('answer'))
    correct_answer = 3  # 正解の値
    is_correct = (user_answer == correct_answer)
    
    # 選択された答えの説明を設定
    answer_text = {
        1: "なにもしない",
        2: "スマートフォンやパソコン本体のOSのバージョンだけ最新にする",
        3: "スマートフォンやパソコン本体のOSのバージョンに加え、アプリやソフト、ネットにつながるIT機器も最新の状態にしておく",
        4: "神に願う"
    }.get(user_answer, "不明")
    return render_template('result5.html', 
                         is_correct=is_correct,
                         user_answer=answer_text,
                         correct_answer="スマートフォンやパソコン本体のOSのバージョンに加え、アプリやソフト、ネットにつながるIT機器も最新の状態にしておく")

@app.route('/result6', methods=['POST'])
def result6():
    user_answer = request.form.getlist('answer')
    correct_answer = {"2", "3"}  # 正解の値
    is_correct = correct_answer == set(user_answer)
    answer_text_map = {
        "1": "お父さんの生年月日を使う",
        "2": "パスワードを使いまわさない",
        "3": "パスワードは紙やパスワード管理アプリで安全に保管",
        "4": "パスワードの定期変更"
    }
    selected_answers = [answer_text_map.get(ans, "不明") for ans in user_answer]
    correct_answer_text = [answer_text_map[ans] for ans in correct_answer]
    return render_template('result6.html', 
                         is_correct=is_correct,
                         user_answer=selected_answers,
                         correct_answer=correct_answer_text)

@app.route('/result7', methods=['POST'])
def result7():
    user_answer = int(request.form.get('answer'))
    correct_answer = 4  # 正解の値
    is_correct = (user_answer == correct_answer)
    
    # 選択された答えの説明を設定
    answer_text = {
        1: "フィッシング",
        2: "スキミング",
        3: "ブルートフォースアタック",
        4: "ショルダーハッキング"
    }.get(user_answer, "不明")
    return render_template('result7.html', 
                         is_correct=is_correct,
                         user_answer=answer_text,
                         correct_answer="ショルダーハッキング")

@app.route('/result8', methods=['POST'])
def result8():
    user_answer = int(request.form.get('answer'))
    correct_answer = 3  # 正解の値
    is_correct = (user_answer == correct_answer)
    answer_text = {
        1: "攻撃者のログイン試行は追加コード要求で失敗し、被害は出ない",
        2: "パスワードが漏えいしただけでログインは阻止され、攻撃者は諦める",
        3: "攻撃者が即座にログインし、アカウントが乗っ取られる",
        4: "サービス側が自動でパスワードを変更し、利用者に通知する"
    }.get(user_answer, "不明")
    return render_template('result8.html', 
                         is_correct=is_correct,
                         user_answer=answer_text,
                         correct_answer="攻撃者が即座にログインし、アカウントが乗っ取られる")

@app.route('/result9', methods=['POST'])
def result9():
    user_answer = int(request.form.get('answer'))
    correct_answer = 1  # 正解の値
    is_correct = (user_answer == correct_answer)
    answer_text = {
        1: "「サークルの LINE グループで集めたメンバー 30 人分の名前・電話番号・学生証写真を貼るので、名簿を Excel 形式に作成して。」",
        2: "「公開されている政府統計の CSV を貼ります。主要指標をグラフにまとめて。」",
        3: "「統計学の課題コードが動きません。エラーメッセージとソースを貼るので、原因を教えて。」",
        4: "「レストランレビュー 3 件をコピーしたので、200 字以内で要約して。」"
    }.get(user_answer, "不明")
    return render_template('result9.html', 
                         is_correct=is_correct,
                         user_answer=answer_text,
                         correct_answer="「サークルの LINE グループで集めたメンバー 30 人分の名前・電話番号・学生証写真を貼るので、名簿を Excel 形式に作成して。」")

@app.route('/result10', methods=['POST'])
def result10():
    user_answer = request.form.getlist('answer')
    correct_answer = {"1", "3", "4"}  # 正解の値
    is_correct = correct_answer == set(user_answer)
    answer_text_map = {
        "1": "「2016年の熊本地震で動物園からライオンが逃げた」というニュース",
        "2": "「神戸市の小学校で教員間いじめ、カレー強要する映像に批判殺到」というニュース",
        "3": "「2016年の米国大統領選挙の際、ローマ法王がトランプ氏を支持した」というニュース",
        "4": "「新型コロナウイルスの影響でトイレットペーパーの多くが中国で生産されており、供給が止まる」というニュース"
    }
    selected_answers = [answer_text_map.get(ans, "不明") for ans in user_answer]
    correct_answer_text = [answer_text_map[ans] for ans in correct_answer]
    return render_template('result10.html', 
                         is_correct=is_correct,
                         user_answer=selected_answers,
                         correct_answer=correct_answer_text)

@app.route('/question1')
def question1():
    return render_template('question1.html')

@app.route('/question2')
def question2():
    return render_template('question2.html')

@app.route('/question3')
def question3():
    return render_template('question3.html')

@app.route('/question4')
def question4():
    return render_template('question4.html')

@app.route('/question5')
def question5():
    return render_template('question5.html')

@app.route('/question6')
def question6():
    return render_template('question6.html')

@app.route('/question7')
def question7():
    return render_template('question7.html')

@app.route('/question8')
def question8():
    return render_template('question8.html')

@app.route('/question9')
def question9():
    return render_template('question9.html')

@app.route('/question10')
def question10():
    return render_template('question10.html')

if __name__ == "__main__":
    app.run()