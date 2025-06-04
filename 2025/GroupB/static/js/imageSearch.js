async function copyImageAndSearch() {
    try {
        // 画像をクリップボードにコピー
        const img = document.getElementById('targetImage');
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        const blob = await new Promise(resolve => canvas.toBlob(resolve));
        const data = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([data]);
        
        // Google画像検索に遷移
        window.open('https://www.google.com/imghp', '_blank');
    } catch (err) {
        console.error('画像のコピーに失敗しました:', err);
        alert('画像のコピーに失敗しました。ブラウザの設定を確認してください。');
    }
} 