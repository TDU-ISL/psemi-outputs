# SECURITY DRILL

## 概要

身近に潜むセキュリティリスクや対策について学べるクイズ形式のwebアプリです。様々なジャンルの問題を用意しているため、自身が気になっているセキュリティリスクへの対策方法や、意識していなかったセキュリティリスクなど、新たな気づきを得ることができます。また、スマートフォンでのプレイも可能となっており、QRコードやリンクを読み込むことでダウンロード不要ですぐに問題に取り組めます。
情報セキュリティについて詳しくない中高生や社会人を対象としています。

## スクリーンショット
![image](https://github.com/user-attachments/assets/73b678e3-7ccf-49dc-b7ce-648f282ea1af)
![image](https://github.com/user-attachments/assets/8a118f30-7349-4d39-b0bc-72620f0a2ab8)


## 起動方法

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/TDU-ISL/psemi-outputs
cd psemi-outputs/2025/GroupB

# 仮想環境を作成・有効化

python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# 依存関係をインストール

pip install -r requirements.txt
```

### 実行

# アプリケーションを実行
```
python main.py
```
アプリケーションは `http://localhost:5000` で起動します。

## 作成者
@riporippo
@kosuke222
@sakezaru15
@yuyadaruma24
