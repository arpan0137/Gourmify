/* eslint-disable @next/next/no-img-element */
"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Hero() {
    return (
        <section className="hero rounded-lg overflow-hidden">
            <Carousel autoPlay interval={8000} showThumbs={false} infiniteLoop emulateTouch transitionTime={900} >
                <a href="/menu/cheesy-double-decker-burger-combo">
                    <img src="/Images/herobg.jpg" alt="Burger Combo" className="rounded-lg" />
                </a>
            </Carousel>
        </section >
    )
}