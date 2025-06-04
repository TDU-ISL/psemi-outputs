document.addEventListener("DOMContentLoaded", function() {
    const zoomableImages = document.querySelectorAll(".zoomable");

    // モーダル用要素を作成・追加
    const modal = document.createElement("div");
    modal.id = "image-modal";
    Object.assign(modal.style, {
        display: "none",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
        cursor: "zoom-out",
        zIndex: "1000",
        overflow: "auto"
    });

    const modalImg = document.createElement("img");
    Object.assign(modalImg.style, {
        maxWidth: "90%",
        maxHeight: "90%",
        userSelect: "none",
        cursor: "move"
    });

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // 拡大画像をドラッグで動かすための処理
    let isDragging = false;
    let dragStartX, dragStartY, imgStartLeft, imgStartTop;

    modalImg.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        const rect = modalImg.getBoundingClientRect();
        imgStartLeft = rect.left;
        imgStartTop = rect.top;
        modalImg.style.position = "relative";
        modalImg.style.left = "0px";
        modalImg.style.top = "0px";
        e.preventDefault();
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        modalImg.style.left = dx + "px";
        modalImg.style.top = dy + "px";
    });

    // クリックでモーダル閉じる
    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 画像クリックで開く処理
    zoomableImages.forEach(img => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", (e) => {
            e.stopPropagation();
            modalImg.src = img.src;
            modalImg.style.left = "0px";
            modalImg.style.top = "0px";
            modal.style.display = "flex";
        });
    });
});
