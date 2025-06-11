# ネットリテラシー道場

## 概要

日常生活で欠かせない存在となったインターネット．あなたの「ネットリテラシー」はどれだけありますか？私たちの Web アプリでは，４つのシナリオを用意し，それぞれのシナリオであなたのネットリテラシーを試すことが出来ます．また，ランキング要素も取り入れており，あなたのネットリテラシーを他の人と比べることが可能です．

## ss

![image](https://github.com/user-attachments/assets/8050ed85-fa57-4378-a1c4-0641f77ef7ff)
![image](https://github.com/user-attachments/assets/f13d27d6-8ca2-4cc4-ae67-3b8b10351c60)


## 起動方法
### frontend

```bash
cd webapp
npm install
npm start
```

### backend

libに https://drive.google.com/drive/folders/1wccdAZtqrsJy9_WqE6D1tTaVuKXKYYLe?usp=drive_link にあるファイルを配置してください．

```bash
cd backend
for /r src %f in (*.java) do @echo %f>>sources.txt
javac -encoding UTF-8 -cp "lib/*" -d bin @sources.txt
java -cp "bin;lib\slf4j-api-2.0.17.jar;lib\slf4j-simple-2.0.17.jar;lib\*" src.WebServer
```

## 作成者
@yui19278 @attitude @cakeoisi
