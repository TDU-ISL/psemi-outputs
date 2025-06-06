import React from "react";
import { ReactComponent as Logo } from './ISL.svg';

export default function Header() {
    return (
        <header className="bg-dark-green text-white p-3">
            <h2 className="mb-1 text-center" style={{ fontSize: '1rem' }}>
                ISL(Information Security Lab.)
            </h2>
            <div
                className="d-flex justify-content-center align-items-center flex-wrap flex-md-nowrap"
                style={{
                    gap: "12px",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    textAlign: "center"
                }}
            >
                <Logo
                    style={{
                        width: "60px",
                        maxWidth: "20vw",
                        height: "auto"
                    }}
                />
                <h1
                    className="mb-0"
                    style={{
                        fontSize: "1.5rem",
                        maxWidth: "80vw",
                        lineHeight: "1.2",
                        wordBreak: "keep-all"
                    }}
                >
                    東京電機大学 情報セキュリティ研究室
                </h1>
            </div>
        </header>
    );
}
