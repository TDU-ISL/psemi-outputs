# プロジェクト名
セキュリティでGO！
## 概要

昨今は情報の科目が共通テストに加わったこと、DX化により多くの人間が高い情報リテラシーを求められることもありIPAの試験を通して知識をつけてほしいという意図のもと作成しました。
具体的な問題としてはITパスポート，基本情報技術者試験，応用情報技術者試験の過去問をベースにした四択クイズ形式で構成されています。
対象ユーザはITに興味を持つ高校生です。
## スクリーンショット

![alt text](ゲーム画面.png)

## 起動方法



### インストール


```bash
# リポジトリをクローン
ggit clone https://github.com/TDU-ISL/psemi-outputs
cd psemi-outputs/2025/GroupC

# 仮想環境を作成・有効化

python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# 依存関係をインストール

pip install -r requirements.txt
```

### 実行

```bash# 環境変数を設定
cp .env.example .env

# アプリケーションを実行

python app.py
```

アプリケーションは `http://localhost:3000` で起動します。

## 作成者

@tdc202211
@22fi065
@waniwanipanikku
@22fi121
