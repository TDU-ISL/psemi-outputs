// src/components/GameCard.js
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // React RouterのuseNavigateを使います

const GameCard = ({ title, description, route, imgSrc }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(route); // カードがクリックされた時に指定したルートへ遷移
    };

    return (
        <Card className="m-3" style={{ width: '18rem', cursor: 'pointer' }} onClick={handleCardClick}>
            <Card.Img variant="top" src={imgSrc} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="primary">ゲームへ</Button>
            </Card.Body>
        </Card>
    );
};

export default GameCard;


//使っていない．