import { useEffect, useState } from 'react';
import styled from 'styled-components';
const TichWrapper = styled.div`
    min-height: 150rem;
    min-width: 70rem;
    background-color: cornsilk;
    display: grid;
    place-items: center;
    position: relative;
`;
const Tich = styled.div`
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(0, 0, 0, 1) 50%,
        rgba(0, 0, 0, 1) 100%
    );
    position: relative;
    margin: 0 auto;
    box-shadow: 4px 4px 5px #888888;

    &::before {
        content: '♂';
        text-align: center;
        line-height: 8rem;
        color: #333;
        font-size: 1.8rem;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        position: absolute;
        top: 4rem;
        left: 0;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 1) 24%,
            rgba(0, 0, 0, 1) 24%
        );
    }

    &::after {
        content: '♀';
        text-align: center;
        line-height: 8rem;
        color: #ebeaea;
        font-size: 1.8rem;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        position: absolute;
        top: 4rem;
        right: 0;
        background: radial-gradient(
            circle,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 24%,
            rgba(255, 255, 255, 1) 24%
        );
        transform: rotate(90deg);
    }
`;
const Point = styled.div`
    position: absolute;
    width: 15rem;
    height: 0.3rem;
    top: 50%;
    left: 50%;
    transform-origin: left center;
    background: transparent;
    /* background: #333; */
    margin-top: -2px;

    img {
        width: 2.8rem;
        height: 2.8rem;
    }
`;

const PointHour = styled(Point)`
    width: 14rem;
    height: 0.3rem;
    transform: rotate(${prop => prop.rotate + 'deg'});

    img {
        width: 10.8rem;
        height: 10.8rem;
        position: absolute;
        transform: rotate(316deg);
        left: 10rem;
        top: -51px;
    }
`;
const PointMinute = styled(Point)`
    width: 16rem;
    height: 0.2rem;
    transform: rotate(${prop => prop.rotate + 'deg'});
    img {
        width: 10.8rem;
        height: 10.8rem;
        position: absolute;
        transform: rotate(316deg);
        left: 10rem;
        top: -51px;
    }
`;
const PointSecond = styled(Point)`
    width: 18rem;
    height: 0.1rem;
    transform: rotate(${prop => prop.rotate + 'deg'});

    img {
        position: absolute;
        left: 10rem;
        top: -2.8rem;
    }
`;

const WatchWrapper = styled.img`
    width: 700px;
    position: absolute;
`;
const DayWrapper = styled.div`
    width: 160px;
    position: absolute;
    bottom: -140px;
    font-size: 50px;
    font-weight: 800;
    text-align: center;
`;

export const PornWatch = () => {
    const [secAngle, setSecAngle] = useState(0);
    const [minAngle, setminAngle] = useState(0);
    const [hourAngle, sethourAngle] = useState(0);

    const move = () => {
        setInterval(() => {
            // 获取当前时刻
            const date = new Date();
            const sec = date.getSeconds();
            const min = date.getMinutes();
            const hour = date.getHours();
            // 计算各指针对应的角度
            const secAngleR = sec * 6 - 90; // s*6-90
            const minAngleR = min * 6 + sec * 0.1 - 90; // m*6+s*0.1-90
            const hourAngleR = hour * 30 + min * 0.5 - 90; // h*30+m*0.5 - 90
            // 转动指针
            setSecAngle(secAngleR);
            setminAngle(minAngleR);
            sethourAngle(hourAngleR);
        }, 1000);
    };

    useEffect(() => {
        move();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <TichWrapper>
                <WatchWrapper
                    src="https://gitee.com/youngniu/pic-bed/raw/master/img/xxoo.png"
                    alt=""
                    width="700px"
                />
                <Tich>
                    <PointHour rotate={hourAngle}>
                        <img
                            src="https://gitee.com/youngniu/pic-bed/raw/master/img/zhizhen.png"
                            alt=""
                        />
                    </PointHour>
                    <PointMinute rotate={minAngle}>
                        <img
                            src="https://gitee.com/youngniu/pic-bed/raw/master/img/zhizhen.png"
                            alt=""
                        />
                    </PointMinute>
                    <PointSecond rotate={secAngle}>
                        <img
                            src="https://gitee.com/youngniu/pic-bed/raw/master/img/kedou.png"
                            alt=""
                        />
                    </PointSecond>
                    <DayWrapper>{new Date().getDate()}</DayWrapper>
                </Tich>
            </TichWrapper>
        </>
    );
};
