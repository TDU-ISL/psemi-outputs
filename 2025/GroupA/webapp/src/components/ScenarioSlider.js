// src/components/ScenarioSlider.js
import React from "react";
import { FaEnvelope, FaKey, FaLaptop, FaUserSecret } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CardComponent from "./CardComponent";
import "./ScenarioSlider.scss";

const ScenarioSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    const scenarios = [
        {
            title: "シナリオ①",
            description: "新SNS「FriendNest」へようこそ！",
            route: "/webapp/app/game1",
            icon: <FaKey />
        },
        {
            title: "シナリオ②",
            description: "怪しいメールが届いたかも...？",
            route: "/webapp/app/game2",
            icon: <FaEnvelope />
        },
        {
            title: "シナリオ③",
            description: "SNSに潜む危険性…",
            route: "/webapp/app/game3",
            icon: <FaUserSecret />
        },
        {
            title: "シナリオ④",
            description: "アプリの利用規約...読んでる？",
            route: "/webapp/app/game4",
            icon: <FaLaptop />
        }
    ];

    return (
        <div className="scenario-slider">
            <Slider {...settings}>
                {scenarios.map((s, i) => (
                    <div key={i} className="slider-card">
                        <CardComponent
                            title={s.title}
                            description={s.description}
                            route={s.route}
                            icon={s.icon}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ScenarioSlider;