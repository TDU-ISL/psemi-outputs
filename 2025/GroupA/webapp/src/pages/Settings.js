// const handleReset = async () => {
//     if(!window.confirm("ランキングをリセットしますか？")) return;
//     const response = await fetch('/api/reset', {method : 'DELETE'});
//     if(!response.ok) {
//         alert("ランキングをリセットしました");
//     } else {
//         alert("ランキングのリセットに失敗しました");
//     }
//     <button onClick={handleReset}>ランキングをリセット</button>
// };

// export default Settings;

function Settings() {
  const handleReset = async () => {
    if (!window.confirm("ランキングをリセットしますか？")) return;
    const response = await fetch("/resetRanking", { method: "POST" });

    if (response.ok) {
      alert("ランキングをリセットしました");
    } else {
      alert("ランキングのリセットに失敗しました");
    }
  };

  // JSX を返す
  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={handleReset}>ランキングをリセット</button>
    </div>
  );
}

export default Settings;
